import { useRef, useState } from 'react';
import { Camera, UserRound, CheckCircle2, ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';

export default function Profile() {
  const { user, updateUser } = useAuth();
  const [f, setF] = useState({ full_name: user.full_name, phone_number: user.phone_number, profile_image: user.profile_image || '' });
  const [message, setMessage] = useState('');
  const input = useRef();

  const choose = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) return setMessage('Please choose a valid image file (JPG, PNG, or WEBP).');
    if (file.size > 2 * 1024 * 1024) return setMessage('Choose an image smaller than 2 MB.');
    const reader = new FileReader();
    reader.onload = () => setF({ ...f, profile_image: reader.result });
    reader.readAsDataURL(file);
  };

  const submit = async (e) => {
    e.preventDefault();
    try {
      await updateUser(f);
      setMessage('Your profile details have been saved successfully.');
    } catch (e) {
      setMessage(e.message);
    }
  };

  return (
    <div className="rw-page-canvas-jobs">
      {/* Unique Hero Banner for Profile */}
      <section className="rw-page-hero rw-hero-profile">
        <div className="container">
          <span className="rw-hero-eyebrow">
            <ShieldCheck size={14} className="text-info" /> USER ACCOUNT SETTINGS
          </span>
          <h1 className="rw-hero-title">My Profile Details</h1>
          <p className="rw-hero-subtitle">
            Update your full name, mobile contact number, or upload a new profile avatar image anytime.
          </p>
        </div>
      </section>

      <div className="container narrow">
        <div className="form-card bg-white p-4 p-md-5 rounded-3 border shadow-sm">
          <form onSubmit={submit}>
            <div className="profile-photo text-center mb-4">
              <button type="button" className="photo-button mx-auto" onClick={() => input.current.click()}>
                {f.profile_image ? (
                  <img src={f.profile_image} alt="Your profile" />
                ) : (
                  <UserRound size={44} className="text-muted" />
                )}
                <span>
                  <Camera size={14} /> Change photo
                </span>
              </button>
              <input ref={input} className="d-none" type="file" accept="image/*" onChange={choose} />
              <small className="text-muted d-block mt-2">JPG, PNG, or WEBP. Maximum 2 MB.</small>
            </div>

            <label className="field">
              Full Name
              <input required value={f.full_name} onChange={(e) => setF({ ...f, full_name: e.target.value })} />
            </label>

            <label className="field">
              Email Address (Account ID)
              <input disabled value={user.email} className="bg-light text-muted" />
            </label>

            <label className="field">
              Mobile Contact Number
              <input required value={f.phone_number} onChange={(e) => setF({ ...f, phone_number: e.target.value })} />
            </label>

            {message && (
              <div className="alert alert-info rounded-3 p-3 my-3 fw-semibold">
                <CheckCircle2 size={18} className="me-2 text-success" />
                {message}
              </div>
            )}

            <button className="btn btn-primary rounded-pill px-5 py-2.5 fw-bold w-100 mt-3">
              Save Profile Changes &rarr;
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
