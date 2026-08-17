import { Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout.jsx';
import { Protected, AdminOnly } from './components/Guards.jsx';
import Toast from './components/Toast.jsx';
import Home from './pages/Home.jsx';
import Reports, { ReportDetail } from './pages/Reports.jsx';
import Disasters, { DisasterDetail } from './pages/Disasters.jsx';
import Districts, { DistrictDetail } from './pages/Districts.jsx';
import Topics from './pages/Topics.jsx';
import Jobs, { JobDetail } from './pages/Jobs.jsx';
import Training, { TrainingDetail } from './pages/Training.jsx';
import { Login, Register, ForgotPassword } from './pages/Auth.jsx';
import Dashboard from './pages/Dashboard.jsx';
import { Donate, ApplyRelief } from './pages/Forms.jsx';
import History from './pages/History.jsx';
import Admin from './pages/Admin.jsx';
import Profile from './pages/Profile.jsx';

export default function App() {
  return (
    <Layout>
      <Toast />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/reports/:id" element={<ReportDetail />} />
        <Route path="/disasters" element={<Disasters />} />
        <Route path="/disasters/:id" element={<DisasterDetail />} />
        <Route path="/districts" element={<Districts />} />
        <Route path="/districts/:id" element={<DistrictDetail />} />
        <Route path="/topics" element={<Topics />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/jobs/:id" element={<JobDetail />} />
        <Route path="/training" element={<Training />} />
        <Route path="/training/:id" element={<TrainingDetail />} />

        {/* Existing Auth & Protected Application Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/dashboard" element={<Protected><Dashboard /></Protected>} />
        <Route path="/profile" element={<Protected><Profile /></Protected>} />
        <Route path="/donate" element={<Protected><Donate /></Protected>} />
        <Route path="/apply-relief" element={<Protected><ApplyRelief /></Protected>} />
        <Route path="/history" element={<Protected><History /></Protected>} />
        <Route path="/admin" element={<AdminOnly><Admin /></AdminOnly>} />
      </Routes>
    </Layout>
  );
}
