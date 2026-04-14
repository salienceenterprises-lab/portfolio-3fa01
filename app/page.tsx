"use client";
import React from "react";
import portfolioData from "../profile.json";
import PortfolioNav from "./components/nav";
import PortfolioHero from "./components/hero";
import PortfolioAbout from "./components/about";
import PortfolioEducation from "./components/education";
import PortfolioExperience from "./components/experience";
import PortfolioProjects from "./components/projects";
import PortfolioSkills from "./components/skills";
import PortfolioCommunity from "./components/community";
import PortfolioContact from "./components/contact";
import PortfolioFooter from "./components/footer";

export default function DeployedPortfolio() {
  const data = portfolioData;
  if (!data) return <div style={{ color: "#F5F0FF", padding: "40px", background: "#080618" }}>Loading…</div>;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700;900&family=Crimson+Pro:ital,wght@0,300;0,400;0,600;1,300;1,400&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; scroll-padding-top: 72px; }
        body { background: #080618; }
        @keyframes arcane-twinkle { 0%,100%{opacity:0.2;} 50%{opacity:1;} }
        @keyframes arcane-pulse { 0%,100%{transform:scale(1);opacity:0.6;} 50%{transform:scale(1.15);opacity:1;} }
        @keyframes arcane-shimmer { 0%{background-position:200% center;} 100%{background-position:-200% center;} }
        @keyframes arcane-float { 0%,100%{transform:translateY(0);} 50%{transform:translateY(-12px);} }
        @keyframes arcane-spin-slow { from{transform:rotate(0deg);} to{transform:rotate(360deg);} }
        @keyframes arcane-glow-pulse {
          0%,100%{ box-shadow: 0 0 8px rgba(196,163,90,0.2), inset 0 0 8px rgba(196,163,90,0.05); }
          50%{ box-shadow: 0 0 24px rgba(196,163,90,0.4), inset 0 0 16px rgba(196,163,90,0.08); }
        }
        /* Responsive nav */
        .arcane-desktop-links { display: flex; align-items: center; gap: 2rem; }
        .arcane-hamburger { display: none; }
        @media (max-width: 767px) {
          .arcane-desktop-links { display: none !important; }
          .arcane-hamburger { display: flex !important; }
          .arcane-nav-inner { padding: 0 1.25rem !important; }
        }
      `}</style>
      <div style={{ minHeight: "100vh", background: "#080618", color: "#F5F0FF" }}>
        <PortfolioNav data={data} />
        <PortfolioHero data={data} />
        <PortfolioAbout data={data} />
        <PortfolioEducation data={data} />
        <PortfolioExperience data={data} />
        <PortfolioProjects data={data} />
        <PortfolioSkills data={data} />
        <PortfolioCommunity data={data} />
        <PortfolioContact data={data} />
        <PortfolioFooter data={data} />
      </div>
    </>
  );
}
