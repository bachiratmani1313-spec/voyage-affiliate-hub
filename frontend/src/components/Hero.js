import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";

export default function Hero() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  const scrollToVols = () => {
    document.getElementById("vols")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      data-testid="hero-section"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        background: `linear-gradient(135deg, #0a0f1a 0%, #0d1930 50%, #0a0f1a 100%)`,
      }}
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1686249597832-7654b09d6301?auto=format&fit=crop&w=1920&q=80')`,
          opacity: 0.3,
        }}
      />

      {/* Gold gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(to bottom, rgba(10,15,26,0.6) 0%, rgba(10,15,26,0.4) 50%, rgba(10,15,26,0.95) 100%)",
        }}
      />

      {/* Gold particles / decorative lines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-px h-40 opacity-20" style={{ background: "linear-gradient(to bottom, transparent, #c9a84c, transparent)" }} />
        <div className="absolute top-1/3 right-1/3 w-px h-60 opacity-15" style={{ background: "linear-gradient(to bottom, transparent, #c9a84c, transparent)" }} />
        <div className="absolute bottom-1/3 left-1/3 w-64 h-px opacity-20" style={{ background: "linear-gradient(to right, transparent, #c9a84c, transparent)" }} />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        {/* Badge */}
        <div
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium mb-8 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          style={{
            background: "rgba(201,168,76,0.15)",
            border: "1px solid rgba(201,168,76,0.3)",
            color: "#c9a84c",
            fontFamily: "'Outfit', sans-serif",
          }}
        >
          <i className="fas fa-star text-[10px]" />
          Comparateur N°1 de vols pas chers
        </div>

        {/* Main title */}
        <h1
          className={`text-5xl sm:text-6xl lg:text-7xl font-semibold leading-tight mb-6 transition-all duration-700 delay-100 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            color: "#ffffff",
            textShadow: "0 2px 20px rgba(0,0,0,0.5)",
          }}
        >
          Voyagez en{" "}
          <span style={{ color: "#c9a84c" }}>Première Classe</span>
          <br />au Meilleur Prix
        </h1>

        {/* Subtitle */}
        <p
          className={`text-base md:text-lg text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed transition-all duration-700 delay-200 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
          style={{ fontFamily: "'Outfit', sans-serif" }}
        >
          Comparez instantanément des milliers de vols, réservez votre location de voiture
          et profitez de transferts VIP pour un voyage sans compromis.
        </p>

        {/* CTA Buttons */}
        <div
          className={`flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-700 delay-300 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        >
          <button
            onClick={scrollToVols}
            data-testid="hero-search-btn"
            className="px-8 py-4 text-[#0a0f1a] font-semibold rounded-full text-base transition-all duration-300 hover:scale-105 hover:shadow-xl"
            style={{
              background: "linear-gradient(135deg, #c9a84c, #f0c040)",
              fontFamily: "'Outfit', sans-serif",
              boxShadow: "0 4px 20px rgba(201,168,76,0.3)",
            }}
          >
            <i className="fas fa-search mr-2" />
            Trouver mon vol
          </button>
          <button
            onClick={() => document.getElementById("destinations")?.scrollIntoView({ behavior: "smooth" })}
            data-testid="hero-explore-btn"
            className="px-8 py-4 text-white font-semibold rounded-full text-base transition-all duration-300 hover:scale-105"
            style={{
              border: "1px solid rgba(201,168,76,0.5)",
              background: "rgba(201,168,76,0.1)",
              fontFamily: "'Outfit', sans-serif",
            }}
          >
            <i className="fas fa-globe mr-2" style={{ color: "#c9a84c" }} />
            Explorer les destinations
          </button>
        </div>

        {/* Stats */}
        <div
          className={`flex flex-wrap items-center justify-center gap-8 mt-14 transition-all duration-700 delay-500 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        >
          {[
            { value: "700+", label: "Compagnies aériennes" },
            { value: "10M+", label: "Voyageurs satisfaits" },
            { value: "200+", label: "Destinations" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl font-semibold" style={{ color: "#c9a84c", fontFamily: "'Cormorant Garamond', serif" }}>
                {stat.value}
              </div>
              <div className="text-xs text-gray-400 mt-1" style={{ fontFamily: "'Outfit', sans-serif" }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll down arrow */}
      <button
        onClick={scrollToVols}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-[#c9a84c] opacity-60 hover:opacity-100 transition-opacity"
      >
        <ChevronDown size={28} />
      </button>
    </section>
  );
}
