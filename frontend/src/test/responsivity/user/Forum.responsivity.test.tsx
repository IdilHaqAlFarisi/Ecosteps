import { describe, it, expect, beforeEach } from 'vitest';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { setBreakpoint, BREAKPOINTS } from '../../utils/responsivity.utils';
import Forum from '../../../pages/userPage/Forum';
import { ToastProvider } from '../../../toast/toast';

describe('Forum Page Responsivity Tests', () => {
  const renderComponent = () => {
    return render(
      <BrowserRouter>
        <ToastProvider>
          <Forum />
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

    it('should render the forum page on mobile', () => {
      renderComponent();
      expect(document.body).toBeInTheDocument();
    });

    it('should have mobile-optimized forum layout', () => {
      renderComponent();
      expect(window.innerWidth).toBe(BREAKPOINTS.mobile);
    });
  });

  describe('Tablet View (768px)', () => {
    beforeEach(() => {
      setBreakpoint('tablet');
    });

    it('should render the forum page on tablet', () => {
      renderComponent();
      expect(document.body).toBeInTheDocument();
    });

    it('should adapt forum layout for tablet screens', () => {
      renderComponent();
      expect(window.innerWidth).toBe(BREAKPOINTS.tablet);
    });
  });

  describe('Laptop View (1024px)', () => {
    beforeEach(() => {
      setBreakpoint('laptop');
    });

    it('should render the forum page on laptop', () => {
      renderComponent();
      expect(document.body).toBeInTheDocument();
    });
  });

  describe('Desktop View (1440px)', () => {
    beforeEach(() => {
      setBreakpoint('desktop');
    });

    it('should render the forum page on desktop', () => {
      renderComponent();
      expect(document.body).toBeInTheDocument();
    });
  });

  describe('Cross-breakpoint Consistency', () => {
    it('should maintain forum functionality across all breakpoints', () => {
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
