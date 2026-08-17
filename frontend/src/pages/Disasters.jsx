import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Flame, AlertTriangle, MapPin, Calendar, ArrowLeft, HeartHandshake, ShieldAlert, Activity } from 'lucide-react';
import { BANGLADESH_DISASTERS } from '../data/bangladeshData.js';

export default function Disasters() {
  const [selectedDisasterType, setSelectedDisasterType] = useState('All');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const types = ['All', 'Flash Floods', 'Cyclones & Storms', 'River Embankment Breaches', 'Landslides'];

  const filteredDisasters = BANGLADESH_DISASTERS.filter(d => {
    return selectedDisasterType === 'All' || d.type === selectedDisasterType;
  });

  return (
    <div className="rw-page-canvas-disasters">
      {/* Unique Red Alert Hero Banner */}
      <section className="rw-page-hero rw-hero-disasters">
        <div className="container">
          <span className="rw-hero-eyebrow">
            <ShieldAlert size={14} className="text-danger" /> BANGLADESH CRISIS DESK
          </span>
          <h1 className="rw-hero-title">Emergency Disaster Monitor</h1>
          <p className="rw-hero-subtitle">
            Real-time status tracking across Bangladesh flood zones, landslides, embankment breaches, and coastal cyclone alerts.
          </p>

          <div className="d-flex align-items-center gap-3 mt-4 flex-wrap">
            <div className="badge bg-danger fs-6 px-3 py-2 fw-bold d-flex align-items-center gap-1 shadow-sm">
              <Activity size={16} /> 5 Active Emergency Crises Registered
            </div>
            <span className="text-light small fw-medium">&bull; 24/7 National Weather & Hydrology Monitoring</span>
          </div>
        </div>
      </section>

      <div className="container">
        {/* Disaster Type Filter Options */}
        <div className="rw-filter-bar mb-4">
          {types.map(t => (
            <button
              key={t}
              className={`rw-filter-pill ${selectedDisasterType === t ? 'active' : ''}`}
              onClick={() => setSelectedDisasterType(t)}
            >
              <Flame size={14} className="me-1" />
              {t}
            </button>
          ))}
        </div>

        {/* Disaster Cards Grid */}
        <div className="row g-4">
          {filteredDisasters.map(d => (
            <div key={d.id} className="col-md-6 col-lg-4">
              <Link to={`/disasters/${d.id}`} className="text-decoration-none">
                <div className="rw-news-card h-100 border-0 shadow-sm" style={{ borderLeft: '4px solid #E53E3E' }}>
                  <div className="rw-card-image-wrap" style={{ height: '190px' }}>
                    <img src={d.image} alt={d.title} className="rw-card-image" loading="lazy" />
                    <span className="rw-card-category-badge alert">
                      <AlertTriangle size={11} className="me-1" />{d.status}
                    </span>
                    <span className="rw-card-division-badge">
                      <MapPin size={11} className="me-1" />{d.district}
                    </span>
                  </div>
                  <div className="rw-card-body">
                    <div className="small text-danger fw-bold mb-1 text-uppercase">
                      {d.type} &bull; {d.division}
                    </div>
                    <h2 className="rw-card-title">{d.title}</h2>
                    <p className="rw-card-excerpt">{d.description}</p>

                    <div className="row g-2 text-center my-2 p-2 bg-light rounded-3">
                      <div className="col-6 border-end">
                        <div className="fw-bold text-dark small">{d.affectedPeople}</div>
                        <div className="fs-8 text-muted">Affected</div>
                      </div>
                      <div className="col-6">
                        <div className="fw-bold text-primary small">{d.sheltersActive}</div>
                        <div className="fs-8 text-muted">Relief Shelters</div>
                      </div>
                    </div>

                    <div className="rw-card-footer mt-auto">
                      <span className="badge bg-secondary bg-opacity-10 text-dark fw-bold">{d.glide}</span>
                      <span className="rw-card-date">{d.date}</span>
                    </div>
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

export function DisasterDetail() {
  const { id } = useParams();
  const disaster = BANGLADESH_DISASTERS.find(d => d.id === id) || BANGLADESH_DISASTERS[0];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  return (
    <div className="rw-page-canvas-disasters">
      <div className="container py-4 narrow">
        <Link to="/disasters" className="btn btn-sm btn-outline-secondary rounded-pill mb-4 d-inline-flex align-items-center gap-1">
          <ArrowLeft size={16} /> Back to Disaster Monitor
        </Link>

        <div className="bg-white p-4 p-md-5 rounded-3 border shadow-sm">
          <div className="rw-card-image-wrap mb-4" style={{ height: '300px', borderRadius: '12px' }}>
            <img src={disaster.image} alt={disaster.title} className="w-100 h-100 object-fit-cover" />
          </div>

          <div className="d-flex align-items-center gap-2 mb-3">
            <span className="rw-alert-badge">{disaster.status}</span>
            <span className="badge bg-secondary">{disaster.glide}</span>
            <span className="text-muted small ms-auto"><Calendar size={13} className="me-1" />Updated: {disaster.date}</span>
          </div>

          <h1 className="h2 fw-extrabold text-dark mb-3">{disaster.title}</h1>
          <p className="lead text-muted mb-4">{disaster.description}</p>

          <div className="row g-3 text-center my-4 p-3 bg-light rounded-3">
            <div className="col-6 border-end">
              <div className="h4 fw-bold text-danger mb-0">{disaster.affectedPeople}</div>
              <div className="small text-muted fw-semibold">Affected Population</div>
            </div>
            <div className="col-6">
              <div className="h4 fw-bold text-primary mb-0">{disaster.sheltersActive}</div>
              <div className="small text-muted fw-semibold">Active Relief Centers</div>
            </div>
          </div>

          <div className="d-flex gap-3 flex-wrap mt-4 pt-3 border-top">
            <Link to="/donate" className="btn btn-primary rounded-pill px-4 py-2.5 fw-bold">
              <HeartHandshake size={18} className="me-1" /> Donate Aid to {disaster.district}
            </Link>
            <Link to="/apply-relief" className="btn btn-outline-secondary rounded-pill px-4 py-2.5 fw-semibold">
              Apply for Relief Assistance
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
