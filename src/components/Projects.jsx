import { useEffect, useRef, useState, useMemo } from "react";
import ProjectCard from "./ProjectCard";
import projects from "../data/projects";

/* ═══════════════════════════════════════════════════════════════
   BLUE THEME  (main blue #3B82F6 + lighter blue tints)
   NOTE: key names are kept from the old palette so the rest of the
   file works unchanged:  violet = main blue, pink = light blue,
   amber = pale blue, cyan = sky blue.
   ═══════════════════════════════════════════════════════════════ */
const C = {
  bg: "#05060E",
  surface: "#0A0C1A",
  border: "#181C38",
  borderSoft: "rgba(59,130,246,0.08)",
  text: "#F0EEFF",
  muted: "#6B7199",
  violet: "#3B82F6",
  violetSoft: "rgba(59,130,246,0.1)",
  pink: "#60A5FA",
  pinkSoft: "rgba(96,165,250,0.1)",
  cyan: "#38BDF8",
  cyanSoft: "rgba(56,189,248,0.1)",
  amber: "#93C5FD",
  emerald: "#3B82F6",
};

const AURORA = `linear-gradient(90deg,${C.violet},${C.pink},${C.amber},${C.cyan},${C.violet})`;

/* Particles — generated once */
const PARTICLES = Array.from({ length: 14 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 2.2 + 0.8,
  dur: Math.random() * 20 + 14,
  del: Math.random() * -20,
  op: Math.random() * 0.16 + 0.04,
  color: [C.violet, C.pink, C.cyan, C.amber][i % 4],
}));

/* ═══════════════════════════════════════════════════════════════
   HOOK
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
   PROJECTS SECTION
   ═══════════════════════════════════════════════════════════════ */
function Projects() {
  const [headRef, headIn] = useInView(0.25);
  const [gridRef, gridIn] = useInView(0.05);
  const [ctaRef, ctaIn] = useInView(0.3);

  /* ── Filter state ── */
  const [activeFilter, setActiveFilter] = useState("All");
  const [filterKey, setFilterKey] = useState(0);

  const categories = useMemo(
    () => ["All", ...new Set(projects.map((p) => p.category))],
    []
  );

  const filtered = useMemo(
    () =>
      activeFilter === "All"
        ? projects
        : projects.filter((p) => p.category === activeFilter),
    [activeFilter]
  );

  const handleFilter = (cat) => {
    setActiveFilter(cat);
    setFilterKey((k) => k + 1);
  };

  /* Count per category */
  const getCount = (cat) =>
    cat === "All" ? projects.length : projects.filter((p) => p.category === cat).length;

  return (
    <section
      id="projects"
      className="pj-font-body relative overflow-hidden"
      style={{ background: C.bg, scrollMarginTop: "88px" }}
    >
      {/* ════════ STYLES ════════ */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700;800&family=Inter:wght@300;400;500;600;700&display=swap');

        .pj-font-body{font-family:'Inter',sans-serif}
        .pj-font-display{font-family:'Space Grotesk',sans-serif}

        /* ── Keyframes ── */
        @keyframes pj-fade-up{from{opacity:0;transform:translateY(36px)}to{opacity:1;transform:translateY(0)}}
        @keyframes pj-aurora-shift{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}
        @keyframes pj-underline{from{transform:scaleX(0)}to{transform:scaleX(1)}}
        @keyframes pj-blob{0%,100%{transform:translate(0,0) scale(1)}33%{transform:translate(28px,-22px) scale(1.06)}66%{transform:translate(-16px,16px) scale(0.95)}}
        @keyframes pj-particle{
          0%,100%{transform:translate(0,0);opacity:var(--po)}
          25%{transform:translate(14px,-18px);opacity:calc(var(--po)*1.5)}
          50%{transform:translate(-10px,-28px);opacity:var(--po)}
          75%{transform:translate(16px,-10px);opacity:calc(var(--po)*0.5)}
        }

        @media(prefers-reduced-motion:reduce){
          .pj-anim,.pj-anim *{animation:none!important;transition:none!important}
        }

        /* ── Grid BG ── */
        .pj-grid{
          background-image:
            radial-gradient(circle,${C.borderSoft} 1px,transparent 1px);
          background-size:36px 36px;
          -webkit-mask-image:radial-gradient(ellipse 60% 55% at 50% 45%,black 15%,transparent 75%);
          mask-image:radial-gradient(ellipse 60% 55% at 50% 45%,black 15%,transparent 75%);
        }

        /* ── Aurora text ── */
        .pj-wordmark{
          background-image:${AURORA};background-size:300% auto;
          -webkit-background-clip:text;background-clip:text;
          -webkit-text-fill-color:transparent;
          animation:pj-aurora-shift 6s ease-in-out infinite;
        }

        /* ── Underline ── */
        .pj-underline-el{transform-origin:center;animation:pj-underline .8s cubic-bezier(.65,0,.35,1) .5s both}

        /* ── Blobs ── */
        .pj-blob-1{animation:pj-blob 18s ease-in-out infinite}
        .pj-blob-2{animation:pj-blob 22s ease-in-out infinite reverse}

        /* ── Noise ── */
        .pj-noise::after{
          content:'';position:absolute;inset:0;opacity:.018;pointer-events:none;
          background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          background-repeat:repeat;background-size:128px 128px;
        }

        /* ── Filter tab ── */
        .pj-tab{
          position:relative;cursor:pointer;white-space:nowrap;
          transition:color .3s ease,border-color .3s ease,background .3s ease,transform .3s ease,box-shadow .3s ease;
        }
        .pj-tab:hover{transform:translateY(-2px)}
        .pj-tab-active{
          background:${AURORA}!important;background-size:300% auto!important;
          animation:pj-aurora-shift 5s ease-in-out infinite!important;
          color:#05060E!important;border-color:transparent!important;
          box-shadow:0 8px 24px -8px ${C.violet}44;
        }

        /* ── CTA outlined button ── */
        .pj-cta-btn{
          position:relative;overflow:hidden;
          transition:transform .4s cubic-bezier(.65,0,.35,1),box-shadow .4s ease,color .4s ease,border-color .4s ease,background .4s ease;
        }
        .pj-cta-btn::before{
          content:'';position:absolute;inset:0;border-radius:inherit;
          background:${AURORA};background-size:300% auto;
          opacity:0;transition:opacity .4s ease;z-index:0;
        }
        .pj-cta-btn:hover::before{opacity:1;animation:pj-aurora-shift 4s ease-in-out infinite}
        .pj-cta-btn:hover{
          transform:translateY(-4px) scale(1.03);
          box-shadow:0 20px 44px -14px ${C.violet}44;
          color:#05060E;border-color:transparent;
        }
        .pj-cta-btn:active{transform:translateY(-1px) scale(.98)}
        .pj-cta-btn span,.pj-cta-btn svg{position:relative;z-index:1}

        /* Project count badge */
        .pj-count{
          transition:background .3s ease,color .3s ease;
        }
        .pj-tab-active .pj-count{
          background:rgba(5,6,14,.2)!important;color:#05060E!important;
        }
      `}</style>

      {/* ════════ TOP DIVIDER ════════ */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          backgroundImage: AURORA,
          backgroundSize: "300% auto",
          opacity: 0.35,
          animation: "pj-aurora-shift 6s ease-in-out infinite",
        }}
      />

      {/* ════════ AMBIENT BACKGROUND ════════ */}
      <div className="pj-anim pj-noise absolute inset-0 pointer-events-none">
        <div className="pj-grid absolute inset-0 opacity-50" />

        <div
          className="pj-blob-1 absolute rounded-full"
          style={{
            width: 480, height: 480, top: "-8%", right: "-12%",
            background: `radial-gradient(circle,${C.pink}16,transparent 70%)`,
            filter: "blur(65px)",
          }}
        />
        <div
          className="pj-blob-2 absolute rounded-full"
          style={{
            width: 420, height: 420, bottom: "-10%", left: "-14%",
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
              animation: `pj-particle ${p.dur}s ease-in-out ${p.del}s infinite`,
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
          className="text-center mb-12 lg:mb-16"
          style={
            headIn
              ? { animation: "pj-fade-up 0.7s cubic-bezier(0.16,1,0.3,1) both" }
              : { opacity: 0 }
          }
        >
          {/* Badge */}
          <span
            className="inline-flex items-center gap-2.5 text-[11px] sm:text-xs font-semibold tracking-[0.18em] uppercase mb-5 px-5 py-2 rounded-full"
            style={{
              color: C.pink,
              background: C.pinkSoft,
              border: `1px solid rgba(96,165,250,0.18)`,
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
              <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
              <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
            </svg>
            MERN Stack Portfolio
          </span>

          <h2
            className="pj-font-display text-4xl sm:text-5xl lg:text-[3.4rem] font-extrabold leading-tight"
            style={{ color: C.text }}
          >
            My <span className="pj-wordmark">Projects</span>
          </h2>

          <div className="flex justify-center mt-5 mb-6">
            <span
              className="pj-underline-el block h-[3px] w-24 rounded-full"
              style={{
                backgroundImage: AURORA,
                backgroundSize: "300% auto",
                animation: "pj-aurora-shift 4s ease-in-out infinite",
              }}
            />
          </div>

          <p
            className="max-w-2xl mx-auto text-base lg:text-lg leading-relaxed"
            style={{ color: C.muted }}
          >
            Here are some of my recent full-stack MERN projects and frontend
            work, built with MongoDB, Express.js, React and Node.js.
          </p>
        </div>

        {/* ════════════════ FILTER TABS ════════════════ */}
        <div
          className="flex justify-center mb-12 lg:mb-16"
          style={
            headIn
              ? {
                  animation:
                    "pj-fade-up 0.6s cubic-bezier(0.16,1,0.3,1) 0.2s both",
                }
              : { opacity: 0 }
          }
        >
          <div className="inline-flex flex-wrap justify-center gap-2 sm:gap-3 p-1.5 rounded-2xl" style={{ background: C.surface, border: `1px solid ${C.border}` }}>
            {categories.map((cat) => {
              const isActive = activeFilter === cat;
              return (
                <button
                  key={cat}
                  onClick={() => handleFilter(cat)}
                  className={`pj-tab flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl text-sm font-medium ${
                    isActive ? "pj-tab-active" : ""
                  }`}
                  style={
                    isActive
                      ? {}
                      : {
                          color: C.muted,
                          border: `1px solid transparent`,
                          background: "transparent",
                        }
                  }
                >
                  <span>{cat}</span>
                  <span
                    className="pj-count text-[10px] font-bold leading-none px-1.5 py-0.5 rounded-md"
                    style={
                      isActive
                        ? {}
                        : {
                            background: `${C.violet}12`,
                            color: C.violet,
                          }
                    }
                  >
                    {getCount(cat)}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ════════════════ PROJECTS GRID ════════════════ */}
        <div ref={gridRef} className="grid gap-6 sm:gap-7 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((project, i) => (
            <ProjectCard
              key={`${project.id}-${filterKey}`}
              project={project}
              index={i}
              visible={gridIn}
            />
          ))}
        </div>

        {/* ════════════════ EMPTY STATE ════════════════ */}
        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="text-lg" style={{ color: C.muted }}>
              No projects found in this category.
            </p>
          </div>
        )}

        {/* ════════════════ VIEW ALL CTA ════════════════ */}
        <div
          ref={ctaRef}
          className="mt-16 lg:mt-20 flex justify-center"
          style={
            ctaIn
              ? {
                  animation:
                    "pj-fade-up 0.7s cubic-bezier(0.16,1,0.3,1) 0.15s both",
                }
              : { opacity: 0 }
          }
        >
          <a
            href="https://github.com/WithSuleman"
            target="_blank"
            rel="noreferrer"
            className="pj-cta-btn pj-font-display inline-flex items-center gap-3 px-8 py-4 rounded-2xl text-sm font-semibold tracking-wide"
            style={{
              color: C.violet,
              border: `1px solid ${C.violet}`,
              background: "transparent",
            }}
          >
            <span>View All Projects</span>
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

      {/* ════════ BOTTOM DIVIDER ════════ */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{
          backgroundImage: AURORA,
          backgroundSize: "300% auto",
          opacity: 0.15,
          animation: "pj-aurora-shift 6s ease-in-out infinite",
        }}
      />
    </section>
  );
}

export default Projects;