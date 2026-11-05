import { getLocale } from "./i18n";

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

const indonesianProjects: Project[] = [
  {
    slug: "lowkeythings",
    image: "lowkeythings.webp",
    number: "01",
    title: "LowkeyThings",
    category: "Event platform",
    description:
      "Platform event yang menghubungkan pencarian dan pendaftaran peserta dengan pengelolaan event, keuangan, dan check-in.",
    overview:
      "LowkeyThings mempertemukan peserta dan penyelenggara event. Peserta dapat mencari event dan mengisi formulir pendaftaran, sementara penyelenggara mengelola halaman event, peserta, perlengkapan, keuangan, dan check-in dari satu platform.",
    challenge:
      "Informasi event, pendaftaran, pembayaran, dan pengelolaan peserta perlu terhubung agar pengalaman kedua pihak tetap jelas.",
    approach:
      "Hubungkan katalog dan formulir pendaftaran dengan dasbor penyelenggara untuk memantau peserta, keuangan, pengambilan perlengkapan, dan check-in.",
    focus: ["Katalog dan pendaftaran event", "Pengelolaan peserta dan perlengkapan", "Keuangan dan check-in"],
    access: { status: "public", url: "https://www.lowkeythings.my.id/" },
  },
  {
    slug: "papanclip",
    image: "papanclip.webp",
    number: "02",
    title: "PapanClip",
    category: "Project management",
    description:
      "Ruang kerja tim untuk merencanakan proyek, mengelola tugas, dan melihat progres melalui Kanban, daftar, dan timeline.",
    overview:
      "PapanClip menyatukan workspace, board, tugas, dan akses tim. Berbagai tampilan membantu tim mengikuti pekerjaan, sementara KPI menunjukkan kontribusi anggota dan AI membantu menyiapkan rancangan rencana yang tetap ditinjau pengguna.",
    challenge: "Tugas, tenggat, dokumen, dan tanggung jawab tim perlu tetap mudah ditemukan ketika proyek berkembang.",
    approach:
      "Satukan pekerjaan dalam workspace dengan tampilan Kanban, daftar, dan Gantt serta izin akses sesuai peran setiap anggota.",
    focus: [
      "Board, tugas, dan timeline proyek",
      "Peran tim dan kontrol akses",
      "KPI anggota dan bantuan perencanaan AI",
    ],
    access: { status: "public", url: "https://papanclip.hompimpa.biz.id/" },
  },
  {
    slug: "sprin-run",
    image: "sprin-run.webp",
    number: "03",
    title: "SPRIN RUN 2027",
    category: "Charity event",
    description:
      "Situs charity run yang menghubungkan pendaftaran lari 5K dan 10K dengan kampanye kesehatan perempuan Indonesia.",
    overview:
      "SPRIN RUN 2027 adalah inisiatif POGI Semarang melalui program Selamatkan Perempuan Indonesia. Situsnya memperkenalkan tujuan kegiatan, kategori lari, rute, manfaat peserta, serta informasi pendaftaran dan donasi.",
    challenge:
      "Peserta membutuhkan satu sumber untuk memahami tujuan sosial acara, memilih kategori lari, dan mengikuti informasi pendaftaran.",
    approach:
      "Susun informasi kampanye, kategori 5K dan 10K, rute, race kit, dan pendaftaran dalam pengalaman event yang mudah dijelajahi.",
    focus: ["Kampanye kesehatan perempuan", "Informasi kategori dan rute lari", "Pendaftaran peserta dan donasi"],
    access: { status: "public", url: "https://www.sprinrun.com/" },
  },
  {
    slug: "chandradimuka",
    image: "chandradimuka.webp",
    number: "04",
    title: "Dagora",
    category: "Retail operations",
    description:
      "Sistem operasional ritel untuk mengelola POS, pesanan, stok, penutupan kas, dan laporan penjualan dalam satu tempat.",
    overview:
      "Dagora menyatukan pekerjaan toko dan gudang dalam satu sistem berbasis akun. Tim dapat memproses transaksi lewat POS, meninjau pesanan dan refund, memantau stok per gudang serta display toko, lalu menutup kas dan membaca laporan penjualan dari dasbor yang sama.",
    challenge:
      "Penjualan, pesanan, stok, dan kas perlu tercatat konsisten di setiap cabang agar tim dapat melihat kondisi operasional dan menelusuri selisih tanpa berpindah antar sistem.",
    approach:
      "Hubungkan POS dan riwayat pesanan dengan inventori per gudang, rekonsiliasi cash closing, dan laporan yang dapat difilter serta diekspor.",
    focus: ["POS dan riwayat pesanan", "Inventori toko dan gudang", "Cash closing dan laporan penjualan"],
    access: { status: "private" },
  },
  {
    slug: "momentoku",
    image: "momentoku.webp",
    number: "05",
    title: "Momentoku",
    category: "Event photo sharing",
    description: "Album digital bersama yang mengumpulkan foto dan video dari tamu acara melalui satu QR code.",
    overview:
      "Momentoku membuat setiap tamu dapat membuka album event lewat QR atau tautan dan mengunggah media dari ponsel tanpa memasang aplikasi. Pemilik acara dapat menata galeri, mengunduh media, dan menyimpan kenangan dari berbagai sudut pandang.",
    challenge: "Foto dan video acara sering tersebar di perangkat serta percakapan banyak tamu.",
    approach:
      "Berikan setiap event satu album dan QR unik agar unggahan tamu terkumpul dalam galeri yang mudah dibagikan dan diunduh.",
    focus: ["Unggahan tamu melalui QR", "Galeri foto dan video bersama", "Pengelolaan serta unduhan media"],
    access: { status: "public", url: "https://momentoku.my.id/" },
  },
  {
    slug: "empatrima",
    image: "empatrima.webp",
    number: "06",
    title: "Empatrima",
    category: "Interactive quiz",
    description: "Platform kuis langsung yang mengajak peserta menjawab melalui perangkat mereka dan mengikuti skor secara real time.",
    overview:
      "Empatrima menghadirkan kuis bersama untuk acara dan komunitas. Pembawa acara menampilkan pertanyaan, peserta memilih jawaban dari perangkat masing-masing, lalu hasil dan papan peringkat membuat permainan mudah diikuti bersama.",
    challenge:
      "Kuis untuk banyak peserta membutuhkan cara menjawab yang sederhana serta hasil yang dapat diikuti seluruh ruangan.",
    approach:
      "Satukan tampilan pertanyaan, pilihan jawaban di perangkat peserta, skor, dan papan peringkat dalam satu pengalaman kuis langsung.",
    focus: ["Jawaban peserta melalui perangkat", "Skor dan papan peringkat", "Pengalaman kuis untuk acara bersama"],
    access: { status: "public", url: "https://www.empatrima.my.id/auth/login" },
  },
];

const englishCopy: Pick<Project, "category" | "description" | "overview" | "challenge" | "approach" | "focus">[] = [
  {
    category: "Event platform",
    description: "An event platform connecting discovery and registration with event management, finances, and check-in.",
    overview:
      "LowkeyThings connects attendees and event organizers. Attendees can find events and complete registration forms, while organizers manage event pages, participants, race kits, finances, and check-in from one platform.",
    challenge:
      "Event information, registration, payment, and attendee management needed to work together to keep the experience clear for everyone.",
    approach:
      "Connect the event catalog and registration forms to an organizer dashboard for tracking participants, finances, race kit pickup, and check-in.",
    focus: ["Event catalog and registration", "Participants and race kit management", "Finances and check-in"],
  },
  {
    category: "Project management",
    description:
      "A team workspace to plan projects, manage tasks, and track progress through Kanban, list, and timeline views.",
    overview:
      "PapanClip brings workspaces, boards, tasks, and team access together. Different views help teams follow work, KPIs show member contributions, and AI helps draft plans that users can review.",
    challenge: "Tasks, deadlines, documents, and team responsibilities needed to remain easy to find as projects grew.",
    approach:
      "Bring work into one workspace with Kanban, list, and Gantt views, plus role based access for each team member.",
    focus: [
      "Project boards, tasks, and timelines",
      "Team roles and access control",
      "Member KPIs and AI planning assistance",
    ],
  },
  {
    category: "Charity event",
    description: "A charity run website connecting 5K and 10K registration with an Indonesian women’s health campaign.",
    overview:
      "SPRIN RUN 2027 is an initiative by POGI Semarang through the Selamatkan Perempuan Indonesia program. Its website presents the campaign, race categories, routes, participant benefits, registration, and donation information.",
    challenge:
      "Participants needed one place to understand the cause, choose a race category, and follow registration updates.",
    approach:
      "Present the campaign, 5K and 10K categories, routes, race kits, and registration in an easy to explore event experience.",
    focus: [
      "Women’s health campaign",
      "Race categories and route information",
      "Participant registration and donations",
    ],
  },
  {
    category: "Retail operations",
    description: "A retail operations system for managing POS, orders, inventory, cash closing, and sales reports in one place.",
    overview:
      "Dagora brings store and warehouse work together in one account-based system. Teams can process sales through POS, review orders and refunds, track warehouse and store display stock, close cash, and read sales reports from the same dashboard.",
    challenge:
      "Sales, orders, inventory, and cash need consistent records across branches so teams can understand operations and trace discrepancies without switching between systems.",
    approach:
      "Connect POS and order history with warehouse inventory, cash closing reconciliation, and sales reports that can be filtered and exported.",
    focus: ["POS and order history", "Store and warehouse inventory", "Cash closing and sales reports"],
  },
  {
    category: "Event photo sharing",
    description: "A shared digital album that collects guest photos and videos through a single QR code.",
    overview:
      "Momentoku lets guests open an event album through a QR code or link and upload media from their phones without installing an app. Event owners can organize the gallery, download media, and keep memories from many points of view.",
    challenge: "Event photos and videos were often scattered across guests’ devices and conversations.",
    approach:
      "Give each event a unique album and QR code so guest uploads collect in a gallery that is easy to share and download.",
    focus: ["Guest uploads through QR codes", "Shared photo and video gallery", "Media management and downloads"],
  },
  {
    category: "Interactive quiz",
    description: "A live quiz platform where participants answer on their devices and follow scores in real time.",
    overview:
      "Empatrima brings shared quizzes to events and communities. A host presents questions, participants choose answers on their own devices, and results and a leaderboard keep the game easy to follow together.",
    challenge:
      "Quizzes with many participants need a simple way to answer and results the whole room can follow.",
    approach:
      "Bring questions, answers on participant devices, scores, and a leaderboard into one live quiz experience.",
    focus: ["Answers on participant devices", "Scores and leaderboard", "Shared event quiz experience"],
  },
];

export const projects: Project[] = indonesianProjects.map((project, index) =>
  getLocale() === "en" ? { ...project, ...englishCopy[index] } : project,
);

export const projectUrl = (project: Project) => `${import.meta.env.BASE_URL}work/${project.slug}/`;
