const DESTINATIONS = [
  { city: "Barcelone", country: "Espagne", price: "dès 49€", img: "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?auto=format&fit=crop&w=400&q=70", code: "Barcelona", flag: "🇪🇸", hours: "2h" },
  { city: "Marrakech", country: "Maroc", price: "dès 79€", img: "https://images.unsplash.com/photo-1539020140153-e479b8c22e70?auto=format&fit=crop&w=400&q=70", code: "Marrakech", flag: "🇲🇦", hours: "3h30" },
  { city: "Lisbonne", country: "Portugal", price: "dès 55€", img: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?auto=format&fit=crop&w=400&q=70", code: "Lisbon", flag: "🇵🇹", hours: "2h30" },
  { city: "Dubaï", country: "Émirats", price: "dès 249€", img: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=400&q=70", code: "Dubai", flag: "🇦🇪", hours: "7h" },
  { city: "Tenerife", country: "Espagne", price: "dès 69€", img: "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?auto=format&fit=crop&w=400&q=70", code: "Tenerife", flag: "🇮🇨", hours: "4h" },
  { city: "Bali", country: "Indonésie", price: "dès 399€", img: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&q=70", code: "Bali", flag: "🇮🇩", hours: "16h" },
  { city: "Phuket", country: "Thaïlande", price: "dès 349€", img: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=400&q=70", code: "Phuket", flag: "🇹🇭", hours: "11h" },
  { city: "New York", country: "États-Unis", price: "dès 289€", img: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=400&q=70", code: "New York", flag: "🇺🇸", hours: "8h" },
];

export default function PriceMapWidget() {
  const handleClick = (dest) => {
    const url = `https://www.aviasales.fr/?marker=704469&origin=Paris&destination=${encodeURIComponent(dest.city)}&adults=1`;
    if (window.trackAffiliate) window.trackAffiliate("Aviasales-Map", `Paris-${dest.city}`);
    window.open(url, "_blank", "noopener");
  };

  const handleViewAll = () => {
    window.open("https://www.aviasales.fr/?marker=704469", "_blank", "noopener");
  };

  return (
    <section id="map-real" data-testid="pricemap-section" className="py-20 px-6 lg:px-12 max-w-7xl mx-auto">
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs mb-4"
          style={{ background: "rgba(201,168,76,0.1)", border: "1px solid rgba(201,168,76,0.3)", color: "#c9a84c", fontFamily: "'Outfit', sans-serif" }}>
          <i className="fas fa-map-marked-alt" /> Radar des prix
        </div>
        <h2 className="text-3xl sm:text-4xl font-semibold text-white mb-3" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
          Meilleurs Prix du Moment
        </h2>
        <p className="text-gray-400 text-base max-w-xl mx-auto" style={{ fontFamily: "'Outfit', sans-serif" }}>
          Cliquez sur une destination pour voir les vols disponibles depuis Paris et réservez au meilleur tarif.
        </p>
      </div>

      <div className="rounded-2xl overflow-hidden p-6"
        style={{ background: "rgba(13,21,44,0.95)", border: "1px solid rgba(201,168,76,0.25)", boxShadow: "0 0 50px rgba(201,168,76,0.08)" }}>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
          {DESTINATIONS.map((dest) => (
            <button key={dest.city} onClick={() => handleClick(dest)}
              data-testid={`price-dest-${dest.city.toLowerCase().replace(/ /g, "-")}`}
              className="group relative rounded-xl overflow-hidden text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              style={{ border: "1px solid rgba(255,255,255,0.06)", boxShadow: "0 2px 15px rgba(0,0,0,0.2)", background: "none" }}
              onMouseEnter={(e) => e.currentTarget.style.borderColor = "rgba(201,168,76,0.4)"}
              onMouseLeave={(e) => e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)"}>
              <div className="h-28 overflow-hidden">
                <img src={dest.img} alt={dest.city}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1a]/90 via-[#0a0f1a]/20 to-transparent" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-3">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="text-sm font-semibold text-white leading-tight" style={{ fontFamily: "'Outfit', sans-serif" }}>
                      {dest.flag} {dest.city}
                    </div>
                    <div className="text-xs text-gray-400" style={{ fontFamily: "'Outfit', sans-serif" }}>
                      <i className="fas fa-clock mr-1" />{dest.hours}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-bold" style={{ color: "#c9a84c", fontFamily: "'Outfit', sans-serif" }}>
                      {dest.price}
                    </div>
                    <div className="text-xs text-gray-500" style={{ fontFamily: "'Outfit', sans-serif" }}>A/R</div>
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4"
          style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
          <p className="text-xs text-gray-500" style={{ fontFamily: "'Outfit', sans-serif" }}>
            <i className="fas fa-info-circle text-[#c9a84c] mr-1" />
            Prix indicatifs depuis Paris (CDG/ORY). Cliquez pour voir les vrais tarifs en temps réel.
          </p>
          <button onClick={handleViewAll} data-testid="view-all-prices-btn"
            className="flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-[#0a0f1a] transition-all duration-300 hover:scale-105 hover:shadow-lg flex-shrink-0"
            style={{ background: "linear-gradient(135deg,#c9a84c,#f0c040)", fontFamily: "'Outfit', sans-serif", boxShadow: "0 3px 15px rgba(201,168,76,0.3)" }}>
            <i className="fas fa-globe" /> Voir toutes les destinations
          </button>
        </div>
      </div>
    </section>
  );
}
