import {
  useEffect,
  useRef,
  useState,
  useCallback,
} from "react";
import {
  FaGithub,
  FaLinkedin,
  FaArrowUp,
  FaHeart,
  FaCode,
  FaBolt,
  FaStar,
} from "react-icons/fa";
import {
  FiDribbble,
  FiExternalLink,
} from "react-icons/fi";

/* ═══════════════════════════════════════════════════════════════
   AURORA PALETTE
   ═══════════════════════════════════════════════════════════════ */
const C = {
  bg: "#05060E",
  surface: "#0A0C1A",
  surfaceAlt: "#0E1128",
  border: "#181C38",
  borderSoft: "rgba(139,92,246,0.08)",
  text: "#F0EEFF",
  textSec: "#B4B7D6",
  muted: "#6B7199",
  violet: "#8B5CF6",
  violetSoft: "rgba(139,92,246,0.1)",
  pink: "#EC4899",
  pinkSoft: "rgba(236,72,153,0.1)",
  cyan: "#06B6D4",
  cyanSoft: "rgba(6,182,212,0.1)",
  amber: "#F59E0B",
  amberSoft: "rgba(245,158,11,0.1)",
  emerald: "#10B981",
  emeraldSoft: "rgba(16,185,129,0.1)",
  red: "#EF4444",
};

const AURORA = `linear-gradient(90deg,${C.violet},${C.pink},${C.amber},${C.cyan},${C.violet})`;

/* ═══════════════════════════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════════════════════════ */
const quickLinks = [
  { name: "Home", href: "#home", num: "01" },
  { name: "About", href: "#about", num: "02" },
  { name: "Skills", href: "#skills", num: "03" },
  { name: "Projects", href: "#projects", num: "04" },
  { name: "Contact", href: "#contact", num: "05" },
];

const socials = [
  { icon: <FaGithub size={18} />, label: "GitHub", href: "https://github.com/WithSuleman", color: C.textSec },
  { icon: <FaLinkedin size={18} />, label: "LinkedIn", href: "https://www.linkedin.com/in/muhammad-suleman-a97943378", color: C.violet },
];

const techStack = ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Node.js", "Figma", "Git", "Vite", "Redux", "MongoDB", "Firebase"];
const marqueeItems = [...techStack, ...techStack, ...techStack];

const PARTICLES = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 2 + 0.6,
  dur: Math.random() * 20 + 14,
  del: Math.random() * -18,
  op: Math.random() * 0.12 + 0.03,
  color: [C.violet, C.pink, C.cyan, C.amber][i % 4],
}));

/* ═══════════════════════════════════════════════════════════════
   HOOKS
   ═══════════════════════════════════════════════════════════════ */
function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

function useScrollProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      setProgress(Math.min((h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100, 100));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return progress;
}

function useMouseLocal(ref) {
  const [pos, setPos] = useState({ x: 0, y: 0, inside: false });
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      setPos({ x: e.clientX - r.left, y: e.clientY - r.top, inside: true });
    };
    const onLeave = () => setPos((p) => ({ ...p, inside: false }));
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => { el.removeEventListener("mousemove", onMove); el.removeEventListener("mouseleave", onLeave); };
  }, [ref]);
  return pos;
}

/* ═══════════════════════════════════════════════════════════════
   CHAR REVEAL — wordmark prop fixes the visibility bug
   ═══════════════════════════════════════════════════════════════ */
function CharReveal({ text, className, style, delay = 0, stagger = 0.028, wordmark = false }) {
  return (
    <span className={className} style={{ ...style, display: "inline-block" }}>
      {text.split("").map((char, i) => (
        <span
          key={i}
          className="inline-block"
          style={{
            /* When wordmark=true, apply aurora gradient to EACH character span */
            ...(wordmark
              ? {
                  backgroundImage: AURORA,
                  backgroundSize: "300% auto",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  color: "transparent",
                }
              : {}),
            animation: `ft-char-up 0.5s cubic-bezier(0.16,1,0.3,1) ${delay + i * stagger}s both${
              wordmark ? ", ft-aurora-shift 6s ease-in-out infinite" : ""
            }`,
          }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
  );
}

/* ═══════════════════════════════════════════════════════════════
   ANIMATED COUNTER
   ═══════════════════════════════════════════════════════════════ */
function AnimatedNum({ target, suffix = "", duration = 2000, visible }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!visible) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setVal(target); clearInterval(timer); }
      else setVal(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [visible, target, duration]);
  return <span>{val}{suffix}</span>;
}

/* ═══════════════════════════════════════════════════════════════
   QUICK LINK
   ═══════════════════════════════════════════════════════════════ */
function QuickLink({ link, index, visible }) {
  const [hovered, setHovered] = useState(false);
  return (
    <li style={{
      animation: visible ? `ft-fade-up 0.55s cubic-bezier(0.16,1,0.3,1) ${0.3 + index * 0.07}s both` : "none",
      opacity: visible ? undefined : 0,
    }}>
      <a
        href={link.href}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="group flex items-center gap-3 py-2 px-3 -ml-3 rounded-lg transition-all duration-300"
        style={{ color: hovered ? C.violet : C.textSec, background: hovered ? C.violetSoft : "transparent" }}
      >
        <span className="text-[10px] font-mono font-bold tracking-wider transition-all duration-300"
          style={{ color: hovered ? C.violet : C.border, transform: hovered ? "translateX(2px)" : "translateX(0)" }}>
          {link.num}
        </span>
        <span className="block h-px transition-all duration-500"
          style={{
            width: hovered ? "20px" : "0px",
            background: AURORA,
            backgroundSize: "200% auto",
            animation: hovered ? "ft-aurora-shift 3s ease-in-out infinite" : "none",
          }} />
        <span className="text-sm font-medium transition-all duration-300"
          style={{ transform: hovered ? "translateX(4px)" : "translateX(0)" }}>
          {link.name}
        </span>
        <FiExternalLink size={12} className="ml-auto transition-all duration-300"
          style={{
            opacity: hovered ? 0.6 : 0,
            transform: hovered ? "translate(0,0) rotate(-45deg)" : "translate(-6px,6px) rotate(0deg)",
          }} />
      </a>
    </li>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SOCIAL BUTTON
   ═══════════════════════════════════════════════════════════════ */
function SocialBtn({ item, index, visible }) {
  const [mag, setMag] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    setMag({ x: (e.clientX - r.left - r.width / 2) * 0.3, y: (e.clientY - r.top - r.height / 2) * 0.3 });
  };
  const onLeave = () => { setMag({ x: 0, y: 0 }); setHovered(false); };

  return (
    <div className="relative" style={{ perspective: 400 }}>
      <a href={item.href} target="_blank" rel="noreferrer" aria-label={item.label}
        onMouseMove={onMove} onMouseEnter={() => setHovered(true)} onMouseLeave={onLeave}
        className="ft-social relative flex items-center justify-center w-11 h-11 rounded-xl"
        style={{
          color: hovered ? C.violet : item.color,
          border: `1px solid ${hovered ? C.violet + "50" : C.border}`,
          background: hovered ? C.violetSoft : C.surface,
          transform: `translate(${mag.x}px, ${mag.y}px) scale(${hovered ? 1.1 : 1})`,
          boxShadow: hovered ? `0 10px 28px -8px ${C.violet}30, 0 0 0 3px ${C.violet}10` : "none",
          transition: "transform 0.35s cubic-bezier(0.03,0.98,0.52,0.99), border-color 0.3s ease, background 0.3s ease, color 0.3s ease, box-shadow 0.3s ease",
          animation: visible ? `ft-fade-up 0.5s cubic-bezier(0.16,1,0.3,1) ${0.6 + index * 0.06}s both` : "none",
          opacity: visible ? undefined : 0,
        }}>
        {item.icon}
      </a>
      <div className="absolute -top-9 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-md text-[10px] font-semibold tracking-wider uppercase whitespace-nowrap pointer-events-none"
        style={{
          color: C.text, background: C.surfaceAlt, border: `1px solid ${C.border}`,
          opacity: hovered ? 1 : 0,
          transform: `translateX(-50%) translateY(${hovered ? 0 : 5}px)`,
          transition: "opacity 0.2s ease, transform 0.2s ease",
        }}>
        {item.label}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   BACK TO TOP
   ═══════════════════════════════════════════════════════════════ */
function BackToTop({ progress, visible }) {
  const [hovered, setHovered] = useState(false);
  const radius = 18;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      className="fixed bottom-7 right-7 z-50 flex items-center justify-center"
      style={{
        width: 52, height: 52,
        animation: visible ? "ft-fade-up 0.5s cubic-bezier(0.16,1,0.3,1) 0.8s both" : "none",
        opacity: visible ? undefined : 0,
        pointerEvents: visible ? "auto" : "none",
        transform: `scale(${hovered ? 1.12 : 1}) translateY(${hovered ? -3 : 0}px)`,
        transition: "transform 0.35s cubic-bezier(0.03,0.98,0.52,0.99), box-shadow 0.3s ease",
        boxShadow: hovered ? `0 12px 36px -10px ${C.violet}44, 0 0 0 4px ${C.violet}15` : `0 8px 24px -8px rgba(0,0,0,0.5)`,
      }} aria-label="Back to top">
      <svg width="52" height="52" viewBox="0 0 52 52" className="absolute inset-0">
        <circle cx="26" cy="26" r={radius} fill={C.surface} stroke={C.border} strokeWidth="2" />
        <circle cx="26" cy="26" r={radius} fill="none" stroke="url(#ft-grad)" strokeWidth="2.5"
          strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={offset}
          style={{ transform: "rotate(-90deg)", transformOrigin: "center", transition: "stroke-dashoffset 0.15s ease-out" }} />
        <defs>
          <linearGradient id="ft-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={C.violet} />
            <stop offset="50%" stopColor={C.pink} />
            <stop offset="100%" stopColor={C.amber} />
          </linearGradient>
        </defs>
      </svg>
      <FaArrowUp size={16} className="relative z-10"
        style={{ color: hovered ? C.violet : C.textSec, transition: "color 0.3s ease, transform 0.3s ease", transform: hovered ? "translateY(-2px)" : "translateY(0)" }} />
    </button>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MAIN FOOTER
   ═══════════════════════════════════════════════════════════════ */
function Footer() {
  const currentYear = new Date().getFullYear();
  const [rootRef, rootIn] = useInView(0.08);
  const mouse = useMouseLocal(rootRef);
  const scrollProgress = useScrollProgress();
  const [time, setTime] = useState("");
  const [hoveredQuote, setHoveredQuote] = useState(false);

  useEffect(() => {
    const tick = () => {
      setTime(new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: true }));
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700;800&family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700&display=swap');

        .ft-font-display{font-family:'Space Grotesk',sans-serif}
        .ft-font-body{font-family:'Inter',sans-serif}
        .ft-font-mono{font-family:'JetBrains Mono',monospace}

        @keyframes ft-fade-up{from{opacity:0;transform:translateY(32px)}to{opacity:1;transform:translateY(0)}}
        @keyframes ft-fade-left{from{opacity:0;transform:translateX(-28px)}to{opacity:1;transform:translateX(0)}}
        @keyframes ft-char-up{from{opacity:0;transform:translateY(18px) rotateX(-40deg)}to{opacity:1;transform:translateY(0) rotateX(0)}}
        @keyframes ft-aurora-shift{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}
        @keyframes ft-blob{0%,100%{transform:translate(0,0) scale(1)}33%{transform:translate(24px,-18px) scale(1.06)}66%{transform:translate(-16px,14px) scale(0.94)}}
        @keyframes ft-blob-2{0%,100%{transform:translate(0,0) scale(1)}50%{transform:translate(-20px,-24px) scale(1.08)}}
        @keyframes ft-particle{
          0%,100%{transform:translate(0,0);opacity:var(--po)}
          25%{transform:translate(12px,-16px);opacity:calc(var(--po)*1.5)}
          50%{transform:translate(-8px,-24px);opacity:var(--po)}
          75%{transform:translate(14px,-8px);opacity:calc(var(--po)*0.5)}
        }
        @keyframes ft-marquee{from{transform:translateX(0)}to{transform:translateX(-33.333%)}}
        @keyframes ft-pulse-dot{0%,100%{opacity:.4;transform:scale(1)}50%{opacity:1;transform:scale(1.3)}}
        @keyframes ft-cursor-blink{0%,100%{opacity:1}50%{opacity:0}}
        @keyframes ft-float{0%,100%{transform:translateY(0)}50%{transform:translateY(-3px)}}
        @keyframes ft-shine-anim{0%{transform:translateX(-150%) skewX(-20deg)}100%{transform:translateX(280%) skewX(-20deg)}}
        @keyframes ft-pulse-ring{0%{transform:scale(1);opacity:.4}100%{transform:scale(2.5);opacity:0}}

        @media(prefers-reduced-motion:reduce){
          .ft-anim,.ft-anim *{animation-duration:0.01ms!important;animation-iteration-count:1!important;transition-duration:0.01ms!important}
        }

        .ft-noise::after{
          content:'';position:absolute;inset:0;opacity:.018;pointer-events:none;
          background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          background-repeat:repeat;background-size:128px 128px;
        }

        .ft-grid{
          background-image:radial-gradient(circle,${C.borderSoft} 1px,transparent 1px);
          background-size:36px 36px;
          -webkit-mask-image:radial-gradient(ellipse 70% 50% at 50% 80%,black 10%,transparent 70%);
          mask-image:radial-gradient(ellipse 70% 50% at 50% 80%,black 10%,transparent 70%);
        }

        .ft-blob-1{animation:ft-blob 22s ease-in-out infinite}
        .ft-blob-2{animation:ft-blob-2 28s ease-in-out infinite}

        .ft-marquee-track{
          animation:ft-marquee 28s linear infinite;
          -webkit-mask-image:linear-gradient(to right,transparent,black 8%,black 92%,transparent);
          mask-image:linear-gradient(to right,transparent,black 8%,black 92%,transparent);
        }
        .ft-marquee-track:hover{animation-play-state:paused}

        .ft-social{transition:transform .35s cubic-bezier(.03,.98,.52,.99),border-color .3s ease,background .3s ease,color .3s ease,box-shadow .3s ease}
        .ft-quote-card{transition:border-color .4s ease,box-shadow .4s ease,transform .4s cubic-bezier(.03,.98,.52,.99)}
        .ft-quote-card:hover{border-color:${C.violet}25;box-shadow:0 16px 48px -16px ${C.violet}12;transform:translateY(-3px)}
        .ft-stat-card{transition:border-color .4s ease,box-shadow .4s ease,transform .4s cubic-bezier(.03,.98,.52,.99)}
        .ft-stat-card:hover{border-color:${C.violet}20;box-shadow:0 12px 32px -12px ${C.violet}10;transform:translateY(-2px) scale(1.02)}
        .ft-bottom-link{transition:color .3s ease,transform .2s ease}
        .ft-bottom-link:hover{color:${C.violet};transform:translateY(-1px)}
      `}</style>

      <footer ref={rootRef} className="ft-font-body relative overflow-hidden" style={{ background: C.bg }}>
        {/* Top aurora divider */}
        <div className="absolute top-0 left-0 right-0 h-px"
          style={{ backgroundImage: AURORA, backgroundSize: "300% auto", opacity: 0.4, animation: "ft-aurora-shift 6s ease-in-out infinite" }} />

        {/* Ambient BG */}
        <div className="ft-anim ft-noise absolute inset-0 pointer-events-none">
          <div className="ft-grid absolute inset-0 opacity-40" />
          <div className="ft-blob-1 absolute rounded-full"
            style={{ width: 440, height: 440, bottom: "5%", left: "-12%", background: `radial-gradient(circle,${C.violet}12,transparent 70%)`, filter: "blur(65px)" }} />
          <div className="ft-blob-2 absolute rounded-full"
            style={{ width: 380, height: 380, top: "10%", right: "-10%", background: `radial-gradient(circle,${C.cyan}10,transparent 70%)`, filter: "blur(60px)" }} />
          {PARTICLES.map((p) => (
            <div key={p.id} className="absolute rounded-full"
              style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size, background: p.color, "--po": p.op,
                animation: `ft-particle ${p.dur}s ease-in-out ${p.del}s infinite`, opacity: p.op }} />
          ))}
        </div>

        {/* Mouse spotlight */}
        <div className="absolute inset-0 pointer-events-none z-0 transition-opacity duration-500"
          style={{ opacity: mouse.inside ? 1 : 0,
            background: `radial-gradient(500px circle at ${mouse.x}px ${mouse.y}px, ${C.violet}06, transparent 50%)` }} />

        <div className="relative z-10">
          {/* ═══ MARQUEE ═══ */}
          <div className="border-b overflow-hidden py-5" style={{ borderColor: C.border }}>
            <div className="ft-marquee-track flex items-center gap-8 whitespace-nowrap w-max">
              {marqueeItems.map((tech, i) => (
                <span key={i} className="flex items-center gap-3 text-sm font-medium" style={{ color: C.muted }}>
                  <span className="w-1.5 h-1.5 rounded-full shrink-0"
                    style={{ background: [C.violet, C.pink, C.cyan, C.amber][i % 4], animation: "ft-pulse-dot 2.5s ease-in-out infinite", animationDelay: `${i * 0.15}s` }} />
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* ═══ MAIN GRID ═══ */}
          <div className="container mx-auto px-5 sm:px-6 lg:px-8 pt-14 pb-10">
            <div className="grid gap-12 lg:gap-16 md:grid-cols-2 lg:grid-cols-[1.1fr_0.9fr_0.8fr]">

              {/* ═══ COL 1 — BRAND ═══ */}
              <div style={rootIn ? { animation: "ft-fade-left 0.75s cubic-bezier(0.16,1,0.3,1) both" } : { opacity: 0 }}>
                <div className="mb-6">
                  <h2 className="ft-font-display text-3xl sm:text-4xl font-extrabold leading-tight" style={{ transformStyle: "preserve-3d" }}>
                    <CharReveal text="Muhammad " delay={0.15} style={{ color: C.text }} />
                    {/* ✅ FIX: wordmark prop applies gradient to each char span */}
                    <CharReveal text="Suleman" delay={0.15 + 9 * 0.028} wordmark />
                  </h2>

                  <div className="flex items-center gap-2.5 mt-4">
                    <span className="relative flex items-center justify-center">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ background: C.emerald, boxShadow: `0 0 10px ${C.emerald}` }} />
                      <span className="absolute w-2.5 h-2.5 rounded-full" style={{ border: `1.5px solid ${C.emerald}`, animation: "ft-pulse-ring 2s ease-out infinite" }} />
                    </span>
                    <span className="text-xs font-medium" style={{ color: C.emerald }}>Available for freelance</span>
                  </div>
                </div>

                <p className="text-sm leading-relaxed mb-8 max-w-sm" style={{
                  color: C.textSec,
                  animation: rootIn ? "ft-fade-up 0.6s cubic-bezier(0.16,1,0.3,1) 0.3s both" : "none",
                  opacity: rootIn ? undefined : 0,
                }}>
                  Frontend Developer passionate about building modern, responsive and user-friendly web applications with React and Tailwind CSS.
                </p>

                <div className="grid grid-cols-3 gap-3" style={{
                  animation: rootIn ? "ft-fade-up 0.6s cubic-bezier(0.16,1,0.3,1) 0.45s both" : "none",
                  opacity: rootIn ? undefined : 0,
                }}>
                  {[
                    { num: 50, suffix: "+", label: "Projects", icon: <FaCode size={11} />, color: C.violet },
                    { num: 3, suffix: "+", label: "Years Exp", icon: <FaBolt size={11} />, color: C.amber },
                    { num: 30, suffix: "+", label: "Clients", icon: <FaStar size={11} />, color: C.pink },
                  ].map((stat, i) => (
                    <div key={stat.label} className="ft-stat-card text-center rounded-xl p-3.5"
                      style={{
                        background: C.surface, border: `1px solid ${C.border}`,
                        animation: rootIn ? `ft-fade-up 0.5s cubic-bezier(0.16,1,0.3,1) ${0.5 + i * 0.08}s both` : "none",
                        opacity: rootIn ? undefined : 0,
                      }}>
                      <div className="flex items-center justify-center gap-1.5 mb-1.5" style={{ color: stat.color }}>
                        {stat.icon}
                        <span className="ft-font-mono text-lg font-bold"><AnimatedNum target={stat.num} suffix={stat.suffix} visible={rootIn} /></span>
                      </div>
                      <p className="text-[10px] font-semibold tracking-wider uppercase" style={{ color: C.muted }}>{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* ═══ COL 2 — LINKS ═══ */}
              <div style={rootIn ? { animation: "ft-fade-up 0.75s cubic-bezier(0.16,1,0.3,1) 0.15s both" } : { opacity: 0 }}>
                <h3 className="ft-font-display text-lg font-bold mb-6 flex items-center gap-3" style={{ color: C.text }}>
                  <span className="w-8 h-[2px] rounded-full" style={{ background: AURORA, backgroundSize: "200% auto", animation: "ft-aurora-shift 4s ease-in-out infinite" }} />
                  Quick Links
                </h3>
                <ul className="space-y-1">
                  {quickLinks.map((link, i) => <QuickLink key={link.name} link={link} index={i} visible={rootIn} />)}
                </ul>

                <div className="ft-quote-card mt-8 rounded-xl p-5 relative overflow-hidden"
                  style={{
                    background: C.surface, border: `1px solid ${C.border}`,
                    animation: rootIn ? "ft-fade-up 0.6s cubic-bezier(0.16,1,0.3,1) 0.7s both" : "none",
                    opacity: rootIn ? undefined : 0,
                  }}
                  onMouseEnter={() => setHoveredQuote(true)} onMouseLeave={() => setHoveredQuote(false)}>
                  <div className="absolute top-3 right-4 text-5xl font-bold leading-none pointer-events-none select-none"
                    style={{ color: C.violet, opacity: hoveredQuote ? 0.12 : 0.06, transition: "opacity 0.4s ease", fontFamily: "Georgia, serif" }}>&ldquo;</div>
                  <p className="text-sm leading-relaxed relative z-10" style={{ color: C.textSec, transition: "color 0.3s ease" }}>
                    {hoveredQuote ? "The best way to predict the future is to create it." : "Code is poetry written in logic."}
                  </p>
                  <p className="text-[10px] font-semibold mt-2 tracking-wider uppercase relative z-10" style={{ color: C.muted }}>
                    {hoveredQuote ? "— Peter Drucker" : "— Anonymous"}
                  </p>
                </div>
              </div>

              {/* ═══ COL 3 — CONNECT ═══ */}
              <div style={rootIn ? { animation: "ft-fade-up 0.75s cubic-bezier(0.16,1,0.3,1) 0.25s both" } : { opacity: 0 }}>
                <h3 className="ft-font-display text-lg font-bold mb-6 flex items-center gap-3" style={{ color: C.text }}>
                  <span className="w-8 h-[2px] rounded-full" style={{ background: AURORA, backgroundSize: "200% auto", animation: "ft-aurora-shift 4s ease-in-out infinite" }} />
                  Connect
                </h3>

                <div className="flex flex-wrap gap-2.5 mb-8">
                  {socials.map((s, i) => <SocialBtn key={s.label} item={s} index={i} visible={rootIn} />)}
                </div>

                <div className="rounded-xl p-4 mb-6" style={{
                  background: C.surface, border: `1px solid ${C.border}`,
                  animation: rootIn ? "ft-fade-up 0.5s cubic-bezier(0.16,1,0.3,1) 0.8s both" : "none",
                  opacity: rootIn ? undefined : 0,
                }}>
                  <p className="text-[10px] font-semibold tracking-[0.15em] uppercase mb-2" style={{ color: C.muted }}>Local Time</p>
                  <div className="flex items-center gap-2.5">
                    <span className="ft-font-mono text-xl font-bold tracking-wider" style={{ color: C.text }}>{time}</span>
                    <span className="w-0.5 h-5 rounded-full" style={{ background: C.violet, animation: "ft-cursor-blink 1s step-end infinite" }} />
                    <span className="text-[10px] font-mono font-medium px-1.5 py-0.5 rounded"
                      style={{ color: C.emerald, background: C.emeraldSoft, border: `1px solid rgba(16,185,129,0.15)` }}>PKT</span>
                  </div>
                </div>

                <a href="#contact"
                  className="group relative inline-flex items-center gap-3 px-6 py-3.5 rounded-xl text-sm font-semibold overflow-hidden"
                  style={{
                    color: "#05060E",
                    backgroundImage: `linear-gradient(135deg, ${C.violet}, ${C.pink})`,
                    boxShadow: `0 12px 32px -12px ${C.violet}33`,
                    animation: rootIn ? "ft-fade-up 0.5s cubic-bezier(0.16,1,0.3,1) 0.9s both" : "none",
                    opacity: rootIn ? undefined : 0,
                    transition: "transform 0.4s cubic-bezier(0.03,0.98,0.52,0.99), box-shadow 0.4s ease",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-3px) scale(1.02)"; e.currentTarget.style.boxShadow = `0 18px 44px -14px ${C.violet}44`; }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0) scale(1)"; e.currentTarget.style.boxShadow = `0 12px 32px -12px ${C.violet}33`; }}>
                  <span className="absolute top-0 left-0 h-full w-2/5 pointer-events-none"
                    style={{ background: "linear-gradient(120deg, transparent, rgba(255,255,255,0.45), transparent)", transform: "translateX(-150%) skewX(-20deg)" }}
                    onMouseEnter={(e) => { e.currentTarget.style.animation = "ft-shine-anim 0.8s ease forwards"; }} />
                  <span className="relative z-10">Let&apos;s Work Together</span>
                  <FiExternalLink size={14} className="relative z-10 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:rotate-45" />
                </a>
              </div>
            </div>
          </div>

          {/* ═══ BOTTOM BAR ═══ */}
          <div className="border-t" style={{ borderColor: C.border, background: `${C.surface}40` }}>
            <div className="container mx-auto px-5 sm:px-6 lg:px-8 py-5">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-xs" style={{ color: C.muted }}>
                  <span>&copy; {currentYear} Muhammad Suleman.</span>
                  <span className="w-1 h-1 rounded-full" style={{ background: C.border }} />
                  <span>All Rights Reserved.</span>
                </div>
                <div className="flex items-center gap-2 text-xs" style={{
                  color: C.muted,
                  animation: rootIn ? "ft-fade-up 0.5s ease 1s both" : "none",
                  opacity: rootIn ? undefined : 0,
                }}>
                  <span>Built with</span>
                  <FaHeart size={10} style={{ color: C.pink, animation: "ft-float 2s ease-in-out infinite" }} />
                  <span>using</span>
                  <span className="ft-font-mono font-medium" style={{ color: C.violet }}>React</span>
                  <span>,</span>
                  <span className="ft-font-mono font-medium" style={{ color: C.cyan }}>Vite</span>
                  <span>&amp;</span>
                  <span className="ft-font-mono font-medium" style={{ color: C.amber }}>Tailwind</span>
                </div>
                <div className="flex items-center gap-4">
                  <a href="#" className="ft-bottom-link text-xs font-medium" style={{ color: C.muted }}>Privacy</a>
                  <span className="w-1 h-1 rounded-full" style={{ background: C.border }} />
                  <a href="#" className="ft-bottom-link text-xs font-medium" style={{ color: C.muted }}>Terms</a>
                </div>
              </div>
            </div>
          </div>

          <div className="h-[2px]" style={{ backgroundImage: AURORA, backgroundSize: "300% auto", opacity: 0.2, animation: "ft-aurora-shift 6s ease-in-out infinite" }} />
        </div>
      </footer>

      <BackToTop progress={scrollProgress} visible={rootIn} />
    </>
  );
}

export default Footer;