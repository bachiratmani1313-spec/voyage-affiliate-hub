import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import BlogPage from "./pages/BlogPage";
import BlogPostPage from "./pages/BlogPostPage";
import ContactPage from "./pages/ContactPage";
import LegalPage from "./pages/LegalPage";
import "./App.css";

function App() {
  return (
    <div className="App" style={{ background: "#0a0f1a" }}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/mentions-legales" element={<LegalPage />} />
          <Route path="/cgu" element={<LegalPage />} />
          <Route path="/confidentialite" element={<LegalPage />} />
          <Route path="/affiliation" element={<LegalPage />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
