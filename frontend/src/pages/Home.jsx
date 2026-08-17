import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  Search, Flame, FileText, MapPin, Layers, Briefcase, GraduationCap,
  AlertTriangle, Eye, Calendar, Share2, Download,
  X, HeartHandshake, Sparkles, Filter, TrendingUp
} from 'lucide-react';
import api from '../services/api.js';
import {
  BANGLADESH_ARTICLES,
  BANGLADESH_DISASTERS,
  BANGLADESH_MOST_READ
} from '../data/bangladeshData.js';

// Format numbers in Bangladeshi locale
const fmt = (n) => new Intl.NumberFormat('en-BD', { maximumFractionDigits: 0 }).format(n || 0);

export default function Home() {
  const [searchParams] = useSearchParams();
  const queryParam = searchParams.get('q') || '';

  const [backendStats, setBackendStats] = useState({ totalDonations: 0, totalUsers: 0, approvedFamilies: 0 });
  const [districts, setDistricts] = useState([]);
  const [activeFilterPill, setActiveFilterPill] = useState('All');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Fetch backend public stats for Bangladesh flood relief database
  useEffect(() => {
    api.get('/public/stats')
      .then(r => setBackendStats(r.data))
      .catch(() => {});
    api.get('/public/district-donations')
      .then(r => setDistricts(r.data))
      .catch(() => {});
  }, []);

  // Filter Bangladesh articles dynamically
  const filteredArticles = BANGLADESH_ARTICLES.filter(article => {
    const matchesSearch = !queryParam ||
      article.title.toLowerCase().includes(queryParam.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(queryParam.toLowerCase()) ||
      article.district.toLowerCase().includes(queryParam.toLowerCase()) ||
      article.division.toLowerCase().includes(queryParam.toLowerCase()) ||
      article.source.toLowerCase().includes(queryParam.toLowerCase()) ||
      article.topic.toLowerCase().includes(queryParam.toLowerCase());

    const matchesFilterPill = activeFilterPill === 'All' ||
      article.topic.toLowerCase().includes(activeFilterPill.toLowerCase()) ||
      article.division.toLowerCase().includes(activeFilterPill.toLowerCase());

    return matchesSearch && matchesFilterPill;
  });

  // Split into 4 Featured items for 2x2 grid, and remaining for Secondary List
  const featuredArticles = filteredArticles.slice(0, 4);
  const secondaryArticles = filteredArticles.slice(4);

  return (
    <div className="rw-portal-container container">
      {/* Search Filter Active Bar */}
      {queryParam && (
        <div className="alert alert-info d-flex align-items-center justify-content-between mb-4 py-2 px-3 rounded-3 shadow-sm border-0 bg-white">
          <div className="d-flex align-items-center gap-2">
            <Filter size={18} className="text-primary" />
            <span className="text-dark">
              Search results for: <strong className="ms-1">"{queryParam}"</strong>
            </span>
          </div>
          <Link to="/" className="btn btn-sm btn-outline-secondary rounded-pill py-0 px-3 fs-7">
            Clear search
          </Link>
        </div>
      )}

      {/* Main Two-Column Layout (70% Main Content / 30% Sidebar) */}
      <div className="rw-two-column-grid">
        {/* ==================================================================
            MAIN CONTENT AREA (Left Column ~70%)
            ================================================================== */}
        <section className="rw-main-column">
          {/* Section Header */}
          <div className="rw-section-header">
            <h1 className="rw-section-title">
              <Sparkles size={22} className="text-success me-1" />
              Latest Bangladesh Headlines
            </h1>
            <Link to="/reports" className="rw-view-all-link text-decoration-none">
              View all headlines &rarr;
            </Link>
          </div>

          {/* Quick Filter Pills Bar */}
          <div className="rw-filter-bar">
            {['All', 'Sylhet Division', 'Floods', 'Health & Hygiene', 'Emergency Appeals', 'Food Security', 'Shelter & Safety'].map(pill => (
              <button
                key={pill}
                className={`rw-filter-pill ${activeFilterPill === pill ? 'active' : ''}`}
                onClick={() => setActiveFilterPill(pill)}
              >
                {pill}
              </button>
            ))}
          </div>

          {/* 2x2 Featured Grid of Bangladesh News Cards -> Direct Navigation to /reports/:id */}
          {featuredArticles.length > 0 ? (
            <div className="rw-featured-grid">
              {featuredArticles.map(art => (
                <Link to={`/reports/${art.id}`} key={art.id} className="text-decoration-none">
                  <article className="rw-news-card h-100">
                    <div className="rw-card-image-wrap">
                      <img src={art.image} alt={art.title} className="rw-card-image" loading="lazy" />
                      <span className={`rw-card-category-badge ${art.isAlert ? 'alert' : ''}`}>
                        {art.topic}
                      </span>
                      <span className="rw-card-division-badge">
                        <MapPin size={11} className="me-1" />{art.district}
                      </span>
                    </div>
                    <div className="rw-card-body">
                      <h2 className="rw-card-title">{art.title}</h2>
                      <p className="rw-card-excerpt">{art.excerpt}</p>
                      <div className="rw-card-footer">
                        <span className="rw-source-pill">{art.source}</span>
                        <div className="d-flex align-items-center gap-2">
                          <span className="rw-card-date">{art.date}</span>
                          <span>&bull;</span>
                          <span>{art.readTime}</span>
                        </div>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          ) : (
            <div className="card p-5 text-center my-4 border-light shadow-sm">
              <Search size={40} className="mx-auto text-muted mb-3" />
              <h4>No Bangladesh reports match your search filter</h4>
              <p className="text-muted">Try searching another district, division, or clearing selected filters.</p>
              <button
                className="btn btn-outline-primary rounded-pill mx-auto px-4 mt-2"
                onClick={() => setActiveFilterPill('All')}
              >
                Reset filters
              </button>
            </div>
          )}

          {/* Secondary News List -> Direct Navigation to /reports/:id */}
          {secondaryArticles.length > 0 && (
            <div className="mt-4">
              <div className="d-flex align-items-center justify-content-between mb-3 pb-2 border-bottom">
                <h3 className="h6 text-uppercase fw-bold text-muted mb-0" style={{ letterSpacing: '0.06em' }}>
                  More District Situation Reports & Updates
                </h3>
                <Link to="/reports" className="small text-primary fw-semibold">View all reports &rarr;</Link>
              </div>

              <div className="rw-secondary-list">
                {secondaryArticles.map(art => (
                  <Link to={`/reports/${art.id}`} key={art.id} className="text-decoration-none">
                    <article className="rw-list-card">
                      <div className="rw-list-thumb-wrap">
                        <img src={art.image} alt={art.title} className="rw-list-thumb" loading="lazy" />
                      </div>
                      <div className="rw-list-content">
                        <div className="rw-list-meta-top">
                          <span className="rw-list-tag">{art.topic}</span>
                          <span>&bull;</span>
                          <span className="fw-semibold text-dark"><MapPin size={12} className="me-1 text-danger" />{art.district}</span>
                        </div>
                        <h3 className="rw-list-title">{art.title}</h3>
                        <p className="rw-list-excerpt">{art.excerpt}</p>
                        <div className="rw-list-meta-bottom">
                          <span className="rw-source-pill">{art.source}</span>
                          <span>{art.date}</span>
                          <span>&bull;</span>
                          <span className="d-flex align-items-center gap-1">
                            <Eye size={12} /> {art.views}
                          </span>
                        </div>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Integrated Live Financial Tracking (FTS) Banner for Bangladesh */}
          <section className="mt-5 pt-3">
            <div className="bg-white p-4 rounded-3 border shadow-sm" style={{ borderLeft: '4px solid #00A389' }}>
              <div className="d-flex align-items-center justify-content-between flex-wrap gap-2 mb-3">
                <div>
                  <span className="rw-list-tag text-teal fw-bold fs-7">BANGLADESH FINANCIAL TRACKING SERVICE (FTS)</span>
                  <h3 className="h5 fw-bold text-dark mb-0">Aggregate Public Flood Relief Contributions</h3>
                </div>
                <Link to="/donate" className="btn btn-sm btn-primary rounded-pill px-3">
                  Record Aid Payment &rarr;
                </Link>
              </div>

              <div className="row g-3 text-center my-2">
                <div className="col-4 border-end">
                  <div className="h4 fw-extrabold text-primary mb-0">৳{fmt(backendStats.totalDonations)}</div>
                  <div className="small text-muted fw-semibold">Public Aid Raised</div>
                </div>
                <div className="col-4 border-end">
                  <div className="h4 fw-extrabold text-dark mb-0">{fmt(backendStats.approvedFamilies)}</div>
                  <div className="small text-muted fw-semibold">Verified Families Assisted</div>
                </div>
                <div className="col-4">
                  <div className="h4 fw-extrabold text-success mb-0">{fmt(backendStats.totalUsers)}</div>
                  <div className="small text-muted fw-semibold">Registered Citizens</div>
                </div>
              </div>

              {districts.length > 0 && (
                <div className="mt-3 pt-3 border-top">
                  <div className="small text-uppercase fw-bold text-muted mb-2">District Allocation Progress</div>
                  <div className="d-flex flex-wrap gap-2">
                    {districts.slice(0, 5).map(d => (
                      <Link key={d.district_id} to="/districts" className="badge bg-light text-dark border p-2 fw-medium text-decoration-none hover-shadow">
                        <MapPin size={12} className="text-danger me-1" />
                        {d.district_name}: <b>৳{fmt(d.total_donated)}</b>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </section>
        </section>

        {/* ==================================================================
            SIDEBAR (Right Column ~30%)
            ================================================================== */}
        <aside className="rw-sidebar">
          {/* Widget 1: Recent Disasters -> Navigate to /disasters/:id */}
          <div className="rw-widget">
            <div className="rw-widget-header">
              <h2 className="rw-widget-title">
                <AlertTriangle size={18} className="text-danger" />
                Recent Disasters (BD)
              </h2>
              <Link to="/disasters" className="small text-primary fw-semibold">View all &rarr;</Link>
            </div>
            <div className="rw-disaster-list">
              {BANGLADESH_DISASTERS.map(d => (
                <Link key={d.id} to={`/disasters/${d.id}`} className="text-decoration-none">
                  <div className="rw-disaster-item">
                    <div className="rw-disaster-icon">
                      <Flame size={16} />
                    </div>
                    <div className="rw-disaster-info">
                      <div className="rw-disaster-name">{d.title}</div>
                      <div className="rw-disaster-meta">
                        <span>{d.date}</span>
                        <span>&bull;</span>
                        <span className="rw-disaster-status">{d.status}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Widget 2: Latest Field Journal Blog -> Navigate to /reports/art-1 */}
          <div className="rw-widget">
            <div className="rw-widget-header">
              <h2 className="rw-widget-title">
                <FileText size={18} className="text-primary" />
                Field Journal (BD)
              </h2>
            </div>
            <Link to="/reports/art-1" className="text-decoration-none">
              <div className="rw-blog-card">
                <img
                  src="https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?q=80&w=600&auto=format&fit=crop"
                  alt="Field blog"
                  className="rw-blog-img"
                  loading="lazy"
                />
                <div className="rw-blog-body">
                  <h3 className="rw-blog-title">
                    Navigating Boats to Deliver Pure Drinking Water in Sunamganj
                  </h3>
                  <p className="rw-blog-excerpt">
                    Steering solar-powered filtration pumps through submerged union pathways to ensure children get contamination-free drinking water.
                  </p>
                  <div className="rw-blog-meta">
                    <span>Dr. Tasneem Farooq, BDRCS</span>
                    <span>15 Aug 2026</span>
                  </div>
                </div>
              </div>
            </Link>
          </div>

          {/* Widget 3: Opportunities Box -> Direct Navigation to /jobs and /training */}
          <div className="rw-widget rw-opportunities-widget">
            <div className="rw-widget-header">
              <h2 className="rw-widget-title">
                <Briefcase size={18} className="text-info" />
                Opportunities Box (BD)
              </h2>
            </div>
            <div className="rw-opp-stats">
              <Link to="/jobs" className="text-decoration-none">
                <div className="rw-opp-stat-card">
                  <Briefcase size={22} className="rw-opp-icon" />
                  <div className="rw-opp-num">1,083</div>
                  <div className="rw-opp-label">Open BD Jobs</div>
                </div>
              </Link>
              <Link to="/training" className="text-decoration-none">
                <div className="rw-opp-stat-card">
                  <GraduationCap size={22} className="rw-opp-icon" />
                  <div className="rw-opp-num">1,224</div>
                  <div className="rw-opp-label">Training Courses</div>
                </div>
              </Link>
            </div>
            <div className="rw-opp-actions">
              <Link to="/jobs" className="rw-btn-opp-primary">
                <Briefcase size={15} />
                <span>Explore Relief Jobs</span>
              </Link>
              <Link to="/training" className="rw-btn-opp-secondary">
                <GraduationCap size={15} />
                <span>View Training Courses</span>
              </Link>
            </div>
          </div>

          {/* Widget 4: Most Read Bangladesh Reports -> Direct Navigation to /reports/art-1 */}
          <div className="rw-widget">
            <div className="rw-widget-header">
              <h2 className="rw-widget-title">
                <TrendingUp size={18} className="text-success" />
                Most Read (24 Hours)
              </h2>
            </div>
            <div className="rw-most-read-list">
              {BANGLADESH_MOST_READ.map((mr, idx) => (
                <Link to="/reports/art-1" key={mr.id} className="text-decoration-none">
                  <div className="rw-most-read-item">
                    <div className="rw-rank-num">{idx + 1}</div>
                    <div className="rw-most-read-content">
                      <div className="rw-most-read-title">{mr.title}</div>
                      <div className="rw-most-read-meta">
                        <span className="rw-source-pill">{mr.source}</span>
                        <span>{mr.views}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
