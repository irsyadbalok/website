import { defineConfig } from 'astro/config';

// Alamat laman ditentukan semasa "build" supaya kod yang sama berfungsi di
// alamat prototaip (irsyadbalok.github.io/website) dan di domain sebenar.
const site = process.env.SITE_URL || 'https://irsyadbalok.com.my';
const base = process.env.BASE_PATH || '/';

export default defineConfig({
  site,
  base,
  trailingSlash: 'always',
});
