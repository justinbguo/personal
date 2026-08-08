import { useEffect, useRef, useState } from 'react';

const MAGNET_RADIUS = 88;
const MAGNET_PULL = 0.42;

function easeMagnet(t) {
  return t * t;
}

export default function MagneticSocialNav({ links, cursorPos, isHoverCapable, renderLinkIcon }) {
  const linkRefs = useRef([]);
  const [offsets, setOffsets] = useState(() => links.map(() => ({ x: 0, y: 0 })));

  useEffect(() => {
    linkRefs.current = linkRefs.current.slice(0, links.length);
  }, [links.length]);

  useEffect(() => {
    if (!isHoverCapable) {
      setOffsets(links.map(() => ({ x: 0, y: 0 })));
      return;
    }

    const next = links.map((_, index) => {
      const el = linkRefs.current[index];
      if (!el) return { x: 0, y: 0 };

      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const dx = cursorPos.x - centerX;
      const dy = cursorPos.y - centerY;
      const distance = Math.hypot(dx, dy);

      if (distance > MAGNET_RADIUS || distance < 0.5) {
        return { x: 0, y: 0 };
      }

      const strength = easeMagnet(1 - distance / MAGNET_RADIUS);
      return {
        x: dx * strength * MAGNET_PULL,
        y: dy * strength * MAGNET_PULL,
      };
    });

    setOffsets(next);
  }, [cursorPos, isHoverCapable, links]);

  return (
    <nav className="flex flex-row flex-wrap items-center gap-4 sm:gap-8">
      {links.map((link, index) => {
        const { x, y } = offsets[index] ?? { x: 0, y: 0 };
        return (
          <a
            key={link.label}
            ref={(node) => {
              linkRefs.current[index] = node;
            }}
            href={link.href}
            target={link.href.startsWith('mailto:') ? undefined : '_blank'}
            rel={link.href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
            className="social-link inline-flex items-center justify-center text-white/[0.92]"
            style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}
            aria-label={link.label}
            title={link.label}
          >
            <span
              className="social-magnet-inner inline-flex items-center justify-center will-change-transform"
              style={{
                '--mx': `${x}px`,
                '--my': `${y}px`,
              }}
            >
              {renderLinkIcon(link.label)}
            </span>
          </a>
        );
      })}
    </nav>
  );
}
