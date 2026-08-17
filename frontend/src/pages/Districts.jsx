import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { MapPin, HeartHandshake, ArrowLeft, Droplets, Waves, Activity } from 'lucide-react';
import { BANGLADESH_DIVISIONS, BANGLADESH_DISTRICTS } from '../data/bangladeshData.js';

export default function Districts() {
  const [selectedDivision, setSelectedDivision] = useState('All Divisions');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filteredDistricts = BANGLADESH_DISTRICTS.filter(d => {
    return selectedDivision === 'All Divisions' || d.division === selectedDivision;
  });

  return (
    <div className="rw-page-canvas-districts">
      {/* Unique Deep Ocean Teal Hero Banner */}
      <section className="rw-page-hero rw-hero-districts">
        <div className="container">
          <span className="rw-hero-eyebrow">
            <Waves size={14} className="text-info" /> BANGLADESH HYDROLOGY & DIVISIONS MAP
          </span>
          <h1 className="rw-hero-title">Divisions & 64 Districts Monitor</h1>
          <p className="rw-hero-subtitle">
            Track river danger levels, public aid allocations, and emergency center operations across all 8 Divisions of Bangladesh.
          </p>

          <div className="d-flex align-items-center gap-3 mt-4 flex-wrap">
            <div className="badge bg-info text-dark fs-6 px-3 py-2 fw-bold shadow-sm d-flex align-items-center gap-1">
              <Activity size={16} /> 26 Active Monitor Districts
            </div>
            <span className="text-light small fw-medium">&bull; Live BWDB River Water Gauge Updates</span>
          </div>
        </div>
      </section>

      <div className="container">
        {/* Division Filter Options */}
        <div className="rw-filter-bar mb-4">
          {['All Divisions', ...BANGLADESH_DIVISIONS].map(div => (
            <button
              key={div}
              className={`rw-filter-pill ${selectedDivision === div ? 'active' : ''}`}
              onClick={() => setSelectedDivision(div)}
            >
              <MapPin size={14} className="me-1" />
              {div}
            </button>
          ))}
        </div>

        {/* District Cards Grid */}
        <div className="row g-4">
          {filteredDistricts.map(dist => (
            <div key={dist.id} className="col-md-6 col-lg-3">
              <Link to={`/districts/${dist.id}`} className="text-decoration-none">
                <div className="rw-custom-card h-100 p-4" style={{ borderTop: '4px solid #007A87' }}>
                  <div className="d-flex align-items-center justify-content-between mb-2">
                    <span className={`badge ${dist.status === 'Critical' ? 'bg-danger' : dist.status === 'High Risk' ? 'bg-warning text-dark' : 'bg-info text-dark'} fw-bold`}>
                      {dist.status}
                    </span>
                    <span className="small text-muted">{dist.division}</span>
                  </div>

                  <h3 className="h5 fw-bold text-dark mb-2">
                    <MapPin size={17} className="text-danger me-1" />{dist.name} District
                  </h3>

                  <div className="small text-danger font-monospace mb-2 fw-semibold">
                    <Droplets size={13} className="me-1" />{dist.waterLevel}
                  </div>

                  <div className="small text-muted mb-1">
                    Displaced: <b className="text-dark">{dist.affected}</b>
                  </div>
                  <div className="small text-muted mb-3">
                    Aid Disbursed: <b className="text-success">{dist.funded}</b>
                  </div>

                  <div className="pt-2 border-top mt-auto small font-weight-bold text-teal">
                    View District Telemetry &rarr;
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

export function DistrictDetail() {
  const { id } = useParams();
  const district = BANGLADESH_DISTRICTS.find(d => d.id === id) || BANGLADESH_DISTRICTS[0];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  return (
    <div className="rw-page-canvas-districts">
      <div className="container py-4 narrow">
        <Link to="/districts" className="btn btn-sm btn-outline-secondary rounded-pill mb-4 d-inline-flex align-items-center gap-1">
          <ArrowLeft size={16} /> Back to Divisions & Districts
        </Link>

        <div className="bg-white p-5 rounded-3 border shadow-sm text-center">
          <div className="rw-logo-icon mx-auto mb-3" style={{ width: '56px', height: '56px' }}>
            <MapPin size={28} />
          </div>
          <span className="eyebrow">{district.division}</span>
          <h1 className="h2 fw-extrabold text-dark mb-2">{district.name} District Flood Response</h1>
          <span className="badge bg-danger fs-6 px-3 py-1 mb-4">{district.status} Risk Level</span>

          <div className="row g-3 text-center my-4 p-4 bg-light rounded-3">
            <div className="col-4 border-end">
              <div className="h4 fw-bold text-dark mb-0">{district.affected}</div>
              <div className="small text-muted fw-semibold">Displaced Citizens</div>
            </div>
            <div className="col-4 border-end">
              <div className="h4 fw-bold text-danger mb-0">{district.waterLevel}</div>
              <div className="small text-muted fw-semibold">River Water Level</div>
            </div>
            <div className="col-4">
              <div className="h4 fw-bold text-success mb-0">{district.funded}</div>
              <div className="small text-muted fw-semibold">Public Aid Disbursed</div>
            </div>
          </div>

          <div className="d-flex justify-content-center gap-3 mt-4">
            <Link to="/donate" className="btn btn-primary rounded-pill px-4 py-2.5 fw-bold">
              <HeartHandshake size={18} className="me-1" /> Donate to {district.name} Fund
            </Link>
            <Link to="/apply-relief" className="btn btn-outline-secondary rounded-pill px-4 py-2.5 fw-semibold">
              Seek Relief in {district.name}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
