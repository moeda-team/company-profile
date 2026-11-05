# Design system Nodeworks

Dokumentasi ini mencatat bahasa visual dan pola antarmuka yang saat ini dipakai pada situs company profile Nodeworks. Gunakan bersama kode sumber saat menambah komponen, halaman, dan konten.

## Dokumen

- [Fondasi](docs/design-system/foundations.md): warna, tipografi, layout, dan aset.
- [Komponen dan pola halaman](docs/design-system/components.md): navigasi, section, karya, dan formulir.
- [Interaksi dan aksesibilitas](docs/design-system/interaction-accessibility.md): gerak, keyboard, bahasa, tema, dan status API.

## Prinsip

1. **Jelas sejak pandangan pertama.** Judul besar, deskripsi ringkas, dan tindakan utama menunjukkan tujuan halaman.
2. **Sistem yang terhubung.** Konten mengaitkan strategi, desain, pengembangan, dan operasi.
3. **Tepat dan hangat.** Grid rapi dan biru tegas dipadukan dengan permukaan terang dan ilustrasi studio.
4. **Interaksi dapat dikenali.** Setiap tautan, tombol, pilihan, dan pesan hasil memiliki umpan balik yang jelas.

## Cakupan dan sumber acuan

Halaman utama berurutan `#top` → `#work` → `#services` → `#about` → `#insights` → `#contact`, lalu footer. Karya memiliki halaman detail tersendiri.

Implementasi utama: [style.css](src/style.css), [main.ts](src/main.ts), [work-detail.css](src/work-detail.css), [work-detail.ts](src/work-detail.ts), dan [projects.ts](src/projects.ts). Font dimuat di [index.html](index.html). Bila implementasi berubah secara sengaja, perbarui dokumentasi ini.

Kontrak backend dijelaskan di [referensi API](../docs/api.md) dan [ketersediaan booking](../docs/booking-availability.md).
