import eventConfig from '../config/eventConfig';

export default function Venue() {
  return (
    <section className="section-alt" id="venue">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Venue &amp; Location</span>
          <h2 className="section-title">Where to Find Us</h2>
        </div>

        <div className="venue__layout">
          <div className="venue__info">
            <div className="venue__card">
              <div className="venue__pin">📍</div>
              <h3 className="venue__name">{eventConfig.venue}</h3>
              <p className="venue__address">{eventConfig.venueAddress}</p>

              <div className="venue__details">
                <div className="venue__detail">
                  <span className="venue__detail-icon">📅</span>
                  <div>
                    <span className="venue__detail-label">Date</span>
                    <span className="venue__detail-value">{eventConfig.displayDate}</span>
                  </div>
                </div>
                <div className="venue__detail">
                  <span className="venue__detail-icon">🕐</span>
                  <div>
                    <span className="venue__detail-label">Time</span>
                    <span className="venue__detail-value">{eventConfig.eventStartTime} – {eventConfig.eventEndTime}</span>
                  </div>
                </div>
              </div>

              <a
                href={eventConfig.mapDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary btn-large"
                style={{ marginTop: 'var(--space-6)', width: '100%' }}
              >
                Get Directions →
              </a>
            </div>
          </div>

          <div className="venue__map">
            <iframe
              src={eventConfig.mapEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0, borderRadius: 'var(--radius-lg)' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="MITS DU Location"
            ></iframe>
          </div>
        </div>
      </div>

      <style>{`
        .venue__layout {
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          gap: var(--space-8);
          align-items: stretch;
          max-width: 1000px;
          margin: 0 auto;
        }

        .venue__card {
          background: var(--color-white);
          padding: var(--space-8);
          border-radius: var(--radius-lg);
          border: 1px solid var(--color-gray-200);
          box-shadow: var(--shadow-md);
          height: 100%;
          display: flex;
          flex-direction: column;
        }

        .venue__pin {
          font-size: 2.5rem;
          margin-bottom: var(--space-3);
        }

        .venue__name {
          font-size: var(--text-xl);
          font-weight: 800;
          color: var(--color-navy);
          margin-bottom: var(--space-2);
          line-height: 1.3;
        }

        .venue__address {
          font-size: var(--text-sm);
          color: var(--text-secondary);
          line-height: 1.6;
          margin-bottom: var(--space-5);
        }

        .venue__details {
          display: flex;
          flex-direction: column;
          gap: var(--space-3);
        }

        .venue__detail {
          display: flex;
          align-items: center;
          gap: var(--space-3);
          padding: var(--space-3);
          background: var(--color-gray-50);
          border-radius: var(--radius-sm);
        }

        .venue__detail-icon {
          font-size: 1.2rem;
        }

        .venue__detail-label {
          display: block;
          font-size: var(--text-xs);
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .venue__detail-value {
          font-size: var(--text-sm);
          font-weight: 600;
          color: var(--color-navy);
        }

        .venue__map {
          min-height: 400px;
          border-radius: var(--radius-lg);
          overflow: hidden;
          border: 1px solid var(--color-gray-200);
          box-shadow: var(--shadow-md);
        }

        @media (max-width: 768px) {
          .venue__layout {
            grid-template-columns: 1fr;
          }
          .venue__map {
            min-height: 280px;
          }
        }
      `}</style>
    </section>
  );
}
