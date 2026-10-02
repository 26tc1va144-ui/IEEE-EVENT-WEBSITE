export default function About() {
  const points = [
    { icon: '🎓', text: 'Learn from experts and professionals in robotics, automation, and emerging technologies' },
    { icon: '🔬', text: 'Explore cutting-edge technologies and their real-world applications' },
    { icon: '🌍', text: 'Interact with students, researchers, and faculty from colleges across India and abroad' },
    { icon: '🤝', text: 'Network with industry professionals, researchers, and academicians' },
    { icon: '🛠️', text: 'Gain practical, hands-on technical knowledge' },
    { icon: '💬', text: 'Participate in interactive discussions, Q&A sessions, and collaborative learning' },
  ];

  return (
    <section className="section" id="about">
      <div className="container">
        <div className="about__layout">
          <div className="about__content">
            <span className="section-label">About the Workshop</span>
            <h2 className="section-title" style={{ textAlign: 'left' }}>
              Advancing Knowledge in<br />Robotics &amp; Automation
            </h2>
            <p className="about__desc">
              The International Workshop organized by IEEE Robotics and Automation Society (RAS)
              and IEEE Industry Applications Society (IAS) at MITS DU brings together students,
              researchers, faculty members, and industry professionals for a day of learning,
              innovation, and collaboration.
            </p>
            <p className="about__desc">
              These student branch chapters are dedicated to bridging the gap between theoretical
              academic knowledge and real-world industrial practice. This workshop provides participants
              with a unique opportunity to explore emerging technologies like AI, IoT, and autonomous systems,
              while building meaningful connections with experts across disciplines.
            </p>
          </div>

          <div className="about__points">
            {points.map((point, i) => (
              <div key={i} className="about__point">
                <span className="about__point-icon">{point.icon}</span>
                <span className="about__point-text">{point.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .about__layout {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: var(--space-12);
          align-items: start;
        }

        .about__desc {
          font-size: var(--text-base);
          color: var(--text-secondary);
          line-height: 1.8;
          margin-bottom: var(--space-4);
        }

        .about__points {
          display: flex;
          flex-direction: column;
          gap: var(--space-4);
        }

        .about__point {
          display: flex;
          align-items: flex-start;
          gap: var(--space-4);
          padding: var(--space-4);
          background: var(--color-gray-50);
          border-radius: var(--radius-md);
          border: 1px solid var(--color-gray-200);
          transition: all var(--transition-base);
        }

        .about__point:hover {
          background: var(--color-white);
          box-shadow: var(--shadow-md);
          transform: translateX(4px);
          border-color: rgba(0, 98, 155, 0.15);
        }

        .about__point-icon {
          font-size: 1.3rem;
          flex-shrink: 0;
          margin-top: 2px;
        }

        .about__point-text {
          font-size: var(--text-sm);
          color: var(--text-primary);
          line-height: 1.6;
          font-weight: 500;
        }

        @media (max-width: 768px) {
          .about__layout {
            grid-template-columns: 1fr;
            gap: var(--space-8);
          }
          .about__content .section-title {
            text-align: center !important;
          }
          .about__content .section-label {
            display: block;
            text-align: center;
          }
          .about__desc {
            text-align: center;
          }
        }
      `}</style>
    </section>
  );
}
