import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Briefcase, MapPin, Building2, ArrowLeft, CheckCircle2, Award } from 'lucide-react';
import { BANGLADESH_JOBS } from '../data/bangladeshData.js';

export default function Jobs() {
  const [selectedJobCategory, setSelectedJobCategory] = useState('All BD Jobs');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const categories = [
    'All BD Jobs',
    'Field Relief & Logistics',
    'WASH & Water Engineering',
    'Medical & Nursing',
    'GIS & Disaster Analytics'
  ];

  const filteredJobs = BANGLADESH_JOBS.filter(j => {
    return selectedJobCategory === 'All BD Jobs' || j.category === selectedJobCategory;
  });

  return (
    <div className="rw-page-canvas-jobs">
      {/* Unique Slate Navy Hero Banner */}
      <section className="rw-page-hero rw-hero-jobs">
        <div className="container">
          <span className="rw-hero-eyebrow">
            <Award size={14} className="text-info" /> HUMANITARIAN CAREERS & DEPLOYMENT
          </span>
          <h1 className="rw-hero-title">Bangladesh Relief Job Portal</h1>
          <p className="rw-hero-subtitle">
            Explore emergency deployment vacancies with UNICEF, Bangladesh Red Crescent Society (BDRCS), WHO, and national NGOs.
          </p>

          <div className="d-flex align-items-center gap-3 mt-4 flex-wrap">
            <div className="badge bg-info text-dark fs-6 px-3 py-2 fw-bold shadow-sm">
              1,083 Active Openings Across 64 Districts
            </div>
            <span className="text-light small fw-medium">&bull; Rapid Emergency Deployment Roster</span>
          </div>
        </div>
      </section>

      <div className="container">
        {/* Job Domain Topic Filter Options */}
        <div className="rw-filter-bar mb-4">
          {categories.map(c => (
            <button
              key={c}
              className={`rw-filter-pill ${selectedJobCategory === c ? 'active' : ''}`}
              onClick={() => setSelectedJobCategory(c)}
            >
              <Briefcase size={14} className="me-1" />
              {c}
            </button>
          ))}
        </div>

        {/* Job Cards Grid */}
        <div className="row g-4">
          {filteredJobs.map(job => (
            <div key={job.id} className="col-md-6">
              <Link to={`/jobs/${job.id}`} className="text-decoration-none">
                <div className="rw-custom-card h-100 p-4" style={{ borderLeft: '4px solid #0284C7' }}>
                  <div className="d-flex align-items-center justify-content-between mb-2">
                    <span className="fw-bold text-primary">{job.organization}</span>
                    <span className="badge bg-light text-dark border">{job.type}</span>
                  </div>
                  <h2 className="h5 fw-bold text-dark mb-2">{job.title}</h2>
                  <div className="small text-muted mb-3">
                    <MapPin size={14} className="text-danger me-1" />{job.location}
                  </div>
                  <p className="small text-secondary mb-3">{job.description}</p>
                  <div className="d-flex align-items-center justify-content-between pt-3 border-top mt-auto small">
                    <span className="fw-bold text-success fs-6">{job.salary}</span>
                    <span className="text-muted">Deadline: {job.deadline}</span>
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

export function JobDetail() {
  const { id } = useParams();
  const job = BANGLADESH_JOBS.find(j => j.id === id) || BANGLADESH_JOBS[0];
  const [applied, setApplied] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  return (
    <div className="rw-page-canvas-jobs">
      <div className="container py-4 narrow">
        <Link to="/jobs" className="btn btn-sm btn-outline-secondary rounded-pill mb-4 d-inline-flex align-items-center gap-1">
          <ArrowLeft size={16} /> Back to Job Listings
        </Link>

        <div className="bg-white p-4 p-md-5 rounded-3 border shadow-sm">
          <div className="d-flex align-items-center justify-content-between mb-3">
            <span className="fw-bold fs-5 text-primary">{job.organization}</span>
            <span className="badge bg-success fs-6 px-3 py-1">{job.type}</span>
          </div>

          <h1 className="h2 fw-extrabold text-dark mb-3">{job.title}</h1>
          <div className="d-flex align-items-center gap-3 text-muted small mb-4">
            <span><MapPin size={14} className="text-danger me-1" />{job.location}</span>
            <span>&bull;</span>
            <span>Salary: <b className="text-dark">{job.salary}</b></span>
            <span>&bull;</span>
            <span>Deadline: <b className="text-danger">{job.deadline}</b></span>
          </div>

          <div className="mb-4">
            <h3 className="h6 text-uppercase fw-bold text-muted">Role Overview</h3>
            <p className="text-secondary leading-relaxed">{job.description}</p>
          </div>

          <div className="mb-4">
            <h3 className="h6 text-uppercase fw-bold text-muted mb-2">Key Requirements</h3>
            <ul className="list-group list-group-flush">
              {job.requirements.map((req, i) => (
                <li key={i} className="list-group-item bg-transparent px-0 py-2 d-flex align-items-center gap-2">
                  <CheckCircle2 size={16} className="text-success flex-shrink-0" />
                  <span>{req}</span>
                </li>
              ))}
            </ul>
          </div>

          {applied ? (
            <div className="alert alert-success rounded-3 p-3 text-center fw-bold">
              <CheckCircle2 size={20} className="me-2" /> Application submitted successfully to {job.organization}!
            </div>
          ) : (
            <button
              className="btn btn-primary rounded-pill px-5 py-2.5 fw-bold w-100 mt-3"
              onClick={() => setApplied(true)}
            >
              Apply for this position &rarr;
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
