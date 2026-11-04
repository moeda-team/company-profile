NODEWORKS - DINDING BELAKANG GABUNGAN

Satu file GLB berisi dinding belakang dan perlengkapan yang berada pada
rak/kabinet di screenshot: rak kiri-kanan tiga tingkat, kabinet bawah,
countertop, whiteboard dengan sticky notes/diagram dan grafik, lampu
strip, dua lampu meja, kotak dokumen, buku, printer, tanaman rak, mug
dan aksesori kecil.

Tidak mencakup lantai, dinding kaca samping, atap, meja kerja, kursi,
karakter atau tanaman yang berdiri di lantai.

Ini rekonstruksi berdasarkan satu screenshot, belum persis 1:1.
Ukuran asli dan sisi yang tidak terlihat diestimasi. Tulisan kecil pada
sticky notes diganti garis dekoratif; grafik merupakan ilustrasi.
Tanaman dan dekorasi dibuat bergaya sederhana sesuai keseluruhan aset.

FORMAT DAN PEMASANGAN
- glTF 2.0 binary / GLB, satu file tanpa tekstur eksternal.
- Sumbu atas Y, bagian depan menghadap -Z.
- Origin: tengah bagian bawah dinding utama.
- Unit: meter. Ukuran dinding utama 4.80 x 2.70 meter.
- Batas gabungan X/Y/Z: sekitar 4.88 x 2.7175 x 0.559 meter.
- Posisikan pada lantai Y=0; atur rotasi Y agar bagian depan menghadap
  ke bagian dalam ruangan. Sesuaikan skala seragam dengan ruangan Anda.
- Semua bagian berada dalam satu GLB. Geometri dikelompokkan berdasarkan
  bagian dan material: dinding, kabinet, whiteboard, rak kiri, rak kanan
  dan aksesori countertop. Bukan satu mesh tunggal.
- 59 mesh; 102,840 segitiga; ukuran GLB 2,611,636 byte.
- Statis, tanpa rig atau animasi.

PENCAHAYAAN
Material strip dan lampu menggunakan emissive. Pencahayaan hangat yang
terlihat pada preview dibantu lampu render; lampu render tersebut tidak
tertanam di GLB. Atur pencahayaan/environment di aplikasi agar putih,
warna dan bayangannya sesuai scene. Bloom diperlukan bila menginginkan
halo cahaya. Model tidak membawa kamera atau latar screenshot.

ISI PAKET
- nodeworks-back-wall-combined.glb
- nodeworks-back-wall-preview.png (sedikit perspektif)
- nodeworks-back-wall-front.png (tampak depan)
- build_back_wall.py (sumber mandiri, tidak memerlukan GLB sebelumnya)
- render_preview.py
- validation.json
- README.txt

Build: Python, numpy dan trimesh.
Render: pyrender, PyOpenGL, Pillow dan OpenGL/EGL.
