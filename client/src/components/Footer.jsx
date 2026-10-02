import eventConfig from '../config/eventConfig';

const quickLinks = [
  { label: 'About', href: '#about' },
  { label: 'Schedule', href: '#schedule' },
  { label: 'Speakers', href: '#speakers' },
  { label: 'Registration', href: '#registration' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#contact' },
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          {/* Brand */}
          <div className="footer__brand">
            <div className="footer__logo">
              <span className="footer__logo-icon">IW</span>
              <span className="footer__logo-text">IEEE Workshop</span>
            </div>
            <p className="footer__brand-desc">
              {eventConfig.title} — Organized by IEEE RAS &amp; IAS at {eventConfig.institution}.
            </p>
            <div className="footer__orgs">
              {eventConfig.organizers.map((org, i) => (
                <span key={i} className="footer__org-badge">{org.shortName}</span>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div className="footer__col">
            <h4 className="footer__col-title">Quick Links</h4>
            {quickLinks.map((link) => (
              <a key={link.href} href={link.href} className="footer__link">{link.label}</a>
            ))}
          </div>

          {/* Contact */}
          <div className="footer__col">
            <h4 className="footer__col-title">Contact</h4>
            <p className="footer__contact-item">📧 {eventConfig.contact.email}</p>
            <p className="footer__contact-item">📱 {eventConfig.contact.phone}</p>
            <p className="footer__contact-item">📍 {eventConfig.venueShort}</p>
          </div>

          {/* Legal */}
          <div className="footer__col">
            <h4 className="footer__col-title">Legal</h4>
            <a href={eventConfig.legal.privacyPolicy} className="footer__link">Privacy Policy</a>
            <a href={eventConfig.legal.termsConditions} className="footer__link">Terms &amp; Conditions</a>
            <a href={eventConfig.legal.refundPolicy} className="footer__link">Refund / Cancellation Policy</a>
          </div>
        </div>

        <div className="footer__bottom">
          <p className="footer__copyright">
            © {new Date().getFullYear()} IEEE RAS &amp; IAS. All Rights Reserved.
          </p>
          <p className="footer__disclaimer">
            This website is for the International Workshop event. IEEE and its logos are trademarks of the Institute of Electrical and Electronics Engineers.
          </p>
        </div>
      </div>

      <style>{`
        .footer {
          background: var(--color-navy);
          color: rgba(255, 255, 255, 0.7);
          padding: var(--space-16) 0 var(--space-8);
        }

        .footer__grid {
          display: grid;
          grid-template-columns: 1.5fr 1fr 1fr 1fr;
          gap: var(--space-8);
          margin-bottom: var(--space-12);
        }

        .footer__logo {
          display: flex;
          align-items: center;
          gap: var(--space-2);
          margin-bottom: var(--space-4);
        }

        .footer__logo-icon {
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

        .footer__logo-text {
          font-size: var(--text-base);
          font-weight: 700;
          color: var(--text-inverse);
        }

        .footer__brand-desc {
          font-size: var(--text-sm);
          line-height: 1.7;
          margin-bottom: var(--space-4);
        }

        .footer__orgs {
          display: flex;
          gap: var(--space-2);
          flex-wrap: wrap;
        }

        .footer__org-badge {
          font-size: var(--text-xs);
          padding: var(--space-1) var(--space-3);
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: var(--radius-full);
          font-weight: 600;
        }

        .footer__col-title {
          font-size: var(--text-sm);
          font-weight: 700;
          color: var(--text-inverse);
          text-transform: uppercase;
          letter-spacing: 1.5px;
          margin-bottom: var(--space-4);
        }

        .footer__link {
          display: block;
          font-size: var(--text-sm);
          color: rgba(255, 255, 255, 0.6);
          margin-bottom: var(--space-2);
          transition: color var(--transition-fast);
          text-decoration: none;
        }

        .footer__link:hover {
          color: var(--text-inverse);
        }

        .footer__contact-item {
          font-size: var(--text-sm);
          margin-bottom: var(--space-2);
          line-height: 1.5;
        }

        .footer__bottom {
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          padding-top: var(--space-6);
          text-align: center;
        }

        .footer__copyright {
          font-size: var(--text-sm);
          font-weight: 500;
          color: rgba(255, 255, 255, 0.5);
          margin-bottom: var(--space-2);
        }

        .footer__disclaimer {
          font-size: var(--text-xs);
          color: rgba(255, 255, 255, 0.3);
        }

        @media (max-width: 768px) {
          .footer__grid {
            grid-template-columns: 1fr;
            gap: var(--space-6);
          }
        }
      `}</style>
    </footer>
  );
}
