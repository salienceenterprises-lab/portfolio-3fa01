"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaEnvelope, FaMapMarkerAlt, FaGithub, FaLinkedin } from "react-icons/fa";

const FONT_CINZEL  = '"Cinzel", "Times New Roman", serif';
const FONT_CRIMSON = '"Crimson Pro", Georgia, serif';
const GOLD = "#C4A35A";

export default function PortfolioContact({ data }) {
  const [form, setForm]     = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle");
  const [focused, setFocused] = useState(null);

  const hasContact = !!(data?.email || data?.github || data?.linkedin || data?.twitter || data?.website || data?.web3forms_key);
  if (!hasContact) return null;

  const WEB3FORMS_KEY = data?.web3forms_key || process.env.NEXT_PUBLIC_WEB3FORMS_KEY || "";

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setStatus("sending");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ access_key: WEB3FORMS_KEY, subject: `Portfolio contact from ${form.name}`, from_name: form.name, email: form.email, message: form.message, botcheck: "" }),
      });
      const r = await res.json();
      setStatus(r.success ? "sent" : "error");
    } catch { setStatus("error"); }
  };

  const fieldStyle = (field) => ({
    width: "100%", background: "transparent",
    border: "none", borderBottom: `1px solid ${focused === field ? GOLD : "rgba(196,163,90,0.2)"}`,
    fontFamily: FONT_CRIMSON, fontSize: "14px", color: "#F5F0FF",
    padding: "12px 0", outline: "none",
    transition: "border-color 0.3s",
    boxShadow: focused === field ? `0 2px 0 rgba(196,163,90,0.15)` : "none",
  });

  return (
    <section id="contact" style={{ background: "#0D0A24", padding: "8rem 2rem 9rem", position: "relative", overflow: "hidden" }}>
      <style>{`
        .arcane-submit {
          font-family:${FONT_CINZEL}; font-size:10px; font-weight:600;
          letter-spacing:0.25em; text-transform:uppercase;
          padding:12px 36px; border:1px solid ${GOLD};
          background:transparent; color:${GOLD}; cursor:pointer;
          transition:all 0.3s ease; position:relative; overflow:hidden;
        }
        .arcane-submit::before {
          content:''; position:absolute; inset:0;
          background:linear-gradient(135deg,rgba(196,163,90,0.12),transparent);
          opacity:0; transition:opacity 0.3s;
        }
        .arcane-submit:hover { box-shadow:0 0 28px rgba(196,163,90,0.25); background:rgba(196,163,90,0.06); }
        .arcane-submit:hover::before { opacity:1; }
        .arcane-submit:disabled { opacity:0.45; cursor:not-allowed; }
        .arcane-root input::placeholder,
        .arcane-root textarea::placeholder { color:rgba(245,240,255,0.2); font-family:${FONT_CRIMSON}; font-style:italic; }
        .arcane-root textarea { resize:none; font-family:inherit; }
        @media(max-width:767px){#contact{padding:4rem 1.25rem 9rem!important;} .arcane-contact-grid{display:block!important;} .arcane-contact-grid>*:first-child{margin-bottom:3rem;}}
      `}</style>

      <div style={{ position: "absolute", top: "20%", right: "-8%", width: "450px", height: "450px", borderRadius: "50%", background: "radial-gradient(circle, rgba(123,63,174,0.1) 0%, transparent 70%)", pointerEvents: "none" }} />

      <div style={{ maxWidth: "1200px", margin: "0 auto", position: "relative", zIndex: 1 }}>
        <div style={{ marginBottom: "4rem" }}>
          <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 1 }}
            style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "2rem", transformOrigin: "left" }}>
            <div style={{ flex: 1, height: "1px", background: `linear-gradient(90deg, ${GOLD}40, transparent)` }} />
            <span style={{ fontFamily: FONT_CINZEL, fontSize: "11px", color: `${GOLD}70` }}>✦</span>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 24, filter: "blur(8px)" }} whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }} viewport={{ once: true }} transition={{ duration: 0.9 }}
            style={{ display: "flex", alignItems: "baseline", gap: "1.25rem" }}>
            <span style={{ fontFamily: FONT_CINZEL, fontSize: "10px", color: `${GOLD}60`, letterSpacing: "0.3em" }}>VII</span>
            <div>
              <h2 style={{ fontFamily: FONT_CINZEL, fontSize: "clamp(1.8rem,4vw,2.8rem)", fontWeight: 600, color: "#F5F0FF", margin: "0 0 0.5rem", letterSpacing: "0.12em" }}>Contact & Socials</h2>
              <p style={{ fontFamily: FONT_CRIMSON, fontSize: "14px", fontStyle: "italic", color: "rgba(245,240,255,0.45)", margin: 0, maxWidth: "400px" }}>
                Cast your message into the ether — I shall answer.
              </p>
            </div>
          </motion.div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "start" }} className="arcane-contact-grid">

          {/* Form */}
          <motion.div initial={{ opacity: 0, y: 30, filter: "blur(6px)" }} whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
            {status === "sent" ? (
              <div style={{ padding: "3rem", border: "1px solid rgba(196,163,90,0.2)", textAlign: "center", animation: "arcane-glow-pulse 3s infinite" }}>
                <div style={{ fontFamily: FONT_CINZEL, fontSize: "2.5rem", color: GOLD, marginBottom: "1rem", animation: "arcane-pulse 2s infinite" }}>✦</div>
                <h3 style={{ fontFamily: FONT_CINZEL, fontSize: "18px", color: "#F5F0FF", marginBottom: "0.5rem", letterSpacing: "0.1em" }}>Spell Cast!</h3>
                <p style={{ fontFamily: FONT_CRIMSON, fontSize: "14px", fontStyle: "italic", color: "rgba(245,240,255,0.5)" }}>Your message has been received.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
                {[
                  { key: "name",    label: "Your Name",      type: "text",  placeholder: "Enter your name" },
                  { key: "email",   label: "Email Address",  type: "email", placeholder: "your@email.com" },
                ].map(({ key, label, type, placeholder }) => (
                  <div key={key}>
                    <label style={{ fontFamily: FONT_CINZEL, fontSize: "8px", letterSpacing: "0.3em", textTransform: "uppercase", color: `${GOLD}70`, display: "block", marginBottom: "10px" }}>{label}</label>
                    <input type={type} placeholder={placeholder} required value={form[key]}
                      onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                      onFocus={() => setFocused(key)} onBlur={() => setFocused(null)}
                      style={fieldStyle(key)} />
                  </div>
                ))}
                <div>
                  <label style={{ fontFamily: FONT_CINZEL, fontSize: "8px", letterSpacing: "0.3em", textTransform: "uppercase", color: `${GOLD}70`, display: "block", marginBottom: "10px" }}>Message</label>
                  <textarea rows={5} placeholder="Your message…" required value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    onFocus={() => setFocused("message")} onBlur={() => setFocused(null)}
                    style={{ ...fieldStyle("message"), display: "block" }} />
                </div>
                {status === "error" && (
                  <p style={{ fontFamily: FONT_CRIMSON, fontSize: "12px", fontStyle: "italic", color: "rgba(220,80,80,0.8)" }}>The spell fizzled. Please try again.</p>
                )}
                <div>
                  <button type="submit" disabled={status === "sending"} className="arcane-submit">
                    {status === "sending" ? "Casting…" : "✦ Send Message"}
                  </button>
                </div>
              </form>
            )}
          </motion.div>

          {/* Info */}
          <motion.div initial={{ opacity: 0, y: 30, filter: "blur(6px)" }} whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.15 }}>
            <div style={{ height: "1px", background: `linear-gradient(90deg, ${GOLD}40, rgba(159,122,234,0.3), transparent)`, marginBottom: "2.5rem" }} />
            {data?.email && (
              <div style={{ marginBottom: "2rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
                  <FaEnvelope style={{ color: `${GOLD}60`, fontSize: "12px" }} />
                  <span style={{ fontFamily: FONT_CINZEL, fontSize: "8px", letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(245,240,255,0.3)" }}>Email</span>
                </div>
                <a href={`mailto:${data.email}`} style={{ fontFamily: FONT_CRIMSON, fontSize: "15px", fontStyle: "italic", color: GOLD, textDecoration: "none" }}>
                  {data.email}
                </a>
              </div>
            )}
            {data?.location && (
              <div style={{ marginBottom: "2rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
                  <FaMapMarkerAlt style={{ color: `${GOLD}60`, fontSize: "12px" }} />
                  <span style={{ fontFamily: FONT_CINZEL, fontSize: "8px", letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(245,240,255,0.3)" }}>Location</span>
                </div>
                <p style={{ fontFamily: FONT_CRIMSON, fontSize: "14px", color: "rgba(245,240,255,0.65)", margin: 0 }}>{data.location}</p>
              </div>
            )}
            <div style={{ display: "flex", gap: "12px", marginTop: "2rem" }}>
              {data?.github && (
                <a href={data.github} target="_blank" rel="noopener noreferrer"
                  style={{ width: "42px", height: "42px", border: "1px solid rgba(196,163,90,0.2)", display: "flex", alignItems: "center", justifyContent: "center", color: "rgba(196,163,90,0.5)", textDecoration: "none", transition: "all 0.25s" }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = GOLD; e.currentTarget.style.color = GOLD; e.currentTarget.style.boxShadow = "0 0 16px rgba(196,163,90,0.2)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(196,163,90,0.2)"; e.currentTarget.style.color = "rgba(196,163,90,0.5)"; e.currentTarget.style.boxShadow = "none"; }}
                ><FaGithub size={17} /></a>
              )}
              {data?.linkedin && (
                <a href={data.linkedin} target="_blank" rel="noopener noreferrer"
                  style={{ width: "42px", height: "42px", border: "1px solid rgba(159,122,234,0.2)", display: "flex", alignItems: "center", justifyContent: "center", color: "rgba(159,122,234,0.5)", textDecoration: "none", transition: "all 0.25s" }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#9F7AEA"; e.currentTarget.style.color = "#9F7AEA"; e.currentTarget.style.boxShadow = "0 0 16px rgba(159,122,234,0.2)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(159,122,234,0.2)"; e.currentTarget.style.color = "rgba(159,122,234,0.5)"; e.currentTarget.style.boxShadow = "none"; }}
                ><FaLinkedin size={17} /></a>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
