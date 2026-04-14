"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaEnvelope, FaDownload } from "react-icons/fa";

const FONT_CINZEL  = '"Cinzel", "Times New Roman", serif';
const FONT_CRIMSON = '"Crimson Pro", Georgia, serif';
const GOLD         = "#C4A35A";
const GOLD_BRIGHT  = "#F0C87A";

// ── Stars background ──────────────────────────────────────────────
function StarField() {
  const [stars, setStars] = useState([]);
  useEffect(() => {
    setStars(
      Array.from({ length: 140 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 1.8 + 0.4,
        opacity: Math.random() * 0.6 + 0.2,
        duration: Math.random() * 4 + 2,
        delay: Math.random() * 5,
      }))
    );
  }, []);
  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
      {stars.map((s) => (
        <div
          key={s.id}
          style={{
            position: "absolute",
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            borderRadius: "50%",
            background: "#F5F0FF",
            opacity: s.opacity,
            animation: `arcane-twinkle ${s.duration}s ${s.delay}s ease-in-out infinite`,
          }}
        />
      ))}
    </div>
  );
}

// ── Sparkle burst that plays when all letters have landed ─────────
function SparkleBurst({ active }) {
  const sparks = Array.from({ length: 12 }, (_, i) => i);
  return (
    <AnimatePresence>
      {active && sparks.map((i) => {
        const angle = (i / 12) * 360;
        const dist  = 60 + Math.random() * 60;
        const rad   = (angle * Math.PI) / 180;
        return (
          <motion.div
            key={i}
            initial={{ opacity: 1, x: 0, y: 0, scale: 1 }}
            animate={{
              opacity: 0,
              x: Math.cos(rad) * dist,
              y: Math.sin(rad) * dist,
              scale: 0,
            }}
            transition={{ duration: 0.9, delay: i * 0.02, ease: "easeOut" }}
            style={{
              position: "absolute",
              width: "6px", height: "6px",
              borderRadius: "50%",
              background: i % 2 === 0 ? GOLD_BRIGHT : "#D4B8F0",
              boxShadow: `0 0 6px ${i % 2 === 0 ? GOLD_BRIGHT : "#D4B8F0"}`,
              pointerEvents: "none",
              zIndex: 20,
            }}
          />
        );
      })}
    </AnimatePresence>
  );
}

// ── The magic name ─────────────────────────────────────────────────
function MagicName({ name }) {
  const words  = name ? name.split(" ") : [];
  const [offsets, setOffsets] = useState(null);
  const [burst, setBurst]     = useState(false);

  // Generate random scatter positions client-side only
  useEffect(() => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    const allLetters = words.join(" ").split("");
    setOffsets(
      allLetters.map(() => ({
        x:      (Math.random() - 0.5) * w * 1.4,
        y:      (Math.random() - 0.5) * h * 1.1,
        rotate: (Math.random() - 0.5) * 540,
        scale:  Math.random() * 1.2 + 0.3,
      }))
    );
  }, [name]);

  // Trigger sparkle burst after all letters have landed
  const allLetters = words.join(" ").split("");
  const lastDelay  = 0.4 + allLetters.length * 0.07 + 1.3;
  useEffect(() => {
    if (!offsets) return;
    const t = setTimeout(() => setBurst(true), lastDelay * 1000);
    return () => clearTimeout(t);
  }, [offsets, lastDelay]);
  useEffect(() => {
    if (!burst) return;
    const t = setTimeout(() => setBurst(false), 1200);
    return () => clearTimeout(t);
  }, [burst]);

  if (!offsets) {
    // Server / first render — invisible placeholder so layout doesn't shift
    return (
      <div style={{ visibility: "hidden", fontFamily: FONT_CINZEL, fontSize: "clamp(2.8rem,8vw,6.5rem)", fontWeight: 700, lineHeight: 1.05, textAlign: "center" }}>
        {words.map((w, wi) => <div key={wi}>{w}</div>)}
      </div>
    );
  }

  let globalIndex = 0;
  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      {/* Burst origin */}
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)" }}>
        <SparkleBurst active={burst} />
      </div>

      {words.map((word, wi) => (
        <div key={wi} style={{ display: "flex", justifyContent: "center", flexWrap: "nowrap" }}>
          {word.split("").map((letter, li) => {
            const idx = globalIndex++;
            const off = offsets[idx];
            return (
              <motion.span
                key={li}
                initial={{
                  opacity: 0,
                  x: off.x,
                  y: off.y,
                  rotate: off.rotate,
                  scale: off.scale,
                  filter: "blur(6px)",
                  color: GOLD_BRIGHT,
                  textShadow: `0 0 60px ${GOLD_BRIGHT}, 0 0 120px rgba(196,163,90,0.6)`,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                  y: 0,
                  rotate: 0,
                  scale: 1,
                  filter: "blur(0px)",
                  color: "#F5F0FF",
                  textShadow: "0 0 8px rgba(196,163,90,0.15)",
                }}
                transition={{
                  duration: 1.4,
                  delay: 0.4 + idx * 0.07,
                  type: "spring",
                  stiffness: 48,
                  damping: 11,
                  color: { duration: 1.2, delay: 0.4 + idx * 0.07 + 0.9 },
                  textShadow: { duration: 1.2, delay: 0.4 + idx * 0.07 + 0.9 },
                  filter: { duration: 0.8, delay: 0.4 + idx * 0.07 },
                }}
                style={{
                  display: "inline-block",
                  fontFamily: FONT_CINZEL,
                  fontSize: "clamp(2.8rem, 8vw, 6.5rem)",
                  fontWeight: 700,
                  lineHeight: 1.05,
                  letterSpacing: "0.06em",
                  willChange: "transform, opacity",
                }}
              >
                {letter}
              </motion.span>
            );
          })}
          {/* space between words */}
          {wi < words.length - 1 && (() => { globalIndex++; return null; })()}
        </div>
      ))}
    </div>
  );
}

// ── Main hero ──────────────────────────────────────────────────────
export default function PortfolioHero({ data }) {
  const hasPhoto = !!(data?.heroImageBase64 || data?.profile_photo);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.offsetTop - 72, behavior: "smooth" });
  };

  return (
    <section id="hero" style={{
      minHeight: "100vh",
      background: "linear-gradient(180deg, #060412 0%, #0D0A24 60%, #080618 100%)",
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      position: "relative", overflow: "hidden", paddingTop: "72px",
    }}>
      <style>{`@media(max-width:767px){#hero{padding-bottom:7rem!important;}}`}</style>
      <style>{`
        .arcane-cta-primary {
          display:inline-flex; align-items:center; gap:10px; cursor:pointer;
          padding:13px 36px; border:1px solid ${GOLD};
          background:transparent; color:${GOLD};
          font-family:${FONT_CINZEL}; font-size:11px; font-weight:600; letter-spacing:0.25em; text-transform:uppercase; text-decoration:none;
          transition:all 0.35s ease; position:relative; overflow:hidden;
        }
        .arcane-cta-primary::before {
          content:''; position:absolute; inset:0;
          background: linear-gradient(135deg, rgba(196,163,90,0.12), transparent);
          opacity:0; transition:opacity 0.35s;
        }
        .arcane-cta-primary:hover { background:rgba(196,163,90,0.08); box-shadow:0 0 30px rgba(196,163,90,0.25); }
        .arcane-cta-primary:hover::before { opacity:1; }
        .arcane-cta-secondary {
          display:inline-flex; align-items:center; gap:10px; cursor:pointer;
          padding:12px 32px; border:1px solid rgba(245,240,255,0.15);
          background:transparent; color:rgba(245,240,255,0.55);
          font-family:${FONT_CINZEL}; font-size:11px; font-weight:400; letter-spacing:0.2em; text-transform:uppercase; text-decoration:none;
          transition:all 0.3s ease;
        }
        .arcane-cta-secondary:hover { border-color:rgba(245,240,255,0.35); color:rgba(245,240,255,0.85); }
      `}</style>

      {/* Star field */}
      <StarField />

      {/* Radial purple glow behind content */}
      <div style={{
        position: "absolute", top: "40%", left: "50%", transform: "translate(-50%,-50%)",
        width: "800px", height: "500px", borderRadius: "50%",
        background: "radial-gradient(ellipse, rgba(123,63,174,0.18) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", top: "55%", left: "50%", transform: "translate(-50%,-50%)",
        width: "600px", height: "300px", borderRadius: "50%",
        background: "radial-gradient(ellipse, rgba(196,163,90,0.08) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      {/* Ornamental top line */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: [0.25, 1, 0.5, 1] }}
        style={{ position: "absolute", top: "80px", left: "10%", right: "10%", height: "1px", background: `linear-gradient(90deg, transparent, ${GOLD}40, transparent)` }}
      />

      {/* Content */}
      <div style={{ position: "relative", zIndex: 10, textAlign: "center", padding: "2rem 1.5rem", maxWidth: "900px", margin: "0 auto" }}>

        {/* Title badge */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.25, 1, 0.5, 1] }}
          style={{ marginBottom: "2.5rem" }}
        >
          <span style={{
            display: "inline-flex", alignItems: "center", gap: "12px",
            fontFamily: FONT_CINZEL, fontSize: "10px", fontWeight: 400,
            letterSpacing: "0.4em", textTransform: "uppercase", color: GOLD,
          }}>
            <span style={{ display: "inline-block", width: "28px", height: "1px", background: `linear-gradient(90deg, transparent, ${GOLD})` }} />
            {data?.title || "Portfolio"}
            <span style={{ display: "inline-block", width: "28px", height: "1px", background: `linear-gradient(90deg, ${GOLD}, transparent)` }} />
          </span>
        </motion.div>

        {/* ─── MAGIC NAME ─── */}
        <div style={{ marginBottom: "2.5rem" }}>
          <MagicName name={data?.name || "Portfolio"} />
        </div>

        {/* Ornamental divider */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 1.2, delay: 1.8, ease: [0.25, 1, 0.5, 1] }}
          style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "16px", marginBottom: "2rem" }}
        >
          <div style={{ flex: 1, height: "1px", background: `linear-gradient(90deg, transparent, ${GOLD}50)`, maxWidth: "160px" }} />
          <span style={{ color: GOLD, fontSize: "14px", opacity: 0.7 }}>✦</span>
          <div style={{ flex: 1, height: "1px", background: `linear-gradient(90deg, ${GOLD}50, transparent)`, maxWidth: "160px" }} />
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1, delay: 2, ease: [0.25, 1, 0.5, 1] }}
          style={{
            fontFamily: FONT_CRIMSON, fontSize: "clamp(1rem, 2vw, 1.2rem)",
            fontStyle: "italic", fontWeight: 300,
            color: "rgba(245,240,255,0.55)", lineHeight: 1.8,
            maxWidth: "560px", margin: "0 auto 3rem",
          }}
        >
          {data?.sloganHeroSection || (data?.bio ? data.bio.slice(0, 140) + "…" : "")}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 2.3, ease: [0.25, 1, 0.5, 1] }}
          style={{ display: "flex", flexWrap: "wrap", gap: "16px", alignItems: "center", justifyContent: "center" }}
        >
          <button onClick={() => scrollTo("contact")} className="arcane-cta-primary">
            <FaEnvelope style={{ fontSize: "11px" }} /> Summon Me
          </button>
          <button onClick={() => scrollTo("about")} className="arcane-cta-secondary">
            Read the Scroll
          </button>
          {(data?.resumeBase64 || data?.resumeUrl || data?.resume_url) && (
            <a href={data.resumeBase64 ? `data:application/pdf;base64,${data.resumeBase64}` : (data.resumeUrl || data.resume_url)} download="Resume.pdf" className="arcane-cta-secondary">
              <FaDownload style={{ fontSize: "10px" }} /> Résumé
            </a>
          )}
        </motion.div>

        {/* Photo — floating with ring glow */}
        {hasPhoto && (
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 2.5, ease: [0.25, 1, 0.5, 1] }}
            style={{ marginTop: "4rem", display: "inline-block", position: "relative" }}
          >
            {/* Outer glow ring */}
            <div style={{
              width: "200px", height: "200px", borderRadius: "50%",
              background: `conic-gradient(from 0deg, ${GOLD}, #9F7AEA, ${GOLD}80, #9F7AEA, ${GOLD})`,
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: `0 0 40px rgba(196,163,90,0.25), 0 0 80px rgba(123,63,174,0.15)`,
              margin: "0 auto",
            }}>
              <div style={{ width: "190px", height: "190px", borderRadius: "50%", background: "#0D0A24", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <img
                  src={data.heroImageBase64 || data.profile_photo}
                  alt={data.name}
                  style={{ width: "178px", height: "178px", borderRadius: "50%", objectFit: "cover", filter: "saturate(0.9) brightness(0.95)" }}
                />
              </div>
            </div>
            {/* Floating sparkle orbs */}
            {[0, 1, 2].map((i) => (
              <div key={i} style={{
                position: "absolute",
                width: "6px", height: "6px", borderRadius: "50%",
                background: i % 2 === 0 ? GOLD : "#9F7AEA",
                boxShadow: `0 0 8px ${i % 2 === 0 ? GOLD : "#9F7AEA"}`,
                top: `${[10, 80, 50][i]}%`, left: `${[-8, 108, -12][i]}%`,
                animation: `arcane-float ${[3, 4, 3.5][i]}s ${i * 0.8}s ease-in-out infinite`,
              }} />
            ))}
          </motion.div>
        )}
      </div>

      {/* Bottom fade */}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "150px", background: "linear-gradient(to top, #080618, transparent)", pointerEvents: "none" }} />

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3, duration: 1 }}
        style={{ position: "absolute", bottom: "2rem", left: "50%", transform: "translateX(-50%)", textAlign: "center" }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
        >
          <span style={{ fontFamily: FONT_CINZEL, fontSize: "18px", color: GOLD, opacity: 0.4 }}>✦</span>
        </motion.div>
      </motion.div>
    </section>
  );
}
