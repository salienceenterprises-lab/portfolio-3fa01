"use client";
import React from "react";
import { motion } from "framer-motion";
import { FaExternalLinkAlt } from "react-icons/fa";

const FONT_CINZEL  = '"Cinzel", "Times New Roman", serif';
const FONT_CRIMSON = '"Crimson Pro", Georgia, serif';
const GOLD = "#C4A35A";
const RUNE_BORDERS = ["rgba(196,163,90,0.3)", "rgba(159,122,234,0.28)", "rgba(100,180,200,0.25)", "rgba(200,120,180,0.25)"];

export default function PortfolioCommunity({ data }) {
  const items = data?.community;
  if (!items || !Array.isArray(items) || items.length === 0) return null;

  return (
    <section id="community" style={{ background: "#080618", padding: "8rem 2rem", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: "30%", left: "-6%", width: "400px", height: "400px", borderRadius: "50%", background: "radial-gradient(circle, rgba(196,163,90,0.06) 0%, transparent 70%)", pointerEvents: "none" }} />

      <div style={{ maxWidth: "1200px", margin: "0 auto", position: "relative", zIndex: 1 }}>
        <div style={{ marginBottom: "4rem" }}>
          <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 1 }}
            style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "2rem", transformOrigin: "left" }}>
            <div style={{ flex: 1, height: "1px", background: `linear-gradient(90deg, ${GOLD}40, transparent)` }} />
            <span style={{ fontFamily: FONT_CINZEL, fontSize: "11px", color: `${GOLD}70` }}>✦</span>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 24, filter: "blur(8px)" }} whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }} viewport={{ once: true }} transition={{ duration: 0.9 }}
            style={{ display: "flex", alignItems: "baseline", gap: "1.25rem" }}>
            <span style={{ fontFamily: FONT_CINZEL, fontSize: "10px", color: `${GOLD}60`, letterSpacing: "0.3em" }}>VI</span>
            <h2 style={{ fontFamily: FONT_CINZEL, fontSize: "clamp(1.8rem,4vw,2.8rem)", fontWeight: 600, color: "#F5F0FF", margin: 0, letterSpacing: "0.12em" }}>Community & Volunteering</h2>
          </motion.div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))", gap: "1.25rem" }}>
          {items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30, filter: "blur(6px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.75, ease: [0.25, 1, 0.5, 1], delay: i * 0.07 }}
            >
              <div style={{ border: `1px solid ${RUNE_BORDERS[i % RUNE_BORDERS.length]}`, padding: "2rem", background: "rgba(13,10,36,0.5)", height: "100%", transition: "all 0.3s ease" }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(13,10,36,0.8)"; e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = `0 0 25px ${RUNE_BORDERS[i % RUNE_BORDERS.length]}`; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(13,10,36,0.5)"; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "0.75rem" }}>
                  <span style={{ color: RUNE_BORDERS[i % RUNE_BORDERS.length], fontSize: "10px" }}>✦</span>
                  <span style={{ fontFamily: FONT_CINZEL, fontSize: "9px", letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(245,240,255,0.35)" }}>
                    {item.role || item.type || "Contributor"}
                  </span>
                </div>
                <h3 style={{ fontFamily: FONT_CINZEL, fontSize: "15px", fontWeight: 600, color: "#F5F0FF", margin: "0 0 8px", letterSpacing: "0.06em", lineHeight: 1.4 }}>
                  {item.title || item.name || item.organization}
                </h3>
                {item.description && (
                  <p style={{ fontFamily: FONT_CRIMSON, fontSize: "13px", color: "rgba(245,240,255,0.5)", lineHeight: 1.7, margin: "0 0 0.75rem" }}>{item.description}</p>
                )}
                {item.year && (
                  <p style={{ fontFamily: FONT_CRIMSON, fontSize: "11px", fontStyle: "italic", color: "rgba(245,240,255,0.25)", marginBottom: "0.75rem" }}>{item.year}</p>
                )}
                {item.link && (
                  <a href={item.link} target="_blank" rel="noopener noreferrer"
                    style={{ fontFamily: FONT_CINZEL, fontSize: "9px", letterSpacing: "0.15em", textTransform: "uppercase", color: `${GOLD}80`, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "6px", transition: "color 0.2s" }}
                    onMouseEnter={(e) => e.currentTarget.style.color = GOLD}
                    onMouseLeave={(e) => e.currentTarget.style.color = `${GOLD}80`}
                  >
                    View ✦ <FaExternalLinkAlt style={{ fontSize: "9px" }} />
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
