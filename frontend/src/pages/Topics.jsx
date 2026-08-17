import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Layers, ArrowRight, Sparkles } from 'lucide-react';
import { BANGLADESH_TOPICS } from '../data/bangladeshData.js';

export default function Topics() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="rw-page-canvas-topics">
      {/* Unique Emerald Hero Banner */}
      <section className="rw-page-hero rw-hero-topics">
        <div className="container">
          <span className="rw-hero-eyebrow">
            <Sparkles size={14} className="text-warning" /> HUMANITARIAN CLUSTERS & SECTORS
          </span>
          <h1 className="rw-hero-title">Bangladesh Relief Topics & Clusters</h1>
          <p className="rw-hero-subtitle">
            Browse situation reports, emergency appeals, and field assessments categorized by specialized relief sectors.
          </p>

          <div className="d-flex align-items-center gap-3 mt-4 flex-wrap">
            <div className="badge bg-success fs-6 px-3 py-2 fw-bold shadow-sm">
              7 Active Response Sectors
            </div>
            <span className="text-light small fw-medium">&bull; Aligned with UN Cluster Response Standards</span>
          </div>
        </div>
      </section>

      <div className="container">
        {/* Cluster Topic Cards Grid */}
        <div className="row g-4">
          {BANGLADESH_TOPICS.map(top => (
            <div key={top.id} className="col-md-6 col-lg-4">
              <Link to="/reports" className="text-decoration-none">
                <div className="rw-custom-card h-100 p-4" style={{ borderLeft: '4px solid #00C896' }}>
                  <div className="d-flex align-items-center justify-content-between mb-3">
                    <div className="rw-logo-icon" style={{ width: '46px', height: '46px', background: 'linear-gradient(135deg, #047857, #008080)' }}>
                      <Layers size={22} />
                    </div>
                    <span className="badge bg-success bg-opacity-10 text-success fw-bold fs-7">{top.count}</span>
                  </div>

                  <h3 className="h5 fw-bold text-dark mb-2">{top.title}</h3>
                  <p className="small text-muted mb-3">{top.desc}</p>

                  <div className="small fw-bold text-success d-flex align-items-center gap-1 mt-auto pt-2 border-top">
                    Explore {top.title} Reports <ArrowRight size={14} />
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
