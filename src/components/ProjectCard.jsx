import { useRef, useCallback } from "react";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";

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

const CAT_COLORS = {
  "MERN Stack":   { color: C.amber,  soft: C.amberSoft },
  React:          { color: C.cyan,   soft: C.cyanSoft },
  "Landing Page": { color: C.violet, soft: C.violetSoft },
  Dashboard:      { color: C.pink,   soft: C.pinkSoft },
};

/* ═══════════════════════════════════════════════════════════════
   PROJECT CARD
   ═══════════════════════════════════════════════════════════════ */
function ProjectCard({ project, index, visible }) {
  const tiltRef = useRef(null);
  const cat = CAT_COLORS[project.category] || { color: C.violet, soft: C.violetSoft };

  /* ── 3D Tilt ── */
  const onMove = useCallback((e) => {
    const el = tiltRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform =
      `perspective(800px) rotateX(${y * -7}deg) rotateY(${x * 7}deg) scale3d(1.02,1.02,1.02)`;
  }, []);

  const onLeave = useCallback(() => {
    if (tiltRef.current)
      tiltRef.current.style.transform =
        "perspective(800px) rotateX(0) rotateY(0) scale3d(1,1,1)";
  }, []);

  return (
    <>
      <style>{`
        .pj-card{
          position:relative;overflow:hidden;border-radius:1rem;
          background:${C.surface};border:1px solid ${C.border};
          transition:border-color .4s ease,box-shadow .4s ease,background .4s ease;
        }
        .pj-card:hover{
          border-color:rgba(59,130,246,.3);
          box-shadow:0 28px 56px -20px rgba(59,130,246,.16);
          background:${C.surfaceAlt};
        }

        /* Aurora border pseudo */
        .pj-card::before{
          content:'';position:absolute;inset:-1px;border-radius:inherit;padding:1px;z-index:2;pointer-events:none;
          background-image:${AURORA};background-size:300% auto;
          -webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);
          -webkit-mask-composite:xor;mask-composite:exclude;
          opacity:0;transition:opacity .4s ease;
        }
        .pj-card:hover::before{opacity:1;animation:pj-aurora-shift 4s ease-in-out infinite}

        /* Tilt wrapper */
        .pj-tilt{
          transition:transform .5s cubic-bezier(.03,.98,.52,.99);
          will-change:transform;transform-style:preserve-3d;
        }

        /* Image */
        .pj-img{transition:transform .65s cubic-bezier(.16,1,.3,1),filter .5s ease}
        .pj-card:hover .pj-img{transform:scale(1.08);filter:brightness(.7)}

        /* Image overlay */
        .pj-overlay{
          opacity:0;transition:opacity .4s ease;
          background:linear-gradient(180deg,transparent 30%,rgba(5,6,14,.85) 100%);
        }
        .pj-card:hover .pj-overlay{opacity:1}

        /* Overlay buttons */
        .pj-ov-btn{
          opacity:0;transform:translateY(12px) scale(.85);
          transition:opacity .35s ease .05s,transform .4s cubic-bezier(.16,1,.3,1) .05s,background .3s ease,color .3s ease;
        }
        .pj-card:hover .pj-ov-btn{opacity:1;transform:translateY(0) scale(1)}
        .pj-ov-btn:nth-child(2){transition-delay:.12s}
        .pj-ov-btn:hover{background:rgba(255,255,255,.15);color:#fff}

        /* Number */
        .pj-num{transition:color .4s ease}
        .pj-card:hover .pj-num{color:${cat.color}55}

        /* Featured badge */
        .pj-feat{
          background:${AURORA};background-size:300% auto;
          animation:pj-aurora-shift 5s ease-in-out infinite;
        }

        /* Category pill */
        .pj-cat-pill{transition:background .3s ease,border-color .3s ease}
        .pj-card:hover .pj-cat-pill{background:${cat.soft};border-color:${cat.color}33}

        /* Tech tag */
        .pj-tag{transition:background .3s ease,border-color .3s ease,color .3s ease,transform .25s ease}
        .pj-tag:hover{transform:translateY(-2px);border-color:${cat.color}44;background:${cat.soft};color:${cat.color}}

        /* Action buttons */
        .pj-btn-gh{
          border:1px solid ${C.border};background:transparent;color:${C.textSec};
          transition:all .3s ease;
        }
        .pj-btn-gh:hover{border-color:${C.violet};color:${C.violet};background:${C.violetSoft};transform:translateY(-2px)}

        .pj-btn-live{
          background:linear-gradient(135deg,${cat.color},${C.violet});color:#05060E;
          transition:all .35s cubic-bezier(.65,0,.35,1);position:relative;overflow:hidden;
        }
        .pj-btn-live:hover{transform:translateY(-2px);box-shadow:0 10px 28px -8px ${cat.color}55}
        .pj-btn-live .pj-shine{
          position:absolute;top:0;left:0;height:100%;width:40%;
          background:linear-gradient(120deg,transparent,rgba(255,255,255,.4),transparent);
          transform:translateX(-150%) skewX(-20deg);
        }
        .pj-btn-live:hover .pj-shine{animation:pj-shine .8s ease forwards}

        /* Placeholder (when no screenshot yet) */
        .pj-placeholder{
          background:
            radial-gradient(circle at 30% 20%,${cat.color}33,transparent 55%),
            radial-gradient(circle at 80% 80%,${C.violet}2a,transparent 55%),
            ${C.surfaceAlt};
        }

        /* Line clamp fallback */
        .pj-clamp{
          display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;
        }

        @keyframes pj-aurora-shift{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}
        @keyframes pj-shine{0%{transform:translateX(-150%) skewX(-20deg)}100%{transform:translateX(250%) skewX(-20deg)}}
        @keyframes pj-fade-up{from{opacity:0;transform:translateY(36px)}to{opacity:1;transform:translateY(0)}}

        @media(prefers-reduced-motion:reduce){
          .pj-card,.pj-tilt,.pj-img,.pj-overlay,.pj-ov-btn,.pj-num,.pj-tag,.pj-btn-gh,.pj-btn-live{
            animation:none!important;transition:none!important;
          }
        }
      `}</style>

      <div
        ref={tiltRef}
        className="pj-tilt pj-card"
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={
          visible
            ? { animation: `pj-fade-up 0.7s cubic-bezier(0.16,1,0.3,1) ${0.12 + index * 0.1}s both` }
            : { opacity: 0 }
        }
      >
        {/* ── IMAGE ── */}
        <div className="relative overflow-hidden" style={{ height: "15.5rem" }}>
          {project.image ? (
            <img
              src={project.image}
              alt={project.title}
              className="pj-img h-full w-full object-cover"
              loading="lazy"
            />
          ) : (
            <div className="pj-img pj-placeholder h-full w-full flex flex-col items-center justify-center text-center px-6">
              <span
                className="text-xs font-semibold tracking-[0.2em] uppercase mb-3"
                style={{ color: cat.color }}
              >
                {project.category}
              </span>
              <span
                className="text-2xl font-extrabold leading-snug"
                style={{ color: C.text, fontFamily: "'Space Grotesk',sans-serif" }}
              >
                {project.title}
              </span>
            </div>
          )}

          {/* Gradient overlay on hover */}
          <div className="pj-overlay absolute inset-0 z-[1]" />

          {/* Overlay action buttons */}
          <div className="absolute inset-0 z-[2] flex items-end justify-center gap-3 pb-5">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                className="pj-ov-btn flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm"
                aria-label="GitHub"
              >
                <FaGithub size={18} />
              </a>
            )}
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noreferrer"
                className="pj-ov-btn flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm"
                aria-label="Live Demo"
              >
                <FaExternalLinkAlt size={14} />
              </a>
            )}
          </div>

          {/* Featured badge */}
          {project.featured && (
            <span className="pj-feat absolute left-4 top-4 z-[3] px-3.5 py-1 text-[11px] font-bold tracking-wider uppercase text-[#05060E] rounded-full">
              Featured
            </span>
          )}

          {/* Large number */}
          <span
            className="pj-num absolute right-4 top-3 z-[1] font-display text-5xl font-extrabold leading-none select-none pointer-events-none"
            style={{ color: C.border, fontFamily: "'Space Grotesk',sans-serif" }}
          >
            0{project.id}
          </span>
        </div>

        {/* ── CONTENT ── */}
        <div className="relative z-10 p-5 sm:p-6">
          {/* Category pill */}
          <span
            className="pj-cat-pill inline-block text-[11px] font-semibold tracking-[0.12em] uppercase px-3 py-1 rounded-full mb-3"
            style={{
              color: cat.color,
              background: `${cat.color}0d`,
              border: `1px solid ${cat.color}15`,
            }}
          >
            {project.category}
          </span>

          {/* Title */}
          <h3
            className="text-lg sm:text-xl font-bold mb-2 leading-snug"
            style={{ color: C.text, fontFamily: "'Space Grotesk',sans-serif" }}
          >
            {project.title}
          </h3>

          {/* Description */}
          <p className="pj-clamp text-sm leading-relaxed mb-4" style={{ color: C.muted }}>
            {project.description}
          </p>

          {/* Tech tags */}
          <div className="flex flex-wrap gap-2 mb-5">
            {project.tech.map((t) => (
              <span
                key={t}
                className="pj-tag text-xs px-2.5 py-1 rounded-lg cursor-default"
                style={{
                  color: C.muted,
                  background: "rgba(59,130,246,0.04)",
                  border: `1px solid ${C.border}`,
                }}
              >
                {t}
              </span>
            ))}
          </div>

          {/* Action buttons */}
          <div className="flex gap-3">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                className="pj-btn-gh inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium"
              >
                <FaGithub size={15} />
                <span>Code</span>
              </a>
            )}
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noreferrer"
                className="pj-btn-live inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold"
              >
                <span className="pj-shine" />
                <FaExternalLinkAlt size={12} />
                <span>Live Demo</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default ProjectCard;