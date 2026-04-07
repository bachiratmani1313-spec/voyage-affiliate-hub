import { useState } from "react";

const POPULAR = [
  { code: "BCN", city: "Barcelone", flag: "🇪🇸" },
  { code: "DXB", city: "Dubaï", flag: "🇦🇪" },
  { code: "BKK", city: "Bangkok", flag: "🇹🇭" },
  { code: "CDG", city: "Paris", flag: "🇫🇷" },
  { code: "JFK", city: "New York", flag: "🇺🇸" },
  { code: "CMN", city: "Casablanca", flag: "🇲🇦" },
];

export default function FlightWidget() {
  const [tripType, setTripType] = useState("aller-retour");
  const [origin, setOrigin] = useState("Paris");
  const [destination, setDestination] = useState("");
  const [depart, setDepart] = useState("");
  const [retour, setRetour] = useState("");
  const [adults, setAdults] = useState(1);

  const handleSearch = (e) => {
    e.preventDefault();
    const dest = destination || "anywhere";
    const url = `https://www.aviasales.fr/?marker=704469&origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(dest)}&departure_date=${depart}&return_date=${retour}&adults=${adults}`;
    if (window.trackAffiliate) window.trackAffiliate("Aviasales", `${origin}-${dest}`);
    window.open(url, "_blank", "noopener");
  };

  const quickSearch = (destCity) => {
    const url = `https://www.aviasales.fr/?marker=704469&origin=Paris&destination=${encodeURIComponent(destCity)}&adults=1`;
    if (window.trackAffiliate) window.trackAffiliate("Aviasales", `Paris-${destCity}`);
    window.open(url, "_blank", "noopener");
  };

  const inputStyle = {
    background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(255,255,255,0.12)",
    borderRadius: "12px",
    color: "#fff",
    fontFamily: "'Outfit', sans-serif",
    fontSize: "14px",
    padding: "12px 16px",
    width: "100%",
    outline: "none",
  };

  return (
    <section id="vols" data-testid="flight-widget-section" className="py-20 px-6 lg:px-12 max-w-7xl mx-auto">
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs mb-4"
          style={{ background: "rgba(201,168,76,0.1)", border: "1px solid rgba(201,168,76,0.3)", color: "#c9a84c", fontFamily: "'Outfit', sans-serif" }}>
          <i className="fas fa-plane" /> Recherche de vols
        </div>
        <h2 className="text-3xl sm:text-4xl font-semibold text-white mb-3" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
          Trouver mon Billet d'Avion
        </h2>
        <p className="text-gray-400 text-base max-w-xl mx-auto" style={{ fontFamily: "'Outfit', sans-serif" }}>
          Comparez des centaines de compagnies aériennes et trouvez le meilleur prix en quelques secondes.
        </p>
      </div>

      <div className="rounded-2xl overflow-hidden p-8"
        style={{ background: "rgba(13,21,44,0.95)", border: "1px solid rgba(201,168,76,0.25)", boxShadow: "0 0 50px rgba(201,168,76,0.08)" }}>

        {/* Trip type toggle */}
        <div className="flex gap-2 mb-6">
          {["aller-retour", "aller-simple"].map((t) => (
            <button key={t} onClick={() => setTripType(t)}
              data-testid={`trip-type-${t}`}
              className="px-4 py-2 rounded-full text-sm font-medium transition-all duration-200"
              style={{
                fontFamily: "'Outfit', sans-serif",
                background: tripType === t ? "linear-gradient(135deg,#c9a84c,#f0c040)" : "rgba(255,255,255,0.06)",
                color: tripType === t ? "#0a0f1a" : "#9ca3af",
                border: tripType === t ? "none" : "1px solid rgba(255,255,255,0.1)",
              }}>
              <i className={`fas ${t === "aller-retour" ? "fa-exchange-alt" : "fa-long-arrow-alt-right"} mr-2`} />
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>

        {/* Search form */}
        <form onSubmit={handleSearch}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            {/* Origin */}
            <div>
              <label className="block text-xs text-gray-400 mb-2 ml-1" style={{ fontFamily: "'Outfit', sans-serif" }}>
                <i className="fas fa-plane-departure text-[#c9a84c] mr-1" /> Départ
              </label>
              <input type="text" value={origin} onChange={(e) => setOrigin(e.target.value)}
                data-testid="flight-origin-input"
                placeholder="Paris, CDG..." style={inputStyle}
                onFocus={(e) => e.target.style.borderColor = "rgba(201,168,76,0.5)"}
                onBlur={(e) => e.target.style.borderColor = "rgba(255,255,255,0.12)"} />
            </div>
            {/* Destination */}
            <div>
              <label className="block text-xs text-gray-400 mb-2 ml-1" style={{ fontFamily: "'Outfit', sans-serif" }}>
                <i className="fas fa-plane-arrival text-[#c9a84c] mr-1" /> Destination
              </label>
              <input type="text" value={destination} onChange={(e) => setDestination(e.target.value)}
                data-testid="flight-dest-input"
                placeholder="Barcelone, Dubai..." style={inputStyle}
                onFocus={(e) => e.target.style.borderColor = "rgba(201,168,76,0.5)"}
                onBlur={(e) => e.target.style.borderColor = "rgba(255,255,255,0.12)"} />
            </div>
            {/* Dates */}
            <div>
              <label className="block text-xs text-gray-400 mb-2 ml-1" style={{ fontFamily: "'Outfit', sans-serif" }}>
                <i className="fas fa-calendar text-[#c9a84c] mr-1" /> Aller
              </label>
              <input type="date" value={depart} onChange={(e) => setDepart(e.target.value)}
                data-testid="flight-depart-input"
                style={{ ...inputStyle, colorScheme: "dark" }}
                onFocus={(e) => e.target.style.borderColor = "rgba(201,168,76,0.5)"}
                onBlur={(e) => e.target.style.borderColor = "rgba(255,255,255,0.12)"} />
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-2 ml-1" style={{ fontFamily: "'Outfit', sans-serif" }}>
                <i className="fas fa-calendar-check text-[#c9a84c] mr-1" /> {tripType === "aller-retour" ? "Retour" : "Passagers"}
              </label>
              {tripType === "aller-retour" ? (
                <input type="date" value={retour} onChange={(e) => setRetour(e.target.value)}
                  data-testid="flight-retour-input"
                  style={{ ...inputStyle, colorScheme: "dark" }}
                  onFocus={(e) => e.target.style.borderColor = "rgba(201,168,76,0.5)"}
                  onBlur={(e) => e.target.style.borderColor = "rgba(255,255,255,0.12)"} />
              ) : (
                <select value={adults} onChange={(e) => setAdults(Number(e.target.value))}
                  style={{ ...inputStyle, background: "rgba(18,24,38,0.95)" }}>
                  {[1,2,3,4,5].map(n => <option key={n} value={n}>{n} adulte{n>1?"s":""}</option>)}
                </select>
              )}
            </div>
          </div>

          <button type="submit" data-testid="flight-search-btn"
            className="w-full py-4 rounded-xl font-semibold text-base text-[#0a0f1a] transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl"
            style={{ background: "linear-gradient(135deg,#c9a84c,#f0c040)", fontFamily: "'Outfit', sans-serif", boxShadow: "0 4px 25px rgba(201,168,76,0.35)" }}>
            <i className="fas fa-search mr-2" /> Comparer les vols maintenant
          </button>
        </form>

        {/* Popular destinations */}
        <div className="mt-6 pt-5" style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
          <p className="text-xs text-gray-500 mb-3" style={{ fontFamily: "'Outfit', sans-serif" }}>
            <i className="fas fa-fire text-[#c9a84c] mr-1" /> Recherches populaires depuis Paris :
          </p>
          <div className="flex flex-wrap gap-2">
            {POPULAR.map((d) => (
              <button key={d.code} onClick={() => quickSearch(d.city)}
                data-testid={`quick-dest-${d.code}`}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-gray-300 transition-all duration-200 hover:text-[#c9a84c] hover:scale-105"
                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", fontFamily: "'Outfit', sans-serif" }}>
                <span>{d.flag}</span> {d.city}
              </button>
            ))}
          </div>
        </div>

        <p className="text-center text-xs text-gray-600 mt-4" style={{ fontFamily: "'Outfit', sans-serif" }}>
          Propulsé par <a href="https://www.aviasales.fr/?marker=704469" target="_blank" rel="nofollow noopener sponsored" className="text-[#c9a84c] hover:underline">Aviasales</a> · Partenaire TravelPayouts (marker : 704469)
        </p>
      </div>
    </section>
  );
}
