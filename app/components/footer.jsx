"use client";
import React from "react";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaEnvelope, FaGlobe } from "react-icons/fa";

const FONT_CINZEL  = '"Cinzel", "Times New Roman", serif';
const FONT_CRIMSON = '"Crimson Pro", Georgia, serif';
const GOLD = "#C4A35A";

export default function PortfolioFooter({ data }) {
  const year = new Date().getFullYear();

  const socials = [
    { icon: <FaGithub size={15} />,   href: data?.github,   label: "GitHub" },
    { icon: <FaLinkedin size={15} />, href: data?.linkedin, label: "LinkedIn" },
    { icon: <FaEnvelope size={15} />, href: data?.email ? `mailto:${data.email}` : null, label: "Email" },
    { icon: <FaGlobe size={15} />,    href: data?.website,  label: "Website" },
  ].filter((s) => s.href);

  const navLinks = [
    { label: "About",      href: "#about" },
    { label: "Experience", href: "#experience" },
    { label: "Projects",   href: "#projects" },
    { label: "Skills",     href: "#skills" },
    { label: "Contact",    href: "#contact" },
  ];

  return (
    <footer style={{ background: "#060412", borderTop: "1px solid rgba(196,163,90,0.1)", padding: "4rem 2rem 2rem", position: "relative", overflow: "hidden" }}>
      {/* Top glow line */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "1px", background: `linear-gradient(90deg, transparent, ${GOLD}40, rgba(159,122,234,0.3), ${GOLD}40, transparent)` }} />
      <div style={{ position: "absolute", top: "-60px", left: "50%", transform: "translateX(-50%)", width: "600px", height: "120px", borderRadius: "50%", background: `radial-gradient(ellipse, rgba(196,163,90,0.04) 0%, transparent 70%)`, pointerEvents: "none" }} />

      <div style={{ maxWidth: "1200px", margin: "0 auto", position: "relative", zIndex: 1 }}>
        {/* Ornamental divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.25, 1, 0.5, 1] }}
          style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "3rem", transformOrigin: "center" }}
        >
          <div style={{ flex: 1, height: "1px", background: `linear-gradient(90deg, transparent, ${GOLD}30)` }} />
          <span style={{ fontFamily: FONT_CINZEL, fontSize: "14px", color: `${GOLD}60` }}>✦</span>
          <div style={{ flex: 1, height: "1px", background: `linear-gradient(90deg, ${GOLD}30, transparent)` }} />
        </motion.div>

        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-start", justifyContent: "space-between", gap: "2.5rem", marginBottom: "3rem" }}>
          {/* Brand */}
          <div>
            <div style={{ fontFamily: FONT_CINZEL, fontSize: "18px", fontWeight: 600, color: "#F5F0FF", letterSpacing: "0.15em", marginBottom: "6px" }}>
              {data?.name || "Portfolio"}
              <span style={{ color: GOLD }}> ✦</span>
            </div>
            {data?.title && (
              <div style={{ fontFamily: FONT_CRIMSON, fontSize: "12px", fontStyle: "italic", color: "rgba(245,240,255,0.35)" }}>
                {data.title}
              </div>
            )}
          </div>

          {/* Nav */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "2rem" }}>
            {navLinks.map((l) => (
              <a key={l.href} href={l.href}
                style={{ fontFamily: FONT_CINZEL, fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(245,240,255,0.3)", textDecoration: "none", transition: "color 0.2s" }}
                onMouseEnter={(e) => e.currentTarget.style.color = GOLD}
                onMouseLeave={(e) => e.currentTarget.style.color = "rgba(245,240,255,0.3)"}
              >
                {l.label}
              </a>
            ))}
          </div>

          {/* Socials */}
          <div style={{ display: "flex", gap: "10px" }}>
            {socials.map((s, i) => (
              <a key={i} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}
                style={{ width: "36px", height: "36px", border: "1px solid rgba(196,163,90,0.15)", display: "flex", alignItems: "center", justifyContent: "center", color: "rgba(196,163,90,0.4)", textDecoration: "none", transition: "all 0.25s" }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = GOLD; e.currentTarget.style.color = GOLD; e.currentTarget.style.boxShadow = "0 0 14px rgba(196,163,90,0.2)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(196,163,90,0.15)"; e.currentTarget.style.color = "rgba(196,163,90,0.4)"; e.currentTarget.style.boxShadow = "none"; }}
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        <div style={{ height: "1px", background: "rgba(196,163,90,0.06)", marginBottom: "1.5rem" }} />
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "1rem" }}>
          <p style={{ fontFamily: FONT_CRIMSON, fontSize: "11px", fontStyle: "italic", color: "rgba(245,240,255,0.2)", margin: 0 }}>
            © {year} {data?.name}. All rights reserved.
          </p>
          <p style={{ fontFamily: FONT_CRIMSON, fontSize: "11px", color: "rgba(245,240,255,0.2)", margin: 0 }}>
            Forged with <span style={{ color: GOLD, fontStyle: "italic" }}>Salience</span> ✦
          </p>
        </div>
      </div>
    </footer>
  );
}
