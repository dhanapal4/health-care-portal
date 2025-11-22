import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/news-portal/Home.jsx";
import NavBar from "./components/news-portal/NavBar.jsx";
import "./App.css";
import Contact from "./components/news-portal/Contact.jsx";
import HealthTopics from "./components/news-portal/HealthTopics.jsx";
import Services from "./components/news-portal/Services.jsx";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/healthtopics" element={<HealthTopics />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
