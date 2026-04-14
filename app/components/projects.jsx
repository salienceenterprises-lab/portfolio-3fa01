"use client";
import React from "react";
import { motion } from "framer-motion";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";

const FONT_CINZEL  = '"Cinzel", "Times New Roman", serif';
const FONT_CRIMSON = '"Crimson Pro", Georgia, serif';
const GOLD = "#C4A35A";

const CARD_GLOWS = [
  "rgba(196,163,90,0.18)",
  "rgba(159,122,234,0.18)",
  "rgba(100,180,200,0.15)",
  "rgba(196,163,90,0.12)",
  "rgba(200,120,180,0.15)",
];

export default function PortfolioProjects({ data }) {
  const items = data?.projects;
  if (!items || !Array.isArray(items) || items.length === 0) return null;

  return (
    <section id="projects" style={{ background: "#080618", padding: "8rem 2rem", position: "relative", overflow: "hidden" }}>
      <style>{`@media(max-width:767px){#projects{padding:4rem 1.25rem!important;} .arcane-proj-grid{grid-template-columns:1fr!important;}}`}</style>
      <div style={{ position: "absolute", bottom: "20%", right: "-8%", width: "500px", height: "500px", borderRadius: "50%", background: "radial-gradient(circle, rgba(196,163,90,0.06) 0%, transparent 70%)", pointerEvents: "none" }} />

      <div style={{ maxWidth: "1200px", margin: "0 auto", position: "relative", zIndex: 1 }}>
        <div style={{ marginBottom: "4rem" }}>
          <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 1, ease: [0.25, 1, 0.5, 1] }}
            style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "2rem", transformOrigin: "left" }}>
            <div style={{ flex: 1, height: "1px", background: `linear-gradient(90deg, ${GOLD}40, transparent)` }} />
            <span style={{ fontFamily: FONT_CINZEL, fontSize: "11px", color: `${GOLD}70` }}>✦</span>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 24, filter: "blur(8px)" }} whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }} viewport={{ once: true }} transition={{ duration: 0.9 }}
            style={{ display: "flex", alignItems: "baseline", gap: "1.25rem" }}>
            <span style={{ fontFamily: FONT_CINZEL, fontSize: "10px", color: `${GOLD}60`, letterSpacing: "0.3em" }}>IV</span>
            <h2 style={{ fontFamily: FONT_CINZEL, fontSize: "clamp(1.8rem,4vw,2.8rem)", fontWeight: 600, color: "#F5F0FF", margin: 0, letterSpacing: "0.12em" }}>Projects</h2>
          </motion.div>
        </div>

        <div className="arcane-proj-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(320px,1fr))", gap: "1.5rem" }}>
          {items.map((proj, i) => {
            const tags = Array.isArray(proj.stack) ? proj.stack
              : Array.isArray(proj.tech) ? proj.tech
              : Array.isArray(proj.technologies) ? proj.technologies
              : Array.isArray(proj.tags) ? proj.tags
              : [];
            const liveHref = proj.live || proj.url || proj.link || proj.demo || null;

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1], delay: i * 0.07 }}
                style={{ height: "100%" }}
              >
                <div
                  style={{
                    border: "1px solid rgba(196,163,90,0.12)",
                    padding: "2rem", height: "100%",
                    display: "flex", flexDirection: "column",
                    background: "rgba(13,10,36,0.5)",
                    position: "relative", overflow: "hidden",
                    transition: "all 0.35s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "rgba(196,163,90,0.35)";
                    e.currentTarget.style.background = "rgba(13,10,36,0.8)";
                    e.currentTarget.style.boxShadow = `0 0 40px ${CARD_GLOWS[i % CARD_GLOWS.length]}, 0 20px 50px rgba(0,0,0,0.4)`;
                    e.currentTarget.style.transform = "translateY(-5px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "rgba(196,163,90,0.12)";
                    e.currentTarget.style.background = "rgba(13,10,36,0.5)";
                    e.currentTarget.style.boxShadow = "none";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  {proj.imageBase64 && (
                    <div style={{ width: "100%", paddingTop: "52%", position: "relative", overflow: "hidden", marginBottom: "1.25rem", borderBottom: "1px solid rgba(196,163,90,0.08)" }}>
                      <img src={proj.imageBase64} alt={proj.title || "Project"}
                        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top", display: "block", filter: "brightness(0.88) saturate(1.1)" }} />
                    </div>
                  )}
                  {/* Shimmer top line */}
                  <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: `linear-gradient(90deg, transparent, ${CARD_GLOWS[i % CARD_GLOWS.length]}, transparent)`, animation: "arcane-shimmer 4s linear infinite", backgroundSize: "200% auto" }} />

                  {/* Header row */}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1.25rem" }}>
                    <span style={{ fontFamily: FONT_CINZEL, fontSize: "24px", fontWeight: 700, color: `${GOLD}40`, lineHeight: 1 }}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div style={{ display: "flex", gap: "14px", paddingTop: "4px" }}>
                      {proj.github && (
                        <a href={proj.github} target="_blank" rel="noopener noreferrer"
                          style={{ color: "rgba(245,240,255,0.3)", textDecoration: "none", transition: "color 0.2s" }}
                          onMouseEnter={(e) => e.currentTarget.style.color = GOLD}
                          onMouseLeave={(e) => e.currentTarget.style.color = "rgba(245,240,255,0.3)"}
                        ><FaGithub size={16} /></a>
                      )}
                      {liveHref && (
                        <a href={liveHref} target="_blank" rel="noopener noreferrer"
                          style={{ color: "rgba(245,240,255,0.3)", textDecoration: "none", transition: "color 0.2s" }}
                          onMouseEnter={(e) => e.currentTarget.style.color = GOLD}
                          onMouseLeave={(e) => e.currentTarget.style.color = "rgba(245,240,255,0.3)"}
                        ><FaExternalLinkAlt size={14} /></a>
                      )}
                    </div>
                  </div>

                  <h3 style={{ fontFamily: FONT_CINZEL, fontSize: "16px", fontWeight: 600, color: "#F5F0FF", margin: "0 0 10px", letterSpacing: "0.06em", lineHeight: 1.4 }}>
                    {proj.title || proj.name || "Untitled"}
                  </h3>
                  {proj.description && (
                    <p style={{ fontFamily: FONT_CRIMSON, fontSize: "13px", color: "rgba(245,240,255,0.5)", lineHeight: 1.75, margin: 0, flex: 1 }}>
                      {proj.description}
                    </p>
                  )}

                  {tags.length > 0 && (
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginTop: "1.5rem", paddingTop: "1rem", borderTop: "1px solid rgba(196,163,90,0.08)" }}>
                      {tags.map((t, j) => {
                        const label = typeof t === "string" ? t : t?.name || t?.label || String(t);
                        return (
                          <span key={j} style={{ fontFamily: FONT_CRIMSON, fontSize: "11px", fontStyle: "italic", padding: "3px 10px", border: `1px solid ${j % 2 === 0 ? "rgba(196,163,90,0.2)" : "rgba(159,122,234,0.18)"}`, color: j % 2 === 0 ? `${GOLD}AA` : "rgba(159,122,234,0.75)" }}>
                            {label}
                          </span>
                        );
                      })}
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
