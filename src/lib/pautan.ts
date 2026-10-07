// Butang di hujung berita: pautan media sosial dan dokumen PDF.
// Hanya laman dalam senarai di bawah dibenarkan. Untuk menambah laman (cth. Google Drive),
// tambah domainnya di sini DAN dalam "pattern" medan pautan di .pages.yml.
import { T, type Lang } from './i18n';

type Kunci = 'diTiktok' | 'diInstagram' | 'diFacebook' | 'diYoutube';

const DIBENARKAN: Record<string, Kunci> = {
  'tiktok.com': 'diTiktok',
  'instagram.com': 'diInstagram',
  'facebook.com': 'diFacebook',
  'fb.watch': 'diFacebook',
  'youtube.com': 'diYoutube',
  'youtu.be': 'diYoutube',
};

function kunciUntuk(url: string): Kunci | undefined {
  let u: URL;
  try {
    u = new URL(url.trim());
  } catch {
    return undefined;
  }
  if (u.protocol !== 'https:') return undefined;
  const hos = u.hostname.toLowerCase();
  const domain = Object.keys(DIBENARKAN).find((d) => hos === d || hos.endsWith('.' + d));
  return domain ? DIBENARKAN[domain] : undefined;
}

/**
 * Pautan yang sah sahaja (maksimum 3), dengan teks butang.
 * Baris kosong dan pautan dari laman lain dibuang; amaran dicatat dalam log "build".
 */
export function butangPautan(senarai: { url?: string; label?: string }[], lang: Lang, pos: string) {
  const hasil: { url: string; teks: string }[] = [];
  for (const p of senarai) {
    if (!p.url) continue;
    const kunci = kunciUntuk(p.url);
    if (!kunci) {
      console.warn(`[berita] ${pos}: pautan tidak dibenarkan dan tidak dipaparkan: ${p.url}`);
      continue;
    }
    hasil.push({ url: p.url.trim(), teks: p.label?.trim() || T[lang][kunci] });
  }
  return hasil.slice(0, 3);
}

/** Laluan PDF yang dimuat naik melalui CMS, atau undefined jika bukan fail .pdf tempatan. */
export function failPdf(laluan: string | undefined): string | undefined {
  return laluan && laluan.startsWith('/') && /\.pdf$/i.test(laluan) ? laluan : undefined;
}
