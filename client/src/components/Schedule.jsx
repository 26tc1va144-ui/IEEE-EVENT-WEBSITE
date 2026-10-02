import eventConfig from '../config/eventConfig';

const typeIcons = {
  registration: '📋', ceremony: '🎊', session: '📖', talk: '🎤',
  break: '☕', workshop: '🛠️', interactive: '💬', closing: '🏆',
};

const typeColors = {
  registration: '#3b82f6', ceremony: '#8b5cf6', session: '#00629B', talk: '#0077C8',
  break: '#f59e0b', workshop: '#22c55e', interactive: '#ec4899', closing: '#f59e0b',
};

export default function Schedule() {
  return (
    <section className="section" id="schedule">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Event Schedule</span>
          <h2 className="section-title">Workshop Agenda</h2>
          <p className="section-subtitle">
            A tentative schedule for the day. Confirmed timings will be updated by the organizers.
          </p>
        </div>

        <div className="sched__timeline">
          {eventConfig.schedule.map((item, i) => (
            <div key={i} className="sched__item">
              <div className="sched__time-col">
                <span className="sched__time">{item.time}</span>
              </div>

              <div className="sched__dot-col">
                <div className="sched__dot" style={{ background: typeColors[item.type] || '#00629B' }}></div>
                {i < eventConfig.schedule.length - 1 && <div className="sched__line"></div>}
              </div>

              <div className="sched__content">
                <div className="sched__card">
                  <span className="sched__icon">{typeIcons[item.type] || '📌'}</span>
                  <div>
                    <h3 className="sched__title">{item.title}</h3>
                    <p className="sched__desc">{item.description}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="sched__note">
          ⚠️ This is a tentative schedule. Confirmed timings and sessions will be updated prior to the event.
        </p>
      </div>

      <style>{`
        .sched__timeline {
          max-width: 700px;
          margin: 0 auto;
        }

        .sched__item {
          display: flex;
          align-items: flex-start;
          gap: 0;
          position: relative;
        }

        .sched__time-col {
          width: 100px;
          flex-shrink: 0;
          text-align: right;
          padding-right: var(--space-4);
          padding-top: var(--space-4);
        }

        .sched__time {
          font-size: var(--text-sm);
          font-weight: 700;
          color: var(--color-ieee-blue);
          font-family: var(--font-mono);
        }

        .sched__dot-col {
          display: flex;
          flex-direction: column;
          align-items: center;
          flex-shrink: 0;
          padding-top: var(--space-4);
        }

        .sched__dot {
          width: 14px;
          height: 14px;
          border-radius: 50%;
          flex-shrink: 0;
          box-shadow: 0 0 0 4px rgba(0, 98, 155, 0.1);
        }

        .sched__line {
          width: 2px;
          flex: 1;
          min-height: 30px;
          background: var(--color-gray-200);
        }

        .sched__content {
          flex: 1;
          padding-left: var(--space-4);
          padding-bottom: var(--space-4);
        }

        .sched__card {
          display: flex;
          align-items: flex-start;
          gap: var(--space-3);
          padding: var(--space-4);
          background: var(--color-gray-50);
          border-radius: var(--radius-md);
          border: 1px solid var(--color-gray-200);
          transition: all var(--transition-base);
        }

        .sched__card:hover {
          background: var(--color-white);
          box-shadow: var(--shadow-md);
          border-color: rgba(0, 98, 155, 0.15);
        }

        .sched__icon {
          font-size: 1.3rem;
          flex-shrink: 0;
          margin-top: 2px;
        }

        .sched__title {
          font-size: var(--text-base);
          font-weight: 700;
          color: var(--color-navy);
          margin-bottom: var(--space-1);
        }

        .sched__desc {
          font-size: var(--text-sm);
          color: var(--text-secondary);
          line-height: 1.5;
        }

        .sched__note {
          text-align: center;
          margin-top: var(--space-8);
          font-size: var(--text-sm);
          color: var(--color-warning);
          font-weight: 500;
          padding: var(--space-3) var(--space-4);
          background: rgba(245, 158, 11, 0.08);
          border-radius: var(--radius-md);
          max-width: 700px;
          margin-left: auto;
          margin-right: auto;
        }

        @media (max-width: 600px) {
          .sched__time-col {
            width: 70px;
            padding-right: var(--space-2);
          }
          .sched__time {
            font-size: var(--text-xs);
          }
          .sched__content {
            padding-left: var(--space-2);
          }
          .sched__card {
            padding: var(--space-3);
          }
          .sched__title {
            font-size: var(--text-sm);
          }
        }
      `}</style>
    </section>
  );
}
