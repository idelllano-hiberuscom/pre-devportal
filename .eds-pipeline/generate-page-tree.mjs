#!/usr/bin/env node

import {
  existsSync, readFileSync, readdirSync, writeFileSync,
} from 'fs';
import { join } from 'path';
import { chromium } from '../.eds-ai/scripts/node_modules/playwright/index.mjs';

const repoRoot = process.cwd();
const contentRoot = '/content/pre-devportal';
const authorUrl = 'https://author-p34633-e913315.adobeaemcloud.com';
const urls = readFileSync(join(repoRoot, 'urls.txt'), 'utf8')
  .split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
const ticketsDir = join(repoRoot, '.eds-pipeline', 'tickets');

const ticketNumber = (ticket) => Number.parseInt(ticket.ticket_id?.replace(/^PA-/, ''), 10) || 0;
const tickets = readdirSync(ticketsDir)
  .filter((file) => file.endsWith('.json'))
  .map((file) => JSON.parse(readFileSync(join(ticketsDir, file), 'utf8')))
  .filter((ticket) => ticket.block_name)
  .sort((left, right) => ticketNumber(left) - ticketNumber(right));

const metadataByUrl = new Map();
const pagesDir = join(repoRoot, 'import-work', 'pages');
for (const directory of readdirSync(pagesDir)) {
  const metadataPath = join(pagesDir, directory, 'metadata.json');
  if (!existsSync(metadataPath)) continue;
  const metadata = JSON.parse(readFileSync(metadataPath, 'utf8'));
  metadataByUrl.set(metadata.url, { ...metadata, directory });
}

const titleFromPath = (path) => {
  const slug = path.split('/').filter(Boolean).at(-1) || 'Inicio';
  return slug.split('-').map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
};

const cleanText = (value) => String(value || '').replace(/\s+/g, ' ').trim();

const pathFromUrl = (url) => {
  const pathname = new URL(url).pathname.replace(/\/$/, '').replace(/\.html$/, '');
  return `${contentRoot}${pathname || '/index'}`;
};

function blockFromTicket(ticket) {
  const definitionPath = join(repoRoot, 'blocks', ticket.block_name, `_${ticket.block_name}.json`);
  const config = JSON.parse(readFileSync(definitionPath, 'utf8'));
  const definitionId = ticket.local_identity?.replace('--', '-') || ticket.block_name;
  const definition = config.definitions.find((entry) => entry.id === definitionId)
    || config.definitions.find((entry) => entry.id === ticket.block_name);
  if (!definition) throw new Error(`${ticket.ticket_id}: no existe la definición ${definitionId}`);

  const template = definition.plugins?.xwalk?.page?.template || {};
  const block = {
    block: ticket.block_name,
    ticket_id: ticket.ticket_id,
    name: template.name || ticket.title || ticket.block_name,
  };
  if (ticket.is_container) block.filter = ticket.filter_id || template.filter;
  else block.model = ticket.model_id || template.model;
  if (template.variant) block.classes = template.variant;
  return block;
}

const blocksByPath = new Map();
for (const ticket of tickets) {
  for (const sourceUrl of ticket.source?.pages || [ticket.source?.page_url].filter(Boolean)) {
    const path = pathFromUrl(sourceUrl);
    if (!blocksByPath.has(path)) blocksByPath.set(path, []);
    blocksByPath.get(path).push(blockFromTicket(ticket));
  }
}

const sectionForPath = (path) => ({
  name: 'section',
  blocks: blocksByPath.get(path) || [],
});

async function extractPageData(page, url) {
  const local = metadataByUrl.get(url);
  if (local) {
    await page.setContent(readFileSync(join(pagesDir, local.directory, 'cleaned.html'), 'utf8'), {
      waitUntil: 'domcontentloaded',
    });
  } else {
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });
  }

  const extracted = await page.evaluate(() => ({
    h1: document.querySelector('h1')?.textContent || '',
    title: document.title || '',
    description: document.querySelector('meta[name="description"]')?.getAttribute('content') || '',
  }));
  const pathname = new URL(url).pathname.replace(/\/$/, '') || '/index';
  const path = `${contentRoot}${pathname}`;
  const portalReadError = /an error has occurred/i.test(`${extracted.h1} ${extracted.title}`);
  const genericTitle = /^(cecabank)?$/i.test(cleanText(extracted.title));
  const genericDescription = /^description for cecabank$/i.test(cleanText(extracted.description));

  return {
    path,
    title: (!portalReadError && cleanText(extracted.h1))
      || (!portalReadError && !genericTitle && cleanText(extracted.title))
      || titleFromPath(pathname),
    ...(genericDescription || !cleanText(extracted.description)
      ? {} : { description: cleanText(extracted.description) }),
    source_url: url,
    sections: [sectionForPath(path)],
    source: local ? 'import-work' : (portalReadError ? 'portal-read-error' : 'portal-read'),
    ...(portalReadError ? { content_unavailable: true } : {}),
  };
}

const browser = await chromium.launch();
const context = await browser.newContext();
const page = await context.newPage();
const sourcePages = [];
try {
  for (const url of urls) {
    // Deliberadamente en serie para no cargar el portal del cliente.
    // eslint-disable-next-line no-await-in-loop
    sourcePages.push(await extractPageData(page, url));
  }
} finally {
  await browser.close();
}

const declaredPaths = new Set(sourcePages.map((entry) => entry.path));
const intermediatePaths = new Set();
for (const entry of sourcePages) {
  const relative = entry.path.slice(contentRoot.length).split('/').filter(Boolean);
  for (let index = 1; index < relative.length; index += 1) {
    const parent = `${contentRoot}/${relative.slice(0, index).join('/')}`;
    if (!declaredPaths.has(parent)) intermediatePaths.add(parent);
  }
}

const intermediatePages = [...intermediatePaths].map((path) => ({
  path,
  title: titleFromPath(path),
  sections: [sectionForPath(path)],
  intermediate: true,
}));

const pages = [...sourcePages, ...intermediatePages]
  .sort((left, right) => left.path.split('/').length - right.path.split('/').length
    || left.path.localeCompare(right.path));

const tree = {
  site: 'pre-devportal',
  package_name: 'pre-devportal-content',
  content_root: contentRoot,
  author_url: authorUrl,
  mode: 'B',
  skeleton_verified: true,
  skeleton: {
    page_resource_type: 'core/franklin/components/page/v1/page',
    root_node_name: 'root',
    root_resource_type: 'core/franklin/components/root/v1/root',
    section_resource_type: 'core/franklin/components/section/v1/section',
    block_resource_type: 'core/franklin/components/block/v1/block',
    item_resource_type: 'core/franklin/components/block/v1/block/item',
  },
  source_summary: {
    requested_urls: urls.length,
    processed_pages: sourcePages.length,
    from_import_work: sourcePages.filter((entry) => entry.source === 'import-work').length,
    from_portal_read: sourcePages.filter((entry) => entry.source === 'portal-read').length,
    portal_read_errors: sourcePages.filter((entry) => entry.source === 'portal-read-error').length,
    intermediate_pages: intermediatePages.length,
    pages_with_components: pages.filter((entry) => entry.sections[0].blocks.length).length,
    component_instances: pages.reduce((total, entry) => total + entry.sections[0].blocks.length, 0),
  },
  pages,
};

writeFileSync(join(repoRoot, 'page-tree.json'), `${JSON.stringify(tree, null, 2)}\n`);
console.log(JSON.stringify(tree.source_summary, null, 2));