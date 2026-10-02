import { useState } from 'react';
import eventConfig from '../config/eventConfig';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

  return (
    <section className="section" id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label">FAQ</span>
          <h2 className="section-title">Frequently Asked Questions</h2>
          <p className="section-subtitle">
            Find answers to common questions about the workshop.
          </p>
        </div>

        <div className="faq__list">
          {eventConfig.faqs.map((faq, i) => (
            <div
              key={i}
              className={`faq__item ${openIndex === i ? 'faq__item--open' : ''}`}
            >
              <button
                className="faq__question"
                onClick={() => toggle(i)}
                aria-expanded={openIndex === i}
              >
                <span className="faq__q-text">{faq.question}</span>
                <span className="faq__chevron">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="6 9 12 15 18 9"/>
                  </svg>
                </span>
              </button>
              <div className="faq__answer-wrapper">
                <div className="faq__answer">
                  <p>{faq.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .faq__list {
          max-width: 750px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: var(--space-3);
        }

        .faq__item {
          background: var(--color-gray-50);
          border-radius: var(--radius-md);
          border: 1px solid var(--color-gray-200);
          overflow: hidden;
          transition: all var(--transition-base);
        }

        .faq__item:hover {
          border-color: rgba(0, 98, 155, 0.2);
        }

        .faq__item--open {
          background: var(--color-white);
          box-shadow: var(--shadow-md);
          border-color: rgba(0, 98, 155, 0.2);
        }

        .faq__question {
          width: 100%;
          padding: var(--space-5) var(--space-6);
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: var(--space-4);
          background: none;
          border: none;
          cursor: pointer;
          text-align: left;
          font-family: inherit;
        }

        .faq__q-text {
          font-size: var(--text-base);
          font-weight: 600;
          color: var(--color-navy);
          line-height: 1.4;
        }

        .faq__chevron {
          flex-shrink: 0;
          color: var(--color-ieee-blue);
          transition: transform var(--transition-base);
        }

        .faq__item--open .faq__chevron {
          transform: rotate(180deg);
        }

        .faq__answer-wrapper {
          max-height: 0;
          overflow: hidden;
          transition: max-height var(--transition-slow);
        }

        .faq__item--open .faq__answer-wrapper {
          max-height: 300px;
        }

        .faq__answer {
          padding: 0 var(--space-6) var(--space-5);
        }

        .faq__answer p {
          font-size: var(--text-sm);
          color: var(--text-secondary);
          line-height: 1.7;
        }

        @media (max-width: 600px) {
          .faq__question {
            padding: var(--space-4);
          }
          .faq__answer {
            padding: 0 var(--space-4) var(--space-4);
          }
          .faq__q-text {
            font-size: var(--text-sm);
          }
        }
      `}</style>
    </section>
  );
}
