// Struktur kandungan. Setiap koleksi sepadan dengan satu borang dalam Pages CMS (.pages.yml).
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const unit = z.enum(['akademi', 'sraib', 'smaib', 'tatib']);

// Halaman tetap. Laluan fail menentukan alamat:
//   halaman/ms/sraib/profil.md  ->  /sraib/profil/
//   halaman/en/sraib/profil.md  ->  /en/sraib/profil/
const halaman = defineCollection({
  loader: glob({ base: './src/content/halaman', pattern: '**/*.md' }),
  schema: z.object({
    tajuk: z.string(),
    ringkasan: z.string().optional(),
    urutan: z.number().default(50),
    semakan: z.coerce.date().optional(),
    sumber: z.string().optional(),
    // Jika diisi, satu nota "menunggu pengesahan" dipaparkan pada halaman.
    perlu_sahkan: z.string().optional(),
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
      gambar: z.string().optional(),
      gambar_alt: z.string().optional(),
      tajuk_en: z.string().optional(),
      ringkasan_en: z.string().optional(),
    })
    // Peraturan kebolehcapaian: gambar tanpa teks alt menggagalkan "build".
    .refine((d) => !d.gambar || Boolean(d.gambar_alt), {
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
        tajuk_en: z.string().optional(),
        mula: z.coerce.date(),
        tamat: z.coerce.date().optional(),
        unit,
        kategori: z.enum(['kokurikulum', 'akademik', 'cuti', 'program']),
      }),
    ),
  }),
});

// Butiran hubungan dan media sosial bagi satu unit. Medan kosong tidak dipaparkan.
const hubungan = z.object({
  telefon: z.string().optional(),
  emel: z.string().optional(),
  facebook: z.string().optional(),
  instagram: z.string().optional(),
  tiktok: z.string().optional(),
  // Gambar lebar penuh di laman utama unit. Jika kosong, lencana sekolah dipaparkan.
  gambar_utama: z.string().optional(),
  gambar_utama_alt: z.string().optional(),
});

const tetapan = defineCollection({
  loader: glob({ base: './src/content/tetapan', pattern: '*.yaml' }),
  schema: z.object({
    alamat: z.array(z.string()),
    waktu_pejabat: z.string().optional(),
    akademi: hubungan,
    sraib: hubungan,
    pautan: z.object({
      pendaftaran: z.string(),
      ibu_bapa: z.string(),
      staf: z.string(),
    }),
    sumbangan: z.array(z.object({ label: z.string(), label_en: z.string().optional(), url: z.string() })).default([]),
    hebahan: z.object({
      aktif: z.boolean().default(false),
      teks: z.string().optional(),
      teks_en: z.string().optional(),
      tamat: z.coerce.date().optional(),
    }),
  }),
});

export const collections = { halaman, berita, takwim, tetapan };
