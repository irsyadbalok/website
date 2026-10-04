// Pautan dan gambar dalam Markdown ditulis bermula dengan "/" (cth. /images/uploads/x.jpg).
// Di alamat prototaip, laman berada di bawah satu laluan asas (cth. /website/), jadi pautan
// sedemikian perlu ditambah awalan. Di domain sebenar (laluan asas "/") fail ini tidak berbuat apa-apa.
import { defineMiddleware } from 'astro:middleware';

const base = import.meta.env.BASE_URL.replace(/\/$/, '');

export const onRequest = defineMiddleware(async (_context, next) => {
  const response = await next();
  if (!base || !response.headers.get('content-type')?.includes('text/html')) return response;

  const html = await response.text();
  const fixed = html.replace(/\b(href|src)="(\/(?!\/)[^"]*)"/g, (match, attr, url) =>
    url === base || url.startsWith(base + '/') ? match : `${attr}="${base}${url}"`,
  );
  return new Response(fixed, { status: response.status, headers: response.headers });
});
