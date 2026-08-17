import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Search, FileText, Calendar, MapPin, Download, ArrowLeft, Layers } from 'lucide-react';
import { BANGLADESH_ARTICLES } from '../data/bangladeshData.js';

export default function Reports() {
  const [query, setQuery] = useState('');
  const [reportCategory, setReportCategory] = useState('All Reports');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const categories = [
    'All Reports',
    'Situation Reports',
    'Emergency Appeals',
    'Health Surveillance',
    'Food Distribution',
    'Shelter Assessments'
  ];

  const filtered = BANGLADESH_ARTICLES.filter(a => {
    const matchesQ = !query || a.title.toLowerCase().includes(query.toLowerCase()) || a.district.toLowerCase().includes(query.toLowerCase());
    const matchesCat = reportCategory === 'All Reports' || a.category === reportCategory;
    return matchesQ && matchesCat;
  });

  return (
    <div className="rw-page-canvas-reports">
      {/* Unique Professional Deep Teal Hero Banner */}
      <section className="rw-page-hero rw-hero-reports">
        <div className="container">
          <span className="rw-hero-eyebrow">
            <Layers size={14} className="text-info" /> SITUATION REPORTS & SITREP ARCHIVE
          </span>
          <h1 className="rw-hero-title">Bangladesh Situation Reports & Updates</h1>
          <p className="rw-hero-subtitle">
            Search official SitReps, disaster situation updates, and emergency appeals from UNICEF, BDRCS, WHO, WFP, and MoDMR.
          </p>

          <div className="mt-4" style={{ maxWidth: '520px' }}>
            <div className="rw-search-form">
              <input
                type="text"
                className="rw-search-input bg-white text-dark border-0 shadow-lg"
                placeholder="Search reports by upazila, district, or agency..."
                value={query}
                onChange={e => setQuery(e.target.value)}
              />
              <Search className="rw-search-icon text-muted" size={17} />
            </div>
          </div>
        </div>
      </section>

      <div className="container">
        {/* Report Category Filter Options */}
        <div className="rw-filter-bar mb-4">
          {categories.map(c => (
            <button
              key={c}
              className={`rw-filter-pill ${reportCategory === c ? 'active' : ''}`}
              onClick={() => setReportCategory(c)}
            >
              <FileText size={14} className="me-1" />
              {c}
            </button>
          ))}
        </div>

        {/* Grid of Report Cards */}
        <div className="row g-4">
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
