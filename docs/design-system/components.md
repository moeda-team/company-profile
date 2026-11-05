# Komponen dan pola halaman

[Kembali ke indeks design system](../../DESIGN_SYSTEM.md)

Halaman utama dirender di `src/main.ts` dan ditata di `src/style.css`. Halaman detail karya menggunakan `src/work-detail.ts` dan `src/work-detail.css`.

## Header dan hero

Header tetap di bagian atas sebagai panel putih transparan berbentuk pil. Wordmark berada di kiri; navigasi section, CTA, dan pemilih bahasa `EN`/`ID` berada di kanan. Pada lebar `1100px` ke bawah, navigasi diganti tombol menu dan panel seluler. Tautan section aktif memiliki gaya tersendiri.

Hero memadukan eyebrow, judul display, deskripsi singkat, CTA menuju kontak, statistik ringkas, dan diorama SVG. Teks dan ilustrasi berdampingan di desktop, lalu bertumpuk pada layar sempit. Orbit dan sorot hijau adalah dekorasi. Diorama adalah gambar statis.

## Karya pilihan dan halaman detail

`#work` memakai `.project-accordion`: satu kartu karya terbuka, kartu lain berupa baris pil. Scroll mengubah kartu aktif, ukuran kartu, dan penghitung karya. Setiap kartu memuat judul serta tautan halaman detail, gambar, kategori, dan ringkasan. Pada reduced motion, semua kartu terbuka agar isinya tetap dapat dibaca.

Halaman detail menampilkan ringkasan, status akses **public/private**, masalah, pendekatan, area fokus, pratinjau sistem, karya berikutnya, dan CTA kontak. Produk publik memiliki tautan keluar; produk privat diberi keterangan akses. Gambar utama dapat dibuka dalam dialog pembesar. Bingkai galeri sistem saat ini merupakan placeholder berlabel; jangan menggambarkannya sebagai tangkapan layar produk.

## Section konten

- **Layanan (`#services`):** tiga kartu Discover, Design, Build pada latar navy. Setiap kartu memiliki simbol dekoratif, indeks, judul, deskripsi, dan daftar kemampuan singkat. Grid tiga kolom menjadi dua pada tablet dan satu pada ponsel.
- **Pendekatan (`#about`):** pengantar sticky di desktop, tiga langkah bernomor, dan motif blueprint. Layout berubah menjadi grid lalu satu kolom.
- **Insights (`#insights`):** dua kartu editorial berisi indeks, artwork CSS abstrak, gagasan utama, dan penjelasan singkat. Artwork bersifat dekoratif.

## Kontak

Section kontak berlatar biru tua dengan ajakan dan tautan langsung di kiri serta kartu formulir abu terang di kanan. Kedua bagian bertumpuk pada layar sempit. Kartu berisi dua tab:

| Tab | Alur |
| --- | --- |
| **Book a call** | Pilih tanggal tersedia → slot waktu → nama, email, dan topik → konfirmasi. Ringkasan tanggal/waktu dapat dipilih lagi untuk mengubah pilihan. |
| **Send a brief** | Isi nama, email, perusahaan opsional, kebutuhan, timeline, dan detail proyek. Pilihan “Other” membuka field penjelasan. |

Tanggal dan slot berasal dari API. Hari tanpa slot dan waktu yang terisi dinonaktifkan. Pengiriman memakai API booking/brief; state konfirmasi muncul sesudah respons berhasil. Error ditampilkan dekat tombol kirim. Kartu setinggi `640px` pada desktop dan `680px` pada lebar `520px` ke bawah.

Kedua form saat ini mengirim JSON dan tidak mempunyai kontrol unggah berkas. Jangan menambahkan janji lampiran tanpa dukungan frontend dan API.

## Footer

Footer berlatar abu pucat memuat ringkasan merek, tautan layanan/studio/kontak, copyright, dan tautan kembali ke atas. Komponen bersama dirender oleh `src/footer.ts`.
