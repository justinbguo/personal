import { useState, useEffect } from 'react';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import AnimatedText from './components/underline';

function MoneyRain() {
  useEffect(() => {
    const container = document.createElement('div');
    container.style.position = 'fixed';
    container.style.top = '0';
    container.style.left = '0';
    container.style.width = '100%';
    container.style.height = '100%';
    container.style.pointerEvents = 'none';
    container.style.zIndex = '50';
    document.body.appendChild(container);

    const createMoney = () => {
      const money = document.createElement('div');
      money.innerHTML = '💸';
      money.className = 'money-particle text-2xl absolute';
      money.style.left = Math.random() * 100 + 'vw';
      money.style.animationDuration = Math.random() * 2 + 3 + 's';
      container.appendChild(money);

      setTimeout(() => {
        if (container.contains(money)) {
          money.style.transition = 'opacity 2s ease-out';
          money.style.opacity = '0';
          setTimeout(() => {
            if (container.contains(money)) {
              container.removeChild(money);
            }
          }, 2000);
        }
      }, 5000);
    };

    const interval = setInterval(createMoney, 100);
    setTimeout(() => clearInterval(interval), 3000);

    return () => {
      clearInterval(interval);
      container.style.transition = 'opacity 2s ease-out';
      container.style.opacity = '0';
      setTimeout(() => {
        if (document.body.contains(container)) {
          document.body.removeChild(container);
        }
      }, 2000);
    };
  }, []);

  return null;
}

function Tooltip({ text, children }) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <span className="relative inline-block">
      <span
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        className="cursor-help underline decoration-dotted decoration-emerald-500 underline-offset-4 hover:text-emerald-400 transition-colors"
      >
        {children}
      </span>
      {isVisible && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-max max-w-xs">
          <div className="bg-[#1a1a1a] border border-emerald-500/20 px-4 py-2 rounded-lg shadow-xl">
            <div className="text-sm font-satoshi text-white/90">{text}</div>
          </div>
        </div>
      )}
    </span>
  );
}

function SpotifyPopup({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-[#1a1a1a] p-6 rounded-lg shadow-xl max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-white font-instrument text-xl">Habe - Sweet</h3>
          <button 
            onClick={onClose}
            className="text-white/70 hover:text-white transition-colors"
          >
            ✕
          </button>
        </div>
        <iframe
          src="https://open.spotify.com/track/4sxWyjuwVqscK0YmfWrBvE?si=ee8707e3bff34072"
          width="100%"
          height="352"
          frameBorder="0"
          allowFullScreen=""
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
        ></iframe>
      </div>
    </div>
  );
}

function App() {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [showMoneyRain, setShowMoneyRain] = useState(false);
  const [isSpotifyOpen, setIsSpotifyOpen] = useState(false);
  const phrases = ["think different", "expand luck", "ask why", "find humor", "create $hareholder value", "just kidding lol"];

  const experienceText = {
    default: "i built YC's classic tarpit social app, managed my favorite music artist, and completed internships at large companies and seed-stage startups",
    alternate: <>
      i built <a href="https://apps.apple.com/us/app/push-for-quicker-hangouts/id6502925758" target="_blank" rel="noopener noreferrer" className="underline-offset-4 font-instrument italic font-semibold hover:text-emerald-400 text-emerald-500 transition-colors">Push (an IRL hangout app)</a>, managed{' '}
      <button
        onClick={(e) => {
          e.preventDefault();
          setIsSpotifyOpen(true);
        }}
        className="underline-offset-4 font-instrument italic font-semibold hover:text-yellow-300 text-yellow-400 transition-colors"
      >
        Habe
      </button>, ran <a href="https://www.youtube.com/@microwavemane/videos" target="_blank" rel="noopener noreferrer" className="underline-offset-4 font-bold hover:text-red-400 text-red-500 transition-colors font-instrument italic">Microwave Mane</a>, and interned at{' '}
      <a href="https://www.mastercard.us/en-us/business/issuers/business-payments.html" target="_blank" rel="noopener noreferrer" className="underline-offset-4 font-bold hover:text-orange-400 text-orange-500 transition-colors font-instrument italic">Mastercard (PM @ Commercial Solutions)</a>,{' '}
      <a href="https://www.unileverfoodsolutions.us/" target="_blank" rel="noopener noreferrer" className="underline-offset-4 font-bold hover:text-blue-400 text-blue-500 transition-colors font-instrument italic">Unilever (Operations @ B2B Food Solutions)</a>, {' '}
      <a href="https://www.linkedin.com/company/snackbreak-inc/posts/?feedView=all" target="_blank" rel="noopener noreferrer" className="underline-offset-4 font-bold hover:text-pink-400 text-pink-300 transition-colors font-instrument italic">Snack Break (PM @ Peek)</a>.
    </>
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (phraseIndex + 1) % phrases.length;
      
      if (phrases[nextIndex] === "create $hareholder value") {
        setShowMoneyRain(true);
        setTimeout(() => {
          setPhraseIndex(nextIndex);
        }, 500);
      } else {
        setPhraseIndex(nextIndex);
        setShowMoneyRain(false);
      }
    }, phrases[phraseIndex] === "create $hareholder value" ? 3000 : 1000);

    return () => clearInterval(interval);
  }, [phraseIndex, phrases]);

  const handleMouseEnter = () => setIsFlipped(true);
  const handleMouseLeave = () => setIsFlipped(false);

  return (
    <div className="min-h-screen bg-forest-gradient flex items-center overflow-hidden">
      {showMoneyRain && <MoneyRain />}
      <SpotifyPopup 
        isOpen={isSpotifyOpen} 
        onClose={() => setIsSpotifyOpen(false)} 
      />
      <main className="w-full max-w-2xl mx-auto px-6">
        {/* Header Section */}
        <div className="mb-16">
          <div className="flex items-center space-x-2 mb-3">
            <h1 className="text-4xl text-white font-instrument tracking-tight underline decoration-emerald-500 underline-offset-4" style={{ textDecorationThickness: '3px' }}>
              justin guo
            </h1>
            <span className="text-white text-2xl">•</span>
            <span className="text-4xl font-instrument p-2 bg-gradient-to-r from-emerald-300 via-emerald-500 via-green-600 to-teal-300 text-transparent bg-clip-text transition-transform duration-500 ease-in-out transform hover:scale-110">
              {phrases[phraseIndex]}
            </span>
          </div>

          {/* Bio Section */}
          <div className="text-white leading-relaxed font-satoshi space-y-3 max-w-xl mb-2 ">
            <p className="text-md font-bold">
              i want to create magical experiences that make people smile. 
            </p>
            <p className="text-md font-thin">
              however, i'm not a magician nor a dentist. 
            </p>
            <p className="text-xl font-instrument italic underline underline-offset-4">
            I ship products that solve problems. 
            </p>
            <p className="text-md font-thin">
              I'm currently a senior at the <a href="https://umich.edu" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-[#FFCB05] underline font-instrument font-semibold">University of Michigan</a>, 
              where I'm exploring my interests in product management, startups, and finance.
            </p>
            <div 
              className="flex items-center group relative"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <p className="text-md font-thin">
                <SwitchTransition mode="out-in">
                  <CSSTransition
                    key={isFlipped}
                    timeout={300}
                    classNames="fade"
                    unmountOnExit
                  >
                    <span>
                      {isFlipped ? (
                        <span className="underline-offset-4">
                          {experienceText.alternate}
                          <span className="text-emerald-500 hover:text-emerald-400 bg-white/5 hover:bg-white/10 transition-all duration-300 text-md font-satoshi ml-2 inline-flex items-center justify-center h-7 w-7 spin-button rounded-full">
                            ↻
                          </span>
                        </span>
                      ) : (
                        <>
                          i built <span className="font-instrument italic font-semibold">YC's classic tarpit social app</span>,{' '}
                          managed my favorite <span className="font-instrument italic font-semibold">indie music artist</span>, 
                          ran a <span className="font-instrument italic font-semibold">TikTok compilation YouTube channel</span>,
                          
                          and completed{' '}
                          <span className="font-instrument italic font-bold">3 internships</span> at Fortune 200 companies and seed-stage startups.
                          <span className="text-emerald-500 hover:text-emerald-400 bg-white/5 hover:bg-white/10 transition-all duration-300 text-md font-satoshi ml-2 inline-flex items-center justify-center h-7 w-7 spin-button rounded-full">
                            ↻
                          </span>
                        </>
                      )}
                    </span>
                  </CSSTransition>
                </SwitchTransition>
              </p>
            </div>
            <p className="text-md font-thin  underline-offset-4">
              these experiences have built a <span className="font-semibold italic">versatile skillset</span> in product, design, engineering, and distribution while building a <span className="">sharp, entrepreneurial character</span>. 
            </p>
            <p className="text-md font-thin">
              personally, i'm a{' '}
              <Tooltip text="CAM/RW/LW, Arsenal Fan, Life peaked when a goal I scored in HS was posted to a page with 1.7M+ followers.">
                soccer player
              </Tooltip>
              ,{' '}
              <Tooltip text="Currently enjoying This Past Weekend (Theo Von), Modern Wisdom, HIBT, Lenny's Podcast, Andrew Huberman, a16z, and more.">
                podcast listener
              </Tooltip>
              ,{' '}
              <Tooltip text="Favorite books:
• Steve Jobs
• The Cold Start Problem
• Hatching Twitter
• The Autobiography of Gucci Mane
• Elon Musk 
• Moonwalking with Einstein
• Leading
• The Case Against Reality
• Hidden Genius
• Atomic Habits
• Can't Hurt Me"

>
                reader
              </Tooltip>
              , and{' '}
              <Tooltip text="This is just a fancy way of saying I try to trade public equities based off of information that institutions typically would not consider (ex: TikTok trends).
              Won a trading contest out of 220 participants in my finance class with a 55% 1 month return.">
                social arbitrage investor
              </Tooltip>
              .
            </p>
            <p className="text-md font-thin">
              i love meeting new people and finding new opportunities- <span className="font-bold underline decoration-emerald-500 underline-offset-4">jbguo@umich.edu</span>. 
            </p>
          </div>

          {/* Divider */}
          <div className="w-full h-px bg-white/20 my-4"></div>

          {/* Footer */}
          <footer className="w-full ">
            <div className="flex space-x-12">
              <a 
                href="https://docs.google.com/document/d/1XQnzkvK-oNL-zi9_mMNQMw4kfCiQAgowdDgp_PBVMOQ/edit?usp=sharing" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white/70 hover:text-white transition-all duration-300 flex items-center space-x-2"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 1c-4.4 0-8 3.6-8 8 0 2.6 1.2 4.9 3.1 6.3-.4 1.3-1 2.5-2 3.5-.2.2-.2.5-.1.7.1.2.3.3.5.3 2.2-.1 4-1 5.3-2.2.4.1.8.1 1.2.1 4.4 0 8-3.6 8-8s-3.6-8-8-8zm0 14.5c-.5 0-1-.1-1.5-.2-.2-.1-.4 0-.6.1-1 .9-2.2 1.5-3.5 1.8.7-1 1.2-2.1 1.5-3.3.1-.3 0-.6-.3-.8C6.1 12.3 5 10.7 5 9c0-3.9 3.1-7 7-7s7 3.1 7 7-3.1 7-7 7z"/>
                  <path d="M14.5 6.5c-.8 0-1.5.7-1.5 1.5s.7 1.5 1.5 1.5S16 8.8 16 8s-.7-1.5-1.5-1.5zm-5 0C8.7 6.5 8 7.2 8 8s.7 1.5 1.5 1.5S11 8.8 11 8s-.7-1.5-1.5-1.5zm5.5 4h-5c-.3 0-.5.2-.5.5s.2.5.5.5h5c.3 0 .5-.2.5-.5s-.2-.5-.5-.5z"/>
                </svg>
                <span className="font-satoshi">Interests</span>
              </a>
              <a 
                href="https://linkedin.com/in/justinbguo" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white/70 hover:text-white transition-all duration-300 flex items-center space-x-2"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z"></path>
                </svg>
                <span className="font-satoshi">LinkedIn</span>
              </a>
              <a 
                href="https://x.com/guo_dini" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white/70 hover:text-white transition-all duration-300 flex items-center space-x-2"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
                </svg>
                <span className="font-satoshi">Twitter</span>
              </a>
              <a 
                href="https://justinguo.substack.com/"
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white/70 hover:text-white transition-all duration-300 flex items-center space-x-2"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24L12 18.11 22.54 24V10.812H1.46zM22.54 0H1.46v2.836h21.08V0z"/>
                </svg>
                <span className="font-satoshi">Writing</span>
              </a>
              <a 
                href="https://docs.google.com/document/d/10l9hb2p25nOWMVBlgW55dBj3zzCRoMMdvr5U5-LTa5o/edit?tab=t.0"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/70 hover:text-white transition-all duration-300 flex items-center space-x-2"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.25 2.5h-9a1.5 1.5 0 00-1.5 1.5v16a1.5 1.5 0 001.5 1.5h13.5a1.5 1.5 0 001.5-1.5V7.25L14.25 2.5zm0 1.5L18.75 8h-4.5V4zm-9 15.5V4h7.5v4.5a1.5 1.5 0 001.5 1.5h4.5v10h-13.5zm3-8.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zm0 3a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zm0 3a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75z"/>
                </svg>
                <span className="font-satoshi">Resume</span>
              </a>
            </div>
          </footer>
        </div>
      </main>
    </div>
  );
}

export default App;
