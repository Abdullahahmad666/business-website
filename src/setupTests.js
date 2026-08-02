// Extra DOM matchers: toBeInTheDocument, toHaveTextContent, ...
import '@testing-library/jest-dom';

/**
 * jsdom implements neither of these, and both are used on every page:
 * IntersectionObserver drives the scroll reveals, and matchMedia backs
 * Motion's reduced-motion check. Stub them so components render.
 */
if (!globalThis.IntersectionObserver) {
  globalThis.IntersectionObserver = class {
    constructor(callback) {
      this.callback = callback;
    }
    // Report the element as visible immediately, so revealed content is
    // present in the tree rather than stuck at its initial hidden state.
    observe(target) {
      this.callback([{ target, isIntersecting: true, intersectionRatio: 1 }], this);
    }
    unobserve() {}
    disconnect() {}
    takeRecords() {
      return [];
    }
  };
}

if (!globalThis.matchMedia) {
  globalThis.matchMedia = (query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener() {},
    removeListener() {},
    addEventListener() {},
    removeEventListener() {},
    dispatchEvent: () => false,
  });
}

// jsdom has no layout engine, so scrolling is a no-op rather than an error.
if (!window.scrollTo) {
  window.scrollTo = () => {};
}
