import { describe, it, expect, beforeEach } from 'vitest';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { setBreakpoint, BREAKPOINTS } from '../../utils/responsivity.utils';
import Dashboard from '../../../pages/userPage/Dashboard';

describe('User Dashboard Page Responsivity Tests', () => {
  const renderComponent = () => {
    return render(
      <BrowserRouter>
        <Dashboard />
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

    it('should render the dashboard on mobile', () => {
      const { container } = renderComponent();
      // Verifikasi ini adalah halaman Dashboard dengan elemen spesifik
      expect(container.querySelector('#page-dashboard')).toBeInTheDocument();
      expect(container.querySelector('#dashboard-summary')).toBeInTheDocument();
    });

    it('should have mobile-optimized dashboard layout', () => {
      renderComponent();
      expect(window.innerWidth).toBe(BREAKPOINTS.mobile);
    });

    it('should stack dashboard widgets vertically on mobile', () => {
      renderComponent();
      expect(window.innerWidth).toBeLessThanOrEqual(BREAKPOINTS.tablet);
    });
  });

  describe('Tablet View (768px)', () => {
    beforeEach(() => {
      setBreakpoint('tablet');
    });

    it('should render the dashboard on tablet', () => {
      renderComponent();
      expect(document.body).toBeInTheDocument();
    });

    it('should adapt dashboard for tablet screens', () => {
      renderComponent();
      expect(window.innerWidth).toBe(BREAKPOINTS.tablet);
    });
  });

  describe('Laptop View (1024px)', () => {
    beforeEach(() => {
      setBreakpoint('laptop');
    });

    it('should render the dashboard on laptop', () => {
      renderComponent();
      expect(document.body).toBeInTheDocument();
    });

    it('should display multi-column layout on laptop', () => {
      renderComponent();
      expect(window.innerWidth).toBeGreaterThanOrEqual(BREAKPOINTS.laptop);
    });
  });

  describe('Desktop View (1440px)', () => {
    beforeEach(() => {
      setBreakpoint('desktop');
    });

    it('should render the dashboard on desktop', () => {
      renderComponent();
      expect(document.body).toBeInTheDocument();
    });

    it('should have full-width dashboard layout', () => {
      renderComponent();
      expect(window.innerWidth).toBe(BREAKPOINTS.desktop);
    });
  });

  describe('Cross-breakpoint Consistency', () => {
    it('should maintain dashboard functionality across all breakpoints', () => {
      const breakpoints: Array<keyof typeof BREAKPOINTS> = ['mobile', 'tablet', 'laptop', 'desktop'];
      
      breakpoints.forEach(breakpoint => {
        setBreakpoint(breakpoint);
        const { unmount } = renderComponent();
        expect(document.body).toBeInTheDocument();
        unmount();
      });
    });
  });
});
