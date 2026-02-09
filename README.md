# Ecosteps Web

<div align="center">
  <p>🌱 Platform berbasis web untuk mendorong gaya hidup berkelanjutan melalui tantangan lingkungan, laporan sampah, dan forum komunitas</p>
</div>

## 📋 Deskripsi

Ecosteps adalah platform web yang dirancang untuk meningkatkan kesadaran dan partisipasi masyarakat dalam menjaga lingkungan. Platform ini memungkinkan pengguna untuk:
- Mengikuti tantangan lingkungan harian
- Melaporkan masalah sampah di sekitar
- Membaca artikel edukatif tentang lingkungan
- Berpartisipasi dalam forum komunitas
- Mengumpulkan poin dan bersaing di leaderboard

## ✨ Fitur Utama

### Untuk Pengguna
- 📝 **Registrasi & Login** - Sistem autentikasi yang aman dengan JWT
- 🏆 **Tantangan Harian** - Tantangan lingkungan yang dapat diselesaikan setiap hari
- 📊 **Dashboard** - Melihat progress, poin, dan statistik pribadi
- 📰 **Artikel Lingkungan** - Membaca artikel edukatif tentang lingkungan
- 🗑️ **Laporan Sampah** - Melaporkan masalah sampah di lingkungan sekitar
- 💬 **Forum Diskusi** - Berdiskusi dengan komunitas tentang isu lingkungan
- 🥇 **Leaderboard** - Melihat peringkat pengguna berdasarkan poin

### Untuk Admin
- ✅ **Persetujuan Tantangan** - Menyetujui atau menolak tantangan yang diselesaikan pengguna
- 📋 **Manajemen Laporan** - Mengelola laporan sampah dari pengguna
- 👥 **Manajemen Pengguna** - Melihat dan mengelola data pengguna
- 🗑️ **Moderasi Forum** - Menghapus postingan forum yang tidak sesuai

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 19.2.0
- **Language**: TypeScript
- **Build Tool**: Vite 7.1.9
- **Styling**: TailwindCSS 4.1.10
- **Routing**: React Router DOM 7.9.3
- **Icons**: Phosphor Icons, Lucide React

### Backend
- **Language**: Go 1.24.2
- **Database**: PostgreSQL (via pgx/v5)
- **Authentication**: JWT (golang-jwt/jwt)
- **Environment**: godotenv

### Testing
- **E2E Testing**: Selenium (Python)
- **Integration Testing**: Katalon Studio

## 📁 Struktur Proyek

```
ecosteps-web/
├── frontend/                 # Aplikasi React frontend
│   ├── src/
│   │   ├── components/      # Komponen reusable
│   │   ├── pages/          # Halaman aplikasi
│   │   │   ├── adminPage/  # Halaman khusus admin
│   │   │   └── userPage/   # Halaman khusus user
│   │   └── toast/          # Komponen notifikasi
│   ├── public/             # Asset statis
│   └── package.json        # Dependencies frontend
│
├── backend/                 # API server Go
│   ├── config/             # Konfigurasi database
│   ├── handlers/           # HTTP handlers
│   ├── middleware/         # Middleware (CORS, Auth, dll)
│   ├── models/             # Data models
│   └── main.go             # Entry point backend
│
├── Ecosteps Integration Testing/  # Test cases Katalon
├── artikel.py              # Script testing artikel
├── test_responsive.py      # Script testing responsivitas
└── requirements.txt        # Dependencies Python
```

## 🚀 Instalasi dan Setup

### Prasyarat
- Node.js (v18 atau lebih tinggi)
- Go (v1.24 atau lebih tinggi)
- PostgreSQL
- Python 3.x (untuk testing)

### 1. Clone Repository
```bash
git clone https://github.com/IdilHaqAlFarisi/ecosteps-web.git
cd ecosteps-web
```

### 2. Setup Backend

```bash
cd backend

# Install dependencies
go mod download

# Buat file .env berdasarkan .env.example
cp .env.example .env

# Edit .env dan isi dengan konfigurasi database Anda
# DATABASE_URL=postgresql://user:password@localhost:5432/ecosteps
# JWT_SECRET=your-secret-key

# Jalankan server (default port: 8080)
go run main.go
```

### 3. Setup Frontend

```bash
cd frontend

# Install dependencies
npm install
# atau
pnpm install

# Jalankan development server (default port: 5173)
npm run dev
```

### 4. Setup Testing (Opsional)

```bash
# Install dependencies Python untuk testing
pip install -r requirements.txt

# Jalankan test responsivitas
python test_responsive.py

# Jalankan test artikel
python artikel.py
```

## 🎯 Menjalankan Aplikasi

1. **Backend**: Pastikan server Go berjalan di `http://localhost:8080`
2. **Frontend**: Buka browser dan akses `http://localhost:5173`
3. **Database**: Pastikan PostgreSQL sudah berjalan dan database sudah dikonfigurasi

### Akun Default (Development)
- **User**: 
  - Email: `putra@ecosteps.com`
  - Password: `123`
- **Admin**:
  - Email: `admin@ecosteps.com`
  - Password: `admin`

## 🧪 Testing

### Frontend Testing
```bash
cd frontend
npm run test
```

### Backend Testing
```bash
cd backend
go test ./...
```

### E2E Testing dengan Selenium
```bash
# Pastikan aplikasi berjalan di localhost
python test_responsive.py
python artikel.py
```

## 🔌 API Endpoints

### Authentication
- `POST /api/register` - Registrasi pengguna baru
- `POST /api/login` - Login pengguna

### Laporan
- `POST /api/laporan` - Buat laporan baru
- `GET /api/laporan/all` - Ambil semua laporan
- `PUT /api/laporan/update` - Update status laporan
- `DELETE /api/laporan/delete` - Hapus laporan
- `GET /api/laporan/user` - Ambil laporan user

### Tantangan
- `GET /api/tantangan/hari-ini` - Ambil tantangan hari ini
- `GET /api/tantangan/selesai-hari-ini` - Ambil tantangan selesai hari ini
- `POST /api/tantangan/selesai` - Selesaikan tantangan
- `GET /api/tantangan/pending` - Ambil tantangan pending
- `POST /api/tantangan/approve` - Setujui tantangan
- `POST /api/tantangan/reject` - Tolak tantangan

### User
- `GET /api/user/poin` - Ambil poin user
- `GET /api/user/profile` - Ambil profil user
- `GET /api/user/all` - Ambil semua user (admin)

### Forum
- `GET/POST /api/forum` - List dan buat post forum
- `POST /api/forum/:id` - Tambah komentar
- `DELETE /api/forum/delete` - Hapus post forum

### Lainnya
- `GET /api/leaderboard` - Ambil leaderboard
- `GET /api/artikel` - Proxy artikel lingkungan

## 🏗️ Build untuk Production

### Frontend
```bash
cd frontend
npm run build
# Output di folder dist/
```

### Backend
```bash
cd backend
go build -o ecosteps-server main.go
# Jalankan binary
./ecosteps-server
```

## 🤝 Kontribusi

Kontribusi selalu diterima! Jika Anda ingin berkontribusi:

1. Fork repository ini
2. Buat branch fitur (`git checkout -b feature/AmazingFeature`)
3. Commit perubahan (`git commit -m 'Add some AmazingFeature'`)
4. Push ke branch (`git push origin feature/AmazingFeature`)
5. Buat Pull Request

## 📝 Lisensi

Project ini dibuat untuk tujuan edukasi dan pengembangan komunitas.

## 👨‍💻 Developer

Dibuat dengan ❤️ oleh [Idil Haq Al Farisi](https://github.com/IdilHaqAlFarisi)

## 📧 Kontak

Untuk pertanyaan atau saran, silakan buat issue di repository ini.

---

<div align="center">
  <p>🌍 Mari bersama-sama menjaga lingkungan! 🌱</p>
</div>
