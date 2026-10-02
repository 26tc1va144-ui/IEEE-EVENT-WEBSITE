import eventConfig from '../config/eventConfig';

export default function Contact() {
  const { contact, social } = eventConfig;

  return (
    <section className="section" id="contact">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Get in Touch</span>
          <h2 className="section-title">Contact Us</h2>
          <p className="section-subtitle">
            Have questions? Reach out to our event coordinators.
          </p>
        </div>

        <div className="contact__grid">
          <ContactCard icon="👤" label="Event Coordinator" value={contact.coordinatorName} />
          <ContactCard icon="📧" label="Email" value={contact.email} href={`mailto:${contact.email}`} />
          <ContactCard icon="📱" label="Phone" value={contact.phone} href={`tel:${contact.phone}`} />
          <ContactCard icon="🤖" label="IEEE RAS & IAS" value={contact.rasIasContact} />
          <ContactCard icon="🏫" label="MITS Contact" value={contact.mitsContact} />
        </div>

        <div className="contact__social">
          <p className="contact__social-label">Follow Us</p>
          <div className="contact__social-links">
            {social.twitter && social.twitter !== '#' && (
              <SocialLink href={social.twitter} label="Twitter" icon="𝕏" />
            )}
            {social.linkedin && (
              <SocialLink href={social.linkedin} label="LinkedIn" icon="in" />
            )}
            {social.instagramRAS && (
              <SocialLink href={social.instagramRAS} label="Instagram (RAS)" icon="📷 RAS" />
            )}
            {social.instagramIAS && (
              <SocialLink href={social.instagramIAS} label="Instagram (IAS)" icon="📷 IAS" />
            )}
            {social.facebook && (
              <SocialLink href={social.facebook} label="Facebook" icon="f" />
            )}
            {social.website && (
              <SocialLink href={social.website} label="Website" icon="🌐" />
            )}
          </div>
        </div>
      </div>

      <style>{`
        .contact__grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: var(--space-4);
          max-width: 900px;
          margin: 0 auto var(--space-10);
        }

        .contact__card {
          text-align: center;
          padding: var(--space-6);
          background: var(--color-gray-50);
          border-radius: var(--radius-md);
          border: 1px solid var(--color-gray-200);
          transition: all var(--transition-base);
        }

        .contact__card:hover {
          background: var(--color-white);
          box-shadow: var(--shadow-md);
          transform: translateY(-2px);
        }

        .contact__card-icon {
          font-size: 1.5rem;
          margin-bottom: var(--space-2);
        }

        .contact__card-label {
          font-size: var(--text-xs);
          text-transform: uppercase;
          letter-spacing: 1.5px;
          color: var(--text-muted);
          font-weight: 600;
          margin-bottom: var(--space-1);
        }

        .contact__card-value {
          font-size: var(--text-sm);
          font-weight: 600;
          color: var(--color-navy);
          word-break: break-word;
        }

        .contact__card-value a {
          color: var(--color-ieee-blue);
        }

        .contact__social {
          text-align: center;
        }

        .contact__social-label {
          font-size: var(--text-sm);
          text-transform: uppercase;
          letter-spacing: 2px;
          color: var(--text-muted);
          font-weight: 600;
          margin-bottom: var(--space-4);
        }

        .contact__social-links {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: var(--space-3);
        }

          .contact__social-link {
          padding: 0 12px;
          min-width: 44px;
          height: 44px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--color-gray-100);
          border: 1px solid var(--color-gray-200);
          border-radius: 22px;
          color: var(--color-navy);
          font-weight: 700;
          font-size: var(--text-sm);
          transition: all var(--transition-base);
          text-decoration: none;
        }

        .contact__social-link:hover {
          background: var(--color-ieee-blue);
          color: var(--text-inverse);
          border-color: var(--color-ieee-blue);
          transform: translateY(-3px);
        }

        @media (max-width: 768px) {
          .contact__grid {
            grid-template-columns: 1fr;
            max-width: 400px;
          }
        }
      `}</style>
    </section>
  );
}

function ContactCard({ icon, label, value, href }) {
  return (
    <div className="contact__card">
      <div className="contact__card-icon">{icon}</div>
      <div className="contact__card-label">{label}</div>
      <div className="contact__card-value">
        {href ? <a href={href}>{value}</a> : value}
      </div>
    </div>
  );
}

function SocialLink({ href, label, icon }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="contact__social-link" title={label}>
      {icon}
    </a>
  );
}
