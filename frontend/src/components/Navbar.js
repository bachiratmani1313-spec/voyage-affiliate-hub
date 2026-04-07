import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Plane, Menu, X } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    setMenuOpen(false);
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }, 300);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const navLinks = [
    { label: "Vols", action: () => scrollTo("vols") },
    { label: "Hôtels", action: () => scrollTo("hotels") },
    { label: "Location", action: () => scrollTo("location") },
    { label: "Blog", to: "/blog" },
    { label: "Contact", to: "/contact" },
  ];

  return (
    <nav
      data-testid="navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-[#0a0f1a]/95 backdrop-blur-xl shadow-lg shadow-black/30" : "bg-transparent"
      }`}
      style={{ borderBottom: scrolled ? "1px solid rgba(201,168,76,0.2)" : "none" }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between h-16 md:h-20">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group" data-testid="logo-link">
          <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: "linear-gradient(135deg, #c9a84c, #f0c040)" }}>
            <Plane size={16} className="text-[#0a0f1a]" />
          </div>
          <span className="font-bold text-xl tracking-wide" style={{ fontFamily: "'Cormorant Garamond', serif", color: "#c9a84c" }}>
            Vrax <span className="text-white">Voyage</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) =>
            link.to ? (
              <Link
                key={link.label}
                to={link.to}
                data-testid={`nav-${link.label.toLowerCase()}`}
                className="text-sm font-medium text-gray-300 hover:text-[#c9a84c] transition-colors duration-300 tracking-wide"
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                {link.label}
              </Link>
            ) : (
              <button
                key={link.label}
                onClick={link.action}
                data-testid={`nav-${link.label.toLowerCase()}`}
                className="text-sm font-medium text-gray-300 hover:text-[#c9a84c] transition-colors duration-300 tracking-wide"
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                {link.label}
              </button>
            )
          )}
          <button
            onClick={() => scrollTo("vols")}
            data-testid="nav-search-cta"
            className="px-5 py-2 text-sm font-semibold text-[#0a0f1a] rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg"
            style={{ background: "linear-gradient(135deg, #c9a84c, #f0c040)", fontFamily: "'Outfit', sans-serif" }}
          >
            Trouver un vol
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-white"
          onClick={() => setMenuOpen(!menuOpen)}
          data-testid="mobile-menu-btn"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#0a0f1a]/98 backdrop-blur-xl border-t border-white/10 px-6 py-4 flex flex-col gap-4">
          {navLinks.map((link) =>
            link.to ? (
              <Link
                key={link.label}
                to={link.to}
                onClick={() => setMenuOpen(false)}
                className="text-gray-300 hover:text-[#c9a84c] py-2 border-b border-white/5"
              >
                {link.label}
              </Link>
            ) : (
              <button
                key={link.label}
                onClick={link.action}
                className="text-left text-gray-300 hover:text-[#c9a84c] py-2 border-b border-white/5"
              >
                {link.label}
              </button>
            )
          )}
        </div>
      )}
    </nav>
  );
}
