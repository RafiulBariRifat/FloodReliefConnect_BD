import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { GraduationCap, MapPin, Calendar, CheckCircle2, ArrowLeft, BookOpen } from 'lucide-react';
import { BANGLADESH_TRAINING } from '../data/bangladeshData.js';

export default function Training() {
  const [selectedTrainingCategory, setSelectedTrainingCategory] = useState('All BD Courses');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const categories = [
    'All BD Courses',
    'Volunteer Response Certification',
    'WASH & Water Testing',
    'CPP Cyclone Warning Protocol'
  ];

  const filteredTraining = BANGLADESH_TRAINING.filter(t => {
    return selectedTrainingCategory === 'All BD Courses' || t.category === selectedTrainingCategory;
  });

  return (
    <div className="rw-page-canvas-training">
      {/* Unique Deep Indigo Hero Banner */}
      <section className="rw-page-hero rw-hero-training">
        <div className="container">
          <span className="rw-hero-eyebrow">
            <BookOpen size={14} className="text-warning" /> DISASTER RESPONSE ACADEMY
          </span>
          <h1 className="rw-hero-title">Capacity Workshops & Training</h1>
          <p className="rw-hero-subtitle">
            Certified humanitarian training programs, BDRCS volunteer certifications, WASH quality testing, and CPP cyclone warning workshops.
          </p>

          <div className="d-flex align-items-center gap-3 mt-4 flex-wrap">
            <div className="badge bg-warning text-dark fs-6 px-3 py-2 fw-bold shadow-sm">
              1,224 Training Workshops Available
            </div>
            <span className="text-light small fw-medium">&bull; Certified by BDRCS & UNICEF Bangladesh</span>
          </div>
        </div>
      </section>

      <div className="container">
        {/* Training Domain Topic Filter Options */}
        <div className="rw-filter-bar mb-4">
          {categories.map(c => (
            <button
              key={c}
              className={`rw-filter-pill ${selectedTrainingCategory === c ? 'active' : ''}`}
              onClick={() => setSelectedTrainingCategory(c)}
            >
              <GraduationCap size={14} className="me-1" />
              {c}
            </button>
          ))}
        </div>

        {/* Training Cards Grid */}
        <div className="row g-4">
          {filteredTraining.map(tr => (
            <div key={tr.id} className="col-md-6 col-lg-4">
              <Link to={`/training/${tr.id}`} className="text-decoration-none">
                <div className="rw-custom-card h-100 p-4" style={{ borderLeft: '4px solid #311B92' }}>
                  <div className="d-flex align-items-center justify-content-between mb-2">
                    <span className="fw-bold text-primary">{tr.provider}</span>
                    <span className="badge bg-success bg-opacity-10 text-success fw-bold">{tr.fee}</span>
                  </div>
                  <h2 className="h5 fw-bold text-dark mb-2">{tr.title}</h2>
                  <div className="small text-muted mb-2">
                    <MapPin size={14} className="text-danger me-1" />{tr.location}
                  </div>
                  <div className="small text-muted mb-3">
                    <Calendar size={14} className="me-1" />{tr.duration}
                  </div>
                  <p className="small text-secondary mb-3">{tr.description}</p>
                  <div className="pt-3 border-top mt-auto small fw-bold text-primary">
                    {tr.seats} &rarr;
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

export function TrainingDetail() {
  const { id } = useParams();
  const tr = BANGLADESH_TRAINING.find(t => t.id === id) || BANGLADESH_TRAINING[0];
  const [registered, setRegistered] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  return (
    <div className="rw-page-canvas-training">
      <div className="container py-4 narrow">
        <Link to="/training" className="btn btn-sm btn-outline-secondary rounded-pill mb-4 d-inline-flex align-items-center gap-1">
          <ArrowLeft size={16} /> Back to Training Courses
        </Link>

        <div className="bg-white p-4 p-md-5 rounded-3 border shadow-sm">
          <div className="d-flex align-items-center justify-content-between mb-3">
            <span className="fw-bold fs-5 text-primary">{tr.provider}</span>
            <span className="badge bg-success fs-6 px-3 py-1">{tr.fee}</span>
          </div>

          <h1 className="h2 fw-extrabold text-dark mb-3">{tr.title}</h1>
          <div className="d-flex align-items-center gap-3 text-muted small mb-4">
            <span><MapPin size={14} className="text-danger me-1" />{tr.location}</span>
            <span>&bull;</span>
            <span>Duration: <b className="text-dark">{tr.duration}</b></span>
          </div>

          <div className="mb-4">
            <h3 className="h6 text-uppercase fw-bold text-muted">Course Summary</h3>
            <p className="text-secondary leading-relaxed">{tr.description}</p>
          </div>

          <div className="mb-4">
            <h3 className="h6 text-uppercase fw-bold text-muted mb-2">Syllabus & Modules</h3>
            <ul className="list-group list-group-flush">
              {tr.syllabus.map((s, i) => (
                <li key={i} className="list-group-item bg-transparent px-0 py-2 d-flex align-items-center gap-2">
                  <CheckCircle2 size={16} className="text-success flex-shrink-0" />
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>

          {registered ? (
            <div className="alert alert-success rounded-3 p-3 text-center fw-bold">
              <CheckCircle2 size={20} className="me-2" /> Registration confirmed for {tr.title}!
            </div>
          ) : (
            <button
              className="btn btn-primary rounded-pill px-5 py-2.5 fw-bold w-100 mt-3"
              onClick={() => setRegistered(true)}
            >
              Register for Training Course &rarr;
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
