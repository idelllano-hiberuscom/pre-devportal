import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const pipelineDir = path.join(root, '.eds-pipeline');
const config = JSON.parse(fs.readFileSync(path.join(root, '.github', 'config.json'), 'utf8'));
const token = process.env.ATLASSIAN_API_TOKEN || config._atlassian_token;
if (!token) throw new Error('ATLASSIAN_API_TOKEN is unavailable and no local config fallback exists.');

const baseUrl = `https://${config.atlassian.site}.atlassian.net`;
const auth = `Basic ${Buffer.from(`${config.atlassian.email}:${token}`).toString('base64')}`;
const indexPath = path.join(pipelineDir, 'index.json');
const index = JSON.parse(fs.readFileSync(indexPath, 'utf8'));
const proposal = JSON.parse(fs.readFileSync(path.join(root, 'propuesta-componentes.json'), 'utf8'));
const selectedIdentities = new Set(process.argv.slice(2));
const selectedTickets = index.tickets.filter((ticket) => (
  selectedIdentities.size === 0
  || selectedIdentities.has(ticket.ticket_id)
  || selectedIdentities.has(ticket.local_identity)
));
if (selectedIdentities.size > 0 && selectedTickets.length !== selectedIdentities.size) {
  throw new Error(`Requested ${selectedIdentities.size} identities, resolved ${selectedTickets.length}.`);
}

const pageByIdentity = {
  'cards--icon-cards': { id: '214368257', title: 'cards--icon-cards — Contrato Técnico' },
  'cards--editorial': { id: '214073346', title: 'cards--editorial — Contrato Técnico' },
  'cards--plugins': { id: '214237185', title: 'cards--plugins — Contrato Técnico' },
  'cards--logos': { id: '214302721', title: 'cards--logos — Contrato Técnico' },
  accordion: { id: '214401025', title: 'accordion — Contrato Técnico' },
  tabs: { id: '214106113', title: 'tabs — Contrato Técnico' },
  carousel: { id: '214269953', title: 'carousel — Contrato Técnico' },
  'contact-form': { id: '212893697', title: 'contact-form — Contrato Técnico' },
  video: { id: '214138881', title: 'video — Contrato Técnico' },
  'code-block': { id: '214335489', title: 'code-block — Contrato Técnico' },
  'pie-chart': { id: '214204417', title: 'pie-chart — Contrato Técnico' },
  'swagger-console': { id: '214171649', title: 'swagger-console — Contrato Técnico' },
};

const mimeType = (filename) => {
  if (filename.endsWith('.png')) return 'image/png';
  if (filename.endsWith('.jpg') || filename.endsWith('.jpeg')) return 'image/jpeg';
  if (filename.endsWith('.json')) return 'application/json';
  if (filename.endsWith('.html')) return 'text/html';
  return 'application/octet-stream';
};

const request = async (url, options = {}) => {
  const response = await fetch(url, {
    ...options,
    headers: {
      Authorization: auth,
      Accept: 'application/json',
      ...(options.headers || {}),
    },
  });
  const text = await response.text();
  let body = null;
  try {
    body = text ? JSON.parse(text) : null;
  } catch {
    body = text;
  }
  if (!response.ok) {
    const error = new Error(`${options.method || 'GET'} ${url} failed with ${response.status}`);
    error.status = response.status;
    error.body = body;
    throw error;
  }
  return { response, body };
};

const deprecationInfo = (response, endpoint) => {
  const warning = response.headers.get('warning');
  const sunset = response.headers.get('sunset');
  const deprecation = response.headers.get('deprecation');
  const link = response.headers.get('link');
  return warning || sunset || deprecation ? { endpoint, warning, sunset, deprecation, successor: link } : null;
};

const uploadAttachment = async (url, filePath, tokenHeader) => {
  const form = new FormData();
  const filename = path.basename(filePath);
  form.append('file', new Blob([fs.readFileSync(filePath)], { type: mimeType(filename) }), filename);
  return request(url, {
    method: 'POST',
    headers: { 'X-Atlassian-Token': tokenHeader },
    body: form,
  });
};

const paragraph = (text) => ({
  type: 'paragraph',
  content: [{ type: 'text', text }],
});

const gate2Summary = (ticket) => {
  const summaries = {
    'PA-24': 'Sin endpoints muestra configuración pendiente y no hace peticiones; el diagnóstico queda sanitizado. Sigue incompleto solo por los endpoints y contratos externos.',
    'PA-25': 'Variante cards logos y ticket base de la cadena serial PA-25 → PA-31 → PA-32 → PA-33; alt se extrae del atributo durante contribución.',
    'PA-26': 'Sigue incompleto únicamente por el endpoint de envío y la política de tratamiento, retención y consentimiento de datos.',
    'PA-27': 'Interacciones resueltas con el patrón accesible Adobe Accordion y tokens existentes; no se inventan estados visuales no medidos.',
    'PA-28': 'Cada item referencia un fragmento EDS; carga bajo demanda, caché en memoria, teclado ARIA y estados loading/error/empty definidos.',
    'PA-29': 'El placeholder es opcional y su ausencia es válida.',
    'PA-30': 'Contenedor xwalk ilimitado; ángulos proporcionales a value/sum(values), Chart.js 4.x local y lista HTML como fuente y fallback accesible.',
    'PA-31': 'Variante cards icon-cards; espera PA-25. SVG autorable sanitizado con viewBox e imageAlt derivado de atributos o contexto.',
    'PA-32': 'Variante cards plugins; espera PA-31. href y alt se extraen de atributos durante contribución.',
    'PA-33': 'Variante cards editorial; espera PA-32. alt se extrae del atributo durante contribución.',
    'PA-34': 'El lenguaje se extrae de atributo y se normaliza explícitamente al selector UE.',
    'PA-35': 'media_imageAlt se extrae literalmente del atributo alt durante contribución.',
  };
  return summaries[ticket.ticket_id];
};

const jiraDescription = (ticket) => {
  const contractUrl = ticket.technical_contract.confluence_url;
  return {
    type: 'doc',
    version: 1,
    content: [
      paragraph(`${ticket.title} se mantiene como Story draft pendiente de aprobación explícita en Gate 2.`),
      paragraph(gate2Summary(ticket)),
    {
      type: 'paragraph',
      content: [
        { type: 'text', text: 'Contrato técnico: ' },
        { type: 'text', text: contractUrl, marks: [{ type: 'link', attrs: { href: contractUrl } }] },
      ],
    },
      paragraph(`Evidencia: .eds-pipeline/assets/${ticket.local_identity}/. Ticket completo: adjunto ${ticket.ticket_id}.json.`),
    paragraph(`Origen: ${ticket.source.page_url} — snapshot ${ticket.source.snapshot_date}.`),
    ],
  };
};

const previousReport = fs.existsSync(path.join(pipelineDir, 'backend-report.json'))
  ? JSON.parse(fs.readFileSync(path.join(pipelineDir, 'backend-report.json'), 'utf8'))
  : { confluence: [], jira: [], deprecated_endpoints: [] };
const selectedTicketIds = new Set(selectedTickets.map((ticket) => ticket.ticket_id));
const selectedLocalIdentities = new Set(selectedTickets.map((ticket) => ticket.local_identity));
const report = {
  generated: new Date().toISOString(),
  token_source: process.env.ATLASSIAN_API_TOKEN ? 'environment' : 'local-config-fallback',
  confluence: previousReport.confluence.filter((entry) => !selectedLocalIdentities.has(entry.identity)),
  jira: previousReport.jira.filter((entry) => !selectedTicketIds.has(entry.ticket_id)),
  deprecated_endpoints: previousReport.deprecated_endpoints || [],
};

for (const ticketSummary of selectedTickets) {
  const identity = ticketSummary.local_identity;
  const page = pageByIdentity[identity];
  const assetsDir = path.join(pipelineDir, 'assets', identity);
  const assetNames = fs.readdirSync(assetsDir).filter((name) => fs.statSync(path.join(assetsDir, name)).isFile()).sort();
  const pageReport = { identity, page_id: page.id, uploaded: [], referenced: [], missing: [], body_updated: false };
  const existingAttachments = await request(`${baseUrl}/wiki/rest/api/content/${page.id}/child/attachment?limit=200`);
  const existingByName = new Map((existingAttachments.body.results || []).map((attachment) => [attachment.title, attachment.id]));

  for (const assetName of assetNames) {
    const attachmentId = existingByName.get(assetName);
    const endpoint = attachmentId
      ? `/wiki/rest/api/content/${page.id}/child/attachment/${attachmentId}/data`
      : `/wiki/rest/api/content/${page.id}/child/attachment`;
    const result = await uploadAttachment(`${baseUrl}${endpoint}`, path.join(assetsDir, assetName), 'nocheck');
    pageReport.uploaded.push(assetName);
    const deprecated = deprecationInfo(result.response, endpoint);
    if (deprecated) report.deprecated_endpoints.push(deprecated);
  }

  const currentPage = await request(`${baseUrl}/wiki/api/v2/pages/${page.id}?body-format=storage`);
  const storagePath = path.join(pipelineDir, '.confluence', `${identity}.storage.html`);
  let body = fs.readFileSync(storagePath, 'utf8');
  if (identity === 'swagger-console') {
    body = body.replace(
      'Gate 1 debe decidir si esta aplicacion se integra como bloque, enlace externo o aplicacion separada.',
      'Gate 1 aprobo tratar esta aplicacion como bloque EDS; siguen pendientes authEndpoint, openApiEndpoint, contratos, CORS, sesion/tokens y la observacion del estado autenticado.',
    );
    fs.writeFileSync(storagePath, body, 'utf8');
  }
  const update = {
    id: page.id,
    status: 'current',
    title: page.title,
    spaceId: config.atlassian.confluence_space === 'PA' ? '211812356' : currentPage.body.spaceId,
    body: { representation: 'storage', value: body },
    version: {
      number: currentPage.body.version.number + 1,
      message: 'Corrección Gate 2: contrato y evidencia sincronizados',
    },
  };
  await request(`${baseUrl}/wiki/api/v2/pages/${page.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(update),
  });
  pageReport.body_updated = true;

  const attachments = await request(`${baseUrl}/wiki/rest/api/content/${page.id}/child/attachment?limit=200`);
  const attachedNames = new Set((attachments.body.results || []).map((attachment) => attachment.title));
  pageReport.referenced = [...body.matchAll(/ri:filename="([^"]+)"/g)].map((match) => match[1]);
  pageReport.missing = pageReport.referenced.filter((name) => !attachedNames.has(name));
  pageReport.verified = pageReport.missing.length === 0 && assetNames.every((name) => attachedNames.has(name));
  report.confluence.push(pageReport);

  const ticketPath = path.join(pipelineDir, 'tickets', `${ticketSummary.ticket_id}.json`);
  const ticket = JSON.parse(fs.readFileSync(ticketPath, 'utf8'));
  ticket.technical_contract.confluence_attachments = {
    uploaded: pageReport.uploaded,
    referenced: pageReport.referenced,
    missing: pageReport.missing,
    verified: pageReport.verified,
  };
  fs.writeFileSync(ticketPath, `${JSON.stringify(ticket, null, 2)}\n`, 'utf8');

  const jiraEndpoint = `/rest/api/3/issue/${ticketSummary.ticket_id}/attachments`;
  const jiraResult = await uploadAttachment(`${baseUrl}${jiraEndpoint}`, ticketPath, 'no-check');
  const deprecated = deprecationInfo(jiraResult.response, jiraEndpoint);
  if (deprecated) report.deprecated_endpoints.push(deprecated);
  const currentIssue = await request(`${baseUrl}/rest/api/3/issue/${ticketSummary.ticket_id}?fields=attachment,status,labels,parent,issuelinks`);
  const labels = (currentIssue.body.fields.labels || [])
    .filter((label) => !label.startsWith('eds-contract:') && label !== 'eds-business-input');
  labels.push(`eds-contract:${ticket.technical_contract.completo ? 'complete' : 'incomplete'}`);
  if (ticket.business_input_required) labels.push('eds-business-input');
  const description = jiraDescription(ticket);
  await request(`${baseUrl}/rest/api/3/issue/${ticketSummary.ticket_id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ fields: { labels, description } }),
  });
  const existingLinkedKeys = new Set((currentIssue.body.fields.issuelinks || []).flatMap((link) => [link.inwardIssue?.key, link.outwardIssue?.key]).filter(Boolean));
  const createdLinks = [];
  for (const dependency of ticket.depends_on) {
    if (!existingLinkedKeys.has(dependency)) {
      await request(`${baseUrl}/rest/api/3/issueLink`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: { name: 'Blocks' }, inwardIssue: { key: dependency }, outwardIssue: { key: ticket.ticket_id } }),
      });
      createdLinks.push(dependency);
    }
  }
  const issue = await request(`${baseUrl}/rest/api/3/issue/${ticketSummary.ticket_id}?fields=attachment,status,labels,parent,description,issuelinks`);
  const jiraAttachments = (issue.body.fields.attachment || []).map((attachment) => attachment.filename);
  report.jira.push({
    ticket_id: ticketSummary.ticket_id,
    attachment: `${ticketSummary.ticket_id}.json`,
    verified: jiraAttachments.includes(`${ticketSummary.ticket_id}.json`),
    status: issue.body.fields.status.name,
    labels: issue.body.fields.labels,
    parent: issue.body.fields.parent?.key || null,
    description_updated: true,
    depends_on: ticket.depends_on,
    issue_links_created: createdLinks,
    issue_links_verified: ticket.depends_on.every((dependency) => (issue.body.fields.issuelinks || []).some((link) => link.inwardIssue?.key === dependency || link.outwardIssue?.key === dependency)),
    contract_label_verified: issue.body.fields.labels.includes(`eds-contract:${ticket.technical_contract.completo ? 'complete' : 'incomplete'}`),
  });
}

report.confluence.sort((left, right) => left.identity.localeCompare(right.identity));
report.jira.sort((left, right) => left.ticket_id.localeCompare(right.ticket_id, undefined, { numeric: true }));

index.backend.confluence_attachments = report.confluence.every((entry) => entry.verified) ? 'REST nivel 2 — verificado' : 'REST nivel 2 — incompleto';
index.backend.confluence_macro_updates = 'REST nivel 2 — verificado';
index.backend.jira_attachments = report.jira.every((entry) => entry.verified) ? 'REST nivel 2 — verificado' : 'REST nivel 2 — incompleto';
index.backend.token_source = report.token_source;
index.backend.deprecated_endpoints = report.deprecated_endpoints;
index.evidence = {
  complete_components: report.confluence.filter((entry) => entry.verified).length,
  total_components: report.confluence.length,
  broken_image_references: report.confluence.flatMap((entry) => entry.missing.map((name) => `${entry.identity}/${name}`)),
};
fs.writeFileSync(indexPath, `${JSON.stringify(index, null, 2)}\n`, 'utf8');
fs.writeFileSync(path.join(pipelineDir, 'backend-report.json'), `${JSON.stringify(report, null, 2)}\n`, 'utf8');

const failedPages = report.confluence.filter((entry) => !entry.verified);
const failedIssues = report.jira.filter((entry) => !entry.verified);
if (failedPages.length || failedIssues.length) {
  throw new Error(`Attachment verification failed: Confluence=${failedPages.length}, Jira=${failedIssues.length}`);
}

console.log(JSON.stringify({
  confluence_pages: report.confluence.length,
  confluence_assets_uploaded: report.confluence.reduce((total, entry) => total + entry.uploaded.length, 0),
  confluence_references_verified: report.confluence.reduce((total, entry) => total + entry.referenced.length, 0),
  jira_ticket_attachments_verified: report.jira.length,
  deprecated_endpoints: report.deprecated_endpoints.length,
}, null, 2));