import { useEffect, useRef, useState, useCallback } from "react";
import {
  SiReact,
  SiJavascript,
  SiTailwindcss,
  SiHtml5,
  SiCss,
  SiNodedotjs,
  SiGit,
  SiGithub,
  SiNpm,
  SiVite,
  SiVercel,
  SiBootstrap,
} from "react-icons/si";
import { FaLaptopCode, FaLayerGroup, FaGaugeHigh, FaBoltLightning } from "react-icons/fa6";

/* =====================================================================
   COLOR SYSTEM
===================================================================== */
const C = {
  bg: "#070810",
  panel: "#0C0E1A",
  panelSoft: "#10121F",
  border: "#1C2033",
  borderSoft: "rgba(196, 181, 253, 0.14)",
  text: "#F5F3FF",
  muted: "#9CA3C4",
  violet: "#A78BFA",
  fuchsia: "#F472B6",
  amber: "#FBBF66",
  cyan: "#5EEAD4",
};

const AURORA = `linear-gradient(90deg, ${C.violet}, ${C.fuchsia}, ${C.amber}, ${C.cyan}, ${C.violet})`;
const ACCENTS = [C.violet, C.fuchsia, C.amber, C.cyan];

/* =====================================================================
   SKILLS DATA
===================================================================== */
const skillsData = [
  { id: 1, name: "React.js", level: 92, category: "Frontend", icon: SiReact },
  { id: 2, name: "JavaScript (ES6+)", level: 90, category: "Frontend", icon: SiJavascript },
  { id: 5, name: "Tailwind CSS", level: 95, category: "Frontend", icon: SiTailwindcss },
  { id: 6, name: "HTML5", level: 96, category: "Frontend", icon: SiHtml5 },
  { id: 7, name: "CSS", level: 92, category: "Frontend", icon: SiCss },
  { id: 9, name: "Bootstrap", level: 82, category: "Frontend", icon: SiBootstrap },
  { id: 12, name: "Node.js", level: 82, category: "Backend", icon: SiNodedotjs },
  { id: 18, name: "Git", level: 90, category: "Tools & Design", icon: SiGit },
  { id: 19, name: "GitHub", level: 88, category: "Tools & Design", icon: SiGithub },
  { id: 22, name: "npm", level: 88, category: "Tools & Design", icon: SiNpm },
  { id: 23, name: "Vite", level: 75, category: "Tools & Design", icon: SiVite },
  { id: 25, name: "Vercel", level: 84, category: "Tools & Design", icon: SiVercel },
];

const CATEGORIES = ["All", "Frontend", "Backend", "Tools & Design"];

/* =====================================================================
   HOOK — useInView
===================================================================== */
function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, inView];
}

/* =====================================================================
   HOOK — useCountUp
===================================================================== */
function useCountUp(end, start, duration = 1400) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!start) return;
    let startTime = null;
    let frameId;

    const step = (timestamp) => {
      if (startTime === null) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * end));
      if (progress < 1) frameId = requestAnimationFrame(step);
    };

    frameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frameId);
  }, [start, end, duration]);

  return value;
}

/* =====================================================================
   COMPONENT — CategoryTabs
===================================================================== */
function CategoryTabs({ active, setActive }) {
  const tabRefs = useRef({});
  const wrapRef = useRef(null);
  const [pill, setPill] = useState({ left: 0, width: 0 });

  useEffect(() => {
    const el = tabRefs.current[active];
    const wrap = wrapRef.current;
    if (el && wrap) {
      const elRect = el.getBoundingClientRect();
      const wrapRect = wrap.getBoundingClientRect();
      setPill({ left: elRect.left - wrapRect.left, width: elRect.width });
    }
  }, [active]);

  useEffect(() => {
    const onResize = () => {
      const el = tabRefs.current[active];
      const wrap = wrapRef.current;
      if (el && wrap) {
        const elRect = el.getBoundingClientRect();
        const wrapRect = wrap.getBoundingClientRect();
        setPill({ left: elRect.left - wrapRect.left, width: elRect.width });
      }
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [active]);

  return (
    <div
      ref={wrapRef}
      className="sk-tabs relative inline-flex flex-wrap justify-center items-center gap-1 p-1.5 rounded-2xl mx-auto"
      style={{ background: C.panel, border: `1px solid ${C.border}` }}
      role="tablist"
      aria-label="Skill categories"
    >
      <span
        className="absolute top-1.5 bottom-1.5 rounded-xl transition-all duration-500"
        style={{
          left: pill.left,
          width: pill.width,
          backgroundImage: AURORA,
          backgroundSize: "300% auto",
          opacity: 0.92,
          transitionTimingFunction: "cubic-bezier(0.65,0,0.35,1)",
          boxShadow: `0 0 22px -4px ${C.violet}88`,
        }}
      />
      {CATEGORIES.map((cat) => (
        <button
          key={cat}
          ref={(el) => (tabRefs.current[cat] = el)}
          onClick={() => setActive(cat)}
          role="tab"
          aria-selected={active === cat}
          className="sk-tab-btn relative z-10 px-4 sm:px-5 py-2.5 rounded-xl text-sm font-semibold whitespace-nowrap transition-colors duration-300"
          style={{
            color: active === cat ? "#0A0A14" : C.muted,
            lineHeight: "1.6",
          }}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}

/* =====================================================================
   COMPONENT — StatCard
===================================================================== */
function StatCard({ value, suffix, label, start, delay, Icon, accent }) {
  const count = useCountUp(value, start);

  return (
    <div
      className="sk-anim sk-stat relative text-center px-5 sm:px-6 py-5 sm:py-6 rounded-2xl overflow-hidden"
      style={{
        background: C.panel,
        border: `1px solid ${C.border}`,
        ...(start
          ? { animation: `sk-fade-up 0.6s cubic-bezier(0.16,1,0.3,1) ${delay}s both` }
          : { opacity: 0 }),
      }}
    >
      <Icon
        className="absolute -right-2 -top-2 opacity-[0.08]"
        size={64}
        style={{ color: accent }}
        aria-hidden="true"
      />
      <div className="relative flex items-center justify-center gap-2 mb-2">
        <Icon size={16} style={{ color: accent }} />
        <p
          className="sk-wordmark nb-font-display text-2xl sm:text-3xl md:text-4xl font-extrabold"
          style={{ lineHeight: "1.2" }}
        >
          {count}
          {suffix}
        </p>
      </div>
      <p
        className="text-[11px] sm:text-xs md:text-sm mt-2 tracking-wide"
        style={{ color: C.muted, lineHeight: "1.7" }}
      >
        {label}
      </p>
    </div>
  );
}

/* =====================================================================
   COMPONENT — SkillOrb
===================================================================== */
const RING_R = 40;
const RING_C = 2 * Math.PI * RING_R;

function SkillOrb({ skill, index, start }) {
  const [filled, setFilled] = useState(false);
  const cardRef = useRef(null);
  const Icon = skill.icon;
  const accent = ACCENTS[index % ACCENTS.length];

  useEffect(() => {
    if (!start) return;
    const timer = setTimeout(() => setFilled(true), 120 + index * 60);
    return () => clearTimeout(timer);
  }, [start, index]);

  const offset = filled ? RING_C * (1 - skill.level / 100) : RING_C;

  return (
    <div
      ref={cardRef}
      tabIndex={0}
      className="sk-orb-card sk-anim relative rounded-2xl px-4 pt-8 pb-6 flex flex-col items-center text-center group outline-none"
      style={{
        background: C.panel,
        border: `1px solid ${C.border}`,
        opacity: start ? 1 : 0,
        transform: `translateY(${start ? 0 : 18}px)`,
        transition:
          "transform 0.6s cubic-bezier(0.16,1,0.3,1), opacity 0.6s cubic-bezier(0.16,1,0.3,1), border-color 0.4s ease, box-shadow 0.4s ease",
        transitionDelay: start ? `${index * 0.045}s` : "0s",
      }}
    >
      {/* rotating conic orbit glow */}
      <span
        className="sk-orbit-glow"
        style={{ background: `conic-gradient(from 0deg, ${accent}, transparent 35%, ${accent} 100%)` }}
        aria-hidden="true"
      />

      {/* ring + icon */}
      <div className="relative w-[92px] h-[92px] sm:w-[104px] sm:h-[104px] mb-5">
        <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
          <circle
            cx="50"
            cy="50"
            r={RING_R}
            fill="none"
            stroke="rgba(255,255,255,0.07)"
            strokeWidth="6"
          />
          <circle
            cx="50"
            cy="50"
            r={RING_R}
            fill="none"
            stroke={accent}
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={RING_C}
            strokeDashoffset={offset}
            className="sk-ring-progress"
            style={{ filter: `drop-shadow(0 0 6px ${accent}99)` }}
          />
        </svg>

        <div
          className="sk-icon-wrap absolute inset-0 flex items-center justify-center rounded-full"
          style={{ color: accent }}
        >
          <Icon size={30} />
        </div>

        <span
          className="sk-pct-badge nb-font-display absolute -bottom-1 -right-1 text-[11px] font-bold px-1.5 py-0.5 rounded-full"
          style={{
            background: C.bg,
            border: `1px solid ${C.border}`,
            color: accent,
            lineHeight: "1.4",
          }}
        >
          {filled ? skill.level : 0}%
        </span>
      </div>

      <h4
        className="text-sm sm:text-[15px] font-semibold mb-3"
        style={{ color: C.text, lineHeight: "1.65" }}
      >
        {skill.name}
      </h4>
      <span
        className="text-[10px] sm:text-[11px] uppercase tracking-wider px-2.5 py-1 rounded-full"
        style={{
          color: C.muted,
          background: "rgba(255,255,255,0.04)",
          border: `1px solid ${C.border}`,
          lineHeight: "1.6",
        }}
      >
        {skill.category}
      </span>
    </div>
  );
}

/* =====================================================================
   COMPONENT — ProficiencyLegend
===================================================================== */
function ProficiencyLegend({ start }) {
  const levels = [
    { label: "Learning", range: "< 70%", color: C.muted },
    { label: "Comfortable", range: "70–84%", color: C.cyan },
    { label: "Proficient", range: "85–94%", color: C.violet },
    { label: "Expert", range: "95%+", color: C.amber },
  ];

  return (
    <div
      className="sk-anim flex flex-wrap justify-center items-center gap-x-5 sm:gap-x-7 gap-y-3 mb-14 sm:mb-16 px-4"
      style={start ? { animation: "sk-fade-up 0.7s cubic-bezier(0.16,1,0.3,1) 0.3s both" } : { opacity: 0 }}
    >
      {levels.map((lvl) => (
        <div key={lvl.label} className="flex items-center gap-2.5">
          <span
            className="inline-block rounded-full shrink-0"
            style={{ width: 8, height: 8, background: lvl.color, boxShadow: `0 0 8px ${lvl.color}88` }}
          />
          <span
            className="text-xs sm:text-sm"
            style={{ color: C.muted, lineHeight: "1.7" }}
          >
            {lvl.label} <span style={{ color: "rgba(245,243,255,0.35)" }}>· {lvl.range}</span>
          </span>
        </div>
      ))}
    </div>
  );
}

/* =====================================================================
   MAIN COMPONENT — Skills
===================================================================== */
function Skills() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [sectionRef, sectionInView] = useInView(0.08);
  const [gridRef, gridInView] = useInView(0.03);
  const spotlightRef = useRef(null);

  const handlePointerMove = useCallback((e) => {
    const el = spotlightRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    el.style.setProperty("--sk-spot-x", `${x}%`);
    el.style.setProperty("--sk-spot-y", `${y}%`);
  }, []);

  const filteredSkills =
    activeCategory === "All" ? skillsData : skillsData.filter((s) => s.category === activeCategory);

  const totalSkills = skillsData.length;
  const totalCategories = CATEGORIES.length - 1;
  const avgLevel = Math.round(skillsData.reduce((sum, s) => sum + s.level, 0) / skillsData.length);

  return (
    <section
      id="skills"
      ref={sectionRef}
      onMouseMove={handlePointerMove}
      className="sk-font-body relative overflow-hidden"
      style={{ background: C.bg, scrollMarginTop: "88px" }}
    >
      {/* =================== ALL CSS =================== */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700;800&family=Inter:wght@400;500;600;700&display=swap');

        .sk-font-display, .nb-font-display { font-family: 'Space Grotesk', sans-serif; }
        .sk-font-body, .nb-font-body { font-family: 'Inter', sans-serif; }

        @keyframes sk-blob {
          0%, 100% { transform: translate(0,0) scale(1); }
          33% { transform: translate(30px,-25px) scale(1.08); }
          66% { transform: translate(-25px,22px) scale(0.93); }
        }
        @keyframes sk-fade-up {
          from { opacity: 0; transform: translateY(32px) scale(0.97); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes sk-aurora-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes sk-underline {
          from { transform: scaleX(0); }
          to { transform: scaleX(1); }
        }
        @keyframes sk-orbit-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @media (prefers-reduced-motion: reduce) {
          .sk-anim, .sk-anim * {
            animation: none !important;
            transition-duration: 0.01ms !important;
          }
        }

        .sk-blob-1 { animation: sk-blob 16s ease-in-out infinite; }
        .sk-blob-2 { animation: sk-blob 20s ease-in-out infinite reverse; }

        .sk-grid-bg {
          background-image:
            linear-gradient(${C.borderSoft} 1px, transparent 1px),
            linear-gradient(90deg, ${C.borderSoft} 1px, transparent 1px);
          background-size: 56px 56px;
          -webkit-mask-image: radial-gradient(ellipse 70% 60% at 50% 30%, black 20%, transparent 85%);
          mask-image: radial-gradient(ellipse 70% 60% at 50% 30%, black 20%, transparent 85%);
        }

        .sk-spotlight {
          position: absolute;
          inset: 0;
          pointer-events: none;
          background: radial-gradient(
            600px circle at var(--sk-spot-x, 50%) var(--sk-spot-y, 50%),
            rgba(167,139,250,0.07),
            transparent 40%
          );
          z-index: 1;
        }

        .sk-wordmark {
          background-image: ${AURORA};
          background-size: "300% auto";
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: sk-aurora-shift 5s ease-in-out infinite;
        }

        .sk-underline-el {
          transform-origin: center;
          animation: sk-underline 0.9s cubic-bezier(0.65,0,0.35,1) 0.5s both,
                     sk-aurora-shift 4s ease-in-out infinite;
        }

        /* ---- Orb card ---- */
        .sk-orb-card {
          isolation: isolate;
        }
        .sk-orbit-glow {
          position: absolute;
          top: 18px;
          left: 50%;
          transform: translateX(-50%);
          width: 110px;
          height: 110px;
          border-radius: 50%;
          opacity: 0;
          filter: blur(18px);
          transition: opacity 0.5s ease;
          pointer-events: none;
          z-index: -1;
        }
        .sk-orb-card:hover .sk-orbit-glow,
        .sk-orb-card:focus-visible .sk-orbit-glow {
          opacity: 0.5;
          animation: sk-orbit-spin 6s linear infinite;
        }
        .sk-orb-card:hover,
        .sk-orb-card:focus-visible {
          transform: translateY(-8px) !important;
          border-color: rgba(167,139,250,0.45) !important;
          box-shadow: 0 20px 40px -16px rgba(167,139,250,0.3) !important;
        }

        .sk-ring-progress {
          transition: stroke-dashoffset 1.6s cubic-bezier(0.16,1,0.3,1);
        }

        .sk-icon-wrap {
          transition: transform 0.45s cubic-bezier(0.65,0,0.35,1);
        }
        .sk-orb-card:hover .sk-icon-wrap {
          transform: scale(1.12) rotate(-6deg);
        }

        .sk-pct-badge {
          transition: transform 0.35s cubic-bezier(0.65,0,0.35,1), box-shadow 0.35s ease;
        }
        .sk-orb-card:hover .sk-pct-badge {
          transform: scale(1.12);
          box-shadow: 0 0 10px ${C.violet}66;
        }

        /* ---- Tabs ---- */
        .sk-tabs button { cursor: pointer; }
        .sk-tabs button:hover:not(:active) { color: ${C.text} !important; }

        /* ---- Stat card hover ---- */
        .sk-stat {
          transition: border-color 0.35s ease, box-shadow 0.35s ease, transform 0.35s ease;
        }
        .sk-stat:hover {
          border-color: rgba(167,139,250,0.3) !important;
          box-shadow: 0 12px 28px -12px rgba(167,139,250,0.25);
          transform: translateY(-3px);
        }
      `}</style>

      {/* =================== TOP DIVIDER =================== */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ backgroundImage: AURORA, backgroundSize: "300% auto", opacity: 0.35 }}
      />

      {/* =================== AMBIENT BACKGROUND =================== */}
      <div className="sk-anim absolute inset-0 pointer-events-none">
        <div className="sk-grid-bg absolute inset-0 opacity-50" />
        <div
          className="sk-blob-1 absolute rounded-full blur-3xl"
          style={{ width: 440, height: 440, top: "0%", left: "-10%", background: `radial-gradient(circle, ${C.fuchsia}28, transparent 70%)` }}
        />
        <div
          className="sk-blob-2 absolute rounded-full blur-3xl"
          style={{ width: 400, height: 400, bottom: "-5%", right: "-8%", background: `radial-gradient(circle, ${C.violet}2e, transparent 70%)` }}
        />
      </div>

      <div ref={spotlightRef} className="sk-spotlight" />

      {/* =================== CONTENT =================== */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 py-24 sm:py-32 lg:py-40">

        {/* =================== HEADING =================== */}
        <div
          className="sk-anim text-center mb-16 sm:mb-20"
          style={sectionInView ? { animation: "sk-fade-up 0.8s cubic-bezier(0.16,1,0.3,1) both" } : { opacity: 0 }}
        >
          {/* Badge */}
          <span
            className="inline-flex items-center gap-2.5 text-[11px] font-semibold tracking-[0.25em] uppercase mb-6 px-4 py-2 rounded-full"
            style={{
              color: C.cyan,
              background: `${C.cyan}0D`,
              border: `1px solid ${C.cyan}25`,
              lineHeight: "1.8",
            }}
          >
            <FaLaptopCode size={14} />
            What I Work With
          </span>

          {/* Main Heading */}
          <h2
            className="sk-font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold mt-4 mb-6"
            style={{ color: C.text, lineHeight: "1.25" }}
          >
            My <span className="sk-wordmark">Skills</span>
          </h2>

          {/* Underline */}
          <div className="flex justify-center mb-7">
            <span
              className="sk-underline-el block h-[3px] w-20 rounded-full"
              style={{ backgroundImage: AURORA, backgroundSize: "300% auto" }}
            />
          </div>

          {/* Description Paragraph */}
          <p
            className="max-w-2xl mx-auto text-sm sm:text-base mt-3 mb-2"
            style={{ color: C.muted, lineHeight: "1.85" }}
          >
            These are the technologies and tools I use to build modern,
            responsive and high-quality web applications.
          </p>
        </div>

        {/* =================== STATS ROW =================== */}
        <div className="grid grid-cols-3 gap-3 sm:gap-6 max-w-2xl mx-auto mb-14 sm:mb-18">
          <StatCard
            value={totalSkills}
            suffix="+"
            label="Technologies"
            start={sectionInView}
            delay={0.15}
            Icon={FaLayerGroup}
            accent={C.violet}
          />
          <StatCard
            value={totalCategories}
            suffix=""
            label="Core Categories"
            start={sectionInView}
            delay={0.25}
            Icon={FaBoltLightning}
            accent={C.fuchsia}
          />
          <StatCard
            value={avgLevel}
            suffix="%"
            label="Avg. Proficiency"
            start={sectionInView}
            delay={0.35}
            Icon={FaGaugeHigh}
            accent={C.cyan}
          />
        </div>

        {/* =================== PROFICIENCY LEGEND =================== */}
        <ProficiencyLegend start={sectionInView} />

        {/* =================== CATEGORY TABS =================== */}
        <div
          className="sk-anim flex justify-center mb-14 sm:mb-18"
          style={sectionInView ? { animation: "sk-fade-up 0.7s cubic-bezier(0.16,1,0.3,1) 0.15s both" } : { opacity: 0 }}
        >
          <CategoryTabs active={activeCategory} setActive={setActiveCategory} />
        </div>

        {/* =================== SKILLS GRID =================== */}
        <div
          ref={gridRef}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6"
        >
          {filteredSkills.map((skill, index) => (
            <SkillOrb key={`${activeCategory}-${skill.id}`} skill={skill} index={index} start={gridInView} />
          ))}
        </div>

        {/* =================== EMPTY STATE =================== */}
        {filteredSkills.length === 0 && (
          <p
            className="text-center mt-14 text-sm"
            style={{ color: C.muted, lineHeight: "1.8" }}
          >
            No skills found in this category yet.
          </p>
        )}
      </div>

      {/* =================== BOTTOM DIVIDER =================== */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{ backgroundImage: AURORA, backgroundSize: "300% auto", opacity: 0.2 }}
      />
    </section>
  );
}

export default Skills;