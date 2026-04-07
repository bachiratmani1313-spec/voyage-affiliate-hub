const HOTELLOOK_URL = "https://hotellook.com/?marker=704469&locale=fr&currency=eur";

const destinations = [
  { name: "Paris", img: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=400&q=80" },
  { name: "Barcelone", img: "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?auto=format&fit=crop&w=400&q=80" },
  { name: "Maldives", img: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=400&q=80" },
  { name: "Dubai", img: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=400&q=80" },
];

export default function HotelSection() {
  return (
    <section id="hotels" data-testid="hotel-section" className="py-20 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs mb-4" style={{ background: "rgba(201,168,76,0.1)", border: "1px solid rgba(201,168,76,0.3)", color: "#c9a84c", fontFamily: "'Outfit', sans-serif" }}>
            <i className="fas fa-hotel" /> Hébergement
          </div>
          <h2 className="text-3xl sm:text-4xl font-semibold text-white mb-3" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            Réservez Votre Hôtel
          </h2>
          <p className="text-gray-400 text-base max-w-xl mx-auto" style={{ fontFamily: "'Outfit', sans-serif" }}>
            Comparez des milliers d'hôtels et trouvez les meilleures offres pour votre séjour.
          </p>
        </div>

        <div
          className="rounded-2xl overflow-hidden"
          style={{
            background: "rgba(18,24,38,0.9)",
            border: "1px solid rgba(201,168,76,0.15)",
            boxShadow: "0 0 40px rgba(201,168,76,0.06)",
          }}
        >
          <div className="grid grid-cols-2 md:grid-cols-4">
            {destinations.map((dest) => (
              <a
                key={dest.name}
                href={HOTELLOOK_URL}
                target="_blank"
                rel="noopener nofollow sponsored"
                data-testid={`hotel-dest-${dest.name.toLowerCase()}`}
                className="relative h-40 overflow-hidden group block"
              >
                <img
                  src={dest.img}
                  alt={dest.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1a]/90 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 font-medium text-white text-sm" style={{ fontFamily: "'Outfit', sans-serif" }}>
                  {dest.name}
                </div>
              </a>
            ))}
          </div>

          <div className="p-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl font-semibold text-white mb-2" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                Plus de 1 000 000 d'hôtels dans le monde
              </h3>
              <p className="text-gray-400 text-sm" style={{ fontFamily: "'Outfit', sans-serif" }}>
                Comparez les prix sur des centaines de sites de réservation simultanément.
              </p>
              <div className="flex flex-wrap gap-4 mt-3">
                {["Annulation gratuite", "Meilleur prix garanti", "Photos vérifiées"].map((f) => (
                  <div key={f} className="flex items-center gap-1 text-xs text-gray-300" style={{ fontFamily: "'Outfit', sans-serif" }}>
                    <i className="fas fa-check text-[#c9a84c]" />
                    {f}
                  </div>
                ))}
              </div>
            </div>
            <a
              href={HOTELLOOK_URL}
              target="_blank"
              rel="noopener nofollow sponsored"
              data-testid="hotel-search-cta"
              className="flex-shrink-0 px-8 py-4 font-semibold text-sm rounded-full text-[#0a0f1a] transition-all duration-300 hover:scale-105 hover:shadow-xl"
              style={{ background: "linear-gradient(135deg, #c9a84c, #f0c040)", fontFamily: "'Outfit', sans-serif", boxShadow: "0 4px 20px rgba(201,168,76,0.3)", whiteSpace: "nowrap" }}
            >
              <i className="fas fa-search mr-2" />
              Rechercher un hôtel
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
