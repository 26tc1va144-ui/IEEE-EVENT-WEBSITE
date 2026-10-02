import eventConfig from '../config/eventConfig';

export default function Certificate() {
  return (
    <section className="section-alt" id="certificate">
      <div className="container">
        <div className="cert__layout">
          <div className="cert__icon-area">
            <div className="cert__icon">📜</div>
          </div>
          <div className="cert__content">
            <span className="section-label">Certification</span>
            <h2 className="section-title" style={{ textAlign: 'left' }}>Certificate of Participation</h2>
            <p className="cert__desc">{eventConfig.certificateInfo}</p>
            <div className="cert__highlights">
              <div className="cert__highlight">
                <span>✓</span> Official IEEE-affiliated Certificate
              </div>
              <div className="cert__highlight">
                <span>✓</span> Proof of Workshop Completion
              </div>
              <div className="cert__highlight">
                <span>✓</span> Enhances Academic &amp; Professional Profile
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .cert__layout {
          display: flex;
          align-items: center;
          gap: var(--space-12);
          max-width: 900px;
          margin: 0 auto;
        }

        .cert__icon-area {
          flex-shrink: 0;
        }

        .cert__icon {
          width: 140px;
          height: 140px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 4rem;
          background: linear-gradient(135deg, rgba(0, 98, 155, 0.08) 0%, rgba(0, 108, 183, 0.04) 100%);
          border-radius: var(--radius-xl);
          border: 2px solid var(--color-gray-200);
        }

        .cert__desc {
          font-size: var(--text-base);
          color: var(--text-secondary);
          line-height: 1.8;
          margin-bottom: var(--space-5);
        }

        .cert__highlights {
          display: flex;
          flex-direction: column;
          gap: var(--space-2);
        }

        .cert__highlight {
          display: flex;
          align-items: center;
          gap: var(--space-3);
          font-size: var(--text-sm);
          font-weight: 600;
          color: var(--color-navy);
        }

        .cert__highlight span {
          color: var(--color-success);
          font-weight: 700;
        }

        @media (max-width: 768px) {
          .cert__layout {
            flex-direction: column;
            text-align: center;
          }
          .cert__content .section-title {
            text-align: center !important;
          }
          .cert__content .section-label {
            display: block;
            text-align: center;
          }
          .cert__highlights {
            align-items: center;
          }
          .cert__icon {
            width: 100px;
            height: 100px;
            font-size: 3rem;
          }
        }
      `}</style>
    </section>
  );
}
