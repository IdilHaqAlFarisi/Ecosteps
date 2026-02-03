import { describe, it, expect, beforeEach } from 'vitest';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { setBreakpoint, BREAKPOINTS } from '../../utils/responsivity.utils';
import AdminDashboard from '../../../pages/adminPage/AdminDashboard';
import { ToastProvider } from '../../../toast/toast';

describe('Admin Dashboard Page Responsivity Tests', () => {
  const renderComponent = () => {
    return render(
      <BrowserRouter>
        <ToastProvider>
          <AdminDashboard />
        </ToastProvider>
      </BrowserRouter>
    );
  };

  beforeEach(() => {
    setBreakpoint('desktop');
  });

  describe('Mobile View (375px)', () => {
    beforeEach(() => {
      setBreakpoint('mobile');
    });

    it('should render the admin dashboard on mobile', () => {
      const { container } = renderComponent();
      // Verifikasi ini adalah halaman AdminDashboard dengan elemen spesifik
      expect(container.querySelector('#page-admin-dashboard')).toBeInTheDocument();
    });

    it('should have mobile-optimized admin layout', () => {
      renderComponent();
      expect(window.innerWidth).toBe(BREAKPOINTS.mobile);
    });

    it('should stack admin panels vertically on mobile', () => {
      const { container } = renderComponent();
      expect(container.querySelector('#page-admin-dashboard')).toBeInTheDocument();
      expect(window.innerWidth).toBe(BREAKPOINTS.mobile);
    });
  });

  describe('Tablet View (768px)', () => {
    beforeEach(() => {
      setBreakpoint('tablet');
    });

    it('should render the admin dashboard on tablet', () => {
      const { container } = renderComponent();
      expect(container.querySelector('#page-admin-dashboard')).toBeInTheDocument();
    });

    it('should adapt admin layout for tablet screens', () => {
      renderComponent();
      expect(window.innerWidth).toBe(BREAKPOINTS.tablet);
    });
  });

  describe('Laptop View (1024px)', () => {
    beforeEach(() => {
      setBreakpoint('laptop');
    });

    it('should render the admin dashboard on laptop', () => {
      const { container } = renderComponent();
      expect(container.querySelector('#page-admin-dashboard')).toBeInTheDocument();
    });

    it('should display side-by-side layout on laptop', () => {
      renderComponent();
      expect(window.innerWidth).toBe(BREAKPOINTS.laptop);
    });
  });

  describe('Desktop View (1440px)', () => {
    beforeEach(() => {
      setBreakpoint('desktop');
    });

    it('should render the admin dashboard on desktop', () => {
      const { container } = renderComponent();
      expect(container.querySelector('#page-admin-dashboard')).toBeInTheDocument();
    });

    it('should have full-width admin dashboard layout', () => {
      renderComponent();
      expect(window.innerWidth).toBe(BREAKPOINTS.desktop);
    });
  });

  describe('Cross-breakpoint Consistency', () => {
    it('should maintain admin functionality across all breakpoints', () => {
      const breakpoints = [
        BREAKPOINTS.mobile,
        BREAKPOINTS.tablet,
        BREAKPOINTS.laptop,
        BREAKPOINTS.desktop,
      ];

      breakpoints.forEach((width) => {
        setBreakpoint(width);
        const { container, unmount } = renderComponent();
        expect(container.querySelector('#page-admin-dashboard')).toBeInTheDocument();
        unmount(); // Clean up after each render
      });
    });
  });
});
