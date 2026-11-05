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
    slug: "operations",
    image: "operations.webp",
    number: "01",
    title: "Operational Management System",
    category: "Connected operations",
    description: "Satu ruang kerja untuk menyederhanakan alur operasional, koordinasi tim, dan keputusan harian.",
    overview: "Aktivitas operasional sering tersebar di banyak tempat. Sistem ini menyatukan pekerjaan, informasi, dan komunikasi tim dalam satu alur yang lebih mudah diikuti.",
    challenge: "Pekerjaan, pembaruan, dan keputusan harian perlu terlihat sebagai satu alur yang jelas bagi seluruh tim.",
    approach: "Satukan aktivitas dan informasi operasional dalam ruang kerja yang mudah diikuti dan diperbarui.",
    focus: ["Alur kerja harian yang lebih jelas", "Koordinasi dan pembaruan antar tim", "Informasi operasional dalam satu tempat"],
    access: { status: "private" },
  },
  {
    slug: "dashboard",
    image: "dashboard.webp",
    number: "02",
    title: "Business Dashboard Platform",
    category: "Data & intelligence",
    description: "Dashboard terukur yang mengubah data bisnis menjadi insight yang jelas dan siap ditindaklanjuti.",
    overview: "Data menjadi lebih berguna ketika mudah dibaca dan dihubungkan dengan keputusan. Platform ini menghadirkan gambaran bisnis yang ringkas melalui tampilan metrik dan tren yang terstruktur.",
    challenge: "Metrik bisnis membutuhkan konteks agar tim dapat membaca perubahan dan menentukan langkah berikutnya.",
    approach: "Susun metrik dan tren dalam dashboard yang ringkas, konsisten, dan mudah ditelusuri.",
    focus: ["Ringkasan metrik penting", "Visualisasi tren dan performa", "Tampilan data yang mudah ditelusuri"],
    access: { status: "private" },
  },
  {
    slug: "location",
    image: "location.webp",
    number: "03",
    title: "Location Data Management System",
    category: "Location intelligence",
    description: "Sistem data lokasi untuk memetakan aset, memantau area, dan menjaga informasi tetap akurat.",
    overview: "Informasi lokasi perlu tersusun rapi agar dapat digunakan oleh banyak tim. Sistem ini memberi tempat untuk mengelola data area dan aset secara konsisten.",
    challenge: "Data area dan aset perlu tetap akurat ketika digunakan dan diperbarui oleh banyak tim.",
    approach: "Kelola lokasi, area, dan aset dalam sistem data yang terstruktur dan mudah diperbarui.",
    focus: ["Pemetaan area dan aset", "Pengelolaan data lokasi", "Informasi yang mudah diperbarui"],
    access: { status: "private" },
  },
  {
    slug: "inventory",
    image: "inventory.svg",
    number: "04",
    title: "Inventory & Asset Platform",
    category: "Asset management",
    description: "Platform untuk melacak stok dan aset secara real time, dari pembaruan data hingga laporan yang siap digunakan.",
    overview: "Stok dan aset bergerak bersama kebutuhan bisnis. Platform ini merapikan pencatatan dan memberi tim gambaran yang lebih jelas tentang apa yang tersedia dan digunakan.",
    challenge: "Tim membutuhkan status stok dan aset yang mudah diperiksa saat barang berpindah atau digunakan.",
    approach: "Bawa pencatatan, status, dan ringkasan aset ke satu alur pengelolaan.",
    focus: ["Pencatatan stok dan aset", "Pemantauan status dan lokasi", "Ringkasan untuk kebutuhan laporan"],
    access: { status: "private" },
  },
  {
    slug: "portal",
    image: "portal.svg",
    number: "05",
    title: "Client Service Portal",
    category: "Customer experience",
    description: "Portal layanan yang memudahkan pelanggan mengajukan permintaan, memantau progres, dan terhubung dengan tim.",
    overview: "Pelanggan membutuhkan jalur yang jelas untuk menyampaikan kebutuhan dan mengikuti perkembangannya. Portal ini menempatkan permintaan dan komunikasi layanan dalam satu pengalaman yang mudah digunakan.",
    challenge: "Permintaan layanan dan pembaruannya perlu mudah diikuti oleh pelanggan serta tim.",
    approach: "Tempatkan pengajuan, status, dan komunikasi layanan dalam satu portal pelanggan.",
    focus: ["Pengajuan permintaan layanan", "Status dan pembaruan progres", "Komunikasi pelanggan dan tim"],
    access: { status: "private" },
  },
];

export const projectUrl = (project: Project) =>
  `${import.meta.env.BASE_URL}work/${project.slug}/`;
