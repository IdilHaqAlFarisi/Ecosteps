import { vi } from 'vitest';

export const BREAKPOINTS = {
  mobile: 375,
  tablet: 768,
  laptop: 1024,
  desktop: 1440,
} as const;

export type BreakpointName = keyof typeof BREAKPOINTS;

/**
 * Set window dimensions for testing responsivity
 */
export function setWindowSize(width: number, height: number = 800) {
  Object.defineProperty(window, 'innerWidth', {
    writable: true,
    configurable: true,
    value: width,
  });
  Object.defineProperty(window, 'innerHeight', {
    writable: true,
    configurable: true,
    value: height,
  });
  
  // Trigger resize event
  window.dispatchEvent(new Event('resize'));
}

/**
 * Set window to a specific breakpoint
 */
export function setBreakpoint(breakpoint: BreakpointName) {
  setWindowSize(BREAKPOINTS[breakpoint]);
}

/**
 * Mock matchMedia for a specific query
 */
export function mockMatchMedia(matches: boolean) {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation(query => ({
      matches,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });
}

/**
 * Test if an element is visible
 */
export function isElementVisible(element: HTMLElement | null): boolean {
  if (!element) return false;
  
  const style = window.getComputedStyle(element);
  return style.display !== 'none' && 
         style.visibility !== 'hidden' && 
         style.opacity !== '0';
}

/**
 * Wait for next tick
 */
export function waitForNextTick() {
  return new Promise(resolve => setTimeout(resolve, 0));
}
