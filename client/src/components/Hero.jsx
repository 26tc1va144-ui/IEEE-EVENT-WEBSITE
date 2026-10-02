import eventConfig from '../config/eventConfig';
import Countdown from './Countdown';

export default function Hero() {
  return (
    <section id="home" className="hero">
      {/* Animated background */}
      <div className="hero__bg">
        <div className="hero__grid-pattern"></div>
        <div className="hero__orb hero__orb--1"></div>
        <div className="hero__orb hero__orb--2"></div>
        <div className="hero__orb hero__orb--3"></div>
      </div>

      <div className="hero__content container">
        {/* Organizer logos */}
        <div className="hero__logos">
          {eventConfig.organizers.map((org, i) => (
            <div key={i} className="hero__logo-badge">
              {org.logo ? (
                <img src={org.logo} alt={org.shortName} />
              ) : (
                <span className="hero__logo-placeholder" style={{ borderColor: org.color }}>
                  {org.shortName}
                </span>
              )}
            </div>
          ))}
        </div>

        <div className="hero__label">IEEE RAS &amp; IAS × MITS DU</div>

        <h1 className="hero__title">
          {eventConfig.title}
        </h1>

        <p className="hero__subtitle">
          {eventConfig.subtitle}<br />
          {eventConfig.institution}
        </p>

        <p className="hero__tagline">{eventConfig.tagline}</p>

        {/* Event meta cards */}
        <div className="hero__meta">
          <div className="hero__meta-item">
            <span className="hero__meta-icon">📅</span>
            <span>{eventConfig.displayDate}</span>
          </div>
          <div className="hero__meta-item">
            <span className="hero__meta-icon">🕐</span>
            <span>{eventConfig.eventStartTime} – {eventConfig.eventEndTime}</span>
          </div>
          <div className="hero__meta-item">
            <span className="hero__meta-icon">📍</span>
            <span>{eventConfig.venueShort}</span>
          </div>
          <div className="hero__meta-item hero__meta-item--fee">
            <span className="hero__meta-icon">💰</span>
            <span>Registration: {eventConfig.currency}{eventConfig.registrationFee}</span>
          </div>
        </div>

        {/* CTA buttons */}
        <div className="hero__actions">
          <a href="#registration" className="btn btn-register btn-large">
            Register Now – {eventConfig.currency}{eventConfig.registrationFee}
          </a>
          <a href="#about" className="btn btn-secondary btn-large" style={{ color: '#fff', borderColor: 'rgba(255,255,255,0.3)' }}>
            View Event Details
          </a>
        </div>

        {/* Countdown */}
        <Countdown />
      </div>

      <style>{`
        .hero {
          position: relative;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(160deg, #050d1a 0%, #0a1628 30%, #0d1f3c 60%, #0a1628 100%);
          overflow: hidden;
          padding: calc(var(--nav-height) + var(--space-8)) 0 var(--space-12);
        }

        .hero__bg {
          position: absolute;
          inset: 0;
          z-index: 0;
        }

        .hero__grid-pattern {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(0, 98, 155, 0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 98, 155, 0.06) 1px, transparent 1px);
          background-size: 60px 60px;
          mask-image: radial-gradient(ellipse 80% 70% at 50% 50%, black, transparent);
          -webkit-mask-image: radial-gradient(ellipse 80% 70% at 50% 50%, black, transparent);
        }

        .hero__orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          opacity: 0.35;
        }

        .hero__orb--1 {
          width: 500px;
          height: 500px;
          background: radial-gradient(circle, rgba(0, 98, 155, 0.5) 0%, transparent 70%);
          top: -10%;
          right: -5%;
          animation: float 8s ease-in-out infinite;
        }

        .hero__orb--2 {
          width: 400px;
          height: 400px;
          background: radial-gradient(circle, rgba(0, 108, 183, 0.4) 0%, transparent 70%);
          bottom: 5%;
          left: -8%;
          animation: float 10s ease-in-out infinite reverse;
        }

        .hero__orb--3 {
          width: 250px;
          height: 250px;
          background: radial-gradient(circle, rgba(59, 158, 222, 0.3) 0%, transparent 70%);
          top: 40%;
          left: 50%;
          animation: float 6s ease-in-out infinite;
        }

        .hero__content {
          position: relative;
          z-index: 1;
          text-align: center;
          color: var(--text-inverse);
        }

        .hero__logos {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: var(--space-4);
          margin-bottom: var(--space-6);
          flex-wrap: wrap;
        }

        .hero__logo-badge {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .hero__logo-badge img {
          height: 50px;
          width: auto;
        }

        .hero__logo-placeholder {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: var(--space-2) var(--space-4);
          border: 2px solid;
          border-radius: var(--radius-md);
          font-size: var(--text-xs);
          font-weight: 700;
          color: rgba(255, 255, 255, 0.85);
          letter-spacing: 1px;
          backdrop-filter: blur(10px);
          background: rgba(255, 255, 255, 0.05);
        }

        .hero__label {
          display: inline-block;
          font-size: var(--text-xs);
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 4px;
          color: var(--color-accent-glow);
          margin-bottom: var(--space-4);
          padding: var(--space-1) var(--space-4);
          background: rgba(59, 158, 222, 0.1);
          border-radius: var(--radius-full);
          border: 1px solid rgba(59, 158, 222, 0.2);
        }

        .hero__title {
          font-size: clamp(2rem, 6vw, 4.5rem);
          font-weight: 900;
          line-height: 1.1;
          margin-bottom: var(--space-4);
          background: linear-gradient(135deg, #ffffff 0%, #cbd5e1 50%, #ffffff 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hero__subtitle {
          font-size: var(--text-xl);
          font-weight: 500;
          color: rgba(255, 255, 255, 0.7);
          margin-bottom: var(--space-3);
          line-height: 1.5;
        }

        .hero__tagline {
          font-size: var(--text-lg);
          font-style: italic;
          color: var(--color-accent-glow);
          margin-bottom: var(--space-8);
          font-weight: 400;
        }

        .hero__meta {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: var(--space-4);
          margin-bottom: var(--space-8);
          flex-wrap: wrap;
        }

        .hero__meta-item {
          display: flex;
          align-items: center;
          gap: var(--space-2);
          padding: var(--space-2) var(--space-4);
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: var(--radius-full);
          font-size: var(--text-sm);
          color: rgba(255, 255, 255, 0.85);
          backdrop-filter: blur(10px);
        }

        .hero__meta-item--fee {
          background: rgba(0, 98, 155, 0.2);
          border-color: rgba(0, 98, 155, 0.4);
          color: #ffffff;
          font-weight: 600;
        }

        .hero__meta-icon {
          font-size: var(--text-base);
        }

        .hero__actions {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: var(--space-4);
          flex-wrap: wrap;
          margin-bottom: var(--space-10);
        }

        @media (max-width: 768px) {
          .hero {
            padding: calc(var(--nav-height) + var(--space-6)) 0 var(--space-8);
          }
          .hero__subtitle {
            font-size: var(--text-base);
          }
          .hero__tagline {
            font-size: var(--text-sm);
          }
          .hero__meta {
            gap: var(--space-2);
          }
          .hero__meta-item {
            font-size: var(--text-xs);
            padding: var(--space-1) var(--space-3);
          }
          .hero__actions {
            flex-direction: column;
          }
          .hero__logo-placeholder {
            font-size: 10px;
            padding: var(--space-1) var(--space-3);
          }
        }
      `}</style>
    </section>
  );
}
