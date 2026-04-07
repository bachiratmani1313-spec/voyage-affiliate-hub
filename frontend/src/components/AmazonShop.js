const products = [
  {
    id: "bagagerie",
    title: "Bagagerie Cabine",
    desc: "Valises légères et résistantes conformes aux normes compagnies aériennes.",
    img: "https://images.unsplash.com/photo-1565026057447-bc90a3dceb87?auto=format&fit=crop&w=400&q=80",
    url: "https://www.amazon.fr/s?k=valise+voyage+cabine&tag=vrax-21",
    icon: "fa-suitcase",
  },
  {
    id: "tech",
    title: "Tech & Énergie",
    desc: "Chargeurs solaires, adaptateurs universels et accessoires connectés.",
    img: "https://images.unsplash.com/photo-1525706732602-52592370085e?auto=format&fit=crop&w=400&q=80",
    url: "https://www.amazon.fr/s?k=accessoires+voyage+tech&tag=vrax-21",
    icon: "fa-bolt",
  },
  {
    id: "confort",
    title: "Repos en Vol",
    desc: "Oreillers de voyage, masques de nuit et couvertures compactes.",
    img: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=400&q=80",
    url: "https://www.amazon.fr/s?k=oreiller+voyage+confort&tag=vrax-21",
    icon: "fa-moon",
  },
  {
    id: "organisation",
    title: "Organisation",
    desc: "Organisateurs de valise, pochettes étanches et rangements malins.",
    img: "https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=400&q=80",
    url: "https://www.amazon.fr/s?k=organisateur+de+voyage+valise&tag=vrax-21",
    icon: "fa-th-large",
  },
  {
    id: "pesebagage",
    title: "Pèse-bagages",
    desc: "Évitez les frais de surpoids avec un pèse-bagage électronique précis.",
    img: "https://images.unsplash.com/photo-1533106418989-88406c7cc8ca?auto=format&fit=crop&w=400&q=80",
    url: "https://www.amazon.fr/s?k=pese+bagage+electronique&tag=vrax-21",
    icon: "fa-balance-scale",
  },
  {
    id: "hygiene",
    title: "Hygiène Cabine",
    desc: "Trousses transparentes et produits de soin aux formats cabine.",
    img: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=400&q=80",
    url: "https://www.amazon.fr/s?k=trousse+toilette+cabine+transparente&tag=vrax-21",
    icon: "fa-pump-soap",
  },
];

export default function AmazonShop() {
  return (
    <section id="boutique" data-testid="amazon-shop-section" className="py-20 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs mb-4" style={{ background: "rgba(201,168,76,0.1)", border: "1px solid rgba(201,168,76,0.3)", color: "#c9a84c", fontFamily: "'Outfit', sans-serif" }}>
            <i className="fab fa-amazon" /> Boutique officielle
          </div>
          <h2 className="text-3xl sm:text-4xl font-semibold text-white mb-3" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            Équipement Voyage Premium
          </h2>
          <p className="text-gray-400 text-base max-w-xl mx-auto" style={{ fontFamily: "'Outfit', sans-serif" }}>
            Notre sélection d'accessoires indispensables pour voyager confortablement et en toute sérénité.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((p) => (
            <div
              key={p.id}
              data-testid={`product-card-${p.id}`}
              className="rounded-2xl overflow-hidden group transition-all duration-300 hover:-translate-y-1"
              style={{
                background: "rgba(18,24,38,0.9)",
                border: "1px solid rgba(255,255,255,0.06)",
                boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(201,168,76,0.35)";
                e.currentTarget.style.boxShadow = "0 0 20px rgba(201,168,76,0.12)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)";
                e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.2)";
              }}
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={p.img}
                  alt={p.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#121826]/80 to-transparent" />
                <div
                  className="absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center"
                  style={{ background: "rgba(201,168,76,0.9)" }}
                >
                  <i className={`fas ${p.icon} text-[#0a0f1a] text-sm`} />
                </div>
              </div>
              <div className="p-5">
                <h3 className="text-lg font-semibold text-white mb-1" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                  {p.title}
                </h3>
                <p className="text-sm text-gray-400 mb-4 leading-relaxed" style={{ fontFamily: "'Outfit', sans-serif" }}>
                  {p.desc}
                </p>
                <a
                  href={p.url}
                  target="_blank"
                  rel="noopener nofollow sponsored"
                  data-testid={`amazon-btn-${p.id}`}
                  className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-full text-sm font-semibold transition-all duration-300 hover:scale-105 text-[#0a0f1a]"
                  style={{ background: "linear-gradient(135deg, #c9a84c, #f0c040)", fontFamily: "'Outfit', sans-serif" }}
                >
                  <i className="fab fa-amazon" />
                  Voir sur Amazon
                </a>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-xs text-gray-500 mt-6" style={{ fontFamily: "'Outfit', sans-serif" }}>
          En tant que Partenaire Amazon, Vrax Voyage réalise des bénéfices sur les achats remplissant les conditions requises.
          <a href="/affiliation" className="text-[#c9a84c] hover:underline ml-1">En savoir plus</a>
        </p>
      </div>
    </section>
  );
}
