"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaDownload } from "react-icons/fa";

const FONT_CINZEL  = '"Cinzel", "Times New Roman", serif';
const FONT_CRIMSON = '"Crimson Pro", Georgia, serif';
const GOLD         = "#C4A35A";

export default function PortfolioNav({ data }) {
  const [scrolled, setScrolled]   = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive]       = useState("");

  const allLinks = [
    { label: "About",      href: "#about",      key: "about" },
    { label: "Education",  href: "#education",  key: "education" },
    { label: "Experience", href: "#experience", key: "experience" },
    { label: "Projects",   href: "#projects",   key: "projects" },
    { label: "Skills",     href: "#skills",     key: "skills" },
    { label: "Community",  href: "#community",  key: "community" },
    { label: "Contact",    href: "#contact",    key: "contact" },
  ];

  const activeLinks = allLinks.filter((l) => {
    if (l.label === "About") return true;
    if (l.key === "contact") return !!(data?.email || data?.github || data?.linkedin);
    const d = data?.[l.key];
    return Array.isArray(d) ? d.length > 0 : !!d;
  });

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
      const ids = activeLinks.map((l) => l.href.replace("#", ""));
      const sorted = ids
        .map((id) => document.getElementById(id))
        .filter(Boolean)
        .sort((a, b) => a.offsetTop - b.offsetTop);
      let current = sorted[0]?.id ?? "";
      for (let i = sorted.length - 1; i >= 0; i--) {
        if (window.scrollY >= sorted[i].offsetTop - 120) { current = sorted[i].id; break; }
      }
      setActive(current);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (e, href) => {
    e.preventDefault();
    setMobileOpen(false);
    const el = document.getElementById(href.replace("#", ""));
    if (el) window.scrollTo({ top: el.offsetTop - 72, behavior: "smooth" });
  };

  const resumeHref = data?.resumeBase64
    ? `data:application/pdf;base64,${data.resumeBase64}`
    : (data?.resume || data?.resumeUrl || null);

  return (
    <>
      <style>{`
        .arcane-nav-link {
          position: relative; text-decoration: none;
          font-family: ${FONT_CINZEL}; font-size: 10px; font-weight: 400;
          letter-spacing: 0.2em; text-transform: uppercase;
          color: rgba(245,240,255,0.45); transition: color 0.25s;
          padding-bottom: 3px;
        }
        .arcane-nav-link::after {
          content: ''; position: absolute; bottom: 0; left: 0; right: 0;
          height: 1px; background: ${GOLD};
          transform: scaleX(0); transform-origin: center;
          transition: transform 0.3s cubic-bezier(0.4,0,0.2,1);
        }
        .arcane-nav-link:hover, .arcane-nav-link.arcane-active { color: ${GOLD}; }
        .arcane-nav-link:hover::after, .arcane-nav-link.arcane-active::after { transform: scaleX(1); }
      `}</style>

      <motion.nav
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
          background: scrolled ? "rgba(8,6,24,0.92)" : "transparent",
          backdropFilter: scrolled ? "blur(16px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(196,163,90,0.12)" : "1px solid transparent",
          transition: "all 0.4s ease",
        }}
      >
        <div className="arcane-nav-inner" style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 2rem", height: "68px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>

          {/* Logo */}
          <a href="#about" onClick={(e) => go(e, "#about")} style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "10px" }}>
            <span style={{ color: GOLD, fontSize: "18px", lineHeight: 1, animation: "arcane-pulse 4s ease-in-out infinite" }}>✦</span>
            <span style={{ fontFamily: FONT_CINZEL, fontSize: "14px", fontWeight: 600, color: "#F5F0FF", letterSpacing: "0.15em" }}>
              {data?.name?.split(" ")[0] || "Portfolio"}
            </span>
          </a>

          {/* Desktop links */}
          <div className="arcane-desktop-links">
            {activeLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => go(e, link.href)}
                className={`arcane-nav-link${active === link.href.replace("#", "") ? " arcane-active" : ""}`}
              >
                {link.label}
              </a>
            ))}
            {resumeHref && (
              <a href={resumeHref} download="Resume.pdf"
                style={{
                  display: "flex", alignItems: "center", gap: "6px",
                  fontFamily: FONT_CINZEL, fontSize: "9px", fontWeight: 400,
                  letterSpacing: "0.2em", textTransform: "uppercase",
                  color: GOLD, textDecoration: "none",
                  border: `1px solid rgba(196,163,90,0.3)`,
                  padding: "6px 14px",
                  transition: "all 0.25s",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(196,163,90,0.08)"; e.currentTarget.style.borderColor = GOLD; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "rgba(196,163,90,0.3)"; }}
              >
                <FaDownload style={{ fontSize: "9px" }} /> Résumé
              </a>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            className="arcane-hamburger"
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{ background: "none", border: "none", cursor: "pointer", padding: "8px", color: GOLD, flexDirection: "column", gap: "5px", alignItems: "center", justifyContent: "center" }}
            aria-label="Menu"
          >
            <div style={{ width: "22px", display: "flex", flexDirection: "column", gap: "5px" }}>
              <span style={{ display: "block", height: "1px", background: "currentColor", transition: "all 0.3s", transform: mobileOpen ? "rotate(45deg) translate(4px, 4px)" : "none" }} />
              <span style={{ display: "block", height: "1px", background: "currentColor", transition: "all 0.3s", opacity: mobileOpen ? 0 : 1 }} />
              <span style={{ display: "block", height: "1px", background: "currentColor", transition: "all 0.3s", transform: mobileOpen ? "rotate(-45deg) translate(4px, -4px)" : "none" }} />
            </div>
          </button>
        </div>

        {/* Mobile drawer */}
        <div className="arcane-mobile-menu" style={{ display: mobileOpen ? "block" : "none" }}>
          <div style={{ background: "rgba(8,6,24,0.97)", borderBottom: "1px solid rgba(196,163,90,0.12)", padding: "1.5rem 1.25rem 2rem" }}>
            {activeLinks.map((link, i) => {
              const isActive = active === link.href.replace("#", "");
              return (
                <a key={link.href} href={link.href} onClick={(e) => go(e, link.href)}
                  style={{
                    display: "block", padding: "12px 0",
                    borderBottom: i < activeLinks.length - 1 ? "1px solid rgba(196,163,90,0.08)" : "none",
                    borderLeft: isActive ? `2px solid ${GOLD}` : "2px solid transparent",
                    paddingLeft: "12px",
                    fontFamily: FONT_CINZEL, fontSize: "11px",
                    letterSpacing: "0.2em", textTransform: "uppercase",
                    color: isActive ? GOLD : "rgba(245,240,255,0.55)", textDecoration: "none",
                    transition: "color 0.2s",
                  }}
                >
                  {link.label}
                </a>
              );
            })}
            {resumeHref && (
              <a href={resumeHref} download="Resume.pdf"
                style={{
                  display: "flex", alignItems: "center", gap: "8px",
                  marginTop: "1.5rem", padding: "10px 14px",
                  border: `1px solid rgba(196,163,90,0.3)`,
                  fontFamily: FONT_CINZEL, fontSize: "10px",
                  letterSpacing: "0.2em", textTransform: "uppercase",
                  color: GOLD, textDecoration: "none",
                  background: "rgba(196,163,90,0.04)",
                  width: "fit-content",
                }}
              >
                <FaDownload style={{ fontSize: "10px" }} /> Download Résumé
              </a>
            )}
          </div>
        </div>
      </motion.nav>
    </>
  );
}
