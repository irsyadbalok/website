// Struktur kandungan. Setiap koleksi sepadan dengan satu borang dalam Pages CMS (.pages.yml).
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const unit = z.enum(['akademi', 'sraib', 'smaib', 'tatib']);

// Borang CMS menyimpan medan pilihan yang dibiarkan kosong sebagai '' atau null.
// Kedua-duanya dianggap "tiada nilai" supaya medan kosong tidak menggagalkan "build".
const kosong = (v: unknown) => (v === '' || v === null ? undefined : v);
const teks = z.preprocess(kosong, z.string().optional());
const tarikhPilihan = z.preprocess(kosong, z.coerce.date().optional());

// Halaman tetap. Laluan fail menentukan alamat:
//   halaman/ms/sraib/profil.md  ->  /sraib/profil/
//   halaman/en/sraib/profil.md  ->  /en/sraib/profil/
const halaman = defineCollection({
  loader: glob({ base: './src/content/halaman', pattern: '**/*.md' }),
  schema: z.object({
    tajuk: z.string(),
    ringkasan: teks,
    urutan: z.preprocess(kosong, z.number().default(50)),
    semakan: tarikhPilihan,
    sumber: teks,
    // Jika diisi, satu nota "menunggu pengesahan" dipaparkan pada halaman.
    perlu_sahkan: teks,
  }),
});

const berita = defineCollection({
  loader: glob({ base: './src/content/berita', pattern: '*.md' }),
  schema: z
    .object({
      tajuk: z.string(),
      tarikh: z.coerce.date(),
      unit,
      ringkasan: z.string(),
      status: z.enum(['draf', 'terbit']).default('draf'),
      // Hingga 3 gambar; yang pertama ialah gambar utama. Pos lama menyimpan satu laluan sahaja,
      // jadi nilai tunggal ditukar kepada senarai.
      gambar: z.preprocess(
        (v) => (v === '' || v == null ? [] : Array.isArray(v) ? v.filter(Boolean).slice(0, 3) : [v]),
        z.array(z.string()),
      ),
      gambar_alt: teks,
      tajuk_en: teks,
      ringkasan_en: teks,
      // Satu dokumen PDF dan hingga 3 pautan media sosial, dipaparkan sebagai butang di hujung berita.
      // Pautan yang tidak dibenarkan ditapis dalam src/lib/pautan.ts, bukan di sini,
      // supaya satu pautan salah tidak menghentikan seluruh laman.
      pdf: teks,
      pdf_label: teks,
      pautan: z.preprocess((v) => v ?? [], z.array(z.object({ url: teks, label: teks }))),
    })
    // Peraturan kebolehcapaian: gambar tanpa teks alt menggagalkan "build".
    .refine((d) => d.gambar.length === 0 || Boolean(d.gambar_alt), {
      message: 'Gambar utama mesti ada teks alt (gambar_alt).',
    }),
});

const takwim = defineCollection({
  loader: glob({ base: './src/content/takwim', pattern: '*.yaml' }),
  schema: z.object({
    tahun: z.number(),
    acara: z.array(
      z.object({
        tajuk: z.string(),
        tajuk_en: teks,
        mula: z.coerce.date(),
        tamat: tarikhPilihan,
        unit,
        kategori: z.enum(['kokurikulum', 'akademik', 'cuti', 'program']),
      }),
    ),
  }),
});

// Butiran hubungan dan media sosial bagi satu unit. Medan kosong tidak dipaparkan.
const hubungan = z.object({
  telefon: teks,
  emel: teks,
  facebook: teks,
  instagram: teks,
  tiktok: teks,
  // Gambar lebar penuh di laman utama unit. Jika kosong, lencana sekolah dipaparkan.
  gambar_utama: teks,
  gambar_utama_alt: teks,
});

const tetapan = defineCollection({
  loader: glob({ base: './src/content/tetapan', pattern: '*.yaml' }),
  schema: z.object({
    alamat: z.array(z.string()),
    waktu_pejabat: teks,
    akademi: hubungan,
    sraib: hubungan,
    pautan: z.object({
      pendaftaran: z.string(),
      ibu_bapa: z.string(),
      staf: z.string(),
    }),
    sumbangan: z.array(z.object({ label: z.string(), label_en: teks, url: z.string() })).default([]),
    hebahan: z.object({
      aktif: z.boolean().default(false),
      teks: teks,
      teks_en: teks,
      tamat: tarikhPilihan,
    }),
  }),
});

export const collections = { halaman, berita, takwim, tetapan };
