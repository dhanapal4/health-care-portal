import { lazy, StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import NotFoundPage from './pages/NotFoundPage/NotFoundPage.jsx'
import WellnessGoalsList from './pages/WellnessGoals/WellnessGoalsList.jsx'

const WellnessGoalsForm = lazy(() => import('./pages/WellnessGoals/WellnessGoalsForm.jsx'));
const LoginPage = lazy(() => import('./pages/LoginPage'));

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/add-goal" element={<WellnessGoalsForm />} />
        <Route path="/list-goals" element={<WellnessGoalsList />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
