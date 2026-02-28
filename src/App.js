import { useEffect, useMemo, useRef, useState } from 'react';
import OceanShaderBackground from './components/OceanShaderBackground';

function App() {
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
  const [cursorTrail, setCursorTrail] = useState([]);
  const [focusIndex, setFocusIndex] = useState(0);
  const [isSteveHover, setIsSteveHover] = useState(false);
  const [hoverProfile, setHoverProfile] = useState('steve');
  const [closeOnNextMove, setCloseOnNextMove] = useState(false);
  const isSteveHoverRef = useRef(false);
  const closeOnNextMoveRef = useRef(false);
  const steveHoverTimeoutRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(() =>
    new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', second: '2-digit' })
  );
  const focusWords = ['focus', 'curiosity', 'wisdom', 'creativity', 'virtue', 'originality', 'play'];
  const links = [
    { label: 'Second Brain', href: 'https://docs.google.com/document/d/1XQnzkvK-oNL-zi9_mMNQMw4kfCiQAgowdDgp_PBVMOQ/edit?tab=t.0' },
    { label: 'Substack', href: 'https://justinguo.substack.com/' },
    { label: 'LinkedIn', href: 'https://linkedin.com/in/justinbguo' },
    { label: 'Twitter', href: 'https://x.com/guo_dini' },
    { label: 'Email', href: 'mailto:thejustinguo@gmail.com' },
  ];

  const renderLinkIcon = (label) => {
    switch (label) {
      case 'Second Brain':
        return (
          <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24" aria-hidden="true">
            <rect x="6" y="3.75" width="13.5" height="16.5" rx="2.25" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 3.75v16.5M12 7.5h4.5M12 11.25h4.5M12 15h3.75M4.5 7.5h1.5M4.5 11.25h1.5M4.5 15h1.5" />
          </svg>
        );
      case 'Substack':
        return (
          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24L12 18.11 22.54 24V10.812H1.46zM22.54 0H1.46v2.836h21.08V0z" />
          </svg>
        );
      case 'LinkedIn':
        return (
          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z" />
          </svg>
        );
      case 'Twitter':
        return (
          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
        );
      case 'Email':
        return (
          <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 6.75A2.25 2.25 0 015.25 4.5h13.5A2.25 2.25 0 0121 6.75v10.5A2.25 2.25 0 0118.75 19.5H5.25A2.25 2.25 0 013 17.25V6.75z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.5 7.5L12 13.5l8.5-6" />
          </svg>
        );
      default:
        return null;
    }
  };

  useEffect(() => {
    isSteveHoverRef.current = isSteveHover;
  }, [isSteveHover]);

  useEffect(() => {
    closeOnNextMoveRef.current = closeOnNextMove;
  }, [closeOnNextMove]);

  useEffect(() => {
    const handleMouseMove = (event) => {
      setCursorPos({ x: event.clientX, y: event.clientY });
      setCursorTrail((prev) => [{ x: event.clientX, y: event.clientY }, ...prev].slice(0, 14));

      if (isSteveHoverRef.current && closeOnNextMoveRef.current) {
        setIsSteveHover(false);
        setCloseOnNextMove(false);
        isSteveHoverRef.current = false;
        closeOnNextMoveRef.current = false;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setFocusIndex((prev) => (prev + 1) % focusWords.length);
    }, 2500);

    return () => window.clearInterval(interval);
  }, [focusWords.length]);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', second: '2-digit' }));
    }, 1000);

    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    const updateProgress = () => {
      const maxTransitionDistance = window.innerHeight * 0.9;
      const progress = Math.min(window.scrollY / maxTransitionDistance, 1);
      setScrollProgress(progress);
    };

    updateProgress();
    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress);
    return () => {
      window.removeEventListener('scroll', updateProgress);
      window.removeEventListener('resize', updateProgress);
    };
  }, []);

  const trailPath = useMemo(() => {
    if (cursorTrail.length < 2) return '';

    const [first, ...rest] = cursorTrail;
    let path = `M ${first.x} ${first.y}`;

    for (let i = 1; i < cursorTrail.length; i++) {
      const prev = cursorTrail[i - 1];
      const curr = cursorTrail[i];
      const midX = (prev.x + curr.x) / 2;
      const midY = (prev.y + curr.y) / 2;
      path += ` S ${prev.x} ${prev.y}, ${midX} ${midY}`;
    }

    const last = rest[rest.length - 1];
    path += ` L ${last.x} ${last.y}`;
    return path;
  }, [cursorTrail]);

  const handleProfileHoverTrigger = (profile) => {
    if (isSteveHoverRef.current || steveHoverTimeoutRef.current) return;
    steveHoverTimeoutRef.current = window.setTimeout(() => {
      steveHoverTimeoutRef.current = null;
      setHoverProfile(profile);
      setIsSteveHover(true);
      setCloseOnNextMove(false);
      isSteveHoverRef.current = true;
      closeOnNextMoveRef.current = false;

      window.setTimeout(() => {
        setCloseOnNextMove(true);
        closeOnNextMoveRef.current = true;
      }, 120);
    }, 1000);
  };

  const handleSteveHoverCancel = () => {
    if (!steveHoverTimeoutRef.current) return;
    window.clearTimeout(steveHoverTimeoutRef.current);
    steveHoverTimeoutRef.current = null;
  };

  useEffect(() => {
    return () => {
      if (steveHoverTimeoutRef.current) {
        window.clearTimeout(steveHoverTimeoutRef.current);
      }
    };
  }, []);

  return (
    <>
      <div className="fixed inset-0 pointer-events-none z-0 bg-forest-gradient" />
      <div className="fixed inset-0 pointer-events-none z-[1]" style={{ opacity: scrollProgress }}>
        <OceanShaderBackground />
      </div>
      <div
        className="cursor-light"
        style={{ left: cursorPos.x, top: cursorPos.y }}
        aria-hidden="true"
      />
      <div className="cursor-dot" style={{ left: cursorPos.x, top: cursorPos.y }} />
      <div>
        <div className="fixed inset-0 z-10 flex items-center justify-center py-8 sm:py-0 pointer-events-none">
          <div
            className={`page-load-blur pointer-events-auto max-w-[92vw] h-auto sm:h-[60vh] px-5 sm:px-12 text-white transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${isSteveHover ? 'w-[980px]' : 'w-[640px]'}`}
            style={{ fontFamily: "'Bookish', 'Helvetica Neue', Arial, sans-serif" }}
          >
          <div className="flex h-full w-full items-stretch">
          <div className={`min-w-0 flex flex-col justify-center gap-2 sm:gap-3 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${isSteveHover ? 'w-[58%] pr-6' : 'w-full'}`}>
          <div
            className="-mb-1 flex items-center justify-between text-[18px] sm:text-[20px] text-white/85"
            style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 600 }}
          >
            <span>"LOCATION" SF</span>
            <span>"TIME" {currentTime}</span>
          </div>
          <div className="w-full text-[34px] sm:text-[45px] tracking-[-0.05em] font-sans font-semibold ">
            <span>justin guo </span> .  {' '}
            <span
              key={focusWords[focusIndex]}
              className="focus-word text-[22px] sm:text-[38px] text-white tracking-[-0.01em]"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              {focusWords[focusIndex]}
            </span>
            
          </div>
          <p className="leading-snug text-left text-[14px] sm:text-[15px] text-white tracking-[-0.015em]" style={{ fontFamily: "Helvetica, Arial, sans-serif" }}>
          <span style={{ fontFamily: "'Instrument Serif', serif", fontSize: 'clamp(15px, 2.2vw, 17px)', fontWeight: 600 }}>
               &quot;To believe our own thought [...], that is genius.
               Man should learn to detect and watch that gleam of light which flashes across his mind from within.&quot;
               <br />

             </span>        
            <br />
            <span
              className="block mb-0 text-[18px] sm:text-[20px] font-bold"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
WORK . 
            </span>
            <span className="block h-px w-full bg-white/80 mb-1" />
             i work on growing whatnot (one of the fastest-growing marketplaces in history)
             pioneering the future of live-shopping in the United States. my jewelry & watch sellers make <span>millions of $$$ / year</span> through livestreaming. it's insane.
             <br /><br />
in the past few years, i shipped a consumer  app with <span>5+ figure ARR (top 150 on the app store)</span>,
wrote essays that hundreds of thousands of people have read<span></span>, and created videos that have <span>tens of millions of views</span> across multiple platforms.
             <br /><br />
             i spike in <span>executing and expressing ideas</span> in precise ways, whether that be through software, writing, or video.
             <br /><br />
             <span
               className="block mb-0 text-[18px] sm:text-[20px] font-bold"
               style={{ fontFamily: "'Instrument Serif', serif" }}
             >
               PERSONAL  .
             </span>
             <span className="block h-px w-full bg-white/80 mb-1" />
             personally, i play soccer, run, and read. i like to watch one random lecture a week to see what it can teach me. i look up to free-spirited people like <span onMouseEnter={() => handleProfileHoverTrigger('steve')} onMouseLeave={handleSteveHoverCancel}>steve jobs</span>, <span onMouseEnter={() => handleProfileHoverTrigger('virgil')} onMouseLeave={handleSteveHoverCancel}>virgil abloh</span>, and <span onMouseEnter={() => handleProfileHoverTrigger('ronaldinho')} onMouseLeave={handleSteveHoverCancel}>ronaldinho</span>. my other interests include spirituality, philosophy, and health.
             <br /><br />
i graduated from the university of michigan. i was also born & raised in michigan. <span>i now live in san francisco, where i'm accentuating my fascination with consumer-focused technology</span>.
            <br /><br />
            i enjoy meeting & being helpful to people. reach out & say what's up! 
          </p>
          <div className="w-full h-px bg-white/25" />
          <div className="mt-2 flex flex-wrap items-center justify-between gap-4">
            <nav className="flex flex-row flex-wrap items-center gap-5 sm:gap-8">
              {links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith('mailto:') ? undefined : '_blank'}
                  rel={link.href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                  className="inline-flex items-center justify-center text-white"
                  style={{ fontFamily: "Helvetica, Arial, sans-serif" }}
                  aria-label={link.label}
                  title={link.label}
                >
                  {renderLinkIcon(link.label)}
                </a>
              ))}
            </nav>
            <span className="text-white/80 text-[12px] sm:text-[13px]" style={{ fontFamily: "Helvetica, Arial, sans-serif" }}>
              (Last updated, Feb 28, 2026)
            </span>
          </div>
          </div>
          <div
            className={`hidden sm:block overflow-hidden rounded-xl transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${isSteveHover ? 'w-[42%] opacity-100' : 'w-0 opacity-0'}`}
          >
            <img
              src={
                hoverProfile === 'virgil'
                  ? '/virgil-abloh.png'
                  : hoverProfile === 'ronaldinho'
                    ? '/ronaldinho.png'
                    : '/steve-jobs-time-cover.png'
              }
              alt={
                hoverProfile === 'virgil'
                  ? 'Virgil Abloh'
                  : hoverProfile === 'ronaldinho'
                    ? 'Ronaldinho'
                    : 'Steve Jobs TIME cover'
              }
              className="h-full w-full object-contain bg-black/20 grayscale"
            />
          </div>
          </div>
          </div>
        </div>
        <div className="h-[190vh]" aria-hidden="true" />
      </div>
    </>
  );
}

export default App;

