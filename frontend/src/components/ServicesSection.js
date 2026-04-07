const KIWITAXI_URL = "https://tpembars.com/re?campaign_id=1&marker=704469&p=647&trs=499802&u=https%3A%2F%2Fkiwitaxi.com%2F%3Fmarker%3D704469.704469&product_type=linkswitcher&journey_id=Y2vu-2cm0Zp8SlqjoZoYb&trace_id=Zz89d0a7a5c6834e128ceef8c-704469&promo_kind=tp_other&page_url=https%3A%2F%2Fvrax-voyage.com%2F%23%2F&install_type=partner";
const DISCOVERCARS_URL = "https://www.discovercars.com/?a_aid=704469";

const carFeatures = [
  { icon: "fa-shield-alt", label: "Assurance incluse" },
  { icon: "fa-gas-pump", label: "Plein offert" },
  { icon: "fa-headset", label: "Assistance 24/7" },
  { icon: "fa-car", label: "700+ modèles" },
];

export default function ServicesSection() {
  return (
    <section id="location" data-testid="services-section" className="py-20 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs mb-4" style={{ background: "rgba(201,168,76,0.1)", border: "1px solid rgba(201,168,76,0.3)", color: "#c9a84c", fontFamily: "'Outfit', sans-serif" }}>
            <i className="fas fa-concierge-bell" /> Services Premium
          </div>
          <h2 className="text-3xl sm:text-4xl font-semibold text-white mb-3" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            Complétez Votre Voyage
          </h2>
          <p className="text-gray-400 text-base max-w-xl mx-auto" style={{ fontFamily: "'Outfit', sans-serif" }}>
            Location de voitures et transferts VIP pour une expérience de voyage complète et sans stress.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Car Rental Card */}
          <div
            data-testid="car-rental-card"
            className="rounded-2xl overflow-hidden group transition-all duration-300 hover:-translate-y-1"
            style={{
              background: "rgba(18,24,38,0.9)",
              border: "1px solid rgba(255,255,255,0.06)",
              boxShadow: "0 4px 30px rgba(0,0,0,0.3)",
            }}
            onMouseEnter={(e) => e.currentTarget.style.borderColor = "rgba(201,168,76,0.4)"}
            onMouseLeave={(e) => e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)"}
          >
            <div
              className="h-52 bg-cover bg-center relative"
              style={{
                backgroundImage: `linear-gradient(rgba(10,15,26,0.5), rgba(10,15,26,0.3)), url('https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=800&q=80')`,
              }}
            >
              <div className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-medium text-[#0a0f1a]" style={{ background: "linear-gradient(135deg, #c9a84c, #f0c040)", fontFamily: "'Outfit', sans-serif" }}>
                Meilleur tarif garanti
              </div>
            </div>
            <div className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: "rgba(201,168,76,0.15)" }}>
                  <i className="fas fa-car text-[#c9a84c]" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white" style={{ fontFamily: "'Cormorant Garamond', serif" }}>Location de Véhicules</h3>
                  <p className="text-xs text-gray-400" style={{ fontFamily: "'Outfit', sans-serif" }}>Via DiscoverCars · Plus de 100 pays</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 mb-5">
                {carFeatures.map((f) => (
                  <div key={f.label} className="flex items-center gap-2 text-sm text-gray-300" style={{ fontFamily: "'Outfit', sans-serif" }}>
                    <i className={`fas ${f.icon} text-xs text-[#c9a84c]`} />
                    {f.label}
                  </div>
                ))}
              </div>
              <a
                href={DISCOVERCARS_URL}
                target="_blank"
                rel="noopener nofollow sponsored"
                data-testid="car-rental-cta"
                onClick={() => window.trackAffiliate && window.trackAffiliate('DiscoverCars', 'location-voiture')}
                className="block text-center py-3 px-6 rounded-full font-semibold text-sm transition-all duration-300 hover:scale-105 hover:shadow-lg text-[#0a0f1a]"
                style={{ background: "linear-gradient(135deg, #c9a84c, #f0c040)", fontFamily: "'Outfit', sans-serif", boxShadow: "0 2px 15px rgba(201,168,76,0.25)" }}
              >
                Comparer les locations <i className="fas fa-arrow-right ml-2" />
              </a>
            </div>
          </div>

          {/* VIP Transfer Card */}
          <div
            data-testid="vip-transfer-card"
            className="rounded-2xl overflow-hidden group transition-all duration-300 hover:-translate-y-1"
            style={{
              background: "rgba(18,24,38,0.9)",
              border: "1px solid rgba(255,255,255,0.06)",
              boxShadow: "0 4px 30px rgba(0,0,0,0.3)",
            }}
            onMouseEnter={(e) => e.currentTarget.style.borderColor = "rgba(201,168,76,0.4)"}
            onMouseLeave={(e) => e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)"}
          >
            <div
              className="h-52 bg-cover bg-center relative"
              style={{
                backgroundImage: `linear-gradient(rgba(10,15,26,0.4), rgba(10,15,26,0.2)), url('https://images.unsplash.com/photo-1758384076382-21f6587e1048?auto=format&fit=crop&w=800&q=80')`,
              }}
            >
              <div className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-medium" style={{ background: "rgba(10,15,26,0.8)", border: "1px solid rgba(201,168,76,0.5)", color: "#c9a84c", fontFamily: "'Outfit', sans-serif" }}>
                Service VIP
              </div>
            </div>
            <div className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: "rgba(201,168,76,0.15)" }}>
                  <i className="fas fa-user-tie text-[#c9a84c]" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white" style={{ fontFamily: "'Cormorant Garamond', serif" }}>Transferts Aéroport VIP</h3>
                  <p className="text-xs text-gray-400" style={{ fontFamily: "'Outfit', sans-serif" }}>Via KiwiTaxi · Chauffeur privé</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 mb-5">
                {[
                  { icon: "fa-crown", label: "Véhicule premium" },
                  { icon: "fa-clock", label: "Ponctualité garantie" },
                  { icon: "fa-wifi", label: "WiFi à bord" },
                  { icon: "fa-suitcase", label: "Bagage inclus" },
                ].map((f) => (
                  <div key={f.label} className="flex items-center gap-2 text-sm text-gray-300" style={{ fontFamily: "'Outfit', sans-serif" }}>
                    <i className={`fas ${f.icon} text-xs text-[#c9a84c]`} />
                    {f.label}
                  </div>
                ))}
              </div>
              <a
                href={KIWITAXI_URL}
                target="_blank"
                rel="noopener nofollow sponsored"
                data-testid="vip-transfer-cta"
                onClick={() => window.trackAffiliate && window.trackAffiliate('KiwiTaxi', 'transfert-vip')}
                className="block text-center py-3 px-6 rounded-full font-semibold text-sm transition-all duration-300 hover:scale-105 hover:shadow-lg"
                style={{ border: "1px solid rgba(201,168,76,0.6)", color: "#c9a84c", background: "rgba(201,168,76,0.08)", fontFamily: "'Outfit', sans-serif" }}
              >
                Obtenir un devis KiwiTaxi <i className="fas fa-arrow-right ml-2" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
