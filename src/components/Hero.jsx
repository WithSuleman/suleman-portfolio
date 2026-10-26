import { useEffect, useRef, useState } from "react";
import {
  ArrowDown,
  Download,
  Mail,
  Sparkles,
  Code2,
  Database,
  Server,
  Hexagon,
  MapPin,
  Zap,
} from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import profile from "../assets/images/projects/profile.jfif";
import resume from "../assets/images/projects/resume.pdf"

// ===== BLUE THEME PALETTE =====
// Keys kept identical so all existing references re-theme automatically.
const C = {
  bg: "#040816",        // deep navy background
  bgSoft: "#0A1228",    // dark navy panel
  border: "#1A2748",    // navy border
  borderSoft: "rgba(96, 165, 250, 0.14)", // blue-tinted soft border
  text: "#EFF6FF",      // near-white with blue tint
  muted: "#8BA5C8",     // soft blue-gray
  violet: "#3B82F6",    // blue-500  (primary)
  fuchsia: "#0EA5E9",   // sky-500   (secondary)
  amber: "#38BDF8",     // sky-400   (accent)
  cyan: "#22D3EE",      // cyan-400  (highlight)
};

const AURORA = `linear-gradient(90deg, ${C.violet}, ${C.fuchsia}, ${C.amber}, ${C.cyan}, ${C.violet})`;

const ROLES = [
  "MERN Stack Developer",
  "Full Stack Developer",
  "React.js Developer",
  "Node.js & Express Developer",
  "Problem Solver",
];

function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayedRole, setDisplayedRole] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [imgLoaded, setImgLoaded] = useState(false);
  const heroRef = useRef(null);

  useEffect(() => {
    const current = ROLES[roleIndex];
    const speed = isDeleting ? 40 : 85;

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (displayedRole.length < current.length) {
          setDisplayedRole(current.slice(0, displayedRole.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), 1600);
        }
      } else {
        if (displayedRole.length > 0) {
          setDisplayedRole(current.slice(0, displayedRole.length - 1));
        } else {
          setIsDeleting(false);
          setRoleIndex((i) => (i + 1) % ROLES.length);
        }
      }
    }, speed);

    return () => clearTimeout(timeout);
  }, [displayedRole, isDeleting, roleIndex]);

  const handleMouseMove = (e) => {
    const el = heroRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const relX = (e.clientX - rect.left) / rect.width - 0.5;
    const relY = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: relX, y: relY });
  };

  const resetTilt = () => setTilt({ x: 0, y: 0 });

  return (
    <section
      id="home"
      ref={heroRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={resetTilt}
      className="relative min-h-screen w-full overflow-hidden flex items-center"
      style={{ background: C.bg }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700;800&family=Inter:wght@400;500;600;700&display=swap');

        .nb-font-display { font-family: 'Space Grotesk', sans-serif; }
        .nb-font-body { font-family: 'Inter', sans-serif; }

        @keyframes hr-blob-1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(50px, -35px) scale(1.1); }
          66% { transform: translate(-30px, 30px) scale(0.93); }
        }
        @keyframes hr-blob-2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(-40px, 35px) scale(1.06); }
          66% { transform: translate(35px, -25px) scale(0.9); }
        }
        @keyframes hr-blob-3 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(20px, -20px) scale(1.08); }
        }
        @keyframes hr-fade-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes hr-fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes hr-fade-right {
          from { opacity: 0; transform: translateX(50px) scale(0.95); }
          to { opacity: 1; transform: translateX(0) scale(1); }
        }
        @keyframes hr-aurora-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes hr-ring-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes hr-ring-spin-rev {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        @keyframes hr-float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-16px); }
        }
        @keyframes hr-float-slow {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-12px) rotate(5deg); }
        }
        @keyframes hr-pulse-glow {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.05); }
        }
        @keyframes hr-bounce {
          0%, 100% { transform: translateY(0); opacity: 0.4; }
          50% { transform: translateY(10px); opacity: 1; }
        }
        @keyframes hr-blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        @keyframes hr-shine {
          0% { transform: translateX(-120%) skewX(-15deg); }
          100% { transform: translateX(220%) skewX(-15deg); }
        }
        @keyframes hr-orbit-dot {
          from { transform: rotate(0deg) translateX(var(--orbit-r)) rotate(0deg); }
          to { transform: rotate(360deg) translateX(var(--orbit-r)) rotate(-360deg); }
        }
        @keyframes hr-img-reveal {
          from { opacity: 0; transform: scale(1.08); filter: blur(8px); }
          to { opacity: 1; transform: scale(1); filter: blur(0px); }
        }
        @keyframes hr-border-rotate {
          from { --hr-border-angle: 0deg; }
          to { --hr-border-angle: 360deg; }
        }
        @keyframes hr-particle-rise {
          0% { opacity: 0; transform: translateY(0) scale(0); }
          20% { opacity: 1; transform: translateY(-10px) scale(1); }
          100% { opacity: 0; transform: translateY(-80px) scale(0.3); }
        }

        @property --hr-border-angle {
          syntax: '<angle>';
          initial-value: 0deg;
          inherits: false;
        }

        @media (prefers-reduced-motion: reduce) {
          .hr-anim, .hr-anim * { animation: none !important; transition: none !important; }
        }

        .hr-blob-1 { animation: hr-blob-1 16s ease-in-out infinite; }
        .hr-blob-2 { animation: hr-blob-2 18s ease-in-out infinite; }
        .hr-blob-3 { animation: hr-blob-3 12s ease-in-out infinite; }

        .hr-wordmark {
          background-image: ${AURORA};
          background-size: 300% auto;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: hr-aurora-shift 6s ease-in-out infinite;
        }

        .hr-ring-outer { animation: hr-ring-spin 20s linear infinite; }
        .hr-ring-mid { animation: hr-ring-spin-rev 14s linear infinite; }
        .hr-ring-inner { animation: hr-ring-spin 10s linear infinite; }
        .hr-glow { animation: hr-pulse-glow 4s ease-in-out infinite; }

        .hr-badge-1 { animation: hr-float 5.5s ease-in-out infinite; }
        .hr-badge-2 { animation: hr-float 6.5s ease-in-out infinite 0.8s; }
        .hr-badge-3 { animation: hr-float-slow 7.5s ease-in-out infinite 0.4s; }
        .hr-badge-4 { animation: hr-float 6s ease-in-out infinite 1.2s; }

        .hr-cursor { animation: hr-blink 0.85s step-start infinite; }

        .hr-fade-up-1 { animation: hr-fade-up 0.8s cubic-bezier(0.16,1,0.3,1) 0.1s both; }
        .hr-fade-up-2 { animation: hr-fade-up 0.8s cubic-bezier(0.16,1,0.3,1) 0.22s both; }
        .hr-fade-up-3 { animation: hr-fade-up 0.8s cubic-bezier(0.16,1,0.3,1) 0.36s both; }
        .hr-fade-up-4 { animation: hr-fade-up 0.8s cubic-bezier(0.16,1,0.3,1) 0.48s both; }
        .hr-fade-up-5 { animation: hr-fade-up 0.8s cubic-bezier(0.16,1,0.3,1) 0.60s both; }
        .hr-fade-up-6 { animation: hr-fade-up 0.8s cubic-bezier(0.16,1,0.3,1) 0.72s both; }
        .hr-fade-right-1 { animation: hr-fade-right 1s cubic-bezier(0.16,1,0.3,1) 0.3s both; }
        .hr-fade-in-slow { animation: hr-fade-in 1.2s ease 0.6s both; }

        .hr-img-reveal { animation: hr-img-reveal 1.2s cubic-bezier(0.16,1,0.3,1) 0.5s both; }

        .hr-btn-primary { position: relative; overflow: hidden; }
        .hr-btn-primary .hr-shine-el {
          position: absolute; top: 0; left: 0; height: 100%; width: 40%;
          background: linear-gradient(120deg, transparent, rgba(255,255,255,0.5), transparent);
          transform: translateX(-120%) skewX(-15deg);
        }
        .hr-btn-primary:hover .hr-shine-el { animation: hr-shine 0.9s ease forwards; }
        .hr-btn-primary:hover { transform: translateY(-3px); box-shadow: 0 18px 40px -10px ${C.fuchsia}88; }
        .hr-btn-outline:hover { border-color: ${C.violet} !important; background: rgba(59,130,246,0.08) !important; transform: translateY(-3px); box-shadow: 0 12px 28px -10px rgba(59,130,246,0.2); }
        .hr-btn-primary, .hr-btn-outline { transition: transform 0.35s cubic-bezier(0.65,0,0.35,1), box-shadow 0.35s ease, background 0.35s ease, border-color 0.35s ease; }

        .hr-social { transition: transform 0.3s cubic-bezier(0.65,0,0.35,1), color 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease; }
        .hr-social:hover { transform: translateY(-4px); border-color: ${C.violet} !important; color: ${C.text} !important; box-shadow: 0 8px 20px -6px rgba(59,130,246,0.25); }

        .hr-scroll-dot { animation: hr-bounce 2s ease-in-out infinite; }

        .hr-stat { animation: hr-fade-up 0.7s cubic-bezier(0.16,1,0.3,1) both; }

        .hr-grid {
          background-image:
            linear-gradient(${C.borderSoft} 1px, transparent 1px),
            linear-gradient(90deg, ${C.borderSoft} 1px, transparent 1px);
          background-size: 60px 60px;
          -webkit-mask-image: radial-gradient(ellipse 70% 55% at 40% 40%, black 30%, transparent 85%);
          mask-image: radial-gradient(ellipse 70% 55% at 40% 40%, black 30%, transparent 85%);
        }

        .hr-photo-frame {
          position: relative;
        }
        .hr-photo-frame::before {
          content: '';
          position: absolute;
          inset: -3px;
          border-radius: 50%;
          padding: 2px;
          background: conic-gradient(from var(--hr-border-angle, 0deg), ${C.violet}, ${C.fuchsia}, ${C.amber}, ${C.cyan}, ${C.violet});
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          animation: hr-border-rotate 4s linear infinite;
          pointer-events: none;
          opacity: 0.7;
        }

        .hr-orbit-dot {
          animation: hr-orbit-dot var(--orbit-dur) linear infinite;
          animation-delay: var(--orbit-delay, 0s);
        }

        .hr-particle {
          position: absolute;
          width: 3px;
          height: 3px;
          border-radius: 50%;
          animation: hr-particle-rise var(--p-dur) ease-out infinite;
          animation-delay: var(--p-delay, 0s);
        }

        .hr-text-content p,
        .hr-text-content span,
        .hr-text-content h1 {
          line-height: 1.8;
        }
        .hr-text-content h1 {
          line-height: 1.15;
        }
      `}</style>

      {/* ================= Ambient background ================= */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="hr-grid absolute inset-0 opacity-50" />
        <div
          className="hr-blob-1 absolute rounded-full blur-3xl"
          style={{
            width: 550, height: 550, top: "-12%", left: "-8%",
            background: `radial-gradient(circle, ${C.violet}30, transparent 70%)`,
          }}
        />
        <div
          className="hr-blob-2 absolute rounded-full blur-3xl"
          style={{
            width: 480, height: 480, bottom: "-14%", right: "-10%",
            background: `radial-gradient(circle, ${C.cyan}28, transparent 70%)`,
          }}
        />
        <div
          className="hr-blob-3 absolute rounded-full blur-3xl"
          style={{
            width: 350, height: 350, top: "30%", right: "15%",
            background: `radial-gradient(circle, ${C.fuchsia}1e, transparent 70%)`,
          }}
        />
        <div
          className="absolute rounded-full blur-3xl"
          style={{
            width: 250, height: 250, bottom: "20%", left: "10%",
            background: `radial-gradient(circle, ${C.amber}15, transparent 70%)`,
          }}
        />
      </div>

      {/* ================= Main content ================= */}
      <div
        className="relative z-10 mx-auto"
        style={{
          paddingTop: "120px",
          paddingBottom: "80px",
          paddingLeft: "clamp(24px, 5vw, 80px)",
          paddingRight: "clamp(24px, 5vw, 80px)",
          maxWidth: "1400px",
          width: "100%",
        }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-12 lg:gap-8 xl:gap-16 items-center">

          {/* ================= Left: Text Content ================= */}
          <div className="hr-text-content text-center lg:text-left order-2 lg:order-1 max-w-2xl mx-auto lg:mx-0">

            {/* Availability badge */}
            <div className="hr-fade-up-1 inline-flex items-center gap-2.5 px-5 py-2 rounded-full mb-8" style={{ border: `1px solid ${C.borderSoft}`, background: "rgba(59,130,246,0.05)" }}>
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: C.cyan }} />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5" style={{ background: C.cyan }} />
              </span>
              <span className="text-sm font-medium" style={{ color: C.muted, lineHeight: "1.6" }}>
                Available for freelance &amp; full-time roles
              </span>
            </div>

            {/* Greeting */}
            <p className="hr-fade-up-2 nb-font-body text-base sm:text-lg font-medium mb-3 flex items-center justify-center lg:justify-start gap-2" style={{ color: C.muted, lineHeight: "1.8" }}>
              <span>Hello, I'm</span>
              <Sparkles size={16} style={{ color: C.amber }} />
            </p>

            {/* Name heading */}
            <h1 className="hr-fade-up-2 nb-font-display font-extrabold tracking-tight text-4xl sm:text-5xl lg:text-[3.5rem] xl:text-[4.2rem]" style={{ lineHeight: "1.15" }}>
              <span style={{ color: C.text }}>Muhammad</span>
              <br />
              <span className="hr-wordmark">Suleman</span>
            </h1>

            {/* Typewriter role */}
            <div className="hr-fade-up-3 mt-5 flex items-center justify-center lg:justify-start gap-3">
              <span className="inline-block w-8 h-[2px] rounded-full" style={{ background: AURORA }} />
              <p
                className="nb-font-display font-semibold text-xl sm:text-2xl lg:text-[1.75rem]"
                style={{ minHeight: "2.2rem", color: C.cyan, lineHeight: "1.4" }}
              >
                {displayedRole}
                <span className="hr-cursor" style={{ color: C.fuchsia }}>|</span>
              </p>
            </div>

            {/* Description */}
            <p className="hr-fade-up-4 mt-7 text-base sm:text-[17px] max-w-xl mx-auto lg:mx-0" style={{ color: C.muted, lineHeight: "1.9" }}>
              I build fast, scalable, and visually stunning full-stack web
              applications with MongoDB, Express.js, React.js and Node.js —
              turning complex ideas into elegant, high-performance products,
              from database to user interface.
            </p>

            {/* Location */}
            <div className="hr-fade-up-4 mt-5 flex items-center justify-center lg:justify-start gap-2" style={{ lineHeight: "1.8" }}>
              <MapPin size={14} style={{ color: C.fuchsia }} />
              <span className="text-sm" style={{ color: C.muted, lineHeight: "1.8" }}>Pakistan</span>
              <span className="mx-1" style={{ color: C.border }}>•</span>
              <Zap size={14} style={{ color: C.amber }} />
              <span className="text-sm" style={{ color: C.muted, lineHeight: "1.8" }}>3+ Months Experience</span>
            </div>

            {/* CTA Buttons - with top/bottom margin */}
            <div className="hr-fade-up-5 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4" style={{ marginTop: "40px", marginBottom: "40px" }}>
              <a
                href="#projects"
                className="hr-btn-primary nb-font-body inline-flex items-center gap-2.5 rounded-xl text-[15px] font-bold w-full sm:w-auto justify-center"
                style={{
                  color: "#040816",
                  padding: "16px 34px",
                  backgroundImage: `linear-gradient(135deg, ${C.cyan}, ${C.fuchsia}, ${C.amber})`,
                  boxShadow: `0 10px 30px -10px ${C.fuchsia}88`,
                  lineHeight: "1.5",
                }}
              >
                <span className="hr-shine-el" />
                <span className="relative z-10">View My Work</span>
                <svg className="relative z-10" width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8H13M13 8L9.5 4.5M13 8L9.5 11.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
             <a
  href={resume}
  download="Muhammad-Suleman-CV.pdf"
  className="hr-btn-outline nb-font-body inline-flex items-center justify-center gap-2.5 w-full sm:w-auto rounded-xl text-[15px] font-semibold transition-all duration-300 hover:scale-105"
  style={{
    color: C.text,
    border: `1.5px solid ${C.border}`,
    padding: "16px 34px",
    background: "transparent",
    lineHeight: "1.5",
  }}
>
  <Download size={17} />
  Download CV
</a>
            </div>
{/* Socials - with bottom margin */}
<div
  className="hr-fade-up-6 flex items-center justify-center lg:justify-start gap-3"
  style={{ marginBottom: "48px" }}
>
  <span
    className="text-xs font-medium tracking-wider uppercase mr-1"
    style={{ color: C.border, lineHeight: "1.8" }}
  >
    Connect
  </span>

  {[
    {
      icon: FaGithub,
      href: "https://github.com/WithSuleman",
      label: "GitHub",
    },
    {
      icon: FaLinkedin,
      href: "https://www.linkedin.com/in/muhammad-suleman-a97943378",
      label: "LinkedIn",
    },
    {
      icon: Mail,
      href: "#contact",
      label: "Email",
    },
  ].map(({ icon: Icon, href, label }) => (
    <a
      key={label}
      href={href}
      aria-label={label}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      className="hr-social flex items-center justify-center rounded-xl"
      style={{
        width: 46,
        height: 46,
        border: `1.5px solid ${C.border}`,
        color: C.muted,
      }}
    >
      <Icon size={18} />
    </a>
  ))}
</div>

            {/* Stats */}
            <div className="hr-fade-up-6 grid grid-cols-3 gap-4 sm:gap-8 max-w-lg mx-auto lg:mx-0">
              {[
                { value: "3+", label: "Months Exp.", color: C.violet },
                { value: "10+", label: "Projects", color: C.fuchsia },
                { value: "3+", label: "Happy Clients", color: C.cyan },
              ].map((stat, i) => (
                <div
                  key={stat.label}
                  className="hr-stat relative text-center lg:text-left py-3 px-2 rounded-xl"
                  style={{
                    animationDelay: `${0.85 + i * 0.12}s`,
                    background: "rgba(255,255,255,0.02)",
                    border: `1px solid ${C.borderSoft}`,
                  }}
                >
                  <p className="nb-font-display text-2xl sm:text-3xl font-bold" style={{ color: stat.color, lineHeight: "1.3" }}>{stat.value}</p>
                  <p className="text-xs sm:text-sm mt-1 font-medium" style={{ color: C.muted, lineHeight: "1.6" }}>{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ================= Right: Photo + Orbits (CIRCLE) ================= */}
          <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
            <div
              className="hr-fade-right-1 relative"
              style={{
                width: "min(420px, 85vw)",
                height: "min(420px, 85vw)",
                transform: `perspective(1000px) rotateY(${tilt.x * 8}deg) rotateX(${-tilt.y * 6}deg)`,
                transition: "transform 0.3s ease-out",
              }}
            >
              {/* Big circular glow behind photo */}
              <div
                className="hr-glow absolute rounded-full blur-3xl"
                style={{
                  width: "80%",
                  height: "80%",
                  top: "10%",
                  left: "10%",
                  background: `radial-gradient(circle, ${C.fuchsia}35, ${C.violet}20 55%, transparent 75%)`,
                }}
              />

              {/* Outer orbit ring */}
              <svg className="hr-ring-outer absolute" viewBox="0 0 100 100" fill="none" style={{ width: "calc(100% + 48px)", height: "calc(100% + 48px)", left: "-24px", top: "-24px" }}>
                <circle cx="50" cy="50" r="48" stroke="url(#hr-ga)" strokeWidth="0.5" strokeDasharray="2 8" strokeLinecap="round" opacity="0.6" />
              </svg>

              {/* Mid orbit ring */}
              <svg className="hr-ring-mid absolute" viewBox="0 0 100 100" fill="none" style={{ width: "calc(100% + 20px)", height: "calc(100% + 20px)", left: "-10px", top: "-10px" }}>
                <circle cx="50" cy="50" r="48" stroke="url(#hr-gb)" strokeWidth="0.6" strokeDasharray="4 10" strokeLinecap="round" opacity="0.5" />
              </svg>

              {/* Inner orbit ring */}
              <svg className="hr-ring-inner absolute" viewBox="0 0 100 100" fill="none" style={{ width: "calc(100% - 16px)", height: "calc(100% - 16px)", left: "8px", top: "8px" }}>
                <circle cx="50" cy="50" r="47" stroke="url(#hr-gc)" strokeWidth="0.4" strokeDasharray="1 12" strokeLinecap="round" opacity="0.4" />
              </svg>

              <svg width="0" height="0">
                <defs>
                  <linearGradient id="hr-ga" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
                    <stop stopColor={C.violet} />
                    <stop offset="0.5" stopColor={C.fuchsia} />
                    <stop offset="1" stopColor={C.amber} />
                  </linearGradient>
                  <linearGradient id="hr-gb" x1="100" y1="0" x2="0" y2="100" gradientUnits="userSpaceOnUse">
                    <stop stopColor={C.cyan} />
                    <stop offset="0.5" stopColor={C.violet} />
                    <stop offset="1" stopColor={C.fuchsia} />
                  </linearGradient>
                  <linearGradient id="hr-gc" x1="0" y1="100" x2="100" y2="0" gradientUnits="userSpaceOnUse">
                    <stop stopColor={C.amber} />
                    <stop offset="1" stopColor={C.cyan} />
                  </linearGradient>
                </defs>
              </svg>

              {/* Orbit dots */}
              <span
                className="hr-orbit-dot absolute w-2 h-2 rounded-full"
                style={{
                  top: "50%", left: "50%",
                  marginTop: "-4px", marginLeft: "-4px",
                  background: C.cyan,
                  boxShadow: `0 0 8px 2px ${C.cyan}88`,
                  "--orbit-r": "calc(min(420px, 85vw) / 2 + 18px)",
                  "--orbit-dur": "12s",
                  "--orbit-delay": "0s",
                }}
              />
              <span
                className="hr-orbit-dot absolute w-1.5 h-1.5 rounded-full"
                style={{
                  top: "50%", left: "50%",
                  marginTop: "-3px", marginLeft: "-3px",
                  background: C.fuchsia,
                  boxShadow: `0 0 6px 2px ${C.fuchsia}88`,
                  "--orbit-r": "calc(min(420px, 85vw) / 2 + 18px)",
                  "--orbit-dur": "12s",
                  "--orbit-delay": "-4s",
                }}
              />
              <span
                className="hr-orbit-dot absolute w-2.5 h-2.5 rounded-full"
                style={{
                  top: "50%", left: "50%",
                  marginTop: "-5px", marginLeft: "-5px",
                  background: C.amber,
                  boxShadow: `0 0 8px 2px ${C.amber}88`,
                  "--orbit-r": "calc(min(420px, 85vw) / 2 + 6px)",
                  "--orbit-dur": "18s",
                  "--orbit-delay": "-6s",
                }}
              />

              {/* ===== CIRCULAR PHOTO FRAME ===== */}
              <div
                className="hr-photo-frame absolute rounded-full overflow-hidden"
                style={{
                  top: "10%",
                  left: "10%",
                  width: "80%",
                  height: "80%",
                  background: C.bgSoft,
                  boxShadow: `0 30px 80px -20px rgba(0,0,0,0.6), inset 0 1px 0 ${C.borderSoft}`,
                }}
              >
                {/* Placeholder while image loads */}
                {!imgLoaded && (
                  <div className="absolute inset-0 flex items-center justify-center" style={{ background: `linear-gradient(160deg, ${C.bgSoft}, #0f1530)` }}>
                    <div className="text-center">
                      <div className="w-16 h-16 rounded-full mx-auto mb-3 flex items-center justify-center" style={{ border: `2px solid ${C.border}`, background: "rgba(59,130,246,0.05)" }}>
                        <span className="hr-wordmark nb-font-display text-xl font-bold">MS</span>
                      </div>
                      <p className="text-xs" style={{ color: C.muted, lineHeight: "1.6" }}>Loading photo...</p>
                    </div>
                  </div>
                )}

                <img
                  src={profile}
                  alt="Muhammad Suleman — MERN Stack Developer"
                  className="hr-img-reveal w-full h-full object-cover"
                  style={{ opacity: imgLoaded ? 1 : 0 }}
                  onLoad={() => setImgLoaded(true)}
                  onError={(e) => {
                    e.target.style.display = "none";
                    setImgLoaded(false);
                  }}
                />

                {/* Subtle gradient overlay at bottom */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-1/3 pointer-events-none"
                  style={{ background: `linear-gradient(to top, ${C.bgSoft}66, transparent)` }}
                />
              </div>

              {/* ===== Floating MERN Tech Badges ===== */}
              <div
                className="hr-badge-1 absolute flex items-center gap-2 px-3.5 py-2.5 rounded-2xl z-10"
                style={{
                  left: "-12px",
                  top: "10%",
                  background: C.bgSoft,
                  border: `1px solid ${C.border}`,
                  boxShadow: "0 12px 32px -10px rgba(0,0,0,0.6)",
                }}
              >
                <Database size={18} style={{ color: C.cyan }} />
                <span className="text-xs font-semibold" style={{ color: C.text, lineHeight: "1.4" }}>MongoDB</span>
              </div>

              <div
                className="hr-badge-2 absolute flex items-center gap-2 px-3.5 py-2.5 rounded-2xl z-10"
                style={{
                  right: "-8px",
                  top: "28%",
                  background: C.bgSoft,
                  border: `1px solid ${C.border}`,
                  boxShadow: "0 12px 32px -10px rgba(0,0,0,0.6)",
                }}
              >
                <Server size={18} style={{ color: C.fuchsia }} />
                <span className="text-xs font-semibold" style={{ color: C.text, lineHeight: "1.4" }}>Express.js</span>
              </div>

              <div
                className="hr-badge-3 absolute flex items-center gap-2 px-3.5 py-2.5 rounded-2xl z-10"
                style={{
                  right: "-6px",
                  bottom: "28%",
                  background: C.bgSoft,
                  border: `1px solid ${C.border}`,
                  boxShadow: "0 12px 32px -10px rgba(0,0,0,0.6)",
                }}
              >
                <Code2 size={18} style={{ color: C.amber }} />
                <span className="text-xs font-semibold" style={{ color: C.text, lineHeight: "1.4" }}>React.js</span>
              </div>

              <div
                className="hr-badge-4 absolute flex items-center gap-2 px-3.5 py-2.5 rounded-2xl z-10"
                style={{
                  left: "-10px",
                  bottom: "10%",
                  background: C.bgSoft,
                  border: `1px solid ${C.border}`,
                  boxShadow: "0 12px 32px -10px rgba(0,0,0,0.6)",
                }}
              >
                <Hexagon size={18} style={{ color: C.violet }} />
                <span className="text-xs font-semibold" style={{ color: C.text, lineHeight: "1.4" }}>Node.js</span>
              </div>

              {/* Decorative particles */}
              <span className="hr-particle" style={{ left: "5%", top: "50%", background: C.violet, "--p-dur": "4s", "--p-delay": "0s" }} />
              <span className="hr-particle" style={{ left: "90%", top: "40%", background: C.fuchsia, "--p-dur": "5s", "--p-delay": "1.5s" }} />
              <span className="hr-particle" style={{ left: "50%", top: "5%", background: C.cyan, "--p-dur": "4.5s", "--p-delay": "0.8s" }} />
              <span className="hr-particle" style={{ left: "15%", top: "85%", background: C.amber, "--p-dur": "3.8s", "--p-delay": "2.2s" }} />
              <span className="hr-particle" style={{ left: "80%", top: "80%", background: C.violet, "--p-dur": "5.5s", "--p-delay": "3s" }} />
            </div>
          </div>
        </div>
      </div>

      {/* ================= Scroll indicator ================= */}
      <a
        href="#about"
        className="hr-fade-in-slow absolute bottom-7 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center gap-2 z-10"
        aria-label="Scroll to About section"
      >
        <span className="text-[11px] tracking-[0.2em] uppercase font-medium" style={{ color: C.muted, lineHeight: "1.6" }}>Scroll Down</span>
        <span
          className="flex items-center justify-center rounded-full"
          style={{ width: 34, height: 34, border: `1.5px solid ${C.border}` }}
        >
          <ArrowDown className="hr-scroll-dot" size={14} style={{ color: C.cyan }} />
        </span>
      </a>
    </section>
  );
}

export default Hero;