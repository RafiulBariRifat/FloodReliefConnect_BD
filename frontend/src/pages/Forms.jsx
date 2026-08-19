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

function FormHero({ eyebrow, title, bnTitle, sub, bnSub }) {
  return (
    <section className="rw-page-hero rw-hero-forms">
      <div className="container">
        <span className="rw-hero-eyebrow">
          <Lock size={14} className="text-warning me-1.5" /> SECURE HUMANITARIAN PORTAL &bull; অত্যন্ত সুরক্ষিত ব্যবস্থা
        </span>
        <h1 className="rw-hero-title mb-2">
          {title}
          {bnTitle && <span className="d-block fs-3 fw-bold text-warning opacity-90 mt-1">{bnTitle}</span>}
        </h1>
        <p className="rw-hero-subtitle mb-1">{sub}</p>
        {bnSub && <p className="rw-hero-subtitle text-light opacity-80 small mt-1">{bnSub}</p>}
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
      <span className="fw-bold text-dark d-block">Affected District Location</span>
      <small className="text-muted d-block mb-1.5 font-size-xs">প্লাবিত জেলা নির্বাচন করুন</small>
      <select required value={value} onChange={(e) => onChange(e.target.value)}>
        <option value="">Choose a district location...</option>
        <option value="">General All-District Flood Relief Fund (সাধারণ ত্রাণ তহবিল)</option>
        {items.map((x) => (
          <option key={x.district_id} value={x.district_id}>
            {x.district_name} District ({x.district_name} জেলা)
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
        bnTitle="বন্যা দুর্গতদের সাহায্যার্থে অনুদান দিন"
        sub="Directly fund emergency relief operations across Bangladesh's flood-affected districts."
        bnSub="আপনার অনুদান সরাসরি প্লাবিত এলাকার অসহায় মানুষদের বেঁচে থাকার রসদ জোগাবে।"
      />
      <div className="container narrow">
        <div className="form-card bg-white p-4 p-md-5 rounded-4 border shadow-sm">
          <div className="d-flex align-items-center gap-2 mb-4 pb-3 border-bottom text-success fw-bold fs-6">
            <HeartHandshake size={22} className="text-success" />
            <span>Verified Encrypted Payment Ledger &bull; অনুদান রেজিস্টার</span>
          </div>

          <form onSubmit={submit}>
            <Districts value={f.district_id} onChange={(v) => setF({ ...f, district_id: v })} />

            <div className="row g-3">
              <div className="col-md-6">
                <label className="field">
                  <span className="fw-bold text-dark d-block">Donation Amount (BDT ৳)</span>
                  <small className="text-muted d-block mb-1.5 font-size-xs">অনুদানের পরিমাণ</small>
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
                  <span className="fw-bold text-dark d-block">Payment Gateway</span>
                  <small className="text-muted d-block mb-1.5 font-size-xs">পেমেন্ট মাধ্যম</small>
                  <select value={f.payment_method} onChange={(e) => setF({ ...f, payment_method: e.target.value })}>
                    {['bKash', 'Nagad', 'Rocket', 'Bank Transfer'].map((x) => (
                      <option key={x}>{x}</option>
                    ))}
                  </select>
                </label>
              </div>
            </div>

            <label className="field mt-3">
              <span className="fw-bold text-dark d-block">Transaction Reference ID</span>
              <small className="text-muted d-block mb-1.5 font-size-xs">ট্রানজেকশন আইডি (bKash/Nagad/Rocket Reference)</small>
              <input
                required
                value={f.transaction_id}
                onChange={(e) => setF({ ...f, transaction_id: e.target.value })}
                placeholder="e.g. BK7A2L9X"
              />
            </label>

            {status && (
              <div className="alert alert-success rounded-3 p-3 my-3 fw-semibold small">
                <CheckCircle2 size={18} className="me-2 text-success" />
                {status}
              </div>
            )}

            <button className="btn btn-primary w-100 rounded-pill py-3 fw-bold fs-6 mt-4 shadow-sm">
              Confirm & Record Donation Receipt &rarr;
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
    family_members: '',
    vulnerable_count: '',
    address_details: '',
    urgency_level: 'High',
    requested_amount: ''
  });
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState('');
  const [submittedData, setSubmittedData] = useState(null);
  const { flash } = useAuth();

  const presets = ['2000', '5000', '10000', '15000', '20000'];
  const quickNeeds = [
    { label: '🍞 Dry Food / শুকনা খাবার', text: 'Emergency Dry Food Packs (শুকনা খাবার)' },
    { label: '💧 Water Purification / বিশদ্ধ পানি', text: 'Water Purification Tablets & Clean Water (বিশদ্ধ খাবার পানি)' },
    { label: '💊 Essential Medicine / ওষুধ ও স্যালাইন', text: 'ORSaline & First Aid Medicines (জরুরি ওষুধ ও স্যালাইন)' },
    { label: '⛺ Tarpaulin Shelter / ত্রিপল ও তাবু', text: 'Tarpaulin & Emergency Shelter Kit (ত্রিপল ও তাবু)' },
    { label: '👶 Baby Milk & Food / শিশুখাদ্য', text: 'Baby Food & Infant Nutrition (শিশুখাদ্য)' },
    { label: '👕 Clothes & Blanket / কম্বল ও কাপড়', text: 'Dry Clothing & Winter Blankets (কাপড় ও কম্বল)' }
  ];

  const adjustCount = (field, delta) => {
    const current = parseInt(f[field] || '0', 10);
    const next = Math.max(0, current + delta);
    setF({ ...f, [field]: next.toString() });
  };

  const handleQuickNeedClick = (text) => {
    if (!f.address_details.includes(text)) {
      const updated = f.address_details ? `${f.address_details}, ${text}` : text;
      setF({ ...f, address_details: updated });
    }
  };

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
      family_members: '',
      vulnerable_count: '',
      address_details: '',
      urgency_level: 'High',
      requested_amount: ''
    });
  };

  return (
    <div className="rw-page-canvas-forms">
      <FormHero
        title="Request Verified Flood Relief Assistance"
        bnTitle="জরুরি বন্যা ত্রাণ ও আর্থিক সহায়তার আবেদন"
        sub="Connect directly with verified district coordinators and relief response teams."
        bnSub="আপনার আবেদন সরাসরি জেলা ত্রাণ টিমের কাছে পৌঁছাবে — দ্রুত সহায়তার সর্বোচ্চ চেষ্টা।"
      />
      <div className="container narrow">
        {submittedData ? (
          <div className="bg-white p-4 p-md-5 rounded-4 border shadow-sm text-center">
            <div className="d-inline-flex align-items-center justify-content-center bg-success bg-opacity-10 text-success rounded-circle p-3 mb-3" style={{ width: '72px', height: '72px' }}>
              <CheckCircle2 size={42} />
            </div>
            <h2 className="h4 fw-extrabold text-dark mb-2">Application Submitted Successfully</h2>
            <p className="text-secondary small max-w-md mx-auto mb-2">
              Your request for emergency flood assistance has been recorded in our encrypted ledger.
            </p>
            <div className="p-2 bg-success bg-opacity-10 rounded-3 text-success fw-bold small max-w-md mx-auto mb-4">
              আপনার প্রতিটি আবেদন সর্বোচ্চ অগ্রাধিকারের ভিত্তিতে দ্রুততম সময়ে প্রসেস করা হচ্ছে।
            </div>

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
            <div className="step-progress-bar">
              <div className="step-node active">
                <div className="step-circle">1</div>
                <span className="step-label">Urgency</span>
              </div>
              <div className="step-node active">
                <div className="step-circle">2</div>
                <span className="step-label">District</span>
              </div>
              <div className="step-node active">
                <div className="step-circle">3</div>
                <span className="step-label">Family</span>
              </div>
              <div className="step-node active">
                <div className="step-circle">4</div>
                <span className="step-label">Needs</span>
              </div>
              <div className="step-node active">
                <div className="step-circle">5</div>
                <span className="step-label">Grant Claim</span>
              </div>
            </div>

            <div className="privacy-banner">
              <ShieldCheck size={26} className="flex-shrink-0 text-success me-2" />
              <div>
                <strong className="d-block text-dark">Confidential & Encrypted Relief Portal</strong>
                <span className="text-secondary small">আপনার সকল তথ্য সম্পূর্ণ সুরক্ষিত। শুধুমাত্র অনুমোদিত ত্রাণ টিম আপনার যোগাযোগের ঠিকানা ও অবস্থান দেখতে পাবে।</span>
              </div>
            </div>

            <form onSubmit={submit}>
              <div className="relief-section-title">
                <span className="relief-step-num">1</span>
                <div>
                  <span className="fw-bold d-block">Select Emergency Level & Priority</span>
                  <small className="text-muted font-size-xs fw-normal">জরুরি প্রয়োজনের তীব্রতা নির্বাচন করুন</small>
                </div>
              </div>

              <div className="urgency-grid">
                <div
                  className={`urgency-tile critical ${f.urgency_level === 'Critical' ? 'selected' : ''}`}
                  onClick={() => setF({ ...f, urgency_level: 'Critical' })}
                >
                  <div className="urgency-header">
                    <span className="urgency-title d-flex align-items-center gap-1.5">
                      🔴 Critical Level {f.urgency_level === 'Critical' && <CheckCircle2 size={16} className="text-danger" />}
                    </span>
                    <AlertTriangle size={18} className="text-danger" />
                  </div>
                  <p className="urgency-desc">Submerged home, immediate life safety, stranded families. <span className="d-block text-muted font-size-xs mt-1">ভিটেমাটি প্লাবিত, পানিবন্দি পরিবার ও জীবন রক্ষা।</span></p>
                </div>

                <div
                  className={`urgency-tile high ${f.urgency_level === 'High' ? 'selected' : ''}`}
                  onClick={() => setF({ ...f, urgency_level: 'High' })}
                >
                  <div className="urgency-header">
                    <span className="urgency-title d-flex align-items-center gap-1.5">
                      🟡 High Priority {f.urgency_level === 'High' && <CheckCircle2 size={16} className="text-warning" />}
                    </span>
                    <HandHeart size={18} className="text-warning" />
                  </div>
                  <p className="urgency-desc">Urgent food packs, clean drinking water, ORSaline, baby milk. <span className="d-block text-muted font-size-xs mt-1">খাদ্য, বিশুদ্ধ পানি, স্যালাইন ও শিশুখাদ্য।</span></p>
                </div>

                <div
                  className={`urgency-tile moderate ${f.urgency_level === 'Moderate' ? 'selected' : ''}`}
                  onClick={() => setF({ ...f, urgency_level: 'Moderate' })}
                >
                  <div className="urgency-header">
                    <span className="urgency-title d-flex align-items-center gap-1.5">
                      🟢 Moderate Support {f.urgency_level === 'Moderate' && <CheckCircle2 size={16} className="text-success" />}
                    </span>
                    <Home size={18} className="text-success" />
                  </div>
                  <p className="urgency-desc">Post-flood rehabilitation, dry rations, structural repairs. <span className="d-block text-muted font-size-xs mt-1">ঘরবাড়ি মেরামত ও জীবনযাত্রা স্বাভাবিকীকরণ।</span></p>
                </div>
              </div>

              <div className="relief-section-title">
                <span className="relief-step-num">2</span>
                <div>
                  <span className="fw-bold d-block">Select Affected District</span>
                  <small className="text-muted font-size-xs fw-normal">প্লাবিত জেলা বেছে নিন</small>
                </div>
              </div>

              <Districts value={f.district_id} onChange={(v) => setF({ ...f, district_id: v })} />

              <div className="relief-section-title">
                <span className="relief-step-num">3</span>
                <div>
                  <span className="fw-bold d-block">Household Size & Family Count</span>
                  <small className="text-muted font-size-xs fw-normal">পরিবারের সদস্য ও শিশু/বৃদ্ধ সংখ্যা</small>
                </div>
              </div>

              <div className="row g-3">
                <div className="col-md-6">
                  <label className="field">
                    <span className="fw-bold text-dark d-block">Total Family Members</span>
                    <small className="text-muted d-block mb-1.5 font-size-xs">পরিবারের মোট সদস্য সংখ্যা</small>
                    <div className="d-flex align-items-center gap-2 mt-1">
                      <button
                        type="button"
                        className="stepper-btn"
                        onClick={() => adjustCount('family_members', -1)}
                        disabled={parseInt(f.family_members || '0', 10) <= 1}
                      >
                        -
                      </button>
                      <input
                        type="number"
                        min="1"
                        required
                        className="text-center fw-bold fs-6 mb-0"
                        value={f.family_members}
                        onChange={(e) => setF({ ...f, family_members: e.target.value })}
                      />
                      <button
                        type="button"
                        className="stepper-btn"
                        onClick={() => adjustCount('family_members', 1)}
                      >
                        +
                      </button>
                    </div>
                  </label>
                </div>

                <div className="col-md-6">
                  <label className="field">
                    <span className="fw-bold text-dark d-block">Vulnerable Members</span>
                    <small className="text-muted d-block mb-1.5 font-size-xs">শিশু / বৃদ্ধ / অসুস্থ সদস্য সংখ্যা</small>
                    <div className="d-flex align-items-center gap-2 mt-1">
                      <button
                        type="button"
                        className="stepper-btn"
                        onClick={() => adjustCount('vulnerable_count', -1)}
                        disabled={parseInt(f.vulnerable_count || '0', 10) <= 0}
                      >
                        -
                      </button>
                      <input
                        type="number"
                        min="0"
                        className="text-center fw-bold fs-6 mb-0"
                        value={f.vulnerable_count}
                        onChange={(e) => setF({ ...f, vulnerable_count: e.target.value })}
                      />
                      <button
                        type="button"
                        className="stepper-btn"
                        onClick={() => adjustCount('vulnerable_count', 1)}
                      >
                        +
                      </button>
                    </div>
                  </label>
                </div>
              </div>

              <div className="relief-section-title">
                <span className="relief-step-num">4</span>
                <div>
                  <span className="fw-bold d-block">Detailed Location & Immediate Needs</span>
                  <small className="text-muted font-size-xs fw-normal">জরুরি সহায়তার বিবরণ ও যোগাযোগের ঠিকানা</small>
                </div>
              </div>

              <div className="mb-2">
                <span className="small text-muted fw-semibold d-block mb-1.5">⚡ Tap Quick Relief Chips to Add Automatically:</span>
                <div className="d-flex flex-wrap gap-2 mb-2.5">
                  {quickNeeds.map((qn, idx) => (
                    <button
                      key={idx}
                      type="button"
                      className={`quick-need-chip ${f.address_details.includes(qn.text) ? 'selected' : ''}`}
                      onClick={() => handleQuickNeedClick(qn.text)}
                    >
                      {qn.label}
                    </button>
                  ))}
                </div>
              </div>

              <label className="field">
                <span className="fw-bold text-dark d-block">Detailed Address & Special Needs</span>
                <small className="text-muted d-block mb-1.5 font-size-xs">গ্রাম, ইউনিয়ন পরিষদ, ওয়ার্ড নম্বর এবং নিকটস্থ স্থান উল্লেখ করুন</small>
                <textarea
                  required
                  rows="4"
                  value={f.address_details}
                  onChange={(e) => setF({ ...f, address_details: e.target.value })}
                  placeholder="Include Village, Union Parishad, Ward number, landmark, or mobile contact..."
                />
              </label>

              <div className="relief-section-title">
                <span className="relief-step-num">5</span>
                <div>
                  <span className="fw-bold d-block">Estimated Cash Support Grant Claim (BDT ৳)</span>
                  <small className="text-muted font-size-xs fw-normal">জরুরি নগদ আর্থিক সহায়তার দাবি</small>
                </div>
              </div>

              <label className="field">
                <span className="fw-bold text-dark d-block">Requested Cash Support Amount (BDT ৳)</span>
                <small className="text-muted d-block mb-1.5 font-size-xs">টাকার পরিমাণ নির্বাচন করুন অথবা টাইপ করুন</small>
                <input
                  type="number"
                  min="0"
                  value={f.requested_amount}
                  onChange={(e) => setF({ ...f, requested_amount: e.target.value })}
                  placeholder="Enter amount in BDT"
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

              <div className="summary-preview-card">
                <div className="d-flex align-items-center justify-content-between mb-2">
                  <b className="text-dark small d-flex align-items-center gap-1.5">
                    <FileText size={15} className="text-success" /> Application Verification Summary
                  </b>
                  <span className="badge bg-success bg-opacity-10 text-success fw-bold">Ready to Submit</span>
                </div>
                <div className="row g-2 small text-secondary">
                  <div className="col-6 col-sm-3">
                    <span className="text-muted d-block">Priority / জরুরি অবস্থা</span>
                    <b className={f.urgency_level === 'Critical' ? 'text-danger' : f.urgency_level === 'High' ? 'text-warning' : 'text-success'}>
                      ● {f.urgency_level}
                    </b>
                  </div>
                  <div className="col-6 col-sm-3">
                    <span className="text-muted d-block">Household / সদস্য</span>
                    <b className="text-dark">{f.family_members || '0'} Persons</b>
                  </div>
                  <div className="col-6 col-sm-3">
                    <span className="text-muted d-block">Vulnerable / শিশু-বৃদ্ধ</span>
                    <b className="text-dark">{f.vulnerable_count || '0'} Members</b>
                  </div>
                  <div className="col-6 col-sm-3">
                    <span className="text-muted d-block">Grant Claim / নগদ দাবি</span>
                    <b className="text-success">৳{f.requested_amount ? Number(f.requested_amount).toLocaleString() : '0'}</b>
                  </div>
                </div>
              </div>

              {err && (
                <div className="alert alert-danger rounded-3 p-3 my-3 fw-semibold">
                  {err}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary w-100 rounded-pill py-3 fw-bold fs-6 mt-3 shadow d-flex align-items-center justify-content-center gap-2"
              >
                {loading ? (
                  <>
                    <RefreshCw size={18} className="spin" />
                    <span>Submitting Application / আবেদন জমা হচ্ছে...</span>
                  </>
                ) : (
                  <>
                    <HandHeart size={20} />
                    <span>Submit Verified Relief Application / জরুরি আবেদন জমা দিন &rarr;</span>
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

