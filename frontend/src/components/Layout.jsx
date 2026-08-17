import { useState } from 'react';
import { Link, NavLink, useNavigate, useSearchParams } from 'react-router-dom';
import {
  Search, X, UserRound, LogOut, ShieldCheck, Menu, AlertTriangle,
  FileText, Flame, MapPin, Layers, Briefcase, GraduationCap,
  HeartHandshake, ExternalLink, Activity, Info
} from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';

export function Layout({ children }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get('q') || '');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showAlert, setShowAlert] = useState(true);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/reports?q=${encodeURIComponent(searchTerm.trim())}`);
    } else {
      navigate('/reports');
    }
  };

  const clearSearch = () => {
    setSearchTerm('');
    navigate('/reports');
  };

  return (
    <>
      {/* Top Header Bar */}
      <header className="rw-top-bar">
        <div className="container d-flex align-items-center justify-content-between gap-3">
          {/* Logo & Branding */}
          <Link to="/" className="rw-brand-logo">
            <div className="rw-logo-icon">
              <Activity size={24} />
            </div>
            <div className="rw-brand-text">
              <span className="rw-brand-name">
                ReliefWeb<span>BD</span> <small>BANGLADESH</small>
              </span>
              <span className="rw-brand-tagline">National Humanitarian Information Service</span>
            </div>
          </Link>

          {/* Global Search Bar */}
          <form className="rw-search-form d-none d-md-block" onSubmit={handleSearchSubmit}>
            <input
              type="text"
              className="rw-search-input"
              placeholder="Search Bangladesh reports, flood districts, organizations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              aria-label="Search Bangladesh reports and disaster updates"
            />
            <Search className="rw-search-icon" size={17} />
            {searchTerm && (
              <button type="button" className="rw-search-clear" onClick={clearSearch} title="Clear search">
                <X size={16} />
              </button>
            )}
          </form>

          {/* Top Actions & Auth */}
          <div className="rw-top-actions">
            <Link to="/donate" className="rw-btn-accent">
              <HeartHandshake size={16} />
              <span>Donate Flood Aid</span>
            </Link>

            {user ? (
              <div className="d-flex align-items-center gap-2">
                <Link to="/profile" className="rw-user-pill" title="View Profile">
                  {user.profile_image ? (
                    <img src={user.profile_image} alt={user.full_name} />
                  ) : (
                    <UserRound size={16} />
                  )}
                  <span className="d-none d-lg-inline">{user.full_name.split(' ')[0]}</span>
                </Link>

                <button onClick={logout} className="rw-btn-outline-light" title="Sign Out">
                  <LogOut size={15} />
                  <span className="d-none d-lg-inline">Logout</span>
                </button>
              </div>
            ) : (
              <div className="d-flex align-items-center gap-2">
                <Link to="/login" className="rw-btn-outline-light">
                  Sign in
                </Link>
                <Link to="/register" className="rw-btn-outline-light d-none d-sm-inline-flex">
                  Create account
                </Link>
              </div>
            )}

            {/* Mobile Nav Toggle */}
            <button
              className="btn btn-sm text-white d-lg-none p-1 border-0 ms-1"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="container d-md-none mt-2">
          <form className="rw-search-form" onSubmit={handleSearchSubmit}>
            <input
              type="text"
              className="rw-search-input"
              placeholder="Search Bangladesh reports, flood districts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              aria-label="Search Bangladesh reports and disaster updates"
            />
            <Search className="rw-search-icon" size={17} />
            {searchTerm && (
              <button type="button" className="rw-search-clear" onClick={clearSearch} title="Clear search">
                <X size={16} />
              </button>
            )}
          </form>
        </div>
      </header>

      {/* Main Navigation Bar — Dedicated Routes */}
      <nav className="rw-main-nav">
        <div className="container">
          <div className={`rw-nav-collapse ${isMobileMenuOpen ? 'd-block' : 'd-none d-lg-block'}`}>
            <ul className="rw-nav-list">
              <li className="rw-nav-item">
                <NavLink to="/reports" className={({ isActive }) => `rw-nav-link ${isActive ? 'active' : ''}`}>
                  <FileText size={16} />
                  <span>Reports</span>
                </NavLink>
              </li>
              <li className="rw-nav-item">
                <NavLink to="/disasters" className={({ isActive }) => `rw-nav-link ${isActive ? 'active' : ''}`}>
                  <Flame size={16} />
                  <span>Disasters</span>
                </NavLink>
              </li>
              <li className="rw-nav-item">
                <NavLink to="/districts" className={({ isActive }) => `rw-nav-link ${isActive ? 'active' : ''}`}>
                  <MapPin size={16} />
                  <span>Districts & Divisions</span>
                </NavLink>
              </li>
              <li className="rw-nav-item">
                <NavLink to="/topics" className={({ isActive }) => `rw-nav-link ${isActive ? 'active' : ''}`}>
                  <Layers size={16} />
                  <span>Topics</span>
                </NavLink>
              </li>
              <li className="rw-nav-item">
                <NavLink to="/jobs" className={({ isActive }) => `rw-nav-link ${isActive ? 'active' : ''}`}>
                  <Briefcase size={16} />
                  <span>Jobs (BD)</span>
                </NavLink>
              </li>
              <li className="rw-nav-item">
                <NavLink to="/training" className={({ isActive }) => `rw-nav-link ${isActive ? 'active' : ''}`}>
                  <GraduationCap size={16} />
                  <span>Training (BD)</span>
                </NavLink>
              </li>

              {/* User Account Extras */}
              {user && (
                <>
                  <li className="rw-nav-item">
                    <NavLink to="/dashboard" className="rw-nav-link rw-nav-link-special">
                      Dashboard
                    </NavLink>
                  </li>
                  <li className="rw-nav-item">
                    <NavLink to="/apply-relief" className="rw-nav-link">
                      Seek Relief
                    </NavLink>
                  </li>
                  <li className="rw-nav-item">
                    <NavLink to="/history" className="rw-nav-link">
                      My Activity
                    </NavLink>
                  </li>
                  {user.role === 'admin' && (
                    <li className="rw-nav-item">
                      <NavLink to="/admin" className="rw-nav-link text-warning">
                        <ShieldCheck size={16} /> Admin Portal
                      </NavLink>
                    </li>
                  )}
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>

      {/* Slim Emergency Ticker Bar */}
      {showAlert && (
        <div className="rw-announcement-bar">
          <div className="container">
            <div className="rw-announcement-content">
              <div className="rw-announcement-left">
                <span className="rw-alert-badge">
                  <AlertTriangle size={12} className="me-1" /> EMERGENCY ALERT
                </span>
                <span className="rw-announcement-text">
                  Surma, Kushiara & Jamuna Rivers Flow Above Danger Levels in Sylhet, Sunamganj & Kurigram — Rapid Relief Operations Active.
                  <Link to="/disasters/dis-1" className="rw-announcement-link">
                    View Press Update & Situation Report &rarr;
                  </Link>
                </span>
              </div>
              <button
                className="btn btn-sm p-0 text-white border-0 opacity-75 opacity-100-hover"
                onClick={() => setShowAlert(false)}
                title="Dismiss alert"
              >
                <X size={16} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Body */}
      <main className="rw-main-body">{children}</main>

      {/* Bangladesh Multi-Column Deep Teal Footer */}
      <footer className="rw-footer">
        <div className="container">
          <div className="rw-footer-grid">
            {/* Column 1: About & Branding */}
            <div className="rw-footer-col rw-footer-about">
              <div className="d-flex align-items-center gap-2 mb-3">
                <div className="rw-logo-icon" style={{ width: '34px', height: '34px' }}>
                  <Activity size={18} />
                </div>
                <span className="rw-brand-name" style={{ fontSize: '1.25rem' }}>
                  ReliefWeb<span style={{ color: '#64D2EC' }}>BD</span>
                </span>
              </div>
              <p>
                Bangladesh\'s primary humanitarian information service on emergencies, monsoon floods, and coastal disasters.
                Providing verified updates to empower local decision-makers and rapid aid delivery.
              </p>
              <div className="rw-emergency-pills mt-2">
                <span className="rw-emergency-badge">BANGLADESH HOTLINES</span>
                <span className="text-white">Emergency: <b>999</b></span>
                <span>&bull;</span>
                <span className="text-white">Disaster: <b>1090</b></span>
                <span>&bull;</span>
                <span className="text-white">Agriculture: <b>16109</b></span>
              </div>
            </div>

            {/* Column 2: Services */}
            <div className="rw-footer-col">
              <h4>Response Services</h4>
              <ul className="rw-footer-links">
                <li><Link to="/reports">District Situation Reports</Link></li>
                <li><Link to="/disasters">Emergency Flood Appeals</Link></li>
                <li><Link to="/donate">Public Aid Ledger (FTS)</Link></li>
                <li><Link to="/apply-relief">Family Relief Application</Link></li>
                <li><Link to="/districts">GIS Water Level Tracker</Link></li>
              </ul>
            </div>

            {/* Column 3: Bangladesh Divisions */}
            <div className="rw-footer-col">
              <h4>Divisional Portals</h4>
              <ul className="rw-footer-links">
                <li><Link to="/districts/dist-1">Sylhet & Sunamganj Zone</Link></li>
                <li><Link to="/districts/dist-3">Chattogram & Feni Zone</Link></li>
                <li><Link to="/districts/dist-5">Rangpur & Kurigram Zone</Link></li>
                <li><Link to="/districts/dist-6">Barishal & Coastal Belt</Link></li>
                <li><Link to="/districts/dist-6">Cox\'s Bazar Relief Hub</Link></li>
              </ul>
            </div>

            {/* Column 4: Partner Agencies in BD */}
            <div className="rw-footer-col">
              <h4>Partner Agencies</h4>
              <ul className="rw-footer-links">
                <li><a href="https://www.unicef.org/bangladesh" target="_blank" rel="noreferrer">UNICEF Bangladesh <ExternalLink size={12} /></a></li>
                <li><a href="https://bdrcs.org" target="_blank" rel="noreferrer">BDRCS (Red Crescent) <ExternalLink size={12} /></a></li>
                <li><a href="https://www.brac.net" target="_blank" rel="noreferrer">BRAC Humanitarian <ExternalLink size={12} /></a></li>
                <li><a href="https://modmr.gov.bd" target="_blank" rel="noreferrer">MoDMR Bangladesh <ExternalLink size={12} /></a></li>
                <li><a href="http://ffwc.gov.bd" target="_blank" rel="noreferrer">Flood Forecasting (BWDB) <ExternalLink size={12} /></a></li>
              </ul>
            </div>

            {/* Column 5: About & Contact */}
            <div className="rw-footer-col">
              <h4>Information & Contact</h4>
              <ul className="rw-footer-links">
                <li><Link to="/topics">National Mission</Link></li>
                <li><Link to="/topics">Verification Standards</Link></li>
                <li><Link to="/reports">Submit Situation Update</Link></li>
                <li><Link to="/topics">Media Enquiries (Dhaka)</Link></li>
                <li><Link to="/topics">Contact Operations Desk</Link></li>
              </ul>
            </div>
          </div>

          {/* Footer Bottom Bar & Disclaimer */}
          <div className="rw-footer-bottom">
            <div className="rw-footer-disclaimer">
              <div className="d-flex align-items-center gap-2 mb-1">
                <Info size={15} style={{ color: '#00C896' }} />
                <b className="text-white">Ministry of Disaster Management & UN OCHA Bangladesh Alignment:</b>
              </div>
              ReliefWeb BD operates as a dedicated Bangladesh humanitarian aggregator portal. Information is continuously aggregated from verified national response entities, Red Crescent societies, government emergency centers, and international agencies operating across Bangladesh\'s 64 districts.
            </div>

            <div className="rw-footer-meta-bar">
              <div>
                &copy; 2026 ReliefWeb BD. Transparent Flood & Disaster Relief for Bangladesh.
              </div>
              <div className="d-flex align-items-center gap-3">
                <span className="badge bg-secondary bg-opacity-50 text-light fw-normal">WCAG 2.1 AAA Compliant</span>
                <span className="badge bg-secondary bg-opacity-50 text-light fw-normal">SSL Encrypted</span>
                <Link to="/" className="text-light text-decoration-none">Privacy Policy</Link>
                <span>&bull;</span>
                <Link to="/" className="text-light text-decoration-none">Terms of Service</Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
