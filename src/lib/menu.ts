// Menu kepala laman SRAIB: Utama, Profil (lima lajur), Media, Hubungi.
// "hash" ialah id tajuk dalam halaman sasaran; skrip check-links menyemak bahawa id itu wujud.

type Teks = { ms: string; en: string };
export type Pautan = Teks & { path: string; hash?: Teks };
export type Lajur = { tajuk: Teks; path: string; pautan: Pautan[] };

/** Lima lajur di bawah Profil, mengikut susunan pentadbiran sekolah. */
export const LAJUR_PROFIL: Lajur[] = [
  {
    tajuk: { ms: 'Guru Besar', en: 'Headmistress' },
    path: 'sraib/profil',
    pautan: [
      { ms: 'Tinta Guru Besar', en: 'Message from the Headmistress', path: 'sraib/tinta-guru-besar' },
      { ms: 'Profil sekolah', en: 'School profile', path: 'sraib/profil' },
      { ms: 'Sejarah penubuhan', en: 'History', path: 'sraib/sejarah' },
      { ms: 'Keterangan logo', en: 'About the logo', path: 'sraib/logo' },
      { ms: 'Piagam pelanggan', en: 'Client charter', path: 'sraib/piagam-pelanggan' },
      { ms: 'Fasiliti', en: 'Facilities', path: 'sraib/fasiliti' },
    ],
  },
  {
    tajuk: { ms: 'Kurikulum', en: 'Curriculum' },
    path: 'sraib/kurikulum',
    pautan: [
      { ms: 'Fokus akademik 2026', en: 'Academic focus 2026', path: 'sraib/kurikulum', hash: { ms: 'fokus-utama-akademik-2026', en: 'main-academic-focus-for-2026' } },
      { ms: 'Mata pelajaran', en: 'Subjects', path: 'sraib/kurikulum', hash: { ms: 'mata-pelajaran', en: 'subjects' } },
      { ms: 'Pentaksiran', en: 'Assessment', path: 'sraib/kurikulum', hash: { ms: 'pentaksiran-dan-peperiksaan', en: 'assessment-and-examinations' } },
      { ms: 'Bilik sumber', en: 'Resource rooms', path: 'sraib/kurikulum', hash: { ms: 'bilik-sumber', en: 'resource-rooms' } },
    ],
  },
  {
    tajuk: { ms: 'Hal Ehwal Murid', en: 'Student Affairs' },
    path: 'sraib/hal-ehwal-murid',
    pautan: [
      { ms: 'Visi dan misi', en: 'Vision and mission', path: 'sraib/hal-ehwal-murid', hash: { ms: 'visi', en: 'vision' } },
      { ms: 'Objektif', en: 'Objectives', path: 'sraib/hal-ehwal-murid', hash: { ms: 'objektif', en: 'objectives' } },
      { ms: 'Piagam pelanggan', en: 'Client charter', path: 'sraib/hal-ehwal-murid', hash: { ms: 'piagam-pelanggan-unit-hem', en: 'client-charter-of-the-student-affairs-unit' } },
      { ms: 'Carta organisasi', en: 'Organisation', path: 'sraib/hal-ehwal-murid', hash: { ms: 'carta-organisasi-unit-hem', en: 'student-affairs-unit-organisation' } },
    ],
  },
  {
    tajuk: { ms: 'Tarbiyah', en: 'Tarbiyah' },
    path: 'sraib/tarbiyah',
    pautan: [
      { ms: 'Misi dan visi', en: 'Mission and vision', path: 'sraib/tarbiyah', hash: { ms: 'misi', en: 'mission' } },
      { ms: 'Bidang khusus', en: 'Areas of responsibility', path: 'sraib/tarbiyah', hash: { ms: 'bidang-khusus', en: 'areas-of-responsibility' } },
      { ms: 'Carta organisasi', en: 'Organisation', path: 'sraib/tarbiyah', hash: { ms: 'carta-organisasi-unit-tarbiyah', en: 'tarbiyah-unit-organisation' } },
    ],
  },
  {
    tajuk: { ms: 'Kokurikulum', en: 'Co-curriculum' },
    path: 'sraib/kokurikulum',
    pautan: [
      { ms: 'Badan beruniform', en: 'Uniformed bodies', path: 'sraib/kokurikulum', hash: { ms: 'badan-beruniform', en: 'uniformed-bodies' } },
      { ms: 'Kelab dan persatuan', en: 'Clubs and societies', path: 'sraib/kokurikulum', hash: { ms: 'kelab-dan-persatuan', en: 'clubs-and-societies' } },
      { ms: 'Sukan dan permainan', en: 'Sports and games', path: 'sraib/kokurikulum', hash: { ms: 'sukan-dan-permainan', en: 'sports-and-games' } },
      { ms: 'Rumah sukan', en: 'Sports houses', path: 'sraib/kokurikulum', hash: { ms: 'rumah-sukan', en: 'sports-houses' } },
      { ms: 'Majlis Perancangan', en: 'Planning Council', path: 'sraib/kokurikulum', hash: { ms: 'majlis-perancangan-kokurikulum', en: 'co-curriculum-planning-council' } },
    ],
  },
];

/** Pautan dalaman di bawah Media. Pautan media sosial ditambah daripada tetapan laman. */
export const MEDIA: Pautan[] = [
  { ms: 'Berita', en: 'News', path: 'sraib/berita' },
  { ms: 'Takwim', en: 'Calendar', path: 'sraib/takwim' },
];

/** Bahagian menu yang aktif bagi sesuatu laluan SRAIB. */
export function bahagianSraib(path: string): 'utama' | 'profil' | 'media' | 'lain' {
  if (path === 'sraib') return 'utama';
  if (path.startsWith('sraib/berita') || path === 'sraib/takwim') return 'media';
  if (path === 'sraib/pendaftaran') return 'lain';
  return 'profil';
}
