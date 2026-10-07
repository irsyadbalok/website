// Mengecilkan gambar yang dimuat naik melalui CMS, dalam hasil "build" (dist/) sahaja.
// Fail asal dalam public/images/uploads tidak disentuh. Dijalankan secara automatik
// pada hujung "astro build" (lihat astro.config.mjs).
//
// Sebab: gambar kamera telefon bersaiz 3 MB ke atas dan 4000 piksel lebar, sedangkan laman
// memaparkannya pada lebar beberapa ratus piksel. Salinan yang diterbitkan dihadkan kepada
// 1600 piksel pada sisi terpanjang. Maklumat tersembunyi dalam gambar (termasuk lokasi GPS)
// turut dibuang daripada salinan yang diterbitkan.
import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join, extname } from 'node:path';

const SISI_MAKS = 1600;
const KUALITI = 76;
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
  const fail = (await senaraiFail(join(dist, 'images', 'uploads'))).filter((f) => JENIS.has(extname(f).toLowerCase()));
  let asal = 0;
  let akhir = 0;
  let bil = 0;
  for (const f of fail) {
    try {
      const data = await readFile(f);
      // Format sebenar dibaca daripada isi fail, bukan nama fail.
      const { format } = await sharp(data).metadata();
      // rotate() tanpa nilai: ikut orientasi yang dirakam oleh kamera.
      let imej = sharp(data).rotate().resize({ width: SISI_MAKS, height: SISI_MAKS, fit: 'inside', withoutEnlargement: true });
      if (format === 'jpeg') imej = imej.jpeg({ quality: KUALITI, mozjpeg: true });
      else if (format === 'png') imej = imej.png({ compressionLevel: 9 });
      else if (format === 'webp') imej = imej.webp({ quality: KUALITI });
      else continue;
      const hasil = await imej.toBuffer();
      asal += data.length;
      if (hasil.length < data.length) {
        await writeFile(f, hasil);
        akhir += hasil.length;
        bil++;
      } else {
        akhir += data.length;
      }
    } catch (e) {
      // Satu gambar rosak tidak boleh menghentikan penerbitan laman.
      console.warn(`[gambar] Dilangkau: ${f} (${e.message})`);
    }
  }
  const mb = (n) => (n / 1048576).toFixed(1);
  console.log(`[gambar] ${bil} daripada ${fail.length} gambar dikecilkan: ${mb(asal)} MB -> ${mb(akhir)} MB`);
}
