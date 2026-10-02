import eventConfig from '../config/eventConfig';

const infoCards = [
  { icon: '📅', label: 'Date', value: eventConfig.displayDate },
  { icon: '🕐', label: 'Time', value: `${eventConfig.eventStartTime} – ${eventConfig.eventEndTime}` },
  { icon: '📍', label: 'Venue', value: eventConfig.venueShort },
  { icon: '💰', label: 'Registration Fee', value: `${eventConfig.currency}${eventConfig.registrationFee}` },
  { icon: '🎓', label: 'Eligibility', value: 'Students & Participants from All Colleges' },
  { icon: '🌐', label: 'Event Type', value: 'International Workshop' },
];

export default function EventInfo() {
  return (
    <section className="section-alt" id="event-info">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Event Details</span>
          <h2 className="section-title">Workshop at a Glance</h2>
          <p className="section-subtitle">
            All the key information you need about the workshop.
          </p>
        </div>
        <div className="event-info__grid">
          {infoCards.map((card, i) => (
            <div key={i} className="event-info__card">
              <div className="event-info__icon">{card.icon}</div>
              <div className="event-info__label">{card.label}</div>
              <div className="event-info__value">{card.value}</div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .event-info__grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: var(--space-5);
        }

        .event-info__card {
          background: var(--color-white);
          border-radius: var(--radius-lg);
          padding: var(--space-6);
          text-align: center;
          border: 1px solid var(--color-gray-200);
          box-shadow: var(--shadow-sm);
          transition: all var(--transition-base);
        }

        .event-info__card:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-lg);
          border-color: rgba(0, 98, 155, 0.2);
        }

        .event-info__icon {
          font-size: 2rem;
          margin-bottom: var(--space-3);
        }

        .event-info__label {
          font-size: var(--text-xs);
          text-transform: uppercase;
          letter-spacing: 2px;
          color: var(--color-ieee-blue);
          font-weight: 700;
          margin-bottom: var(--space-2);
        }

        .event-info__value {
          font-size: var(--text-lg);
          font-weight: 700;
          color: var(--color-navy);
          line-height: 1.4;
        }

        @media (max-width: 1024px) {
          .event-info__grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 600px) {
          .event-info__grid {
            grid-template-columns: 1fr;
            gap: var(--space-3);
          }
          .event-info__card {
            padding: var(--space-4);
          }
        }
      `}</style>
    </section>
  );
}
