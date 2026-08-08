import { useEffect, useState } from 'react';

const MIN_SCALE = 0.7;
const VERTICAL_PADDING = 56;

/**
 * Scales content down on desktop when it exceeds the viewport height (keeps ocean scroll spacer intact).
 */
export default function useViewportFitScale(contentRef, enabled) {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    if (!enabled) {
      setScale(1);
      return undefined;
    }

    const update = () => {
      const el = contentRef.current;
      if (!el) return;

      const available = window.innerHeight - VERTICAL_PADDING;
      const contentHeight = el.scrollHeight;

      if (contentHeight <= available) {
        setScale(1);
        return;
      }

      setScale(Math.max(MIN_SCALE, available / contentHeight));
    };

    const scheduleUpdate = () => {
      window.requestAnimationFrame(update);
    };

    scheduleUpdate();

    const resizeObserver = new ResizeObserver(scheduleUpdate);
    if (contentRef.current) {
      resizeObserver.observe(contentRef.current);
    }

    window.addEventListener('resize', scheduleUpdate);
    document.fonts?.ready.then(scheduleUpdate);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', scheduleUpdate);
    };
  }, [contentRef, enabled]);

  return scale;
}
