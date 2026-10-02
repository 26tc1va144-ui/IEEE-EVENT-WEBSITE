import { useState, useEffect } from 'react';
import eventConfig from '../config/eventConfig';

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Highlights', href: '#highlights' },
  { label: 'Schedule', href: '#schedule' },
  { label: 'Speakers', href: '#speakers' },
  { label: 'Registration', href: '#registration' },
  { label: 'Venue', href: '#venue' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [mobileOpen]);

  const handleLinkClick = () => setMobileOpen(false);

  return (
    <>
      <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
        <div className="navbar__inner container">
          <a href="#home" className="navbar__logo" onClick={handleLinkClick}>
            <span className="navbar__logo-icon">IW</span>
            <span className="navbar__logo-text">IEEE Workshop</span>
          </a>

          {/* Desktop links */}
          <div className="navbar__links">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="navbar__link">
                {link.label}
              </a>
            ))}
          </div>

          <a href="#registration" className="btn btn-primary navbar__cta">
            Register Now – {eventConfig.currency}{eventConfig.registrationFee}
          </a>

          {/* Mobile hamburger */}
          <button
            className={`navbar__hamburger ${mobileOpen ? 'active' : ''}`}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      <div className={`mobile-menu ${mobileOpen ? 'mobile-menu--open' : ''}`}>
        <div className="mobile-menu__content">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="mobile-menu__link"
              onClick={handleLinkClick}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#registration"
            className="btn btn-register mobile-menu__cta"
            onClick={handleLinkClick}
          >
            Register Now – {eventConfig.currency}{eventConfig.registrationFee}
          </a>
        </div>
      </div>

      <style>{`
        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          height: var(--nav-height);
          transition: all var(--transition-base);
          background: transparent;
        }

        .navbar--scrolled {
          background: rgba(10, 22, 40, 0.95);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
        }

        .navbar__inner {
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: var(--space-4);
        }

        .navbar__logo {
          display: flex;
          align-items: center;
          gap: var(--space-2);
          text-decoration: none;
          color: var(--text-inverse);
          flex-shrink: 0;
        }

        .navbar__logo-icon {
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, var(--color-ieee-blue) 0%, var(--color-ieee-blue-l) 100%);
          border-radius: var(--radius-sm);
          font-size: var(--text-sm);
          font-weight: 800;
          color: white;
        }

        .navbar__logo-text {
          font-size: var(--text-sm);
          font-weight: 700;
          letter-spacing: 0.5px;
        }

        .navbar__links {
          display: flex;
          align-items: center;
          gap: var(--space-1);
        }

        .navbar__link {
          padding: var(--space-2) var(--space-3);
          font-size: var(--text-xs);
          font-weight: 500;
          color: rgba(255, 255, 255, 0.75);
          border-radius: var(--radius-sm);
          transition: all var(--transition-fast);
          text-decoration: none;
          letter-spacing: 0.3px;
        }

        .navbar__link:hover {
          color: var(--text-inverse);
          background: rgba(255, 255, 255, 0.08);
        }

        .navbar__cta {
          font-size: var(--text-xs);
          padding: var(--space-2) var(--space-4);
          flex-shrink: 0;
        }

        .navbar__hamburger {
          display: none;
          flex-direction: column;
          justify-content: center;
          gap: 5px;
          background: none;
          border: none;
          cursor: pointer;
          padding: var(--space-2);
          z-index: 1001;
        }

        .navbar__hamburger span {
          width: 22px;
          height: 2px;
          background: var(--text-inverse);
          transition: all var(--transition-base);
          border-radius: 2px;
        }

        .navbar__hamburger.active span:nth-child(1) {
          transform: rotate(45deg) translateY(5px) translateX(5px);
        }
        .navbar__hamburger.active span:nth-child(2) {
          opacity: 0;
        }
        .navbar__hamburger.active span:nth-child(3) {
          transform: rotate(-45deg) translateY(-5px) translateX(5px);
        }

        .mobile-menu {
          position: fixed;
          inset: 0;
          z-index: 999;
          background: rgba(10, 22, 40, 0.98);
          backdrop-filter: blur(30px);
          -webkit-backdrop-filter: blur(30px);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          pointer-events: none;
          transition: opacity var(--transition-base);
        }

        .mobile-menu--open {
          opacity: 1;
          pointer-events: all;
        }

        .mobile-menu__content {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: var(--space-4);
        }

        .mobile-menu__link {
          font-size: var(--text-xl);
          font-weight: 600;
          color: rgba(255, 255, 255, 0.8);
          text-decoration: none;
          transition: color var(--transition-fast);
          padding: var(--space-2) var(--space-4);
        }

        .mobile-menu__link:hover {
          color: var(--text-inverse);
        }

        .mobile-menu__cta {
          margin-top: var(--space-4);
        }

        @media (max-width: 1024px) {
          .navbar__links {
            display: none;
          }
          .navbar__cta {
            display: none;
          }
          .navbar__hamburger {
            display: flex;
          }
        }
      `}</style>
    </>
  );
}
