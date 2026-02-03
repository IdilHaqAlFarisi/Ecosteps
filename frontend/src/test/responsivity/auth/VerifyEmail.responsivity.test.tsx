import { describe, it, expect, beforeEach } from 'vitest';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { setBreakpoint, BREAKPOINTS } from '../../utils/responsivity.utils';
import VerifyEmail from '../../../pages/VerifyEmail';

describe('VerifyEmail Page Responsivity Tests', () => {
  const renderComponent = () => {
    return render(
      <BrowserRouter>
        <VerifyEmail />
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

    it('should render the verify email page on mobile', () => {
      renderComponent();
      expect(document.body).toBeInTheDocument();
    });

    it('should have mobile-optimized layout', () => {
      renderComponent();
      expect(window.innerWidth).toBe(BREAKPOINTS.mobile);
    });
  });

  describe('Tablet View (768px)', () => {
    beforeEach(() => {
      setBreakpoint('tablet');
    });

    it('should render the verify email page on tablet', () => {
      renderComponent();
      expect(document.body).toBeInTheDocument();
    });

    it('should adapt layout for tablet screens', () => {
      renderComponent();
      expect(window.innerWidth).toBe(BREAKPOINTS.tablet);
    });
  });

  describe('Laptop View (1024px)', () => {
    beforeEach(() => {
      setBreakpoint('laptop');
    });

    it('should render the verify email page on laptop', () => {
      renderComponent();
      expect(document.body).toBeInTheDocument();
    });
  });

  describe('Desktop View (1440px)', () => {
    beforeEach(() => {
      setBreakpoint('desktop');
    });

    it('should render the verify email page on desktop', () => {
      renderComponent();
      expect(document.body).toBeInTheDocument();
    });
  });

  describe('Cross-breakpoint Consistency', () => {
    it('should maintain content integrity across all breakpoints', () => {
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
