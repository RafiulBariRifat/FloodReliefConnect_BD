import { useEffect, useState } from 'react';
import api, { getError } from '../services/api.js';
import { Badge } from './History.jsx';
import { ShieldCheck, RefreshCw, Trash2, CheckCircle2, XCircle, Users, HeartHandshake, FileText, CreditCard, Edit3, DollarSign, X } from 'lucide-react';

export default function Admin() {
  const [tab, setTab] = useState('requests');
  const [items, setItems] = useState([]);
  const [donations, setDonations] = useState([]);
  const [metrics, setMetrics] = useState({ totalFunds: 0, pendingRequests: 0, approvedRequests: 0, totalUsers: 0 });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // Modal State for Admin-friendly Amount Editing
  const [editModal, setEditModal] = useState(null);

  const load = () => {
    setLoading(true);
    Promise.all([
      api.get('/admin/relief-requests').then((r) => setItems(r.data)).catch((e) => setMessage(getError(e))),
      api.get('/admin/donations').then((r) => setDonations(r.data)).catch((e) => setMessage(getError(e))),
      api.get('/admin/analytics').then((r) => setMetrics(r.data)).catch((e) => setMessage(getError(e)))
    ]).finally(() => setLoading(false));
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    load();
  }, []);

  const openApproveModal = (item, targetStatus = 'approved') => {
    setEditModal({
      item,
      status: targetStatus,
      approved_amount: item.approved_amount || item.requested_amount || '',
      admin_remarks: item.admin_remarks || 'Approved emergency relief grant.'
    });
  };

  const handleModalSave = async () => {
    if (!editModal) return;
    const { item, approved_amount, admin_remarks, status } = editModal;
    try {
      await api.put(`/admin/relief-requests/${item.request_id}/status`, {
        status,
        approved_amount: approved_amount || item.requested_amount,
        admin_remarks
      });
      setEditModal(null);
      load();
      setMessage(`Request #${item.request_id} updated with ৳${Number(approved_amount || item.requested_amount).toLocaleString()} grant.`);
    } catch (e) {
      setMessage(getError(e));
    }
  };

  const updateSimpleStatus = async (id, status) => {
    const item = items.find((v) => v.request_id === id);
    const remarks = window.prompt(`Optional administrative remarks for request #${id}:`, item?.admin_remarks || '') || '';
    try {
      await api.put(`/admin/relief-requests/${id}/status`, { status, approved_amount: item?.approved_amount || null, admin_remarks: remarks });
      load();
    } catch (e) {
      setMessage(getError(e));
    }
  };

  const remove = async (id) => {
    if (!window.confirm(`Delete relief application #${id}? This action cannot be undone.`)) return;
    try {
      await api.delete(`/admin/relief-requests/${id}`);
      setItems((x) => x.filter((v) => v.request_id !== id));
      load();
      setMessage(`Request #${id} was deleted successfully.`);
    } catch (e) {
      setMessage(getError(e));
    }
  };

  return (
    <div className="rw-page-canvas-admin">
      {/* Unique Hero Banner for Admin */}
      <section className="rw-page-hero rw-hero-admin">
        <div className="container">
          <span className="rw-hero-eyebrow">
            <ShieldCheck size={14} className="text-warning" /> RESTRICTED ADMINISTRATION DESK
          </span>
          <h1 className="rw-hero-title">National Response Management Portal</h1>
          <p className="rw-hero-subtitle">
            Review relief applications, verify affected family credentials, approve custom cash assistance grants, and audit all public donation transactions.
          </p>
        </div>
      </section>

      <div className="container">
        {/* Metric Analytics Grid */}
        <div className="row g-3 mb-4">
          <div className="col-sm-6 col-lg-3">
            <div className="rw-metric-card" style={{ borderTop: '4px solid #059669' }}>
              <div className="rw-metric-val text-success">৳{Number(metrics.totalFunds).toLocaleString()}</div>
              <div className="rw-metric-lbl">Total Funds Raised</div>
            </div>
          </div>
          <div className="col-sm-6 col-lg-3">
            <div className="rw-metric-card" style={{ borderTop: '4px solid #D97706' }}>
              <div className="rw-metric-val text-warning">{metrics.pendingRequests}</div>
              <div className="rw-metric-lbl">Pending Review</div>
            </div>
          </div>
          <div className="col-sm-6 col-lg-3">
            <div className="rw-metric-card" style={{ borderTop: '4px solid #0284C7' }}>
              <div className="rw-metric-val text-primary">{metrics.approvedRequests}</div>
              <div className="rw-metric-lbl">Approved Relief Grants</div>
            </div>
          </div>
          <div className="col-sm-6 col-lg-3">
            <div className="rw-metric-card" style={{ borderTop: '4px solid #7C3AED' }}>
              <div className="rw-metric-val text-purple">{metrics.totalUsers}</div>
              <div className="rw-metric-lbl">Registered Citizens</div>
            </div>
          </div>
        </div>

        {/* Section Header & Tab Controls */}
        <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-3">
          <div className="d-flex align-items-center gap-2 bg-white p-1.5 rounded-pill border shadow-sm" style={{ maxWidth: '460px', width: '100%' }}>
            <button
              className={`btn btn-sm rounded-pill px-3 py-2 flex-grow-1 fw-bold border-0 ${tab === 'requests' ? 'btn-primary' : 'text-muted'}`}
              onClick={() => setTab('requests')}
            >
              <FileText size={15} className="me-1" /> Relief Applications ({items.length})
            </button>
            <button
              className={`btn btn-sm rounded-pill px-3 py-2 flex-grow-1 fw-bold border-0 ${tab === 'donations' ? 'btn-primary' : 'text-muted'}`}
              onClick={() => setTab('donations')}
            >
              <CreditCard size={15} className="me-1" /> Donors & Financials ({donations.length})
            </button>
          </div>

          <button className="btn btn-sm btn-white bg-white border rounded-pill px-3 py-2 fw-semibold text-secondary shadow-sm d-flex align-items-center gap-2" onClick={load}>
            <RefreshCw size={14} className={loading ? 'spin text-primary' : ''} />
            <span>{loading ? 'Refreshing...' : 'Refresh Portal'}</span>
          </button>
        </div>

        {message && <div className="alert alert-info rounded-3 p-3 mb-3 fw-semibold">{message}</div>}

        {/* Tab 1: Applications Table */}
        {tab === 'requests' ? (
          <div className="rw-table-wrap">
            {items.length ? (
              <div className="table-responsive">
                <table className="rw-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Applicant Information</th>
                      <th>District</th>
                      <th>Family</th>
                      <th>Aid (Requested / Granted)</th>
                      <th>Urgency</th>
                      <th>Status</th>
                      <th>Administrative Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((x) => (
                      <tr key={x.request_id}>
                        <td>
                          <b className="text-primary">#{x.request_id}</b>
                        </td>
                        <td>
                          <b className="text-dark d-block">{x.full_name}</b>
                          <small className="text-muted font-monospace">{x.phone_number}</small>
                        </td>
                        <td>{x.district_name}</td>
                        <td>{x.family_members} Members</td>
                        <td>
                          <span className="fw-bold text-dark d-block">Req: ৳{Number(x.requested_amount || 0).toLocaleString()}</span>
                          {x.approved_amount > 0 && (
                            <small className="text-success fw-bold d-block font-size-xs">● Granted: ৳{Number(x.approved_amount).toLocaleString()}</small>
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
                          <div className="d-flex align-items-center gap-1 flex-wrap">
                            {x.status !== 'approved' ? (
                              <button
                                className="btn btn-sm btn-success rounded-pill px-2.5 py-1 text-white fw-bold d-flex align-items-center gap-1 fs-8"
                                onClick={() => openApproveModal(x, 'approved')}
                              >
                                <CheckCircle2 size={13} /> Approve
                              </button>
                            ) : (
                              <button
                                className="btn btn-sm btn-outline-success rounded-pill px-2.5 py-1 fw-bold d-flex align-items-center gap-1 fs-8"
                                onClick={() => openApproveModal(x, 'approved')}
                              >
                                <Edit3 size={13} /> Edit Amount (৳)
                              </button>
                            )}

                            {x.status !== 'rejected' && (
                              <button
                                className="btn btn-sm btn-warning rounded-pill px-2.5 py-1 text-dark fw-bold d-flex align-items-center gap-1 fs-8"
                                onClick={() => updateSimpleStatus(x.request_id, 'rejected')}
                              >
                                <XCircle size={13} /> Reject
                              </button>
                            )}

                            {x.status !== 'pending' && (
                              <button
                                className="btn btn-sm btn-outline-secondary rounded-pill px-2.5 py-1 fw-bold d-flex align-items-center gap-1 fs-8"
                                onClick={() => updateSimpleStatus(x.request_id, 'pending')}
                              >
                                Reset
                              </button>
                            )}

                            <button
                              className="btn btn-sm btn-outline-danger rounded-pill px-2.5 py-1 fw-bold d-flex align-items-center gap-1 fs-8"
                              onClick={() => remove(x.request_id)}
                            >
                              <Trash2 size={13} /> Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="p-5 text-center text-muted">
                <p className="mb-0 fw-semibold">No relief applications have been submitted yet.</p>
              </div>
            )}
          </div>
        ) : (
          /* Tab 2: Donations Table */
          <div className="rw-table-wrap">
            {donations.length ? (
              <div className="table-responsive">
                <table className="rw-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Donor Name & Contact</th>
                      <th>Amount (BDT)</th>
                      <th>Fund Destination</th>
                      <th>Method</th>
                      <th>Transaction ID</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {donations.map((x) => (
                      <tr key={x.donation_id}>
                        <td>
                          <b className="text-primary">#{x.donation_id}</b>
                        </td>
                        <td>
                          <b className="text-dark d-block">{x.full_name}</b>
                          <small className="text-muted d-block">{x.email}</small>
                          <small className="text-muted font-monospace">{x.phone_number}</small>
                        </td>
                        <td>
                          <b className="fs-6 text-success">৳{Number(x.amount).toLocaleString()}</b>
                        </td>
                        <td>{x.district_name}</td>
                        <td>
                          <span className="badge bg-light text-dark border fw-bold">{x.payment_method}</span>
                        </td>
                        <td>
                          <code className="bg-light px-2 py-1 rounded text-dark fw-bold">{x.transaction_id}</code>
                        </td>
                        <td>{new Date(x.donated_at).toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="p-5 text-center text-muted">
                <p className="mb-0 fw-semibold">No donations recorded in the system yet.</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Admin Interactive Grant Amount Edit Modal */}
      {editModal && (
        <div className="admin-modal-backdrop">
          <div className="admin-modal-card">
            <div className="admin-modal-header">
              <div className="d-flex align-items-center gap-2">
                <DollarSign size={20} className="text-warning" />
                <h3 className="h6 fw-bold mb-0 text-white">
                  {editModal.status === 'approved' ? 'Approve & Adjust Relief Grant Amount' : 'Edit Relief Grant'}
                </h3>
              </div>
              <button
                type="button"
                className="btn-close btn-close-white"
                onClick={() => setEditModal(null)}
              />
            </div>

            <div className="p-4">
              {/* Applicant Context Card */}
              <div className="bg-light p-3 rounded-3 border mb-4">
                <div className="d-flex justify-content-between align-items-start mb-1">
                  <div>
                    <b className="text-dark d-block fs-6">{editModal.item.full_name}</b>
                    <small className="text-muted">{editModal.item.phone_number} • {editModal.item.district_name}</small>
                  </div>
                  <span className="badge bg-primary px-2.5 py-1 fw-bold">
                    Requested: ৳{Number(editModal.item.requested_amount || 0).toLocaleString()}
                  </span>
                </div>
                <div className="small text-secondary">
                  <b>Household:</b> {editModal.item.family_members} Members ({editModal.item.vulnerable_count || 0} Vulnerable)
                </div>
              </div>

              {/* Amount Input & Quick Set Presets */}
              <div className="mb-4">
                <label className="fw-bold text-dark mb-1 small d-block">
                  Approved Grant Amount (BDT ৳)
                </label>
                <input
                  type="number"
                  min="0"
                  required
                  className="form-control form-control-lg fw-bold text-success border-2 mb-2"
                  style={{ fontSize: '1.3rem' }}
                  value={editModal.approved_amount}
                  onChange={(e) => setEditModal({ ...editModal, approved_amount: e.target.value })}
                  placeholder="Enter grant amount in BDT"
                />

                {/* Quick Percentage Presets */}
                <div className="d-flex flex-wrap align-items-center gap-1.5">
                  <span className="small text-muted me-1 fw-semibold">Quick Set:</span>
                  {[
                    { label: 'Full (100%)', val: editModal.item.requested_amount },
                    { label: '75%', val: String(Math.round(Number(editModal.item.requested_amount || 0) * 0.75)) },
                    { label: '50%', val: String(Math.round(Number(editModal.item.requested_amount || 0) * 0.5)) },
                    { label: '25%', val: String(Math.round(Number(editModal.item.requested_amount || 0) * 0.25)) }
                  ].map((p) => (
                    <button
                      key={p.label}
                      type="button"
                      className={`admin-preset-badge ${String(editModal.approved_amount) === String(p.val) ? 'active' : ''}`}
                      onClick={() => setEditModal({ ...editModal, approved_amount: p.val })}
                    >
                      {p.label} (৳{Number(p.val || 0).toLocaleString()})
                    </button>
                  ))}
                </div>
              </div>

              {/* Remarks & Notes */}
              <div className="mb-4">
                <label className="fw-bold text-dark mb-1 small d-block">
                  Coordinator Remarks / Requester Notice (Optional)
                </label>
                <textarea
                  rows="3"
                  className="form-control"
                  value={editModal.admin_remarks}
                  onChange={(e) => setEditModal({ ...editModal, admin_remarks: e.target.value })}
                  placeholder="e.g. Approved emergency cash grant via mobile banking."
                />
                <div className="d-flex flex-wrap gap-2 mt-2">
                  {[
                    'Approved full emergency grant.',
                    'Partial grant approved based on available district funds.',
                    'Disbursed via MFS mobile wallet.'
                  ].map((msg) => (
                    <button
                      key={msg}
                      type="button"
                      className="btn btn-sm btn-light border text-secondary font-size-xs py-0.5 px-2 rounded-pill"
                      onClick={() => setEditModal({ ...editModal, admin_remarks: msg })}
                    >
                      + "{msg}"
                    </button>
                  ))}
                </div>
              </div>

              {/* Footer Buttons */}
              <div className="d-flex justify-content-end gap-2 pt-3 border-top">
                <button
                  type="button"
                  className="btn btn-outline-secondary rounded-pill px-4 fw-semibold"
                  onClick={() => setEditModal(null)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-success rounded-pill px-4 fw-bold d-flex align-items-center gap-1.5 shadow-sm"
                  onClick={handleModalSave}
                >
                  <CheckCircle2 size={16} />
                  <span>Confirm & Save Grant (৳)</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


