// Ukuran gambar yang dimuat naik, dibaca semasa "build", supaya halaman boleh:
//   - menyatakan lebar dan tinggi (ruang ditempah; halaman tidak melompat semasa gambar dimuat);
//   - menawarkan salinan kecil kepada telefon melalui "srcset".
// Salinan itu sendiri dibuat oleh scripts/kecilkan-gambar.mjs pada hujung "build".
import { join } from 'node:path';
import { SISI_MAKS, LEBAR_KECIL, namaKecil } from '../../scripts/kecilkan-gambar.mjs';

export type MaklumatGambar = { w: number; h: number; kecil?: { laluan: string; w: number } };

export async function maklumatGambar(laluan: string): Promise<MaklumatGambar | undefined> {
  // Salinan kecil hanya wujud dalam hasil "build"; semasa "astro dev" gambar asal dipaparkan.
  if (!import.meta.env.PROD || !laluan.startsWith('/images/uploads/')) return undefined;
  try {
    const sharp = (await import('sharp')).default;
    const meta = await sharp(join(process.cwd(), 'public', laluan)).metadata();
    if (!meta.width || !meta.height || !['jpeg', 'png', 'webp'].includes(meta.format ?? '')) return undefined;
    // Orientasi 5 hingga 8: kamera merakam gambar secara mengiring, jadi lebar dan tinggi bertukar.
    const pusing = (meta.orientation ?? 1) >= 5;
    const lebar = pusing ? meta.height : meta.width;
    const tinggi = pusing ? meta.width : meta.height;
    const skala = Math.min(1, SISI_MAKS / Math.max(lebar, tinggi));
    const w = Math.round(lebar * skala);
    const h = Math.round(tinggi * skala);
    return { w, h, kecil: w > LEBAR_KECIL ? { laluan: namaKecil(laluan), w: LEBAR_KECIL } : undefined };
  } catch {
    return undefined; // tanpa maklumat, gambar dipaparkan seperti biasa
  }
}
