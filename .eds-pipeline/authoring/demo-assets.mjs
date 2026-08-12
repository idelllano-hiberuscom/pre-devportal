/*
 * Genera el juego de imágenes demo para el portal.
 * Todo se dibuja en canvas con la paleta medida del portal (navy #013451, teal #017f9b)
 * y se exporta como JPEG (fotografías) o PNG (iconos y logotipos, con transparencia).
 */
import { chromium } from 'playwright';
import fs from 'node:fs';

const OUT = '/private/tmp/claude-501/-Volumes-SanDisk-Portable-SSD-Media-programacion-pre-devportal/c9c278ae-a2b8-4e15-bcb3-55744ce1f5c1/scratchpad/demo-assets';
fs.mkdirSync(OUT, { recursive: true });

// Fotografías de hero y de composición: degradados de marca con una malla suave encima.
const PHOTOS = [
  ['hero-inicio', 1600, 900, ['#013451', '#017f9b']],
  ['hero-ayuda', 1600, 900, ['#04283c', '#2a7d92']],
  ['hero-blog', 1600, 900, ['#012a40', '#4a8fa1']],
  ['hero-fraude', 1600, 900, ['#01202f', '#136b80']],
  ['hero-onboarding', 1600, 900, ['#023349', '#3f97ab']],
  ['hero-herramientas', 1600, 900, ['#012938', '#1c7f95']],
  ['hero-integraciones', 1600, 900, ['#01364f', '#0f8ba3']],
  ['hero-plugins', 1600, 900, ['#022c3e', '#2b8397']],
  ['contact-form', 720, 800, ['#01243a', '#1a6f88']],
  ['swagger-login', 1400, 900, ['#011e2c', '#125f75']],
  ['blog-destacado', 1200, 800, ['#023044', '#2d8497']],
  ['blog-secundario-1', 800, 600, ['#012c42', '#3b8b9d']],
  ['blog-secundario-2', 800, 600, ['#01374d', '#1d7d94']],
  ['paso-1', 704, 832, ['#01293c', '#17758c']],
  ['paso-2', 704, 832, ['#02324a', '#2b8598']],
  ['paso-3', 704, 832, ['#012534', '#0f6d84']],
  ['paso-4', 704, 832, ['#023a52', '#3d93a6']],
];

// Iconos de línea, estilo lucide, en teal de marca.
const ICONS = {
  'icon-basket': 'M5 8h14l-1.2 9.5a2 2 0 0 1-2 1.8H8.2a2 2 0 0 1-2-1.8L5 8Zm3.5 0 1.2-3.5M15.5 8l-1.2-3.5M9.5 12v3.5M14.5 12v3.5',
  'icon-coins': 'M8 10.5a4.5 3 0 1 0 9 0 4.5 3 0 1 0-9 0M8 10.5v4c0 1.6 2 3 4.5 3s4.5-1.4 4.5-3v-4M4 7.5a4.5 3 0 1 0 9 0 4.5 3 0 1 0-9 0M4 7.5v4',
  'icon-wallet': 'M4 8h16v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8Zm0 0V6a2 2 0 0 1 2-2h10M16 13h2',
  'icon-shuffle': 'M17 4l3 3-3 3M4 7h6.5c2 0 3 1.5 4 3M17 20l3-3-3-3M4 17h6.5c2 0 3-1.5 4-3',
  'icon-plug': 'M9 3v6M15 3v6M6 9h12v3a6 6 0 0 1-12 0V9Zm6 9v3',
  'icon-shield': 'M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3Zm-3.5 9 2.5 2.5 4.5-4.5',
  'icon-gear': 'M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6ZM12 3v2.5M12 18.5V21M4.2 7.5l2.2 1.3M17.6 15.2l2.2 1.3M4.2 16.5l2.2-1.3M17.6 8.8l2.2-1.3',
  'icon-handshake': 'M4 12l4-4 3 3 3-3 4 4-4 4-3-3-3 3-4-4Z',
  'icon-folder': 'M4 7h5l2 2.5h9V18a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7Z',
  'icon-file': 'M7 3h7l4 4v14H7V3Zm7 0v4h4M10 12h6M10 16h6',
  'icon-user': 'M12 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8ZM5 20c0-3.3 3.1-5.5 7-5.5s7 2.2 7 5.5',
  'icon-history': 'M4 9V4m0 5h5M4.5 9a8 8 0 1 1 1.2 8M12 8v4.5l3.5 2',
  'icon-ruler': 'M3 15 15 3l6 6L9 21l-6-6Zm4-1 1.5 1.5M10 11l1.5 1.5M13 8l1.5 1.5',
  'icon-clock': 'M12 4a8 8 0 1 0 0 16 8 8 0 0 0 0-16Zm0 3.5V12l3 2',
};

// Logotipos de plataforma y de método de pago, tipográficos.
const LOGOS = [
  ['logo-visa', 'VISA', 200, 64],
  ['logo-mastercard', 'MC', 200, 64],
  ['logo-amex', 'AMEX', 200, 64],
  ['logo-bizum', 'bizum', 200, 64],
  ['logo-applepay', 'Pay', 200, 64],
  ['logo-googlepay', 'G Pay', 200, 64],
  ['logo-woocommerce', 'WooCommerce', 494, 100],
  ['logo-prestashop', 'PrestaShop', 494, 100],
  ['logo-magento', 'Magento', 494, 100],
  ['logo-oscommerce', 'osCommerce', 494, 100],
  ['logo-givewp', 'GiveWP', 494, 100],
];

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 100, height: 100 } });
await page.goto('about:blank');

const written = [];

async function shoot(name, ext, w, h, drawFn, args) {
  const dataUrl = await page.evaluate(async ({ w, h, fn, args, ext }) => {
    const c = document.createElement('canvas');
    c.width = w; c.height = h;
    // eslint-disable-next-line no-new-func
    new Function('ctx', 'w', 'h', 'a', fn)(c.getContext('2d'), w, h, args);
    return c.toDataURL(ext === 'png' ? 'image/png' : 'image/jpeg', 0.86);
  }, { w, h, fn: drawFn, args, ext });
  const buf = Buffer.from(dataUrl.split(',')[1], 'base64');
  const file = `${OUT}/${name}.${ext}`;
  fs.writeFileSync(file, buf);
  written.push({ name: `${name}.${ext}`, bytes: buf.length, w, h });
}

const PHOTO_DRAW = `
  const g = ctx.createLinearGradient(0, 0, w, h);
  g.addColorStop(0, a.c1); g.addColorStop(1, a.c2);
  ctx.fillStyle = g; ctx.fillRect(0, 0, w, h);
  // malla diagonal muy suave, para que no sea un degradado plano
  ctx.strokeStyle = 'rgba(255,255,255,0.05)'; ctx.lineWidth = 1;
  for (let i = -h; i < w; i += 26) { ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i + h, h); ctx.stroke(); }
  // dos halos radiales para dar profundidad
  for (const [cx, cy, r, al] of [[w * 0.24, h * 0.28, Math.max(w, h) * 0.42, 0.16], [w * 0.78, h * 0.74, Math.max(w, h) * 0.36, 0.10]]) {
    const rg = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
    rg.addColorStop(0, 'rgba(255,255,255,' + al + ')'); rg.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = rg; ctx.fillRect(0, 0, w, h);
  }
  // viñeteado inferior, para que el texto superpuesto en blanco lea bien
  const vg = ctx.createLinearGradient(0, h * 0.45, 0, h);
  vg.addColorStop(0, 'rgba(0,0,0,0)'); vg.addColorStop(1, 'rgba(0,0,0,0.34)');
  ctx.fillStyle = vg; ctx.fillRect(0, 0, w, h);
`;

const ICON_DRAW = `
  ctx.clearRect(0, 0, w, h);
  ctx.save(); ctx.scale(w / 24, h / 24);
  ctx.strokeStyle = '#017f9b'; ctx.lineWidth = 1.7;
  ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  ctx.stroke(new Path2D(a.d));
  ctx.restore();
`;

const LOGO_DRAW = `
  ctx.clearRect(0, 0, w, h);
  ctx.fillStyle = '#013451';
  ctx.font = '600 ' + Math.round(h * 0.46) + 'px Helvetica, Arial, sans-serif';
  ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  ctx.fillText(a.label, w / 2, h / 2 + 1);
  ctx.strokeStyle = 'rgba(1,127,155,0.55)'; ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(w * 0.5 - a.label.length * h * 0.14, h * 0.82);
  ctx.lineTo(w * 0.5 + a.label.length * h * 0.14, h * 0.82); ctx.stroke();
`;

for (const [name, w, h, [c1, c2]] of PHOTOS) {
  await shoot(name, 'jpg', w, h, PHOTO_DRAW, { c1, c2 });
}
for (const [name, d] of Object.entries(ICONS)) {
  await shoot(name, 'png', 96, 96, ICON_DRAW, { d });
}
for (const [name, label, w, h] of LOGOS) {
  await shoot(name, 'png', w, h, LOGO_DRAW, { label });
}

await browser.close();

const total = written.reduce((s, f) => s + f.bytes, 0);
written.forEach((f) => console.log(`${f.name.padEnd(24)} ${String(f.w).padStart(4)}x${String(f.h).padEnd(4)} ${(f.bytes / 1024).toFixed(1)} KB`));
console.log(`\n${written.length} ficheros · ${(total / 1024).toFixed(0)} KB en total`);
fs.writeFileSync(`${OUT}/manifest.json`, JSON.stringify(written, null, 2));
