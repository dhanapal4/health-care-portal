import { lazy, StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage.jsx";
import WellnessGoalsList from "./pages/WellnessGoals/WellnessGoalsList.jsx";
import Contact from "./components/news-portal/Contact.jsx";
import Services from "./components/news-portal/Services.jsx";
import HealthTopics from "./components/news-portal/HealthTopics.jsx";
import Header from "./components/Header.jsx";
import NavBar from "./components/news-portal/NavBar.jsx";
import Home from "./components/news-portal/Home.jsx";
import AboutUs from "./components/news-portal/AboutUs.jsx";

const WellnessGoalsForm = lazy(() =>
  import("./pages/WellnessGoals/WellnessGoalsForm.jsx")
);
const LoginPage = lazy(() => import("./pages/LoginPage"));
const ProfilePage = lazy(() => import("./pages/ProfilePage"));

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/add-goal" element={<WellnessGoalsForm />} />
        <Route path="/list-goals" element={<WellnessGoalsList />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/services" element={<Services />} />
        <Route path="/health-topics" element={<HealthTopics />} />
        <Route path="/about-us" element={<AboutUs />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
