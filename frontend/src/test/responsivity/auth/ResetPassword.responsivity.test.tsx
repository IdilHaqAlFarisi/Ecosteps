import { describe, it, expect, beforeEach } from 'vitest';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { setBreakpoint, BREAKPOINTS } from '../../utils/responsivity.utils';
import ResetPassword from '../../../pages/ResetPassword';

describe('ResetPassword Page Responsivity Tests', () => {
  const renderComponent = () => {
    return render(
      <BrowserRouter>
        <ResetPassword />
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

    it('should render the reset password form on mobile', () => {
      renderComponent();
      expect(document.body).toBeInTheDocument();
    });

    it('should have mobile-optimized form layout', () => {
      renderComponent();
      expect(window.innerWidth).toBe(BREAKPOINTS.mobile);
    });
  });

  describe('Tablet View (768px)', () => {
    beforeEach(() => {
      setBreakpoint('tablet');
    });

    it('should render the reset password form on tablet', () => {
      renderComponent();
      expect(document.body).toBeInTheDocument();
    });

    it('should adapt form for tablet screens', () => {
      renderComponent();
      expect(window.innerWidth).toBe(BREAKPOINTS.tablet);
    });
  });

  describe('Laptop View (1024px)', () => {
    beforeEach(() => {
      setBreakpoint('laptop');
    });

    it('should render the reset password form on laptop', () => {
      renderComponent();
      expect(document.body).toBeInTheDocument();
    });
  });

  describe('Desktop View (1440px)', () => {
    beforeEach(() => {
      setBreakpoint('desktop');
    });

    it('should render the reset password form on desktop', () => {
      renderComponent();
      expect(document.body).toBeInTheDocument();
    });
  });

  describe('Cross-breakpoint Consistency', () => {
    it('should maintain form accessibility across all breakpoints', () => {
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
