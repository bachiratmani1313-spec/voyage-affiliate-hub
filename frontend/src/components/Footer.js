import { Link } from "react-router-dom";
import { Plane } from "lucide-react";

const legalLinks = [
  { label: "Mentions légales", to: "/mentions-legales" },
  { label: "CGU", to: "/cgu" },
  { label: "Politique de confidentialité", to: "/confidentialite" },
  { label: "Disclosure affiliation", to: "/affiliation" },
];

const quickLinks = [
  { label: "Recherche de vols", hash: "vols" },
  { label: "Hôtels", hash: "hotels" },
  { label: "Location de voitures", hash: "location" },
  { label: "Boutique Amazon", hash: "boutique" },
];

const partners = [
  { name: "TravelPayouts", url: "https://www.travelpayouts.com/?marker=704469.poweredby" },
  { name: "Aviasales", url: "https://www.aviasales.fr/" },
  { name: "KiwiTaxi", url: "https://kiwitaxi.com/?marker=704469.704469" },
  { name: "DiscoverCars", url: "https://www.discovercars.com/?a_aid=704469" },
  { name: "HotelLook", url: "https://hotellook.com/?marker=704469&locale=fr" },
  { name: "Amazon.fr", url: "https://www.amazon.fr/?tag=vrax-21" },
];

export default function Footer() {
  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer data-testid="footer" style={{ background: "#070b14", borderTop: "1px solid rgba(201,168,76,0.15)" }}>
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: "linear-gradient(135deg, #c9a84c, #f0c040)" }}>
                <Plane size={16} className="text-[#0a0f1a]" />
              </div>
              <span className="font-bold text-xl" style={{ fontFamily: "'Cormorant Garamond', serif", color: "#c9a84c" }}>
                Vrax <span className="text-white">Voyage</span>
              </span>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed mb-4" style={{ fontFamily: "'Outfit', sans-serif" }}>
              Votre comparateur de voyages premium. Trouvez les meilleurs prix de vols, hôtels et services de transfert.
            </p>
            <div className="text-xs text-gray-500" style={{ fontFamily: "'Outfit', sans-serif" }}>
              Propriétaire : <span className="text-[#c9a84c] font-medium">Atmani Bachir</span>
            </div>
            <div className="flex gap-3 mt-4">
              {[
                { icon: "fab fa-tiktok", url: "#" },
                { icon: "fab fa-instagram", url: "#" },
                { icon: "fab fa-youtube", url: "#" },
                { icon: "fab fa-facebook-f", url: "#" },
              ].map((s) => (
                <a
                  key={s.icon}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full flex items-center justify-center text-gray-400 hover:text-[#c9a84c] transition-all duration-300 hover:scale-110"
                  style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)" }}
                >
                  <i className={`${s.icon} text-sm`} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-5 tracking-wider uppercase" style={{ fontFamily: "'Outfit', sans-serif" }}>
              Navigation
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((l) => (
                <li key={l.hash}>
                  <button
                    onClick={() => scrollTo(l.hash)}
                    className="text-sm text-gray-400 hover:text-[#c9a84c] transition-colors duration-300 flex items-center gap-2"
                    style={{ fontFamily: "'Outfit', sans-serif", background: "none", border: "none", cursor: "pointer", padding: 0 }}
                  >
                    <i className="fas fa-chevron-right text-xs text-[#c9a84c]" />
                    {l.label}
                  </button>
                </li>
              ))}
              <li>
                <Link to="/blog" className="text-sm text-gray-400 hover:text-[#c9a84c] transition-colors duration-300 flex items-center gap-2" style={{ fontFamily: "'Outfit', sans-serif" }}>
                  <i className="fas fa-chevron-right text-xs text-[#c9a84c]" />
                  Blog destinations
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-gray-400 hover:text-[#c9a84c] transition-colors duration-300 flex items-center gap-2" style={{ fontFamily: "'Outfit', sans-serif" }}>
                  <i className="fas fa-chevron-right text-xs text-[#c9a84c]" />
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Partners */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-5 tracking-wider uppercase" style={{ fontFamily: "'Outfit', sans-serif" }}>
              Partenaires affiliés
            </h4>
            <ul className="space-y-3">
              {partners.map((p) => (
                <li key={p.name}>
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noopener nofollow sponsored"
                    className="text-sm text-gray-400 hover:text-[#c9a84c] transition-colors duration-300 flex items-center gap-2"
                    style={{ fontFamily: "'Outfit', sans-serif" }}
                  >
                    <i className="fas fa-external-link-alt text-xs text-[#c9a84c]" />
                    {p.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-5 tracking-wider uppercase" style={{ fontFamily: "'Outfit', sans-serif" }}>
              Informations légales
            </h4>
            <ul className="space-y-3">
              {legalLinks.map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="text-sm text-gray-400 hover:text-[#c9a84c] transition-colors duration-300 flex items-center gap-2"
                    style={{ fontFamily: "'Outfit', sans-serif" }}
                  >
                    <i className="fas fa-chevron-right text-xs text-[#c9a84c]" />
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-6 p-3 rounded-lg text-xs text-gray-500 leading-relaxed" style={{ background: "rgba(201,168,76,0.06)", border: "1px solid rgba(201,168,76,0.1)", fontFamily: "'Outfit', sans-serif" }}>
              <i className="fas fa-info-circle text-[#c9a84c] mr-1" />
              Ce site contient des liens d'affiliation. Voir notre{" "}
              <Link to="/affiliation" className="text-[#c9a84c] hover:underline">
                politique d'affiliation
              </Link>.
            </div>
          </div>
        </div>
      </div>

      {/* Emergent referral banner */}
      <div style={{ borderTop: "1px solid rgba(201,168,76,0.1)", background: "rgba(201,168,76,0.04)" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-3 flex flex-col sm:flex-row items-center justify-center gap-3">
          <p className="text-xs text-gray-400 text-center" style={{ fontFamily: "'Outfit', sans-serif" }}>
            <i className="fas fa-rocket text-[#c9a84c] mr-1" />
            Vous souhaitez créer votre propre site web ou application ?
          </p>
          <a
            href="https://app.emergent.sh/register?ref=bach300594"
            target="_blank"
            rel="noopener sponsored"
            data-testid="emergent-referral-link"
            className="flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 hover:scale-105 hover:shadow-md flex-shrink-0"
            style={{
              background: "linear-gradient(135deg,#c9a84c,#f0c040)",
              color: "#0a0f1a",
              fontFamily: "'Outfit', sans-serif",
              boxShadow: "0 2px 10px rgba(201,168,76,0.2)",
            }}
          >
            <i className="fas fa-external-link-alt text-[10px]" />
            Créer mon site sur Emergent
          </a>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-4 flex flex-col md:flex-row items-center justify-between gap-2">
          <p className="text-xs text-gray-500" style={{ fontFamily: "'Outfit', sans-serif" }}>
            © {new Date().getFullYear()} Vrax Voyage. Tous droits réservés. Propriétaire : <span className="text-gray-400">Atmani Bachir</span>
          </p>
          <p className="text-xs text-gray-600" style={{ fontFamily: "'Outfit', sans-serif" }}>
            Site créé avec passion pour les voyageurs francophones
          </p>
        </div>
      </div>
    </footer>
  );
}
