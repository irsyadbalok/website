// Bahasa, pautan dan teks antara muka.
// BM ialah bahasa lalai (tiada awalan); bahasa Inggeris di bawah /en/.

export type Lang = 'ms' | 'en';
export const LANGS: Lang[] = ['ms', 'en'];

const BASE = import.meta.env.BASE_URL.replace(/\/$/, '');

/** Pautan dalaman: href('en', 'sraib/profil') -> /en/sraib/profil/ */
export function href(lang: Lang, path = ''): string {
  const parts = [lang === 'en' ? 'en' : '', path].filter(Boolean).join('/');
  return `${BASE}/${parts}${parts ? '/' : ''}`;
}

/** Fail statik dalam /public: asset('images/logo-sraib.webp') */
export function asset(path: string): string {
  return `${BASE}/${path.replace(/^\//, '')}`;
}

export const NAMA = {
  akademi: 'Akademi Pendidikan Irsyad Balok',
  sraib: 'Sekolah Rendah Islam Al-Irsyad Balok',
  sraibPendek: 'SRI Al-Irsyad Balok',
  moto: 'Ke Arah Pembentukan Insan Rabbani',
};

/** Menu utama (akademi). */
type ItemMenu = { path: string; ms: string; en: string; sub?: { path: string; ms: string; en: string }[] };
// Unit (SRAIB, SMAIB, TATIB) tidak disenaraikan di sini: gerbang di laman utama akademi ialah pintu masuknya.
// Tiada "Utama": lencana dan nama akademi di kiri kepala sudah menuju ke laman utama.
export const MENU_UTAMA: ItemMenu[] = [
  {
    path: 'tentang',
    ms: 'Tentang',
    en: 'About',
    sub: [
      { path: 'tentang/visi-misi', ms: 'Visi, misi dan moto', en: 'Vision, mission and motto' },
      { path: 'tentang/falsafah', ms: 'Falsafah pendidikan Islam', en: 'Philosophy of Islamic education' },
    ],
  },
  { path: 'berita', ms: 'Berita', en: 'News' },
  { path: 'hubungi', ms: 'Hubungi', en: 'Contact' },
];

/** Nama pendek unit, untuk tanda pada senarai berita. */
export const UNIT = { akademi: 'Akademi', sraib: 'SRAIB', smaib: 'SMAIB', tatib: 'TATIB' } as const;

export const T = {
  ms: {
    langkau: 'Langkau ke kandungan',
    bahasaLain: 'English',
    bahasaLainLabel: 'Read this page in English',
    menuUtama: 'Menu utama',
    menu: 'Menu',
    submenu: 'Buka submenu',
    utama: 'Utama',
    profil: 'Profil',
    hubungiPendek: 'Hubungi',
    menuBahagian: 'Menu SRAIB',
    daftar: 'Daftar pelajar baharu',
    daftarPendek: 'Daftar',
    kerjasama: 'Kerjasama dan tajaan',
    hubungi: 'Hubungi kami',
    bacaLanjut: 'Baca lanjut',
    hubungiPejabat: 'Hubungi pejabat',
    beritaTerkini: 'Berita terkini',
    semuaBerita: 'Semua berita',
    tiadaBerita: 'Belum ada berita diterbitkan.',
    acaraAkanDatang: 'Acara akan datang',
    takwimPenuh: 'Takwim penuh',
    tiadaAcara: 'Tiada acara lagi untuk tahun ini.',
    pautanPantas: 'Pautan pantas',
    pendaftaran: 'Pendaftaran pelajar baharu',
    ibuBapa: 'E-Ibu Bapa',
    staf: 'E-Staf',
    perluSahkan: 'Menunggu pengesahan sekolah',
    bmSahaja: 'Halaman ini belum diterjemah. Teks Bahasa Melayu dipaparkan.',
    muatTurunPdf: 'Muat turun PDF',
    lihatGambar: 'Buka gambar penuh',
    gambarPenuh: 'Gambar penuh',
    tutup: 'Tutup',
    gambarSebelum: 'Gambar sebelumnya',
    gambarSeterusnya: 'Gambar seterusnya',
    diTiktok: 'Tonton di TikTok',
    diInstagram: 'Lihat di Instagram',
    diFacebook: 'Lihat di Facebook',
    diYoutube: 'Tonton di YouTube',
    dikemaskini: 'Disemak pada',
    sumber: 'Sumber',
    lagiBahagian: 'Lagi dalam bahagian ini',
    tigaUnit: 'Tiga gerbang, satu akademi',
    akanMenyusul: 'Laman akan menyusul',
    masuk: 'Masuk ke laman SRAIB',
    sumbangan: 'Sumbangan',
    alamat: 'Alamat',
    telefon: 'Telefon',
    emel: 'E-mel',
    mediaSosial: 'Media sosial',
    bukaPeta: 'Buka lokasi dalam Google Maps',
    notisPrivasi: 'Notis privasi',
    hakCipta: 'Hak cipta',
    faktaRingkas: 'Fakta ringkas',
    bacaPenuh: 'Baca tinta penuh',
    kenali: 'Kenali SRAIB',
    pautanLuar: '(laman luar)',
  },
  en: {
    langkau: 'Skip to content',
    bahasaLain: 'Bahasa Melayu',
    bahasaLainLabel: 'Baca halaman ini dalam Bahasa Melayu',
    menuUtama: 'Main menu',
    menu: 'Menu',
    submenu: 'Open submenu',
    utama: 'Home',
    profil: 'Profile',
    hubungiPendek: 'Contact',
    menuBahagian: 'SRAIB menu',
    daftar: 'Register a new pupil',
    daftarPendek: 'Register',
    kerjasama: 'Partnership and sponsorship',
    hubungi: 'Contact us',
    bacaLanjut: 'Read more',
    hubungiPejabat: 'Contact the office',
    beritaTerkini: 'Latest news',
    semuaBerita: 'All news',
    tiadaBerita: 'No news has been published yet.',
    acaraAkanDatang: 'Upcoming events',
    takwimPenuh: 'Full calendar',
    tiadaAcara: 'No more events this year.',
    pautanPantas: 'Quick links',
    pendaftaran: 'New pupil registration',
    ibuBapa: 'Parent portal',
    staf: 'Staff portal',
    perluSahkan: 'Awaiting confirmation by the school',
    bmSahaja: 'This page has not been translated yet. The Bahasa Melayu text is shown.',
    muatTurunPdf: 'Download PDF',
    lihatGambar: 'Open the full photo',
    gambarPenuh: 'Full photo',
    tutup: 'Close',
    gambarSebelum: 'Previous photo',
    gambarSeterusnya: 'Next photo',
    diTiktok: 'Watch on TikTok',
    diInstagram: 'View on Instagram',
    diFacebook: 'View on Facebook',
    diYoutube: 'Watch on YouTube',
    dikemaskini: 'Reviewed on',
    sumber: 'Source',
    lagiBahagian: 'More in this section',
    tigaUnit: 'Three gateways, one academy',
    akanMenyusul: 'Site to follow',
    masuk: 'Enter the SRAIB site',
    sumbangan: 'Donations',
    alamat: 'Address',
    telefon: 'Telephone',
    emel: 'E-mail',
    mediaSosial: 'Social media',
    bukaPeta: 'Open the location in Google Maps',
    notisPrivasi: 'Privacy notice',
    hakCipta: 'Copyright',
    faktaRingkas: 'Quick facts',
    bacaPenuh: 'Read the full message',
    kenali: 'About SRAIB',
    pautanLuar: '(external site)',
  },
} as const;

const BULAN = {
  ms: ['Januari', 'Februari', 'Mac', 'April', 'Mei', 'Jun', 'Julai', 'Ogos', 'September', 'Oktober', 'November', 'Disember'],
  en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
};

/** Tarikh dalam fail ialah tarikh kalendar (UTC), jadi dibaca dalam UTC untuk elak anjakan hari. */
export function tarikh(d: Date, lang: Lang, denganTahun = true): string {
  const s = `${d.getUTCDate()} ${BULAN[lang][d.getUTCMonth()]}`;
  return denganTahun ? `${s} ${d.getUTCFullYear()}` : s;
}

export function julat(mula: Date, tamat: Date | undefined, lang: Lang): string {
  if (!tamat || tamat.getTime() === mula.getTime()) return tarikh(mula, lang, false);
  if (mula.getUTCMonth() === tamat.getUTCMonth()) {
    return `${mula.getUTCDate()}–${tarikh(tamat, lang, false)}`;
  }
  return `${tarikh(mula, lang, false)} – ${tarikh(tamat, lang, false)}`;
}

export function namaBulan(i: number, lang: Lang): string {
  return BULAN[lang][i];
}
