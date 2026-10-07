import { fileURLToPath } from 'node:url';
import { defineConfig } from 'astro/config';
import { kecilkanGambar } from './scripts/kecilkan-gambar.mjs';

// Alamat laman ditentukan semasa "build" supaya kod yang sama berfungsi di
// alamat prototaip (irsyadbalok.github.io/website) dan di domain sebenar.
const site = process.env.SITE_URL || 'https://irsyadbalok.com.my';
const base = process.env.BASE_PATH || '/';

export default defineConfig({
  site,
  base,
  trailingSlash: 'always',
  integrations: [
    {
      // Selepas laman dibina, kecilkan gambar yang dimuat naik (dalam dist/ sahaja).
      name: 'kecilkan-gambar',
      hooks: {
        'astro:build:done': async ({ dir }) => kecilkanGambar(fileURLToPath(dir)),
      },
    },
  ],
});
