import { useEffect, useRef } from 'react';

/**
 * useScrollReveal – attaches an IntersectionObserver to add
 * a "visible" class when the element enters the viewport.
 *
 * Usage:
 *   const ref = useScrollReveal();
 *   <div ref={ref} className="reveal"> ... </div>
 *
 * The CSS classes "reveal" and "reveal.visible" must be defined
 * in index.css (or the component's CSS) for the animation to work.
 */
const useScrollReveal = (options = {}) => {
  const ref = useRef(null);
  const { threshold = 0.15, root, rootMargin } = options;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('visible');
          observer.unobserve(el); // only trigger once
        }
      },
      { threshold, root, rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [root, rootMargin, threshold]);

  return ref;
};

export default useScrollReveal;
