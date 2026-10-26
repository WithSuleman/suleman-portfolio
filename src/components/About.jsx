import { useEffect, useRef, useState, useCallback } from "react";
import { FaUserGraduate, FaLaptopCode, FaLocationDot } from "react-icons/fa6";
import { HiOutlineDownload } from "react-icons/hi";
import resume from "../assets/images/projects/resume.pdf"

/* ═══════════════════════════════════════════════════════════════
   REFINED BLUE PALETTE — Matches the Hero blue theme
   ═══════════════════════════════════════════════════════════════ */
const C = {
  bg: "#040816",        // deep navy (matches Hero bg)
  surface: "#0A1228",   // dark navy panel
  surfaceAlt: "#0E1530",
  border: "#1A2748",    // navy border
  borderSoft: "rgba(96, 165, 250, 0.08)", // blue-tinted soft border
  text: "#EFF6FF",      // near-white with blue tint
  textSec: "#A8BDD9",   // soft blue-gray
  muted: "#6E84A8",     // dimmer blue-gray
  violet: "#3B82F6",    // blue-500 (primary — used everywhere violet was)
  violetSoft: "rgba(59, 130, 246, 0.1)",
  pink: "#0EA5E9",      // sky-500 (secondary — replaces pink)
  pinkSoft: "rgba(14, 165, 233, 0.1)",
  cyan: "#06B6D4",      // cyan-500 (kept — sits naturally in blue family)
  cyanSoft: "rgba(6, 182, 212, 0.1)",
  amber: "#38BDF8",     // sky-400 (accent — replaces amber)
  emerald: "#22D3EE",  // cyan-400 (cool tone — for "Available" badge, replaces green)
  emeraldSoft: "rgba(34, 211, 238, 0.1)",
};

const AURORA = `linear-gradient(90deg, ${C.violet}, ${C.pink}, ${C.amber}, ${C.cyan}, ${C.violet})`;

/* ═══════════════════════════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════════════════════════ */
const aboutCards = [
  { icon: <FaUserGraduate size={22} />, title: "Education", desc: "ADP Computer Science (Continue)", color: C.violet, soft: C.violetSoft },
  { icon: <FaLaptopCode size={22} />, title: "Experience", desc: "MERN Stack Projects", color: C.pink, soft: C.pinkSoft },
  { icon: <FaLocationDot size={22} />, title: "Location", desc: "Faisalabad, Pakistan", color: C.cyan, soft: C.cyanSoft },
];

const stats = [
  { value: 15, suffix: "+", label: "Projects" },
  { value: 10, suffix: "+", label: "Technologies" },
  { value: 1, suffix: "+", label: "MONTHS Exp." },
  { value: 100, suffix: "%", label: "Dedication" },
];

const skills = [
  { name: "React.js", pct: 70, color: C.cyan },
  { name: "Node.js", pct: 60, color: C.emerald },
  { name: "Express.js", pct: 60, color: C.pink },
  { name: "MongoDB", pct: 60, color: C.amber },
  { name: "JavaScript", pct: 82, color: C.amber },
  { name: "Tailwind CSS", pct: 60, color: C.violet },
];

const focusTags = ["MongoDB", "Express.js", "React.js", "Node.js", "JavaScript", "Tailwind CSS", "REST APIs", "JWT Auth", "Git", "Postman", "VS Code"];

const rotatingWords = ["MERN Stack Developer", "Full Stack Developer", "Creative Coder", "React & Node Specialist"];

/* ═══════════════════════════════════════════════════════════════
   PARTICLES (generated once, outside render cycle)
   ═══════════════════════════════════════════════════════════════ */
const PARTICLES = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 2.5 + 1,
  dur: Math.random() * 20 + 15,
  del: Math.random() * -20,
  op: Math.random() * 0.22 + 0.06,
  color: [C.violet, C.pink, C.cyan, C.amber][i % 4],
}));

/* ═══════════════════════════════════════════════════════════════
   HOOKS
   ═══════════════════════════════════════════════════════════════ */
function useInView(threshold = 0.2) {
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

function useCounter(end, duration = 2000, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let t0 = null;
    const step = (ts) => {
      if (!t0) t0 = ts;
      const p = Math.min((ts - t0) / duration, 1);
      setCount(Math.floor((1 - Math.pow(1 - p, 3)) * end));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [start, end, duration]);
  return count;
}

/* ═══════════════════════════════════════════════════════════════
   SUB-COMPONENTS
   ═══════════════════════════════════════════════════════════════ */

/* ── 3D Tilt Card ── */
function TiltCard({ children, className, style }) {
  const ref = useRef(null);
  const onMove = useCallback((e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform =
      `perspective(800px) rotateX(${y * -10}deg) rotateY(${x * 10}deg) scale3d(1.03,1.03,1.03)`;
  }, []);
  const onLeave = useCallback(() => {
    if (ref.current)
      ref.current.style.transform =
        "perspective(800px) rotateX(0) rotateY(0) scale3d(1,1,1)";
  }, []);
  return (
    <div
      ref={ref}
      className={className}
      style={{
        ...style,
        transition: "transform 0.5s cubic-bezier(0.03,0.98,0.52,0.99)",
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

/* ── Rotating Text ── */
function RotatingText({ words }) {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx((p) => (p + 1) % words.length), 2800);
    return () => clearInterval(t);
  }, [words.length]);

  return (
    <span
      className="inline-block overflow-hidden"
      style={{ height: "1.2em", verticalAlign: "bottom" }}
    >
      <span
        style={{
          display: "inline-block",
          transition: "transform 0.6s cubic-bezier(0.16,1,0.3,1)",
          transform: `translateY(-${idx * 1.2}em)`,
        }}
      >
        {words.map((w, i) => (
          <span
            key={i}
            className="block ab-wordmark whitespace-nowrap"
            style={{ lineHeight: "1.2em" }}
          >
            {w}
          </span>
        ))}
      </span>
    </span>
  );
}

/* ── Stat Item ── */
function StatItem({ value, suffix, label, delay, active }) {
  const count = useCounter(value, 1600, active);
  return (
    <div
      className="ab-stat-item text-center py-3 px-2"
      style={{
        animation: active
          ? `ab-fade-up 0.55s cubic-bezier(0.16,1,0.3,1) ${delay}s both`
          : "none",
        opacity: active ? undefined : 0,
      }}
    >
      <div
        className="ab-font-display text-2xl sm:text-3xl font-extrabold"
        style={{ color: C.text }}
      >
        {count}
        <span className="ab-wordmark text-lg sm:text-xl">{suffix}</span>
      </div>
      <div
        className="text-[11px] font-medium tracking-wider uppercase mt-1"
        style={{ color: C.muted }}
      >
        {label}
      </div>
    </div>
  );
}

/* ── Skill Bar ── */
function SkillBar({ name, pct, color, delay, visible }) {
  return (
    <div
      style={{
        animation: visible
          ? `ab-fade-up 0.5s cubic-bezier(0.16,1,0.3,1) ${delay}s both`
          : "none",
        opacity: visible ? undefined : 0,
      }}
    >
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium" style={{ color: C.textSec }}>
          {name}
        </span>
        <span
          className="text-xs font-semibold ab-font-display"
          style={{ color }}
        >
          {pct}%
        </span>
      </div>
      <div
        className="h-[6px] rounded-full overflow-hidden"
        style={{ background: C.border }}
      >
        <div
          className="h-full rounded-full"
          style={{
            width: visible ? `${pct}%` : "0%",
            background: `linear-gradient(90deg, ${color}, ${color}88)`,
            transition: `width 1.4s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
            boxShadow: `0 0 12px ${color}33`,
          }}
        />
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MAIN ABOUT SECTION
   ═══════════════════════════════════════════════════════════════ */
function About() {
  const [headRef, headIn] = useInView(0.25);
  const [leftRef, leftIn] = useInView(0.1);
  const [rightRef, rightIn] = useInView(0.1);
  const [skillsRef, skillsIn] = useInView(0.2);
  const [quoteRef, quoteIn] = useInView(0.3);

  return (
    <section
      id="about"
      className="ab-font-body relative overflow-hidden"
      style={{ background: C.bg, scrollMarginTop: "88px" }}
    >
      {/* ════════ STYLES ════════ */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700;800&family=Inter:wght@300;400;500;600;700&display=swap');

        .ab-font-display{font-family:'Space Grotesk',sans-serif}
        .ab-font-body{font-family:'Inter',sans-serif}

        /* ── Keyframes ── */
        @keyframes ab-blob{
          0%,100%{transform:translate(0,0) scale(1)}
          33%{transform:translate(30px,-25px) scale(1.08)}
          66%{transform:translate(-20px,20px) scale(0.94)}
        }
        @keyframes ab-fade-up{from{opacity:0;transform:translateY(32px)}to{opacity:1;transform:translateY(0)}}
        @keyframes ab-fade-left{from{opacity:0;transform:translateX(-32px)}to{opacity:1;transform:translateX(0)}}
        @keyframes ab-fade-right{from{opacity:0;transform:translateX(32px)}to{opacity:1;transform:translateX(0)}}
        @keyframes ab-aurora-shift{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}
        @keyframes ab-shine{0%{transform:translateX(-150%) skewX(-20deg)}100%{transform:translateX(250%) skewX(-20deg)}}
        @keyframes ab-underline{from{transform:scaleX(0)}to{transform:scaleX(1)}}
        @keyframes ab-pulse-dot{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.4;transform:scale(1.8)}}
        @keyframes ab-orbit{to{transform:rotate(360deg)}}
        @keyframes ab-particle{
          0%,100%{transform:translate(0,0);opacity:var(--po)}
          25%{transform:translate(18px,-22px);opacity:calc(var(--po)*1.6)}
          50%{transform:translate(-12px,-38px);opacity:var(--po)}
          75%{transform:translate(22px,-14px);opacity:calc(var(--po)*0.6)}
        }
        @keyframes ab-badge-glow{
          0%,100%{box-shadow:0 0 0 0 rgba(34,211,238,0.25)}
          50%{box-shadow:0 0 0 8px rgba(34,211,238,0)}
        }

        @media(prefers-reduced-motion:reduce){
          .ab-anim,.ab-anim *{animation:none!important;transition:none!important}
        }

        /* ── Blobs ── */
        .ab-blob-1{animation:ab-blob 16s ease-in-out infinite}
        .ab-blob-2{animation:ab-blob 20s ease-in-out infinite reverse}
        .ab-blob-3{animation:ab-blob 14s ease-in-out infinite 3s}

        /* ── Grid ── */
        .ab-grid{
          background-image:linear-gradient(${C.borderSoft} 1px,transparent 1px),linear-gradient(90deg,${C.borderSoft} 1px,transparent 1px);
          background-size:60px 60px;
          -webkit-mask-image:radial-gradient(ellipse 70% 60% at 50% 45%,black 20%,transparent 80%);
          mask-image:radial-gradient(ellipse 70% 60% at 50% 45%,black 20%,transparent 80%);
        }

        /* ── Aurora text ── */
        .ab-wordmark{
          background-image:${AURORA};
          background-size:300% auto;
          -webkit-background-clip:text;background-clip:text;
          -webkit-text-fill-color:transparent;
          animation:ab-aurora-shift 6s ease-in-out infinite;
        }

        /* ── Underline ── */
        .ab-underline-el{transform-origin:left;animation:ab-underline .8s cubic-bezier(.65,0,.35,1) .5s both}

        /* ── Noise overlay ── */
        .ab-noise::after{
          content:'';position:absolute;inset:0;opacity:.02;pointer-events:none;
          background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          background-repeat:repeat;background-size:128px 128px;
        }

        /* ── CV Button ── */
        .ab-cv-btn{
          position:relative;overflow:hidden;
          transition:transform .4s cubic-bezier(.65,0,.35,1),box-shadow .4s ease;
        }
        .ab-cv-btn .ab-shine-el{
          position:absolute;top:0;left:0;height:100%;width:40%;
          background:linear-gradient(120deg,transparent,rgba(255,255,255,.5),transparent);
          transform:translateX(-150%) skewX(-20deg);
        }
        .ab-cv-btn:hover .ab-shine-el{animation:ab-shine .85s ease forwards}
        .ab-cv-btn:hover{transform:translateY(-4px) scale(1.03);box-shadow:0 22px 44px -14px ${C.pink}55}
        .ab-cv-btn:active{transform:translateY(-1px) scale(.98)}

        /* ── Tags ── */
        .ab-tag{
          transition:transform .3s cubic-bezier(.65,0,.35,1),border-color .3s ease,color .3s ease,background .3s ease,box-shadow .3s ease;
        }
        .ab-tag:hover{
          transform:translateY(-4px) scale(1.06);
          border-color:${C.violet};color:${C.text};
          background:${C.violetSoft};
          box-shadow:0 8px 24px -8px ${C.violet}33;
        }

        /* ── Info Cards ── */
        .ab-card{
          position:relative;
          transition:transform .5s cubic-bezier(.03,.98,.52,.99),border-color .4s ease,box-shadow .4s ease,background .4s ease;
        }
        .ab-card:hover{
          border-color:rgba(59,130,246,.35);
          box-shadow:0 24px 48px -18px rgba(59,130,246,.22);
          background:${C.surfaceAlt};
        }
        .ab-card::before{
          content:'';position:absolute;inset:-1px;border-radius:inherit;padding:1px;
          background-image:${AURORA};background-size:300% auto;
          -webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);
          -webkit-mask-composite:xor;mask-composite:exclude;
          opacity:0;transition:opacity .4s ease;pointer-events:none;
        }
        .ab-card:hover::before{opacity:1;animation:ab-aurora-shift 4s ease-in-out infinite}

        /* ── Card icon ── */
        .ab-icon-wrap{
          transition:transform .4s cubic-bezier(.65,0,.35,1),background .4s ease,box-shadow .4s ease;
        }
        .ab-card:hover .ab-icon-wrap{
          transform:scale(1.12) rotate(-6deg);
          box-shadow:0 8px 22px -6px var(--ic);
        }

        /* ── Stat hover ── */
        .ab-stat-item{transition:transform .3s ease;border-radius:12px}
        .ab-stat-item:hover{transform:translateY(-3px);background:rgba(59,130,246,.04)}

        /* ── Stats box ── */
        .ab-stats-box{transition:border-color .4s ease,box-shadow .4s ease}
        .ab-stats-box:hover{border-color:rgba(59,130,246,.18);box-shadow:0 8px 32px -12px rgba(59,130,246,.08)}

        /* ── Badge ── */
        .ab-badge{transition:transform .3s ease,box-shadow .3s ease;animation:ab-badge-glow 3s ease-in-out infinite}
        .ab-badge:hover{transform:translateY(-2px) scale(1.04)}

        /* ── Skills card ── */
        .ab-skills-card{transition:border-color .4s ease,box-shadow .4s ease,background .4s ease}
        .ab-skills-card:hover{border-color:rgba(59,130,246,.2);box-shadow:0 12px 36px -14px rgba(59,130,246,.12);background:${C.surfaceAlt}}

        /* ── Orbit ── */
        .ab-orbit-ring{border-radius:50%;position:absolute;border:1px dashed}
        .ab-orbit-1{animation:ab-orbit 25s linear infinite;border-color:rgba(59,130,246,.12)}
        .ab-orbit-2{animation:ab-orbit 18s linear infinite reverse;border-color:rgba(14,165,233,.1)}
        .ab-orbit-3{animation:ab-orbit 12s linear infinite;border-color:rgba(6,182,212,.08)}
        .ab-orbit-dot{position:absolute;border-radius:50%;top:-3px;left:50%;margin-left:-3px;width:6px;height:6px}

        @media(max-width:640px){.ab-orbit-wrap{display:none}}
      `}</style>

      {/* ════════ TOP AURORA DIVIDER ════════ */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          backgroundImage: AURORA,
          backgroundSize: "300% auto",
          opacity: 0.35,
          animation: "ab-aurora-shift 6s ease-in-out infinite",
        }}
      />

      {/* ════════ AMBIENT BACKGROUND ════════ */}
      <div className="ab-anim ab-noise absolute inset-0 pointer-events-none">
        <div className="ab-grid absolute inset-0 opacity-60" />

        {/* Gradient blobs */}
        <div
          className="ab-blob-1 absolute rounded-full"
          style={{
            width: 520, height: 520, top: "-6%", right: "-14%",
            background: `radial-gradient(circle, ${C.violet}1e, transparent 70%)`,
            filter: "blur(70px)",
          }}
        />
        <div
          className="ab-blob-2 absolute rounded-full"
          style={{
            width: 460, height: 460, bottom: "-12%", left: "-16%",
            background: `radial-gradient(circle, ${C.cyan}18, transparent 70%)`,
            filter: "blur(65px)",
          }}
        />
        <div
          className="ab-blob-3 absolute rounded-full"
          style={{
            width: 320, height: 320, top: "38%", left: "28%",
            background: `radial-gradient(circle, ${C.pink}12, transparent 70%)`,
            filter: "blur(55px)",
          }}
        />

        {/* Floating particles */}
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
              animation: `ab-particle ${p.dur}s ease-in-out ${p.del}s infinite`,
              opacity: p.op,
              filter: p.size > 2.5 ? "blur(1px)" : "none",
            }}
          />
        ))}
      </div>

      {/* ════════ CONTENT ════════ */}
      <div className="relative z-10 container mx-auto px-5 sm:px-6 lg:px-8 py-24 sm:py-32 lg:py-40">

        {/* ════════════════ HEADING ════════════════ */}
        <div
          ref={headRef}
          className="text-center mb-16 lg:mb-24"
          style={
            headIn
              ? { animation: "ab-fade-up 0.7s cubic-bezier(0.16,1,0.3,1) both" }
              : { opacity: 0 }
          }
        >
          {/* Freelance badge */}
          <span
            className="ab-badge inline-flex items-center gap-2.5 text-[11px] sm:text-xs font-semibold tracking-[0.18em] uppercase mb-5 px-5 py-2 rounded-full cursor-default"
            style={{
              color: C.emerald,
              background: C.emeraldSoft,
              border: `1px solid rgba(34,211,238,0.2)`,
            }}
          >
            <span
              className="w-2 h-2 rounded-full shrink-0"
              style={{
                background: C.emerald,
                animation: "ab-pulse-dot 2s ease-in-out infinite",
              }}
            />
            Available for Freelance
          </span>

          <h2
            className="ab-font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight"
            style={{ color: C.text }}
          >
            About <span className="ab-wordmark">Me</span>
          </h2>

          <div className="flex justify-center mt-5 mb-6">
            <span
              className="ab-underline-el block h-[3px] w-24 rounded-full"
              style={{
                backgroundImage: AURORA,
                backgroundSize: "300% auto",
                animation: "ab-aurora-shift 4s ease-in-out infinite",
              }}
            />
          </div>

          <p
            className="max-w-2xl mx-auto text-base lg:text-lg leading-relaxed"
            style={{ color: C.muted }}
          >
            Passionate MERN Stack Developer focused on building modern, scalable
            and user-friendly full-stack web applications using MongoDB,
            Express.js, React &amp; Node.js.
          </p>
        </div>

        {/* ════════════════ TWO-COLUMN GRID ════════════════ */}
        <div className="grid lg:grid-cols-[1.15fr_1fr] xl:grid-cols-[1.2fr_1fr] gap-14 lg:gap-20 xl:gap-24 items-start">

          {/* ════════════════ LEFT COLUMN ════════════════ */}
          <div
            ref={leftRef}
            style={
              leftIn
                ? { animation: "ab-fade-left 0.8s cubic-bezier(0.16,1,0.3,1) both" }
                : { opacity: 0 }
            }
          >
            {/* Role with rotating text */}
            <h3
              className="ab-font-display text-2xl sm:text-3xl lg:text-[2.1rem] font-bold leading-snug mb-8"
              style={{ color: C.text }}
            >
              I'm a <RotatingText words={rotatingWords} />
            </h3>

            {/* Bio */}
            <p className="text-[15px] lg:text-[17px] leading-[1.85] mb-5" style={{ color: C.textSec }}>
              I'm{" "}
              <strong className="font-semibold" style={{ color: C.text }}>
                Muhammad Suleman
              </strong>
              , a passionate MERN Stack Developer who enjoys building complete
              web applications — from responsive React interfaces to secure
              Node.js &amp; Express APIs backed by MongoDB.
            </p>
            <p className="text-[15px] lg:text-[17px] leading-[1.85] mb-10" style={{ color: C.muted }}>
              I continuously improve my skills by building real-world full-stack
              projects and learning the latest web technologies. My goal is to
              create fast, scalable and visually appealing applications that make
              a real difference.
            </p>

            {/* Stats */}
            <div
              className="ab-stats-box grid grid-cols-2 sm:grid-cols-4 gap-1 mb-10 p-5 sm:p-6 rounded-2xl"
              style={{ background: C.surface, border: `1px solid ${C.border}` }}
            >
              {stats.map((s, i) => (
                <StatItem
                  key={s.label}
                  value={s.value}
                  suffix={s.suffix}
                  label={s.label}
                  delay={0.3 + i * 0.09}
                  active={leftIn}
                />
              ))}
            </div>

            {/* Tech Tags */}
            <div className="mb-10">
              <p
                className="text-[11px] font-semibold tracking-[0.16em] uppercase mb-4"
                style={{ color: C.muted }}
              >
                Currently Working With
              </p>
              <div className="flex flex-wrap gap-2.5">
                {focusTags.map((tag, i) => (
                  <span
                    key={tag}
                    className="ab-tag text-sm px-4 py-2 rounded-xl cursor-default"
                    style={{
                      color: C.muted,
                      border: `1px solid ${C.border}`,
                      background: C.surface,
                      animation: leftIn
                        ? `ab-fade-up 0.5s cubic-bezier(0.16,1,0.3,1) ${0.6 + i * 0.06}s both`
                        : "none",
                      opacity: leftIn ? undefined : 0,
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Download CV */}
         <a
  href={resume}
  download="Muhammad-Suleman-CV.pdf"
  className="ab-cv-btn ab-font-body inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl font-semibold text-sm tracking-wide transition-all duration-300 hover:scale-105"
  style={{
    color: "#040816",
    backgroundImage: `linear-gradient(135deg, ${C.cyan}, ${C.violet}, ${C.pink})`,
    boxShadow: `0 14px 36px -14px ${C.violet}55`,
    textDecoration: "none",
  }}
>
  <span className="ab-shine-el"></span>
  Download CV
  <HiOutlineDownload size={20} />
</a>
          </div>

          {/* ════════════════ RIGHT COLUMN ════════════════ */}
          <div ref={rightRef} className="flex flex-col gap-6">

            {/* Info Cards with 3D Tilt */}
            {aboutCards.map((card, index) => (
              <TiltCard
                key={index}
                className="ab-card rounded-2xl p-6 sm:p-7 flex items-start gap-5"
                style={{
                  background: C.surface,
                  border: `1px solid ${C.border}`,
                  animation: rightIn
                    ? `ab-fade-right 0.7s cubic-bezier(0.16,1,0.3,1) ${0.12 + index * 0.12}s both`
                    : "none",
                  opacity: rightIn ? undefined : 0,
                }}
              >
                <div
                  className="ab-icon-wrap flex items-center justify-center rounded-xl shrink-0"
                  style={{
                    width: 52,
                    height: 52,
                    background: card.soft,
                    color: card.color,
                    "--ic": `${card.color}44`,
                  }}
                >
                  {card.icon}
                </div>
                <div className="min-w-0">
                  <h4 className="text-lg font-semibold mb-1" style={{ color: C.text }}>
                    {card.title}
                  </h4>
                  <p className="text-sm leading-relaxed" style={{ color: C.muted }}>
                    {card.desc}
                  </p>
                </div>
              </TiltCard>
            ))}

            {/* Skills Section */}
            <div
              ref={skillsRef}
              className="ab-skills-card p-6 sm:p-7 rounded-2xl"
              style={{
                background: C.surface,
                border: `1px solid ${C.border}`,
                animation: skillsIn
                  ? "ab-fade-right 0.7s cubic-bezier(0.16,1,0.3,1) 0.48s both"
                  : "none",
                opacity: skillsIn ? undefined : 0,
              }}
            >
              <h4
                className="ab-font-display text-lg font-semibold mb-6"
                style={{ color: C.text }}
              >
                My Skills
              </h4>
              <div className="space-y-5">
                {skills.map((s, i) => (
                  <SkillBar
                    key={s.name}
                    name={s.name}
                    pct={s.pct}
                    color={s.color}
                    delay={skillsIn ? 0.6 + i * 0.1 : 0}
                    visible={skillsIn}
                  />
                ))}
              </div>
            </div>

            {/* Orbit Visual (desktop only) */}
            <div
              className="ab-orbit-wrap flex justify-center py-3"
              style={{
                animation: rightIn
                  ? "ab-fade-up 0.8s cubic-bezier(0.16,1,0.3,1) 0.75s both"
                  : "none",
                opacity: rightIn ? undefined : 0,
              }}
            >
              <div className="relative" style={{ width: 200, height: 200 }}>
                {/* Ring 1 + dot */}
                <div className="ab-orbit-ring ab-orbit-1" style={{ inset: 0 }}>
                  <div
                    className="ab-orbit-dot"
                    style={{
                      background: C.violet,
                      boxShadow: `0 0 12px ${C.violet}`,
                    }}
                  />
                </div>
                {/* Ring 2 + dot */}
                <div className="ab-orbit-ring ab-orbit-2" style={{ inset: 28 }}>
                  <div
                    className="ab-orbit-dot"
                    style={{
                      background: C.pink,
                      boxShadow: `0 0 12px ${C.pink}`,
                      width: 5,
                      height: 5,
                      top: -2.5,
                      marginLeft: -2.5,
                    }}
                  />
                </div>
                {/* Ring 3 + dot */}
                <div className="ab-orbit-ring ab-orbit-3" style={{ inset: 56 }}>
                  <div
                    className="ab-orbit-dot"
                    style={{
                      background: C.cyan,
                      boxShadow: `0 0 12px ${C.cyan}`,
                      width: 4,
                      height: 4,
                      top: -2,
                      marginLeft: -2,
                    }}
                  />
                </div>
                {/* Center initials */}
                <div
                  className="absolute flex items-center justify-center rounded-full ab-font-display text-2xl font-bold select-none"
                  style={{
                    inset: 72,
                    background: `linear-gradient(135deg, ${C.violetSoft}, ${C.pinkSoft})`,
                    color: C.violet,
                    border: `1px solid ${C.border}`,
                    boxShadow: `0 0 40px ${C.violet}15`,
                  }}
                >
                  MS
                </div>
              </div>
            </div>
          </div>

          {/* ════════════════ PHILOSOPHY (full-width) ════════════════ */}
          <div
            ref={quoteRef}
            className="lg:col-span-2 mt-20 lg:mt-24 text-center"
            style={
              quoteIn
                ? {
                    animation:
                      "ab-fade-up 0.7s cubic-bezier(0.16,1,0.3,1) 0.2s both",
                  }
                : { opacity: 0 }
            }
          >
            <div className="inline-flex items-center gap-4 mb-5">
              <span
                className="block h-px w-10 sm:w-14"
                style={{
                  background: `linear-gradient(90deg, transparent, ${C.violet})`,
                }}
              />
              <span
                className="text-[11px] font-semibold tracking-[0.2em] uppercase"
                style={{ color: C.violet }}
              >
                My Philosophy
              </span>
              <span
                className="block h-px w-10 sm:w-14"
                style={{
                  background: `linear-gradient(90deg, ${C.violet}, transparent)`,
                }}
              />
            </div>
            <p
              className="text-base sm:text-lg lg:text-xl italic max-w-2xl mx-auto leading-relaxed"
              style={{ color: C.textSec }}
            >
              "Code is not just about solving problems — it's about crafting
              experiences that people love to use."
            </p>
          </div>
        </div>
      </div>

      {/* ════════ BOTTOM AURORA DIVIDER ════════ */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{
          backgroundImage: AURORA,
          backgroundSize: "300% auto",
          opacity: 0.15,
          animation: "ab-aurora-shift 6s ease-in-out infinite",
        }}
      />
    </section>
  );
}

export default About;