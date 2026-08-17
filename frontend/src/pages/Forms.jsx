import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api, { getError } from '../services/api.js';
import { useAuth } from '../context/AuthContext.jsx';
import {
  HeartHandshake,
  ShieldCheck,
  HandHeart,
  CheckCircle2,
  Lock,
  AlertTriangle,
  MapPin,
  Users,
  Home,
  Banknote,
  FileText,
  ArrowRight,
  RefreshCw
} from 'lucide-react';

const fallback = [
  { district_id: 1, district_name: 'Bandarban' },
  { district_id: 2, district_name: 'Chattogram' },
  { district_id: 3, district_name: 'Rangamati' },
  { district_id: 4, district_name: 'Thanchi' },
  { district_id: 5, district_name: 'Teknaf' },
  { district_id: 6, district_name: 'Feni' },
  { district_id: 7, district_name: "Cox's Bazar" },
  { district_id: 8, district_name: 'Khagrachari' },
  { district_id: 9, district_name: 'Sylhet' },
  { district_id: 10, district_name: 'Sunamganj' },
  { district_id: 11, district_name: 'Kurigram' }
];

function FormHero({ eyebrow, title, sub }) {
  return (
    <section className="rw-page-hero rw-hero-forms">
      <div className="container">
        <span className="rw-hero-eyebrow">
          <Lock size={14} className="text-warning" /> SECURE SUBMISSION PORTAL
        </span>
        <h1 className="rw-hero-title">{title}</h1>
        <p className="rw-hero-subtitle">{sub}</p>
      </div>
    </section>
  );
}

function Districts({ value, onChange }) {
  const [items, setItems] = useState(fallback);

  useEffect(() => {
    api.get('/public/districts')
      .then((r) => setItems(r.data))
      .catch(() => {});
  }, []);

  return (
    <label className="field">
      Affected District Location
      <select required value={value} onChange={(e) => onChange(e.target.value)}>
        <option value="">Choose a district location</option>
        <option value="">General all-district flood fund</option>
        {items.map((x) => (
          <option key={x.district_id} value={x.district_id}>
            {x.district_name} District
          </option>
        ))}
      </select>
    </label>
  );
}

export function Donate() {
  const [f, setF] = useState({ district_id: '', amount: '', payment_method: 'bKash', transaction_id: '' });
  const [status, setStatus] = useState('');
  const { flash } = useAuth();

  const submit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/donations', f);
      flash('Donation recorded successfully. Thank you!');
      setStatus('Your payment receipt has been saved to My Activity history.');
      setF({ ...f, amount: '', transaction_id: '' });
    } catch (e) {
      setStatus(getError(e));
    }
  };

  return (
    <div className="rw-page-canvas-forms">
      <FormHero
        title="Make a Flood Relief Donation"
        sub="Every payment is recorded in your personal ledger. Select a district location or support the general fund."
      />
      <div className="container narrow">
        <div className="form-card bg-white p-4 p-md-5 rounded-3 border shadow-sm">
          <div className="d-flex align-items-center gap-2 mb-4 pb-3 border-bottom text-primary fw-bold">
            <HeartHandshake size={22} />
            <span>Encrypted Payment Ledger Record</span>
          </div>

          <form onSubmit={submit}>
            <Districts value={f.district_id} onChange={(v) => setF({ ...f, district_id: v })} />

            <div className="row">
              <div className="col-md-6">
                <label className="field">
                  Donation Amount (BDT)
                  <input
                    type="number"
                    min="1"
                    required
                    value={f.amount}
                    onChange={(e) => setF({ ...f, amount: e.target.value })}
                    placeholder="e.g. 5000"
                  />
                </label>
              </div>
              <div className="col-md-6">
                <label className="field">
                  Payment Method
                  <select value={f.payment_method} onChange={(e) => setF({ ...f, payment_method: e.target.value })}>
                    {['bKash', 'Nagad', 'Rocket', 'Bank Transfer'].map((x) => (
                      <option key={x}>{x}</option>
                    ))}
                  </select>
                </label>
              </div>
            </div>

            <label className="field">
              Transaction ID / Reference Number
              <input
                required
                value={f.transaction_id}
                onChange={(e) => setF({ ...f, transaction_id: e.target.value })}
                placeholder="e.g. BK7A2L9X"
              />
            </label>

            {status && (
              <div className="alert alert-info rounded-3 p-3 my-3 fw-semibold">
                <CheckCircle2 size={18} className="me-2 text-success" />
                {status}
              </div>
            )}

            <button className="btn btn-primary w-100 rounded-pill py-2.5 fw-bold fs-6 mt-3">
              Record Donation Receipt &rarr;
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export function ApplyRelief() {
  const [f, setF] = useState({
    district_id: '',
    family_members: '4',
    vulnerable_count: '1',
    address_details: '',
    urgency_level: 'High',
    requested_amount: ''
  });
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState('');
  const [submittedData, setSubmittedData] = useState(null);
  const { flash } = useAuth();

  const presets = ['3000', '5000', '10000', '15000', '20000'];

  const submit = async (e) => {
    e.preventDefault();
    setErr('');
    setLoading(true);
    try {
      await api.post('/relief/apply', f);
      setLoading(false);
      setSubmittedData({ ...f });
      if (flash) flash('Your flood relief assistance request was submitted successfully.');
    } catch (e) {
      setLoading(false);
      setErr(getError(e));
    }
  };

  const handleReset = () => {
    setSubmittedData(null);
    setErr('');
    setF({
      district_id: '',
      family_members: '4',
      vulnerable_count: '1',
      address_details: '',
      urgency_level: 'High',
      requested_amount: ''
    });
  };

  return (
    <div className="rw-page-canvas-forms">
      <FormHero
        title="Request Verified Flood Relief Assistance"
        sub="Connect directly with verified response coordinators. Your emergency information is encrypted and treated with strict confidentiality."
      />
      <div className="container narrow">
        {submittedData ? (
          <div className="bg-white p-4 p-md-5 rounded-4 border shadow-sm text-center">
            <div className="d-inline-flex align-items-center justify-content-center bg-success bg-opacity-10 text-success rounded-circle p-3 mb-3" style={{ width: '72px', height: '72px' }}>
              <CheckCircle2 size={42} />
            </div>
            <h2 className="h4 fw-extrabold text-dark mb-2">Application Submitted Successfully!</h2>
            <p className="text-secondary small max-w-md mx-auto mb-4">
              Your request for emergency flood assistance has been recorded in our secure ledger. Local verification teams review urgent applications on priority.
            </p>

            <div className="bg-light p-3.5 rounded-3 border text-start mb-4">
              <div className="row g-3 small">
                <div className="col-6 col-md-3">
                  <span className="text-muted d-block font-size-xs uppercase fw-bold">Urgency Level</span>
                  <span className={`fw-bold ${submittedData.urgency_level === 'Critical' ? 'text-danger' : submittedData.urgency_level === 'High' ? 'text-warning' : 'text-success'}`}>
                    ● {submittedData.urgency_level}
                  </span>
                </div>
                <div className="col-6 col-md-3">
                  <span className="text-muted d-block font-size-xs uppercase fw-bold">Family Size</span>
                  <span className="fw-bold text-dark">{submittedData.family_members} Members ({submittedData.vulnerable_count} Vulnerable)</span>
                </div>
                <div className="col-6 col-md-3">
                  <span className="text-muted d-block font-size-xs uppercase fw-bold">Requested Aid</span>
                  <span className="fw-bold text-dark">{submittedData.requested_amount ? `৳${Number(submittedData.requested_amount).toLocaleString()}` : 'General Relief Goods'}</span>
                </div>
                <div className="col-6 col-md-3">
                  <span className="text-muted d-block font-size-xs uppercase fw-bold">Status</span>
                  <span className="badge bg-warning text-dark fw-bold">Pending Review</span>
                </div>
              </div>
            </div>

            <div className="d-flex flex-column flex-sm-row gap-2 justify-content-center">
              <Link to="/history" className="btn btn-primary rounded-pill px-4 py-2.5 fw-bold d-inline-flex align-items-center justify-content-center gap-2">
                <span>Track Request Status in My Activity</span>
                <ArrowRight size={16} />
              </Link>
              <button type="button" onClick={handleReset} className="btn btn-outline-secondary rounded-pill px-4 py-2.5 fw-bold d-inline-flex align-items-center justify-content-center gap-2">
                <RefreshCw size={15} />
                <span>Submit Another Request</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="form-card bg-white p-4 p-md-5 rounded-4 border shadow-sm">
            <div className="privacy-banner">
              <ShieldCheck size={26} className="flex-shrink-0 text-success" />
              <div>
                <strong>Confidential & Encrypted Portal:</strong> Your details are protected under Bangladesh emergency relief protocols. Only verified district coordinators can view your location and contact details.
              </div>
            </div>

            <form onSubmit={submit}>
              {/* STEP 1: URGENCY SELECTION */}
              <div className="relief-section-title">
                <span className="relief-step-num">1</span>
                <span>Select Urgency & Emergency Level</span>
              </div>

              <div className="urgency-grid">
                <div
                  className={`urgency-tile critical ${f.urgency_level === 'Critical' ? 'selected' : ''}`}
                  onClick={() => setF({ ...f, urgency_level: 'Critical' })}
                >
                  <div className="urgency-header">
                    <span className="urgency-title">Critical</span>
                    <AlertTriangle size={18} className="text-danger" />
                  </div>
                  <p className="urgency-desc">Submerged home, immediate life safety, stranded families, or medical emergency.</p>
                </div>

                <div
                  className={`urgency-tile high ${f.urgency_level === 'High' ? 'selected' : ''}`}
                  onClick={() => setF({ ...f, urgency_level: 'High' })}
                >
                  <div className="urgency-header">
                    <span className="urgency-title">High</span>
                    <HandHeart size={18} className="text-warning" />
                  </div>
                  <p className="urgency-desc">Urgent need for food packs, safe drinking water, baby food, or essential medicines.</p>
                </div>

                <div
                  className={`urgency-tile moderate ${f.urgency_level === 'Moderate' ? 'selected' : ''}`}
                  onClick={() => setF({ ...f, urgency_level: 'Moderate' })}
                >
                  <div className="urgency-header">
                    <span className="urgency-title">Moderate</span>
                    <Home size={18} className="text-success" />
                  </div>
                  <p className="urgency-desc">Post-flood rehabilitation, sanitation kits, dry rations, or structural repair.</p>
                </div>
              </div>

              {/* STEP 2: LOCATION */}
              <div className="relief-section-title">
                <span className="relief-step-num">2</span>
                <span>Affected District Location</span>
              </div>

              <Districts value={f.district_id} onChange={(v) => setF({ ...f, district_id: v })} />

              {/* STEP 3: HOUSEHOLD INFORMATION */}
              <div className="relief-section-title">
                <span className="relief-step-num">3</span>
                <span>Household Size & Vulnerability</span>
              </div>

              <div className="row">
                <div className="col-md-6">
                  <label className="field">
                    Total Family Members Count
                    <input
                      type="number"
                      min="1"
                      required
                      value={f.family_members}
                      onChange={(e) => setF({ ...f, family_members: e.target.value })}
                      placeholder="e.g. 5"
                    />
                  </label>
                </div>
                <div className="col-md-6">
                  <label className="field">
                    Vulnerable Members (Children / Elderly / Pregnant)
                    <input
                      type="number"
                      min="0"
                      value={f.vulnerable_count}
                      onChange={(e) => setF({ ...f, vulnerable_count: e.target.value })}
                      placeholder="e.g. 2"
                    />
                  </label>
                </div>
              </div>

              {/* STEP 4: ADDRESS & NEEDS */}
              <div className="relief-section-title">
                <span className="relief-step-num">4</span>
                <span>Detailed Location & Immediate Needs</span>
              </div>

              <label className="field">
                Address & Specific Relief Requirements
                <textarea
                  required
                  rows="4"
                  value={f.address_details}
                  onChange={(e) => setF({ ...f, address_details: e.target.value })}
                  placeholder="Include Village, Union Parishad, Ward number, nearby shelter/landmark (e.g. Near Govt High School), and specific items needed (cooked food, water purification tablets, saline, dry rice)..."
                />
              </label>

              {/* STEP 5: ASSISTANCE AMOUNT */}
              <div className="relief-section-title">
                <span className="relief-step-num">5</span>
                <span>Estimated Cash Support Needed (Optional BDT)</span>
              </div>

              <label className="field">
                Amount in Bangladeshi Taka (BDT)
                <input
                  type="number"
                  min="0"
                  value={f.requested_amount}
                  onChange={(e) => setF({ ...f, requested_amount: e.target.value })}
                  placeholder="Enter custom amount or pick quick amount below"
                />
              </label>

              <div className="amount-pills">
                {presets.map((val) => (
                  <button
                    key={val}
                    type="button"
                    className={`amount-pill-btn ${f.requested_amount === val ? 'active' : ''}`}
                    onClick={() => setF({ ...f, requested_amount: val })}
                  >
                    ৳{Number(val).toLocaleString()}
                  </button>
                ))}
              </div>

              {err && (
                <div className="alert alert-danger rounded-3 p-3 my-3 fw-semibold">
                  {err}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary w-100 rounded-pill py-3 fw-bold fs-6 mt-4 shadow d-flex align-items-center justify-content-center gap-2"
              >
                {loading ? (
                  <>
                    <RefreshCw size={18} className="spin" />
                    <span>Submitting Application...</span>
                  </>
                ) : (
                  <>
                    <HandHeart size={20} />
                    <span>Submit Verified Relief Application &rarr;</span>
                  </>
                )}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

