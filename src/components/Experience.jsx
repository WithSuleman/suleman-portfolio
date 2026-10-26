import { useEffect, useRef, useState, useCallback } from "react";
import { FaBriefcase, FaGraduationCap, FaLaptopCode } from "react-icons/fa";

/* ═══════════════════════════════════════════════════════════════
   BLUE THEME  (main blue #3B82F6 + lighter blue tints)
   NOTE: key names are kept from the old palette so the rest of the
   file works unchanged:  violet = main blue, pink = light blue,
   amber = pale blue, cyan = sky blue.
   ═══════════════════════════════════════════════════════════════ */
const C = {
  bg: "#05060E",
  surface: "#0A0C1A",
  surfaceAlt: "#0E1128",
  border: "#181C38",
  borderSoft: "rgba(59,130,246,0.08)",
  text: "#F0EEFF",
  textSec: "#B4B7D6",
  muted: "#6B7199",
  violet: "#3B82F6",
  violetSoft: "rgba(59,130,246,0.1)",
  pink: "#60A5FA",
  pinkSoft: "rgba(96,165,250,0.1)",
  cyan: "#38BDF8",
  cyanSoft: "rgba(56,189,248,0.1)",
  amber: "#93C5FD",
  amberSoft: "rgba(147,197,253,0.1)",
};

const AURORA = `linear-gradient(90deg,${C.violet},${C.pink},${C.amber},${C.cyan},${C.violet})`;

/* ═══════════════════════════════════════════════════════════════
   DATA — MERN STACK (each item gets its own accent colour)
   ═══════════════════════════════════════════════════════════════ */
const timeline = [
  {
    id: 1,
    icon: <FaBriefcase size={20} />,
    title: "MERN Stack Development Internship",
    company: "Teyzix Core",
    duration: "2026",
    description:
      "Worked on modern React.js, Node.js and Tailwind CSS projects. Built responsive user interfaces, reusable components and real-world full-stack projects with a focus on clean code practices.",
    color: C.cyan,
    soft: C.cyanSoft,
  },
  {
    id: 2,
    icon: <FaLaptopCode size={20} />,
    title: "MERN Stack Projects",
    company: "Personal Projects",
    duration: "2025 — Present",
    description:
      "Developed full-stack applications including Expense Tracker, Task Manager and a Flower E-Commerce Website, along with SaaS Landing Page, Analytics Dashboard and Portfolio Website, using MongoDB, Express.js, React and Node.js.",
    color: C.violet,
    soft: C.violetSoft,
  },
  {
    id: 3,
    icon: <FaGraduationCap size={20} />,
    title: "ADP Computer Science",
    company: "Continue",
    duration: "2024 — Present",
    description:
      "Learning software development, programming fundamentals and the MERN stack (MongoDB, Express.js, React, Node.js) while building practical, real-world projects to solidify concepts.",
    color: C.pink,
    soft: C.pinkSoft,
  },
];

/* Particles — generated once, outside render */
const PARTICLES = Array.from({ length: 14 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 2.2 + 0.8,
  dur: Math.random() * 22 + 14,
  del: Math.random() * -20,
  op: Math.random() * 0.16 + 0.04,
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
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

/* ═══════════════════════════════════════════════════════════════
   3D TILT WRAPPER
   ═══════════════════════════════════════════════════════════════ */
function TiltCard({ children, className, style }) {
  const ref = useRef(null);
  const onMove = useCallback((e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(800px) rotateX(${y * -6}deg) rotateY(${x * 6}deg) scale3d(1.015,1.015,1.015)`;
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
        transition:
          "transform 0.55s cubic-bezier(0.03,0.98,0.52,0.99), border-color 0.4s ease, box-shadow 0.4s ease, background 0.4s ease",
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
   TIMELINE ITEM
   ═══════════════════════════════════════════════════════════════ */
function TimelineItem({ item, index, total, visible }) {
  const isLast = index === total - 1;
  const nextColor = isLast ? item.color : timeline[index + 1].color;

  return (
    <div
      className="flex gap-5 sm:gap-6 lg:gap-8"
      style={
        visible
          ? {
              animation: `ex-fade-up 0.7s cubic-bezier(0.16,1,0.3,1) ${0.15 + index * 0.18}s both`,
            }
          : { opacity: 0 }
      }
    >
      {/* ── Left: Dot + Connecting Line ── */}
      <div className="flex flex-col items-center shrink-0 pt-1">
        {/* Outer glow ring */}
        <div className="relative">
          <div
            className="absolute inset-[-6px] rounded-full ex-dot-glow"
            style={{
              background: item.color,
              opacity: visible ? 0.25 : 0,
              transition: "opacity 0.8s ease",
            }}
          />
          {/* Dot circle */}
          <div
            className="ex-dot relative z-10 flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full"
            style={{
              background: item.soft,
              color: item.color,
              border: `2px solid ${item.color}44`,
              transition: "border-color 0.4s ease, box-shadow 0.4s ease",
            }}
          >
            {item.icon}
          </div>
        </div>

        {/* Connecting line to next item */}
        {!isLast && (
          <div
            className="w-[2px] flex-1 mt-3 rounded-full overflow-hidden"
            style={{ background: `${nextColor}15` }}
          >
            <div
              className="w-full origin-top rounded-full"
              style={{
                height: visible ? "100%" : "0%",
                background: `linear-gradient(180deg, ${item.color}66, ${nextColor}33)`,
                transition: `height 1.2s cubic-bezier(0.16,1,0.3,1) ${0.5 + index * 0.2}s`,
              }}
            />
          </div>
        )}
      </div>

      {/* ── Right: Card ── */}
      <div className="flex-1 pb-10 sm:pb-14">
        <TiltCard
          className="ex-card relative rounded-2xl p-6 sm:p-7 lg:p-8"
          style={{
            background: C.surface,
            border: `1px solid ${C.border}`,
            borderLeft: `3px solid ${item.color}44`,
          }}
        >
          {/* Aurora border overlay */}
          <div className="ex-card-aurora" />

          {/* Top row: duration + number */}
          <div className="flex items-center justify-between mb-4 relative z-10">
            <span
              className="inline-flex items-center gap-2 text-[11px] sm:text-xs font-semibold tracking-[0.12em] uppercase px-3.5 py-1.5 rounded-full"
              style={{
                color: item.color,
                background: item.soft,
                border: `1px solid ${item.color}18`,
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{
                  background: item.color,
                  boxShadow: `0 0 8px ${item.color}`,
                }}
              />
              {item.duration}
            </span>

            <span
              className="ex-font-display text-4xl sm:text-5xl font-extrabold leading-none select-none pointer-events-none"
              style={{
                color: C.border,
                transition: "color 0.4s ease",
              }}
            >
              0{item.id}
            </span>
          </div>

          {/* Title */}
          <h3
            className="ex-font-display text-lg sm:text-xl lg:text-2xl font-bold mb-2 leading-snug relative z-10"
            style={{ color: C.text }}
          >
            {item.title}
          </h3>

          {/* Company */}
          <p
            className="text-sm sm:text-base font-semibold mb-4 relative z-10"
            style={{ color: item.color }}
          >
            {item.company}
          </p>

          {/* Description */}
          <p
            className="text-sm sm:text-[15px] leading-[1.85] relative z-10"
            style={{ color: C.muted }}
          >
            {item.description}
          </p>

          {/* Decorative corner accent */}
          <div
            className="absolute bottom-0 right-0 w-24 h-24 rounded-tl-3xl pointer-events-none opacity-[0.03] transition-opacity duration-500"
            style={{
              background: `radial-gradient(circle at 100% 100%, ${item.color}, transparent 70%)`,
            }}
          />
        </TiltCard>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MAIN EXPERIENCE SECTION
   ═══════════════════════════════════════════════════════════════ */
function Experience() {
  const [headRef, headIn] = useInView(0.25);
  const [tlRef, tlIn] = useInView(0.08);
  const [endRef, endIn] = useInView(0.3);

  return (
    <section
      id="experience"
      className="ex-font-body relative overflow-hidden"
      style={{ background: C.bg, scrollMarginTop: "88px" }}
    >
      {/* ════════ STYLES ════════ */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700;800&family=Inter:wght@300;400;500;600;700&display=swap');

        .ex-font-display{font-family:'Space Grotesk',sans-serif}
        .ex-font-body{font-family:'Inter',sans-serif}

        /* ── Keyframes ── */
        @keyframes ex-fade-up{from{opacity:0;transform:translateY(38px)}to{opacity:1;transform:translateY(0)}}
        @keyframes ex-aurora-shift{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}
        @keyframes ex-underline{from{transform:scaleX(0)}to{transform:scaleX(1)}}
        @keyframes ex-blob{0%,100%{transform:translate(0,0) scale(1)}33%{transform:translate(28px,-22px) scale(1.07)}66%{transform:translate(-18px,18px) scale(0.94)}}
        @keyframes ex-particle{
          0%,100%{transform:translate(0,0);opacity:var(--po)}
          25%{transform:translate(16px,-20px);opacity:calc(var(--po)*1.5)}
          50%{transform:translate(-12px,-30px);opacity:var(--po)}
          75%{transform:translate(18px,-12px);opacity:calc(var(--po)*0.5)}
        }
        @keyframes ex-pulse-ring{0%{transform:scale(1);opacity:.25}100%{transform:scale(2.4);opacity:0}}
        @keyframes ex-dot-breathe{0%,100%{transform:scale(1)}50%{transform:scale(1.08)}}
        @keyframes ex-typing-dot{0%,60%,100%{opacity:.2;transform:translateY(0)}30%{opacity:1;transform:translateY(-4px)}}

        @media(prefers-reduced-motion:reduce){
          .ex-anim,.ex-anim *{animation:none!important;transition:none!important}
        }

        /* ── Grid BG ── */
        .ex-grid{
          background-image:radial-gradient(circle,${C.borderSoft} 1px,transparent 1px);
          background-size:38px 38px;
          -webkit-mask-image:radial-gradient(ellipse 55% 60% at 30% 50%,black 15%,transparent 75%);
          mask-image:radial-gradient(ellipse 55% 60% at 30% 50%,black 15%,transparent 75%);
        }

        /* ── Aurora text ── */
        .ex-wordmark{
          background-image:${AURORA};background-size:300% auto;
          -webkit-background-clip:text;background-clip:text;
          -webkit-text-fill-color:transparent;
          animation:ex-aurora-shift 6s ease-in-out infinite;
        }

        /* ── Underline ── */
        .ex-underline-el{transform-origin:center;animation:ex-underline .8s cubic-bezier(.65,0,.35,1) .5s both}

        /* ── Blobs ── */
        .ex-blob-1{animation:ex-blob 18s ease-in-out infinite}
        .ex-blob-2{animation:ex-blob 22s ease-in-out infinite reverse}

        /* ── Noise ── */
        .ex-noise::after{
          content:'';position:absolute;inset:0;opacity:.018;pointer-events:none;
          background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          background-repeat:repeat;background-size:128px 128px;
        }

        /* ── Dot glow ── */
        .ex-dot-glow{animation:ex-pulse-ring 3s ease-out infinite}
        .ex-dot{animation:ex-dot-breathe 4s ease-in-out infinite}

        /* ── Card ── */
        .ex-card{
          transition:border-color .4s ease,box-shadow .4s ease,background .4s ease,border-left-color .4s ease;
        }
        .ex-card:hover{
          border-color:rgba(59,130,246,.3)!important;
          box-shadow:0 24px 52px -18px rgba(59,130,246,.16);
          background:${C.surfaceAlt};
        }

        /* Aurora border pseudo */
        .ex-card-aurora{
          position:absolute;inset:-1px;border-radius:inherit;padding:1px;z-index:1;pointer-events:none;
          background-image:${AURORA};background-size:300% auto;
          -webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);
          -webkit-mask-composite:xor;mask-composite:exclude;
          opacity:0;transition:opacity .4s ease;
        }
        .ex-card:hover .ex-card-aurora{opacity:1;animation:ex-aurora-shift 4s ease-in-out infinite}

        /* Number hover */
        .ex-card:hover span[style*="color: rgb(24, 28, 56)"]{
          /* Handled via inline style transition */
        }

        /* ── Typing dots ── */
        .ex-typing-dot{
          display:inline-block;width:6px;height:6px;border-radius:50%;
          background:${C.violet};margin:0 2px;
        }
        .ex-typing-dot:nth-child(1){animation:ex-typing-dot 1.4s ease-in-out infinite 0s}
        .ex-typing-dot:nth-child(2){animation:ex-typing-dot 1.4s ease-in-out infinite .2s}
        .ex-typing-dot:nth-child(3){animation:ex-typing-dot 1.4s ease-in-out infinite .4s}
      `}</style>

      {/* ════════ TOP DIVIDER ════════ */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          backgroundImage: AURORA,
          backgroundSize: "300% auto",
          opacity: 0.35,
          animation: "ex-aurora-shift 6s ease-in-out infinite",
        }}
      />

      {/* ════════ AMBIENT BACKGROUND ════════ */}
      <div className="ex-anim ex-noise absolute inset-0 pointer-events-none">
        <div className="ex-grid absolute inset-0 opacity-50" />

        <div
          className="ex-blob-1 absolute rounded-full"
          style={{
            width: 460,
            height: 460,
            top: "5%",
            right: "-14%",
            background: `radial-gradient(circle,${C.violet}18,transparent 70%)`,
            filter: "blur(65px)",
          }}
        />
        <div
          className="ex-blob-2 absolute rounded-full"
          style={{
            width: 400,
            height: 400,
            bottom: "2%",
            left: "-16%",
            background: `radial-gradient(circle,${C.pink}14,transparent 70%)`,
            filter: "blur(60px)",
          }}
        />

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
              animation: `ex-particle ${p.dur}s ease-in-out ${p.del}s infinite`,
              opacity: p.op,
              filter: p.size > 2 ? "blur(1px)" : "none",
            }}
          />
        ))}
      </div>

      {/* ════════ CONTENT ════════ */}
      <div className="relative z-10 container mx-auto px-5 sm:px-6 lg:px-8 py-24 sm:py-32 lg:py-40">
        <div className="max-w-4xl mx-auto">

          {/* ════════════════ HEADING ════════════════ */}
          <div
            ref={headRef}
            className="text-center mb-16 lg:mb-20"
            style={
              headIn
                ? {
                    animation:
                      "ex-fade-up 0.7s cubic-bezier(0.16,1,0.3,1) both",
                  }
                : { opacity: 0 }
            }
          >
            {/* Badge */}
            <span
              className="inline-flex items-center gap-2.5 text-[11px] sm:text-xs font-semibold tracking-[0.18em] uppercase mb-5 px-5 py-2 rounded-full"
              style={{
                color: C.amber,
                background: C.amberSoft,
                border: `1px solid rgba(147,197,253,0.18)`,
              }}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
              </svg>
              Journey
            </span>

            <h2
              className="ex-font-display text-4xl sm:text-5xl lg:text-[3.4rem] font-extrabold leading-tight"
              style={{ color: C.text }}
            >
              My <span className="ex-wordmark">Experience</span>
            </h2>

            <div className="flex justify-center mt-5 mb-6">
              <span
                className="ex-underline-el block h-[3px] w-24 rounded-full"
                style={{
                  backgroundImage: AURORA,
                  backgroundSize: "300% auto",
                  animation: "ex-aurora-shift 4s ease-in-out infinite",
                }}
              />
            </div>

            <p
              className="max-w-2xl mx-auto text-base lg:text-lg leading-relaxed"
              style={{ color: C.muted }}
            >
              My learning journey, internship experience and MERN stack
              projects that shaped my skills.
            </p>
          </div>

          {/* ════════════════ TIMELINE ════════════════ */}
          <div ref={tlRef}>
            {timeline.map((item, index) => (
              <TimelineItem
                key={item.id}
                item={item}
                index={index}
                total={timeline.length}
                visible={tlIn}
              />
            ))}
          </div>

          {/* ════════════════ "STILL LEARNING" INDICATOR ════════════════ */}
          <div
            ref={endRef}
            className="flex items-center gap-4 pl-6 sm:pl-7 lg:pl-8"
            style={
              endIn
                ? {
                    animation:
                      "ex-fade-up 0.6s cubic-bezier(0.16,1,0.3,1) 0.3s both",
                  }
                : { opacity: 0 }
            }
          >
            {/* Small dot on the line axis */}
            <div className="relative shrink-0">
              <div
                className="w-3 h-3 rounded-full"
                style={{
                  background: C.violet,
                  boxShadow: `0 0 12px ${C.violet}66`,
                }}
              />
              <div
                className="absolute inset-[-4px] rounded-full"
                style={{
                  border: `1.5px dashed ${C.violet}33`,
                  animation: "ex-pulse-ring 3s ease-out infinite",
                }}
              />
            </div>

            <div className="flex items-center gap-3 py-2">
              <span
                className="text-sm font-medium"
                style={{ color: C.muted }}
              >
                Still learning
              </span>
              <span className="flex items-center">
                <span className="ex-typing-dot" />
                <span className="ex-typing-dot" />
                <span className="ex-typing-dot" />
              </span>
            </div>
          </div>

          {/* ════════════════ SUMMARY STATS ════════════════ */}
          <div
            className="mt-16 lg:mt-20 grid grid-cols-3 gap-4 sm:gap-6"
            style={
              endIn
                ? {
                    animation:
                      "ex-fade-up 0.7s cubic-bezier(0.16,1,0.3,1) 0.5s both",
                  }
                : { opacity: 0 }
            }
          >
            {[
              { value: "1+", label: "Year Learning", color: C.cyan },
              { value: "15+", label: "Projects Built", color: C.violet },
              { value: "10+", label: "Technologies", color: C.pink },
            ].map((stat, i) => (
              <div
                key={stat.label}
                className="text-center py-5 sm:py-6 rounded-2xl transition-all duration-300 hover:-translate-y-1"
                style={{
                  background: C.surface,
                  border: `1px solid ${C.border}`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = `${stat.color}33`;
                  e.currentTarget.style.boxShadow = `0 8px 24px -12px ${stat.color}22`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = C.border;
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <div
                  className="ex-font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold mb-1"
                  style={{
                    background: `linear-gradient(135deg, ${stat.color}, ${C.violet})`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {stat.value}
                </div>
                <div
                  className="text-[10px] sm:text-[11px] font-semibold tracking-[0.14em] uppercase"
                  style={{ color: C.muted }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ════════ BOTTOM DIVIDER ════════ */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{
          backgroundImage: AURORA,
          backgroundSize: "300% auto",
          opacity: 0.15,
          animation: "ex-aurora-shift 6s ease-in-out infinite",
        }}
      />
    </section>
  );
}

export default Experience;