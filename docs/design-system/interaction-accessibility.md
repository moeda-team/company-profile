# Interaksi dan aksesibilitas

[Kembali ke indeks design system](../../DESIGN_SYSTEM.md)

## Navigasi dan scroll

Navigasi halaman utama memakai anchor `#top`, `#work`, `#services`, `#about`, `#insights`, dan `#contact`. Menu seluler memakai `aria-expanded` dan menutup saat tautan dipilih atau Escape ditekan. State navigasi aktif mengikuti section. Bar progres scroll disembunyikan dari pembaca layar.

Lenis menghaluskan scroll dan GSAP ScrollTrigger mengatur animasi masuk serta pergantian kartu karya. Tautan tetap harus berfungsi saat efek gerak tidak tersedia.

## Gerak

Gunakan animasi masuk singkat dan hover yang menjelaskan tindakan. Saat `prefers-reduced-motion: reduce`, transisi serta animasi dipersingkat, animasi masuk dilewati, dan semua kartu karya ditampilkan terbuka tanpa pinning. Periksa keadaan ini setelah mengubah pola scroll.

## Keyboard, fokus, dan semantik

- Pakai tautan untuk navigasi dan tombol untuk tindakan. Pertahankan outline `:focus-visible` global (`3px solid #7aabff`, offset `4px`) atau pengganti yang sama jelasnya.
- Tab kontak menggunakan `tablist`, `tab`, `tabpanel`, `aria-selected`, `aria-controls`, dan tombol panah kiri/kanan. Panel yang tidak aktif memakai `hidden`.
- Tanggal serta slot waktu adalah tombol dengan label ketersediaan dan `aria-pressed`; pilihan tidak tersedia memakai `disabled`.
- Field formulir mempunyai label terlihat; pilihan berkelompok memakai `fieldset`/`legend`. Error memakai `role="alert"`.
- Dialog gambar karya memiliki tombol penutup. Ornamen CSS/SVG tanpa makna diberi `aria-hidden="true"`.

## Bahasa dan tema

Situs mendukung bahasa Inggris dan Indonesia. Pemilih bahasa menyimpan pilihan di `localStorage`, menambah `?lang=`, dan memperbarui atribut `lang`, judul, serta metadata dokumen. Teks baru perlu padanan kedua bahasa, termasuk label aksesibilitas dan pesan hasil yang dibuat di JavaScript. Implementasi bahasa ada di `src/i18n.ts`.

Halaman detail karya memiliki tombol tema dari `src/theme.ts`. Saat menambah elemen detail, periksa keterbacaan kedua tema di `src/work-detail.css`.

## Formulir dan API

Pertahankan tipe input native, `required`, autocomplete, dan validasi sebelum pengiriman. Booking mengambil `GET /api/slots?month=YYYY-MM`, lalu mengirim `POST /api/bookings` dengan timestamp RFC 3339 dari API. Brief dikirim melalui `POST /api/briefs`. Jadwal ditampilkan dalam `Asia/Jakarta`; zona pengunjung dikirim sebagai metadata opsional. Bila slot berubah saat booking, muat ulang ketersediaan dan minta pengguna memilih ulang.

Tampilkan pesan berhasil hanya setelah respons API berhasil. Jika API gagal, pertahankan isian dan tampilkan pesan error. Rincian kontrak ada di [referensi API](../../../docs/api.md) dan [panduan booking](../../../docs/booking-availability.md).

## Kontras dan target sentuh

Jaga teks gelap pada kartu terang dan teks pucat pada section navy/kontak tetap terbaca. Status terpilih harus tampak lewat bentuk atau state semantik selain warna. Kontrol menu, CTA, tanggal, dan slot harus mudah disentuh pada layar kecil.
