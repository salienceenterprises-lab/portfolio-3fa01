"use client";
import React from "react";
import { motion } from "framer-motion";

const FONT_CINZEL  = '"Cinzel", "Times New Roman", serif';
const FONT_CRIMSON = '"Crimson Pro", Georgia, serif';
const GOLD = "#C4A35A";

const RUNE_COLORS = ["rgba(196,163,90,0.35)", "rgba(159,122,234,0.35)", "rgba(196,163,90,0.25)", "rgba(100,180,200,0.3)"];

export default function PortfolioEducation({ data }) {
  const items = data?.education;
  if (!items || !Array.isArray(items) || items.length === 0) return null;

  const stagger = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
  };
  const card = {
    hidden: { opacity: 0, y: 40, filter: "blur(8px)" },
    visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.75, ease: [0.25, 1, 0.5, 1] } },
  };

  return (
    <section id="education" style={{ background: "#080618", padding: "8rem 2rem", position: "relative", overflow: "hidden" }}>
      <style>{`@media(max-width:767px){#education{padding:4rem 1.25rem!important;} .arcane-edu-grid{grid-template-columns:1fr!important;}}`}</style>
      <div style={{ position: "absolute", bottom: "10%", right: "-5%", width: "400px", height: "400px", borderRadius: "50%", background: "radial-gradient(circle, rgba(159,122,234,0.08) 0%, transparent 70%)", pointerEvents: "none" }} />

      <div style={{ maxWidth: "1200px", margin: "0 auto", position: "relative", zIndex: 1 }}>
        <div style={{ marginBottom: "4rem" }}>
          <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 1, ease: [0.25, 1, 0.5, 1] }}
            style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "2rem", transformOrigin: "left" }}>
            <div style={{ flex: 1, height: "1px", background: `linear-gradient(90deg, ${GOLD}40, transparent)` }} />
            <span style={{ fontFamily: FONT_CINZEL, fontSize: "11px", color: `${GOLD}70`, letterSpacing: "0.3em" }}>✦</span>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 24, filter: "blur(8px)" }} whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }} viewport={{ once: true }} transition={{ duration: 0.9, ease: [0.25, 1, 0.5, 1] }}
            style={{ display: "flex", alignItems: "baseline", gap: "1.25rem" }}>
            <span style={{ fontFamily: FONT_CINZEL, fontSize: "10px", color: `${GOLD}60`, letterSpacing: "0.3em" }}>II</span>
            <h2 style={{ fontFamily: FONT_CINZEL, fontSize: "clamp(1.8rem,4vw,2.8rem)", fontWeight: 600, color: "#F5F0FF", margin: 0, letterSpacing: "0.12em" }}>Education</h2>
          </motion.div>
        </div>

        <motion.div className="arcane-edu-grid" variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-40px" }}
          style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))", gap: "1.5rem" }}>
          {items.map((edu, i) => {
            const period = edu.period || edu.duration || edu.year || edu.graduationYear || "";
            const achievements = Array.isArray(edu.achievements) && edu.achievements.length > 0 ? edu.achievements
              : Array.isArray(edu.highlights) && edu.highlights.length > 0 ? edu.highlights
              : [];
            const accentColor = RUNE_COLORS[i % RUNE_COLORS.length];

            return (
              <motion.div key={i} variants={card}>
                <div style={{
                  border: `1px solid ${accentColor}`,
                  borderTop: `2px solid ${accentColor}`,
                  padding: "2rem", height: "100%",
                  background: "rgba(13,10,36,0.6)",
                  transition: "all 0.35s ease",
                }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(196,163,90,0.04)"; e.currentTarget.style.boxShadow = "0 0 30px rgba(196,163,90,0.08)"; e.currentTarget.style.transform = "translateY(-3px)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(13,10,36,0.6)"; e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = "translateY(0)"; }}
                >
                  {period && (
                    <span style={{ display: "inline-block", marginBottom: "1.25rem", fontFamily: FONT_CINZEL, fontSize: "9px", letterSpacing: "0.2em", padding: "3px 12px", border: `1px solid rgba(196,163,90,0.2)`, color: `${GOLD}90` }}>
                      {period}
                    </span>
                  )}
                  <h3 style={{ fontFamily: FONT_CINZEL, fontSize: "15px", fontWeight: 600, color: "#F5F0FF", margin: "0 0 8px", letterSpacing: "0.06em", lineHeight: 1.4 }}>
                    {edu.degree || edu.field || edu.program}
                  </h3>
                  <p style={{ fontFamily: FONT_CRIMSON, fontSize: "13px", fontStyle: "italic", color: GOLD + "CC", margin: "0 0 6px" }}>
                    {edu.institution || edu.school}
                  </p>
                  {edu.location && (
                    <p style={{ fontFamily: FONT_CRIMSON, fontSize: "12px", color: "rgba(245,240,255,0.4)", margin: "0 0 10px" }}>
                      {edu.location}
                    </p>
                  )}
                  {edu.description && (
                    <p style={{ fontFamily: FONT_CRIMSON, fontSize: "13px", color: "rgba(245,240,255,0.5)", lineHeight: 1.7, margin: "0 0 10px" }}>{edu.description}</p>
                  )}
                  {achievements.length > 0 && (
                    <ul style={{ listStyle: "none", padding: 0, margin: "10px 0 0", display: "flex", flexDirection: "column", gap: "5px" }}>
                      {achievements.map((a, j) => (
                        <li key={j} style={{ display: "flex", gap: "10px", fontFamily: FONT_CRIMSON, fontSize: "12px", color: "rgba(245,240,255,0.5)", lineHeight: 1.6 }}>
                          <span style={{ color: `${GOLD}60`, flexShrink: 0, marginTop: "4px", fontSize: "8px" }}>✦</span>
                          {typeof a === "string" ? a : a?.text || a?.description || String(a)}
                        </li>
                      ))}
                    </ul>
                  )}
                  {edu.gpa && (
                    <p style={{ fontFamily: FONT_CRIMSON, fontSize: "11px", fontStyle: "italic", color: "rgba(159,122,234,0.7)", marginTop: "10px" }}>GPA: {edu.gpa}</p>
                  )}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
