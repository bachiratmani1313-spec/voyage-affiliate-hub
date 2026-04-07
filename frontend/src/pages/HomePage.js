import { useEffect } from "react";
import Hero from "../components/Hero";
import FlightWidget from "../components/FlightWidget";
import PriceMapWidget from "../components/PriceMapWidget";
import ServicesSection from "../components/ServicesSection";
import HotelSection from "../components/HotelSection";
import AmazonShop from "../components/AmazonShop";
import BlogSection from "../components/BlogSection";

export default function HomePage() {
  useEffect(() => {
    document.title = "Vrax Voyage | L'Excellence du Voyage - Comparateur de Vols";
  }, []);

  return (
    <div style={{ background: "#0a0f1a" }}>
      <Hero />

      {/* Gold divider */}
      <div className="h-px mx-auto max-w-4xl" style={{ background: "linear-gradient(to right, transparent, rgba(201,168,76,0.4), transparent)" }} />

      <FlightWidget />

      <div className="h-px mx-auto max-w-4xl" style={{ background: "linear-gradient(to right, transparent, rgba(201,168,76,0.2), transparent)" }} />

      <PriceMapWidget />

      <div className="h-px mx-auto max-w-4xl" style={{ background: "linear-gradient(to right, transparent, rgba(201,168,76,0.2), transparent)" }} />

      <ServicesSection />

      <div className="h-px mx-auto max-w-4xl" style={{ background: "linear-gradient(to right, transparent, rgba(201,168,76,0.2), transparent)" }} />

      <HotelSection />

      <div className="h-px mx-auto max-w-4xl" style={{ background: "linear-gradient(to right, transparent, rgba(201,168,76,0.2), transparent)" }} />

      <AmazonShop />

      <div className="h-px mx-auto max-w-4xl" style={{ background: "linear-gradient(to right, transparent, rgba(201,168,76,0.2), transparent)" }} />

      <BlogSection />
    </div>
  );
}
