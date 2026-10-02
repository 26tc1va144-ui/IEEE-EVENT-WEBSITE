import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import eventConfig from '../config/eventConfig';

export default function RegistrationSuccess() {
  const { registrationId } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRegistration = async () => {
      try {
        const res = await fetch(`${eventConfig.apiBaseUrl}/registration/${registrationId}`);
        const json = await res.json();
        if (json.success) {
          setData(json.data);
        } else {
          setError(json.message || 'Registration not found.');
        }
      } catch {
        setError('Failed to fetch registration details.');
      } finally {
        setLoading(false);
      }
    };
    fetchRegistration();
  }, [registrationId]);

  const downloadReceipt = () => {
    if (!data) return;
    const receiptContent = `
IEEE RAS & IAS International Workshop
======================================
REGISTRATION RECEIPT

Registration ID: ${data.registrationId}
Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone}
College: ${data.college}
Department: ${data.department}
Year: ${data.year}
City: ${data.city}

Payment Status: ${data.paymentStatus === 'completed' ? 'PAID' : data.paymentStatus}
Amount: ₹${data.amountPaid || 299}

Event: ${eventConfig.title}
Date: ${eventConfig.displayDate}
Time: ${eventConfig.eventStartTime} – ${eventConfig.eventEndTime}
Venue: ${eventConfig.venue}

--------------------------------------
Please bring this receipt and a valid ID to the venue.
© ${new Date().getFullYear()} IEEE RAS & IAS
    `.trim();

    const blob = new Blob([receiptContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `IEEE-Workshop-Receipt-${data.registrationId}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const addToCalendar = () => {
    const title = encodeURIComponent(eventConfig.title);
    const details = encodeURIComponent(`IEEE RAS & IAS International Workshop at ${eventConfig.venue}`);
    const location = encodeURIComponent(eventConfig.venueAddress);
    const dateStr = eventConfig.eventDate.replace(/-/g, '');
    const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}&dates=${dateStr}T033000Z/${dateStr}T113000Z`;
    window.open(url, '_blank');
  };

  if (loading) {
    return (
      <div className="rs__page">
        <div className="rs__loading">
          <div className="rs__spinner"></div>
          <p>Loading registration details...</p>
        </div>
        <style>{pageStyles}</style>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rs__page">
        <div className="rs__error-card">
          <div style={{ fontSize: '3rem', marginBottom: 'var(--space-4)' }}>⚠️</div>
          <h2>Registration Not Found</h2>
          <p>{error}</p>
          <Link to="/" className="btn btn-primary" style={{ marginTop: 'var(--space-6)' }}>Back to Home</Link>
        </div>
        <style>{pageStyles}</style>
      </div>
    );
  }

  return (
    <div className="rs__page">
      <div className="rs__container">
        {/* Success header */}
        <div className="rs__header">
          <div className="rs__check-icon">✓</div>
          <h1 className="rs__title">🎉 Registration Successful!</h1>
          <p className="rs__subtitle">Welcome to the {eventConfig.title}</p>
        </div>

        {/* Registration details card */}
        <div className="rs__card">
          <div className="rs__card-header">
            <h2>Registration Details</h2>
            <span className={`badge ${data.paymentStatus === 'completed' ? 'badge-success' : 'badge-warning'}`}>
              {data.paymentStatus === 'completed' ? '✅ Paid' : data.paymentStatus}
            </span>
          </div>

          <div className="rs__details">
            <DetailRow label="Registration ID" value={data.registrationId} highlight />
            <DetailRow label="Name" value={data.name} />
            <DetailRow label="Email" value={data.email} />
            <DetailRow label="College" value={data.college} />
            <DetailRow label="Department" value={data.department} />
            <DetailRow label="Payment Status" value={data.paymentStatus === 'completed' ? 'Paid — ₹299' : data.paymentStatus} />
          </div>

          {/* QR Code */}
          {data.qrCode && (
            <div className="rs__qr">
              <p className="rs__qr-label">Your Digital Pass</p>
              <img src={data.qrCode} alt="Registration QR Code" className="rs__qr-img" />
              <p className="rs__qr-hint">Show this QR code at the venue for check-in</p>
            </div>
          )}

          {/* Event info */}
          <div className="rs__event-info">
            <h3>Workshop Details</h3>
            <div className="rs__event-grid">
              <div className="rs__event-item">
                <span className="rs__event-icon">📅</span>
                <div>
                  <span className="rs__event-label">Date</span>
                  <span className="rs__event-value">{eventConfig.displayDate}</span>
                </div>
              </div>
              <div className="rs__event-item">
                <span className="rs__event-icon">🕐</span>
                <div>
                  <span className="rs__event-label">Time</span>
                  <span className="rs__event-value">{eventConfig.eventStartTime} – {eventConfig.eventEndTime}</span>
                </div>
              </div>
              <div className="rs__event-item">
                <span className="rs__event-icon">📍</span>
                <div>
                  <span className="rs__event-label">Venue</span>
                  <span className="rs__event-value">{eventConfig.venueShort}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="rs__actions">
          <button className="btn btn-primary btn-large" onClick={downloadReceipt}>
            📄 Download Receipt
          </button>
          <button className="btn btn-secondary btn-large" onClick={addToCalendar}>
            📅 Add to Calendar
          </button>
          <Link to="/" className="btn btn-secondary btn-large">
            🏠 Back to Home
          </Link>
        </div>
      </div>
      <style>{pageStyles}</style>
    </div>
  );
}

function DetailRow({ label, value, highlight }) {
  return (
    <div className="rs__detail-row">
      <span className="rs__detail-label">{label}</span>
      <span className={`rs__detail-value ${highlight ? 'rs__detail-value--highlight' : ''}`}>{value}</span>
    </div>
  );
}

const pageStyles = `
  .rs__page {
    min-height: 100vh;
    background: linear-gradient(160deg, #050d1a 0%, #0a1628 30%, #0d1f3c 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: var(--space-8) var(--space-4);
  }

  .rs__loading {
    text-align: center;
    color: rgba(255, 255, 255, 0.7);
  }

  .rs__spinner {
    width: 48px;
    height: 48px;
    border: 4px solid rgba(255,255,255,0.1);
    border-top-color: var(--color-ieee-blue);
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
    margin: 0 auto var(--space-4);
  }

  @keyframes spin { to { transform: rotate(360deg); } }

  .rs__error-card {
    text-align: center;
    background: var(--color-white);
    padding: var(--space-10);
    border-radius: var(--radius-xl);
    max-width: 500px;
  }

  .rs__error-card h2 { color: var(--color-navy); margin-bottom: var(--space-2); }
  .rs__error-card p { color: var(--text-secondary); }

  .rs__container {
    max-width: 600px;
    width: 100%;
  }

  .rs__header {
    text-align: center;
    margin-bottom: var(--space-8);
    color: var(--text-inverse);
  }

  .rs__check-icon {
    width: 64px;
    height: 64px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background: rgba(34, 197, 94, 0.2);
    border: 2px solid rgba(34, 197, 94, 0.4);
    border-radius: 50%;
    font-size: 1.8rem;
    color: #4ade80;
    margin-bottom: var(--space-4);
  }

  .rs__title {
    font-size: var(--text-3xl);
    font-weight: 800;
    margin-bottom: var(--space-2);
  }

  .rs__subtitle {
    color: rgba(255, 255, 255, 0.6);
    font-size: var(--text-lg);
  }

  .rs__card {
    background: var(--color-white);
    border-radius: var(--radius-xl);
    padding: var(--space-8);
    box-shadow: var(--shadow-xl);
    margin-bottom: var(--space-6);
  }

  .rs__card-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: var(--space-6);
    padding-bottom: var(--space-4);
    border-bottom: 1px solid var(--color-gray-200);
  }

  .rs__card-header h2 {
    font-size: var(--text-lg);
    font-weight: 700;
    color: var(--color-navy);
  }

  .rs__details {
    margin-bottom: var(--space-6);
  }

  .rs__detail-row {
    display: flex;
    justify-content: space-between;
    padding: var(--space-3) 0;
    border-bottom: 1px solid var(--color-gray-100);
  }

  .rs__detail-label {
    font-size: var(--text-sm);
    color: var(--text-secondary);
  }

  .rs__detail-value {
    font-size: var(--text-sm);
    font-weight: 600;
    color: var(--color-navy);
    text-align: right;
  }

  .rs__detail-value--highlight {
    color: var(--color-ieee-blue);
    font-family: var(--font-mono);
    font-weight: 700;
  }

  .rs__qr {
    text-align: center;
    padding: var(--space-6);
    background: var(--color-gray-50);
    border-radius: var(--radius-lg);
    margin-bottom: var(--space-6);
  }

  .rs__qr-label {
    font-size: var(--text-sm);
    font-weight: 600;
    color: var(--color-navy);
    margin-bottom: var(--space-3);
  }

  .rs__qr-img {
    width: 200px;
    height: 200px;
    margin: 0 auto var(--space-3);
    border-radius: var(--radius-md);
  }

  .rs__qr-hint {
    font-size: var(--text-xs);
    color: var(--text-muted);
  }

  .rs__event-info {
    padding: var(--space-5);
    background: var(--color-gray-50);
    border-radius: var(--radius-lg);
  }

  .rs__event-info h3 {
    font-size: var(--text-sm);
    font-weight: 700;
    color: var(--color-navy);
    margin-bottom: var(--space-4);
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  .rs__event-grid {
    display: flex;
    flex-direction: column;
    gap: var(--space-3);
  }

  .rs__event-item {
    display: flex;
    align-items: center;
    gap: var(--space-3);
  }

  .rs__event-icon {
    font-size: 1.1rem;
  }

  .rs__event-label {
    display: block;
    font-size: var(--text-xs);
    color: var(--text-muted);
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .rs__event-value {
    font-size: var(--text-sm);
    font-weight: 600;
    color: var(--color-navy);
  }

  .rs__actions {
    display: flex;
    gap: var(--space-3);
    flex-wrap: wrap;
    justify-content: center;
  }

  .rs__actions .btn {
    flex: 1;
    min-width: 160px;
  }

  @media (max-width: 600px) {
    .rs__card {
      padding: var(--space-5);
    }
    .rs__title {
      font-size: var(--text-2xl);
    }
    .rs__actions {
      flex-direction: column;
    }
    .rs__actions .btn {
      width: 100%;
    }
  }
`;
