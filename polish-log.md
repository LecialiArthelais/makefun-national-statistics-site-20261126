# Polish Log — v2 "Indonesia in Numbers" (huashu-design polish-loop)

**Tanggal:** 26 November 2026
**Metode:** screenshot Playwright nyata (desktop 1440×900 + phone 390×844), semua
7 halaman + semua tool dalam keadaan dipakai; cek zero network, console error,
horizontal scroll. Dua ronde perbaikan, sesuai polish-loop (minimal 2 ronde).

## Ronde 1 — 26 Nov ~17:00 WIB (7 screenshot desktop + 4 phone diperiksa)

Tiga cacat terparah yang ditemukan dan diperbaiki:

1. **Label tile-map menabrak footer (KRITIS).** Label "Java · 55.65%" dan
   "Bali & Nusa Tenggara · 5.60%" menimpa baris footer "Each square ≈ 2% of
   the population · 51 squares · BPS, SUPAS 2025" di index + regions.
   Perbaikan: tinggi viewBox tile-map 340 → 356, footer dipindah ke bawah
   (jarak label–footer ~28px). Terverifikasi bersih di ronde 2.
2. **Label kelompok umur piramida TIDAK KELIHATAN (KRITIS).** Label "0–4" …
   "80+" digambar sebelum batang, lalu tertutup batang yang digambar sesudahnya.
   Perbaikan: celah tengah 70px di piramida + label digambar setelah batang.
   Terverifikasi: semua 17 label terbaca di ronde 2.
3. **Sumbu bar chart terbuang (SEDANG).** `niceCeil` membuat sumbu growth
   mentok di 10.00 (batang hanya setengah tinggi) dengan tick aneh "0.63";
   health spending mentok 5.00; enrolment mentok 200; CO2 mentok 5.00.
   Perbaikan: opsi `ymin/ymax/ticks/tickDecimals` di `barChart` +
   `groupedBars`; growth −2.5…6 (tick −2/0/2/4/6), health 0…4,
   enrolment 0…120 (tick 0/50/100), CO2 0…3. Terverifikasi di ronde 2.

Perbaikan lain ronde 1 (dari pengamatan yang sama):

4. Baris KPI Regions hanya 4 tile → kolom kosong di kanan. Ditambah 2 tile
   (Lowest HDI 54.43 Highland Papua; Highest poverty 29.66% Highland Papua).
5. Baris KPI kedua Economy hanya 4 tile → ditambah 2 tile
   (Unemployment BPS 4.91%; Exports goods & services 22.3% of GDP).
6. Kalimat sumber explorer Regions membingungkan soal satuan GRP →
   "shown in million rupiah (source unit: thousand rupiah)".

## Ronde 2 — 26 Nov ~17:30 WIB (re-shoot penuh, semua halaman + tool)

Diperiksa ulang: index (viewport + full), economy (full + kalkulator terisi),
people (piramida), regions (full + filter Java + banding), society,
environment, data, phone (index/regions/economy/people).

Hasil: **0 cacat baru yang perlu diperbaiki.** Yang diamati tapi diterima
apa adanya (bukan cacat):

- Label tile-map di phone 390px mengecil mengikuti skala SVG — peta tetap
  terbaca sebagai bentuk; horizontal scroll dikorbankan demi itu (tidak ada).
- Baris filter halaman Data membungkus tombol "Download data (CSV)" ke
  baris kedua pada 1120px — layout tetap rapi, by design (`flex-wrap`).
- Kartu "The ten largest provinces" di Regions lebih pendek dari kartu
  "Rankings" di sebelahnya — ruang kosong di bawah chart, wajar untuk
  grid 2 kolom.

## Critique (huashu-design, sebelum selesai)

- **Yang kuat:** cover Almanak langsung terbaca sebagai "buku tahunan
  statistik" — dateline, headline serif, KPI bersumber, rail rilis bernomor
  BRS. Piramida dan tile-map adalah dua visual yang tidak dimiliki entri
  generik. Explorer 38 provinsi + kalkulator adalah tool yang benar-benar
  berfungsi, bukan dekorasi.
- **Yang masih lemah:** (1) Halaman People masih memakai donut "By island
  group" yang duplikatif dengan tile-map — tile-map sudah menyampaikan info
  yang sama dengan lebih baik. (2) Kartu "Where the export dollars come
  from" (hbar 3 baris) terlihat kecil di samping donut sektor — kepadatan
  informasinya rendah. (3) Tidak ada foto/gambar — situs ini 100% tipografi
  + SVG; itu konsisten dengan arah Almanak, tapi di contact sheet ia bisa
  terlihat "kering" dibanding entri bergambar.
- **Keputusan:** ketiganya diterima untuk v2 — memperbaiki (1) dan (2)
  butuh restrukturisasi halaman yang berisiko melewati target 01:00 WIB,
  dan (3) adalah konsekuensi sadar dari arah Almanak (zero network, tanpa
  aset eksternal). Dicatat untuk v3 bila koordinator meminta.

## Hasil QA akhir (otomatis, Playwright)

- 7/7 halaman desktop: 0 console error, 0 page error, 0 external request,
  0 horizontal scroll (scrollWidth == clientWidth).
- 4/4 halaman phone: 0 horizontal scroll.
- Kalkulator: Rp2.500.000 (2020 → 2024) = Rp2.802.653 — cocok dengan
  perhitungan manual; arah balik Rp2.230.030.
- Explorer: 38 default; cari "papua" → 8; filter pulau Jawa → 6;
  klik tile-map Sulawesi → 6; banding Jakarta vs Highland Papua:
  +9,19m penduduk, +29,72 IPM, −25,52 pp kemiskinan, +Rp348,6m GRP/kapita.
- Data: filter Society → 2 dari 50 indikator.
