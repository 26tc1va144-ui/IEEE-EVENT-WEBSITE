import eventConfig from '../config/eventConfig';

export default function Highlights() {
  return (
    <section className="section-dark" id="highlights">
      <div className="container">
        <div className="section-header">
          <span className="section-label" style={{ background: 'rgba(59,158,222,0.15)', color: '#3b9ede' }}>
            Workshop Highlights
          </span>
          <h2 className="section-title">What Awaits You</h2>
          <p className="section-subtitle">
            A curated experience designed to inspire, educate, and connect.
          </p>
        </div>

        <div className="hl__grid">
          {eventConfig.highlights.map((item, i) => (
            <div key={i} className="hl__card glass-card">
              <div className="hl__icon">{item.icon}</div>
              <h3 className="hl__title">{item.title}</h3>
              <p className="hl__desc">{item.description}</p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .hl__grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: var(--space-5);
        }

        .hl__card {
          text-align: center;
          padding: var(--space-6) var(--space-5);
        }

        .hl__icon {
          font-size: 2.2rem;
          margin-bottom: var(--space-4);
          display: inline-block;
          animation: float 4s ease-in-out infinite;
        }

        .hl__card:nth-child(2) .hl__icon { animation-delay: 0.5s; }
        .hl__card:nth-child(3) .hl__icon { animation-delay: 1s; }
        .hl__card:nth-child(4) .hl__icon { animation-delay: 1.5s; }
        .hl__card:nth-child(5) .hl__icon { animation-delay: 0.3s; }
        .hl__card:nth-child(6) .hl__icon { animation-delay: 0.8s; }
        .hl__card:nth-child(7) .hl__icon { animation-delay: 1.3s; }
        .hl__card:nth-child(8) .hl__icon { animation-delay: 1.8s; }

        .hl__title {
          font-size: var(--text-base);
          font-weight: 700;
          color: var(--text-inverse);
          margin-bottom: var(--space-2);
        }

        .hl__desc {
          font-size: var(--text-sm);
          color: var(--color-gray-400);
          line-height: 1.6;
        }

        @media (max-width: 1024px) {
          .hl__grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 600px) {
          .hl__grid {
            grid-template-columns: 1fr;
            gap: var(--space-3);
          }
          .hl__card {
            padding: var(--space-4);
          }
        }
      `}</style>
    </section>
  );
}
