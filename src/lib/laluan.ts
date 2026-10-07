// Senarai SEMUA alamat laman. Digunakan oleh src/pages/[...path].astro (membina halaman)
// dan src/pages/sitemap.xml.ts (peta laman untuk enjin carian), supaya kedua-duanya sentiasa sepadan.
import { getCollection } from 'astro:content';
import { LANGS, type Lang } from './i18n';
import { laluanBerita } from './kandungan';

export type Laluan = { lang: Lang; path: string; view: string; id?: string };

export async function semuaLaluan(): Promise<Laluan[]> {
  const halaman = await getCollection('halaman');
  const berita = (await getCollection('berita')).filter((b) => b.data.status === 'terbit');
  const routes: Laluan[] = [];

  // id halaman: 'ms/sraib/profil' -> laluan 'sraib/profil'
  const laluanBM = halaman.filter((h) => h.id.startsWith('ms/')).map((h) => h.id.slice(3));

  for (const lang of LANGS) {
    routes.push({ lang, path: '', view: 'hub' });
    routes.push({ lang, path: 'berita', view: 'berita-akademi' });
    routes.push({ lang, path: 'hubungi', view: 'hubungi' });
    routes.push({ lang, path: 'sraib', view: 'sraib' });
    routes.push({ lang, path: 'sraib/berita', view: 'berita' });
    routes.push({ lang, path: 'sraib/takwim', view: 'takwim' });
    for (const p of laluanBM) routes.push({ lang, path: p, view: 'halaman' });
    for (const b of berita) routes.push({ lang, path: laluanBerita(b), view: 'pos', id: b.id });
  }
  return routes;
}
