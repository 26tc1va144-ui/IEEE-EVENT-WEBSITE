import eventConfig from '../config/eventConfig';

export default function WhoShouldAttend() {
  return (
    <section className="section" id="who-should-attend">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Target Audience</span>
          <h2 className="section-title">Who Should Attend?</h2>
          <p className="section-subtitle">
            This workshop is designed for a diverse audience of learners and professionals.
          </p>
        </div>

        <div className="wsa__grid">
          {eventConfig.audience.map((item, i) => (
            <div key={i} className="wsa__item">
              <div className="wsa__check">✓</div>
              <span className="wsa__text">{item}</span>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .wsa__grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: var(--space-3);
          max-width: 800px;
          margin: 0 auto;
        }

        .wsa__item {
          display: flex;
          align-items: center;
          gap: var(--space-3);
          padding: var(--space-4);
          background: var(--color-gray-50);
          border-radius: var(--radius-md);
          border: 1px solid var(--color-gray-200);
          transition: all var(--transition-base);
        }

        .wsa__item:hover {
          background: var(--color-white);
          box-shadow: var(--shadow-md);
          transform: translateX(4px);
          border-color: rgba(0, 98, 155, 0.2);
        }

        .wsa__check {
          width: 28px;
          height: 28px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(0, 98, 155, 0.1);
          color: var(--color-ieee-blue);
          border-radius: 50%;
          font-weight: 700;
          font-size: var(--text-sm);
          flex-shrink: 0;
        }

        .wsa__text {
          font-size: var(--text-sm);
          font-weight: 600;
          color: var(--color-navy);
        }

        @media (max-width: 600px) {
          .wsa__grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
