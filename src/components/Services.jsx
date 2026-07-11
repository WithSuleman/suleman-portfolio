import { useEffect, useRef, useState, useCallback } from "react";
import { FaCode, FaLaptopCode, FaMobileAlt } from "react-icons/fa";
import { FiArrowUpRight } from "react-icons/fi";

/* ═══════════════════════════════════════════════════════════════
   AURORA PALETTE — Cohesive with About section
   ═══════════════════════════════════════════════════════════════ */
const C = {
  bg: "#05060E",
  surface: "#0A0C1A",
  surfaceAlt: "#0E1128",
  border: "#181C38",
  borderSoft: "rgba(139, 92, 246, 0.08)",
  text: "#F0EEFF",
  textSec: "#B4B7D6",
  muted: "#6B7199",
  violet: "#8B5CF6",
  violetSoft: "rgba(139, 92, 246, 0.1)",
  pink: "#EC4899",
  pinkSoft: "rgba(236, 72, 153, 0.1)",
  cyan: "#06B6D4",
  cyanSoft: "rgba(6, 182, 212, 0.1)",
  amber: "#F59E0B",
  amberSoft: "rgba(245, 158, 11, 0.1)",
};

const AURORA = `linear-gradient(90deg, ${C.violet}, ${C.pink}, ${C.amber}, ${C.cyan}, ${C.violet})`;

/* ═══════════════════════════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════════════════════════ */
const services = [
  {
    id: 1,
    icon: <FaCode size={28} />,
    title: "Frontend Development",
    description:
      "Building modern, responsive and high-performance websites using React, JavaScript and Tailwind CSS with clean and maintainable code.",
    color: C.violet,
    soft: C.violetSoft,
    tag: "React · JS · Tailwind",
  },
  {
    id: 2,
    icon: <FaLaptopCode size={28} />,
    title: "UI / UX Implementation",
    description:
      "Converting Figma, Adobe XD or design mockups into pixel-perfect, responsive and interactive user interfaces.",
    color: C.pink,
    soft: C.pinkSoft,
    tag: "Figma · Adobe XD · Pixel-Perfect",
  },
  {
    id: 3,
    icon: <FaMobileAlt size={28} />,
    title: "Responsive Web Design",
    description:
      "Creating websites that work smoothly across desktops, tablets and mobile devices with an excellent user experience.",
    color: C.cyan,
    soft: C.cyanSoft,
    tag: "Mobile-First · Cross-Platform",
  },
];

const processSteps = [
  { num: "01", title: "Discovery", desc: "Understand your goals & requirements" },
  { num: "02", title: "Design", desc: "Plan layout, flow & components" },
  { num: "03", title: "Develop", desc: "Write clean, performant code" },
  { num: "04", title: "Deliver", desc: "Test, refine & launch" },
];

/* Floating particles — generated once */
const PARTICLES = Array.from({ length: 16 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 2.5 + 0.8,
  dur: Math.random() * 22 + 14,
  del: Math.random() * -20,
  op: Math.random() * 0.18 + 0.04,
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
   3D TILT CARD
   ═══════════════════════════════════════════════════════════════ */
function TiltCard({ children, className, style }) {
  const ref = useRef(null);
  const onMove = useCallback((e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform =
      `perspective(800px) rotateX(${y * -8}deg) rotateY(${x * 8}deg) scale3d(1.02,1.02,1.02)`;
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
        transition: "transform 0.55s cubic-bezier(0.03,0.98,0.52,0.99)",
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
   SERVICE CARD
   ═══════════════════════════════════════════════════════════════ */
function ServiceCard({ service, index, visible }) {
  const numStr = `0${service.id}`;
  return (
    <TiltCard
      className="sv-card group relative rounded-2xl p-7 sm:p-8 flex flex-col"
      style={{
        background: C.surface,
        border: `1px solid ${C.border}`,
        animation: visible
          ? `sv-fade-up 0.7s cubic-bezier(0.16,1,0.3,1) ${0.15 + index * 0.13}s both`
          : "none",
        opacity: visible ? undefined : 0,
      }}
    >
      {/* Aurora border on hover */}
      <div className="sv-card-border" />

      {/* Glow spot — follows the accent color */}
      <div
        className="absolute -top-20 -right-20 w-48 h-48 rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700"
        style={{
          background: `radial-gradient(circle, ${service.color}18, transparent 70%)`,
          filter: "blur(30px)",
        }}
      />

      {/* Top row: number + icon */}
      <div className="flex items-start justify-between mb-6 relative z-10">
        <span
          className="sv-font-display text-5xl sm:text-6xl font-extrabold leading-none select-none transition-colors duration-500"
          style={{ color: C.border }}
          onMouseEnter={(e) => (e.target.style.color = `${service.color}44`)}
          onMouseLeave={(e) => (e.target.style.color = C.border)}
        >
          {numStr}
        </span>
        <div
          className="sv-icon-wrap flex items-center justify-center rounded-2xl shrink-0"
          style={{
            width: 60,
            height: 60,
            background: service.soft,
            color: service.color,
            "--ic": `${service.color}44`,
          }}
        >
          {service.icon}
        </div>
      </div>

      {/* Tag pill */}
      <div className="mb-4 relative z-10">
        <span
          className="inline-block text-[10px] font-semibold tracking-[0.14em] uppercase px-3 py-1 rounded-full"
          style={{
            color: service.color,
            background: service.soft,
            border: `1px solid ${service.color}18`,
          }}
        >
          {service.tag}
        </span>
      </div>

      {/* Title */}
      <h3
        className="sv-font-display text-xl sm:text-2xl font-bold mb-3 relative z-10 transition-colors duration-500"
        style={{ color: C.text }}
      >
        {service.title}
      </h3>

      {/* Description */}
      <p
        className="text-sm sm:text-[15px] leading-[1.8] mb-6 flex-1 relative z-10"
        style={{ color: C.muted }}
      >
        {service.description}
      </p>

      {/* CTA Link */}
      <a
        href="#contact"
        className="sv-cta-link group/link inline-flex items-center gap-2 text-sm font-semibold relative z-10"
        style={{ color: service.color }}
      >
        <span>Let's Work Together</span>
        <span className="sv-arrow-wrap inline-flex">
          <FiArrowUpRight size={18} strokeWidth={2.5} />
        </span>
      </a>
    </TiltCard>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MAIN SERVICES SECTION
   ═══════════════════════════════════════════════════════════════ */
function Services() {
  const [headRef, headIn] = useInView(0.25);
  const [gridRef, gridIn] = useInView(0.08);
  const [procRef, procIn] = useInView(0.2);
  const [ctaRef, ctaIn] = useInView(0.3);

  return (
    <section
      id="services"
      className="sv-font-body relative overflow-hidden"
      style={{ background: C.bg, scrollMarginTop: "88px" }}
    >
      {/* ════════ STYLES ════════ */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700;800&family=Inter:wght@300;400;500;600;700&display=swap');

        .sv-font-display{font-family:'Space Grotesk',sans-serif}
        .sv-font-body{font-family:'Inter',sans-serif}

        /* ── Keyframes ── */
        @keyframes sv-fade-up{from{opacity:0;transform:translateY(36px)}to{opacity:1;transform:translateY(0)}}
        @keyframes sv-fade-left{from{opacity:0;transform:translateX(-36px)}to{opacity:1;transform:translateX(0)}}
        @keyframes sv-aurora-shift{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}
        @keyframes sv-underline{from{transform:scaleX(0)}to{transform:scaleX(1)}}
        @keyframes sv-blob{0%,100%{transform:translate(0,0) scale(1)}33%{transform:translate(25px,-20px) scale(1.07)}66%{transform:translate(-18px,18px) scale(0.94)}}
        @keyframes sv-particle{
          0%,100%{transform:translate(0,0);opacity:var(--po)}
          25%{transform:translate(15px,-20px);opacity:calc(var(--po)*1.5)}
          50%{transform:translate(-10px,-30px);opacity:var(--po)}
          75%{transform:translate(18px,-12px);opacity:calc(var(--po)*0.5)}
        }
        @keyframes sv-pulse-ring{
          0%{transform:scale(1);opacity:.4}
          100%{transform:scale(2.2);opacity:0}
        }
        @keyframes sv-line-draw{
          from{stroke-dashoffset:100}to{stroke-dashoffset:0}
        }
        @keyframes sv-dot-pop{
          0%{transform:scale(0)}60%{transform:scale(1.3)}100%{transform:scale(1)}
        }

        @media(prefers-reduced-motion:reduce){
          .sv-anim,.sv-anim *{animation:none!important;transition:none!important}
        }

        /* ── Grid BG ── */
        .sv-grid{
          background-image:
            radial-gradient(circle, ${C.borderSoft} 1px, transparent 1px);
          background-size:36px 36px;
          -webkit-mask-image:radial-gradient(ellipse 65% 55% at 50% 50%,black 15%,transparent 75%);
          mask-image:radial-gradient(ellipse 65% 55% at 50% 50%,black 15%,transparent 75%);
        }

        /* ── Aurora text ── */
        .sv-wordmark{
          background-image:${AURORA};
          background-size:300% auto;
          -webkit-background-clip:text;background-clip:text;
          -webkit-text-fill-color:transparent;
          animation:sv-aurora-shift 6s ease-in-out infinite;
        }

        /* ── Underline ── */
        .sv-underline-el{transform-origin:center;animation:sv-underline .8s cubic-bezier(.65,0,.35,1) .5s both}

        /* ── Blobs ── */
        .sv-blob-1{animation:sv-blob 17s ease-in-out infinite}
        .sv-blob-2{animation:sv-blob 21s ease-in-out infinite reverse}

        /* ── Noise ── */
        .sv-noise::after{
          content:'';position:absolute;inset:0;opacity:.018;pointer-events:none;
          background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          background-repeat:repeat;background-size:128px 128px;
        }

        /* ── Service Card ── */
        .sv-card{
          transition:border-color .4s ease,box-shadow .4s ease,background .4s ease;
        }
        .sv-card:hover{
          border-color:rgba(139,92,246,.3);
          box-shadow:0 28px 56px -20px rgba(139,92,246,.18);
          background:${C.surfaceAlt};
        }

        /* Aurora border pseudo */
        .sv-card-border{
          position:absolute;inset:-1px;border-radius:inherit;padding:1px;
          background-image:${AURORA};background-size:300% auto;
          -webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);
          -webkit-mask-composite:xor;mask-composite:exclude;
          opacity:0;transition:opacity .4s ease;pointer-events:none;z-index:1;
        }
        .sv-card:hover .sv-card-border{opacity:1;animation:sv-aurora-shift 4s ease-in-out infinite}

        /* Icon wrap */
        .sv-icon-wrap{
          transition:transform .45s cubic-bezier(.65,0,.35,1),background .4s ease,box-shadow .4s ease;
        }
        .sv-card:hover .sv-icon-wrap{
          transform:scale(1.12) rotate(-5deg);
          box-shadow:0 10px 28px -8px var(--ic);
        }

        /* CTA arrow */
        .sv-arrow-wrap{
          transition:transform .35s cubic-bezier(.65,0,.35,1);
        }
        .sv-cta-link:hover .sv-arrow-wrap{
          transform:translate(3px,-3px) rotate(-8deg);
        }

        /* ── Process step ── */
        .sv-step{
          transition:transform .35s cubic-bezier(.65,0,.35,1),border-color .35s ease,background .35s ease;
        }
        .sv-step:hover{
          transform:translateY(-4px);
          border-color:rgba(139,92,246,.25);
          background:${C.surfaceAlt};
        }
        .sv-step-dot{
          transition:transform .35s ease,box-shadow .35s ease,background .35s ease;
        }
        .sv-step:hover .sv-step-dot{
          transform:scale(1.25);
          box-shadow:0 0 16px ${C.violet}55;
          background:${C.violet};
        }

        /* Process connector line */
        .sv-connector{
          position:absolute;top:20px;left:calc(50% + 20px);right:calc(-50% + 20px);height:2px;
          background:linear-gradient(90deg,${C.violet}44,${C.border}88);
        }
        @media(max-width:767px){.sv-connector{display:none}}

        /* ── CTA Button ── */
        .sv-cta-btn{
          position:relative;overflow:hidden;
          transition:transform .4s cubic-bezier(.65,0,.35,1),box-shadow .4s ease;
        }
        .sv-cta-btn .sv-shine{
          position:absolute;top:0;left:0;height:100%;width:40%;
          background:linear-gradient(120deg,transparent,rgba(255,255,255,.45),transparent);
          transform:translateX(-150%) skewX(-20deg);
        }
        .sv-cta-btn:hover .sv-shine{animation:sv-shine-anim .85s ease forwards}
        .sv-cta-btn:hover{transform:translateY(-4px) scale(1.03);box-shadow:0 22px 44px -14px ${C.pink}55}
        .sv-cta-btn:active{transform:translateY(-1px) scale(.98)}

        @keyframes sv-shine-anim{
          0%{transform:translateX(-150%) skewX(-20deg)}
          100%{transform:translateX(250%) skewX(-20deg)}
        }

        /* ── Scroll indicator pulse ── */
        .sv-scroll-hint{
          animation:sv-fade-up 0.7s cubic-bezier(0.16,1,0.3,1) 1.2s both;
        }
        .sv-scroll-dot{
          animation:sv-pulse-ring 2s ease-out infinite;
        }
      `}</style>

      {/* ════════ TOP AURORA DIVIDER ════════ */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          backgroundImage: AURORA,
          backgroundSize: "300% auto",
          opacity: 0.35,
          animation: "sv-aurora-shift 6s ease-in-out infinite",
        }}
      />

      {/* ════════ AMBIENT BACKGROUND ════════ */}
      <div className="sv-anim sv-noise absolute inset-0 pointer-events-none">
        <div className="sv-grid absolute inset-0 opacity-50" />

        <div
          className="sv-blob-1 absolute rounded-full"
          style={{
            width: 500, height: 500, top: "-10%", left: "-12%",
            background: `radial-gradient(circle, ${C.violet}1a, transparent 70%)`,
            filter: "blur(70px)",
          }}
        />
        <div
          className="sv-blob-2 absolute rounded-full"
          style={{
            width: 440, height: 440, bottom: "-8%", right: "-10%",
            background: `radial-gradient(circle, ${C.cyan}15, transparent 70%)`,
            filter: "blur(65px)",
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
              animation: `sv-particle ${p.dur}s ease-in-out ${p.del}s infinite`,
              opacity: p.op,
              filter: p.size > 2 ? "blur(1px)" : "none",
            }}
          />
        ))}
      </div>

      {/* ════════ CONTENT ════════ */}
      <div className="relative z-10 container mx-auto px-5 sm:px-6 lg:px-8 py-24 sm:py-32 lg:py-40">

        {/* ════════════════ HEADING ════════════════ */}
        <div
          ref={headRef}
          className="text-center mb-16 lg:mb-20"
          style={
            headIn
              ? { animation: "sv-fade-up 0.7s cubic-bezier(0.16,1,0.3,1) both" }
              : { opacity: 0 }
          }
        >
          {/* Badge */}
          <span
            className="inline-flex items-center gap-2.5 text-[11px] sm:text-xs font-semibold tracking-[0.18em] uppercase mb-5 px-5 py-2 rounded-full"
            style={{
              color: C.violet,
              background: C.violetSoft,
              border: `1px solid rgba(139,92,246,0.18)`,
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
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
            What I Offer
          </span>

          <h2
            className="sv-font-display text-4xl sm:text-5xl lg:text-[3.4rem] font-extrabold leading-tight"
            style={{ color: C.text }}
          >
            My <span className="sv-wordmark">Services</span>
          </h2>

          <div className="flex justify-center mt-5 mb-6">
            <span
              className="sv-underline-el block h-[3px] w-24 rounded-full"
              style={{
                backgroundImage: AURORA,
                backgroundSize: "300% auto",
                animation: "sv-aurora-shift 4s ease-in-out infinite",
              }}
            />
          </div>

          <p
            className="max-w-2xl mx-auto text-base lg:text-lg leading-relaxed"
            style={{ color: C.muted }}
          >
            I provide modern frontend development services focused on responsive
            design, clean code and user-friendly interfaces that leave a lasting impression.
          </p>
        </div>

        {/* ════════════════ SERVICES GRID ════════════════ */}
        <div
          ref={gridRef}
          className="grid gap-6 sm:gap-7 md:grid-cols-2 lg:grid-cols-3"
        >
          {services.map((service, index) => (
            <ServiceCard
              key={service.id}
              service={service}
              index={index}
              visible={gridIn}
            />
          ))}
        </div>

        {/* ════════════════ MY PROCESS ════════════════ */}
        <div
          ref={procRef}
          className="mt-24 lg:mt-32"
          style={
            procIn
              ? { animation: "sv-fade-up 0.7s cubic-bezier(0.16,1,0.3,1) both" }
              : { opacity: 0 }
          }
        >
          {/* Section header */}
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-4 mb-4">
              <span
                className="block h-px w-10 sm:w-14"
                style={{
                  background: `linear-gradient(90deg, transparent, ${C.pink})`,
                }}
              />
              <span
                className="text-[11px] font-semibold tracking-[0.2em] uppercase"
                style={{ color: C.pink }}
              >
                How I Work
              </span>
              <span
                className="block h-px w-10 sm:w-14"
                style={{
                  background: `linear-gradient(90deg, ${C.pink}, transparent)`,
                }}
              />
            </div>
            <h3
              className="sv-font-display text-2xl sm:text-3xl lg:text-4xl font-bold"
              style={{ color: C.text }}
            >
              My <span className="sv-wordmark">Process</span>
            </h3>
          </div>

          {/* Steps */}
          <div className="relative grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {processSteps.map((step, i) => (
              <div
                key={step.num}
                className="sv-step relative rounded-2xl p-5 sm:p-6 text-center"
                style={{
                  background: C.surface,
                  border: `1px solid ${C.border}`,
                  animation: procIn
                    ? `sv-fade-up 0.55s cubic-bezier(0.16,1,0.3,1) ${0.2 + i * 0.1}s both`
                    : "none",
                  opacity: procIn ? undefined : 0,
                }}
              >
                {/* Connector line (between steps, desktop only) */}
                {i < processSteps.length - 1 && (
                  <div className="sv-connector hidden md:block" />
                )}

                {/* Dot */}
                <div className="flex justify-center mb-4">
                  <div
                    className="sv-step-dot w-10 h-10 rounded-full flex items-center justify-center sv-font-display text-sm font-bold"
                    style={{
                      background: C.border,
                      color: C.muted,
                    }}
                  >
                    {step.num}
                  </div>
                </div>

                <h4
                  className="sv-font-display text-base sm:text-lg font-semibold mb-2"
                  style={{ color: C.text }}
                >
                  {step.title}
                </h4>
                <p
                  className="text-xs sm:text-sm leading-relaxed"
                  style={{ color: C.muted }}
                >
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ════════════════ BOTTOM CTA ════════════════ */}
        <div
          ref={ctaRef}
          className="mt-24 lg:mt-32 text-center"
          style={
            ctaIn
              ? {
                  animation:
                    "sv-fade-up 0.7s cubic-bezier(0.16,1,0.3,1) 0.15s both",
                }
              : { opacity: 0 }
          }
        >
          <div className="relative inline-block p-[1px] rounded-3xl overflow-hidden">
            {/* Animated gradient border */}
            <div
              className="absolute inset-0 rounded-3xl"
              style={{
                backgroundImage: AURORA,
                backgroundSize: "300% auto",
                animation: "sv-aurora-shift 5s ease-in-out infinite",
                opacity: 0.6,
              }}
            />

            <div
              className="relative rounded-3xl px-8 sm:px-12 py-10 sm:py-12"
              style={{ background: C.surface }}
            >
              <p
                className="text-sm sm:text-base mb-4 max-w-md mx-auto leading-relaxed"
                style={{ color: C.muted }}
              >
                Have a project in mind? Let's turn your idea into reality.
              </p>
              <h3
                className="sv-font-display text-2xl sm:text-3xl lg:text-4xl font-bold mb-8"
                style={{ color: C.text }}
              >
                Ready to <span className="sv-wordmark">Start</span>?
              </h3>

              <a
                href="#contact"
                className="sv-cta-btn sv-font-body inline-flex items-center gap-3 px-8 py-4 rounded-2xl font-semibold text-sm tracking-wide"
                style={{
                  color: "#05060E",
                  backgroundImage: `linear-gradient(135deg, ${C.violet}, ${C.pink}, ${C.amber})`,
                  boxShadow: `0 14px 36px -14px ${C.violet}55`,
                }}
              >
                <span className="sv-shine" />
                Get In Touch
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </a>
            </div>
          </div>

          {/* Scroll hint */}
          <div className="sv-scroll-hint mt-12 flex flex-col items-center gap-2">
            <span
              className="text-[10px] tracking-[0.2em] uppercase font-medium"
              style={{ color: C.muted }}
            >
              Scroll to explore more
            </span>
            <div className="relative w-5 h-8 rounded-full border flex items-start justify-center p-1.5" style={{ borderColor: C.border }}>
              <div
                className="w-1 h-2 rounded-full"
                style={{
                  background: C.violet,
                  animation: "sv-fade-up 1.5s ease-in-out infinite",
                }}
              />
            </div>
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
          animation: "sv-aurora-shift 6s ease-in-out infinite",
        }}
      />
    </section>
  );
}

export default Services;