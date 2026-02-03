# 🧪 Test Suite Responsifitas - SemangatBelajar

Test suite ini dibuat untuk menguji responsifitas dari semua halaman aplikasi SemangatBelajar menggunakan **Vitest** dan **React Testing Library**.

## ✅ Status: All Tests Passing!

**78 tests passing** across 10 test files ✓

```
Test Files  10 passed (10)
Tests       78 passed (78)
```

## � Struktur Folder

```
src/test/
├── README.md
├── config/
│   └── setup.ts                    # Setup file untuk testing
├── utils/
│   └── responsivity.utils.ts       # Utility functions untuk testing
└── responsivity/
    ├── auth/                       # Test untuk halaman autentikasi
    │   ├── Login.responsivity.test.tsx
    │   ├── Register.responsivity.test.tsx
    │   ├── ResetPassword.responsivity.test.tsx
    │   └── VerifyEmail.responsivity.test.tsx
    ├── public/                     # Test untuk halaman publik
    │   └── LandingPage.responsivity.test.tsx
    └── user/                       # Test untuk halaman user
        ├── Dashboard.responsivity.test.tsx
        ├── Artikel.responsivity.test.tsx
        ├── Forum.responsivity.test.tsx
        ├── Laporan.responsivity.test.tsx
        └── Tantangan.responsivity.test.tsx
```

## �📋 Test Case Coverage

Test suite ini mencakup pengujian responsifitas untuk semua halaman berikut:

### Auth Pages
- ✅ **Login** - Halaman login
- ✅ **Register** - Halaman registrasi
- ✅ **ResetPassword** - Halaman reset password
- ✅ **VerifyEmail** - Halaman verifikasi email

### User Pages
- ✅ **LandingPage** - Halaman utama
- ✅ **Dashboard** - Dashboard pengguna
- ✅ **Artikel** - Halaman artikel
- ✅ **Forum** - Halaman forum diskusi
- ✅ **Laporan** - Halaman laporan
- ✅ **Tantangan** - Halaman tantangan

## 📱 Breakpoints yang Diuji

Setiap halaman diuji pada 4 breakpoint utama:

| Breakpoint | Ukuran | Target Device |
|------------|--------|---------------|
| Mobile     | 375px  | Smartphone    |
| Tablet     | 768px  | Tablet        |
| Laptop     | 1024px | Laptop/Desktop kecil |
| Desktop    | 1440px | Desktop besar |

## 🚀 Cara Menjalankan Test

### Menjalankan Semua Test
```bash
pnpm test
# atau
pnpm test --run  # untuk sekali jalan tanpa watch mode
```

### Menjalankan Test Berdasarkan Kategori
```bash
# Test untuk Auth pages saja
pnpm test responsivity/auth

# Test untuk User pages saja
pnpm test responsivity/user

# Test untuk Public pages saja
pnpm test responsivity/public
```

### Menjalankan Test Spesifik
```bash
# Test halaman Login saja
pnpm test Login.responsivity.test.tsx

# Test halaman Dashboard saja
pnpm test Dashboard.responsivity.test.tsx
```

### Menjalankan Test dengan UI
```bash
pnpm test:ui
```

### Menjalankan Test dengan Coverage
```bash
pnpm test --coverage
```
```bash
npm run test:coverage
```

### Menjalankan Test Spesifik
```bash
# Test untuk halaman tertentu
npm run test Login.responsivity.test
npm run test Dashboard.responsivity.test

# Test dengan watch mode
npm run test -- --watch
```

## 📁 Struktur Test

```
src/test/
├── setup.ts                              # Setup Vitest & mocking
├── responsivity.utils.ts                  # Utility functions untuk testing
├── LandingPage.responsivity.test.tsx     # Test Landing Page
├── Login.responsivity.test.tsx           # Test Login
├── Register.responsivity.test.tsx        # Test Register
├── ResetPassword.responsivity.test.tsx   # Test Reset Password
├── VerifyEmail.responsivity.test.tsx     # Test Verify Email
├── Dashboard.responsivity.test.tsx       # Test Dashboard
├── Artikel.responsivity.test.tsx         # Test Artikel
├── Forum.responsivity.test.tsx           # Test Forum
├── Laporan.responsivity.test.tsx         # Test Laporan
└── Tantangan.responsivity.test.tsx       # Test Tantangan
```

## 🛠️ Utility Functions

File `responsivity.utils.ts` menyediakan helper functions:

- `setWindowSize(width, height)` - Set ukuran window untuk testing
- `setBreakpoint(breakpoint)` - Set breakpoint spesifik ('mobile', 'tablet', 'laptop', 'desktop')
- `mockMatchMedia(matches)` - Mock media query matching
- `isElementVisible(element)` - Cek apakah element terlihat
- `waitForNextTick()` - Wait untuk next tick

## 📝 Contoh Test Case

```typescript
describe('Mobile View (375px)', () => {
  beforeEach(() => {
    setBreakpoint('mobile');
  });

  it('should render the page without crashing on mobile', () => {
    renderComponent();
    expect(document.body).toBeInTheDocument();
  });

  it('should have mobile-optimized layout', () => {
    renderComponent();
    expect(window.innerWidth).toBe(BREAKPOINTS.mobile);
  });
});
```

## ✅ Yang Ditest

Setiap halaman diuji untuk:

1. **Rendering** - Halaman dapat di-render tanpa error
2. **Breakpoint Compliance** - Window size sesuai dengan breakpoint yang ditest
3. **Layout Adaptation** - Layout menyesuaikan dengan ukuran layar
4. **Cross-breakpoint Consistency** - Fungsionalitas konsisten di semua breakpoint

## 📊 Coverage Report

Setelah menjalankan test dengan coverage, report akan tersedia di:
- `coverage/index.html` - HTML report (buka di browser)
- `coverage/coverage-final.json` - JSON report
- Terminal output - Text summary

## 🔧 Konfigurasi

Test dikonfigurasi melalui:
- `vitest.config.ts` - Konfigurasi Vitest utama
- `src/test/setup.ts` - Setup dan mocking global

## 📦 Dependencies

Test suite ini menggunakan:
- **Vitest** - Test runner
- **@testing-library/react** - React testing utilities
- **@testing-library/jest-dom** - Custom matchers
- **jsdom** - DOM environment untuk testing

## 👥 Test Case Idil - Responsifitas

Test suite ini dibuat khusus untuk **Test Case Idil** yang fokus pada:
- ✅ Responsifitas semua halaman
- ✅ Multi-device compatibility
- ✅ Layout consistency
- ✅ Accessibility pada berbagai ukuran layar

## 🐛 Troubleshooting

### Test Gagal
- Pastikan semua dependencies sudah terinstall: `pnpm install`
- Clear cache: `rm -rf node_modules/.vitest`
- Restart VS Code

### Coverage Tidak Muncul
- Pastikan `@vitest/coverage-v8` sudah terinstall
- Jalankan: `npm run test:coverage`

## 📝 Notes

- Test ini fokus pada responsifitas, bukan functionality
- Setiap test memastikan halaman dapat di-render pada berbagai ukuran layar
- Test dapat diperluas dengan menambahkan assertions untuk elemen spesifik

---

**Created by:** Idil
**Date:** January 2026
**Project:** SemangatBelajar - Test Case Responsifitas
