import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const pipelineDir = path.join(root, '.eds-pipeline');
const proposal = JSON.parse(fs.readFileSync(path.join(root, 'propuesta-componentes.json'), 'utf8'));
const index = JSON.parse(fs.readFileSync(path.join(pipelineDir, 'index.json'), 'utf8'));
const backend = JSON.parse(fs.readFileSync(path.join(pipelineDir, 'backend-report.json'), 'utf8'));
const config = JSON.parse(fs.readFileSync(path.join(root, '.github', 'config.json'), 'utf8'));
const token = process.env.ATLASSIAN_API_TOKEN || config._atlassian_token;

const failures = [];
const assert = (condition, message) => {
  if (!condition) failures.push(message);
};

const ticketFiles = fs.readdirSync(path.join(pipelineDir, 'tickets')).filter((name) => /^PA-\d+\.json$/.test(name));
const contractFiles = fs.readdirSync(path.join(pipelineDir, 'contracts')).filter((name) => name.endsWith('.md'));
const epicFiles = fs.readdirSync(path.join(pipelineDir, 'epics')).filter((name) => /^PA-\d+\.json$/.test(name));
assert(ticketFiles.length === proposal.componentes.length, `Expected ${proposal.componentes.length} tickets, found ${ticketFiles.length}`);
assert(contractFiles.length === proposal.componentes.length, `Expected ${proposal.componentes.length} contracts, found ${contractFiles.length}`);
assert(epicFiles.length === 12, `Expected 12 epics, found ${epicFiles.length}`);

const proposalById = new Map(proposal.componentes.map((component) => [component.component_id, component]));
const tickets = ticketFiles.map((name) => JSON.parse(fs.readFileSync(path.join(pipelineDir, 'tickets', name), 'utf8')));
const ticketIds = new Set(tickets.map((ticket) => ticket.ticket_id));
const requiredSections = ['## 1.', '## 2.', '### 3a.', '### 3b.', '### 3c.', '### 3d.', '## 4.', '## 5.', '## 6.', '## 7.', '## 8.', '## 9.', '## 10.'];
const expectedAssets = ['desktop.png', 'tablet.png', 'mobile.png', 'desktop-context.jpg', 'tablet-context.jpg', 'mobile-context.jpg', 'fragment.html', 'computed-styles.json', 'evidence.json'];
const expectedIncomplete = new Set(['PA-24', 'PA-26']);

for (const ticket of tickets) {
  const component = proposalById.get(ticket.component_id);
  assert(component, `${ticket.ticket_id} has unknown component ${ticket.component_id}`);
  assert(ticket.state === 'draft', `${ticket.ticket_id} is not draft`);
  assert(JSON.stringify(ticket.content_mapping) === JSON.stringify(component.content_mapping), `${ticket.ticket_id} content_mapping differs from proposal`);
  for (const dependency of ticket.depends_on) assert(ticketIds.has(dependency), `${ticket.ticket_id} has broken dependency ${dependency}`);

  const contractPath = path.join(root, ticket.technical_contract.local_path);
  const contract = fs.readFileSync(contractPath, 'utf8');
  for (const section of requiredSections) assert(contract.includes(section), `${ticket.ticket_id} contract misses ${section}`);
  assert(contract.includes(JSON.stringify(component.content_mapping, null, 2)), `${ticket.ticket_id} contract lacks literal content_mapping`);
  assert(ticket.technical_contract.completo === !expectedIncomplete.has(ticket.ticket_id), `${ticket.ticket_id} has unexpected completeness ${ticket.technical_contract.completo}`);
  assert(ticket.technical_contract.completo || ticket.technical_contract.incomplete_reasons.length > 0, `${ticket.ticket_id} is incomplete without concrete reasons`);
  const localReferences = [...contract.matchAll(/\.\.\/assets\/([^/`\s]+)\/([^`\s|]+)/g)];
  for (const reference of localReferences) {
    assert(fs.existsSync(path.join(pipelineDir, 'assets', reference[1], reference[2])), `${ticket.ticket_id} has broken local asset ${reference[0]}`);
  }
  for (const filename of expectedAssets) {
    assert(fs.existsSync(path.join(pipelineDir, 'assets', ticket.local_identity, filename)), `${ticket.ticket_id} misses ${filename}`);
  }
}

assert(index.tickets.length === tickets.length, 'index ticket count differs');
assert(index.epics.length === epicFiles.length, 'index epic count differs');
assert(index.dag.broken_references.length === 0, 'index reports broken DAG references');
assert(index.dag.max_depth === 3, `expected DAG depth 3, found ${index.dag.max_depth}`);
assert(index.cards_collision.status === 'resolved-serial', 'cards collision is not resolved by serialization');
assert(index.cards_collision.dispatch_safe === true, 'cards serialization is not dispatch-safe');
assert(JSON.stringify(index.cards_collision.serial_order) === JSON.stringify(['PA-25', 'PA-31', 'PA-32', 'PA-33']), 'cards serial order differs');
assert(JSON.stringify(tickets.find((ticket) => ticket.ticket_id === 'PA-25').depends_on) === '[]', 'PA-25 must be cards base');
assert(JSON.stringify(tickets.find((ticket) => ticket.ticket_id === 'PA-31').depends_on) === '["PA-25"]', 'PA-31 must wait for PA-25');
assert(JSON.stringify(tickets.find((ticket) => ticket.ticket_id === 'PA-32').depends_on) === '["PA-31"]', 'PA-32 must wait for PA-31');
assert(JSON.stringify(tickets.find((ticket) => ticket.ticket_id === 'PA-33').depends_on) === '["PA-32"]', 'PA-33 must wait for PA-32');

const pieContract = fs.readFileSync(path.join(pipelineDir, 'contracts', 'pie-chart.md'), 'utf8');
assert(pieContract.includes('pie-chart-item* (cardinalidad ilimitada)'), 'pie-chart lacks unlimited cardinality');
assert(pieContract.includes('Cada ángulo es value / sum(values)'), 'pie-chart lacks proportional angular model');
assert(pieContract.includes('Chart.js 4.x se distribuye como asset local versionado'), 'pie-chart lacks local Chart.js dependency');
assert(pieContract.includes('<canvas aria-hidden="true">'), 'pie-chart lacks decorative canvas contract');
const tabsContract = fs.readFileSync(path.join(pipelineDir, 'contracts', 'tabs.md'), 'utf8');
assert(tabsContract.includes('fragmentPath (fragment EDS, requerido)'), 'tabs lacks fragment authoring strategy');
assert(tabsContract.includes('carga fragmentPath bajo demanda'), 'tabs lacks lazy fragment loading');
const swaggerContract = fs.readFileSync(path.join(pipelineDir, 'contracts', 'swagger-console.md'), 'utf8');
assert(swaggerContract.includes('no realiza peticiones'), 'swagger-console lacks no-endpoint guard');
assert(swaggerContract.includes('nunca se registran secretos, contraseñas, tokens, cookies ni payloads sensibles'), 'swagger-console lacks sanitized logging rule');
assert(backend.confluence.length === tickets.length, 'backend report misses Confluence pages');
assert(backend.confluence.every((entry) => entry.verified && entry.missing.length === 0), 'Confluence attachment verification failed');
assert(backend.jira.length === tickets.length, 'backend report misses Jira tickets');
assert(backend.jira.every((entry) => entry.verified && entry.status === 'Por hacer'), 'Jira attachment/status verification failed');
assert(backend.jira.every((entry) => entry.description_updated), 'Jira description projection failed');
assert(backend.jira.every((entry) => entry.issue_links_verified), 'Jira dependency link verification failed');
for (const jiraEntry of backend.jira) {
  const ticket = tickets.find((candidate) => candidate.ticket_id === jiraEntry.ticket_id);
  assert(jiraEntry.parent === ticket.epic.id, `${jiraEntry.ticket_id} has parent ${jiraEntry.parent}, expected ${ticket.epic.id}`);
  assert(jiraEntry.labels.includes('eds-state:draft'), `${jiraEntry.ticket_id} lacks eds-state:draft`);
  assert(jiraEntry.labels.includes(`eds-block:${ticket.block_name}`), `${jiraEntry.ticket_id} lacks block label`);
  assert(jiraEntry.labels.includes(`eds-component:${ticket.component_id}`), `${jiraEntry.ticket_id} lacks component label`);
}
assert(backend.deprecated_endpoints.length === 0, 'Deprecated endpoints were reported');

for (const ticket of tickets) {
  const storagePath = path.join(pipelineDir, '.confluence', `${ticket.local_identity}.storage.html`);
  const storageBody = fs.readFileSync(storagePath, 'utf8');
  assert(!/\.eds-pipeline\/assets|\.\.\/assets/.test(storageBody), `${ticket.ticket_id} Confluence body contains a local path`);
  assert([...storageBody.matchAll(/ri:filename="([^"]+)"/g)].length === 6, `${ticket.ticket_id} Confluence body does not reference six images`);
}

let transitions = [];
if (token) {
  const baseUrl = `https://${config.atlassian.site}.atlassian.net`;
  const authorization = `Basic ${Buffer.from(`${config.atlassian.email}:${token}`).toString('base64')}`;
  const response = await fetch(`${baseUrl}/rest/api/3/issue/${tickets[0].ticket_id}/transitions`, {
    headers: { Authorization: authorization, Accept: 'application/json' },
  });
  assert(response.ok, `Transition query failed with ${response.status}`);
  if (response.ok) transitions = (await response.json()).transitions.map((transition) => ({ id: transition.id, name: transition.name, to: transition.to.name }));
} else {
  failures.push('Transition query unavailable: no token source');
}

assert(!transitions.some((transition) => /draft|borrador/i.test(`${transition.name} ${transition.to}`)), 'Workflow unexpectedly exposes a Draft transition/status');

const result = {
  valid: failures.length === 0,
  tickets: tickets.length,
  contracts: contractFiles.length,
  epics: epicFiles.length,
  completeness_criteria: 'Only unresolved external inputs or real contradictions remain incomplete after Gate 2 decisions',
  incomplete_contracts: tickets.filter((ticket) => !ticket.technical_contract.completo).length,
  evidence_files: tickets.length * expectedAssets.length,
  confluence_image_macros_verified: backend.confluence.reduce((total, entry) => total + entry.referenced.length, 0),
  jira_json_attachments_verified: backend.jira.filter((entry) => entry.verified).length,
  dependency_free: tickets.filter((ticket) => ticket.depends_on.length === 0).length,
  dispatch_eligible: tickets.filter((ticket) => ticket.state === 'approved' && (ticket.collision?.dispatch_safe ?? true)).length,
  workflow_transitions: transitions,
  failures,
};

fs.writeFileSync(path.join(pipelineDir, 'validation-report.json'), `${JSON.stringify(result, null, 2)}\n`, 'utf8');
console.log(JSON.stringify(result, null, 2));
if (failures.length) process.exit(1);