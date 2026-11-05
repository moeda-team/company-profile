import { projects, projectUrl } from "./projects";
import { renderSiteFooter } from "./footer";
import { getLocale, languageSwitch, localizeDOM, mountLanguageSwitch } from './i18n';
import { mountThemeToggle, themeToggle } from './theme';
import "./style.css";
import "./work-detail.css";
import "./theme.css";

const baseUrl = import.meta.env.BASE_URL;
const basePath = baseUrl.replace(/\/$/, "");
const slug = window.location.pathname.slice(basePath.length).match(/^\/work\/([^/]+)\/?$/)?.[1];
const projectIndex = projects.findIndex((project) => project.slug === slug);
const project = projects[projectIndex];
const lowkeythingsScreens = [
  { image: "lowkeythings-catalog.png", title: "Katalog event", description: "Pengunjung dapat menemukan event melalui pencarian nama atau lokasi, menyaring berdasarkan tanggal, lalu membandingkan kartu event yang menampilkan jadwal, lokasi, kategori, dan harga awal. Semua informasi utama tersedia sebelum membuka halaman detail.", alt: "Katalog event LowkeyThings dengan pencarian, filter tanggal, dan kartu event." },
  { image: "lowkeythings-registration.png", title: "Pendaftaran peserta", description: "Halaman pendaftaran menempatkan informasi event dan formulir peserta berdampingan, sehingga peserta tetap memahami acara yang dipilih saat mengisi data. Formulir bertahap mengumpulkan identitas serta informasi tambahan yang diperlukan penyelenggara.", alt: "Halaman pendaftaran SprinRun 2027 dengan informasi event dan form data peserta." },
  { image: "lowkeythings-event-editor.png", title: "Kelola halaman event", description: "Penyelenggara dapat memperbarui banner, nama, dan deskripsi event dari dasbor. Pratinjau di sisi kanan memperlihatkan bagaimana perubahan tersebut akan tampil pada halaman detail yang dilihat calon peserta.", alt: "Dasbor penyelenggara untuk mengedit detail event dengan pratinjau langsung." },
  { image: "lowkeythings-participants.png", title: "Peserta dan perlengkapan", description: "Dasbor peserta membantu penyelenggara mengatur pendaftaran gratis dan melihat siapa yang sudah terdaftar. Akses khusus untuk volunteer mendukung verifikasi peserta serta pencatatan pengambilan perlengkapan tanpa membuka seluruh dasbor penyelenggara.", alt: "Dasbor peserta dan BIB dengan akses volunteer serta daftar peserta gratis." },
  { image: "lowkeythings-finance.png", title: "Ringkasan keuangan", description: "Pendapatan tiket, donasi, dan refund ditampilkan bersama jumlah pembeli serta pendaftar agar kondisi event mudah dipantau. Rekap per kategori memberi penyelenggara gambaran lebih rinci tentang penjualan dan kebutuhan peserta.", alt: "Dasbor keuangan event yang menampilkan pendapatan, refund, dan ringkasan peserta." },
  { image: "lowkeythings-checkin.png", title: "Check-in lapangan", description: "Tampilan yang ringkas untuk petugas di lokasi memungkinkan pencarian peserta melalui nama, nomor BIB, atau nomor registrasi. Pemindaian barcode atau QR membantu memverifikasi peserta dan mencatat pengambilan perlengkapan maupun kehadiran pada hari event.", alt: "Tampilan mobile RPC dan check-in dengan pencarian peserta serta pemindai barcode." },
];
const lowkeythingsScreensEnglish = [
  { title: "Event catalog", description: "Visitors can search by event name or location, filter by date, and compare cards showing schedules, locations, categories, and starting prices. Key details are visible before they open an event page." },
  { title: "Participant registration", description: "The registration page places event information beside the participant form, keeping the selected event in view as people enter their details. A guided flow collects identity and any extra information organizers require." },
  { title: "Event page management", description: "Organizers can update an event's banner, name, and description from the dashboard. A preview alongside the editor shows how those changes will appear on the public event detail page." },
  { title: "Participants and race kits", description: "The participant dashboard helps organizers manage complimentary registrations and see who has already signed up. Dedicated volunteer access supports participant verification and race kit pickup without exposing the full organizer dashboard." },
  { title: "Financial overview", description: "Ticket revenue, donations, and refunds appear alongside buyer and registration counts, making event performance easier to follow. Category breakdowns give organizers a closer view of sales and participant needs." },
  { title: "On-site check-in", description: "A compact interface lets on-site staff find participants by name, BIB number, or registration number. Barcode and QR scanning support verification and recording of race kit pickup or attendance on event day." },
];
const dagoraScreens = [
  { image: "dagora-login.png", title: "Akses operasional", description: "Halaman masuk memberi staf titik awal yang jelas untuk mengakses sistem menggunakan akun dari administrator bisnis. Pesan utamanya merangkum tujuan Dagora: membuat pergerakan stok terlihat dan penutupan kas lebih mudah ditelusuri.", alt: "Halaman login Dagora dengan formulir akun dan kata sandi." },
  { image: "dagora-dashboard.png", title: "Ringkasan operasional", description: "Dasbor merangkum penjualan, jumlah transaksi, item terjual, dan rata-rata transaksi berdasarkan cabang serta periode. Grafik metode pembayaran dan penjualan per jam dilengkapi status pesanan, produk terlaris, stok yang perlu perhatian, dan ringkasan cash closing.", alt: "Dasbor Dagora dengan metrik penjualan, grafik, transaksi terbaru, dan perhatian stok." },
  { image: "dagora-pos.png", title: "Point of sale", description: "Kasir dapat mencari produk, melihat ketersediaan di display atau gudang, lalu menambahkan item ke pesanan. Panel di samping menjaga keranjang, jumlah item, pilihan dine in atau takeaway, subtotal, dan langkah menuju pembayaran tetap terlihat.", alt: "Tampilan POS Dagora dengan katalog produk dan keranjang pesanan." },
  { image: "dagora-orders.png", title: "Riwayat pesanan", description: "Setiap pesanan tercatat bersama pelanggan, cabang, waktu, status, total, refund, dan nilai akhir. Pencarian, pengaturan jumlah baris, serta tombol detail membantu tim menelusuri transaksi tertentu saat diperlukan.", alt: "Daftar pesanan Dagora dengan pencarian, status, total, dan refund." },
  { image: "dagora-inventory.png", title: "Inventori per lokasi", description: "Tim dapat memeriksa saldo stok per produk dan gudang, termasuk pemisahan antara stok gudang dan display toko. Pencarian, filter lokasi dan tanggal, batas minimum, serta waktu pembaruan membantu menemukan barang yang perlu ditindaklanjuti.", alt: "Tabel inventori Dagora dengan stok gudang, display toko, dan batas minimum." },
  { image: "dagora-cash-closing.png", title: "Cash closing", description: "Penutupan kas mempertemukan total penjualan, refund, kas masuk dan keluar, serta hasil per metode pembayaran dalam satu tampilan. Bagian rekonsiliasi menunjukkan kas yang diharapkan dan selisih, sementara riwayat closing menyimpan hasil periode sebelumnya.", alt: "Halaman cash closing Dagora dengan ringkasan penjualan, refund, rekonsiliasi, dan riwayat." },
  { image: "dagora-sales-reports.png", title: "Laporan penjualan", description: "Laporan dapat disaring menurut pegawai, metode pembayaran, tanggal, dan kata kunci. Ringkasan pesanan, penjualan bruto, refund, serta penjualan bersih berada di atas tabel transaksi, dengan opsi unduh Excel untuk analisis lebih lanjut.", alt: "Laporan penjualan Dagora dengan filter, ringkasan angka, tabel transaksi, dan unduh Excel." },
];
const dagoraScreensEnglish = [
  { title: "Operations access", description: "The sign-in page gives staff a clear entry point with an account provided by the business administrator. Its message sums up Dagora's goal: make stock movement visible and cash closing easier to trace." },
  { title: "Operations overview", description: "The dashboard summarizes sales, transaction counts, items sold, and average order value by branch and date range. Payment and hourly sales charts sit alongside order status, top products, stock alerts, and a cash closing summary." },
  { title: "Point of sale", description: "Cashiers can find products, check stock in the store display or warehouse, and add items to an order. A side panel keeps the cart, quantities, dine-in or takeaway choice, subtotal, and payment step in view." },
  { title: "Order history", description: "Each order is recorded with its customer, branch, time, status, total, refund, and final amount. Search, page size controls, and detail links help the team trace a specific transaction when needed." },
  { title: "Inventory by location", description: "Teams can inspect stock balances by product and warehouse, with warehouse stock separated from store display stock. Search, location and date filters, minimum thresholds, and update times help surface items needing attention." },
  { title: "Cash closing", description: "Cash closing brings sales, refunds, cash movements, and totals by payment method into one view. Reconciliation shows expected cash and discrepancies, while closing history keeps the results of earlier periods available." },
  { title: "Sales reports", description: "Reports can be filtered by employee, payment method, date, and search term. Order counts, gross sales, refunds, and net sales sit above the transaction table, with an Excel download for further analysis." },
];
const sprinRunScreens = [
  { image: "sprin-run-home.png", title: "Beranda kampanye", description: "Halaman pembuka menempatkan pesan “Every Step Saves a Life” bersama ilustrasi pelari dan identitas SPRIN RUN 2027. Tanggal, lokasi, hitung mundur, serta tombol pendaftaran langsung terlihat agar pengunjung segera memahami acara dan langkah berikutnya.", alt: "Beranda SPRIN RUN 2027 dengan ilustrasi pelari, tanggal, lokasi, hitung mundur, dan tombol daftar." },
  { image: "sprin-run-campaign.png", title: "Tujuan sosial dan tenaga kesehatan", description: "Bagian tentang acara menjelaskan kaitan olahraga lari dengan kampanye kesehatan perempuan melalui program SPRIN. Di sebelahnya, informasi untuk tenaga kesehatan merangkum profesi yang dapat mengikuti jalur SKP dan konteks edukasi kesehatan dalam kegiatan ini.", alt: "Bagian tentang SPRIN RUN, Run and Charity, dan informasi SKP bagi tenaga kesehatan." },
  { image: "sprin-run-route.png", title: "Rute dan manfaat peserta", description: "Pengunjung dapat memilih kategori 5K atau 10K untuk melihat peta, jarak, dan waktu mulai yang relevan. Bagian manfaat merangkum fasilitas kedua kategori, termasuk nomor BIB, timing chip, jersey, medali finisher, perlindungan medis, dan dokumentasi.", alt: "Peta rute lari SPRIN RUN dengan pilihan 5K dan 10K serta tabel manfaat peserta." },
  { image: "sprin-run-race-kit.png", title: "Race kit dan FAQ", description: "Pilihan medali 5K dan 10K serta desain jersey ditampilkan berdampingan sehingga peserta dapat melihat perlengkapan yang akan diterima. Daftar pertanyaan umum di bawahnya membantu menjawab hal praktis tentang jadwal, kategori, biaya, pengambilan race kit, dan kondisi hari acara.", alt: "Koleksi race kit SPRIN RUN dengan medali, jersey, dan daftar pertanyaan umum." },
  { image: "sprin-run-footer.png", title: "Penyelenggara dan ajakan mendaftar", description: "Identitas para penyelenggara ditampilkan sebelum ajakan terakhir untuk bergabung dan mendaftar. Bagian penutup menyediakan navigasi ulang, kontak, tautan media sosial, serta kebijakan agar pengunjung tetap mudah menemukan informasi resmi.", alt: "Logo penyelenggara SPRIN RUN, ajakan mendaftar, serta footer berisi menu dan kontak." },
];
const sprinRunScreensEnglish = [
  { title: "Campaign landing page", description: "The opening section pairs the “Every Step Saves a Life” message with a runner illustration and SPRIN RUN 2027 branding. The date, venue, countdown, and registration button are immediately visible so visitors can understand the event and what to do next." },
  { title: "The cause and healthcare community", description: "The about section explains how the run supports the SPRIN women's health campaign. Beside it, information for healthcare workers outlines eligible professions for the SKP pathway and the event's health education context." },
  { title: "Routes and participant benefits", description: "Visitors can switch between the 5K and 10K categories to view the relevant map, distance, and starting time. A benefits table summarizes BIB numbers, timing chips, jerseys, finisher medals, medical protection, and documentation for both categories." },
  { title: "Race kits and FAQ", description: "The 5K and 10K medals appear beside the event jersey so participants can see the included race kit. An FAQ below answers practical questions about the schedule, categories, fees, kit pickup, and event-day conditions." },
  { title: "Organizers and registration", description: "Organizer identities lead into a final invitation to join and register. The footer repeats navigation, contact details, social links, and policies so visitors can still find official information at the end of the page." },
];
const momentokuScreens = [
  { image: "momentoku-home.png", title: "Semua momen dalam satu album", description: "Beranda memperlihatkan gagasan utama Momentoku: satu QR untuk mengumpulkan foto dari seluruh tamu acara. Deretan foto dan tiga langkah singkat menunjukkan bahwa tamu dapat memindai QR, mengunggah dari ponsel, lalu menikmati semua momen yang terkumpul bersama.", alt: "Beranda Momentoku dengan kolase foto acara, tombol buat album, dan alur scan QR serta unggah." },
  { image: "momentoku-album.png", title: "Album digital yang personal", description: "Contoh album menampilkan foto utama yang dapat dipersonalisasi dan galeri berisi momen dari berbagai sudut pandang tamu. Bagian ini juga memperkenalkan kategori foto, identitas pengunggah, serta penyimpanan event agar cerita acara tetap rapi dan mudah dijelajahi.", alt: "Contoh album digital Momentoku dengan foto utama, galeri, dan daftar fitur pengelolaan momen." },
];
const momentokuScreensEnglish = [
  { title: "Every moment in one album", description: "The landing page introduces Momentoku's core idea: one QR code to collect photos from every event guest. A photo strip and three simple steps show guests scanning the code, uploading from their phones, and enjoying all the moments gathered together." },
  { title: "A personal digital album", description: "The sample album presents a customizable cover image and a gallery of moments captured from different guest perspectives. This section also introduces photo categories, uploader identity, and event storage to keep the story organized and easy to explore." },
];
const screens = project?.slug === "lowkeythings" ? lowkeythingsScreens : project?.slug === "chandradimuka" ? dagoraScreens : project?.slug === "sprin-run" ? sprinRunScreens : project?.slug === "momentoku" ? momentokuScreens : null;
const screensEnglish = project?.slug === "lowkeythings" ? lowkeythingsScreensEnglish : project?.slug === "chandradimuka" ? dagoraScreensEnglish : project?.slug === "sprin-run" ? sprinRunScreensEnglish : project?.slug === "momentoku" ? momentokuScreensEnglish : null;
const app = document.querySelector<HTMLDivElement>("#app");
if (!app) throw new Error("App root not found");

if (!project) {
  document.title = getLocale() === 'id' ? 'Karya tidak ditemukan | Nodeworks' : 'Work not found | Nodeworks';
  app.innerHTML = `<main class="detail-not-found"><div class="detail-not-found-header"><a class="detail-wordmark" href="${baseUrl}"><img src="${baseUrl}nodeworks-mark.svg" alt="" width="40" height="40" />Nodeworks</a>${themeToggle()}</div><p>404 / Work</p><h1>Project not found.</h1><a class="detail-button" href="${baseUrl}#work">Back to selected works <span aria-hidden="true">↗</span></a></main>`;
} else {
  const nextProject = projects[(projectIndex + 1) % projects.length];
  const titleWords = project.title.split(" ");
  const accentWord = titleWords.pop();
  const headingStart = titleWords.join(" ");
  const accessBadge = `<span class="detail-access-badge detail-access-${project.access.status}">${project.access.status.toUpperCase()}</span>`;
  const productLink = project.access.status === "public"
    ? `<a class="detail-button detail-button-primary" href="${project.access.url}" target="_blank" rel="noopener noreferrer">Open product <span aria-hidden="true">↗</span></a>`
    : "";
  const privateNote = `<span class="detail-private-note">Internal product, not publicly accessible.</span>`;
  document.title = `${project.title} | Nodeworks`;
  document.querySelector<HTMLMetaElement>('meta[name="description"]')?.setAttribute("content", project.description);
  app.innerHTML = `
    <div class="detail-page">
      <header class="detail-header container">
        <a class="detail-wordmark" href="${baseUrl}" aria-label="Nodeworks home"><img src="${baseUrl}nodeworks-mark.svg" alt="" width="40" height="40" />Nodeworks</a>
        <nav aria-label="Work navigation"><a href="${baseUrl}#work">All works</a><a class="detail-nav-cta" href="${baseUrl}#contact">Start a project <span aria-hidden="true">↗</span></a>${languageSwitch()}${themeToggle()}</nav>
      </header>

      <main>
        <section class="detail-hero container" aria-labelledby="detail-title">
          <a class="detail-back" href="${baseUrl}#work"><span aria-hidden="true">←</span> Back to selected works</a>
          <div class="detail-hero-grid">
            <div class="detail-hero-copy">
              <p class="detail-project-tag">Selected work ${project.number} · ${project.category}</p>
              <h1 id="detail-title">${headingStart} <em>${accentWord}</em></h1>
              <p class="detail-lead">${project.description}</p>
              <div class="detail-hero-actions">${project.access.status === "public" ? productLink : `<div class="detail-private-access">${accessBadge}${privateNote}</div>`}<a class="detail-button detail-button-outline" href="${baseUrl}#contact">Start a conversation <span aria-hidden="true">↗</span></a></div>
            </div>
            <figure class="detail-hero-visual"><button class="detail-image-open" type="button" aria-haspopup="dialog" aria-label="${getLocale() === 'id' ? 'Perbesar gambar proyek' : 'Enlarge project image'}"><img src="${baseUrl}images/work/${project.image}" width="1320" height="737" alt="Preview ${project.title}" /><span class="detail-zoom-hint" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 5 5M8 10.5h5M10.5 8v5"/></svg></span></button></figure>
          </div>
        </section>

        <dialog class="detail-image-dialog" aria-label="${getLocale() === 'id' ? `Gambar proyek ${project.title}` : `Project image ${project.title}`}"><button class="detail-image-close" type="button" aria-label="${getLocale() === 'id' ? 'Tutup gambar' : 'Close image'}">×</button><img src="${baseUrl}images/work/${project.image}" width="1320" height="737" alt="Preview ${project.title}" /></dialog>

        <div class="detail-facts container" aria-label="Project details">
          <div><span class="detail-fact-label">Project</span><strong>${project.number} / ${String(projects.length).padStart(2, "0")}</strong></div>
          <div><span class="detail-fact-label">Category</span><strong>${project.category}</strong></div>
          <div><span class="detail-fact-label">Focus areas</span><strong>${String(project.focus.length).padStart(2, "0")} core areas</strong></div>
          <div><span class="detail-fact-label">Solution</span><strong>Digital platform</strong></div>
          <div><span class="detail-fact-label">Access</span>${accessBadge}</div>
        </div>

        <section class="detail-story container" aria-labelledby="detail-overview-title">
          <div class="detail-section-label">01 / Overview</div>
          <div class="detail-story-grid">
            <h2 id="detail-overview-title">Built around<br /><em>real work.</em></h2>
            <div><p>${project.overview}</p></div>
          </div>
        </section>

        <section class="detail-system container" id="system" aria-labelledby="detail-system-title">
          <div class="detail-section-label">02 / The system</div>
          <div class="detail-system-heading"><h2 id="detail-system-title">${project.slug === "sprin-run" ? "Event <em>experience.</em>" : project.slug === "momentoku" ? "The shared <em>album.</em>" : "Inside the <em>workspace.</em>"}</h2><div class="detail-system-access">${accessBadge}${project.access.status === "public" ? productLink : privateNote}</div></div>
          ${screens ? `<div class="detail-gallery-controls"><span class="detail-gallery-count" aria-live="off">01 / ${String(screens.length).padStart(2, "0")}</span><div><button class="detail-gallery-prev" type="button" aria-label="${getLocale() === "id" ? "Gambar sebelumnya" : "Previous screenshot"}" disabled><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M19 12H5m7-7-7 7 7 7" /></svg></button><button class="detail-gallery-next" type="button" aria-label="${getLocale() === "id" ? "Gambar berikutnya" : "Next screenshot"}"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14m-7-7 7 7-7 7" /></svg></button></div></div>` : ""}
          <div class="detail-gallery${screens ? " detail-gallery--screenshots" : ""}${screens && project.slug !== "lowkeythings" ? " detail-gallery--wide" : ""}"${screens ? ` role="region" aria-roledescription="carousel" aria-label="${getLocale() === "id" ? `Tampilan sistem ${project.title}` : `${project.title} system screenshots`}" tabindex="0"` : ""}>${screens
            ? screens.map((screen, index) => {
                const copy = getLocale() === "id" ? screen : screensEnglish![index];
                const imageWidth = project.slug === "lowkeythings" ? 2544 : 2559;
                const imageHeight = project.slug === "lowkeythings" ? 1327 : 1324;
                return `<figure class="detail-gallery-item" role="group" aria-roledescription="slide" aria-label="${index + 1} / ${screens.length}"><a class="detail-gallery-frame" href="${baseUrl}images/work/${screen.image}" target="_blank" rel="noopener noreferrer" aria-haspopup="dialog" aria-label="${getLocale() === "id" ? `Perbesar gambar ${screen.title}` : `Enlarge ${copy.title} screenshot`}"><img src="${baseUrl}images/work/${screen.image}" width="${imageWidth}" height="${imageHeight}" loading="lazy" alt="${getLocale() === "id" ? screen.alt : `${copy.title}: ${copy.description}`}" /></a><figcaption><strong>${copy.title}</strong><span>${copy.description}</span></figcaption></figure>`;
              }).join("")
            : Array.from({ length: 6 }, (_, index) => `<figure class="detail-gallery-item"><div class="detail-gallery-frame"><span>Screen preview ${String(index + 1).padStart(2, "0")}</span></div><figcaption>${project.focus[index % project.focus.length]}</figcaption></figure>`).join("")}</div>
        </section>

        <section class="detail-problem container${screens ? " detail-problem--screenshots" : ""}" aria-labelledby="detail-problem-title">
          <div class="detail-section-label">03 / The problem</div>
          <h2 id="detail-problem-title">From scattered to<br /><em>connected.</em></h2>
          <div class="detail-problem-grid"><div class="detail-problem-card"><span>The challenge</span><p>${project.challenge}</p></div><div class="detail-problem-card"><span>The approach</span><p>${project.approach}</p></div></div>
        </section>

        <section class="detail-focus" aria-labelledby="detail-focus-title">
          <div class="container">
            <div class="detail-section-label">04 / Focus areas</div>
            <h2 id="detail-focus-title">What the system<br />brings together.</h2>
            <div class="detail-focus-list">${project.focus.map((item, index) => `<div><span>0${index + 1}</span><h3>${item}</h3></div>`).join("")}</div>
          </div>
        </section>

        <section class="detail-next" aria-labelledby="detail-next-title">
          <div class="container">
            <div class="detail-section-label">Explore more</div>
            <a class="detail-next-card" href="${projectUrl(nextProject)}">
              <div><p>Next project / ${nextProject.number}</p><h2 id="detail-next-title">${nextProject.title}</h2><span>View project ↗</span></div>
              <img src="${baseUrl}images/work/${nextProject.image}" width="1320" height="737" loading="lazy" alt="" />
            </a>
          </div>
        </section>

        <section class="detail-contact"><div class="container"><div><p>Have a project in mind?</p><h2>Let’s build <br/>what’s next.</h2></div><a href="${baseUrl}#contact">Start a conversation  <span aria-hidden="true">↗</span></a></div></section>
      </main>
      ${renderSiteFooter(baseUrl)}
    </div>`;

  const imageDialog = app.querySelector<HTMLDialogElement>('.detail-image-dialog')!;
  const dialogImage = imageDialog.querySelector('img')!;
  const heroImage = app.querySelector<HTMLImageElement>('.detail-image-open img')!;
  app.querySelector<HTMLButtonElement>('.detail-image-open')!.addEventListener('click', () => {
    dialogImage.src = heroImage.src;
    dialogImage.alt = heroImage.alt;
    imageDialog.showModal();
  });
  app.querySelector<HTMLButtonElement>('.detail-image-close')!.addEventListener('click', () => imageDialog.close());
  imageDialog.addEventListener('click', (event) => {
    if (event.target === imageDialog) imageDialog.close();
  });
  const gallery = app.querySelector<HTMLElement>('.detail-gallery--screenshots');
  if (gallery) {
    const slides = [...gallery.querySelectorAll<HTMLElement>('.detail-gallery-item')];
    const previous = app.querySelector<HTMLButtonElement>('.detail-gallery-prev')!;
    const next = app.querySelector<HTMLButtonElement>('.detail-gallery-next')!;
    const count = app.querySelector<HTMLElement>('.detail-gallery-count')!;
    const controls = app.querySelector<HTMLElement>('.detail-gallery-controls')!;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const activeIndex = () => slides.reduce((closest, slide, index) =>
      Math.abs(slide.offsetLeft - slides[0].offsetLeft - gallery.scrollLeft) <
      Math.abs(slides[closest].offsetLeft - slides[0].offsetLeft - gallery.scrollLeft) ? index : closest, 0);
    const updateControls = () => {
      const index = activeIndex();
      count.textContent = `${String(index + 1).padStart(2, '0')} / ${String(slides.length).padStart(2, '0')}`;
      previous.disabled = index === 0;
      next.disabled = index === slides.length - 1;
    };
    const goTo = (index: number) => gallery.scrollTo({
      left: slides[index].offsetLeft - slides[0].offsetLeft,
      behavior: reducedMotion.matches ? 'instant' : 'smooth',
    });
    previous.addEventListener('click', () => goTo(Math.max(0, activeIndex() - 1)));
    next.addEventListener('click', () => goTo(Math.min(slides.length - 1, activeIndex() + 1)));
    gallery.addEventListener('scroll', updateControls, { passive: true });
    gallery.addEventListener('keydown', (event) => {
      if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
        event.preventDefault();
        goTo(Math.max(0, Math.min(slides.length - 1, activeIndex() + (event.key === 'ArrowRight' ? 1 : -1))));
      }
    });
    gallery.querySelectorAll<HTMLAnchorElement>('.detail-gallery-frame').forEach((link) => {
      link.addEventListener('click', (event) => {
        event.preventDefault();
        const image = link.querySelector('img')!;
        dialogImage.src = image.src;
        dialogImage.alt = image.alt;
        imageDialog.showModal();
      });
    });
    let autoplayTimer: number | undefined;
    let pointerOverGallery = false;
    let galleryVisible = false;
    const stopAutoplay = () => window.clearTimeout(autoplayTimer);
    const scheduleAutoplay = () => {
      stopAutoplay();
      if (document.hidden || imageDialog.open || reducedMotion.matches || pointerOverGallery || !galleryVisible) return;
      autoplayTimer = window.setTimeout(() => {
        if (document.hidden || imageDialog.open || pointerOverGallery || !galleryVisible) return;
        goTo((activeIndex() + 1) % slides.length);
        scheduleAutoplay();
      }, 6500);
    };
    new IntersectionObserver(([entry]) => {
      galleryVisible = entry.intersectionRatio >= 0.25;
      scheduleAutoplay();
    }, { threshold: 0.25 }).observe(gallery);
    for (const area of [gallery, controls]) {
      area.addEventListener('pointerenter', (event) => {
        if (event.pointerType !== 'mouse') return;
        pointerOverGallery = true;
        stopAutoplay();
      });
      area.addEventListener('pointerleave', (event) => {
        if (event.pointerType !== 'mouse') return;
        pointerOverGallery = false;
        scheduleAutoplay();
      });
    }
    for (const eventName of ['pointerdown', 'keydown', 'wheel', 'touchstart']) {
      document.addEventListener(eventName, scheduleAutoplay, { passive: true });
    }
    app.querySelector<HTMLButtonElement>('.detail-image-open')!.addEventListener('click', stopAutoplay);
    gallery.querySelectorAll<HTMLAnchorElement>('.detail-gallery-frame').forEach((link) => link.addEventListener('click', stopAutoplay));
    document.addEventListener('visibilitychange', scheduleAutoplay);
    imageDialog.addEventListener('close', scheduleAutoplay);
    reducedMotion.addEventListener('change', scheduleAutoplay);
    window.addEventListener('resize', updateControls);
    updateControls();
    scheduleAutoplay();
  }
}

localizeDOM(app);
mountLanguageSwitch();
mountThemeToggle();
