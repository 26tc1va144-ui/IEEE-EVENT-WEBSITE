import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (data.success) {
        localStorage.setItem('adminToken', data.data.token);
        localStorage.setItem('adminInfo', JSON.stringify(data.data.admin));
        navigate('/admin/dashboard');
      } else {
        setError(data.message || 'Login failed.');
      }
    } catch {
      setError('Server error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="al__page">
      <div className="al__card">
        <div className="al__header">
          <div className="al__logo">
            <span className="al__logo-icon">IW</span>
          </div>
          <h1 className="al__title">Admin Dashboard</h1>
          <p className="al__subtitle">IEEE Workshop Management</p>
        </div>

        <form onSubmit={handleSubmit} className="al__form">
          {error && <div className="al__error">{error}</div>}

          <div className="form-group">
            <label className="form-label" htmlFor="admin-email">Email Address</label>
            <input
              id="admin-email"
              className="form-input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@ieeworkshop.com"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="admin-password">Password</label>
            <input
              id="admin-password"
              className="form-input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>

          <button type="submit" className="btn btn-primary btn-large" style={{ width: '100%' }} disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <a href="/" className="al__back">← Back to Website</a>
      </div>

      <style>{`
        .al__page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(160deg, #050d1a 0%, #0a1628 50%, #0d1f3c 100%);
          padding: var(--space-4);
        }

        .al__card {
          width: 100%;
          max-width: 420px;
          background: var(--color-white);
          border-radius: var(--radius-xl);
          padding: var(--space-10);
          box-shadow: var(--shadow-xl);
        }

        .al__header {
          text-align: center;
          margin-bottom: var(--space-8);
        }

        .al__logo {
          display: flex;
          justify-content: center;
          margin-bottom: var(--space-4);
        }

        .al__logo-icon {
          width: 52px;
          height: 52px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, var(--color-ieee-blue) 0%, var(--color-ieee-blue-l) 100%);
          border-radius: var(--radius-md);
          font-size: var(--text-lg);
          font-weight: 800;
          color: white;
        }

        .al__title {
          font-size: var(--text-2xl);
          font-weight: 800;
          color: var(--color-navy);
          margin-bottom: var(--space-1);
        }

        .al__subtitle {
          font-size: var(--text-sm);
          color: var(--text-muted);
        }

        .al__form {
          margin-bottom: var(--space-6);
        }

        .al__error {
          padding: var(--space-3) var(--space-4);
          background: rgba(239, 68, 68, 0.08);
          border: 1px solid rgba(239, 68, 68, 0.2);
          border-radius: var(--radius-md);
          color: var(--color-error);
          font-size: var(--text-sm);
          margin-bottom: var(--space-4);
          text-align: center;
        }

        .al__back {
          display: block;
          text-align: center;
          font-size: var(--text-sm);
          color: var(--text-muted);
        }

        .al__back:hover {
          color: var(--color-ieee-blue);
        }
      `}</style>
    </div>
  );
}
