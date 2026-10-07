// Arahan untuk enjin carian. Fail ini hanya dibaca di akar domain (irsyadbalok.com.my/robots.txt);
// di alamat prototaip ia tidak berkesan, jadi halaman prototaip ditanda "noindex" dalam Base.astro.
import type { APIRoute } from 'astro';
import { asset } from '../lib/i18n';

export const GET: APIRoute = ({ site }) =>
  new Response(`User-agent: *\nAllow: /\n\nSitemap: ${new URL(asset('sitemap.xml'), site)}\n`, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
