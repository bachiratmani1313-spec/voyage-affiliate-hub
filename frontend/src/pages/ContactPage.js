import { useState, useEffect } from "react";
import axios from "axios";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const subjects = [
  "Question générale",
  "Problème technique",
  "Partenariat / Affiliation",
  "Suggestion d'article",
  "Autre",
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: subjects[0], message: "" });
  const [sending, setSending] = useState(false);
  const [result, setResult] = useState(null);

  useEffect(() => {
    document.title = "Contact | Vrax Voyage";
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    try {
      const res = await axios.post(`${API}/contact`, form);
      setResult({ success: true, message: res.data.message });
      setForm({ name: "", email: "", subject: subjects[0], message: "" });
    } catch {
      setResult({ success: false, message: "Une erreur est survenue. Veuillez réessayer." });
    }
    setSending(false);
  };

  return (
    <div style={{ background: "#0a0f1a", minHeight: "100vh" }}>
      {/* Header */}
      <div className="pt-28 pb-16 px-6 text-center" style={{ background: "linear-gradient(to bottom, #0d1930, #0a0f1a)" }}>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs mb-4" style={{ background: "rgba(201,168,76,0.1)", border: "1px solid rgba(201,168,76,0.3)", color: "#c9a84c", fontFamily: "'Outfit', sans-serif" }}>
          <i className="fas fa-envelope" /> Contact
        </div>
        <h1 className="text-4xl sm:text-5xl font-semibold text-white mb-4" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
          Contactez-Nous
        </h1>
        <p className="text-gray-400 text-base max-w-xl mx-auto" style={{ fontFamily: "'Outfit', sans-serif" }}>
          Une question, une suggestion ou une demande de partenariat ?
          Notre équipe vous répond dans les 24 heures.
        </p>
      </div>

      <div className="max-w-5xl mx-auto px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Info cards */}
          <div className="space-y-4">
            {[
              { icon: "fa-user-tie", title: "Propriétaire", value: "Atmani Bachir", sub: "Créateur de Vrax Voyage" },
              { icon: "fa-envelope", title: "Email", value: "contact@vrax-voyage.com", sub: "Réponse sous 24h" },
              { icon: "fa-globe", title: "Site", value: "vrax-voyage.com", sub: "Comparateur de voyages" },
            ].map((info) => (
              <div
                key={info.title}
                data-testid={`contact-info-${info.title.toLowerCase()}`}
                className="p-5 rounded-xl"
                style={{ background: "rgba(18,24,38,0.9)", border: "1px solid rgba(201,168,76,0.15)" }}
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "rgba(201,168,76,0.15)" }}>
                    <i className={`fas ${info.icon} text-[#c9a84c]`} />
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 mb-1" style={{ fontFamily: "'Outfit', sans-serif" }}>{info.title}</div>
                    <div className="text-sm font-medium text-white" style={{ fontFamily: "'Outfit', sans-serif" }}>{info.value}</div>
                    <div className="text-xs text-gray-400 mt-0.5" style={{ fontFamily: "'Outfit', sans-serif" }}>{info.sub}</div>
                  </div>
                </div>
              </div>
            ))}

            {/* Affiliate disclosure notice */}
            <div className="p-4 rounded-xl text-xs text-gray-400 leading-relaxed" style={{ background: "rgba(201,168,76,0.06)", border: "1px solid rgba(201,168,76,0.15)", fontFamily: "'Outfit', sans-serif" }}>
              <i className="fas fa-info-circle text-[#c9a84c] mr-1" />
              <strong className="text-gray-300">Disclosure :</strong> Ce site utilise des liens d'affiliation avec TravelPayouts, Amazon, KiwiTaxi et DiscoverCars. Ces partenariats permettent de maintenir le service gratuit.
            </div>
          </div>

          {/* Contact form */}
          <div
            className="lg:col-span-2 p-8 rounded-2xl"
            style={{ background: "rgba(18,24,38,0.9)", border: "1px solid rgba(201,168,76,0.15)" }}
          >
            <h2 className="text-2xl font-semibold text-white mb-6" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              Envoyez un message
            </h2>

            {result && (
              <div
                className={`mb-6 p-4 rounded-xl text-sm`}
                data-testid="contact-result"
                style={{
                  background: result.success ? "rgba(34,197,94,0.1)" : "rgba(239,68,68,0.1)",
                  border: `1px solid ${result.success ? "rgba(34,197,94,0.3)" : "rgba(239,68,68,0.3)"}`,
                  color: result.success ? "#86efac" : "#fca5a5",
                  fontFamily: "'Outfit', sans-serif",
                }}
              >
                <i className={`fas ${result.success ? "fa-check-circle" : "fa-exclamation-circle"} mr-2`} />
                {result.message}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs text-gray-400 mb-2" style={{ fontFamily: "'Outfit', sans-serif" }}>Votre nom *</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    data-testid="contact-name-input"
                    required
                    placeholder="Jean Dupont"
                    className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-gray-500 outline-none focus:ring-1 focus:ring-[#c9a84c]"
                    style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", fontFamily: "'Outfit', sans-serif" }}
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-400 mb-2" style={{ fontFamily: "'Outfit', sans-serif" }}>Votre email *</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    data-testid="contact-email-input"
                    required
                    placeholder="email@exemple.com"
                    className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-gray-500 outline-none focus:ring-1 focus:ring-[#c9a84c]"
                    style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", fontFamily: "'Outfit', sans-serif" }}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-gray-400 mb-2" style={{ fontFamily: "'Outfit', sans-serif" }}>Sujet *</label>
                <select
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  data-testid="contact-subject-select"
                  className="w-full px-4 py-3 rounded-xl text-sm text-white outline-none focus:ring-1 focus:ring-[#c9a84c]"
                  style={{ background: "rgba(18,24,38,0.95)", border: "1px solid rgba(255,255,255,0.1)", fontFamily: "'Outfit', sans-serif" }}
                >
                  {subjects.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-xs text-gray-400 mb-2" style={{ fontFamily: "'Outfit', sans-serif" }}>Message *</label>
                <textarea
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  data-testid="contact-message-input"
                  required
                  rows={6}
                  placeholder="Votre message..."
                  className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-gray-500 outline-none focus:ring-1 focus:ring-[#c9a84c] resize-none"
                  style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", fontFamily: "'Outfit', sans-serif" }}
                />
              </div>

              <button
                type="submit"
                disabled={sending}
                data-testid="contact-submit-btn"
                className="w-full py-4 rounded-full font-semibold text-sm text-[#0a0f1a] transition-all duration-300 hover:scale-105 hover:shadow-xl disabled:opacity-60"
                style={{ background: "linear-gradient(135deg, #c9a84c, #f0c040)", fontFamily: "'Outfit', sans-serif", boxShadow: "0 4px 20px rgba(201,168,76,0.3)" }}
              >
                {sending ? <><i className="fas fa-spinner fa-spin mr-2" />Envoi en cours...</> : <><i className="fas fa-paper-plane mr-2" />Envoyer le message</>}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
