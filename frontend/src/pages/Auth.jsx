import { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { Activity, Mail, CheckCircle2, ArrowLeft, KeyRound, RefreshCw, Lock } from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';
import api, { getError } from '../services/api.js';

export function Login() {
  const [f, setF] = useState({ email: '', password: '' });
  const [err, setErr] = useState('');
  const { login } = useAuth();
  const nav = useNavigate();
  const loc = useLocation();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const u = await login(f.email, f.password);
      nav(u.role === 'admin' ? '/admin' : loc.state?.from?.pathname || '/dashboard');
    } catch (e) {
      setErr(e.message);
    }
  };

  return (
    <AuthShell title="Welcome back" sub="Sign in to support your community, manage donations, or track your relief request.">
      <form onSubmit={submit}>
        <Field label="Email address" type="email" value={f.email} onChange={(v) => setF({ ...f, email: v })} />

        <div>
          <div className="d-flex align-items-center justify-content-between mb-1">
            <span className="small font-weight-bold text-dark">Password</span>
            <Link to="/forgot-password" className="small text-primary font-weight-bold text-decoration-none">
              Forgot password?
            </Link>
          </div>
          <input
            className="w-100 p-2.5 border rounded-3 mb-3"
            type="password"
            required
            value={f.password}
            onChange={(e) => setF({ ...f, password: e.target.value })}
            placeholder="Enter your password"
          />
        </div>

        {err && <p className="form-error">{err}</p>}
        <button className="btn btn-primary w-100 rounded-pill py-2.5 mt-2 fw-bold">Sign in</button>

        <p className="auth-foot mt-3">
          New to ReliefWeb BD? <Link to="/register">Create an account</Link>
        </p>
      </form>
    </AuthShell>
  );
}

export function Register() {
  const [f, setF] = useState({ full_name: '', email: '', phone_number: '', nid_number: '', password: '' });
  const [err, setErr] = useState('');
  const { register } = useAuth();
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      await register(f);
      nav('/dashboard');
    } catch (e) {
      setErr(e.message);
    }
  };

  return (
    <AuthShell title="Join the response" sub="A single account lets you donate aid or request verified flood assistance.">
      <form onSubmit={submit}>
        <Field label="Full name" value={f.full_name} onChange={(v) => setF({ ...f, full_name: v })} />
        <Field label="Email address" type="email" value={f.email} onChange={(v) => setF({ ...f, email: v })} />
        <Field label="Mobile number" value={f.phone_number} onChange={(v) => setF({ ...f, phone_number: v })} />
        <Field label="NID number (optional)" required={false} value={f.nid_number} onChange={(v) => setF({ ...f, nid_number: v })} />
        <Field label="Password" type="password" value={f.password} onChange={(v) => setF({ ...f, password: v })} />
        {err && <p className="form-error">{err}</p>}
        <button className="btn btn-primary w-100 rounded-pill py-2.5 mt-2 fw-bold">Create secure account</button>
        <p className="auth-foot">
          Already registered? <Link to="/login">Sign in</Link>
        </p>
      </form>
    </AuthShell>
  );
}

export function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [resetSuccess, setResetSuccess] = useState(false);
  const [resendStatus, setResendStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const { flash } = useAuth();

  const handleSendEmail = async (e) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    try {
      const { data } = await api.post('/auth/forgot-password', { email });
      setLoading(false);
      setSent(true);
      setResendStatus(data.message);
      if (flash) flash(data.message, 'success');
    } catch (error) { setLoading(false); if (flash) flash(getError(error), 'danger'); }
  };

  const handleResendCode = async () => {
    setLoading(true);
    try {
      const { data } = await api.post('/auth/forgot-password', { email });
      setLoading(false);
      setResendStatus(data.message);
      if (flash) flash(data.message, 'info');
    } catch (error) { setLoading(false); if (flash) flash(getError(error), 'danger'); }
  };

  const handleVerifyCode = async (e) => {
    e.preventDefault();
    if (!otpCode || !newPassword) return;
    setLoading(true);
    try {
      await api.post('/auth/reset-password', { email, code: otpCode, password: newPassword });
      setLoading(false);
      setResetSuccess(true);
      if (flash) flash('Password updated successfully! You can now sign in.', 'success');
    } catch (error) { setLoading(false); if (flash) flash(getError(error), 'danger'); }
  };

  return (
    <AuthShell title="Reset Password" sub="Enter your registered email address to receive a verification code via Gmail.">
      {!sent ? (
        <form onSubmit={handleSendEmail}>
          <div className="mb-3 text-center p-3 bg-light rounded-3 border">
            <KeyRound size={32} className="text-primary mb-2" />
            <p className="small text-muted mb-0">
              We will send a 6-digit verification code to your Gmail inbox.
            </p>
          </div>

          <Field
            label="Registered Gmail / Email Address"
            type="email"
            placeholder="e.g. user@gmail.com"
            value={email}
            onChange={(v) => setEmail(v)}
          />

          <button
            className="btn btn-primary w-100 rounded-pill py-2.5 mt-2 fw-bold d-flex align-items-center justify-content-center gap-2"
            disabled={loading}
          >
            <Mail size={16} />
            <span>{loading ? 'Sending Code...' : 'Send Verification Code to Gmail'}</span>
          </button>

          <p className="auth-foot mt-4">
            Remembered your password? <Link to="/login">Back to Sign in</Link>
          </p>
        </form>
      ) : !resetSuccess ? (
        <form onSubmit={handleVerifyCode}>
          <div className="text-center p-3 bg-success bg-opacity-10 border border-success rounded-3 mb-3">
            <CheckCircle2 size={36} className="text-success mb-2" />
            <h4 className="h6 fw-bold text-dark mb-1">Verification Code Sent!</h4>
            <p className="small text-muted mb-0">
              A 6-digit verification code was sent to <b>{email}</b>.
            </p>
          </div>

          {resendStatus && (
            <div className="alert alert-info py-2 px-3 small fw-bold rounded-3 mb-3 text-center">
              {resendStatus}
            </div>
          )}

          <div className="mb-3">
            <label className="field">
              Enter 6-Digit Gmail Code
              <input
                type="text"
                required
                maxLength={6}
                value={otpCode}
                onChange={(e) => setOtpCode(e.target.value)}
                placeholder="e.g. 582914"
                className="text-center font-monospace fs-5 fw-bold tracking-wider"
              />
            </label>
          </div>

          <div className="mb-3">
            <label className="field">
              Set New Password
              <input
                type="password"
                required
                minLength={6}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new strong password"
              />
            </label>
          </div>

          <button
            className="btn btn-primary w-100 rounded-pill py-2.5 fw-bold d-flex align-items-center justify-content-center gap-2 mb-3"
            disabled={loading}
          >
            <Lock size={16} />
            <span>{loading ? 'Updating Password...' : 'Verify Code & Reset Password'}</span>
          </button>

          <div className="d-flex align-items-center justify-content-between pt-2 border-top">
            <button
              type="button"
              className="btn btn-sm btn-link text-decoration-none fw-bold p-0 d-flex align-items-center gap-1"
              onClick={handleResendCode}
              disabled={loading}
            >
              <RefreshCw size={14} /> Resend code to Gmail
            </button>

            <Link to="/login" className="small text-muted font-weight-bold text-decoration-none">
              Back to Sign in
            </Link>
          </div>
        </form>
      ) : (
        <div className="text-center p-4 bg-success bg-opacity-10 border border-success rounded-3">
          <CheckCircle2 size={48} className="text-success mb-3" />
          <h3 className="h5 fw-extrabold text-dark mb-2">Password Reset Completed!</h3>
          <p className="small text-secondary mb-4">
            Your account password has been updated. You can now sign in with your new password.
          </p>

          <Link to="/login" className="btn btn-primary rounded-pill w-100 py-2.5 fw-bold">
            Sign In Now &rarr;
          </Link>
        </div>
      )}
    </AuthShell>
  );
}

function AuthShell({ title, sub, children }) {
  return (
    <main className="auth-page">
      <div className="auth-aside" style={{ background: 'linear-gradient(150deg, #0B3C5D, #005B7F)' }}>
        <div className="d-flex align-items-center gap-2 mb-4">
          <div className="rw-logo-icon" style={{ width: '36px', height: '36px' }}>
            <Activity size={20} />
          </div>
          <span className="rw-brand-name" style={{ fontSize: '1.3rem' }}>
            ReliefWeb<span style={{ color: '#64D2EC' }}>BD</span>
          </span>
        </div>
        <h1 className="fw-extrabold text-white">
          Informing<br />
          <em style={{ color: '#64D2EC' }}>Humanitarian</em><br />
          Decisions.
        </h1>
        <p className="mt-3" style={{ color: '#D1EAFA' }}>
          Transparent flood relief aggregator & emergency assistance network.
        </p>
      </div>
      <div className="auth-card">
        <h2 className="fw-bold">{title}</h2>
        <p>{sub}</p>
        {children}
      </div>
    </main>
  );
}

function Field({ label, onChange, required = true, ...props }) {
  return (
    <label className="field">
      {label}
      <input required={required} onChange={(e) => onChange(e.target.value)} {...props} />
    </label>
  );
}
