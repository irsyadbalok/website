// Peta laman untuk enjin carian: semua alamat, dengan pasangan BM dan Inggeris.
import type { APIRoute } from 'astro';
import { href } from '../lib/i18n';
import { semuaLaluan } from '../lib/laluan';

export const GET: APIRoute = async ({ site }) => {
  const penuh = (lang: 'ms' | 'en', path: string) => new URL(href(lang, path), site).toString();
  const laluan = [...new Set((await semuaLaluan()).map((l) => l.path))].sort();
  const entri = laluan.flatMap((p) =>
    (['ms', 'en'] as const).map(
      (lang) =>
        `  <url>\n    <loc>${penuh(lang, p)}</loc>\n` +
        `    <xhtml:link rel="alternate" hreflang="ms" href="${penuh('ms', p)}" />\n` +
        `    <xhtml:link rel="alternate" hreflang="en" href="${penuh('en', p)}" />\n  </url>`,
    ),
  );
  const xml =
    '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n' +
    entri.join('\n') +
    '\n</urlset>\n';
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
