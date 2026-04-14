"use client";
import React from "react";
import { motion } from "framer-motion";

const FONT_CINZEL  = '"Cinzel", "Times New Roman", serif';
const FONT_CRIMSON = '"Crimson Pro", Georgia, serif';
const GOLD = "#C4A35A";

const RUNE_STYLES = [
  { border: "rgba(196,163,90,0.3)",  color: `${GOLD}CC`,               bg: "rgba(196,163,90,0.05)" },
  { border: "rgba(159,122,234,0.25)", color: "rgba(159,122,234,0.85)", bg: "rgba(159,122,234,0.04)" },
  { border: "rgba(100,180,200,0.25)", color: "rgba(100,180,200,0.8)",  bg: "rgba(100,180,200,0.04)" },
  { border: "rgba(200,120,180,0.25)", color: "rgba(200,120,180,0.8)",  bg: "rgba(200,120,180,0.04)" },
];

export default function PortfolioSkills({ data }) {
  const skills = data?.skills;
  if (!skills || !Array.isArray(skills) || skills.length === 0) return null;

  // Normalize: handle both grouped {category, items[]} objects and flat string arrays
  const groups = (() => {
    if (
      typeof skills[0] === "object" && skills[0] !== null &&
      (skills[0].items || skills[0].category || skills[0].skills)
    ) {
      return skills.map((g) => ({
        category: g.category || g.name || "Skills",
        items: Array.isArray(g.items) ? g.items : Array.isArray(g.skills) ? g.skills : [],
      })).filter((g) => g.items.length > 0);
    }
    return null; // flat
  })();

  const runeVariants = {
    hidden: { opacity: 0, scale: 0.75, filter: "blur(8px)" },
    visible: { opacity: 1, scale: 1, filter: "blur(0px)", transition: { duration: 0.5, ease: [0.25, 1, 0.5, 1] } },
  };
  const container = { hidden: {}, visible: { transition: { staggerChildren: 0.045 } } };

  return (
    <section id="skills" style={{ background: "#0D0A24", padding: "8rem 2rem", position: "relative", overflow: "hidden" }}>
      <style>{`@media(max-width:767px){#skills{padding:4rem 1.25rem!important;}}`}</style>
      <div style={{ position: "absolute", top: "40%", right: "-5%", width: "400px", height: "400px", borderRadius: "50%", background: "radial-gradient(circle, rgba(159,122,234,0.08) 0%, transparent 70%)", pointerEvents: "none" }} />

      <div style={{ maxWidth: "1200px", margin: "0 auto", position: "relative", zIndex: 1 }}>
        <div style={{ marginBottom: "4rem" }}>
          <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 1, ease: [0.25, 1, 0.5, 1] }}
            style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "2rem", transformOrigin: "left" }}>
            <div style={{ flex: 1, height: "1px", background: `linear-gradient(90deg, ${GOLD}40, transparent)` }} />
            <span style={{ fontFamily: FONT_CINZEL, fontSize: "11px", color: `${GOLD}70` }}>✦</span>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 24, filter: "blur(8px)" }} whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }} viewport={{ once: true }} transition={{ duration: 0.9 }}
            style={{ display: "flex", alignItems: "baseline", gap: "1.25rem" }}>
            <span style={{ fontFamily: FONT_CINZEL, fontSize: "10px", color: `${GOLD}60`, letterSpacing: "0.3em" }}>V</span>
            <h2 style={{ fontFamily: FONT_CINZEL, fontSize: "clamp(1.8rem,4vw,2.8rem)", fontWeight: 600, color: "#F5F0FF", margin: 0, letterSpacing: "0.12em" }}>Skills</h2>
          </motion.div>
        </div>

        {groups ? (
          <div style={{ display: "flex", flexDirection: "column", gap: "3rem" }}>
            {groups.map((group, gi) => (
              <motion.div key={gi} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: gi * 0.07 }}>
                <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "1.25rem" }}>
                  <span style={{ color: `${GOLD}60`, fontSize: "10px" }}>✦</span>
                  <span style={{ fontFamily: FONT_CINZEL, fontSize: "9px", letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(245,240,255,0.4)" }}>{group.category}</span>
                </div>
                <motion.div variants={container} initial="hidden" whileInView="visible" viewport={{ once: true }} style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                  {group.items.map((skill, i) => {
                    const label = typeof skill === "string" ? skill : skill?.name || skill?.label || String(skill);
                    const s = RUNE_STYLES[i % RUNE_STYLES.length];
                    return (
                      <motion.span key={i} variants={runeVariants} style={{ padding: "7px 18px", border: `1px solid ${s.border}`, color: s.color, background: s.bg, fontFamily: FONT_CRIMSON, fontSize: "12px", fontStyle: "italic", letterSpacing: "0.04em" }}>
                        {label}
                      </motion.span>
                    );
                  })}
                </motion.div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div>
            <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 0.9 }}
              style={{ height: "1px", background: `linear-gradient(90deg, transparent, ${GOLD}30, rgba(159,122,234,0.2), transparent)`, marginBottom: "2.5rem" }} />
            <motion.div variants={container} initial="hidden" whileInView="visible" viewport={{ once: true }} style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
              {skills.map((skill, i) => {
                const label = typeof skill === "string" ? skill : skill?.name || skill?.label || String(skill);
                const s = RUNE_STYLES[i % RUNE_STYLES.length];
                return (
                  <motion.span key={i} variants={runeVariants} style={{ padding: "8px 20px", border: `1px solid ${s.border}`, color: s.color, background: s.bg, fontFamily: FONT_CRIMSON, fontSize: i % 4 === 0 ? "13px" : "12px", fontStyle: "italic" }}>
                    {label}
                  </motion.span>
                );
              })}
            </motion.div>
          </div>
        )}
      </div>
    </section>
  );
}
