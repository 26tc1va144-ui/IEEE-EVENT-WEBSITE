import { useState, useEffect } from 'react';
import eventConfig from '../config/eventConfig';

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState(null);
  const [status, setStatus] = useState('upcoming'); // upcoming | live | ended

  useEffect(() => {
    const calculate = () => {
      const eventDate = new Date(`${eventConfig.eventDate}T09:00:00+05:30`);
      const endDate = new Date(`${eventConfig.eventDate}T17:00:00+05:30`);
      const now = new Date();
      const diff = eventDate - now;
      const endDiff = endDate - now;

      if (diff <= 0 && endDiff > 0) {
        setStatus('live');
        setTimeLeft(null);
      } else if (endDiff <= 0) {
        setStatus('ended');
        setTimeLeft(null);
      } else {
        setStatus('upcoming');
        setTimeLeft({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((diff / (1000 * 60)) % 60),
          seconds: Math.floor((diff / 1000) % 60),
        });
      }
    };

    calculate();
    const interval = setInterval(calculate, 1000);
    return () => clearInterval(interval);
  }, []);

  if (status === 'live') {
    return (
      <div className="countdown countdown--live">
        <div className="countdown__live-badge">
          <span className="countdown__live-dot"></span>
          The Workshop is Live — Event in Progress
        </div>
      </div>
    );
  }

  if (status === 'ended') {
    return (
      <div className="countdown">
        <p className="countdown__ended">The Workshop Has Concluded. Thank You!</p>
      </div>
    );
  }

  if (!timeLeft) return null;

  const units = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Seconds', value: timeLeft.seconds },
  ];

  return (
    <div className="countdown">
      <p className="countdown__label">Workshop Starts In</p>
      <div className="countdown__grid">
        {units.map((unit) => (
          <div key={unit.label} className="countdown__unit">
            <span className="countdown__value">
              {String(unit.value).padStart(2, '0')}
            </span>
            <span className="countdown__unit-label">{unit.label}</span>
          </div>
        ))}
      </div>

      <style>{`
        .countdown {
          margin-top: var(--space-2);
        }

        .countdown__label {
          font-size: var(--text-xs);
          text-transform: uppercase;
          letter-spacing: 3px;
          color: rgba(255, 255, 255, 0.5);
          margin-bottom: var(--space-4);
          font-weight: 600;
        }

        .countdown__grid {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: var(--space-3);
        }

        .countdown__unit {
          display: flex;
          flex-direction: column;
          align-items: center;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: var(--radius-md);
          padding: var(--space-3) var(--space-5);
          min-width: 80px;
          backdrop-filter: blur(10px);
        }

        .countdown__value {
          font-size: var(--text-3xl);
          font-weight: 800;
          color: var(--text-inverse);
          font-family: var(--font-mono);
          line-height: 1;
        }

        .countdown__unit-label {
          font-size: var(--text-xs);
          color: rgba(255, 255, 255, 0.5);
          text-transform: uppercase;
          letter-spacing: 1.5px;
          margin-top: var(--space-1);
          font-weight: 500;
        }

        .countdown--live {
          display: flex;
          justify-content: center;
        }

        .countdown__live-badge {
          display: inline-flex;
          align-items: center;
          gap: var(--space-2);
          padding: var(--space-3) var(--space-6);
          background: rgba(34, 197, 94, 0.15);
          border: 1px solid rgba(34, 197, 94, 0.3);
          border-radius: var(--radius-full);
          color: #4ade80;
          font-weight: 600;
          font-size: var(--text-sm);
          animation: pulse-glow 2s ease-in-out infinite;
        }

        .countdown__live-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: #22c55e;
          animation: pulse-glow 1.5s ease-in-out infinite;
        }

        .countdown__ended {
          color: rgba(255, 255, 255, 0.6);
          font-size: var(--text-lg);
          font-weight: 500;
        }

        @media (max-width: 480px) {
          .countdown__unit {
            min-width: 60px;
            padding: var(--space-2) var(--space-3);
          }
          .countdown__value {
            font-size: var(--text-xl);
          }
          .countdown__grid {
            gap: var(--space-2);
          }
        }
      `}</style>
    </div>
  );
}
