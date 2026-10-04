// Fungsi bantuan untuk membaca kandungan.
import { getCollection, getEntry } from 'astro:content';
import type { Lang } from './i18n';

export async function tetapanLaman() {
  return (await getEntry('tetapan', 'laman'))!.data;
}

/** Berita yang diterbitkan, terbaharu dahulu. Draf tidak pernah dipaparkan. */
export async function beritaTerbit(units: string[] = ['akademi', 'sraib', 'smaib', 'tatib']) {
  const semua = await getCollection('berita', (b) => b.data.status === 'terbit' && units.includes(b.data.unit));
  return semua.sort((a, b) => b.data.tarikh.getTime() - a.data.tarikh.getTime());
}

export function tajukBerita(b: { data: { tajuk: string; tajuk_en?: string } }, lang: Lang) {
  return lang === 'en' && b.data.tajuk_en ? b.data.tajuk_en : b.data.tajuk;
}
export function ringkasanBerita(b: { data: { ringkasan: string; ringkasan_en?: string } }, lang: Lang) {
  return lang === 'en' && b.data.ringkasan_en ? b.data.ringkasan_en : b.data.ringkasan;
}

/** Semua acara takwim untuk unit tertentu, ikut tarikh. */
export async function acaraTakwim(units: string[]) {
  const fail = await getCollection('takwim');
  return fail
    .flatMap((f) => f.data.acara)
    .filter((a) => units.includes(a.unit))
    .sort((a, b) => a.mula.getTime() - b.mula.getTime());
}

/** Halaman dalam bahasa diminta; jika tiada terjemahan, pulangkan versi BM dan tandakan. */
export async function halamanUntuk(lang: Lang, path: string) {
  const semua = await getCollection('halaman');
  const sendiri = semua.find((h) => h.id === `${lang}/${path}`);
  if (sendiri) return { entry: sendiri, tiadaTerjemahan: false };
  const bm = semua.find((h) => h.id === `ms/${path}`);
  return { entry: bm!, tiadaTerjemahan: lang !== 'ms' };
}

/** Halaman lain dalam bahagian yang sama (cth. semua di bawah sraib/), ikut urutan. */
export async function halamanBahagian(lang: Lang, path: string) {
  const bahagian = path.includes('/') ? path.split('/')[0] : '';
  if (!bahagian) return [];
  const bm = await getCollection('halaman', (h) => h.id.startsWith(`ms/${bahagian}/`));
  const senarai = await Promise.all(
    bm.map(async (h) => {
      const p = h.id.slice(3);
      const { entry } = await halamanUntuk(lang, p);
      return { path: p, tajuk: entry.data.tajuk, urutan: h.data.urutan };
    }),
  );
  return senarai.filter((h) => h.path !== path).sort((a, b) => a.urutan - b.urutan);
}
