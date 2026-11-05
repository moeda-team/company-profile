export type Project = {
  slug: string;
  image: string;
  number: string;
  title: string;
  category: string;
  description: string;
  overview: string;
  challenge: string;
  approach: string;
  focus: string[];
  access: { status: "public"; url: string } | { status: "private" };
};

export const projects: Project[] = [
  {
    slug: "lowkeythings",
    image: "lowkeythings.webp",
    number: "01",
    title: "LowkeyThings",
    category: "Event platform",
    description: "Platform untuk menemukan event, mendaftar, membayar, dan menerima tiket dalam satu alur yang mudah diikuti.",
    overview: "LowkeyThings mempertemukan peserta dan penyelenggara event di seluruh Indonesia. Peserta dapat menjelajahi event dan mendaftar, sementara penyelenggara mengelola peserta, pembayaran, komunikasi, dan laporan dari satu platform.",
    challenge: "Informasi event, pendaftaran, pembayaran, dan pengelolaan peserta perlu terhubung agar pengalaman kedua pihak tetap jelas.",
    approach: "Bangun alur event dari pencarian hingga tiket dan berikan penyelenggara dasbor untuk memantau peserta serta performa event.",
    focus: ["Penemuan dan pencarian event", "Pendaftaran, pembayaran, dan tiket", "Pengelolaan peserta dan laporan"],
    access: { status: "public", url: "https://www.lowkeythings.my.id/" },
  },
  {
    slug: "papanclip",
    image: "papanclip.webp",
    number: "02",
    title: "PapanClip",
    category: "Project management",
    description: "Ruang kerja tim untuk merencanakan proyek, mengelola tugas, dan melihat progres melalui Kanban, daftar, dan timeline.",
    overview: "PapanClip menyatukan workspace, board, tugas, dan akses tim. Berbagai tampilan membantu tim mengikuti pekerjaan, sementara KPI menunjukkan kontribusi anggota dan AI membantu menyiapkan rancangan rencana yang tetap ditinjau pengguna.",
    challenge: "Tugas, tenggat, dokumen, dan tanggung jawab tim perlu tetap mudah ditemukan ketika proyek berkembang.",
    approach: "Satukan pekerjaan dalam workspace dengan tampilan Kanban, daftar, dan Gantt serta izin akses sesuai peran setiap anggota.",
    focus: ["Board, tugas, dan timeline proyek", "Peran tim dan kontrol akses", "KPI anggota dan bantuan perencanaan AI"],
    access: { status: "public", url: "https://papanclip.hompimpa.biz.id/" },
  },
  {
    slug: "sprin-run",
    image: "sprin-run.webp",
    number: "03",
    title: "SPRIN RUN 2027",
    category: "Charity event",
    description: "Situs charity run yang menghubungkan pendaftaran lari 5K dan 10K dengan kampanye kesehatan perempuan Indonesia.",
    overview: "SPRIN RUN 2027 adalah inisiatif POGI Semarang melalui program Selamatkan Perempuan Indonesia. Situsnya memperkenalkan tujuan kegiatan, kategori lari, rute, manfaat peserta, serta informasi pendaftaran dan donasi.",
    challenge: "Peserta membutuhkan satu sumber untuk memahami tujuan sosial acara, memilih kategori lari, dan mengikuti informasi pendaftaran.",
    approach: "Susun informasi kampanye, kategori 5K dan 10K, rute, race kit, dan pendaftaran dalam pengalaman event yang mudah dijelajahi.",
    focus: ["Kampanye kesehatan perempuan", "Informasi kategori dan rute lari", "Pendaftaran peserta dan donasi"],
    access: { status: "public", url: "https://www.sprinrun.com/" },
  },
  {
    slug: "chandradimuka",
    image: "chandradimuka.webp",
    number: "04",
    title: "Chandradimuka Inventory Replenishment",
    category: "Retail operations",
    description: "Sistem internal untuk memantau stok, penjualan, perpindahan barang antar gudang, dan penutupan kas lintas cabang.",
    overview: "Inventory Replenishment memberi tim operasional satu tempat untuk mengikuti penjualan, permintaan stok, selisih penerimaan, transfer gudang, dan closing kas. Akses sistem memerlukan akun dari administrator bisnis.",
    challenge: "Pergerakan stok dan kas di beberapa cabang perlu tercatat jelas agar tim dapat menindaklanjuti selisih dan permintaan barang.",
    approach: "Hubungkan proses POS, replenishment, transfer gudang, dan kontrol kas dalam satu sistem operasional berbasis akun.",
    focus: ["Penjualan dan permintaan stok", "Transfer gudang dan selisih penerimaan", "Kontrol serta penutupan kas"],
    access: { status: "private" },
  },
  {
    slug: "momentoku",
    image: "momentoku.webp",
    number: "05",
    title: "Momentoku",
    category: "Event photo sharing",
    description: "Album digital bersama yang mengumpulkan foto dan video dari tamu acara melalui satu QR code.",
    overview: "Momentoku membuat setiap tamu dapat membuka album event lewat QR atau tautan dan mengunggah media dari ponsel tanpa memasang aplikasi. Pemilik acara dapat menata galeri, mengunduh media, dan menyimpan kenangan dari berbagai sudut pandang.",
    challenge: "Foto dan video acara sering tersebar di perangkat serta percakapan banyak tamu.",
    approach: "Berikan setiap event satu album dan QR unik agar unggahan tamu terkumpul dalam galeri yang mudah dibagikan dan diunduh.",
    focus: ["Unggahan tamu melalui QR", "Galeri foto dan video bersama", "Pengelolaan serta unduhan media"],
    access: { status: "public", url: "https://momentoku.my.id/" },
  },
];

export const projectUrl = (project: Project) =>
  `${import.meta.env.BASE_URL}work/${project.slug}/`;
