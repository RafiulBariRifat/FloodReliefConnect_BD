import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Search, FileText, Calendar, MapPin, Download, ArrowLeft, Layers, BookOpen, ShieldAlert, BarChart2, ExternalLink, Globe } from 'lucide-react';
import { BANGLADESH_ARTICLES, HISTORIC_FLOOD_STATS, WIKIPEDIA_FLOOD_COMPENDIUM } from '../data/bangladeshData.js';

export default function Reports() {
  const [query, setQuery] = useState('');
  const [reportCategory, setReportCategory] = useState('All Reports');
  const [activeTab, setActiveTab] = useState('all'); // 'all' | 'wiki' | 'history'

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const categories = [
    'All Reports',
    'Wikipedia Archive',
    'Situation Reports',
    'Emergency Appeals',
    'Health Surveillance',
    'Food Distribution',
    'Shelter Assessments'
  ];

  const filtered = BANGLADESH_ARTICLES.filter(a => {
    const matchesQ = !query || a.title.toLowerCase().includes(query.toLowerCase()) || a.district.toLowerCase().includes(query.toLowerCase()) || a.fullContent.toLowerCase().includes(query.toLowerCase());
    const matchesCat = reportCategory === 'All Reports' || a.category === reportCategory;
    return matchesQ && matchesCat;
  });

  return (
    <div className="rw-page-canvas-reports">
      {/* Unique Professional Deep Teal Hero Banner */}
      <section className="rw-page-hero rw-hero-reports">
        <div className="container">
          <span className="rw-hero-eyebrow">
            <Layers size={14} className="text-info" /> SITUATION REPORTS & WIKIPEDIA FLOOD KNOWLEDGE HUB
          </span>
          <h1 className="rw-hero-title">Bangladesh Flood Reports & Wikipedia Encyclopedia</h1>
          <p className="rw-hero-subtitle">
            Explore live disaster SitReps alongside official Wikipedia hydrological analysis, 1954–2026 historic flood damage statistics, and upstream river basin data.
          </p>

          <div className="mt-4" style={{ maxWidth: '560px' }}>
            <div className="rw-search-form">
              <input
                type="text"
                className="rw-search-input bg-white text-dark border-0 shadow-lg"
                placeholder="Search reports, Wikipedia archives, districts, or upazilas..."
                value={query}
                onChange={e => setQuery(e.target.value)}
              />
              <Search className="rw-search-icon text-muted" size={17} />
            </div>
          </div>
        </div>
      </section>

      <div className="container">
        {/* Navigation View Mode Tabs */}
        <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-4">
          <div className="d-flex align-items-center gap-2 bg-white p-1.5 rounded-pill border shadow-sm" style={{ maxWidth: '520px', width: '100%' }}>
            <button
              className={`btn btn-sm rounded-pill px-3 py-2 flex-grow-1 fw-bold border-0 ${activeTab === 'all' ? 'btn-primary' : 'text-muted'}`}
              onClick={() => { setActiveTab('all'); setReportCategory('All Reports'); }}
            >
              <FileText size={15} className="me-1" /> SitReps & Articles ({BANGLADESH_ARTICLES.length})
            </button>
            <button
              className={`btn btn-sm rounded-pill px-3 py-2 flex-grow-1 fw-bold border-0 ${activeTab === 'wiki' ? 'btn-primary' : 'text-muted'}`}
              onClick={() => { setActiveTab('wiki'); setReportCategory('Wikipedia Archive'); }}
            >
              <BookOpen size={15} className="me-1" /> Wikipedia Hub
            </button>
            <button
              className={`btn btn-sm rounded-pill px-3 py-2 flex-grow-1 fw-bold border-0 ${activeTab === 'history' ? 'btn-primary' : 'text-muted'}`}
              onClick={() => setActiveTab('history')}
            >
              <BarChart2 size={15} className="me-1" /> Historic Stats (1954–2026)
            </button>
          </div>

          <a
            href="https://en.wikipedia.org/wiki/Floods_in_Bangladesh"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-sm btn-outline-secondary rounded-pill px-3 py-2 fw-semibold d-inline-flex align-items-center gap-1.5"
          >
            <Globe size={14} className="text-primary" />
            <span>Wikipedia Reference Source</span>
            <ExternalLink size={12} />
          </a>
        </div>

        {/* Wikipedia Knowledge Spotlight Card */}
        {activeTab === 'wiki' && (
          <div className="bg-white rounded-3 border p-4 p-md-5 mb-4 shadow-sm">
            <div className="d-flex align-items-center gap-2 mb-2">
              <span className="badge bg-primary px-3 py-1.5 fw-bold font-size-xs">Wikipedia Reference Database</span>
              <span className="text-muted small"><Calendar size={13} className="me-1" />Updated: August 2026 Archive</span>
            </div>
            <h2 className="h3 fw-extrabold text-dark mb-3">{WIKIPEDIA_FLOOD_COMPENDIUM.title}</h2>
            <p className="fs-6 text-secondary leading-relaxed mb-4">
              {WIKIPEDIA_FLOOD_COMPENDIUM.overview}
            </p>

            <div className="row g-3 mb-4">
              {WIKIPEDIA_FLOOD_COMPENDIUM.types.map((t, idx) => (
                <div key={idx} className="col-md-6">
                  <div className="p-3 bg-light rounded-3 border h-100">
                    <b className="text-dark d-block mb-1">{t.title}</b>
                    <small className="text-muted d-block leading-relaxed">{t.description}</small>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-3.5 bg-success-subtle border border-success-subtle rounded-3 text-dark mb-4">
              <b className="text-success d-block mb-1">🌱 Benefits vs ⚠️ Catastrophic Destruction:</b>
              <p className="small mb-1"><strong>Silt Benefits:</strong> {WIKIPEDIA_FLOOD_COMPENDIUM.benefitsVsDamages.benefits}</p>
              <p className="small mb-0"><strong>Extreme Destruction:</strong> {WIKIPEDIA_FLOOD_COMPENDIUM.benefitsVsDamages.damages}</p>
            </div>

            {/* Flood Preparation & Mitigation Measures */}
            <div className="mb-4">
              <h4 className="h6 fw-bold text-dark mb-3">🛠️ Wikipedia: Flood Preparation & Mitigation Protocols</h4>
              <div className="row g-3">
                {WIKIPEDIA_FLOOD_COMPENDIUM.preparation.map((p, idx) => (
                  <div key={idx} className="col-md-6">
                    <div className="p-3 bg-white border rounded-3 shadow-xs h-100">
                      <b className="text-primary d-block mb-1">● {p.title}</b>
                      <small className="text-secondary leading-relaxed d-block">{p.detail}</small>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Climate Variability */}
            <div className="p-3 bg-warning-subtle border border-warning-subtle rounded-3 text-dark">
              <b className="text-dark d-block mb-1">🌍 Climate Change & El Niño / La Niña Impact:</b>
              <p className="small mb-0 text-secondary leading-relaxed">{WIKIPEDIA_FLOOD_COMPENDIUM.climateVariability}</p>
            </div>
          </div>
        )}

        {/* Historic Flood Statistics Table (1954 - 2026) */}
        {activeTab === 'history' && (
          <div className="bg-white rounded-3 border p-4 mb-4 shadow-sm">
            <div className="d-flex align-items-center justify-content-between mb-3">
              <div>
                <h3 className="h5 fw-bold text-dark mb-0">Historical Flood Coverage & Mortality Archive (1954 - 2026)</h3>
                <small className="text-muted">Compiled from Wikipedia & Bangladesh Water Development Board (BWDB) official historical records</small>
              </div>
              <span className="badge bg-dark px-3 py-1.5 fw-bold">11 Major Flood Disasters</span>
            </div>

            <div className="table-responsive">
              <table className="rw-table">
                <thead>
                  <tr>
                    <th>Disaster Year</th>
                    <th>Inundated Land Area</th>
                    <th>% Country Submerged</th>
                    <th>Official Mortality</th>
                    <th>Estimated Return Period</th>
                    <th>Historical Damage Summary & Impact</th>
                  </tr>
                </thead>
                <tbody>
                  {HISTORIC_FLOOD_STATS.map((h, i) => (
                    <tr key={i}>
                      <td>
                        <b className="text-primary fs-6">#{h.year}</b>
                      </td>
                      <td>
                        <span className="fw-bold text-dark">{h.inundatedArea}</span>
                      </td>
                      <td>
                        <span className={`badge ${Number(h.pctCountry.replace('%','')) > 50 ? 'bg-danger' : Number(h.pctCountry.replace('%','')) > 30 ? 'bg-warning text-dark' : 'bg-info text-dark'} fw-bold`}>
                          {h.pctCountry}
                        </span>
                      </td>
                      <td>
                        <b className="text-dark">{h.deaths} Deaths</b>
                      </td>
                      <td>
                        <small className="text-muted font-monospace">{h.returnPeriod}</small>
                      </td>
                      <td>
                        <span className="small text-secondary">{h.keyDamage}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Report Category Filter Options */}
        <div className="rw-filter-bar mb-4">
          {categories.map(c => (
            <button
              key={c}
              className={`rw-filter-pill ${reportCategory === c ? 'active' : ''}`}
              onClick={() => { setReportCategory(c); if (c === 'Wikipedia Archive') setActiveTab('wiki'); else setActiveTab('all'); }}
            >
              <FileText size={14} className="me-1" />
              {c}
            </button>
          ))}
        </div>

        {/* Grid of Report Cards */}
        <div className="row g-4 mb-5">
          {filtered.map(art => (
            <div key={art.id} className="col-md-6 col-lg-4">
              <Link to={`/reports/${art.id}`} className="text-decoration-none">
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
                    <div className="rw-card-footer mt-auto">
                      <span className="rw-source-pill">{art.source}</span>
                      <span className="rw-card-date">{art.date}</span>
                    </div>
                  </div>
                </article>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function ReportDetail() {
  const { id } = useParams();
  const article = BANGLADESH_ARTICLES.find(a => a.id === id) || BANGLADESH_ARTICLES[0];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  return (
    <div className="rw-page-canvas-reports">
      <div className="container py-4 narrow">
        <Link to="/reports" className="btn btn-sm btn-outline-secondary rounded-pill mb-4 d-inline-flex align-items-center gap-1">
          <ArrowLeft size={16} /> Back to Reports List
        </Link>

        <article className="bg-white p-4 p-md-5 rounded-3 border shadow-sm">
          <div className="rw-card-image-wrap mb-4" style={{ height: '320px', borderRadius: '12px' }}>
            <img src={article.image} alt={article.title} className="w-100 h-100 object-fit-cover" />
          </div>

          <div className="rw-modal-meta mb-3">
            <span className="rw-source-pill me-2">{article.source}</span>
            <span className="fw-bold text-danger me-2">{article.topic}</span>
            <span className="text-muted me-2"><Calendar size={13} className="me-1" />{article.date}</span>
            <span className="text-muted"><MapPin size={13} className="me-1" />{article.district}</span>
          </div>

          <h1 className="h2 fw-extrabold text-dark mb-4">{article.title}</h1>

          <div
            className="rw-modal-content fs-6 leading-relaxed text-secondary"
            dangerouslySetInnerHTML={{ __html: article.fullContent }}
          />

          <div className="rw-modal-footer-actions mt-4 pt-4 border-top">
            <button
              className="btn btn-outline-primary rounded-pill px-4 py-2 fw-semibold d-flex align-items-center gap-2"
              onClick={() => alert(`Downloading official PDF (${article.pdfSize})...`)}
            >
              <Download size={16} />
              <span>Download Official PDF ({article.pdfSize})</span>
            </button>
            <Link to="/donate" className="btn btn-primary rounded-pill px-4 py-2 fw-bold">
              Donate Aid to {article.district} &rarr;
            </Link>
          </div>
        </article>
      </div>
    </div>
  );
}
