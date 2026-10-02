import { useState } from 'react';
import eventConfig from '../config/eventConfig';

export default function Organizers() {
  const [isLightBoxOpen, setIsLightBoxOpen] = useState(false);

  return (
    <section className="org-section" id="organizers">
      {/* Background ambient glow matching the image's blue & red circuits */}
      <div className="org__bg-glow-blue" />
      <div className="org__bg-glow-red" />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <div className="section-header">
          <span className="org__pill">
            <span className="org__pulse-dot" />
            Official Organizing Bodies
          </span>
          <h2 className="section-title org__title">Jointly Organized By</h2>
          <p className="section-subtitle org__subtitle">
            Under the prestigious banner of IEEE, driven by student excellence in robotics, automation, and industrial technology.
          </p>
        </div>

        {/* Hero Showcase Display for the Emblem */}
        <div className="org__showcase-wrapper">
          <div className="org__frame">
            {/* Tech HUD Corner Accents */}
            <div className="org__corner org__corner--tl" />
            <div className="org__corner org__corner--tr" />
            <div className="org__corner org__corner--bl" />
            <div className="org__corner org__corner--br" />

            {/* Top Status Header */}
            <div className="org__frame-header">
              <div className="org__dots">
                <span className="dot dot--red" />
                <span className="dot dot--yellow" />
                <span className="dot dot--green" />
              </div>
              <div className="org__frame-label">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
                IEEE STUDENT BRANCH CHAPTERS • MITS GWALIOR
              </div>
              <div className="org__badge-live">
                <span className="live-dot" /> ACCREDITED
              </div>
            </div>

            {/* Poster / Logo Canvas */}
            <div className="org__canvas" onClick={() => setIsLightBoxOpen(true)}>
              <div className="org__img-container">
                <img
                  src="/organizer-logo.jpg"
                  alt="IEEE RAS & IAS Student Branch Chapter MITS Gwalior"
                  className="org__emblem-img"
                  loading="lazy"
                />
                <div className="org__sheen" />
              </div>

              {/* Hover overlay hint */}
              <div className="org__hover-hint">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  <line x1="11" y1="8" x2="11" y2="14" />
                  <line x1="8" y1="11" x2="14" y2="11" />
                </svg>
                Click to expand emblem in high definition
              </div>
            </div>

            {/* Bottom Glow Bar with Blue to Red dual laser line */}
            <div className="org__dual-laser" />
          </div>
        </div>

        {/* Dual Society Feature Spotlight Cards */}
        <div className="org__societies-grid">
          {/* IEEE RAS Card */}
          <div className="org__society-card org__society-card--ras">
            <div className="society__accent-stripe ras-stripe" />
            <div className="society__top">
              <div className="society__icon-wrap ras-icon">
                <span className="society__emoji">🤖</span>
              </div>
              <div>
                <span className="society__tag ras-tag">Student Branch Chapter</span>
                <h3 className="society__name">IEEE RAS</h3>
                <span className="society__fullname">Robotics &amp; Automation Society</span>
              </div>
            </div>
            <p className="society__desc">
              Pioneering practical applications and research in advanced robotics, mechatronics, autonomous navigation, and intelligent control systems.
            </p>
            <div className="society__tags">
              <span className="tech-chip">Robotics</span>
              <span className="tech-chip">Autonomous Systems</span>
              <span className="tech-chip">Mechatronics</span>
              <span className="tech-chip">AI &amp; Vision</span>
            </div>
            {eventConfig.social.instagramRAS && (
              <a
                href={eventConfig.social.instagramRAS}
                target="_blank"
                rel="noopener noreferrer"
                className="society__btn ras-btn"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
                Follow @ieee_ras_mits
                <span className="arrow-icon">→</span>
              </a>
            )}
          </div>

          {/* IEEE IAS Card */}
          <div className="org__society-card org__society-card--ias">
            <div className="society__accent-stripe ias-stripe" />
            <div className="society__top">
              <div className="society__icon-wrap ias-icon">
                <span className="society__emoji">⚡</span>
              </div>
              <div>
                <span className="society__tag ias-tag">Student Branch Chapter</span>
                <h3 className="society__name">IEEE IAS</h3>
                <span className="society__fullname">Industry Applications Society</span>
              </div>
            </div>
            <p className="society__desc">
              Bridging theoretical engineering with industrial reality—advancing technology in energy systems, smart manufacturing, and industrial automation.
            </p>
            <div className="society__tags">
              <span className="tech-chip">Industry 4.0</span>
              <span className="tech-chip">Smart Grids</span>
              <span className="tech-chip">Power Systems</span>
              <span className="tech-chip">Automation</span>
            </div>
            {eventConfig.social.instagramIAS && (
              <a
                href={eventConfig.social.instagramIAS}
                target="_blank"
                rel="noopener noreferrer"
                className="society__btn ias-btn"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
                Follow @ieee_ias_mits
                <span className="arrow-icon">→</span>
              </a>
            )}
          </div>
        </div>

        {/* Institution Accreditation Banner */}
        <div className="org__institution-strip">
          <div className="org__inst-icon">🏛️</div>
          <div className="org__inst-content">
            <h4 className="org__inst-title">Host Institution: Madhav Institute of Technology &amp; Science (MITS - DU)</h4>
            <p className="org__inst-meta">
              Deemed to be University • NAAC A++ Grade Accredited • Gwalior, Madhya Pradesh, India
            </p>
          </div>
          <div className="org__inst-badge">
            <span className="badge-shield">✓</span> VERIFIED CHAPTER HOST
          </div>
        </div>
      </div>

      {/* Lightbox Modal for High-Def Inspection */}
      {isLightBoxOpen && (
        <div className="org__lightbox" onClick={() => setIsLightBoxOpen(false)}>
          <div className="org__lightbox-modal" onClick={(e) => e.stopPropagation()}>
            <button
              className="org__lightbox-close"
              onClick={() => setIsLightBoxOpen(false)}
              aria-label="Close"
            >
              ✕
            </button>
            <img
              src="/organizer-logo.jpg"
              alt="IEEE RAS & IAS Official Emblem"
              className="org__lightbox-img"
            />
            <div className="org__lightbox-caption">
              <strong>IEEE RAS &amp; IAS Student Branch Chapters</strong> — MITS Gwalior
            </div>
          </div>
        </div>
      )}

      <style>{`
        .org-section {
          position: relative;
          padding: var(--space-20) 0;
          background: linear-gradient(180deg, #070e1b 0%, #0c182c 50%, #070e1b 100%);
          color: var(--color-white);
          overflow: hidden;
        }

        /* Ambient Glows */
        .org__bg-glow-blue {
          position: absolute;
          top: 15%;
          left: -10%;
          width: 500px;
          height: 500px;
          background: radial-gradient(circle, rgba(0, 98, 155, 0.28) 0%, transparent 70%);
          filter: blur(80px);
          pointer-events: none;
          z-index: 1;
        }

        .org__bg-glow-red {
          position: absolute;
          top: 25%;
          right: -10%;
          width: 500px;
          height: 500px;
          background: radial-gradient(circle, rgba(220, 38, 38, 0.22) 0%, transparent 70%);
          filter: blur(80px);
          pointer-events: none;
          z-index: 1;
        }

        /* Section Header */
        .org__pill {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(0, 98, 155, 0.25);
          border: 1px solid rgba(0, 140, 255, 0.4);
          color: #5ec5ff;
          padding: 6px 16px;
          border-radius: 999px;
          font-size: var(--text-xs);
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          margin-bottom: var(--space-3);
        }

        .org__pulse-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #00d2ff;
          box-shadow: 0 0 10px #00d2ff;
          animation: orgPulse 2s infinite;
        }

        @keyframes orgPulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(0.85); }
        }

        .org__title {
          color: var(--color-white);
          font-size: var(--text-4xl);
          font-weight: 800;
          letter-spacing: -0.02em;
          margin-bottom: var(--space-3);
        }

        .org__subtitle {
          color: #94a3b8;
          max-width: 650px;
          margin: 0 auto var(--space-10);
          font-size: var(--text-base);
          line-height: 1.6;
        }

        /* Hero Showcase Frame */
        .org__showcase-wrapper {
          display: flex;
          justify-content: center;
          margin-bottom: var(--space-12);
        }

        .org__frame {
          position: relative;
          max-width: 680px;
          width: 100%;
          background: rgba(13, 23, 42, 0.85);
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 20px;
          padding: var(--space-4);
          box-shadow: 
            0 20px 60px rgba(0, 0, 0, 0.6),
            0 0 40px rgba(0, 98, 155, 0.25),
            inset 0 1px 0 rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(16px);
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease;
        }

        .org__frame:hover {
          transform: translateY(-4px) scale(1.01);
          box-shadow: 
            0 30px 80px rgba(0, 0, 0, 0.8),
            0 0 50px rgba(0, 98, 155, 0.4),
            0 0 30px rgba(220, 38, 38, 0.25),
            inset 0 1px 0 rgba(255, 255, 255, 0.25);
        }

        /* HUD Corners */
        .org__corner {
          position: absolute;
          width: 16px;
          height: 16px;
          border-color: #38bdf8;
          border-style: solid;
          pointer-events: none;
        }
        .org__corner--tl { top: -2px; left: -2px; border-width: 3px 0 0 3px; border-top-left-radius: 6px; }
        .org__corner--tr { top: -2px; right: -2px; border-width: 3px 3px 0 0; border-top-right-radius: 6px; }
        .org__corner--bl { bottom: -2px; left: -2px; border-width: 0 0 3px 3px; border-bottom-left-radius: 6px; }
        .org__corner--br { bottom: -2px; right: -2px; border-width: 0 3px 3px 0; border-bottom-right-radius: 6px; }

        /* Frame Header */
        .org__frame-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: var(--space-2) var(--space-3) var(--space-3);
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          margin-bottom: var(--space-3);
        }

        .org__dots {
          display: flex;
          gap: 6px;
        }
        .dot { width: 10px; height: 10px; border-radius: 50%; display: inline-block; }
        .dot--red { background: #ef4444; }
        .dot--yellow { background: #f59e0b; }
        .dot--green { background: #10b981; }

        .org__frame-label {
          display: flex;
          align-items: center;
          gap: 6px;
          font-family: var(--font-mono, monospace);
          font-size: 11px;
          font-weight: 700;
          color: #94a3b8;
          letter-spacing: 0.1em;
        }

        .org__badge-live {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 10px;
          font-weight: 800;
          color: #10b981;
          letter-spacing: 0.08em;
          background: rgba(16, 185, 129, 0.15);
          padding: 3px 8px;
          border-radius: 6px;
          border: 1px solid rgba(16, 185, 129, 0.3);
        }

        .live-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #10b981;
          box-shadow: 0 0 6px #10b981;
        }

        /* Canvas & Emblem Image */
        .org__canvas {
          position: relative;
          cursor: pointer;
          border-radius: 14px;
          overflow: hidden;
          background: #040913;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .org__img-container {
          position: relative;
          width: 100%;
          max-height: 520px;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        .org__emblem-img {
          width: 100%;
          height: auto;
          display: block;
          object-fit: contain;
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .org__frame:hover .org__emblem-img {
          transform: scale(1.025);
        }

        /* Sheen animation across the emblem */
        .org__sheen {
          position: absolute;
          top: 0;
          left: -150%;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            115deg,
            transparent 0%,
            rgba(255, 255, 255, 0.03) 40%,
            rgba(255, 255, 255, 0.15) 50%,
            rgba(255, 255, 255, 0.03) 60%,
            transparent 100%
          );
          transform: skewX(-20deg);
          pointer-events: none;
          transition: left 0.8s ease;
        }

        .org__frame:hover .org__sheen {
          left: 150%;
        }

        /* Hover hint */
        .org__hover-hint {
          position: absolute;
          bottom: 14px;
          left: 50%;
          transform: translateX(-50%) translateY(10px);
          background: rgba(10, 22, 40, 0.9);
          border: 1px solid rgba(56, 189, 248, 0.4);
          color: #e0f2fe;
          padding: 8px 16px;
          border-radius: 999px;
          font-size: 12px;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 8px;
          opacity: 0;
          transition: all 0.3s ease;
          pointer-events: none;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
          white-space: nowrap;
        }

        .org__canvas:hover .org__hover-hint {
          opacity: 1;
          transform: translateX(-50%) translateY(0);
        }

        /* Dual laser accent bar at bottom */
        .org__dual-laser {
          height: 3px;
          margin-top: var(--space-3);
          border-radius: 999px;
          background: linear-gradient(90deg, #0084ff 0%, #38bdf8 45%, #ef4444 65%, #dc2626 100%);
          box-shadow: 0 0 12px rgba(56, 189, 248, 0.6);
        }

        /* Dual Society Spotlight Cards */
        .org__societies-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: var(--space-6);
          max-width: 980px;
          margin: 0 auto var(--space-8);
        }

        .org__society-card {
          position: relative;
          background: rgba(15, 23, 42, 0.7);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 16px;
          padding: var(--space-6);
          overflow: hidden;
          transition: all 0.3s ease;
          backdrop-filter: blur(12px);
          display: flex;
          flex-direction: column;
        }

        .org__society-card:hover {
          transform: translateY(-4px);
          border-color: rgba(255, 255, 255, 0.2);
          box-shadow: 0 16px 36px rgba(0, 0, 0, 0.4);
        }

        .org__society-card--ras:hover {
          border-color: rgba(220, 38, 38, 0.4);
          box-shadow: 0 16px 36px rgba(220, 38, 38, 0.15);
        }

        .org__society-card--ias:hover {
          border-color: rgba(16, 185, 129, 0.4);
          box-shadow: 0 16px 36px rgba(16, 185, 129, 0.15);
        }

        .society__accent-stripe {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
        }

        .ras-stripe {
          background: linear-gradient(90deg, #b91c1c, #ef4444, #f87171);
        }

        .ias-stripe {
          background: linear-gradient(90deg, #059669, #10b981, #34d399);
        }

        .society__top {
          display: flex;
          align-items: center;
          gap: var(--space-4);
          margin-bottom: var(--space-4);
        }

        .society__icon-wrap {
          width: 52px;
          height: 52px;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 26px;
          flex-shrink: 0;
        }

        .ras-icon {
          background: rgba(220, 38, 38, 0.15);
          border: 1px solid rgba(220, 38, 38, 0.3);
        }

        .ias-icon {
          background: rgba(16, 185, 129, 0.15);
          border: 1px solid rgba(16, 185, 129, 0.3);
        }

        .society__tag {
          display: inline-block;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          margin-bottom: 2px;
        }

        .ras-tag { color: #f87171; }
        .ias-tag { color: #34d399; }

        .society__name {
          font-size: var(--text-xl);
          font-weight: 800;
          color: var(--color-white);
          margin: 0;
          line-height: 1.2;
        }

        .society__fullname {
          font-size: 12px;
          color: #94a3b8;
          font-weight: 500;
        }

        .society__desc {
          font-size: var(--text-sm);
          color: #cbd5e1;
          line-height: 1.6;
          margin-bottom: var(--space-4);
          flex-grow: 1;
        }

        .society__tags {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-bottom: var(--space-5);
        }

        .tech-chip {
          font-size: 11px;
          font-weight: 600;
          padding: 4px 10px;
          border-radius: 6px;
          background: rgba(255, 255, 255, 0.06);
          color: #e2e8f0;
          border: 1px solid rgba(255, 255, 255, 0.08);
        }

        .society__btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          width: 100%;
          padding: 10px 16px;
          border-radius: 10px;
          font-size: var(--text-sm);
          font-weight: 700;
          text-decoration: none;
          transition: all 0.2s ease;
        }

        .ras-btn {
          background: rgba(220, 38, 38, 0.15);
          color: #fca5a5;
          border: 1px solid rgba(220, 38, 38, 0.35);
        }
        .ras-btn:hover {
          background: #dc2626;
          color: #ffffff;
          border-color: #dc2626;
          box-shadow: 0 4px 15px rgba(220, 38, 38, 0.4);
        }

        .ias-btn {
          background: rgba(16, 185, 129, 0.15);
          color: #6ee7b7;
          border: 1px solid rgba(16, 185, 129, 0.35);
        }
        .ias-btn:hover {
          background: #059669;
          color: #ffffff;
          border-color: #059669;
          box-shadow: 0 4px 15px rgba(16, 185, 129, 0.4);
        }

        .arrow-icon {
          transition: transform 0.2s ease;
        }
        .society__btn:hover .arrow-icon {
          transform: translateX(4px);
        }

        /* Institution Strip */
        .org__institution-strip {
          display: flex;
          align-items: center;
          justify-content: space-between;
          max-width: 980px;
          margin: 0 auto;
          background: rgba(15, 23, 42, 0.6);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 14px;
          padding: var(--space-4) var(--space-6);
          gap: var(--space-4);
          backdrop-filter: blur(8px);
        }

        .org__inst-icon {
          font-size: 28px;
          flex-shrink: 0;
        }

        .org__inst-content {
          flex: 1;
        }

        .org__inst-title {
          font-size: var(--text-sm);
          font-weight: 700;
          color: var(--color-white);
          margin-bottom: 2px;
        }

        .org__inst-meta {
          font-size: var(--text-xs);
          color: #94a3b8;
          margin: 0;
        }

        .org__inst-badge {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 11px;
          font-weight: 800;
          color: #38bdf8;
          letter-spacing: 0.08em;
          background: rgba(56, 189, 248, 0.1);
          border: 1px solid rgba(56, 189, 248, 0.25);
          padding: 6px 12px;
          border-radius: 999px;
          white-space: nowrap;
        }

        .badge-shield {
          color: #38bdf8;
          font-weight: 900;
        }

        /* Lightbox Modal */
        .org__lightbox {
          position: fixed;
          inset: 0;
          background: rgba(3, 7, 18, 0.92);
          backdrop-filter: blur(12px);
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: var(--space-6);
          animation: fadeIn 0.25s ease;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .org__lightbox-modal {
          position: relative;
          max-width: 800px;
          width: 100%;
          background: #091120;
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: 20px;
          padding: var(--space-5);
          box-shadow: 0 25px 80px rgba(0, 0, 0, 0.9);
          text-align: center;
        }

        .org__lightbox-close {
          position: absolute;
          top: 14px;
          right: 14px;
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: #ffffff;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          font-size: 16px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
        }

        .org__lightbox-close:hover {
          background: #ef4444;
          border-color: #ef4444;
          transform: scale(1.1);
        }

        .org__lightbox-img {
          max-width: 100%;
          max-height: 75vh;
          border-radius: 12px;
          object-fit: contain;
          margin-bottom: var(--space-3);
        }

        .org__lightbox-caption {
          font-size: var(--text-sm);
          color: #cbd5e1;
        }

        @media (max-width: 860px) {
          .org__societies-grid {
            grid-template-columns: 1fr;
          }

          .org__institution-strip {
            flex-direction: column;
            text-align: center;
            gap: var(--space-3);
          }

          .org__frame-header {
            flex-wrap: wrap;
            gap: 8px;
          }
        }
      `}</style>
    </section>
  );
}
