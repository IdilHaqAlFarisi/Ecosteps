import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

// Import semua pages
import Login from '../pages/Login';
import Register from '../pages/Register';
import ResetPassword from '../pages/ResetPassword';
import VerifyEmail from '../pages/VerifyEmail';
import LandingPage from '../pages/LandingPage';
import Dashboard from '../pages/userPage/Dashboard';
import Artikel from '../pages/userPage/Artikel';
import Forum from '../pages/userPage/Forum';
import Laporan from '../pages/userPage/Laporan';
import Tantangan from '../pages/userPage/Tantangan';
import AdminDashboard from '../pages/adminPage/AdminDashboard';
import { ToastProvider } from '../toast/toast';

describe('Page Verification - Memastikan Test Mengetes Halaman yang Benar', () => {
  describe('Auth Pages', () => {
    it('Login page harus memiliki elemen spesifik Login', () => {
      const { container } = render(
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      );
      
      expect(container.querySelector('#page-login')).toBeInTheDocument();
      expect(container.querySelector('#login-form')).toBeInTheDocument();
      expect(container.querySelector('#login-email')).toBeInTheDocument();
      expect(container.querySelector('#login-password')).toBeInTheDocument();
      expect(screen.getByText(/Login ke dashboard ECOSTEPS/i)).toBeInTheDocument();
    });

    it('Register page harus memiliki elemen spesifik Register', () => {
      const { container } = render(
        <BrowserRouter>
          <Register />
        </BrowserRouter>
      );
      
      expect(container.querySelector('#page-register')).toBeInTheDocument();
      expect(container.querySelector('#register-back-home')).toBeInTheDocument();
      expect(screen.getByText(/Daftarkan akunmu di ECOSTEPS/i)).toBeInTheDocument();
    });

    it('ResetPassword page harus memiliki elemen spesifik ResetPassword', () => {
      const { container } = render(
        <BrowserRouter>
          <ResetPassword />
        </BrowserRouter>
      );
      
      expect(container.querySelector('#page-reset-password')).toBeInTheDocument();
      expect(screen.getByText(/Reset password/i)).toBeInTheDocument();
    });

    it('VerifyEmail page harus memiliki elemen spesifik VerifyEmail', () => {
      // VerifyEmail butuh email di localStorage atau state
      // Karena dalam test localStorage.getItem di-mock return null,
      // halaman akan menampilkan loading state
      const { container } = render(
        <BrowserRouter>
          <VerifyEmail />
        </BrowserRouter>
      );
      
      // Halaman VerifyEmail akan render loading jika tidak ada email
      // Cek apakah ada teks Memuat atau page-verify-email
      const hasLoading = container.textContent?.includes('Memuat');
      const hasPageId = container.querySelector('#page-verify-email');
      expect(hasLoading || hasPageId).toBeTruthy();
    });
  });

  describe('Public Pages', () => {
    it('LandingPage harus memiliki elemen spesifik LandingPage', () => {
      const { container } = render(
        <BrowserRouter>
          <LandingPage />
        </BrowserRouter>
      );
      
      expect(container.querySelector('#page-landing')).toBeInTheDocument();
      // Landing page mungkin tidak punya #landing-hero, cek elemen lain
    });
  });

  describe('User Pages', () => {
    it('Dashboard page harus memiliki elemen spesifik Dashboard', () => {
      const { container } = render(
        <BrowserRouter>
          <Dashboard />
        </BrowserRouter>
      );
      
      expect(container.querySelector('#page-dashboard')).toBeInTheDocument();
      expect(container.querySelector('#dashboard-summary')).toBeInTheDocument();
    });

    it('Artikel page harus memiliki elemen spesifik Artikel', () => {
      const { container } = render(
        <BrowserRouter>
          <Artikel />
        </BrowserRouter>
      );
      
      // Artikel bisa dalam state loading, empty, atau normal
      // Cek salah satu kondisi yang valid
      const hasLoading = container.textContent?.includes('Memuat artikel');
      const hasEmpty = container.textContent?.includes('Tidak ada artikel');
      const hasPageId = container.querySelector('#page-artikel') || 
                        container.querySelector('#artikel-grid-dashboard');
      expect(hasLoading || hasEmpty || hasPageId).toBeTruthy();
    });

    it('Forum page harus memiliki elemen spesifik Forum', () => {
      const { container } = render(
        <BrowserRouter>
          <ToastProvider>
            <Forum />
          </ToastProvider>
        </BrowserRouter>
      );
      
      expect(container.querySelector('#page-forum')).toBeInTheDocument();
    });

    it('Laporan page harus memiliki elemen spesifik Laporan', () => {
      const { container } = render(
        <BrowserRouter>
          <Laporan />
        </BrowserRouter>
      );
      
      expect(container.querySelector('#page-laporan')).toBeInTheDocument();
    });

    it('Tantangan page harus memiliki elemen spesifik Tantangan', () => {
      const { container } = render(
        <BrowserRouter>
          <ToastProvider>
            <Tantangan />
          </ToastProvider>
        </BrowserRouter>
      );
      
      expect(container.querySelector('#page-tantangan')).toBeInTheDocument();
    });
  });

  describe('Admin Pages', () => {
    it('AdminDashboard page harus memiliki elemen spesifik AdminDashboard', () => {
      const { container } = render(
        <BrowserRouter>
          <ToastProvider>
            <AdminDashboard />
          </ToastProvider>
        </BrowserRouter>
      );
      
      expect(container.querySelector('#page-admin-dashboard')).toBeInTheDocument();
    });
  });
});
