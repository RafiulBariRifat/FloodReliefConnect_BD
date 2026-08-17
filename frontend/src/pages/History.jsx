import { useEffect, useState } from 'react';
import api from '../services/api.js';
import { Clock, ShieldCheck, Heart, HandHeart, RefreshCw, AlertCircle, MessageSquare } from 'lucide-react';

export default function History() {
  const [tab, setTab] = useState('d');
  const [d, setD] = useState([]);
  const [r, setR] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchHistory = (showLoader = false) => {
    if (showLoader) setLoading(true);
    Promise.all([
      api.get('/donations/my-history').then((x) => setD(x.data)).catch(() => {}),
      api.get('/relief/my-requests').then((x) => setR(x.data)).catch(() => {})
    ]).finally(() => {
      if (showLoader) setLoading(false);
    });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchHistory(true);

    // Auto-refresh every 5 seconds so status updates from Admin show live!
    const interval = setInterval(() => {
      fetchHistory(false);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const empty = (
    <div className="p-5 text-center text-muted">
      <Clock size={36} className="mb-2 text-primary opacity-50" />
      <p className="mb-0 fw-semibold">No {tab === 'd' ? 'donations' : 'relief requests'} recorded yet. Your activity will appear here.</p>
    </div>
  );

  return (
    <div className="rw-page-canvas-history">
      {/* Unique Hero Banner for History */}
      <section className="rw-page-hero rw-hero-history">
        <div className="container">
          <span className="rw-hero-eyebrow">
            <ShieldCheck size={14} className="text-info" /> PRIVATE ACTIVITY LEDGER
          </span>
          <h1 className="rw-hero-title">My Response History & Activity</h1>
          <p className="rw-hero-subtitle">
            View all your past flood donation receipts, transaction references, and live application review statuses.
          </p>
        </div>
      </section>

      <div className="container">
        {/* Control Bar: Tabs + Refresh Button */}
        <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-4">
          <div className="d-flex align-items-center gap-2 bg-white p-1.5 rounded-pill border shadow-sm" style={{ maxWidth: '420px', width: '100%' }}>
            <button
              className={`btn btn-sm rounded-pill px-4 py-2 flex-grow-1 fw-bold border-0 ${tab === 'd' ? 'btn-primary' : 'text-muted'}`}
              onClick={() => setTab('d')}
            >
              <Heart size={15} className="me-1" /> Donations ({d.length})
            </button>
            <button
              className={`btn btn-sm rounded-pill px-4 py-2 flex-grow-1 fw-bold border-0 ${tab === 'r' ? 'btn-primary' : 'text-muted'}`}
              onClick={() => setTab('r')}
            >
              <HandHeart size={15} className="me-1" /> Relief Requests ({r.length})
            </button>
          </div>

          <button
            onClick={() => fetchHistory(true)}
            disabled={loading}
            className="btn btn-sm btn-white bg-white border rounded-pill px-3 py-2 fw-semibold text-secondary shadow-sm d-flex align-items-center gap-2"
          >
            <RefreshCw size={14} className={loading ? 'spin text-primary' : ''} />
            <span>{loading ? 'Refreshing...' : 'Live Sync Status'}</span>
          </button>
        </div>

        {/* Approved Aid Banner */}
        {tab === 'r' && r.some((x) => x.status === 'approved') && (
          <div className="alert alert-success border-success rounded-3 p-3 mb-4 d-flex align-items-center gap-3 shadow-sm">
            <CheckCircle2 size={32} className="text-success flex-shrink-0" />
            <div>
              <h5 className="h6 fw-bold text-dark mb-1">🎉 Relief Application Approved!</h5>
              <p className="small mb-0 text-secondary">
                Your emergency relief application has been verified by the district coordinator. See the exact granted amount and response notes below.
              </p>
            </div>
          </div>
        )}

        {/* Table Container */}
        <div className="rw-table-wrap">
          {tab === 'd' ? (
            d.length ? (
              <div className="table-responsive">
                <table className="rw-table">
                  <thead>
                    <tr>
                      <th>Amount (BDT)</th>
                      <th>District Location</th>
                      <th>Payment Method</th>
                      <th>Transaction ID</th>
                      <th>Date</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {d.map((x) => (
                      <tr key={x.donation_id}>
                        <td>
                          <b className="fs-6 text-success">৳{Number(x.amount).toLocaleString()}</b>
                        </td>
                        <td>{x.district_name || 'General Fund'}</td>
                        <td>{x.payment_method}</td>
                        <td>
                          <code className="bg-light px-2 py-1 rounded text-dark fw-bold">{x.transaction_id || 'N/A'}</code>
                        </td>
                        <td>{new Date(x.donated_at).toLocaleDateString()}</td>
                        <td>
                          <Badge x={x.payment_status} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              empty
            )
          ) : r.length ? (
            <div className="table-responsive">
              <table className="rw-table">
                <thead>
                  <tr>
                    <th>Request ID</th>
                    <th>District Location</th>
                    <th>Family Members</th>
                    <th>Requested vs Granted Aid</th>
                    <th>Urgency Severity</th>
                    <th>Review Status</th>
                    <th>Coordinator Remarks & Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {r.map((x) => (
                    <tr key={x.request_id}>
                      <td>
                        <b className="text-primary">#{x.request_id}</b>
                      </td>
                      <td>{x.district_name}</td>
                      <td>
                        <span className="fw-bold">{x.family_members} Members</span>
                        {x.vulnerable_count > 0 && (
                          <small className="text-muted d-block font-size-xs">({x.vulnerable_count} Vulnerable)</small>
                        )}
                      </td>
                      <td>
                        {x.status === 'approved' ? (
                          <div>
                            <b className="text-success fs-6 d-block">
                              ৳{Number(x.approved_amount || x.requested_amount || 0).toLocaleString()} Granted
                            </b>
                            {x.requested_amount > 0 && x.approved_amount && Number(x.approved_amount) !== Number(x.requested_amount) && (
                              <small className="text-muted d-block font-size-xs">(Requested: ৳{Number(x.requested_amount).toLocaleString()})</small>
                            )}
                          </div>
                        ) : (
                          <b className="text-dark">{x.requested_amount > 0 ? `৳${Number(x.requested_amount).toLocaleString()}` : 'General Relief Goods'}</b>
                        )}
                      </td>
                      <td>
                        <span className={`badge ${x.urgency_level === 'Critical' ? 'bg-danger' : x.urgency_level === 'High' ? 'bg-warning text-dark' : 'bg-success'} fw-bold`}>
                          {x.urgency_level}
                        </span>
                      </td>
                      <td>
                        <Badge x={x.status} />
                      </td>
                      <td>
                        {x.admin_remarks ? (
                          <span className="d-inline-flex align-items-center gap-1 text-dark small bg-light p-1.5 rounded border">
                            <MessageSquare size={13} className="text-primary flex-shrink-0" />
                            <span>{x.admin_remarks}</span>
                          </span>
                        ) : (
                          <span className="small text-muted italic">
                            {x.status === 'pending' ? 'Application queued for verification' : 'No remarks provided'}
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            empty
          )}
        </div>
      </div>
    </div>
  );
}

export function Badge({ x }) {
  const cls = x === 'completed' || x === 'approved' ? 'bg-success bg-opacity-10 text-success border border-success' :
              x === 'pending' ? 'bg-warning bg-opacity-10 text-warning border border-warning' :
              'bg-danger bg-opacity-10 text-danger border border-danger';
  return <span className={`badge px-3 py-1.5 rounded-pill text-capitalize fw-bold ${cls}`}>{x}</span>;
}

