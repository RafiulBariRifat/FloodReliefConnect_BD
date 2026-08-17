import { Link } from 'react-router-dom';
import { Heart, HandHeart, ArrowRight, Clock3, ShieldCheck, Activity } from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';

export default function Dashboard() {
  const { user } = useAuth();
  const firstName = user?.full_name?.split(' ')[0] || 'User';

  return (
    <div className="rw-page-canvas-dashboard">
      {/* Unique Hero Banner for Dashboard */}
      <section className="rw-page-hero rw-hero-dashboard">
        <div className="container">
          <span className="rw-hero-eyebrow">
            <Activity size={14} className="text-warning" /> USER RESPONSE COMMAND HUB
          </span>
          <h1 className="rw-hero-title">Welcome Back, {firstName}!</h1>
          <p className="rw-hero-subtitle">
            Choose how you would like to participate in Bangladesh flood response today. Record a donation or apply for verified relief assistance.
          </p>

          <div className="d-flex align-items-center gap-3 mt-4 flex-wrap">
            <span className="badge bg-white bg-opacity-20 text-white fs-6 px-3 py-2 fw-semibold">
              <ShieldCheck size={16} className="me-1 text-info" /> Verified Account: {user?.email}
            </span>
          </div>
        </div>
      </section>

      <div className="container">
        {/* Action Cards Grid */}
        <div className="row g-4 mb-5">
          <div className="col-md-6">
            <Link className="rw-dashboard-card donate-theme" to="/donate">
              <div className="d-flex align-items-center justify-content-between mb-4">
                <div className="rw-logo-icon" style={{ width: '52px', height: '52px', background: 'rgba(255,255,255,0.2)' }}>
                  <Heart size={26} className="text-white" />
                </div>
                <span className="badge bg-white text-dark fw-extrabold px-3 py-1.5">Direct Aid</span>
              </div>
              <div className="rw-dashboard-card-tag">Support Flood Victims</div>
              <h2 className="rw-dashboard-card-title">Donate Flood Aid</h2>
              <div className="rw-dashboard-card-desc">
                Send support to a Bangladesh district or general relief fund <ArrowRight size={18} />
              </div>
            </Link>
          </div>

          <div className="col-md-6">
            <Link className="rw-dashboard-card relief-theme" to="/apply-relief">
              <div className="d-flex align-items-center justify-content-between mb-4">
                <div className="rw-logo-icon" style={{ width: '52px', height: '52px', background: 'rgba(255,255,255,0.2)' }}>
                  <HandHeart size={26} className="text-white" />
                </div>
                <span className="badge bg-white text-dark fw-extrabold px-3 py-1.5">Emergency Assistance</span>
              </div>
              <div className="rw-dashboard-card-tag">For Affected Families</div>
              <h2 className="rw-dashboard-card-title">Seek Flood Relief</h2>
              <div className="rw-dashboard-card-desc">
                Submit a private relief request for review <ArrowRight size={18} />
              </div>
            </Link>
          </div>
        </div>

        {/* Activity Summary Section */}
        <div className="bg-white p-4 p-md-5 rounded-3 border shadow-sm d-flex align-items-center justify-content-between flex-wrap gap-3">
          <div>
            <span className="eyebrow text-teal">PRIVATE ACTIVITY LEDGER</span>
            <h2 className="h4 fw-bold text-dark mb-1 d-flex align-items-center gap-2">
              <Clock3 size={22} className="text-primary" /> Keep your records safe & accessible
            </h2>
            <p className="text-muted mb-0">Your donations, payment receipts, and relief request statuses are available in your activity ledger.</p>
          </div>
          <Link to="/history" className="btn btn-outline-primary rounded-pill px-4 py-2 fw-bold">
            View My Activity History &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}
