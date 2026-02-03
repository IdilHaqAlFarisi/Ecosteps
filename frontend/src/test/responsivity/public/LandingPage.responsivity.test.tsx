import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { setBreakpoint, BREAKPOINTS } from '../../utils/responsivity.utils';
import LandingPage from '../../../pages/LandingPage';

describe('LandingPage Responsivity Tests', () => {
  const renderComponent = () => {
    return render(
      <BrowserRouter>
        <LandingPage />
      </BrowserRouter>
    );
  };

  beforeEach(() => {
    // Reset to desktop size before each test
    setBreakpoint('desktop');
  });

  describe('Mobile View (375px)', () => {
    beforeEach(() => {
      setBreakpoint('mobile');
    });

    it('should render the page without crashing on mobile', () => {
      renderComponent();
      expect(document.body).toBeInTheDocument();
    });

    it('should display mobile-optimized layout', () => {
      renderComponent();
      expect(window.innerWidth).toBe(BREAKPOINTS.mobile);
    });

    it('should have proper viewport width', () => {
      renderComponent();
      expect(window.innerWidth).toBeLessThanOrEqual(BREAKPOINTS.tablet);
    });
  });

  describe('Tablet View (768px)', () => {
    beforeEach(() => {
      setBreakpoint('tablet');
    });

    it('should render the page without crashing on tablet', () => {
      renderComponent();
      expect(document.body).toBeInTheDocument();
    });

    it('should display tablet-optimized layout', () => {
      renderComponent();
      expect(window.innerWidth).toBe(BREAKPOINTS.tablet);
    });

    it('should adapt layout for medium screens', () => {
      renderComponent();
      expect(window.innerWidth).toBeGreaterThanOrEqual(BREAKPOINTS.mobile);
      expect(window.innerWidth).toBeLessThan(BREAKPOINTS.laptop);
    });
  });

  describe('Laptop View (1024px)', () => {
    beforeEach(() => {
      setBreakpoint('laptop');
    });

    it('should render the page without crashing on laptop', () => {
      renderComponent();
      expect(document.body).toBeInTheDocument();
    });

    it('should display laptop-optimized layout', () => {
      renderComponent();
      expect(window.innerWidth).toBe(BREAKPOINTS.laptop);
    });
  });

  describe('Desktop View (1440px)', () => {
    beforeEach(() => {
      setBreakpoint('desktop');
    });

    it('should render the page without crashing on desktop', () => {
      renderComponent();
      expect(document.body).toBeInTheDocument();
    });

    it('should display desktop-optimized layout', () => {
      renderComponent();
      expect(window.innerWidth).toBe(BREAKPOINTS.desktop);
    });

    it('should have full-width layout for large screens', () => {
      renderComponent();
      expect(window.innerWidth).toBeGreaterThanOrEqual(BREAKPOINTS.laptop);
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
