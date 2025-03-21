import "@testing-library/jest-dom"; // Ensures Jest has extended matchers
// import "jest-canvas-mock"; // Mocks canvas API

// Mock ResizeObserver (required for Radix components)
global.ResizeObserver = class {
  observe() {}
  unobserve() {}
  disconnect() {}
};


global.HTMLElement.prototype.setPointerCapture = jest.fn();
global.HTMLElement.prototype.hasPointerCapture = jest.fn();
