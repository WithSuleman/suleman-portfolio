import { useEffect, useRef, useState, useCallback } from "react";
import { FaAward, FaExternalLinkAlt, FaCheckCircle, FaClock, FaTrophy, FaStar } from "react-icons/fa";
import certificateImage from "../assets/images/certificates/javascript-full-stack-developer.png";
import certificateImage2 from "../assets/images/certificates/javascript.png";
import certificateImage3 from "../assets/images/certificates/internship-frontend-developer.png";

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
  rose: "#F43F5E",
  roseSoft: "rgba(244,63,94,0.1)",
};

const AURORA = `linear-gradient(90deg,${C.violet},${C.pink},${C.amber},${C.cyan},${C.violet})`;
const AURORA_RADIAL = `radial-gradient(ellipse at 50% 50%,${C.violet}22,${C.pink}11,${C.cyan}08,transparent 70%)`;

/* ═══════════════════════════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════════════════════════ */
const certificates = [
  {
    id: 1,
    title: "JavaScript Full Stack Developer",
    issuer: "Professional Certificate",
    year: "2026",
    image: certificateImage,
    description:
      "Successfully completed the JavaScript Full Stack Developer program covering modern JavaScript, React, frontend development fundamentals and practical real-world projects.",
    tags: ["JavaScript", "React", "HTML5", "CSS3", "Tailwind CSS"],
    accent: C.cyan,
    soft: C.cyanSoft,
    duration: "120+ Hours",
    level: "Advanced",
    score: "98%",
  },
  {
    id: 2,
    title: "JavaScript",
    issuer: "Professional Certificate",
    year: "2026",
    image: certificateImage2,
    description:
      "Successfully completed the JavaScript program covering modern JavaScript, frontend development fundamentals and practical projects with a focus on core language mastery.",
    tags: ["JavaScript", "ES6+", "DOM", "Async"],
    accent: C.violet,
    soft: C.violetSoft,
    duration: "80+ Hours",
    level: "Intermediate",
    score: "95%",
  },
  {
    id: 3,
    title: "Internship Frontend Developer",
    issuer: "Professional",
    year: "2026",
    image: certificateImage3,
    description:
      "Successfully completed a professional internship as a Frontend Developer, gaining hands-on experience in building responsive, interactive web applications using modern frameworks, collaborative development workflows and industry best practices.",
    tags: ["HTML5", "CSS3", "JavaScript", "React", "Responsive Design"],
    accent: C.emerald,
    soft: C.emeraldSoft,
    duration: "160+ Hours",
    level: "Professional",
    score: "97%",
  },
];

const stats = [
  { label: "Certificates", value: 3, suffix: "+", icon: FaAward, color: C.amber },
  { label: "Skills Covered", value: 12, suffix: "+", icon: FaStar, color: C.violet },
  { label: "Learning Hours", value: 360, suffix: "+", icon: FaClock, color: C.cyan },
  { label: "Avg Score", value: 97, suffix: "%", icon: FaTrophy, color: C.emerald },
];

const PARTICLES = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 2.5 + 0.6,
  dur: Math.random() * 25 + 15,
  del: Math.random() * -25,
  op: Math.random() * 0.2 + 0.03,
  color: [C.violet, C.pink, C.cyan, C.amber, C.emerald][i % 5],
  dx: (Math.random() - 0.5) * 40,
  dy: (Math.random() - 0.5) * 40,
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
      ([e]) => {
        if (e.isIntersecting) { setInView(true); obs.disconnect(); }
      },
      { threshold, rootMargin: "0px 0px -60px 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

function useScrollProgress() {
  const ref = useRef(null);
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const h = el.offsetHeight;
      const wh = window.innerHeight;
      const start = wh;
      const end = -h;
      const p = 1 - (rect.top - end) / (start - end);
      setProgress(Math.max(0, Math.min(1, p)));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return [ref, progress];
}

function useMouseGlow() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onMove = (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      el.style.setProperty("--mx", `${x}px`);
      el.style.setProperty("--my", `${y}px`);
    };
    el.addEventListener("mousemove", onMove, { passive: true });
    return () => el.removeEventListener("mousemove", onMove);
  }, []);
  return ref;
}

/* ═══════════════════════════════════════════════════════════════
   ANIMATED COUNTER
   ═══════════════════════════════════════════════════════════════ */
function AnimatedCounter({ target, suffix, visible, duration = 1800 }) {
  const [val, setVal] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!visible || hasAnimated.current) return;
    hasAnimated.current = true;
    const start = performance.now();
    const step = (now) => {
      const elapsed = now - start;
      const p = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - p, 4);
      setVal(Math.round(eased * target));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [visible, target, duration]);

  return (
    <span>
      {val}
      <span className="inline-block ml-0.5" style={{ color: "inherit", opacity: 0.7 }}>{suffix}</span>
    </span>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MAGNETIC BUTTON
   ═══════════════════════════════════════════════════════════════ */
function MagneticButton({ children, className, style, ...props }) {
  const ref = useRef(null);

  const onMove = useCallback((e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    el.style.transform = `translate(${x * 0.2}px, ${y * 0.25}px) scale(1.04)`;
    el.style.transition = "transform 0.3s cubic-bezier(0.23,1,0.32,1)";
  }, []);

  const onLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "translate(0,0) scale(1)";
    el.style.transition = "transform 0.5s cubic-bezier(0.23,1,0.32,1)";
  }, []);

  return (
    <a
      ref={ref}
      className={className}
      style={{
        ...style,
        display: "inline-flex",
        willChange: "transform",
      }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      {...props}
    >
      {children}
    </a>
  );
}

/* ═══════════════════════════════════════════════════════════════
   3D TILT CARD WITH GLOW
   ═══════════════════════════════════════════════════════════════ */
function TiltCard({ children, className, style, glowColor }) {
  const ref = useRef(null);
  const rafRef = useRef(null);

  const onMove = useCallback((e) => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      el.style.transform = `perspective(1000px) rotateX(${y * -6}deg) rotateY(${x * 6}deg) scale3d(1.015,1.015,1.015)`;
      el.style.setProperty("--glow-x", `${e.clientX - r.left}px`);
      el.style.setProperty("--glow-y", `${e.clientY - r.top}px`);
    });
  }, []);

  const onLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "perspective(1000px) rotateX(0) rotateY(0) scale3d(1,1,1)";
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        ...style,
        "--glow-color": glowColor || C.violet,
        transition: "transform 0.6s cubic-bezier(0.03,0.98,0.52,0.99), border-color 0.4s ease, box-shadow 0.4s ease, background 0.4s ease",
        willChange: "transform",
        transformStyle: "preserve-3d",
      }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {children}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   PROGRESS RING
   ═══════════════════════════════════════════════════════════════ */
function ProgressRing({ percentage, color, visible, delay = 0 }) {
  const [offset, setOffset] = useState(314);
  const radius = 50;
  const circumference = 2 * Math.PI * radius;

  useEffect(() => {
    if (!visible) return;
    const t = setTimeout(() => {
      setOffset(circumference - (percentage / 100) * circumference);
    }, delay);
    return () => clearTimeout(t);
  }, [visible, percentage, circumference, delay]);

  return (
    <svg width="56" height="56" viewBox="0 0 120 120" className="cr-progress-ring -rotate-90">
      <circle
        cx="60" cy="60" r={radius}
        fill="none"
        stroke={color + "15"}
        strokeWidth="8"
      />
      <circle
        cx="60" cy="60" r={radius}
        fill="none"
        stroke={color}
        strokeWidth="8"
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        style={{
          transition: "stroke-dashoffset 1.8s cubic-bezier(0.16,1,0.3,1)",
          filter: `drop-shadow(0 0 6px ${color}66)`,
        }}
      />
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════════
   LIGHTBOX
   ═══════════════════════════════════════════════════════════════ */
function Lightbox({ src, alt, onClose }) {
  const ref = useRef(null);

  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const onBackdrop = useCallback((e) => {
    if (e.target === ref.current) onClose();
  }, [onClose]);

  return (
    <div
      ref={ref}
      onClick={onBackdrop}
      className="cr-lightbox-backdrop fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-8"
    >
      <div className="cr-lightbox-card relative max-w-4xl w-full max-h-[90vh] overflow-hidden rounded-2xl"
        style={{
          background: C.surface,
          border: `1px solid ${C.border}`,
          boxShadow: `0 40px 100px -20px rgba(0,0,0,0.8), 0 0 80px ${C.violet}15`,
        }}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-all duration-300 backdrop-blur-md"
          style={{ background: "rgba(0,0,0,0.4)", border: "1px solid rgba(255,255,255,0.1)" }}
        >
          ✕
        </button>
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-contain"
          style={{ maxHeight: "85vh" }}
        />
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   STAT CARD
   ═══════════════════════════════════════════════════════════════ */
function StatCard({ stat, index, visible }) {
  return (
    <div
      className="cr-stat-card group relative flex flex-col items-center gap-3 p-5 sm:p-6 rounded-2xl text-center"
      style={{
        background: C.surface,
        border: `1px solid ${C.border}`,
        animation: visible
          ? `cr-stat-in 0.7s cubic-bezier(0.16,1,0.3,1) ${0.3 + index * 0.12}s both`
          : "none",
        opacity: visible ? undefined : 0,
      }}
    >
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:rotate-3"
        style={{
          background: stat.color + "12",
          border: `1px solid ${stat.color}20`,
          color: stat.color,
          boxShadow: `0 0 20px ${stat.color}08`,
        }}
      >
        <stat.icon size={20} />
      </div>
      <div
        className="cr-font-display text-2xl sm:text-3xl font-extrabold leading-none"
        style={{ color: stat.color }}
      >
        <AnimatedCounter target={stat.value} suffix={stat.suffix} visible={visible} />
      </div>
      <span className="text-xs font-medium tracking-wider uppercase" style={{ color: C.muted }}>
        {stat.label}
      </span>
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${stat.color}08, transparent 70%)`,
        }}
      />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   CERTIFICATE CARD — WORLD CLASS
   ═══════════════════════════════════════════════════════════════ */
function CertCard({ cert, index, visible, isReversed, onOpenLightbox }) {
  const scoreNum = parseInt(cert.score);

  return (
    <TiltCard
      className="cr-card group relative overflow-hidden rounded-2xl lg:rounded-3xl"
      style={{
        background: C.surface,
        border: `1px solid ${C.border}`,
        animation: visible
          ? `cr-card-reveal 0.9s cubic-bezier(0.16,1,0.3,1) ${0.1 + index * 0.25}s both`
          : "none",
        opacity: visible ? undefined : 0,
      }}
      glowColor={cert.accent}
    >
      {/* Holographic border */}
      <div className="cr-card-holo-border" />

      {/* Mouse-following glow */}
      <div className="cr-card-glow" />

      {/* Scan line effect */}
      <div className="cr-scan-line" />

      <div className="grid lg:grid-cols-5" style={isReversed ? { direction: "ltr" } : {}}>
        {/* ── IMAGE ── */}
        <div
          className={`relative overflow-hidden lg:col-span-2 ${isReversed ? "lg:order-2" : ""}`}
          style={{ minHeight: "260px" }}
        >
          <img
            src={cert.image}
            alt={cert.title}
            className="cr-img h-full w-full object-cover"
            loading="lazy"
          />

          {/* Multi-layer overlay */}
          <div className="cr-img-overlay-1 absolute inset-0" />
          <div className="cr-img-overlay-2 absolute inset-0" />

          {/* Certified badge */}
          <div
            className="absolute top-4 left-4 z-10 flex items-center gap-2 px-3.5 py-2 rounded-full backdrop-blur-xl cr-badge-float"
            style={{
              background: `linear-gradient(135deg, ${cert.accent}20, ${cert.accent}08)`,
              border: `1px solid ${cert.accent}30`,
              color: cert.accent,
            }}
          >
            <FaCheckCircle size={13} className="cr-badge-pulse" />
            <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.14em] uppercase">
              Verified
            </span>
          </div>

          {/* Year watermark */}
          <div
            className="absolute bottom-3 right-3 z-10 cr-font-display text-5xl sm:text-6xl lg:text-7xl font-black leading-none select-none"
            style={{ color: `${cert.accent}12` }}
          >
            {cert.year}
          </div>

          {/* Corner accent lines */}
          <div className="absolute top-0 left-0 w-16 h-16">
            <div className="absolute top-0 left-0 w-full h-px" style={{ background: `linear-gradient(90deg, ${cert.accent}40, transparent)` }} />
            <div className="absolute top-0 left-0 h-full w-px" style={{ background: `linear-gradient(180deg, ${cert.accent}40, transparent)` }} />
          </div>
          <div className="absolute bottom-0 right-0 w-16 h-16">
            <div className="absolute bottom-0 right-0 w-full h-px" style={{ background: `linear-gradient(270deg, ${cert.accent}40, transparent)` }} />
            <div className="absolute bottom-0 right-0 h-full w-px" style={{ background: `linear-gradient(0deg, ${cert.accent}40, transparent)` }} />
          </div>
        </div>

        {/* ── CONTENT ── */}
        <div
          className={`flex flex-col justify-center p-6 sm:p-8 lg:p-9 xl:p-10 lg:col-span-3 ${isReversed ? "lg:order-1" : ""}`}
        >
          {/* Meta row */}
          <div className="flex items-center gap-3 mb-5 flex-wrap">
            <div
              className="flex items-center gap-2 text-[10px] sm:text-[11px] font-bold tracking-[0.16em] uppercase px-3 py-1.5 rounded-lg"
              style={{
                color: cert.accent,
                background: cert.soft,
                border: `1px solid ${cert.accent}18`,
              }}
            >
              <FaAward size={11} />
              {cert.issuer}
            </div>
            <div
              className="flex items-center gap-1.5 text-[10px] sm:text-[11px] font-bold tracking-wider uppercase px-3 py-1.5 rounded-lg"
              style={{
                color: C.amber,
                background: C.amberSoft,
                border: `1px solid rgba(245,158,11,0.15)`,
              }}
            >
              <FaClock size={10} />
              {cert.duration}
            </div>
            <div
              className="flex items-center gap-1.5 text-[10px] sm:text-[11px] font-bold tracking-wider uppercase px-3 py-1.5 rounded-lg"
              style={{
                color: C.emerald,
                background: C.emeraldSoft,
                border: `1px solid rgba(16,185,129,0.15)`,
              }}
            >
              <FaStar size={10} />
              {cert.level}
            </div>
          </div>

          {/* Title */}
          <h3
            className="cr-font-display text-xl sm:text-2xl lg:text-[1.7rem] font-extrabold leading-tight mb-3"
            style={{ color: C.text }}
          >
            {cert.title}
          </h3>

          {/* Description */}
          <p
            className="text-[13px] sm:text-sm leading-[1.9] mb-6"
            style={{ color: C.muted }}
          >
            {cert.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-7">
            {cert.tags.map((tag, i) => (
              <span
                key={tag}
                className="cr-tag text-[11px] sm:text-xs px-3 py-1.5 rounded-lg cursor-default font-medium"
                style={{
                  color: cert.accent,
                  background: cert.soft,
                  border: `1px solid ${cert.accent}12`,
                  animation: visible
                    ? `cr-tag-pop 0.5s cubic-bezier(0.16,1,0.3,1) ${0.7 + index * 0.25 + i * 0.07}s both`
                    : "none",
                  opacity: visible ? undefined : 0,
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Bottom row: score ring + button */}
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <ProgressRing
                percentage={scoreNum}
                color={cert.accent}
                visible={visible}
                delay={900 + index * 250}
              />
              <div>
                <div className="cr-font-display text-lg font-bold" style={{ color: cert.accent }}>
                  {cert.score}
                </div>
                <div className="text-[10px] font-semibold tracking-wider uppercase" style={{ color: C.muted }}>
                  Score
                </div>
              </div>
            </div>

            <MagneticButton
              href="#"
              onClick={(e) => { e.preventDefault(); onOpenLightbox(cert.image, cert.title); }}
              className="cr-view-btn items-center gap-2.5 px-6 py-3 rounded-xl text-[13px] font-bold tracking-wide"
              style={{
                color: "#05060E",
                backgroundImage: `linear-gradient(135deg, ${cert.accent}, ${C.violet})`,
                boxShadow: `0 8px 30px -8px ${cert.accent}40`,
              }}
            >
              <span className="cr-shine-el" />
              <span className="cr-ripple-el" />
              <FaExternalLinkAlt size={12} />
              <span>View Certificate</span>
            </MagneticButton>
          </div>
        </div>
      </div>
    </TiltCard>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MAIN CERTIFICATES SECTION
   ═══════════════════════════════════════════════════════════════ */
function Certificates() {
  const [headRef, headIn] = useInView(0.2);
  const [statsRef, statsIn] = useInView(0.2);
  const [gridRef, gridIn] = useInView(0.05);
  const [sectionRef, scrollProgress] = useScrollProgress();
  const mouseGlowRef = useMouseGlow();
  const [lightbox, setLightbox] = useState(null);

  const openLightbox = useCallback((src, alt) => setLightbox({ src, alt }), []);
  const closeLightbox = useCallback(() => setLightbox(null), []);

  return (
    <section
      id="certificates"
      ref={sectionRef}
      className="cr-font-body relative overflow-hidden"
      style={{ background: C.bg, scrollMarginTop: "88px" }}
    >
      {/* ════════ ALL STYLES ════════ */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700;800&family=Inter:wght@300;400;500;600;700&display=swap');

        .cr-font-display{font-family:'Space Grotesk',sans-serif}
        .cr-font-body{font-family:'Inter',sans-serif}

        /* ── Scroll Progress Bar ── */
        .cr-scroll-progress{
          position:absolute;top:0;left:0;height:2px;z-index:50;
          background:${AURORA};background-size:300% auto;
          animation:cr-aurora-shift 4s ease-in-out infinite;
          transition:width 0.1s linear;
          box-shadow:0 0 20px ${C.violet}66,0 0 40px ${C.pink}33;
        }

        /* ── Keyframes ── */
        @keyframes cr-fade-up{
          from{opacity:0;transform:translateY(50px) scale(0.97)}
          to{opacity:1;transform:translateY(0) scale(1)}
        }
        @keyframes cr-card-reveal{
          from{opacity:0;transform:translateY(60px) rotateX(4deg) scale(0.95)}
          to{opacity:1;transform:translateY(0) rotateX(0) scale(1)}
        }
        @keyframes cr-stat-in{
          from{opacity:0;transform:translateY(30px) scale(0.9)}
          to{opacity:1;transform:translateY(0) scale(1)}
        }
        @keyframes cr-aurora-shift{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}
        @keyframes cr-underline{from{transform:scaleX(0)}to{transform:scaleX(1)}}
        @keyframes cr-blob{
          0%,100%{transform:translate(0,0) scale(1)}
          25%{transform:translate(30px,-25px) scale(1.08)}
          50%{transform:translate(-20px,20px) scale(0.92)}
          75%{transform:translate(15px,-10px) scale(1.04)}
        }
        @keyframes cr-blob-2{
          0%,100%{transform:translate(0,0) scale(1)}
          33%{transform:translate(-25px,20px) scale(1.05)}
          66%{transform:translate(20px,-15px) scale(0.93)}
        }
        @keyframes cr-particle{
          0%,100%{transform:translate(0,0);opacity:var(--po)}
          25%{transform:translate(var(--dx),calc(var(--dy) * -1));opacity:calc(var(--po)*1.8)}
          50%{transform:translate(calc(var(--dx)*-0.5),calc(var(--dy)*-1.5));opacity:var(--po)}
          75%{transform:translate(calc(var(--dx)*0.8),calc(var(--dy)*0.5));opacity:calc(var(--po)*0.4)}
        }
        @keyframes cr-tag-pop{
          from{opacity:0;transform:translateY(10px) scale(0.8)}
          to{opacity:1;transform:translateY(0) scale(1)}
        }
        @keyframes cr-badge-float{
          0%,100%{transform:translateY(0)}
          50%{transform:translateY(-3px)}
        }
        @keyframes cr-badge-pulse{
          0%,100%{opacity:1}
          50%{opacity:0.5}
        }
        @keyframes cr-scan{
          0%{top:-10%;opacity:0}
          10%{opacity:0.4}
          90%{opacity:0.4}
          100%{top:110%;opacity:0}
        }
        @keyframes cr-shine-anim{
          0%{transform:translateX(-200%) skewX(-20deg)}
          100%{transform:translateX(300%) skewX(-20deg)}
        }
        @keyframes cr-text-shimmer{
          0%{background-position:-200% center}
          100%{background-position:200% center}
        }
        @keyframes cr-ring-pulse{
          0%,100%{filter:drop-shadow(0 0 4px var(--ring-color))}
          50%{filter:drop-shadow(0 0 12px var(--ring-color))}
        }
        @keyframes cr-glow-orbit{
          0%{transform:rotate(0deg) translateX(140px) rotate(0deg)}
          100%{transform:rotate(360deg) translateX(140px) rotate(-360deg)}
        }

        @media(prefers-reduced-motion:reduce){
          .cr-anim,.cr-anim *{animation-duration:0.01ms!important;animation-iteration-count:1!important;transition-duration:0.01ms!important}
        }

        /* ── Grid BG ── */
        .cr-grid{
          background-image:
            radial-gradient(circle,${C.borderSoft} 1px,transparent 1px),
            linear-gradient(rgba(139,92,246,0.02) 1px,transparent 1px);
          background-size:40px 40px,40px 40px;
          -webkit-mask-image:radial-gradient(ellipse 70% 60% at 50% 40%,black 10%,transparent 75%);
          mask-image:radial-gradient(ellipse 70% 60% at 50% 40%,black 10%,transparent 75%);
        }

        /* ── Aurora text ── */
        .cr-wordmark{
          background-image:${AURORA};background-size:300% auto;
          -webkit-background-clip:text;background-clip:text;
          -webkit-text-fill-color:transparent;
          animation:cr-aurora-shift 5s ease-in-out infinite;
        }

        /* ── Shimmer text ── */
        .cr-shimmer-text{
          background:linear-gradient(90deg,${C.textSec} 0%,${C.text} 25%,${C.amber} 50%,${C.text} 75%,${C.textSec} 100%);
          background-size:200% auto;
          -webkit-background-clip:text;background-clip:text;
          -webkit-text-fill-color:transparent;
          animation:cr-text-shimmer 4s linear infinite;
        }

        /* ── Underline ── */
        .cr-underline-el{transform-origin:center;animation:cr-underline 1s cubic-bezier(.65,0,.35,1) .5s both}

        /* ── Blobs ── */
        .cr-blob-1{animation:cr-blob 20s ease-in-out infinite}
        .cr-blob-2{animation:cr-blob-2 25s ease-in-out infinite}

        /* ── Noise ── */
        .cr-noise::after{
          content:'';position:absolute;inset:0;opacity:.02;pointer-events:none;z-index:1;
          background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          background-repeat:repeat;background-size:128px 128px;
        }

        /* ── Mouse glow on section ── */
        .cr-mouse-glow::before{
          content:'';position:absolute;width:500px;height:500px;border-radius:50%;
          background:radial-gradient(circle,${C.violet}08,transparent 60%);
          left:var(--mx,50%);top:var(--my,50%);
          transform:translate(-50%,-50%);pointer-events:none;z-index:2;
          transition:opacity 0.3s ease;opacity:0;
        }
        .cr-mouse-glow:hover::before{opacity:1}

        /* ── Certificate Card ── */
        .cr-card{
          transition:border-color 0.5s ease,box-shadow 0.5s ease,background 0.5s ease;
        }
        .cr-card:hover{
          border-color:rgba(139,92,246,.25);
          box-shadow:
            0 30px 70px -20px rgba(139,92,246,.18),
            0 0 0 1px rgba(139,92,246,.1),
            inset 0 1px 0 rgba(255,255,255,.03);
          background:${C.surfaceAlt};
        }

        /* Holographic border */
        .cr-card-holo-border{
          position:absolute;inset:-1px;border-radius:inherit;padding:1.5px;z-index:3;pointer-events:none;
          background-image:conic-gradient(from 0deg,${C.violet},${C.pink},${C.amber},${C.cyan},${C.emerald},${C.violet});
          -webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);
          -webkit-mask-composite:xor;mask-composite:exclude;
          opacity:0;transition:opacity 0.6s ease;
          animation:cr-aurora-shift 3s linear infinite;
          background-size:100% 100%;
        }
        .cr-card:hover .cr-card-holo-border{opacity:0.6}

        /* Mouse-following card glow */
        .cr-card-glow{
          position:absolute;inset:0;border-radius:inherit;pointer-events:none;z-index:1;
          background:radial-gradient(300px circle at var(--glow-x,50%) var(--glow-y,50%),var(--glow-color,${C.violet})08,transparent 60%);
          opacity:0;transition:opacity 0.4s ease;
        }
        .cr-card:hover .cr-card-glow{opacity:1}

        /* Scan line */
        .cr-scan-line{
          position:absolute;left:0;right:0;height:60px;z-index:4;pointer-events:none;
          background:linear-gradient(180deg,transparent,var(--glow-color,${C.violet})06,transparent);
          opacity:0;
        }
        .cr-card:hover .cr-scan-line{
          opacity:1;
          animation:cr-scan 3s ease-in-out infinite;
        }

        /* Image */
        .cr-img{transition:transform 0.7s cubic-bezier(.16,1,.3,1),filter 0.5s ease}
        .cr-card:hover .cr-img{transform:scale(1.08);filter:brightness(.55) saturate(1.15)}

        /* Image overlays */
        .cr-img-overlay-1{
          background:linear-gradient(135deg,rgba(5,6,14,.5) 0%,transparent 40%,rgba(5,6,14,.6) 100%);
          transition:opacity 0.5s ease;opacity:1;
        }
        .cr-card:hover .cr-img-overlay-1{opacity:1}

        .cr-img-overlay-2{
          background:linear-gradient(to right,rgba(5,6,14,.7) 0%,transparent 50%);
          transition:opacity 0.5s ease;opacity:0;
        }
        .cr-card:hover .cr-img-overlay-2{opacity:1}

        /* Badge float */
        .cr-badge-float{animation:cr-badge-float 3s ease-in-out infinite}
        .cr-badge-pulse{animation:cr-badge-pulse 2s ease-in-out infinite}

        /* Tags */
        .cr-tag{
          transition:transform 0.35s cubic-bezier(.65,0,.35,1),border-color 0.35s ease,background 0.35s ease,box-shadow 0.35s ease,color 0.35s ease;
          position:relative;overflow:hidden;
        }
        .cr-tag::before{
          content:'';position:absolute;inset:0;
          background:linear-gradient(135deg,transparent,rgba(255,255,255,.06),transparent);
          transform:translateX(-100%);transition:transform 0.5s ease;
        }
        .cr-tag:hover::before{transform:translateX(100%)}
        .cr-tag:hover{
          transform:translateY(-3px) scale(1.06);
          border-color:rgba(139,92,246,.35);
          box-shadow:0 8px 20px -8px rgba(139,92,246,.25);
          background:rgba(139,92,246,.15);
          color:#fff;
        }

        /* View button */
        .cr-view-btn{
          position:relative;overflow:hidden;
          transition:box-shadow 0.4s ease;
          text-decoration:none;
        }
        .cr-view-btn .cr-shine-el{
          position:absolute;top:0;left:0;height:100%;width:50%;
          background:linear-gradient(120deg,transparent,rgba(255,255,255,.4),transparent);
          transform:translateX(-200%) skewX(-20deg);
          pointer-events:none;
        }
        .cr-view-btn:hover .cr-shine-el{animation:cr-shine-anim 0.9s ease forwards}
        .cr-view-btn:hover{box-shadow:0 14px 40px -10px ${C.violet}55}
        .cr-view-btn:active{transform:translate(0,-1px) scale(0.98)!important}

        /* Ripple */
        .cr-ripple-el{
          position:absolute;border-radius:50%;
          background:rgba(255,255,255,.25);
          transform:scale(0);pointer-events:none;
        }

        /* Stat card */
        .cr-stat-card{
          transition:transform 0.4s cubic-bezier(.65,0,.35,1),border-color 0.4s ease,box-shadow 0.4s ease,background 0.4s ease;
        }
        .cr-stat-card:hover{
          transform:translateY(-4px) scale(1.02);
          border-color:rgba(139,92,246,.2);
          box-shadow:0 20px 40px -15px rgba(139,92,246,.15);
          background:${C.surfaceAlt};
        }

        /* Progress ring */
        .cr-progress-ring{
          transition:transform 0.3s ease;
        }
        .cr-card:hover .cr-progress-ring{
          animation:cr-ring-pulse 2s ease-in-out infinite;
          --ring-color:${C.violet}66;
        }

        /* Lightbox */
        .cr-lightbox-backdrop{
          background:rgba(2,3,8,0.88);
          backdrop-filter:blur(20px);
          -webkit-backdrop-filter:blur(20px);
          animation:cr-fade-up 0.4s cubic-bezier(0.16,1,0.3,1) both;
        }
        .cr-lightbox-card{
          animation:cr-card-reveal 0.5s cubic-bezier(0.16,1,0.3,1) 0.1s both;
        }

        /* ── Responsive ── */
        @media(max-width:1023px){
          .cr-card:hover{transform:none!important}
        }
      `}</style>

      {/* ════════ SCROLL PROGRESS ════════ */}
      <div
        className="cr-scroll-progress"
        style={{ width: `${scrollProgress * 100}%` }}
      />

      {/* ════════ TOP DIVIDER ════════ */}
      <div
        className="absolute top-0 left-0 right-0 h-px z-10"
        style={{
          backgroundImage: AURORA,
          backgroundSize: "300% auto",
          opacity: 0.4,
          animation: "cr-aurora-shift 5s ease-in-out infinite",
          boxShadow: `0 0 30px ${C.violet}33, 0 0 60px ${C.pink}15`,
        }}
      />

      {/* ════════ AMBIENT BACKGROUND ════════ */}
      <div ref={mouseGlowRef} className="cr-anim cr-noise cr-mouse-glow absolute inset-0 pointer-events-none">
        <div className="cr-grid absolute inset-0 opacity-40" />

        {/* Primary blobs */}
        <div
          className="cr-blob-1 absolute rounded-full"
          style={{
            width: 550, height: 550,
            top: "-10%", left: "-18%",
            background: `radial-gradient(circle,${C.amber}10,${C.amber}04,transparent 70%)`,
            filter: "blur(80px)",
          }}
        />
        <div
          className="cr-blob-2 absolute rounded-full"
          style={{
            width: 480, height: 480,
            bottom: "-5%", right: "-14%",
            background: `radial-gradient(circle,${C.violet}12,${C.pink}06,transparent 70%)`,
            filter: "blur(75px)",
          }}
        />
        <div
          className="cr-blob-1 absolute rounded-full"
          style={{
            width: 350, height: 350,
            top: "40%", left: "50%",
            transform: "translateX(-50%)",
            background: `radial-gradient(circle,${C.cyan}08,transparent 70%)`,
            filter: "blur(70px)",
            animationDelay: "-5s",
          }}
        />

        {/* Particles */}
        {PARTICLES.map((p) => (
          <div
            key={p.id}
            className="absolute rounded-full"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.size,
              height: p.size,
              background: p.color,
              "--po": p.op,
              "--dx": `${p.dx}px`,
              "--dy": `${p.dy}px`,
              animation: `cr-particle ${p.dur}s ease-in-out ${p.del}s infinite`,
              opacity: p.op,
              filter: p.size > 2 ? `blur(1px) drop-shadow(0 0 3px ${p.color}44)` : "none",
            }}
          />
        ))}

        {/* Orbiting glow dot */}
        <div
          className="absolute"
          style={{
            left: "50%", top: "45%",
            width: "4px", height: "4px",
            borderRadius: "50%",
            background: C.violet,
            boxShadow: `0 0 12px ${C.violet}, 0 0 24px ${C.violet}66`,
            animation: "cr-glow-orbit 30s linear infinite",
            opacity: 0.4,
            filter: "blur(0.5px)",
          }}
        />
      </div>

      {/* ════════ CONTENT ════════ */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-36 xl:py-44">

        {/* ════════════════ HEADING ════════════════ */}
        <div
          ref={headRef}
          className="text-center mb-14 lg:mb-20"
          style={
            headIn
              ? { animation: "cr-fade-up 0.8s cubic-bezier(0.16,1,0.3,1) both" }
              : { opacity: 0 }
          }
        >
          {/* Top badge */}
          <div className="flex justify-center mb-6">
            <span
              className="cr-badge-float inline-flex items-center gap-2.5 text-[10px] sm:text-[11px] font-bold tracking-[0.2em] uppercase px-5 py-2.5 rounded-full"
              style={{
                color: C.amber,
                background: `linear-gradient(135deg, ${C.amberSoft}, rgba(245,158,11,0.04))`,
                border: `1px solid rgba(245,158,11,0.2)`,
                boxShadow: `0 0 30px rgba(245,158,11,0.06)`,
              }}
            >
              <FaAward size={12} />
              Professional Achievements
            </span>
          </div>

          {/* Title */}
          <h2
            className="cr-font-display text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] xl:text-6xl font-extrabold leading-[1.1] mb-2"
            style={{ color: C.text }}
          >
            My{" "}
            <span className="cr-wordmark">Certificates</span>
          </h2>

          {/* Aurora underline */}
          <div className="flex justify-center mt-5 mb-6">
            <span
              className="cr-underline-el block h-[3px] w-20 sm:w-28 rounded-full"
              style={{
                backgroundImage: AURORA,
                backgroundSize: "300% auto",
                animation: "cr-aurora-shift 4s ease-in-out infinite",
                boxShadow: `0 0 15px ${C.violet}44, 0 0 30px ${C.pink}22`,
              }}
            />
          </div>

          {/* Subtitle with shimmer */}
          <p
            className="cr-shimmer-text max-w-2xl mx-auto text-sm sm:text-base lg:text-lg leading-relaxed font-medium"
          >
            Professional certifications validating my expertise and commitment to continuous growth in modern web technologies.
          </p>
        </div>

        {/* ════════════════ STATS BAR ════════════════ */}
        <div
          ref={statsRef}
          className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto mb-14 lg:mb-20"
        >
          {stats.map((stat, i) => (
            <StatCard key={stat.label} stat={stat} index={i} visible={statsIn} />
          ))}
        </div>

        {/* ════════════════ CERTIFICATES LIST ════════════════ */}
        <div ref={gridRef} className="max-w-5xl mx-auto space-y-7 lg:space-y-9">
          {certificates.map((cert, index) => (
            <CertCard
              key={cert.id}
              cert={cert}
              index={index}
              visible={gridIn}
              isReversed={index % 2 !== 0}
              onOpenLightbox={openLightbox}
            />
          ))}
        </div>

        {/* ════════════════ BOTTOM CTA AREA ════════════════ */}
        <div
          className="mt-16 lg:mt-24 text-center"
          style={
            gridIn
              ? { animation: "cr-fade-up 0.8s cubic-bezier(0.16,1,0.3,1) 0.8s both" }
              : { opacity: 0 }
          }
        >
          {/* Decorative line */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <span
              className="block h-px w-8 sm:w-16"
              style={{
                background: `linear-gradient(90deg, transparent, ${C.amber}66)`,
              }}
            />
            <div
              className="w-2 h-2 rounded-full rotate-45"
              style={{
                background: C.amber,
                boxShadow: `0 0 10px ${C.amber}66`,
              }}
            />
            <span
              className="block h-px w-8 sm:w-16"
              style={{
                background: `linear-gradient(90deg, ${C.amber}66, transparent)`,
              }}
            />
          </div>

          {/* Quote */}
          <p
            className="text-sm sm:text-base lg:text-lg italic max-w-lg mx-auto leading-relaxed mb-4"
            style={{ color: C.textSec }}
          >
            "Education is not the filling of a pail, but the
            lighting of a fire."
          </p>
          <span
            className="text-[11px] font-semibold tracking-[0.2em] uppercase"
            style={{ color: C.muted }}
          >
            — W.B. Yeats
          </span>

          {/* Bottom accent dots */}
          <div className="flex items-center justify-center gap-2 mt-8">
            {[C.violet, C.pink, C.amber, C.cyan, C.emerald].map((color, i) => (
              <div
                key={i}
                className="w-1.5 h-1.5 rounded-full"
                style={{
                  background: color,
                  boxShadow: `0 0 6px ${color}66`,
                  opacity: 0.6 + (i === 2 ? 0.4 : 0),
                  transform: `scale(${i === 2 ? 1.3 : 1})`,
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ════════ BOTTOM DIVIDER ════════ */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px z-10"
        style={{
          backgroundImage: AURORA,
          backgroundSize: "300% auto",
          opacity: 0.2,
          animation: "cr-aurora-shift 5s ease-in-out infinite",
        }}
      />

      {/* ════════ LIGHTBOX ════════ */}
      {lightbox && (
        <Lightbox
          src={lightbox.src}
          alt={lightbox.alt}
          onClose={closeLightbox}
        />
      )}
    </section>
  );
}

export default Certificates;