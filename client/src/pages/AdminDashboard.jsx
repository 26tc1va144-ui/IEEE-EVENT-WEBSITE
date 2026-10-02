import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [participants, setParticipants] = useState([]);
  const [pagination, setPagination] = useState({});
  const [search, setSearch] = useState('');
  const [filterCollege, setFilterCollege] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('');
  const [filterPayment, setFilterPayment] = useState('');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const navigate = useNavigate();

  const token = localStorage.getItem('adminToken');

  const authFetch = useCallback(async (url, options = {}) => {
    const res = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
        ...options.headers,
      },
    });
    if (res.status === 401) {
      localStorage.removeItem('adminToken');
      localStorage.removeItem('adminInfo');
      navigate('/admin/login');
      return null;
    }
    return res.json();
  }, [token, navigate]);

  const fetchStats = useCallback(async () => {
    const data = await authFetch('/api/admin/dashboard');
    if (data?.success) setStats(data.data);
  }, [authFetch]);

  const fetchParticipants = useCallback(async () => {
    const params = new URLSearchParams({ page, limit: 25 });
    if (search) params.set('search', search);
    if (filterCollege) params.set('college', filterCollege);
    if (filterDepartment) params.set('department', filterDepartment);
    if (filterPayment) params.set('paymentStatus', filterPayment);

    const data = await authFetch(`/api/admin/participants?${params}`);
    if (data?.success) {
      setParticipants(data.data.participants);
      setPagination(data.data.pagination);
    }
  }, [authFetch, page, search, filterCollege, filterDepartment, filterPayment]);

  useEffect(() => {
    if (!token) {
      navigate('/admin/login');
      return;
    }
    setLoading(true);
    Promise.all([fetchStats(), fetchParticipants()]).finally(() => setLoading(false));
  }, [token, navigate, fetchStats, fetchParticipants]);

  const exportCSV = async () => {
    const params = new URLSearchParams();
    if (filterPayment) params.set('paymentStatus', filterPayment);
    const res = await fetch(`/api/admin/participants/export?${params}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'ieee-workshop-participants.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  const logout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminInfo');
    navigate('/admin/login');
  };

  if (loading) {
    return (
      <div className="ad__page">
        <div style={{ textAlign: 'center', color: 'rgba(255,255,255,0.7)', padding: '100px 20px' }}>
          <div className="ad__spinner"></div>
          <p style={{ marginTop: '16px' }}>Loading dashboard...</p>
        </div>
        <style>{dashStyles}</style>
      </div>
    );
  }

  return (
    <div className="ad__page">
      {/* Sidebar */}
      <aside className="ad__sidebar">
        <div className="ad__sidebar-header">
          <span className="ad__sidebar-logo">IW</span>
          <span className="ad__sidebar-title">Admin Panel</span>
        </div>
        <nav className="ad__nav">
          {['overview', 'participants'].map((tab) => (
            <button
              key={tab}
              className={`ad__nav-btn ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab === 'overview' ? '📊' : '👥'} {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </nav>
        <div className="ad__sidebar-footer">
          <a href="/" className="ad__nav-btn">🌐 View Website</a>
          <button className="ad__nav-btn ad__nav-btn--danger" onClick={logout}>🚪 Logout</button>
        </div>
      </aside>

      {/* Main content */}
      <main className="ad__main">
        <div className="ad__topbar">
          <h1 className="ad__page-title">
            {activeTab === 'overview' ? 'Dashboard Overview' : 'Participant Management'}
          </h1>
        </div>

        {activeTab === 'overview' && stats && (
          <div className="ad__content">
            {/* Stats cards */}
            <div className="ad__stats">
              <StatCard label="Total Registrations" value={stats.totalRegistrations} icon="📋" color="#3b82f6" />
              <StatCard label="Successful Payments" value={stats.completedPayments} icon="✅" color="#22c55e" />
              <StatCard label="Pending Payments" value={stats.pendingPayments} icon="⏳" color="#f59e0b" />
              <StatCard label="Total Revenue" value={`₹${stats.totalRevenue.toLocaleString()}`} icon="💰" color="#8b5cf6" />
            </div>

            {/* By College */}
            <div className="ad__panel">
              <h3 className="ad__panel-title">Registrations by College</h3>
              {stats.byCollege.length === 0 ? (
                <p className="ad__empty">No registrations yet.</p>
              ) : (
                <div className="ad__table-wrap">
                  <table className="ad__table">
                    <thead>
                      <tr><th>College</th><th>Count</th></tr>
                    </thead>
                    <tbody>
                      {stats.byCollege.map((item, i) => (
                        <tr key={i}><td>{item._id}</td><td>{item.count}</td></tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Recent registrations */}
            <div className="ad__panel">
              <h3 className="ad__panel-title">Recent Registrations</h3>
              {stats.recentRegistrations.length === 0 ? (
                <p className="ad__empty">No registrations yet.</p>
              ) : (
                <div className="ad__table-wrap">
                  <table className="ad__table">
                    <thead>
                      <tr><th>ID</th><th>Name</th><th>Email</th><th>College</th><th>Date</th></tr>
                    </thead>
                    <tbody>
                      {stats.recentRegistrations.map((p) => (
                        <tr key={p._id}>
                          <td><code>{p.registrationId}</code></td>
                          <td>{p.name}</td>
                          <td>{p.email}</td>
                          <td>{p.college}</td>
                          <td>{new Date(p.registrationDate).toLocaleDateString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'participants' && (
          <div className="ad__content">
            {/* Filters */}
            <div className="ad__filters">
              <input
                className="form-input"
                placeholder="Search by name, email, ID, phone..."
                value={search}
                onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              />
              <input
                className="form-input"
                placeholder="Filter by college"
                value={filterCollege}
                onChange={(e) => { setFilterCollege(e.target.value); setPage(1); }}
              />
              <input
                className="form-input"
                placeholder="Filter by department"
                value={filterDepartment}
                onChange={(e) => { setFilterDepartment(e.target.value); setPage(1); }}
              />
              <select
                className="form-select"
                value={filterPayment}
                onChange={(e) => { setFilterPayment(e.target.value); setPage(1); }}
              >
                <option value="">All Payment Status</option>
                <option value="completed">Completed</option>
                <option value="pending">Pending</option>
                <option value="failed">Failed</option>
              </select>
              <button className="btn btn-primary" onClick={fetchParticipants}>🔍 Search</button>
              <button className="btn btn-secondary" onClick={exportCSV}>📥 Export CSV</button>
            </div>

            {/* Participants table */}
            <div className="ad__panel">
              <div className="ad__panel-header">
                <h3 className="ad__panel-title">
                  Participants ({pagination.total || 0})
                </h3>
              </div>

              <div className="ad__table-wrap">
                <table className="ad__table">
                  <thead>
                    <tr>
                      <th>Reg ID</th><th>Name</th><th>Email</th><th>Phone</th>
                      <th>College</th><th>Dept</th><th>Year</th><th>Enrollment No</th><th>City</th>
                      <th>Type</th><th>IEEE</th><th>Payment</th><th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {participants.length === 0 ? (
                      <tr><td colSpan="13" className="ad__empty">No participants found.</td></tr>
                    ) : (
                      participants.map((p) => (
                        <tr key={p._id}>
                          <td><code>{p.registrationId}</code></td>
                          <td>{p.name}</td>
                          <td>{p.email}</td>
                          <td>{p.phone}</td>
                          <td>{p.college}</td>
                          <td>{p.department}</td>
                          <td>{p.year}</td>
                          <td>{p.enrollmentNo}</td>
                          <td>{p.city}</td>
                          <td>{p.participantType}</td>
                          <td>{p.ieeeMember}</td>
                          <td>
                            <span className={`badge ${p.paymentStatus === 'completed' ? 'badge-success' : p.paymentStatus === 'pending' ? 'badge-warning' : 'badge-error'}`}>
                              {p.paymentStatus}
                            </span>
                          </td>
                          <td>{new Date(p.registrationDate).toLocaleDateString()}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {pagination.pages > 1 && (
                <div className="ad__pagination">
                  <button
                    className="btn btn-secondary"
                    disabled={page <= 1}
                    onClick={() => setPage(p => p - 1)}
                  >
                    ← Previous
                  </button>
                  <span className="ad__page-info">
                    Page {pagination.page} of {pagination.pages}
                  </span>
                  <button
                    className="btn btn-secondary"
                    disabled={page >= pagination.pages}
                    onClick={() => setPage(p => p + 1)}
                  >
                    Next →
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </main>
      <style>{dashStyles}</style>
    </div>
  );
}

function StatCard({ label, value, icon, color }) {
  return (
    <div className="ad__stat-card">
      <div className="ad__stat-icon" style={{ background: `${color}15`, color }}>{icon}</div>
      <div>
        <div className="ad__stat-value">{value}</div>
        <div className="ad__stat-label">{label}</div>
      </div>
    </div>
  );
}

const dashStyles = `
  .ad__page {
    min-height: 100vh;
    display: flex;
    background: var(--color-gray-50);
  }

  .ad__spinner {
    width: 48px;
    height: 48px;
    border: 4px solid rgba(255,255,255,0.1);
    border-top-color: var(--color-ieee-blue);
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
    margin: 0 auto;
  }
  @keyframes spin { to { transform: rotate(360deg); } }

  .ad__sidebar {
    width: 240px;
    background: var(--color-navy);
    color: var(--text-inverse);
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
    position: sticky;
    top: 0;
    height: 100vh;
  }

  .ad__sidebar-header {
    padding: var(--space-5) var(--space-5);
    display: flex;
    align-items: center;
    gap: var(--space-3);
    border-bottom: 1px solid rgba(255,255,255,0.08);
  }

  .ad__sidebar-logo {
    width: 36px;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, var(--color-ieee-blue) 0%, var(--color-ieee-blue-l) 100%);
    border-radius: var(--radius-sm);
    font-weight: 800;
    font-size: var(--text-sm);
  }

  .ad__sidebar-title {
    font-weight: 700;
    font-size: var(--text-sm);
  }

  .ad__nav {
    flex: 1;
    padding: var(--space-4) var(--space-3);
    display: flex;
    flex-direction: column;
    gap: var(--space-1);
  }

  .ad__nav-btn {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    padding: var(--space-3) var(--space-4);
    background: none;
    border: none;
    color: rgba(255,255,255,0.6);
    font-size: var(--text-sm);
    font-weight: 500;
    border-radius: var(--radius-sm);
    cursor: pointer;
    transition: all var(--transition-fast);
    text-decoration: none;
    font-family: inherit;
    text-align: left;
    width: 100%;
  }

  .ad__nav-btn:hover, .ad__nav-btn.active {
    background: rgba(255,255,255,0.08);
    color: var(--text-inverse);
  }

  .ad__nav-btn--danger:hover {
    background: rgba(239, 68, 68, 0.15);
    color: #fca5a5;
  }

  .ad__sidebar-footer {
    padding: var(--space-3);
    border-top: 1px solid rgba(255,255,255,0.08);
    display: flex;
    flex-direction: column;
    gap: var(--space-1);
  }

  .ad__main {
    flex: 1;
    overflow-y: auto;
  }

  .ad__topbar {
    padding: var(--space-6) var(--space-8);
    background: var(--color-white);
    border-bottom: 1px solid var(--color-gray-200);
    position: sticky;
    top: 0;
    z-index: 10;
  }

  .ad__page-title {
    font-size: var(--text-xl);
    font-weight: 800;
    color: var(--color-navy);
  }

  .ad__content {
    padding: var(--space-6) var(--space-8);
  }

  .ad__stats {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: var(--space-4);
    margin-bottom: var(--space-6);
  }

  .ad__stat-card {
    display: flex;
    align-items: center;
    gap: var(--space-4);
    padding: var(--space-5);
    background: var(--color-white);
    border-radius: var(--radius-lg);
    border: 1px solid var(--color-gray-200);
    box-shadow: var(--shadow-sm);
  }

  .ad__stat-icon {
    width: 48px;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: var(--radius-md);
    font-size: 1.3rem;
    flex-shrink: 0;
  }

  .ad__stat-value {
    font-size: var(--text-2xl);
    font-weight: 800;
    color: var(--color-navy);
    line-height: 1;
    margin-bottom: var(--space-1);
  }

  .ad__stat-label {
    font-size: var(--text-xs);
    color: var(--text-muted);
    font-weight: 500;
  }

  .ad__panel {
    background: var(--color-white);
    border-radius: var(--radius-lg);
    border: 1px solid var(--color-gray-200);
    box-shadow: var(--shadow-sm);
    margin-bottom: var(--space-6);
    overflow: hidden;
  }

  .ad__panel-header {
    padding: var(--space-4) var(--space-5);
    border-bottom: 1px solid var(--color-gray-200);
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .ad__panel-title {
    font-size: var(--text-base);
    font-weight: 700;
    color: var(--color-navy);
    padding: var(--space-4) var(--space-5);
  }

  .ad__table-wrap {
    overflow-x: auto;
  }

  .ad__table {
    width: 100%;
    border-collapse: collapse;
    font-size: var(--text-sm);
  }

  .ad__table th {
    background: var(--color-gray-50);
    padding: var(--space-3) var(--space-4);
    text-align: left;
    font-weight: 600;
    color: var(--text-secondary);
    font-size: var(--text-xs);
    text-transform: uppercase;
    letter-spacing: 0.5px;
    white-space: nowrap;
    border-bottom: 1px solid var(--color-gray-200);
  }

  .ad__table td {
    padding: var(--space-3) var(--space-4);
    border-bottom: 1px solid var(--color-gray-100);
    color: var(--text-primary);
    white-space: nowrap;
  }

  .ad__table code {
    font-family: var(--font-mono);
    font-size: var(--text-xs);
    background: var(--color-gray-100);
    padding: 2px 6px;
    border-radius: 4px;
    color: var(--color-ieee-blue);
    font-weight: 600;
  }

  .ad__table tbody tr:hover {
    background: var(--color-gray-50);
  }

  .ad__filters {
    display: flex;
    gap: var(--space-3);
    margin-bottom: var(--space-6);
    flex-wrap: wrap;
  }

  .ad__filters .form-input,
  .ad__filters .form-select {
    flex: 1;
    min-width: 180px;
  }

  .ad__pagination {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--space-4);
    padding: var(--space-4);
    border-top: 1px solid var(--color-gray-200);
  }

  .ad__page-info {
    font-size: var(--text-sm);
    color: var(--text-secondary);
    font-weight: 500;
  }

  .ad__empty {
    padding: var(--space-8);
    text-align: center;
    color: var(--text-muted);
    font-size: var(--text-sm);
  }

  @media (max-width: 1024px) {
    .ad__stats {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (max-width: 768px) {
    .ad__sidebar {
      display: none;
    }
    .ad__content {
      padding: var(--space-4);
    }
    .ad__topbar {
      padding: var(--space-4);
    }
    .ad__stats {
      grid-template-columns: 1fr;
    }
    .ad__filters {
      flex-direction: column;
    }
    .ad__filters .form-input,
    .ad__filters .form-select {
      min-width: 100%;
    }
  }
`;
