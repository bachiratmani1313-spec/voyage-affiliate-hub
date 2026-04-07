import { useEffect } from "react";

export default function PriceMapWidget() {
  useEffect(() => {
    const scriptId = "tp-script-4054";
    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script");
      script.id = scriptId;
      script.src = "https://c121.travelpayouts.com/content?promo_id=4054&shmarker=704469&locale=fr&currency=eur&powered_by=true";
      script.async = true;
      script.charset = "utf-8";
      document.body.appendChild(script);
    }
  }, []);

  return (
    <section id="map-real" data-testid="pricemap-section" className="py-20 px-6 lg:px-12 max-w-7xl mx-auto">
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs mb-4" style={{ background: "rgba(201,168,76,0.1)", border: "1px solid rgba(201,168,76,0.3)", color: "#c9a84c", fontFamily: "'Outfit', sans-serif" }}>
          <i className="fas fa-map-marked-alt" /> Radar des prix
        </div>
        <h2 className="text-3xl sm:text-4xl font-semibold text-white mb-3" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
          Exploration des Prix en Temps Réel
        </h2>
        <p className="text-gray-400 text-base max-w-xl mx-auto" style={{ fontFamily: "'Outfit', sans-serif" }}>
          Découvrez les meilleures destinations selon votre budget grâce à la carte interactive des prix.
        </p>
      </div>

      <div
        className="rounded-2xl overflow-hidden"
        style={{
          background: "rgba(18,24,38,0.8)",
          border: "1px solid rgba(201,168,76,0.2)",
          boxShadow: "0 0 40px rgba(201,168,76,0.08)",
          minHeight: "500px",
        }}
      >
        <div
          dangerouslySetInnerHTML={{
            __html: `<tp-cascoon id="tp-cascoon-map" data-cascoon-id="4054_0" style="display:block; min-height:500px;"></tp-cascoon>`,
          }}
        />
        <div className="text-center py-2 text-xs text-gray-500" style={{ fontFamily: "'Outfit', sans-serif" }}>
          Partenaire officiel{" "}
          <a href="https://www.travelpayouts.com/?marker=704469.poweredby" target="_blank" rel="nofollow noopener noreferrer" className="text-[#c9a84c] hover:underline">
            TravelPayouts
          </a>
        </div>
      </div>
    </section>
  );
}
