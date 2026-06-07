# 📖 Panduan Lengkap Penggunaan Website SaveEat
### Untuk Pembuatan Video Tutorial

> **Tujuan dokumen ini**: Memberikan panduan step-by-step agar pembuat video tutorial bisa langsung tahu klik apa saja, akses halaman apa saja, dan kegunaan setiap fitur.

---

## 🔐 Akun Demo (Kredensial Login)

| Role | Email | Password |
|------|-------|----------|
| **Pelanggan (Student)** | `student@saveeat.id` | `demo1234` |
| **Pemilik Usaha (Merchant)** | `merchant@saveeat.id` | `demo1234` |

> [!TIP]
> Gunakan 2 tab browser terpisah untuk mendemonstrasikan kedua role secara bersamaan.

---

## 🏠 Halaman Utama (Landing Page)

**URL**: `http://localhost:3000/`

### Apa yang terlihat:
- **Navbar** di atas dengan logo SaveEat, link navigasi: Marketplace, Cara Kerja, SDG Impact, Merchant
- **Ticker/Running Text** hijau di bagian paling atas — menampilkan statistik platform (makanan diselamatkan, CO₂ dicegah, dll.)
- **Hero Section** dengan:
  - Judul besar: "Penyelamat Makanan. Penyelamat Dompet."
  - Tombol **"Cari Mystery Bag Sekarang"** (orange) → menuju Marketplace
  - Tombol **"Daftar Sebagai Merchant"** → menuju Login Merchant
  - **Model 3D** kantong mystery bag dengan logo SaveEat (bisa digerakkan oleh mouse)
  - Floating cards: "Hemat 70%", "Zero Waste", "127 pesan hari ini"
- **Section "Cara Kerja"** (scroll ke bawah):
  - 2 kolom: alur untuk **Mahasiswa** (4 langkah) dan alur untuk **Merchant** (4 langkah)
- **Section "SDG Impact"**:
  - 4 statistik besar dengan animasi counter: Makanan Diselamatkan, CO₂ Dicegah, Uang Dihemat, Mystery Bag Terjual
  - 4 kartu SDGs: Tanpa Kelaparan, Pekerjaan & Ekonomi, Konsumsi Bertanggung Jawab, Penanganan Iklim
- **Section "Fitur Unggulan"**: Real-time Updates, Map View, Merchant Analytics, Gamifikasi Badge, QR Scan Pickup, Notifikasi Push
- **Section CTA**: "Siap Mulai Menyelamatkan Makanan?" dengan 2 tombol aksi
- **Footer**: Logo, copyright, link Tentang/Privasi/Kontak

### Yang bisa di-klik di Landing Page:
| Elemen | Aksi |
|--------|------|
| Logo "SaveEat" di navbar | Kembali ke landing page |
| "Marketplace" di navbar | Pergi ke halaman marketplace |
| Tombol "Cari Mystery Bag Sekarang" | Pergi ke marketplace |
| Tombol "Daftar Sebagai Merchant" | Pergi ke login (role merchant) |
| Scroll ke bawah | Menampilkan section-section berikutnya |
| Tombol "Cari Mystery Bag" di CTA bawah | Pergi ke login student |
| Tombol "Daftarkan Tokoku" di CTA bawah | Pergi ke login merchant |

---

## 🔑 Halaman Login / Register

**URL**: `http://localhost:3000/login`

### Alur:
1. **Pilih Role** — 2 kartu besar:
   - 🎓 **"Masuk sebagai Pelanggan"** — untuk mahasiswa/konsumen
   - 🏪 **"Masuk sebagai Pemilik Usaha"** — untuk merchant/UMKM
2. Setelah pilih role, muncul **form login**:
   - Input Email
   - Input Password (ada tombol 👁 untuk show/hide password)
   - Kotak hijau "Demo" berisi kredensial contoh
   - Tombol **"Masuk"**
   - Link **"Belum punya akun? Daftar di sini"** → switch ke form register
3. Khusus role **Student**: ada tombol **"Masuk dengan Google"** (simulasi)
4. Setelah login berhasil:
   - Student → diarahkan ke `/marketplace`
   - Merchant → diarahkan ke `/merchant`

### Yang bisa di-klik:
| Elemen | Aksi |
|--------|------|
| Kartu "Pelanggan" | Pilih role student, tampilkan form |
| Kartu "Pemilik Usaha" | Pilih role merchant, tampilkan form |
| "← Kembali pilih role" | Kembali ke pemilihan role |
| Tombol "Masuk dengan Google" | Login simulasi via Google |
| Tombol "Masuk" | Submit form login |
| "Daftar di sini" | Switch ke form register |
| "Masuk di sini" | Switch kembali ke form login |
| Logo SaveEat di atas | Kembali ke landing page |

---

## 🛒 ALUR PELANGGAN (STUDENT)

### A. Halaman Marketplace

**URL**: `http://localhost:3000/marketplace`

**Deskripsi**: Halaman utama untuk pelanggan mencari dan membeli Mystery Bag dari berbagai merchant.

#### Apa yang terlihat:
- **Header** dengan sapaan "Halo, Ariel!" dan ikon notifikasi
- **Search bar** untuk mencari merchant/makanan
- **Filter & Sort**: Tombol untuk mengurutkan berdasarkan jarak, harga, rating, atau stok
- **Daftar Mystery Bag** dalam bentuk kartu-kartu yang menampilkan:
  - Foto merchant
  - Nama toko (contoh: "Kopi Kenangan Kampus", "Roti'O Bakery", dll.)
  - Rating bintang dan jumlah review
  - Harga asli (dicoret) dan harga diskon + persentase diskon
  - Sisa stok ("Sisa 3 Bag", "Sisa 5 Bag")
  - Waktu pickup (contoh: "20:00 - 21:00")
  - Jarak dari kampus
  - Tombol ❤ favorit

#### Yang bisa di-klik:
| Elemen | Aksi |
|--------|------|
| Kartu merchant mana pun | Buka halaman detail merchant |
| Tombol ❤ (hati) | Tambah/hapus dari favorit |
| Ikon 🔔 notifikasi | Buka halaman notifikasi |
| Search bar | Ketik nama merchant untuk filter |
| Tombol sort/filter | Urutkan daftar merchant |
| Navbar bawah: "Marketplace" | Tetap di marketplace |
| Navbar bawah: "Favorites" | Buka halaman favorit |
| Navbar bawah: "Orders" | Buka halaman pesanan |
| Navbar bawah: "Impact" | Buka halaman impact |
| Navbar bawah: "Profile" | Buka halaman profil |

---

### B. Halaman Detail Merchant

**URL**: `http://localhost:3000/marketplace/[id]` (contoh: `/marketplace/merchant-001`)

**Deskripsi**: Halaman detail toko yang menampilkan informasi lengkap merchant dan opsi pemesanan Mystery Bag.

#### Apa yang terlihat:
- Gambar toko besar di atas
- Nama toko, deskripsi, rating, jumlah review
- Alamat dan jarak dari kampus
- Jam operasional
- Tag kategori makanan (contoh: "Kopi", "Pastri", "Snack")
- **Mystery Bag Card**: harga diskon, harga asli, stok tersedia, waktu pickup
- Tombol **"Pesan Mystery Bag"** (jika stok tersedia)
- Tombol ❤ favorit
- Daftar review dari pelanggan lain

#### Yang bisa di-klik:
| Elemen | Aksi |
|--------|------|
| Tombol "← Kembali" | Kembali ke marketplace |
| Tombol "Pesan Mystery Bag" | Membuat pesanan (muncul konfirmasi) |
| Tombol ❤ | Tambah/hapus favorit |
| Pilihan jumlah bag (+/-) | Menambah/mengurangi jumlah pesanan |

---

### C. Halaman Pesanan (Orders)

**URL**: `http://localhost:3000/orders`

**Deskripsi**: Daftar semua pesanan pelanggan (aktif dan riwayat).

#### Apa yang terlihat:
- Tab filter: **Semua**, **Menunggu**, **Dikonfirmasi**, **Selesai**, **Dibatalkan**
- Kartu pesanan dengan informasi:
  - Nama merchant
  - Jumlah bag dan total harga
  - Status pesanan (warna berbeda per status)
  - Waktu pesanan
  - **QR Code** untuk pickup (pada pesanan aktif)
- Tombol aksi berdasarkan status

#### Status pesanan dan artinya:
| Status | Warna | Arti |
|--------|-------|------|
| Menunggu | 🟡 Kuning | Pesanan baru, belum dikonfirmasi merchant |
| Dikonfirmasi | 🔵 Biru | Merchant sudah konfirmasi, siap diambil |
| Selesai | 🟢 Hijau | Sudah di-pickup, transaksi selesai |
| Dibatalkan | 🔴 Merah | Pesanan dibatalkan |

#### Yang bisa di-klik:
| Elemen | Aksi |
|--------|------|
| Tab filter status | Filter pesanan berdasarkan status |
| Kartu pesanan | Lihat detail dan QR Code |
| Tombol "Lihat QR Code" | Menampilkan QR Code untuk pickup |
| Tombol "Beri Review" | Memberi rating dan komentar (untuk pesanan selesai) |
| Tombol "Bagikan" | Share achievement via Web Share API |

---

### D. Halaman Favorit

**URL**: `http://localhost:3000/favorites`

**Deskripsi**: Daftar merchant yang sudah ditandai ❤ oleh pelanggan.

#### Apa yang terlihat:
- Grid kartu merchant yang sudah difavoritkan
- Informasi Mystery Bag terbaru dari setiap merchant favorit
- Tombol untuk langsung memesan

---

### E. Halaman Notifikasi

**URL**: `http://localhost:3000/notifications`

**Deskripsi**: Daftar notifikasi untuk pelanggan.

#### Jenis notifikasi:
| Tipe | Contoh |
|------|--------|
| 🆕 Mystery Bag Baru | "Kopi Kenangan Kampus baru aja publish 3 Mystery Bag!" |
| ✅ Pesanan Dikonfirmasi | "Pesananmu di Tous Les Jours sudah dikonfirmasi" |
| ⏰ Reminder Pickup | "Pesananmu di Roti'O Bakery akan expired dalam 30 menit" |
| 🎉 Promo | "Warung Steak Abang diskon ekstra 10% hari ini!" |
| 🏅 Badge Baru | "Kamu mendapatkan badge Food Hero!" |

---

### F. Halaman Impact

**URL**: `http://localhost:3000/impact`

**Deskripsi**: Menampilkan dampak positif yang sudah dicapai pengguna.

#### Apa yang terlihat:
- **Statistik personal**: Total bag dipesan, uang dihemat, CO₂ dicegah, makanan diselamatkan
- **Streak counter**: Berapa hari berturut-turut memesan
- **Badge/Achievement**: Koleksi badge yang sudah di-unlock:
  - 🌿 Eco Starter — pesan bag pertama
  - 🏅 Food Hero — 10 bag dipesan
  - 🌍 Planet Saver — 50 bag dipesan
  - 🔥 Streak Master — 7 hari berturut-turut
  - 🎉 First Bite — pesanan pertama berhasil
  - 🐦 Early Bird — pengguna awal SaveEat
  - 💰 Super Saver — hemat lebih dari Rp100.000
  - ✍️ Review Writer — tulis 5 review
- **Progress bar** menuju badge berikutnya

---

### G. Halaman Profil

**URL**: `http://localhost:3000/profile`

**Deskripsi**: Halaman profil pengguna.

#### Apa yang terlihat:
- Avatar dan nama pengguna
- Email
- Statistik ringkas
- Tombol edit profil
- Tombol **"Keluar Akun"** (Logout)

---

### H. Halaman Maps (Peta)

**URL**: `http://localhost:3000/maps`

**Deskripsi**: Peta interaktif untuk menemukan merchant terdekat.

#### Apa yang terlihat:
- Peta dengan pin lokasi setiap merchant
- Sidebar/panel daftar merchant
- Informasi jarak dari lokasi pengguna
- Klik pin → tampil info merchant dan link ke detail

---

## 🏪 ALUR MERCHANT (PEMILIK USAHA)

> Login dengan: `merchant@saveeat.id` / `demo1234`
> Setelah login → otomatis diarahkan ke `/merchant`

### Navigasi Merchant

Merchant memiliki **sidebar** (desktop) atau **bottom nav** (mobile) dengan menu:

| Menu | Ikon | URL | Kegunaan |
|------|------|-----|----------|
| Dashboard | 📊 | `/merchant` | Ringkasan performa toko |
| Mystery Bag | 📦 | `/merchant/bags` | Kelola Mystery Bag (buat, edit, stok) |
| Pesanan | 📋 | `/merchant/orders` | Kelola pesanan masuk dari pelanggan |
| Analitik | 📈 | `/merchant/analytics` | Grafik dan laporan penjualan |
| Pengaturan | ⚙️ | `/merchant/settings` | Pengaturan toko dan akun |

---

### A. Dashboard Merchant

**URL**: `http://localhost:3000/merchant`

**Deskripsi**: Ringkasan performa toko hari ini.

#### Apa yang terlihat:
- Sapaan "Halo, Pemilik Kopi Kenangan!"
- **Kartu statistik**: Total bag terjual, pendapatan, rating rata-rata, review
- **Pesanan terbaru** yang perlu dikonfirmasi
- **Grafik mini** penjualan harian
- Quick action buttons

---

### B. Kelola Mystery Bag

**URL**: `http://localhost:3000/merchant/bags`

**Deskripsi**: Halaman untuk membuat dan mengelola Mystery Bag yang dijual.

#### Apa yang terlihat dan bisa dilakukan:
- **Daftar Mystery Bag aktif** dengan info stok, harga, dan waktu pickup
- Tombol **"Buat Mystery Bag Baru"** / **"+"**:
  - Input jumlah stok
  - Input harga asli
  - Slider/input persentase diskon
  - Harga diskon (otomatis terhitung)
  - Waktu mulai dan akhir pickup
  - Tombol "Simpan"
- Tombol **Edit** dan **Hapus** untuk setiap bag

#### Yang bisa di-klik:
| Elemen | Aksi |
|--------|------|
| Tombol "Buat Mystery Bag Baru" | Buka form pembuatan bag |
| Tombol Edit pada setiap bag | Edit detail bag (stok, harga, waktu) |
| Toggle status | Aktifkan/nonaktifkan bag |

---

### C. Pesanan Merchant

**URL**: `http://localhost:3000/merchant/orders`

**Deskripsi**: Daftar pesanan masuk dari pelanggan.

#### Apa yang terlihat:
- Tab: **Semua**, **Menunggu**, **Dikonfirmasi**, **Selesai**
- Kartu pesanan dengan:
  - Nama pelanggan
  - Jumlah bag dan total harga
  - Waktu pesanan
  - Status pesanan
  - Tombol aksi

#### Alur pesanan dari sisi merchant:
1. **Pesanan masuk** (status: Menunggu) → Klik **"Konfirmasi"**
2. **Pelanggan datang** → Klik **"Scan QR"** untuk verifikasi
3. **Selesai** → Pesanan otomatis berubah status ke "Selesai/Picked Up"

#### Yang bisa di-klik:
| Elemen | Aksi |
|--------|------|
| Tombol "Konfirmasi" | Konfirmasi pesanan yang masuk |
| Tombol "Scan QR" | Membuka kamera untuk scan QR pelanggan |
| Tombol "Tandai Selesai" | Menyelesaikan pesanan |
| Tab filter | Filter berdasarkan status |

---

### D. Analitik Merchant

**URL**: `http://localhost:3000/merchant/analytics`

**Deskripsi**: Dashboard analitik penjualan dengan grafik interaktif.

#### Apa yang terlihat:
- **Grafik penjualan** harian/mingguan/bulanan (menggunakan Recharts)
- **Metrik utama**: Total bag terjual, total pendapatan, rata-rata penjualan harian, rating
- **Tabel data** harian: tanggal, bag terjual, pendapatan, bag tersedia

---

### E. Pengaturan Merchant

**URL**: `http://localhost:3000/merchant/settings`

**Deskripsi**: Halaman pengaturan profil toko dan akun.

#### Apa yang terlihat:
- Form edit profil toko: nama toko, deskripsi, alamat, jam operasional
- Pengaturan notifikasi
- Tombol **"Keluar Akun"** (Logout)

---

## 🎬 Skenario Video Tutorial yang Disarankan

### Skenario 1: Alur Pelanggan (kurang lebih 5 menit)

```
1. Buka landing page → scroll turun tunjukkan fitur-fitur
2. Klik "Cari Mystery Bag Sekarang"
3. Diarahkan ke Marketplace → login dengan student@saveeat.id / demo1234
4. Setelah login → browse marketplace, tunjukkan filter dan search
5. Klik salah satu merchant (contoh: Kopi Kenangan)
6. Tunjukkan detail merchant, harga, rating, review
7. Klik "Pesan Mystery Bag" → konfirmasi pesanan
8. Pergi ke halaman Orders → tunjukkan QR Code
9. Pergi ke halaman Impact → tunjukkan badges dan statistik
10. Pergi ke halaman Maps → tunjukkan peta lokasi merchant
11. Pergi ke halaman Notifications → tunjukkan notifikasi
12. Pergi ke Profile → tunjukkan profil dan logout
```

### Skenario 2: Alur Merchant (kurang lebih 4 menit)

```
1. Dari landing page → klik "Daftar Sebagai Merchant"
2. Login dengan merchant@saveeat.id / demo1234
3. Masuk ke Dashboard → tunjukkan ringkasan performa
4. Pergi ke Mystery Bag → tunjukkan cara buat bag baru
5. Isi form: stok, harga, diskon, waktu pickup → simpan
6. Pergi ke Pesanan → tunjukkan pesanan masuk
7. Klik "Konfirmasi" pada pesanan → tunjukkan proses scan QR
8. Pergi ke Analitik → tunjukkan grafik penjualan
9. Pergi ke Pengaturan → tunjukkan profil toko
10. Logout
```

### Skenario 3: Demo Lengkap Kedua Role (kurang lebih 8 menit)

```
1. Buka landing page → overview platform SaveEat
2. Demo alur Merchant:
   - Login merchant → buat Mystery Bag → lihat dashboard
3. Buka tab baru, Demo alur Pelanggan:
   - Login student → cari bag → pesan → lihat QR
4. Kembali ke tab Merchant:
   - Tunjukkan pesanan masuk → konfirmasi → scan QR
5. Kembali ke tab Student:
   - Pesanan berubah jadi "Selesai" → beri review
   - Tunjukkan Impact dan Badges
6. Closing: tunjukkan dampak SDGs di landing page
```

---

## 📱 Tips untuk Recording Video

1. **Gunakan resolusi 1920x1080** (Full HD) untuk kualitas terbaik
2. **Gunakan mode mobile** di Chrome DevTools (tekan F12 → toggle device toolbar) untuk menunjukkan tampilan mobile yang responsif
3. **Gerakkan mouse secara perlahan** agar animasi hover terlihat jelas
4. **Scroll secara smooth** di landing page — ada banyak animasi masuk
5. **Tunjukkan model 3D** di hero section — gerakkan mouse untuk rotasi
6. **Rekam di 2 tab** jika ingin mendemonstrasikan interaksi student dan merchant
7. Website sudah **PWA-ready** — bisa juga ditunjukkan cara "Install to Home Screen" di Chrome

---

## 🗂 Struktur Halaman Lengkap

```
/                          → Landing Page (publik)
/login                     → Login / Register
/login?role=student        → Login langsung ke form student
/login?role=merchant       → Login langsung ke form merchant

── PELANGGAN (setelah login student) ──
/marketplace               → Daftar Mystery Bag dari merchant
/marketplace/[id]          → Detail merchant dan pemesanan
/orders                    → Daftar pesanan pelanggan
/favorites                 → Merchant favorit
/notifications             → Notifikasi pelanggan
/impact                    → Dampak positif dan badges
/profile                   → Profil pengguna
/maps                      → Peta lokasi merchant

── MERCHANT (setelah login merchant) ──
/merchant                  → Dashboard ringkasan
/merchant/bags             → Kelola Mystery Bag
/merchant/orders           → Kelola pesanan masuk
/merchant/analytics        → Grafik dan laporan penjualan
/merchant/settings         → Pengaturan toko
```

---

## ✅ Status Kelengkapan Website

| Halaman | Status | Catatan |
|---------|--------|---------|
| Landing Page | ✅ 100% | Lengkap dengan 3D, animasi, SDGs |
| Login/Register | ✅ 100% | Dual role, Google OAuth simulasi |
| Marketplace | ✅ 100% | Search, filter, sort, kartu merchant |
| Detail Merchant | ✅ 100% | Info lengkap, review, pemesanan |
| Orders | ✅ 100% | QR Code, status tracking, review |
| Favorites | ✅ 100% | Grid merchant favorit |
| Notifications | ✅ 100% | 5 tipe notifikasi |
| Impact dan Badges | ✅ 100% | 8 badges, stats, progress bar |
| Profile | ✅ 100% | Info user, logout |
| Maps | ✅ 100% | Peta interaktif |
| Merchant Dashboard | ✅ 100% | Statistik ringkasan |
| Merchant Bags | ✅ 100% | CRUD Mystery Bag |
| Merchant Orders | ✅ 100% | Konfirmasi dan scan QR |
| Merchant Analytics | ✅ 100% | Grafik Recharts |
| Merchant Settings | ✅ 100% | Profil toko dan logout |

> [!IMPORTANT]
> Website ini adalah **prototype frontend** dengan data demo (mock). Semua fitur berfungsi untuk demonstrasi, namun data tidak tersimpan ke server — hanya disimpan di browser (localStorage). Ini sudah sangat cukup dan lengkap untuk keperluan presentasi dan pembuatan video tutorial.
