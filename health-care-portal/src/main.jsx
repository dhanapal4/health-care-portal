import { lazy, StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import NotFoundPage from './pages/NotFoundPage/NotFoundPage.jsx'
import WellnessGoalsList from './pages/WellnessGoals/WellnessGoalsList.jsx'
import HealthCareDashboard from './pages/HealthCareDashboard.jsx';
const WellnessGoalsForm = lazy(() => import('./pages/WellnessGoals/WellnessGoalsForm.jsx'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const ProfilePage = lazy(() => import('./pages/ProfilePage'));
const DashboardPage = lazy(() => import('./components/DashBoard.jsx'));

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<LoginPage />} />
        
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/hcp-dashboard" element={<HealthCareDashboard />} />
        <Route path="/dashboard" element={<DashboardPage />}>
          <Route index element={<ProfilePage />} />
          <Route path="my-profile" element={<ProfilePage />} />
          <Route path="wellness-goals" element={<WellnessGoalsList />} />
          <Route path="add-goal" element={<WellnessGoalsForm />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
