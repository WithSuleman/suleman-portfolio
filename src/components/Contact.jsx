import { useEffect, useRef, useState, useCallback } from "react";
import {
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
} from "react-icons/fa";
import {
  FiSend,
  FiGithub,
  FiLinkedin,
} from "react-icons/fi";

/* ═══════════════════════════════════════════════════════════════
   AURORA PALETTE — identical across the entire portfolio
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
const contactInfo = [
  {
    icon: <FaEnvelope size={20} />,
    label: "Email",
    value: "s07031862@gmail.com",
    href: "mailto:s07031862@gmail.com",
    color: C.violet,
    soft: C.violetSoft,
  },
  {
    icon: <FaPhoneAlt size={20} />,
    label: "Phone",
    value: "+92 329 0758748",
    href: "tel:+923290758748",
    color: C.cyan,
    soft: C.cyanSoft,
  },
  {
    icon: <FaMapMarkerAlt size={20} />,
    label: "Location",
    value: "Faisalabad, Pakistan",
    href: null,
    color: C.pink,
    soft: C.pinkSoft,
  },
];

const socials = [
  { icon: <FiGithub size={18} />, label: "GitHub", href: "https://github.com/WithSuleman", color: C.textSec },
  { icon: <FiLinkedin size={18} />, label: "LinkedIn", href: "https://www.linkedin.com/in/muhammad-suleman-a97943378", color: C.cyan },
];

/* Particles — generated once */
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
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

/* ═══════════════════════════════════════════════════════════════
   3D TILT
   ═══════════════════════════════════════════════════════════════ */
function TiltCard({ children, className, style }) {
  const ref = useRef(null);
  const onMove = useCallback((e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(800px) rotateX(${y * -6}deg) rotateY(${x * 6}deg) scale3d(1.02,1.02,1.02)`;
  }, []);
  const onLeave = useCallback(() => {
    if (ref.current)
      ref.current.style.transform = "perspective(800px) rotateX(0) rotateY(0) scale3d(1,1,1)";
  }, []);
  return (
    <div
      ref={ref}
      className={className}
      style={{
        ...style,
        transition: "transform 0.55s cubic-bezier(0.03,0.98,0.52,0.99), border-color 0.4s ease, box-shadow 0.4s ease, background 0.4s ease",
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
   FLOATING-LABEL INPUT
   ═══════════════════════════════════════════════════════════════ */
function FloatingInput({ type = "text", name, placeholder, required = true, rows }) {
  const [focused, setFocused] = useState(false);
  const [value, setValue] = useState("");
  const isActive = focused || value.length > 0;
  const Tag = rows ? "textarea" : "input";

  return (
    <div className="ct-input-wrap relative">
      <Tag
        name={name}
        type={rows ? undefined : type}
        rows={rows}
        required={required}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="ct-input peer w-full rounded-xl px-5 pt-6 pb-3 text-sm outline-none resize-none"
        style={{
          background: C.bg,
          border: `1.5px solid ${focused ? C.violet : C.border}`,
          color: C.text,
          boxShadow: focused ? `0 0 0 3px ${C.violet}18, 0 8px 24px -8px ${C.violet}15` : "none",
          transition: "border-color 0.3s ease, box-shadow 0.3s ease",
        }}
      />
      <label
        className="ct-label absolute left-5 pointer-events-none text-sm origin-left"
        style={{
          top: isActive ? "10px" : "50%",
          transform: isActive ? "translateY(0) scale(0.75)" : "translateY(-50%) scale(1)",
          color: focused ? C.violet : C.muted,
          transition: "top 0.25s cubic-bezier(0.16,1,0.3,1), transform 0.25s cubic-bezier(0.16,1,0.3,1), color 0.3s ease",
        }}
      >
        {placeholder}
      </label>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   CONTACT INFO CARD
   ═══════════════════════════════════════════════════════════════ */
function InfoCard({ item, index, visible }) {
  const Wrapper = item.href ? "a" : "div";
  const wrapperProps = item.href
    ? { href: item.href, target: item.href.startsWith("http") ? "_blank" : undefined, rel: item.href.startsWith("http") ? "noreferrer" : undefined }
    : {};

  return (
    <TiltCard
      className="ct-info-card group relative rounded-2xl p-5 sm:p-6 flex items-center gap-5"
      style={{
        background: C.surface,
        border: `1px solid ${C.border}`,
        animation: visible
          ? `ct-fade-up 0.6s cubic-bezier(0.16,1,0.3,1) ${0.15 + index * 0.1}s both`
          : "none",
        opacity: visible ? undefined : 0,
        ...(item.href ? { cursor: "pointer", textDecoration: "none" } : {}),
      }}
    >
      {/* Aurora border */}
      <div className="ct-card-aurora" />

      {/* Glow spot */}
      <div
        className="absolute -top-16 -left-16 w-36 h-36 rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700"
        style={{
          background: `radial-gradient(circle, ${item.color}14, transparent 70%)`,
          filter: "blur(25px)",
        }}
      />

      {/* Icon */}
      <div
        className="ct-icon-wrap relative z-10 flex items-center justify-center rounded-xl shrink-0"
        style={{
          width: 52,
          height: 52,
          background: item.soft,
          color: item.color,
          "--ic": `${item.color}44`,
        }}
      >
        {item.icon}
      </div>

      {/* Text */}
      <div className="relative z-10 min-w-0">
        <p className="text-[11px] font-semibold tracking-[0.14em] uppercase mb-1" style={{ color: C.muted }}>
          {item.label}
        </p>
        <p className="text-sm sm:text-[15px] font-medium truncate" style={{ color: C.text }}>
          {item.value}
        </p>
      </div>

      {/* Arrow hint for clickable */}
      {item.href && (
        <div className="ml-auto relative z-10 shrink-0">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke={C.muted}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="ct-arrow-icon transition-all duration-300"
            style={{ color: C.muted }}
          >
            <line x1="7" y1="17" x2="17" y2="7" />
            <polyline points="7 7 17 7 17 17" />
          </svg>
        </div>
      )}
    </TiltCard>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MAIN CONTACT SECTION
   ═══════════════════════════════════════════════════════════════ */
function Contact() {
  const [headRef, headIn] = useInView(0.25);
  const [leftRef, leftIn] = useInView(0.1);
  const [rightRef, rightIn] = useInView(0.1);
  const [socialRef, socialIn] = useInView(0.3);
  
  // idle | sending | sent | error
  const [formStatus, setFormStatus] = useState("idle");
  
  // formKey forces React to remount inputs, safely clearing internal states
  const [formKey, setFormKey] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus("sending");

    const formData = new FormData(e.target);
    formData.append("access_key", "9631f104-d4f1-4963-9cf3-4a47ad322116");

    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: json,
      });

      const result = await response.json();

      if (result.success) {
        setFormStatus("sent");
        // Remount inputs to clear them safely without uncontrolled warnings
        setFormKey((prev) => prev + 1);
        // Revert button back to normal after 4 seconds
        setTimeout(() => setFormStatus("idle"), 4000);
      } else {
        setFormStatus("error");
        setTimeout(() => setFormStatus("idle"), 4000);
      }
    } catch (error) {
      console.error("Error:", error.message);
      setFormStatus("error");
      setTimeout(() => setFormStatus("idle"), 4000);
    }
  };

  return (
    <section
      id="contact"
      className="ct-font-body relative overflow-hidden"
      style={{ background: C.bg, scrollMarginTop: "88px" }}
    >
      {/* ════════ STYLES ════════ */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700;800&family=Inter:wght@300;400;500;600;700&display=swap');

        .ct-font-display{font-family:'Space Grotesk',sans-serif}
        .ct-font-body{font-family:'Inter',sans-serif}

        /* ── Keyframes ── */
        @keyframes ct-fade-up{from{opacity:0;transform:translateY(38px)}to{opacity:1;transform:translateY(0)}}
        @keyframes ct-fade-left{from{opacity:0;transform:translateX(-32px)}to{opacity:1;transform:translateX(0)}}
        @keyframes ct-fade-right{from{opacity:0;transform:translateX(32px)}to{opacity:1;transform:translateX(0)}}
        @keyframes ct-aurora-shift{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}
        @keyframes ct-underline{from{transform:scaleX(0)}to{transform:scaleX(1)}}
        @keyframes ct-blob{0%,100%{transform:translate(0,0) scale(1)}33%{transform:translate(26px,-20px) scale(1.07)}66%{transform:translate(-16px,16px) scale(0.94)}}
        @keyframes ct-particle{
          0%,100%{transform:translate(0,0);opacity:var(--po)}
          25%{transform:translate(14px,-18px);opacity:calc(var(--po)*1.5)}
          50%{transform:translate(-10px,-28px);opacity:var(--po)}
          75%{transform:translate(16px,-10px);opacity:calc(var(--po)*0.5)}
        }
        @keyframes ct-pulse-ring{0%{transform:scale(1);opacity:.3}100%{transform:scale(2.2);opacity:0}}
        @keyframes ct-check-draw{to{stroke-dashoffset:0}}
        @keyframes ct-shake{0%,100%{transform:translateX(0)}20%,60%{transform:translateX(-4px)}40%,80%{transform:translateX(4px)}}
        @keyframes ct-spin{to{transform:rotate(360deg)}}

        @media(prefers-reduced-motion:reduce){
          .ct-anim,.ct-anim *{animation:none!important;transition:none!important}
        }

        /* ── Grid BG ── */
        .ct-grid{
          background-image:radial-gradient(circle,${C.borderSoft} 1px,transparent 1px);
          background-size:38px 38px;
          -webkit-mask-image:radial-gradient(ellipse 60% 55% at 60% 50%,black 15%,transparent 75%);
          mask-image:radial-gradient(ellipse 60% 55% at 60% 50%,black 15%,transparent 75%);
        }

        /* ── Aurora text ── */
        .ct-wordmark{
          background-image:${AURORA};background-size:300% auto;
          -webkit-background-clip:text;background-clip:text;
          -webkit-text-fill-color:transparent;
          animation:ct-aurora-shift 6s ease-in-out infinite;
        }

        /* ── Underline ── */
        .ct-underline-el{transform-origin:center;animation:ct-underline .8s cubic-bezier(.65,0,.35,1) .5s both}

        /* ── Blobs ── */
        .ct-blob-1{animation:ct-blob 18s ease-in-out infinite}
        .ct-blob-2{animation:ct-blob 22s ease-in-out infinite reverse}

        /* ── Noise ── */
        .ct-noise::after{
          content:'';position:absolute;inset:0;opacity:.018;pointer-events:none;
          background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          background-repeat:repeat;background-size:128px 128px;
        }

        /* ── Info card ── */
        .ct-info-card{
          transition:border-color .4s ease,box-shadow .4s ease,background .4s ease;
        }
        .ct-info-card:hover{
          border-color:rgba(139,92,246,.3);
          box-shadow:0 20px 44px -16px rgba(139,92,246,.14);
          background:${C.surfaceAlt};
        }
        .ct-info-card:hover .ct-arrow-icon{
          transform:translate(2px,-2px) rotate(-12deg);
          color:${C.violet};
        }

        /* Aurora border pseudo */
        .ct-card-aurora{
          position:absolute;inset:-1px;border-radius:inherit;padding:1px;z-index:1;pointer-events:none;
          background-image:${AURORA};background-size:300% auto;
          -webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);
          -webkit-mask-composite:xor;mask-composite:exclude;
          opacity:0;transition:opacity .4s ease;
        }
        .ct-info-card:hover .ct-card-aurora{opacity:1;animation:ct-aurora-shift 4s ease-in-out infinite}

        /* Icon wrap */
        .ct-icon-wrap{
          transition:transform .4s cubic-bezier(.65,0,.35,1),background .4s ease,box-shadow .4s ease;
        }
        .ct-info-card:hover .ct-icon-wrap{
          transform:scale(1.1) rotate(-4deg);
          box-shadow:0 8px 22px -6px var(--ic);
        }

        /* ── Form card ── */
        .ct-form-card{
          transition:border-color .4s ease,box-shadow .4s ease;
        }
        .ct-form-card:hover{
          border-color:rgba(139,92,246,.18);
          box-shadow:0 12px 36px -14px rgba(139,92,246,.1);
        }

        /* ── Send button ── */
        .ct-send-btn{
          position:relative;overflow:hidden;
          transition:transform .4s cubic-bezier(.65,0,.35,1),box-shadow .4s ease,opacity .3s ease;
        }
        .ct-send-btn .ct-shine{
          position:absolute;top:0;left:0;height:100%;width:40%;
          background:linear-gradient(120deg,transparent,rgba(255,255,255,.45),transparent);
          transform:translateX(-150%) skewX(-20deg);
        }
        .ct-send-btn:hover .ct-shine{animation:ct-shine-anim .85s ease forwards}
        .ct-send-btn:hover:not(:disabled){
          transform:translateY(-3px) scale(1.02);
          box-shadow:0 18px 40px -14px ${C.violet}55;
        }
        .ct-send-btn:active:not(:disabled){transform:translateY(-1px) scale(.98)}
        .ct-send-btn:disabled{opacity:.7;cursor:not-allowed}

        @keyframes ct-shine-anim{
          0%{transform:translateX(-150%) skewX(-20deg)}
          100%{transform:translateX(250%) skewX(-20deg)}
        }

        /* Spinner */
        .ct-spinner{
          width:20px;height:20px;border:2.5px solid rgba(5,6,14,.2);
          border-top-color:#05060E;border-radius:50%;animation:ct-spin .7s linear infinite;
          display:inline-block;
        }

        /* Check icon */
        .ct-check-icon{stroke-dasharray:24;stroke-dashoffset:24;animation:ct-check-draw .4s ease .1s forwards}

        /* ── Social icon ── */
        .ct-social{
          transition:transform .3s cubic-bezier(.65,0,.35,1),border-color .3s ease,background .3s ease,color .3s ease,box-shadow .3s ease;
        }
        .ct-social:hover{
          transform:translateY(-4px) scale(1.08);
          border-color:${C.violet};
          background:${C.violetSoft};
          color:${C.violet};
          box-shadow:0 10px 28px -10px ${C.violet}33;
        }

        /* ── Map placeholder ── */
        .ct-map{
          transition:border-color .4s ease,box-shadow .4s ease;
        }
        .ct-map:hover{
          border-color:rgba(139,92,246,.15);
          box-shadow:0 8px 24px -12px rgba(139,92,246,.08);
        }
      `}</style>

      {/* ════════ TOP DIVIDER ════════ */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          backgroundImage: AURORA,
          backgroundSize: "300% auto",
          opacity: 0.35,
          animation: "ct-aurora-shift 6s ease-in-out infinite",
        }}
      />

      {/* ════════ AMBIENT BACKGROUND ════════ */}
      <div className="ct-anim ct-noise absolute inset-0 pointer-events-none">
        <div className="ct-grid absolute inset-0 opacity-50" />

        <div
          className="ct-blob-1 absolute rounded-full"
          style={{
            width: 480, height: 480, top: "-6%", left: "-14%",
            background: `radial-gradient(circle,${C.violet}16,transparent 70%)`,
            filter: "blur(65px)",
          }}
        />
        <div
          className="ct-blob-2 absolute rounded-full"
          style={{
            width: 420, height: 420, bottom: "-8%", right: "-12%",
            background: `radial-gradient(circle,${C.cyan}14,transparent 70%)`,
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
              animation: `ct-particle ${p.dur}s ease-in-out ${p.del}s infinite`,
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
              ? { animation: "ct-fade-up 0.7s cubic-bezier(0.16,1,0.3,1) both" }
              : { opacity: 0 }
          }
        >
          {/* Badge */}
          <span
            className="inline-flex items-center gap-2.5 text-[11px] sm:text-xs font-semibold tracking-[0.18em] uppercase mb-5 px-5 py-2 rounded-full"
            style={{
              color: C.emerald,
              background: C.emeraldSoft,
              border: `1px solid rgba(16,185,129,0.18)`,
            }}
          >
            <span
              className="w-2 h-2 rounded-full shrink-0"
              style={{
                background: C.emerald,
                animation: "ct-pulse-ring 2s ease-out infinite",
                boxShadow: `0 0 8px ${C.emerald}`,
              }}
            />
            Open to Work
          </span>

          <h2
            className="ct-font-display text-4xl sm:text-5xl lg:text-[3.4rem] font-extrabold leading-tight"
            style={{ color: C.text }}
          >
            Contact <span className="ct-wordmark">Me</span>
          </h2>

          <div className="flex justify-center mt-5 mb-6">
            <span
              className="ct-underline-el block h-[3px] w-24 rounded-full"
              style={{
                backgroundImage: AURORA,
                backgroundSize: "300% auto",
                animation: "ct-aurora-shift 4s ease-in-out infinite",
              }}
            />
          </div>

          <p
            className="max-w-2xl mx-auto text-base lg:text-lg leading-relaxed"
            style={{ color: C.muted }}
          >
            Have a project in mind or want to work together?
            Feel free to reach out — I'd love to hear from you.
          </p>
        </div>

        {/* ════════════════ TWO-COLUMN GRID ════════════════ */}
        <div className="grid lg:grid-cols-[1fr_1.15fr] xl:grid-cols-[1fr_1.2fr] gap-10 lg:gap-14 xl:gap-20">

          {/* ════════════════ LEFT — INFO ════════════════ */}
          <div
            ref={leftRef}
            style={
              leftIn
                ? { animation: "ct-fade-left 0.8s cubic-bezier(0.16,1,0.3,1) both" }
                : { opacity: 0 }
            }
          >
            <h3
              className="ct-font-display text-2xl sm:text-3xl font-bold mb-8"
              style={{ color: C.text }}
            >
              Let's <span className="ct-wordmark">Talk</span>
            </h3>

            {/* Info cards */}
            <div className="space-y-4 mb-10">
              {contactInfo.map((item, i) => (
                <InfoCard key={item.label} item={item} index={i} visible={leftIn} />
              ))}
            </div>

            {/* Social links */}
            <div
              ref={socialRef}
              style={
                socialIn
                  ? { animation: "ct-fade-up 0.6s cubic-bezier(0.16,1,0.3,1) 0.4s both" }
                  : { opacity: 0 }
              }
            >
              <p
                className="text-[11px] font-semibold tracking-[0.14em] uppercase mb-4"
                style={{ color: C.muted }}
              >
                Find Me On
              </p>
              <div className="flex gap-3">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={s.label}
                    className="ct-social flex items-center justify-center w-12 h-12 rounded-xl"
                    style={{
                      color: s.color,
                      border: `1px solid ${C.border}`,
                      background: C.surface,
                    }}
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Map placeholder — hidden on small screens */}
            <div
              className="ct-map mt-8 hidden lg:block rounded-2xl overflow-hidden relative"
              style={{
                height: "180px",
                background: C.surface,
                border: `1px solid ${C.border}`,
              }}
            >
              {/* Decorative grid inside map */}
              <div
                className="absolute inset-0 opacity-30"
                style={{
                  backgroundImage: `radial-gradient(circle, ${C.borderSoft} 1px, transparent 1px)`,
                  backgroundSize: "20px 20px",
                }}
              />
              {/* Center pin */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative">
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{
                      background: C.violet,
                      boxShadow: `0 0 20px ${C.violet}66, 0 0 60px ${C.violet}22`,
                    }}
                  />
                  <div
                    className="absolute inset-[-8px] rounded-full"
                    style={{
                      border: `1.5px solid ${C.violet}33`,
                      animation: "ct-pulse-ring 2.5s ease-out infinite",
                    }}
                  />
                </div>
              </div>
              {/* Label */}
              <div
                className="absolute bottom-3 left-1/2 -translate-x-1/2 text-[10px] font-semibold tracking-wider uppercase px-3 py-1 rounded-full"
                style={{
                  color: C.muted,
                  background: `${C.bg}cc`,
                  border: `1px solid ${C.border}`,
                  backdropFilter: "blur(8px)",
                }}
              >
                Faisalabad, Pakistan
              </div>
            </div>
          </div>

          {/* ════════════════ RIGHT — FORM ════════════════ */}
          <div
            ref={rightRef}
            style={
              rightIn
                ? { animation: "ct-fade-right 0.8s cubic-bezier(0.16,1,0.3,1) 0.1s both" }
                : { opacity: 0 }
            }
          >
            <form
              onSubmit={handleSubmit}
              className="ct-form-card rounded-2xl p-6 sm:p-8 lg:p-9"
              style={{
                background: C.surface,
                border: `1px solid ${C.border}`,
              }}
            >
              {/* Form header */}
              <div className="mb-7">
                <h4
                  className="ct-font-display text-xl font-bold mb-1"
                  style={{ color: C.text }}
                >
                  Send a Message
                </h4>
                <p className="text-sm" style={{ color: C.muted }}>
                  I'll get back to you as soon as possible.
                </p>
              </div>

              {/* Fields wrapped in a div with formKey to safely reset internal states */}
              <div key={formKey} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <FloatingInput
                    name="name"
                    placeholder="Your Name"
                  />
                  <FloatingInput
                    name="email"
                    type="email"
                    placeholder="Your Email"
                  />
                </div>

                <FloatingInput
                  name="subject"
                  placeholder="Subject"
                />

                <FloatingInput
                  name="message"
                  placeholder="Your Message"
                  rows={5}
                />
              </div>

              {/* Submit button */}
              <div className="mt-5">
                <button
                  type="submit"
                  disabled={formStatus === "sending"}
                  className="ct-send-btn ct-font-display w-full flex items-center justify-center gap-3 px-8 py-4 rounded-xl font-semibold text-sm tracking-wide"
                  style={{
                    color: "#05060E",
                    backgroundImage:
                      formStatus === "sent"
                        ? `linear-gradient(135deg, ${C.emerald}, ${C.cyan})`
                        : formStatus === "error"
                        ? `linear-gradient(135deg, ${C.red}, ${C.pink})`
                        : `linear-gradient(135deg, ${C.violet}, ${C.pink}, ${C.amber})`,
                    boxShadow: `0 14px 36px -14px ${C.violet}44`,
                  }}
                >
                  <span className="ct-shine" />

                  {formStatus === "idle" && (
                    <>
                      <FiSend size={17} strokeWidth={2.5} />
                      <span>Send Message</span>
                    </>
                  )}

                  {formStatus === "sending" && (
                    <>
                      <span className="ct-spinner" />
                      <span>Sending...</span>
                    </>
                  )}

                  {formStatus === "sent" && (
                    <>
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="20 6 9 17 4 12" className="ct-check-icon" />
                      </svg>
                      <span>Message Sent!</span>
                    </>
                  )}

                  {formStatus === "error" && (
                    <>
                      <span style={{ animation: "ct-shake 0.4s ease" }}>✕</span>
                      <span>Failed — Try Again</span>
                    </>
                  )}
                </button>
              </div>

              {/* Bottom note */}
              <p
                className="text-[11px] text-center mt-5 leading-relaxed"
                style={{ color: C.muted }}
              >
                By submitting this form, you agree to a friendly conversation.
                No spam, ever.
              </p>
            </form>
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
          animation: "ct-aurora-shift 6s ease-in-out infinite",
        }}
      />
    </section>
  );
}

export default Contact;