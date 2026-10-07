// Mengecilkan gambar yang dimuat naik melalui CMS, dalam hasil "build" (dist/) sahaja.
// Fail asal dalam public/images/uploads tidak disentuh. Dijalankan secara automatik
// pada hujung "astro build" (lihat astro.config.mjs).
//
// Sebab: gambar kamera telefon bersaiz 3 MB ke atas dan 4000 piksel lebar, sedangkan laman
// memaparkannya pada lebar beberapa ratus piksel. Bagi setiap gambar:
//   - salinan utama dihadkan kepada 1600 piksel pada sisi terpanjang (nama fail kekal);
//   - jika salinan utama lebih lebar daripada 800 piksel, satu salinan kecil selebar 800 piksel
//     turut dibuat (nama.w800.jpg). Pelayar memilih salinan yang sesuai melalui "srcset"
//     (lihat src/lib/gambar.ts, yang memakai peraturan yang sama).
// Maklumat tersembunyi dalam gambar (termasuk lokasi GPS) dibuang daripada salinan yang diterbitkan.
import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join, extname } from 'node:path';

export const SISI_MAKS = 1600;
export const LEBAR_KECIL = 800;
const KUALITI = 76;

/** 'a/b/foto.jpg' -> 'a/b/foto.w800.jpg' */
export const namaKecil = (laluan) => laluan.replace(/(\.[^./\\]+)$/, `.w${LEBAR_KECIL}$1`);
const JENIS = new Set(['.jpg', '.jpeg', '.png', '.webp']);

async function senaraiFail(dir) {
  let isi;
  try {
    isi = await readdir(dir, { withFileTypes: true });
  } catch {
    return []; // folder belum wujud
  }
  const hasil = await Promise.all(isi.map((e) => (e.isDirectory() ? senaraiFail(join(dir, e.name)) : [join(dir, e.name)])));
  return hasil.flat();
}

export async function kecilkanGambar(dist) {
  let sharp;
  try {
    sharp = (await import('sharp')).default;
  } catch {
    console.warn('[gambar] Pustaka "sharp" tiada; gambar diterbitkan pada saiz asal.');
    return;
  }
  const fail = (await senaraiFail(join(dist, 'images', 'uploads'))).filter(
    (f) => JENIS.has(extname(f).toLowerCase()) && !/\.w\d+\.[^.]+$/.test(f),
  );
  let asal = 0;
  let akhir = 0;
  let bil = 0;
  let bilKecil = 0;
  for (const f of fail) {
    try {
      const data = await readFile(f);
      // Format sebenar dibaca daripada isi fail, bukan nama fail.
      const meta = await sharp(data).metadata();
      const kod = (imej) =>
        meta.format === 'jpeg'
          ? imej.jpeg({ quality: KUALITI, mozjpeg: true })
          : meta.format === 'png'
            ? imej.png({ compressionLevel: 9 })
            : meta.format === 'webp'
              ? imej.webp({ quality: KUALITI })
              : null;
      // rotate() tanpa nilai: ikut orientasi yang dirakam oleh kamera.
      const utama = kod(sharp(data).rotate().resize({ width: SISI_MAKS, height: SISI_MAKS, fit: 'inside', withoutEnlargement: true }));
      if (!utama) continue;
      const { data: hasil, info } = await utama.toBuffer({ resolveWithObject: true });
      asal += data.length;
      // Tulis salinan baharu jika lebih kecil, atau jika fail asal membawa maklumat tersembunyi (EXIF).
      if (hasil.length < data.length || meta.exif) {
        await writeFile(f, hasil);
        akhir += hasil.length;
        bil++;
      } else {
        akhir += data.length;
      }
      if (info.width > LEBAR_KECIL) {
        await writeFile(namaKecil(f), await kod(sharp(data).rotate().resize({ width: LEBAR_KECIL })).toBuffer());
        bilKecil++;
      }
    } catch (e) {
      // Satu gambar rosak tidak boleh menghentikan penerbitan laman.
      console.warn(`[gambar] Dilangkau: ${f} (${e.message})`);
    }
  }
  const mb = (n) => (n / 1048576).toFixed(1);
  console.log(`[gambar] ${bil} daripada ${fail.length} gambar dikecilkan: ${mb(asal)} MB -> ${mb(akhir)} MB; ${bilKecil} salinan kecil dibuat`);
}
