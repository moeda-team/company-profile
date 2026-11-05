# Fondasi visual

[Kembali ke indeks design system](../../DESIGN_SYSTEM.md)

## Warna

Gunakan variabel CSS di `src/style.css` ketika menambah elemen dengan peran yang sama. Biru menandai tindakan dan penekanan, navy untuk teks utama serta latar layanan.

| Token | Nilai | Peran |
| --- | --- | --- |
| `--blue` | `#0847f7` | Aksen dan tindakan pada permukaan terang |
| `--blue-deep` | `#073bdd` | Biru yang lebih gelap |
| `--navy` | `#071344` | Teks utama dan latar layanan |
| `--muted` | `#566b9e` | Teks pendukung |
| `--ice` | `#edf4ff` | Dasar permukaan biru muda |
| `--contact-blue` | `#2542b0` | Latar kontak dan tombol formulir |
| `--contact-blue-hover` | `#1b3191` | Hover tombol formulir |
| `--contact-ink` | `#1b2a6b` | Teks kartu formulir |
| `--contact-muted` | `#5d668f` | Label formulir |
| `--contact-paper` | `#e6e8f0` | Latar kartu formulir |
| `--contact-paper-border` | `#d5d9e6` | Batas field dan tab |

Token kontak lainnya: `--contact-accent: #98a6d6`, `--contact-heading: #ffffff`, dan `--contact-heading-accent: #c3caea`. Section pendekatan memakai `#f5f8fe`; karya memakai gradasi biru pucat. Sorot hijau di hero bersifat dekoratif.

## Tipografi

| Font | Pemakaian |
| --- | --- |
| **DM Sans** | Teks isi, deskripsi, dan sebagian besar kontrol formulir |
| **Barlow Condensed** | Judul display, eyebrow, indeks, dan label tindakan padat; tersedia sebagai `--condensed` |
| **Plus Jakarta Sans** | Wordmark, navigasi, dan CTA header |

Ketiganya dimuat dari Google Fonts di `index.html`. Judul display memakai tinggi baris rapat dan ukuran responsif melalui `clamp()`; teks penjelas memakai tinggi baris sekitar `1.5–1.6`. Jaga hierarki semantik `h1` untuk halaman, `h2` untuk section, dan `h3` untuk kartu/subbagian.

## Layout dan jarak

- `.container`: lebar maksimum `1356px`, margin sisi cair `12%` pada desktop; total margin berubah menjadi `80px`, `56px`, lalu `40px` pada breakpoint `1180px`, `900px`, dan `600px`.
- `.site-header`: panel tetap berbentuk pil, lebar maksimum `1120px`.
- `.contact-wrap`: maksimum `1240px`, kolom `1fr 520px`; bertumpuk pada `1040px` ke bawah.
- Section memakai jarak vertikal yang lapang, sekitar `80–130px`, kemudian dipadatkan pada ponsel.
- Gunakan grid untuk komposisi besar dan flex untuk kelompok kontrol. Prioritaskan ukuran cair dan pembungkusan sebelum menambah breakpoint.

Belum ada skala spacing numerik global. Ambil jarak dari pola komponen yang sejenis, tanpa menganggap angka CSS yang belum ditokenkan sebagai token desain.

## Bentuk dan aset

Header dan kartu karya tertutup berbentuk pil. Kartu terbuka, layanan, kontak, dan detail karya memakai sudut membulat. Border tipis, bayangan biru lembut, orbit, dan grid dekoratif memberi kedalaman.

Hero memakai ilustrasi statis `public/images/work/nodeworks_blue_diorama.svg`. Gambar karya berasal dari `public/images/work/` dan metadatanya dari `src/projects.ts`. Gambar informatif memerlukan teks alternatif; ornamen murni disembunyikan dari teknologi bantu.

## Breakpoint utama

| Lebar maksimum | Perubahan |
| --- | --- |
| `1180px` | Container dan hero menyempit |
| `1100px` | Navigasi desktop menjadi menu seluler |
| `1040px` | Kontak menjadi satu kolom |
| `900px` | Hero bertumpuk; grid layanan dan pendekatan menyesuaikan |
| `600px` | Kartu dan section menjadi susunan ponsel |
| `520px` | Field kontak bertumpuk; slot waktu tiga kolom |
| `375px` | Penyesuaian ponsel kecil |

Periksa `src/work-detail.css` untuk aturan responsif khusus halaman detail karya.
