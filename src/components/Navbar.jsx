import { useEffect, useRef, useState, useCallback } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { FiArrowUpRight } from "react-icons/fi";

/* ═══════════════════════════════════════════════════════════════
   BLUE THEME  (single hue: #3B82F6)
   A = main blue, B = a lighter tint of the same blue (so gradients
   and shimmer stay visible). t1/t3 = A, t2/t4 = B.
   For a perfectly flat blue, set B to the same value as A.
   ═══════════════════════════════════════════════════════════════ */
const A = "#3B82F6"; // blue         (59,130,246)
const B = "#60A5FA"; // light blue   (96,165,250)

const C = {
  bg: "#05060E",
  bgScrolled: "rgba(5, 6, 14, 0.82)",
  surface: "#0A0C1A",
  border: "#181C38",
  borderSoft: "rgba(59,130,246,0.10)",
  text: "#F0EEFF",
  textSec: "#B4B7D6",
  muted: "#6B7199",

  t1: A,
  t2: B,
  t3: A,
  t4: B,
  t1Soft: "rgba(59,130,246,0.1)",
};

const AURORA = `linear-gradient(90deg,${C.t1},${C.t2},${C.t3},${C.t4},${C.t1})`;

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Services", href: "#services" },
  { name: "Projects", href: "#projects" },
  { name: "Experience", href: "#experience" },
  { name: "Certificates", href: "#certificates" },
  { name: "Contact", href: "#contact" },
];

/* ═══════════════════════════════════════════════════════════════
   MAIN NAVBAR
   ═══════════════════════════════════════════════════════════════ */
function Navbar() {
  const [activeLink, setActiveLink] = useState("#home");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [indicator, setIndicator] = useState({ left: 0, width: 0, opacity: 0 });
  const [scrollProgress, setScrollProgress] = useState(0);
  const linkRefs = useRef({});
  const navRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const h = document.documentElement;
      setIsScrolled(h.scrollTop > 30);
      setScrollProgress(Math.min((h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100, 100));
      for (const link of navLinks) {
        const section = document.querySelector(link.href);
        if (!section) continue;
        const top = section.offsetTop - 140;
        const bottom = top + section.offsetHeight;
        if (h.scrollTop >= top && h.scrollTop < bottom) {
          setActiveLink(link.href);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const el = linkRefs.current[activeLink];
    const nav = navRef.current;
    if (el && nav) {
      const elRect = el.getBoundingClientRect();
      const navRect = nav.getBoundingClientRect();
      setIndicator({ left: elRect.left - navRect.left, width: elRect.width, opacity: 1 });
    }
  }, [activeLink, isScrolled]);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isMenuOpen]);

  const handleNavClick = useCallback((href) => {
    setActiveLink(href);
    setIsMenuOpen(false);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600;700&display=swap');

        .nb-font-display { font-family: 'Space Grotesk', sans-serif; }
        .nb-font-body { font-family: 'Inter', sans-serif; }

        @keyframes nb-drop-in { from { opacity:0; transform:translateY(-18px); } to { opacity:1; transform:translateY(0); } }
        @keyframes nb-ring-spin { from { transform:rotate(0deg); } to { transform:rotate(360deg); } }
        @keyframes nb-ring-spin-rev { from { transform:rotate(360deg); } to { transform:rotate(0deg); } }
        @keyframes nb-glow-pulse { 0%,100% { opacity:0.35; transform:scale(1); } 50% { opacity:0.7; transform:scale(1.12); } }
        @keyframes nb-aurora-shift { 0% { background-position:0% 50%; } 50% { background-position:100% 50%; } 100% { background-position:0% 50%; } }
        @keyframes nb-fade-up { from { opacity:0; transform:translateY(12px); } to { opacity:1; transform:translateY(0); } }
        @keyframes nb-shine { 0% { transform:translateX(-120%) skewX(-15deg); } 100% { transform:translateX(220%) skewX(-15deg); } }
        @keyframes nb-dot-orbit-1 { from { transform:rotate(0deg) translateX(22px) rotate(0deg); } to { transform:rotate(360deg) translateX(22px) rotate(-360deg); } }
        @keyframes nb-dot-orbit-2 { from { transform:rotate(140deg) translateX(22px) rotate(-140deg); } to { transform:rotate(500deg) translateX(22px) rotate(-500deg); } }
        @keyframes nb-dot-pulse { 0%,100% { opacity:0.3; transform:scale(0.5); } 50% { opacity:1; transform:scale(1.3); } }
        @keyframes nb-diamond-draw { from { stroke-dashoffset:68; } to { stroke-dashoffset:0; } }
        @keyframes nb-inner-draw { from { stroke-dashoffset:48; } to { stroke-dashoffset:0; } }
        @keyframes nb-facet-in { from { opacity:0; transform:scale(0.85); } to { opacity:1; transform:scale(1); } }
        @keyframes nb-center-pop { 0% { transform:scale(0); opacity:0; } 60% { transform:scale(1.4); opacity:1; } 100% { transform:scale(1); opacity:0.9; } }
        @keyframes nb-edge-shimmer { 0%,100% { opacity:0.15; } 50% { opacity:0.5; } }

        @property --nb-btn-angle { syntax:'<angle>'; initial-value:0deg; inherits:false; }
        @keyframes nb-btn-border-spin { from { --nb-btn-angle:0deg; } to { --nb-btn-angle:360deg; } }

        @media (prefers-reduced-motion:reduce) {
          .nb-anim,.nb-anim * { animation-duration:0.01ms!important; animation-iteration-count:1!important; transition-duration:0.01ms!important; }
        }

        .nb-ring-outer { animation:nb-ring-spin 12s linear infinite; transform-origin:center; }
        .nb-ring-inner { animation:nb-ring-spin-rev 8s linear infinite; transform-origin:center; }
        .nb-glow { animation:nb-glow-pulse 3s ease-in-out infinite; }
        .nb-dot-1 { animation:nb-dot-orbit-1 5s linear infinite; }
        .nb-dot-2 { animation:nb-dot-orbit-2 7s linear infinite; }
        .nb-dot-pulse { animation:nb-dot-pulse 2.2s ease-in-out infinite; }
        .nb-diamond-outline { stroke-dasharray:68; animation:nb-diamond-draw 1s cubic-bezier(0.65,0,0.35,1) 0.1s both; transform-origin:center; }
        .nb-inner-diamond { stroke-dasharray:48; animation:nb-inner-draw 0.8s cubic-bezier(0.65,0,0.35,1) 0.4s both; transform-origin:center; }
        .nb-facet { animation:nb-facet-in 0.6s cubic-bezier(0.16,1,0.3,1) both; transform-origin:center; }
        .nb-center-dot { animation:nb-center-pop 0.5s cubic-bezier(0.16,1,0.3,1) 0.6s both; }
        .nb-edge-highlight { animation:nb-edge-shimmer 3s ease-in-out infinite; }

        .nb-wordmark {
          background-image:${AURORA}; background-size:300% auto;
          -webkit-background-clip:text; background-clip:text;
          -webkit-text-fill-color:transparent;
          animation:nb-aurora-shift 6s ease-in-out infinite;
        }

        .nb-link { position:relative; padding:6px 2px; letter-spacing:0.02em; transition:color 0.3s ease; }
        .nb-link::after {
          content:''; position:absolute; left:0; right:0; bottom:-2px; height:2px;
          background-image:${AURORA}; background-size:300% auto;
          transform:scaleX(0); transform-origin:center;
          transition:transform 0.4s cubic-bezier(0.65,0,0.35,1);
          border-radius:1px; animation:nb-aurora-shift 4s ease-in-out infinite;
        }
        .nb-link:hover::after { transform:scaleX(1); }
        .nb-link:hover { color:${C.text} !important; }

        .nb-cta {
          position:relative; z-index:1; overflow:hidden; border-radius:12px;
          border:1px solid transparent;
          background-image:linear-gradient(#05060E,#05060E),linear-gradient(135deg,${C.t1},${C.t2},${C.t3});
          background-origin:border-box; background-clip:padding-box,border-box;
          transition:transform 0.35s cubic-bezier(0.03,0.98,0.52,0.99),box-shadow 0.35s ease;
        }
        .nb-cta:hover { transform:translateY(-2px) scale(1.04); box-shadow:0 16px 44px -10px ${C.t2}88,0 6px 20px -6px ${C.t1}66 !important; }
        .nb-cta:active { transform:translateY(0) scale(0.97); }
        .nb-cta .nb-shine-el {
          position:absolute; top:0; left:0; height:100%; width:40%;
          background:linear-gradient(120deg,transparent,rgba(255,255,255,0.55),transparent);
          transform:translateX(-120%) skewX(-15deg); pointer-events:none;
        }
        .nb-cta:hover .nb-shine-el { animation:nb-shine 0.9s ease forwards; }

        @supports (background:conic-gradient(from 0deg,red,blue)) {
          .nb-cta {
            border:none;
            background-image:linear-gradient(135deg,${C.t1},${C.t2},${C.t3});
            background-clip:padding-box;
          }
          .nb-cta::before {
            content:''; position:absolute; inset:-1.5px; border-radius:13px; padding:1.5px;
            background:conic-gradient(from var(--nb-btn-angle,0deg),${C.t4},${C.t2},${C.t3},${C.t1},${C.t4});
            -webkit-mask:linear-gradient(#fff 0 0) content-box,linear-gradient(#fff 0 0);
            -webkit-mask-composite:xor; mask-composite:exclude;
            animation:nb-btn-border-spin 3s linear infinite; pointer-events:none; z-index:-1;
          }
        }

        .nb-mobile-link { transition:color 0.3s ease,background 0.3s ease,border-color 0.3s ease,transform 0.2s ease; }
        .nb-mobile-link:active { transform:scale(0.98); }
        .nb-progress { transform-origin:left; transition:transform 0.1s linear,opacity 0.3s ease; }
      `}</style>

      {/* ══════════════════════════════════════════════════════════
          NAVBAR HEADER
         ══════════════════════════════════════════════════════════ */}
      <header
        className="nb-anim nb-font-body fixed top-0 left-0 w-full z-50 transition-all duration-500"
        style={{
          background: isScrolled ? C.bgScrolled : "transparent",
          backdropFilter: isScrolled ? "blur(24px) saturate(1.5)" : "none",
          WebkitBackdropFilter: isScrolled ? "blur(24px) saturate(1.5)" : "none",
          borderBottom: `1px solid ${isScrolled ? C.borderSoft : "transparent"}`,
          boxShadow: isScrolled ? "0 16px 48px -20px rgba(59,130,246,0.25)" : "none",
        }}
      >
        {/* Scroll Progress */}
        <div
          className="nb-progress absolute top-0 left-0 right-0 h-[2px]"
          style={{
            opacity: isScrolled ? 1 : 0,
            background: AURORA,
            backgroundSize: "200% auto",
            animation: "nb-aurora-shift 3s ease-in-out infinite",
            transform: `scaleX(${scrollProgress / 100})`,
          }}
        />

        <div className="container mx-auto px-5 sm:px-6 lg:px-8">
          <div
            className="flex items-center justify-between transition-all duration-500"
            style={{ height: isScrolled ? "72px" : "88px" }}
          >
            {/* ════════ AURORA DIAMOND LOGO ════════ */}
            <a
              href="#home"
              className="flex items-center gap-3 group"
              aria-label="Muhammad Suleman — Home"
            >
              <span
                className="relative inline-flex items-center justify-center shrink-0"
                style={{ width: 46, height: 46 }}
              >
                {/* Pulsing Glow Aura */}
                <span
                  className="nb-glow absolute rounded-full"
                  style={{
                    inset: "-10px",
                    background: `radial-gradient(circle, ${C.t1}40, ${C.t2}20 45%, transparent 72%)`,
                    filter: "blur(10px)",
                  }}
                />

                {/* Outer Rotating Ring */}
                <svg className="nb-ring-outer absolute inset-0" viewBox="0 0 46 46" fill="none">
                  <circle cx="23" cy="23" r="21.5" stroke="url(#nb-ra)" strokeWidth="1" strokeDasharray="2.5 7" strokeLinecap="round" />
                </svg>

                {/* Inner Counter-Rotating Ring */}
                <svg className="nb-ring-inner absolute inset-0" viewBox="0 0 46 46" fill="none">
                  <circle cx="23" cy="23" r="16" stroke="url(#nb-rb)" strokeWidth="0.8" strokeDasharray="1.5 6" strokeLinecap="round" opacity="0.5" />
                </svg>

                {/* Orbiting Dot — Blue */}
                <span className="nb-dot-1 absolute left-1/2 top-1/2 w-0 h-0">
                  <span
                    className="nb-dot-pulse block w-[5px] h-[5px] -ml-[2.5px] -mt-[2.5px] rounded-full"
                    style={{ background: C.t3, boxShadow: `0 0 8px 2px ${C.t3}88` }}
                  />
                </span>

                {/* Orbiting Dot — Light Blue */}
                <span className="nb-dot-2 absolute left-1/2 top-1/2 w-0 h-0">
                  <span
                    className="nb-dot-pulse block w-[4px] h-[4px] -ml-[2px] -mt-[2px] rounded-full"
                    style={{ background: C.t4, boxShadow: `0 0 6px 2px ${C.t4}88`, animationDelay: "1.2s" }}
                  />
                </span>

                {/* ── MAIN DIAMOND LOGO ── */}
                <svg className="relative" width="46" height="46" viewBox="0 0 46 46" fill="none">
                  <defs>
                    {/* Facet gradients */}
                    <linearGradient id="nb-ft" x1="8" y1="8" x2="23" y2="23" gradientUnits="userSpaceOnUse">
                      <stop stopColor={C.t1} stopOpacity="0.9" />
                      <stop offset="1" stopColor={C.t2} stopOpacity="0.7" />
                    </linearGradient>
                    <linearGradient id="nb-fr" x1="38" y1="8" x2="23" y2="23" gradientUnits="userSpaceOnUse">
                      <stop stopColor={C.t2} stopOpacity="0.8" />
                      <stop offset="1" stopColor={C.t3} stopOpacity="0.6" />
                    </linearGradient>
                    <linearGradient id="nb-fb" x1="38" y1="38" x2="23" y2="23" gradientUnits="userSpaceOnUse">
                      <stop stopColor={C.t3} stopOpacity="0.6" />
                      <stop offset="1" stopColor={C.t4} stopOpacity="0.7" />
                    </linearGradient>
                    <linearGradient id="nb-fl" x1="8" y1="38" x2="23" y2="23" gradientUnits="userSpaceOnUse">
                      <stop stopColor={C.t4} stopOpacity="0.7" />
                      <stop offset="1" stopColor={C.t1} stopOpacity="0.8" />
                    </linearGradient>

                    {/* Ring gradients */}
                    <linearGradient id="nb-ra" x1="0" y1="0" x2="46" y2="46" gradientUnits="userSpaceOnUse">
                      <stop stopColor={C.t1} />
                      <stop offset="0.5" stopColor={C.t2} />
                      <stop offset="1" stopColor={C.t3} />
                    </linearGradient>
                    <linearGradient id="nb-rb" x1="46" y1="0" x2="0" y2="46" gradientUnits="userSpaceOnUse">
                      <stop stopColor={C.t4} />
                      <stop offset="1" stopColor={C.t1} />
                    </linearGradient>

                    {/* Outline gradient */}
                    <linearGradient id="nb-ol" x1="8" y1="8" x2="38" y2="38" gradientUnits="userSpaceOnUse">
                      <stop stopColor={C.t1} />
                      <stop offset="0.33" stopColor={C.t2} />
                      <stop offset="0.66" stopColor={C.t3} />
                      <stop offset="1" stopColor={C.t4} />
                    </linearGradient>

                    {/* Center glow */}
                    <radialGradient id="nb-cg" cx="50%" cy="50%" r="50%">
                      <stop stopColor="#fff" stopOpacity="0.9" />
                      <stop offset="0.5" stopColor={C.t1} stopOpacity="0.5" />
                      <stop offset="1" stopColor={C.t1} stopOpacity="0" />
                    </radialGradient>
                  </defs>

                  {/* ── 4 Colored Facets (3D lighting effect) ── */}
                  {/* Top facet — brightest (light from top-left) */}
                  <path className="nb-facet" style={{ animationDelay: "0.25s" }}
                    d="M23,8 L38,23 L23,23 L8,23 Z"
                    fill="rgba(59,130,246,0.22)" stroke="none" />

                  {/* Left facet — medium bright */}
                  <path className="nb-facet" style={{ animationDelay: "0.32s" }}
                    d="M8,23 L23,8 L23,23 L23,38 Z"
                    fill="rgba(96,165,250,0.16)" stroke="none" />

                  {/* Right facet — in shadow */}
                  <path className="nb-facet" style={{ animationDelay: "0.39s" }}
                    d="M38,23 L23,8 L23,23 L23,38 Z"
                    fill="rgba(96,165,250,0.10)" stroke="none" />

                  {/* Bottom facet — deepest shadow */}
                  <path className="nb-facet" style={{ animationDelay: "0.46s" }}
                    d="M23,38 L8,23 L23,23 L38,23 Z"
                    fill="rgba(59,130,246,0.07)" stroke="none" />

                  {/* ── Inner Diamond (nested, subtle) ── */}
                  <path className="nb-inner-diamond"
                    d="M23,14 L32,23 L23,32 L14,23 Z"
                    stroke="url(#nb-ol)" strokeWidth="0.6" fill="none" opacity="0.25" />

                  {/* ── Detail Lines (center to vertices) ── */}
                  <line x1="23" y1="23" x2="23" y2="8" stroke="url(#nb-ol)" strokeWidth="0.5" opacity="0.2" />
                  <line x1="23" y1="23" x2="38" y2="23" stroke="url(#nb-ol)" strokeWidth="0.5" opacity="0.15" />
                  <line x1="23" y1="23" x2="23" y2="38" stroke="url(#nb-ol)" strokeWidth="0.5" opacity="0.1" />
                  <line x1="23" y1="23" x2="8" y2="23" stroke="url(#nb-ol)" strokeWidth="0.5" opacity="0.15" />

                  {/* ── Diamond Outline (draws in on load) ── */}
                  <path className="nb-diamond-outline"
                    d="M23,8 L38,23 L23,38 L8,23 Z"
                    stroke="url(#nb-ol)" strokeWidth="1.2" fill="none" strokeLinejoin="round" />

                  {/* ── Edge Highlights (light source top-left) ── */}
                  <line className="nb-edge-highlight" x1="23" y1="8" x2="8" y2="23"
                    stroke="white" strokeWidth="0.6" opacity="0.35" strokeLinecap="round" />
                  <line className="nb-edge-highlight" style={{ animationDelay: "1.5s" }} x1="23" y1="8" x2="38" y2="23"
                    stroke="white" strokeWidth="0.4" opacity="0.2" strokeLinecap="round" />

                  {/* ── Center Glow Point ── */}
                  <circle className="nb-center-dot" cx="23" cy="23" r="2.8"
                    fill="url(#nb-cg)" />
                  <circle cx="23" cy="23" r="5" fill="url(#nb-cg)" opacity="0.15" />
                </svg>
              </span>

              {/* Logo Text */}
              <span className="nb-font-display text-[21px] tracking-tight leading-none hidden sm:inline-block">
                <span style={{ color: C.text, fontWeight: 700 }}>Muhammad </span>
                <span className="nb-wordmark" style={{ fontWeight: 700 }}>Suleman</span>
              </span>
            </a>

            {/* ════════ DESKTOP NAV ════════ */}
            <nav ref={navRef} className="relative hidden lg:flex items-center gap-8 xl:gap-9">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  ref={(el) => (linkRefs.current[link.href] = el)}
                  href={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className="nb-link nb-font-body text-[15px] font-medium"
                  style={{ color: activeLink === link.href ? C.text : C.muted }}
                >
                  {link.name}
                </a>
              ))}
              <span
                className="absolute bottom-[-4px] h-[2px] rounded-full pointer-events-none"
                style={{
                  left: indicator.left, width: indicator.width, opacity: indicator.opacity,
                  backgroundImage: AURORA, backgroundSize: "300% auto",
                  animation: "nb-aurora-shift 4s ease-in-out infinite",
                  boxShadow: `0 0 12px ${C.t2}88, 0 0 4px ${C.t1}66`,
                  transition: "left 0.4s cubic-bezier(0.65,0,0.35,1), width 0.4s cubic-bezier(0.65,0,0.35,1), opacity 0.3s ease",
                }}
              />
            </nav>

            {/* ════════ DESKTOP CTA ════════ */}
            <a
              href="#contact"
              className="nb-cta nb-font-body group hidden lg:inline-flex items-center gap-2.5 text-[14px] font-bold tracking-wide"
              style={{ color: "#05060E", padding: "13px 30px", boxShadow: `0 8px 28px -8px ${C.t2}77` }}
            >
              <span className="nb-shine-el" />
              <span className="relative z-10 flex items-center gap-2">
                Hire Me
                <FiArrowUpRight size={15} strokeWidth={2.5} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </a>

            {/* ════════ MOBILE TOGGLE ════════ */}
            <button
              className="lg:hidden relative z-[60] p-2 rounded-xl transition-all duration-300"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle Navigation"
              style={{
                color: C.text,
                background: isMenuOpen ? C.t1Soft : "transparent",
                border: `1px solid ${isMenuOpen ? C.t1 + "30" : "transparent"}`,
              }}
            >
              {isMenuOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
            </button>
          </div>
        </div>
      </header>

      {/* ══════════════════════════════════════════════════════════
          MOBILE OVERLAY
         ══════════════════════════════════════════════════════════ */}
      <div
        className="fixed inset-0 z-40 transition-all duration-500 lg:hidden"
        style={{
          background: "rgba(5,6,14,0.7)",
          backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)",
          opacity: isMenuOpen ? 1 : 0, visibility: isMenuOpen ? "visible" : "hidden",
        }}
        onClick={() => setIsMenuOpen(false)}
      />

      {/* ══════════════════════════════════════════════════════════
          MOBILE MENU PANEL
         ══════════════════════════════════════════════════════════ */}
      <aside
        className="nb-font-body fixed top-0 right-0 h-full w-[320px] max-w-[85vw] z-50 flex flex-col lg:hidden"
        style={{
          background: `linear-gradient(180deg, ${C.surface}f8, ${C.bg}fa)`,
          backdropFilter: "blur(24px) saturate(1.4)", WebkitBackdropFilter: "blur(24px) saturate(1.4)",
          borderLeft: `1px solid ${C.border}`,
          transform: isMenuOpen ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.5s cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        <div className="flex items-center justify-between p-6 shrink-0" style={{ borderBottom: `1px solid ${C.border}` }}>
          <span className="nb-font-display text-lg font-bold nb-wordmark">Menu</span>
          <button onClick={() => setIsMenuOpen(false)} className="p-1.5 rounded-lg transition-colors duration-200" style={{ color: C.muted }}>
            <FaTimes size={20} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto p-5 space-y-1">
          {navLinks.map((link, i) => (
            <a
              key={link.name} href={link.href} onClick={() => handleNavClick(link.href)}
              className="nb-mobile-link group flex items-center gap-4 py-3.5 px-4 rounded-xl"
              style={{
                color: activeLink === link.href ? C.text : C.muted,
                background: activeLink === link.href ? C.t1Soft : "transparent",
                border: `1px solid ${activeLink === link.href ? C.t1 + "20" : "transparent"}`,
                ...(isMenuOpen ? { animation: `nb-fade-up 0.4s cubic-bezier(0.16,1,0.3,1) ${0.05 + i * 0.04}s both` } : { opacity: 0 }),
              }}
            >
              <span className="text-[11px] font-mono font-bold tracking-wider w-5 text-right shrink-0 transition-colors duration-300"
                style={{ color: activeLink === link.href ? C.t1 : C.border }}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="text-[15px] font-medium flex-1">{link.name}</span>
              <FiArrowUpRight size={14} className="shrink-0 transition-all duration-300 opacity-0 -translate-x-2 translate-y-2 group-hover:opacity-60 group-hover:translate-x-0 group-hover:translate-y-0" style={{ color: C.t1 }} />
            </a>
          ))}
        </nav>

        <div className="p-6 shrink-0" style={{ borderTop: `1px solid ${C.border}` }}>
          <a
            href="#contact" onClick={() => setIsMenuOpen(false)}
            className="flex items-center justify-center gap-2.5 w-full py-4 rounded-xl text-[15px] font-bold transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0"
            style={{
              color: "#05060E",
              backgroundImage: `linear-gradient(135deg, ${C.t1}, ${C.t2})`,
              boxShadow: `0 10px 30px -10px ${C.t1}66`,
              ...(isMenuOpen ? { animation: `nb-fade-up 0.4s cubic-bezier(0.16,1,0.3,1) ${0.05 + navLinks.length * 0.04 + 0.1}s both` } : { opacity: 0 }),
            }}
          >
            Hire Me <FiArrowUpRight size={15} strokeWidth={2.5} />
          </a>
        </div>
      </aside>
    </>
  );
}

export default Navbar;