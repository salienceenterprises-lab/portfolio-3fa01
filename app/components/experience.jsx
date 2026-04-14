"use client";
import React from "react";
import { motion } from "framer-motion";

const FONT_CINZEL  = '"Cinzel", "Times New Roman", serif';
const FONT_CRIMSON = '"Crimson Pro", Georgia, serif';
const GOLD = "#C4A35A";

export default function PortfolioExperience({ data }) {
  const items = data?.experience;
  if (!items || !Array.isArray(items) || items.length === 0) return null;

  return (
    <section id="experience" style={{ background: "#0D0A24", padding: "8rem 2rem", position: "relative", overflow: "hidden" }}>
      <style>{`@media(max-width:767px){#experience{padding:4rem 1.25rem!important;}}`}</style>
      <div style={{ position: "absolute", top: "20%", left: "-8%", width: "450px", height: "450px", borderRadius: "50%", background: "radial-gradient(circle, rgba(196,163,90,0.06) 0%, transparent 70%)", pointerEvents: "none" }} />

      <div style={{ maxWidth: "1200px", margin: "0 auto", position: "relative", zIndex: 1 }}>
        <div style={{ marginBottom: "4rem" }}>
          <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 1, ease: [0.25, 1, 0.5, 1] }}
            style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "2rem", transformOrigin: "left" }}>
            <div style={{ flex: 1, height: "1px", background: `linear-gradient(90deg, ${GOLD}40, transparent)` }} />
            <span style={{ fontFamily: FONT_CINZEL, fontSize: "11px", color: `${GOLD}70` }}>✦</span>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 24, filter: "blur(8px)" }} whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }} viewport={{ once: true }} transition={{ duration: 0.9 }}
            style={{ display: "flex", alignItems: "baseline", gap: "1.25rem" }}>
            <span style={{ fontFamily: FONT_CINZEL, fontSize: "10px", color: `${GOLD}60`, letterSpacing: "0.3em" }}>III</span>
            <h2 style={{ fontFamily: FONT_CINZEL, fontSize: "clamp(1.8rem,4vw,2.8rem)", fontWeight: 600, color: "#F5F0FF", margin: 0, letterSpacing: "0.12em" }}>Experience</h2>
          </motion.div>
        </div>

        {/* Timeline */}
        <div style={{ position: "relative" }}>
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, ease: [0.25, 1, 0.5, 1] }}
            style={{ position: "absolute", left: "0", top: 0, bottom: 0, width: "1px", background: `linear-gradient(180deg, ${GOLD}40, rgba(159,122,234,0.3), ${GOLD}20)`, transformOrigin: "top" }}
          />

          <div style={{ paddingLeft: "3rem" }}>
            {items.map((exp, i) => {
              const period = exp.period || exp.duration || exp.startDate || "";
              const bullets = Array.isArray(exp.highlights) && exp.highlights.length ? exp.highlights
                : Array.isArray(exp.responsibilities) && exp.responsibilities.length ? exp.responsibilities
                : Array.isArray(exp.bullets) && exp.bullets.length ? exp.bullets
                : [];
              const stack = Array.isArray(exp.stack) ? exp.stack
                : Array.isArray(exp.tech) ? exp.tech
                : Array.isArray(exp.tags) ? exp.tags
                : [];

              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -24, filter: "blur(6px)" }}
                  whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                  viewport={{ once: true, margin: "-30px" }}
                  transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1], delay: i * 0.07 }}
                  style={{ position: "relative", paddingBottom: i < items.length - 1 ? "4rem" : "0" }}
                >
                  {/* Diamond dot */}
                  <div style={{
                    position: "absolute", left: "-3.35rem", top: "4px",
                    width: "10px", height: "10px",
                    background: i % 2 === 0 ? GOLD : "#9F7AEA",
                    boxShadow: `0 0 12px ${i % 2 === 0 ? GOLD : "#9F7AEA"}`,
                    transform: "rotate(45deg)",
                  }} />

                  {/* Date */}
                  {period && (
                    <div style={{ fontFamily: FONT_CINZEL, fontSize: "9px", letterSpacing: "0.2em", color: `${GOLD}70`, marginBottom: "0.75rem", textTransform: "uppercase" }}>
                      {period}
                    </div>
                  )}

                  <h3 style={{ fontFamily: FONT_CINZEL, fontSize: "clamp(1rem,2vw,1.25rem)", fontWeight: 600, color: "#F5F0FF", margin: "0 0 4px", letterSpacing: "0.08em" }}>
                    {exp.role || exp.title || exp.position}
                  </h3>
                  <p style={{ fontFamily: FONT_CRIMSON, fontSize: "13px", fontStyle: "italic", color: GOLD + "CC", margin: "0 0 1rem" }}>
                    {exp.company || exp.organization}
                  </p>

                  {exp.description && (
                    <p style={{ fontFamily: FONT_CRIMSON, fontSize: "14px", color: "rgba(245,240,255,0.55)", lineHeight: 1.8, margin: "0 0 1rem", maxWidth: "640px" }}>
                      {exp.description}
                    </p>
                  )}

                  {bullets.length > 0 && (
                    <ul style={{ listStyle: "none", padding: 0, margin: "0 0 1rem", display: "flex", flexDirection: "column", gap: "6px", maxWidth: "640px" }}>
                      {bullets.map((r, j) => (
                        <li key={j} style={{ display: "flex", gap: "12px", fontFamily: FONT_CRIMSON, fontSize: "13px", color: "rgba(245,240,255,0.5)", lineHeight: 1.7 }}>
                          <span style={{ color: `${GOLD}60`, flexShrink: 0, marginTop: "4px", fontSize: "8px" }}>✦</span>
                          {typeof r === "string" ? r : r?.text || r?.description || String(r)}
                        </li>
                      ))}
                    </ul>
                  )}

                  {stack.length > 0 && (
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginTop: "0.75rem" }}>
                      {stack.map((t, j) => {
                        const label = typeof t === "string" ? t : t?.name || t?.label || String(t);
                        return (
                          <span key={j} style={{ fontFamily: FONT_CRIMSON, fontSize: "11px", fontStyle: "italic", padding: "3px 12px", border: "1px solid rgba(159,122,234,0.2)", color: "rgba(159,122,234,0.75)", background: "rgba(159,122,234,0.04)" }}>
                            {label}
                          </span>
                        );
                      })}
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
