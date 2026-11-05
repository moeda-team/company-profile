export type Locale = 'en' | 'id';

const translations: Record<string, string> = {
  'Home': 'Beranda', 'Works': 'Karya', 'Solutions': 'Solusi', 'About': 'Tentang', 'Contact': 'Kontak',
  'Build Your System': 'Bangun Sistem Anda', 'Software development partner': 'Mitra pengembangan perangkat lunak',
  'Build': 'Bangun', 'Your System': 'Sistem Anda', 'with ': 'bersama ',
  'Ceritakan kebutuhan Anda': 'Ceritakan kebutuhan Anda',
  'Project Delivered': 'Proyek Selesai', 'On-Time Delivery': 'Tepat Waktu', 'Technical Support': 'Dukungan Teknis',
  'What we’ve built': 'Yang telah kami bangun', 'Selected Works.': 'Karya Pilihan.', 'View project': 'Lihat proyek',
  'What we do': 'Yang kami kerjakan', 'Complex challenges.': 'Tantangan kompleks.', 'Clear solutions.': 'Solusi yang jelas.',
  'From the first question to the next release, we connect strategy, design, and engineering into systems built to work in the real world.': 'Dari pertanyaan pertama hingga peluncuran berikutnya, kami menyatukan strategi, desain, dan rekayasa menjadi sistem yang bekerja di dunia nyata.',
  '01 / Discover': '01 / Temukan', 'Product strategy': 'Strategi produk',
  'Define the right problem, map the opportunity, and give every build a clear direction.': 'Tentukan masalah yang tepat, petakan peluang, dan berikan arah yang jelas untuk setiap pengembangan.',
  'Research · Roadmaps · Architecture': 'Riset · Peta jalan · Arsitektur', '02 / Design': '02 / Desain', 'Digital experiences': 'Pengalaman digital',
  'Make complicated workflows feel natural through useful, memorable interfaces.': 'Sederhanakan alur kerja yang rumit melalui antarmuka yang berguna dan mudah diingat.',
  'UX · UI · Prototypes': 'UX · UI · Prototipe', '03 / Build': '03 / Bangun', 'Connected systems': 'Sistem terhubung',
  'Engineer platforms, integrations, and data foundations that keep moving with you.': 'Bangun platform, integrasi, dan fondasi data yang terus berkembang bersama Anda.',
  'Web · Data · Integrations': 'Web · Data · Integrasi', 'How we think': 'Cara kami berpikir',
  'Built for the way business ': 'Dibangun sesuai cara bisnis ', 'actually moves.': 'benar-benar bergerak.',
  'Great digital products are never isolated screens. They connect people, decisions, and operations in a way that makes the whole business stronger.': 'Produk digital yang hebat menghubungkan orang, keputusan, dan operasional agar seluruh bisnis menjadi lebih kuat.',
  'Start a conversation': 'Mulai percakapan', 'Understand the real work': 'Pahami pekerjaan nyata',
  'We start with the people, processes, and constraints behind the brief.': 'Kami mulai dari orang, proses, dan batasan di balik kebutuhan Anda.',
  'Design the whole system': 'Rancang seluruh sistem', 'Interfaces, data, and technology are considered together from day one.': 'Antarmuka, data, dan teknologi dipertimbangkan bersama sejak hari pertama.',
  'Build, learn, improve': 'Bangun, pelajari, tingkatkan', 'We ship in useful increments and keep refining what matters most.': 'Kami merilis kemajuan yang berguna dan terus menyempurnakan hal yang paling penting.',
  'Ideas in motion': 'Gagasan yang bergerak', 'A few principles behind the way': 'Beberapa prinsip di balik cara kami', 'we make digital work harder.': 'membuat teknologi bekerja lebih baik.',
  'Perspective / 01': 'Perspektif / 01', 'Perspective / 02': 'Perspektif / 02',
  'Build around the work, not the tool.': 'Bangun sesuai pekerjaan, bukan alatnya.', 'Technology creates value when it fits the decisions people need to make.': 'Teknologi memberi nilai saat mendukung keputusan yang perlu diambil orang.',
  'Good systems make room to grow.': 'Sistem yang baik memberi ruang untuk berkembang.', 'Clear foundations help teams move faster as their needs change.': 'Fondasi yang jelas membantu tim bergerak lebih cepat saat kebutuhan berubah.',
  'Have a challenge in mind?': 'Punya tantangan?', 'Let’s build ': 'Mari bangun ', 'what’s next.': 'langkah berikutnya.',
  'Tell us what you’re working on, what you want to improve, and where you hope to go. Whether you have a detailed brief or just an early idea, we’ll help you work out a clear next step.': 'Ceritakan apa yang sedang Anda kerjakan, apa yang ingin ditingkatkan, dan tujuan Anda. Baik sudah memiliki rincian proyek maupun baru sebuah ide, kami akan membantu menentukan langkah berikutnya.',
  'Nodeworks on LinkedIn ': 'Nodeworks di LinkedIn ', 'Message': 'Pesan', 'How to reach us': 'Cara menghubungi kami',
  'Book a call': 'Jadwalkan panggilan', 'Send a brief': 'Kirim ringkasan', 'Leave this field empty': 'Biarkan kolom ini kosong',
  '1. Pick a day': '1. Pilih hari', '30-minute intro call': 'Panggilan perkenalan 30 menit', '2. Pick a time': '2. Pilih waktu',
  'Name': 'Nama', 'Your name': 'Nama Anda', 'What is the call about?': 'Apa topik panggilan ini?',
  'Strategy': 'Strategi', 'Design': 'Desain', 'Technology': 'Teknologi', 'Not sure yet': 'Belum yakin',
  'Confirm booking ': 'Konfirmasi jadwal ', 'Tell us about it ': 'Ceritakan kebutuhan Anda ', 'We reply within max 2 working days': 'Kami membalas dalam maksimal 2 hari kerja',
  'Company': 'Perusahaan', 'Optional': 'Opsional', 'What do you need?': 'Apa yang Anda butuhkan?', 'Web or app': 'Web atau aplikasi', 'Integrations': 'Integrasi', 'Other': 'Lainnya',
  'Please tell us what you need': 'Jelaskan kebutuhan Anda', 'Describe your need': 'Jelaskan kebutuhan Anda', 'Timeline': 'Waktu pelaksanaan',
  'As soon as possible': 'Sesegera mungkin', 'Within 2 weeks': 'Dalam 2 minggu', 'Within 1 month': 'Dalam 1 bulan', '1 to 3 months': '1 hingga 3 bulan', '3 to 6 months': '3 hingga 6 bulan', '6+ months': 'Lebih dari 6 bulan', 'Flexible': 'Fleksibel',
  'What problem are you trying to solve?': 'Masalah apa yang ingin Anda selesaikan?', 'Send brief ': 'Kirim ringkasan ',
  'Request received': 'Permintaan diterima', 'Make another request': 'Buat permintaan lain',
  'Services': 'Layanan', 'Studio': 'Studio', 'Connect': 'Terhubung', 'Work': 'Karya', 'Back to top ↑': 'Kembali ke atas ↑',
  'We design and build digital solutions that help real businesses work smarter, move faster, and grow with confidence.': 'Kami merancang dan membangun solusi digital agar bisnis bekerja lebih cerdas, bergerak lebih cepat, dan tumbuh dengan percaya diri.',
  'All works': 'Semua karya', 'Start a project ': 'Mulai proyek ', 'Back to selected works': 'Kembali ke karya pilihan',
  'Selected work ': 'Karya pilihan ', 'Project details': 'Detail proyek', 'Project': 'Proyek', 'Category': 'Kategori', 'Focus areas': 'Area fokus', ' core areas': ' area utama', 'Solution': 'Solusi', 'Digital platform': 'Platform digital', 'Access': 'Akses',
  'PUBLIC': 'PUBLIK', 'PRIVATE': 'PRIVAT', 'Open product ': 'Buka produk ', 'Internal product, not publicly accessible.': 'Produk internal, tidak dapat diakses publik.',
  '01 / Overview': '01 / Gambaran umum', 'Built around': 'Dibangun untuk', 'real work.': 'pekerjaan nyata.',
  '02 / The problem': '02 / Permasalahan', 'From scattered to': 'Dari terpisah menjadi', 'connected.': 'terhubung.', 'The challenge': 'Tantangan', 'The approach': 'Pendekatan',
  '03 / Focus areas': '03 / Area fokus', 'What the system': 'Hal yang disatukan', 'brings together.': 'oleh sistem.',
  '02 / The system': '02 / Sistem', '04 / The system': '04 / Sistem', 'Inside the ': 'Di dalam ', 'workspace.': 'ruang kerja.', 'Event ': 'Pengalaman ', 'experience.': 'event.', 'The shared ': 'Album ', 'album.': 'bersama.', 'Explore more': 'Jelajahi lainnya', 'Next project / ': 'Proyek berikutnya / ', 'View project ↗': 'Lihat proyek ↗',
  'Have a project in mind?': 'Punya rencana proyek?',
  'Project not found.': 'Proyek tidak ditemukan.', 'Back to selected works ': 'Kembali ke karya pilihan ', 'Work not found | Nodeworks': 'Karya tidak ditemukan | Nodeworks',
  'Times shown in Asia/Jakarta': 'Waktu ditampilkan dalam zona Asia/Jakarta', 'Previous month': 'Bulan sebelumnya', 'Next month': 'Bulan berikutnya',
  'Mon': 'Sen', 'Tue': 'Sel', 'Wed': 'Rab', 'Thu': 'Kam', 'Fri': 'Jum', 'Sat': 'Sab', 'Sun': 'Min',
  'Checking available times…': 'Memeriksa waktu yang tersedia…', 'No times are available on this day.': 'Tidak ada waktu tersedia pada hari ini.', 'No available times': 'Tidak ada waktu tersedia', 'This time is unavailable': 'Waktu ini tidak tersedia',
  'available': 'tersedia', 'unavailable': 'tidak tersedia', 'Change day': 'Ubah hari', 'Change time': 'Ubah waktu',
  'Could not load available times.': 'Gagal memuat waktu yang tersedia.', 'Pick a day and a time first.': 'Pilih hari dan waktu terlebih dahulu.',
  'Add your name and a valid email.': 'Isi nama dan alamat email yang valid.', 'That time is no longer available. Please choose another.': 'Waktu tersebut sudah tidak tersedia. Silakan pilih yang lain.',
  'You’re booked': 'Jadwal Anda terkonfirmasi', 'Could not submit your booking.': 'Gagal mengirim pemesanan Anda.',
  'Add your name, a valid email and a few details.': 'Isi nama, alamat email yang valid, dan beberapa rincian.', 'Brief received': 'Ringkasan diterima', 'Could not submit your brief.': 'Gagal mengirim ringkasan Anda.',
  'Open menu': 'Buka menu', 'Close menu': 'Tutup menu', 'Main navigation': 'Navigasi utama', 'Mobile navigation': 'Navigasi seluler', 'Work navigation': 'Navigasi karya', 'Nodeworks home': 'Beranda Nodeworks',
  'The studio preview could not load. Please refresh to try again.': 'Pratinjau studio gagal dimuat. Segarkan halaman untuk mencoba lagi.',
  'Still managing everything manually?': 'Masih mengelola semuanya secara manual?', "Let's build a smarter system.": 'Mari bangun sistem yang lebih cerdas.', 'Automated. Connected. Simplified.': 'Otomatis. Terhubung. Lebih sederhana.', "Got an idea? Let's make it real.": 'Punya ide? Mari wujudkan.',
};

let currentLocale: Locale = 'en';
export const getLocale = () => currentLocale;
export const t = (value: string) => currentLocale === 'id' ? (translations[value] ?? value) : value;

export async function initLocale() {
  const query = new URLSearchParams(location.search).get('lang');
  const saved = localStorage.getItem('nodeworks-locale');
  if (query === 'en' || query === 'id') {
    currentLocale = query;
    localStorage.setItem('nodeworks-locale', query);
  } else if (saved === 'en' || saved === 'id') {
    currentLocale = saved;
  } else {
    let country: string | null = null;
    try {
      const response = await fetch(`${import.meta.env.BASE_URL}api/locale`, { cache: 'no-store', signal: AbortSignal.timeout(1800) });
      if (response.ok && response.headers.get('content-type')?.includes('application/json')) country = (await response.json()).country;
    } catch { /* Use browser language when location is unavailable. */ }
    currentLocale = country ? (country.toUpperCase() === 'ID' ? 'id' : 'en') : (/^id(?:-|$)/i.test(navigator.language) ? 'id' : 'en');
  }
  document.documentElement.lang = currentLocale;
  document.title = currentLocale === 'id' ? 'Nodeworks - Solusi digital untuk bisnis nyata' : 'Nodeworks - Digital solutions for real business';
  document.querySelector<HTMLMetaElement>('meta[name="description"]')?.setAttribute('content', currentLocale === 'id' ? 'Nodeworks merancang, membangun, dan menghubungkan solusi digital untuk bisnis nyata.' : 'Nodeworks designs, builds, and connects digital solutions for real businesses.');
}

export function languageSwitch() {
  return `<div class="language-switch" role="group" aria-label="Language / Bahasa"><button type="button" data-lang="en" lang="en" aria-pressed="${currentLocale === 'en'}">EN</button><button type="button" data-lang="id" lang="id" aria-pressed="${currentLocale === 'id'}">ID</button></div>`;
}

export function mountLanguageSwitch() {
  document.querySelectorAll<HTMLButtonElement>('[data-lang]').forEach(button => button.addEventListener('click', () => {
    const next = button.dataset.lang;
    if (next !== 'en' && next !== 'id') return;
    localStorage.setItem('nodeworks-locale', next);
    const url = new URL(location.href);
    url.searchParams.set('lang', next);
    location.assign(url.href);
  }));
}

export function localizeDOM(root: Element) {
  if (currentLocale !== 'id') return;
  const visit = (element: Element) => {
    const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT);
    while (walker.nextNode()) {
      const node = walker.currentNode;
      if (node.parentElement?.closest('script, style, [data-lang]')) continue;
      const value = node.textContent ?? '';
      const trimmed = value.trim();
      if (translations[trimmed] || translations[`${trimmed} `]) node.textContent = value.replace(trimmed, translations[trimmed] ?? translations[`${trimmed} `].trimEnd());
      else if (/^Preview /.test(trimmed)) node.textContent = value.replace('Preview ', 'Pratinjau ');
      else if (/^Screen preview /.test(trimmed)) node.textContent = value.replace('Screen preview ', 'Pratinjau layar ');
      else if (/^Selected work \d/.test(trimmed)) node.textContent = value.replace('Selected work ', 'Karya pilihan ');
      else if (/^Next project \/ \d/.test(trimmed)) node.textContent = value.replace('Next project / ', 'Proyek berikutnya / ');
      else if (/^\d+ core areas$/.test(trimmed)) node.textContent = value.replace('core areas', 'area utama');
    }
    for (const target of [element, ...element.querySelectorAll('*')]) {
      for (const name of ['aria-label', 'placeholder', 'title', 'alt']) {
        const value = target.getAttribute(name);
        if (value && translations[value]) target.setAttribute(name, translations[value]);
        else if (value?.startsWith('Preview ')) target.setAttribute(name, value.replace('Preview ', 'Pratinjau '));
      }
    }
  };
  visit(root);
  new MutationObserver(records => {
    for (const record of records) {
      if (record.type === 'attributes' && record.target instanceof Element) visit(record.target);
      else if (record.type === 'characterData' && record.target.parentElement) visit(record.target.parentElement);
      else for (const node of record.addedNodes) {
        if (node instanceof Element) visit(node);
        else if (node instanceof Text && node.parentElement) visit(node.parentElement);
      }
    }
  }).observe(root, { subtree: true, childList: true, characterData: true, attributes: true, attributeFilter: ['aria-label', 'placeholder', 'title', 'alt'] });
}
