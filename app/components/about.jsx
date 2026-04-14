"use client";
import React from "react";
import { motion } from "framer-motion";
import { FaMapMarkerAlt, FaEnvelope, FaGithub, FaLinkedin, FaGlobe } from "react-icons/fa";

const FONT_CINZEL  = '"Cinzel", "Times New Roman", serif';
const FONT_CRIMSON = '"Crimson Pro", Georgia, serif';
const GOLD = "#C4A35A";

const SectionHeader = ({ num, title }) => (
  <div style={{ marginBottom: "4rem" }}>
    <motion.div
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1, ease: [0.25, 1, 0.5, 1] }}
      style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "2rem", transformOrigin: "left" }}
    >
      <div style={{ flex: 1, height: "1px", background: `linear-gradient(90deg, ${GOLD}40, transparent)` }} />
      <span style={{ fontFamily: FONT_CINZEL, fontSize: "11px", color: `${GOLD}70`, letterSpacing: "0.3em" }}>✦</span>
    </motion.div>
    <motion.div
      initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true }}
      transition={{ duration: 0.9, ease: [0.25, 1, 0.5, 1] }}
      style={{ display: "flex", alignItems: "baseline", gap: "1.25rem" }}
    >
      <span style={{ fontFamily: FONT_CINZEL, fontSize: "10px", color: `${GOLD}60`, letterSpacing: "0.3em" }}>{num}</span>
      <h2 style={{ fontFamily: FONT_CINZEL, fontSize: "clamp(1.8rem,4vw,2.8rem)", fontWeight: 600, color: "#F5F0FF", margin: 0, letterSpacing: "0.12em" }}>
        {title}
      </h2>
    </motion.div>
  </div>
);

export default function PortfolioAbout({ data }) {
  if (!data) return null;

  const infoRows = [
    { label: "Location", value: data.location,  icon: <FaMapMarkerAlt />, link: null },
    { label: "Email",    value: data.email,      icon: <FaEnvelope />,    link: `mailto:${data.email}` },
    { label: "GitHub",   value: data.github ? "@" + data.github.split("/").pop() : null, icon: <FaGithub />, link: data.github },
    { label: "LinkedIn", value: data.linkedin ? "LinkedIn" : null, icon: <FaLinkedin />, link: data.linkedin },
    { label: "Website",  value: data.website,   icon: <FaGlobe />,       link: data.website },
  ].filter((r) => r.value);

  return (
    <section id="about" style={{ background: "#0D0A24", padding: "8rem 2rem", position: "relative", overflow: "hidden" }}>
      {/* Ambient glow */}
      <div style={{ position: "absolute", top: "30%", left: "-10%", width: "500px", height: "500px", borderRadius: "50%", background: "radial-gradient(circle, rgba(123,63,174,0.1) 0%, transparent 70%)", pointerEvents: "none" }} />

      <div style={{ maxWidth: "1200px", margin: "0 auto", position: "relative", zIndex: 1 }}>
        <SectionHeader num="I" title="Meet Me" />

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "start" }}
          className="arcane-two-col"
        >
          <style>{`@media(max-width:767px){.arcane-two-col{display:block!important;}}`}</style>

          {/* Bio */}
          <motion.div
            initial={{ opacity: 0, x: -30, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.25, 1, 0.5, 1] }}
          >
            <div style={{
              borderLeft: `2px solid rgba(196,163,90,0.3)`,
              paddingLeft: "1.75rem", marginBottom: "2.5rem",
            }}>
              <p style={{
                fontFamily: FONT_CRIMSON, fontSize: "clamp(1rem,1.8vw,1.18rem)",
                fontWeight: 300, fontStyle: "italic",
                color: "rgba(245,240,255,0.7)", lineHeight: 1.9, margin: 0,
              }}>
                {data.bio}
              </p>
            </div>

            {data.skills?.length > 0 && (() => {
              const flatSkills = data.skills.flatMap((s) =>
                typeof s === "object" && s !== null && Array.isArray(s.items) ? s.items
                : typeof s === "object" && s !== null && Array.isArray(s.skills) ? s.skills
                : [s]
              ).filter(Boolean);
              if (!flatSkills.length) return null;
              return (
                <div>
                  <p style={{ fontFamily: FONT_CINZEL, fontSize: "9px", letterSpacing: "0.35em", textTransform: "uppercase", color: `${GOLD}70`, marginBottom: "1rem" }}>
                    Arcane Arts
                  </p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                    {flatSkills.slice(0, 8).map((skill, i) => {
                      const label = typeof skill === "string" ? skill : skill?.name || skill?.label || String(skill);
                      return (
                        <span key={i} style={{
                          padding: "4px 14px",
                          border: `1px solid rgba(196,163,90,${i % 2 === 0 ? "0.3" : "0.15"})`,
                          color: i % 2 === 0 ? `${GOLD}CC` : "rgba(159,122,234,0.8)",
                          fontFamily: FONT_CRIMSON, fontSize: "12px", fontStyle: "italic",
                          background: "rgba(196,163,90,0.04)",
                        }}>
                          {label}
                        </span>
                      );
                    })}
                    {flatSkills.length > 8 && (
                      <span style={{ padding: "4px 14px", border: "1px solid rgba(245,240,255,0.08)", color: "rgba(245,240,255,0.3)", fontFamily: FONT_CRIMSON, fontSize: "12px" }}>
                        +{flatSkills.length - 8}
                      </span>
                    )}
                  </div>
                </div>
              );
            })()}
          </motion.div>

          {/* Info panel */}
          <motion.div
            initial={{ opacity: 0, x: 30, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.25, 1, 0.5, 1] }}
            style={{
              border: `1px solid rgba(196,163,90,0.15)`,
              padding: "2rem",
              background: "rgba(196,163,90,0.03)",
              animation: "arcane-glow-pulse 5s ease-in-out infinite",
            }}
          >
            <div style={{ fontFamily: FONT_CINZEL, fontSize: "9px", letterSpacing: "0.3em", textTransform: "uppercase", color: `${GOLD}70`, marginBottom: "1.5rem", paddingBottom: "1rem", borderBottom: `1px solid rgba(196,163,90,0.1)` }}>
              ✦ Scrolls of Contact
            </div>
            {infoRows.map((row, i) => (
              <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "14px", padding: "12px 0", borderBottom: i < infoRows.length - 1 ? "1px solid rgba(245,240,255,0.05)" : "none" }}>
                <span style={{ color: `${GOLD}60`, fontSize: "12px", marginTop: "2px", flexShrink: 0 }}>{row.icon}</span>
                <div>
                  <div style={{ fontFamily: FONT_CINZEL, fontSize: "8px", letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(245,240,255,0.3)", marginBottom: "3px" }}>{row.label}</div>
                  {row.link ? (
                    <a href={row.link} target="_blank" rel="noopener noreferrer"
                      style={{ fontFamily: FONT_CRIMSON, fontSize: "13px", color: "rgba(245,240,255,0.65)", textDecoration: "none", transition: "color 0.2s" }}
                      onMouseEnter={(e) => e.currentTarget.style.color = GOLD}
                      onMouseLeave={(e) => e.currentTarget.style.color = "rgba(245,240,255,0.65)"}
                    >
                      {row.value}
                    </a>
                  ) : (
                    <span style={{ fontFamily: FONT_CRIMSON, fontSize: "13px", color: "rgba(245,240,255,0.65)" }}>{row.value}</span>
                  )}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
