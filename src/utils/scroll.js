/**
 * Smoothly scrolls to a specific element with offset consideration
 * @param {string} elementId - The ID of the element to scroll to
 * @param {number} offset - Offset from the top in pixels (default: 0)
 * @param {string} behavior - Scroll behavior (default: 'smooth')
 */
export const scrollToElement = (elementId, offset = 0, behavior = 'smooth') => {
  const element = document.getElementById(elementId);
  if (!element) return;

  const elementPosition = element.getBoundingClientRect().top;
  const offsetPosition = elementPosition + window.pageYOffset - offset;

  window.scrollTo({
    top: offsetPosition,
    behavior
  });
};

/**
 * Smoothly scrolls to the top of the page
 * @param {string} behavior - Scroll behavior (default: 'smooth')
 */
export const scrollToTop = (behavior = 'smooth') => {
  window.scrollTo({
    top: 0,
    behavior
  });
};

/**
 * Smoothly scrolls to a specific section using data attributes
 * @param {string} sectionId - The section identifier
 * @param {number} offset - Offset from the top in pixels (default: 0)
 * @param {string} behavior - Scroll behavior (default: 'smooth')
 */
export const scrollToSection = (sectionId, offset = 0, behavior = 'smooth') => {
  const section = document.querySelector(`[data-section="${sectionId}"]`);
  if (!section) return;

  const elementPosition = section.getBoundingClientRect().top;
  const offsetPosition = elementPosition + window.pageYOffset - offset;

  window.scrollTo({
    top: offsetPosition,
    behavior
  });
};

/**
 * Creates an IntersectionObserver to handle scroll-based animations
 * @param {Function} callback - Callback function to execute when intersection occurs
 * @param {Object} options - IntersectionObserver options
 * @returns {IntersectionObserver}
 */
export const createScrollObserver = (callback, options = {}) => {
  return new IntersectionObserver(callback, {
    threshold: 0.1,
    rootMargin: '0px',
    ...options
  });
}; 