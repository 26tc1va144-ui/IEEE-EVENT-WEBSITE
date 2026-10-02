import eventConfig from '../config/eventConfig';

export default function Speakers() {
  return (
    <section className="section-alt" id="speakers">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Speakers &amp; Experts</span>
          <h2 className="section-title">Learn from the Best</h2>
          <p className="section-subtitle">
            Our speakers will be announced soon. Stay tuned for updates on the expert lineup.
          </p>
        </div>

        <div className="spk__grid">
          {eventConfig.speakers.map((speaker, i) => (
            <div key={i} className="spk__card">
              <div className="spk__avatar">
                {speaker.image ? (
                  <img src={speaker.image} alt={speaker.name} />
                ) : (
                  <div className="spk__avatar-placeholder">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                      <circle cx="12" cy="7" r="4"/>
                    </svg>
                  </div>
                )}
              </div>
              <h3 className="spk__name">{speaker.name}</h3>
              <p className="spk__designation">{speaker.designation}</p>
              <p className="spk__org">{speaker.organization}</p>
              <div className="spk__divider"></div>
              <p className="spk__expertise">
                <span className="spk__label">Expertise:</span> {speaker.expertise}
              </p>
              <p className="spk__topic">
                <span className="spk__label">Topic:</span> {speaker.topic}
              </p>
              {speaker.bio && (
                <p className="spk__bio">{speaker.bio}</p>
              )}
            </div>
          ))}
        </div>

        <p className="spk__note">
          Speaker details are placeholders and will be updated once confirmed by the organizing committee.
        </p>
      </div>

      <style>{`
        .spk__grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: var(--space-6);
          max-width: 1000px;
          margin: 0 auto;
        }

        .spk__card {
          text-align: center;
          padding: var(--space-8) var(--space-6);
          background: var(--color-white);
          border-radius: var(--radius-lg);
          border: 1px solid var(--color-gray-200);
          box-shadow: var(--shadow-sm);
          transition: all var(--transition-base);
        }

        .spk__card:hover {
          transform: translateY(-6px);
          box-shadow: var(--shadow-xl);
          border-color: rgba(0, 98, 155, 0.15);
        }

        .spk__avatar {
          width: 100px;
          height: 100px;
          margin: 0 auto var(--space-4);
          border-radius: 50%;
          overflow: hidden;
          border: 3px solid var(--color-gray-200);
        }

        .spk__avatar img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .spk__avatar-placeholder {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--color-gray-100);
          color: var(--color-gray-400);
        }

        .spk__name {
          font-size: var(--text-lg);
          font-weight: 700;
          color: var(--color-navy);
          margin-bottom: var(--space-1);
        }

        .spk__designation {
          font-size: var(--text-sm);
          color: var(--color-ieee-blue);
          font-weight: 600;
          margin-bottom: var(--space-1);
        }

        .spk__org {
          font-size: var(--text-sm);
          color: var(--text-secondary);
          margin-bottom: var(--space-3);
        }

        .spk__divider {
          width: 40px;
          height: 2px;
          background: var(--color-gray-200);
          margin: 0 auto var(--space-3);
        }

        .spk__label {
          font-weight: 600;
          color: var(--color-navy);
        }

        .spk__expertise,
        .spk__topic {
          font-size: var(--text-xs);
          color: var(--text-secondary);
          margin-bottom: var(--space-1);
          line-height: 1.5;
        }

        .spk__bio {
          font-size: var(--text-xs);
          color: var(--text-muted);
          margin-top: var(--space-3);
          font-style: italic;
          line-height: 1.6;
        }

        .spk__note {
          text-align: center;
          margin-top: var(--space-8);
          font-size: var(--text-sm);
          color: var(--text-muted);
          font-style: italic;
        }

        @media (max-width: 768px) {
          .spk__grid {
            grid-template-columns: 1fr;
            max-width: 400px;
          }
        }
      `}</style>
    </section>
  );
}
