import { useEffect, useRef, useState } from 'react';
import MagneticSocialNav from './components/MagneticSocialNav';
import OceanShaderBackground from './components/OceanShaderBackground';
import useViewportFitScale from './hooks/useViewportFitScale';

function App() {
  const contentCardRef = useRef(null);
  const [fitToViewport, setFitToViewport] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
  const [focusIndex, setFocusIndex] = useState(0);
  const [isSteveHover, setIsSteveHover] = useState(false);
  const [hoverProfile, setHoverProfile] = useState('steve');
  const [isHoverCapable, setIsHoverCapable] = useState(true);
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
    { label: 'Twitter', href: 'https://x.com/thejustinguo' },
    { label: 'Email', href: 'mailto:thejustinguo@gmail.com' },
  ];
  const iconClassName = 'h-4 w-4 sm:h-5 sm:w-5';

  const renderLinkIcon = (label) => {
    switch (label) {
      case 'Second Brain':
        return (
          <svg className={iconClassName} fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24" aria-hidden="true">
            <rect x="6" y="3.75" width="13.5" height="16.5" rx="2.25" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 3.75v16.5M12 7.5h4.5M12 11.25h4.5M12 15h3.75M4.5 7.5h1.5M4.5 11.25h1.5M4.5 15h1.5" />
          </svg>
        );
      case 'Substack':
        return (
          <svg className={iconClassName} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24L12 18.11 22.54 24V10.812H1.46zM22.54 0H1.46v2.836h21.08V0z" />
          </svg>
        );
      case 'LinkedIn':
        return (
          <svg className={iconClassName} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z" />
          </svg>
        );
      case 'Twitter':
        return (
          <svg className={iconClassName} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
        );
      case 'Email':
        return (
          <svg className={iconClassName} fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 6.75A2.25 2.25 0 015.25 4.5h13.5A2.25 2.25 0 0121 6.75v10.5A2.25 2.25 0 0118.75 19.5H5.25A2.25 2.25 0 013 17.25V6.75z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.5 7.5L12 13.5l8.5-6" />
          </svg>
        );
      default:
        return null;
    }
  };

  const contentScale = useViewportFitScale(contentCardRef, fitToViewport);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 640px)');
    const updateFit = (event) => setFitToViewport(event.matches);
    setFitToViewport(mediaQuery.matches);
    mediaQuery.addEventListener('change', updateFit);
    return () => mediaQuery.removeEventListener('change', updateFit);
  }, []);

  useEffect(() => {
    isSteveHoverRef.current = isSteveHover;
  }, [isSteveHover]);

  useEffect(() => {
    closeOnNextMoveRef.current = closeOnNextMove;
  }, [closeOnNextMove]);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(hover: hover) and (pointer: fine)');
    const updateHoverCapability = (event) => {
      setIsHoverCapable(event.matches);
    };

    setIsHoverCapable(mediaQuery.matches);
    mediaQuery.addEventListener('change', updateHoverCapability);
    return () => mediaQuery.removeEventListener('change', updateHoverCapability);
  }, []);

  useEffect(() => {
    if (isHoverCapable) return undefined;

    setIsSteveHover(false);
    setCloseOnNextMove(false);
    if (steveHoverTimeoutRef.current) {
      window.clearTimeout(steveHoverTimeoutRef.current);
      steveHoverTimeoutRef.current = null;
    }
    return undefined;
  }, [isHoverCapable]);

  useEffect(() => {
    if (!isHoverCapable) return undefined;

    const handleMouseMove = (event) => {
      setCursorPos({ x: event.clientX, y: event.clientY });

      if (isSteveHoverRef.current && closeOnNextMoveRef.current) {
        setIsSteveHover(false);
        setCloseOnNextMove(false);
        isSteveHoverRef.current = false;
        closeOnNextMoveRef.current = false;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isHoverCapable]);

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
      const transitionFactor = isHoverCapable ? 0.9 : 1.4;
      const maxTransitionDistance = window.innerHeight * transitionFactor;
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
  }, [isHoverCapable]);

  const handleProfileHoverTrigger = (profile) => {
    if (!isHoverCapable) return;
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
      {isHoverCapable && (
        <>
          <div
            className="cursor-light"
            style={{ left: cursorPos.x, top: cursorPos.y }}
            aria-hidden="true"
          />
          <div className="cursor-dot" style={{ left: cursorPos.x, top: cursorPos.y }} />
        </>
      )}
      <div>
        <div className="relative z-10 px-4 py-5 pointer-events-none sm:fixed sm:inset-0 sm:flex sm:items-center sm:justify-center sm:py-5">
          <div
            ref={contentCardRef}
            className={`page-load-blur pointer-events-auto w-full max-w-[720px] sm:max-w-[94vw] h-auto px-5 sm:px-10 text-white transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${isSteveHover ? 'sm:w-[980px]' : 'sm:w-[700px]'}`}
            style={{
              fontFamily: "'Bookish', 'Helvetica Neue', Arial, sans-serif",
              transform: fitToViewport ? `scale(${contentScale})` : undefined,
              transformOrigin: 'center center',
            }}
          >
          <div className="flex h-full w-full items-stretch">
          <div className={`min-w-0 flex flex-col justify-center gap-1.5 sm:gap-2 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${isSteveHover ? 'w-[58%] pr-6' : 'w-full'}`}>
          <div
            className="-mb-0.5 flex items-center justify-between text-[16px] sm:text-[17px] text-white/85"
            style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 600 }}
          >
            <span>"LOCATION" SF</span>
            <span>"LOCAL TIME" {currentTime}</span>
          </div>
          <div className="w-full text-[clamp(24px,5.8vw,37px)] tracking-[-0.05em] text-white">
            <span style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 600 }}>justin guo </span> .  {' '}
            <span
              key={focusWords[focusIndex]}
              className="focus-word text-[clamp(16px,3.9vw,31px)] text-white tracking-[-0.01em]"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              {focusWords[focusIndex]}
            </span>
            
          </div>
          <blockquote className="bio-quote m-0 border-0 p-0">
            <p
              className="text-left text-[clamp(13px,1.9vw,15px)] leading-snug text-white/95 tracking-[-0.01em]"
              style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 600 }}
            >
              &quot;To believe our own thought [...], that is genius. Man should learn to detect and watch that gleam of light which flashes across his mind from within.&quot;
            </p>
            <footer
              className="mt-1.5 text-left text-[clamp(11px,2.8vw,14px)] italic text-white/60 tracking-[-0.01em]"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              <span className="sm:hidden">— Emerson</span>
              <span className="hidden sm:inline">— Emerson, Self-Reliance</span>
            </footer>
          </blockquote>
          <p className="leading-snug sm:leading-[1.4] text-left text-[clamp(11px,2.3vw,12.5px)] text-white/[0.92] tracking-[-0.015em]" style={{ fontFamily: "Helvetica, Arial, sans-serif" }}>
            <span
              className="block mb-0 text-[15px] sm:text-[16px] font-bold"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
WORK . 
            </span>
            <span className="block h-px w-full bg-white/80 mb-[var(--bio-paragraph-gap)]" />
             i work on growing whatnot to usher in the new age of commerce. pioneering live-shopping in the US, whatnot is one of the fastest-growing and most customer-centric marketplaces in startup history. some of the jewelry & watch sellers i work with make millions of $$$ per year. it is certainly a niche (yet interesting) job. 
             <span className="bio-p-gap" aria-hidden="true" />
             i've always enjoyed creation as an extension of myself. in the past couple of years, i co-founded an app with <span>6+ figure ARR that ranked in the top 150 on the app store</span>,
        wrote a couple of semi-viral essays (the most popular of which were a post-mortem on my social app and a critique on prestigious business schools)<span></span>, and posted some short-form videos that have <span>tens of millions of views</span>.
             <span className="bio-p-gap" aria-hidden="true" />
             i think the highest leverage skills in today's world are obvious. (1) intuition: knowing the right thing to build (2) execution: building it right (3) storytelling: creating the right narrative. 
             I consider myself a strong marketer, a good product person, a solid designer, and a shitty engineer. 
             i am continously hungry for opportunities to sharpen all of these skills, so please reach out if you ever want another mind on your work. 
             <span className="bio-p-gap" aria-hidden="true" />
             (my email is &quot;<a
               href="mailto:thejustinguo@gmail.com"
               className="underline transition-colors duration-150 text-inherit hover:text-[#b9e6d0]"
             >
               thejustinguo@gmail.com
             </a>&quot;; slightly pretentious, i know). 
             <span className="bio-p-gap" aria-hidden="true" />
             i am likely going to try and found a consumer company in the next couple of years. this is my career north star. i unfortunately  don't have the right idea yet. we'll see. 
             <span className="bio-p-gap" aria-hidden="true" />
             <span
               className="block mb-0 text-[15px] sm:text-[16px] font-bold"
               style={{ fontFamily: "'Instrument Serif', serif" }}
             >
               PERSONAL  .
             </span>
             <span className="block h-px w-full bg-white/80 mb-[var(--bio-paragraph-gap)]" />
              i care about consistently improving my character, health, and relationships. in my free time, i like to play soccer, run, read, and sometimes write. 
              personally, i look up to free-spirited people like <span onMouseEnter={() => handleProfileHoverTrigger('steve')} onMouseLeave={handleSteveHoverCancel}>steve jobs</span>, <span onMouseEnter={() => handleProfileHoverTrigger('virgil')} onMouseLeave={handleSteveHoverCancel}>virgil abloh</span>, and <span onMouseEnter={() => handleProfileHoverTrigger('ronaldinho')} onMouseLeave={handleSteveHoverCancel}>ronaldinho</span>. i am not related to sarah guo, lucy guo, demi guo, or robin guo. 
             <span className="bio-p-gap" aria-hidden="true" />
        i graduated from the university of michigan. i was also born & raised in michigan. <span>i now live in san francisco, where i'm  meeting some of the most ambitious and simultaneously undersocialized people in the world</span>.
             <span className="bio-p-gap" aria-hidden="true" />
            i do enjoying meeting others and am generally easygoing. in-person is preferred if you're in sf. i'm going to take a risk and allow you to text 248-308-8106 if anything here piques your interest, but if i do not respond, then it probably means your cold outreach was bad. best of luck, stranger. 
          </p>
          <div className="w-full h-px bg-white/25" />
          <div className="mt-2 flex flex-wrap items-center justify-between gap-3 sm:gap-4">
            <MagneticSocialNav
              links={links}
              cursorPos={cursorPos}
              isHoverCapable={isHoverCapable}
              renderLinkIcon={renderLinkIcon}
            />
            <span className="text-white/55 text-[11px] sm:text-[12px]" style={{ fontFamily: "Helvetica, Arial, sans-serif" }}>
              (Last updated, Aug 08, 2026)
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
        <div className="hidden h-[190vh] sm:block" aria-hidden="true" />
      </div>
    </>
  );
}

export default App;

