import eventConfig from '../config/eventConfig';

export default function Organizers() {
  return (
    <section className="section-alt" id="organizers">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Organized By</span>
          <h2 className="section-title">Our Organizers</h2>
          <p className="section-subtitle">
            This International Workshop is proudly organized by the following IEEE societies and institution.
          </p>
        </div>

        <div className="org__grid">
          {eventConfig.organizers.map((org, i) => (
            <div key={i} className="org__card">
              <div className="org__logo-area" style={{ borderColor: org.color }}>
                {org.logo ? (
                  <img src={org.logo} alt={org.shortName} className="org__logo-img" />
                ) : (
                  <div className="org__logo-placeholder" style={{ color: org.color }}>
                    <span className="org__logo-abbr">{org.shortName.split(' ').map(w => w[0]).join('')}</span>
                    <span className="org__logo-text">{org.shortName}</span>
                  </div>
                )}
              </div>
              <h3 className="org__name">{org.name}</h3>
              <p className="org__note">
                {org.logo ? '' : 'Official logo will be placed here'}
              </p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .org__grid {
          display: flex;
          justify-content: center;
          gap: var(--space-6);
          max-width: 800px;
          margin: 0 auto;
        }

        .org__card {
          flex: 1;
          max-width: 350px;
          text-align: center;
          padding: var(--space-8) var(--space-6);
          background: var(--color-white);
          border-radius: var(--radius-lg);
          border: 1px solid var(--color-gray-200);
          box-shadow: var(--shadow-sm);
          transition: all var(--transition-base);
        }

        .org__card:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-lg);
        }

        .org__logo-area {
          width: 100px;
          height: 100px;
          margin: 0 auto var(--space-5);
          border-radius: var(--radius-lg);
          border: 2px solid;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--color-gray-50);
          overflow: hidden;
        }

        .org__logo-img {
          max-width: 80%;
          max-height: 80%;
          object-fit: contain;
        }

        .org__logo-placeholder {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: var(--space-1);
        }

        .org__logo-abbr {
          font-size: var(--text-2xl);
          font-weight: 900;
          letter-spacing: 1px;
        }

        .org__logo-text {
          font-size: 9px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .org__name {
          font-size: var(--text-sm);
          font-weight: 700;
          color: var(--color-navy);
          line-height: 1.4;
          margin-bottom: var(--space-2);
        }

        .org__note {
          font-size: var(--text-xs);
          color: var(--text-muted);
          font-style: italic;
        }

        @media (max-width: 768px) {
          .org__grid {
            grid-template-columns: 1fr;
            max-width: 400px;
          }
        }
      `}</style>
    </section>
  );
}
