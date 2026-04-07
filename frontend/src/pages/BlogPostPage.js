import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { blogPosts as localPosts } from "../data/blogData";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function BlogPostPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const post = localPosts.find((p) => p.slug === slug);

  const [likes, setLikes] = useState(post?.likes || 0);
  const [liked, setLiked] = useState(false);
  const [comments, setComments] = useState([]);
  const [form, setForm] = useState({ author: "", content: "" });
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!post) { navigate("/blog"); return; }
    document.title = `${post.title} | Vrax Voyage Blog`;
    const stored = JSON.parse(localStorage.getItem("vrax_liked") || "{}");
    setLiked(!!stored[post.id]);

    // Fetch likes
    axios.get(`${API}/blog/posts`).then((res) => {
      const found = res.data.find((p) => p.id === post.id);
      if (found) setLikes(found.likes);
    }).catch(() => {});

    // Fetch comments
    axios.get(`${API}/blog/posts/${post.id}/comments`).then((res) => {
      setComments(res.data);
    }).catch(() => {});
  }, [slug, post, navigate]);

  const handleLike = async () => {
    if (liked) return;
    try {
      const res = await axios.post(`${API}/blog/posts/${post.id}/like`);
      setLikes(res.data.likes);
    } catch {
      setLikes((l) => l + 1);
    }
    const stored = JSON.parse(localStorage.getItem("vrax_liked") || "{}");
    stored[post.id] = true;
    localStorage.setItem("vrax_liked", JSON.stringify(stored));
    setLiked(true);
  };

  const handleComment = async (e) => {
    e.preventDefault();
    if (!form.author.trim() || !form.content.trim()) return;
    setSending(true);
    try {
      const res = await axios.post(`${API}/blog/posts/${post.id}/comments`, form);
      setComments((prev) => [...prev, res.data]);
      setForm({ author: "", content: "" });
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch {
      setSuccess(false);
    }
    setSending(false);
  };

  if (!post) return null;

  const infoCards = [
    { icon: "fa-sun", label: "Meilleure saison", value: post.bestSeason },
    { icon: "fa-thermometer-half", label: "Température", value: post.temperature },
    { icon: "fa-plane", label: "Vol depuis Paris", value: post.flightTime },
    { icon: "fa-money-bill-wave", label: "Monnaie", value: post.currency },
    { icon: "fa-language", label: "Langue", value: post.language },
    { icon: "fa-clock", label: "Fuseau horaire", value: post.timezone },
  ];

  return (
    <div style={{ background: "#0a0f1a", minHeight: "100vh" }}>
      {/* Hero */}
      <div className="relative h-[55vh] min-h-[400px] overflow-hidden">
        <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(10,15,26,0.4) 0%, rgba(10,15,26,0.85) 100%)" }} />
        <div className="absolute inset-0 flex flex-col items-center justify-end pb-12 px-6 text-center">
          <div className="flex gap-2 mb-4 flex-wrap justify-center">
            {post.tags.map((tag) => (
              <span key={tag} className="px-2 py-0.5 text-xs rounded-full font-medium text-[#0a0f1a]" style={{ background: "#c9a84c", fontFamily: "'Outfit', sans-serif" }}>
                {tag}
              </span>
            ))}
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-white max-w-3xl leading-tight" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            {post.title}
          </h1>
          <div className="flex gap-6 mt-4 text-sm text-gray-300" style={{ fontFamily: "'Outfit', sans-serif" }}>
            <span><i className="fas fa-map-marker-alt text-[#c9a84c] mr-1" />{post.country}</span>
            <span><i className="fas fa-clock text-[#c9a84c] mr-1" />{post.readTime} de lecture</span>
            <span><i className="fas fa-calendar text-[#c9a84c] mr-1" />{new Date(post.date).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}</span>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 lg:px-8 py-12">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-8" style={{ fontFamily: "'Outfit', sans-serif" }}>
          <Link to="/" className="hover:text-[#c9a84c] transition-colors">Accueil</Link>
          <i className="fas fa-chevron-right text-xs" />
          <Link to="/blog" className="hover:text-[#c9a84c] transition-colors">Blog</Link>
          <i className="fas fa-chevron-right text-xs" />
          <span className="text-gray-400">{post.country}</span>
        </div>

        {/* Info cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-10">
          {infoCards.map((card) => (
            <div key={card.label} className="p-4 rounded-xl text-center" style={{ background: "rgba(18,24,38,0.9)", border: "1px solid rgba(201,168,76,0.15)" }}>
              <i className={`fas ${card.icon} text-[#c9a84c] mb-2 block`} />
              <div className="text-xs text-gray-400 mb-1" style={{ fontFamily: "'Outfit', sans-serif" }}>{card.label}</div>
              <div className="text-sm font-medium text-white" style={{ fontFamily: "'Outfit', sans-serif" }}>{card.value}</div>
            </div>
          ))}
        </div>

        {/* Article content */}
        <div className="prose prose-invert prose-lg max-w-none mb-10">
          {post.content.split("\n\n").map((para, i) => (
            <p key={i} className="text-gray-300 leading-relaxed mb-5 text-base" style={{ fontFamily: "'Outfit', sans-serif" }}>
              {para}
            </p>
          ))}
        </div>

        {/* Like + Share section */}
        <div className="py-6 mb-10" style={{ borderTop: "1px solid rgba(255,255,255,0.08)", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            {/* Like */}
            <div className="flex items-center gap-4">
              <button
                onClick={handleLike}
                data-testid="post-like-btn"
                disabled={liked}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold text-sm transition-all duration-300 hover:scale-105"
                style={{
                  background: liked ? "rgba(239,68,68,0.15)" : "rgba(239,68,68,0.1)",
                  border: "1px solid rgba(239,68,68,0.4)",
                  color: liked ? "#f87171" : "#fca5a5",
                  fontFamily: "'Outfit', sans-serif",
                  cursor: liked ? "not-allowed" : "pointer",
                }}
              >
                <i className={`${liked ? "fas" : "far"} fa-heart`} />
                {likes} J'aime
              </button>
              <span className="text-xs text-gray-500" style={{ fontFamily: "'Outfit', sans-serif" }}>
                {liked ? "Merci pour votre like !" : "Cet article vous a plu ?"}
              </span>
            </div>

            {/* Share buttons */}
            <div className="flex items-center gap-2" data-testid="share-buttons">
              <span className="text-xs text-gray-500 mr-1" style={{ fontFamily: "'Outfit', sans-serif" }}>Partager :</span>
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(window.location.href)}&via=VraxVoyage`}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="share-twitter"
                title="Partager sur X (Twitter)"
                className="w-9 h-9 rounded-full flex items-center justify-center text-white transition-all duration-300 hover:scale-110 hover:opacity-90"
                style={{ background: "#000000" }}
                onClick={() => window.gtag && window.gtag('event', 'share', { method: 'Twitter', content_type: 'article', item_id: post.slug })}
              >
                <i className="fab fa-x-twitter text-sm" />
              </a>
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="share-facebook"
                title="Partager sur Facebook"
                className="w-9 h-9 rounded-full flex items-center justify-center text-white transition-all duration-300 hover:scale-110 hover:opacity-90"
                style={{ background: "#1877F2" }}
                onClick={() => window.gtag && window.gtag('event', 'share', { method: 'Facebook', content_type: 'article', item_id: post.slug })}
              >
                <i className="fab fa-facebook-f text-sm" />
              </a>
              <a
                href={`https://wa.me/?text=${encodeURIComponent(post.title + " — " + window.location.href)}`}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="share-whatsapp"
                title="Partager sur WhatsApp"
                className="w-9 h-9 rounded-full flex items-center justify-center text-white transition-all duration-300 hover:scale-110 hover:opacity-90"
                style={{ background: "#25D366" }}
                onClick={() => window.gtag && window.gtag('event', 'share', { method: 'WhatsApp', content_type: 'article', item_id: post.slug })}
              >
                <i className="fab fa-whatsapp text-base" />
              </a>
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="share-linkedin"
                title="Partager sur LinkedIn"
                className="w-9 h-9 rounded-full flex items-center justify-center text-white transition-all duration-300 hover:scale-110 hover:opacity-90"
                style={{ background: "#0A66C2" }}
                onClick={() => window.gtag && window.gtag('event', 'share', { method: 'LinkedIn', content_type: 'article', item_id: post.slug })}
              >
                <i className="fab fa-linkedin-in text-sm" />
              </a>
              <button
                onClick={() => { navigator.clipboard.writeText(window.location.href); }}
                data-testid="share-copy"
                title="Copier le lien"
                className="w-9 h-9 rounded-full flex items-center justify-center text-gray-300 transition-all duration-300 hover:scale-110 hover:text-[#c9a84c]"
                style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.1)" }}
              >
                <i className="fas fa-link text-xs" />
              </button>
            </div>
          </div>
        </div>

        {/* Comments */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-white mb-6" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            Commentaires ({comments.length})
          </h2>

          {comments.length === 0 ? (
            <div className="text-center py-8 text-gray-500" style={{ fontFamily: "'Outfit', sans-serif" }}>
              <i className="far fa-comment-dots text-2xl text-gray-600 mb-2 block" />
              Soyez le premier à commenter cet article !
            </div>
          ) : (
            <div className="space-y-4 mb-8">
              {comments.map((c) => (
                <div key={c.id} className="p-4 rounded-xl" style={{ background: "rgba(18,24,38,0.8)", border: "1px solid rgba(255,255,255,0.06)" }}>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-[#0a0f1a]" style={{ background: "#c9a84c" }}>
                      {c.author.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <div className="text-sm font-medium text-white" style={{ fontFamily: "'Outfit', sans-serif" }}>{c.author}</div>
                      <div className="text-xs text-gray-500" style={{ fontFamily: "'Outfit', sans-serif" }}>
                        {new Date(c.created_at).toLocaleDateString("fr-FR")}
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-300 ml-11" style={{ fontFamily: "'Outfit', sans-serif" }}>{c.content}</p>
                </div>
              ))}
            </div>
          )}

          {/* Comment form */}
          <div className="p-6 rounded-2xl" style={{ background: "rgba(18,24,38,0.9)", border: "1px solid rgba(201,168,76,0.15)" }}>
            <h3 className="text-lg font-semibold text-white mb-4" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              Laisser un commentaire
            </h3>
            {success && (
              <div className="mb-4 p-3 rounded-lg text-sm text-green-400" style={{ background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.3)", fontFamily: "'Outfit', sans-serif" }}>
                <i className="fas fa-check-circle mr-2" />Commentaire publié avec succès !
              </div>
            )}
            <form onSubmit={handleComment} className="space-y-4">
              <input
                type="text"
                placeholder="Votre nom"
                value={form.author}
                onChange={(e) => setForm({ ...form, author: e.target.value })}
                data-testid="comment-author-input"
                required
                className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-gray-500 outline-none focus:ring-1 focus:ring-[#c9a84c]"
                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", fontFamily: "'Outfit', sans-serif" }}
              />
              <textarea
                placeholder="Votre commentaire..."
                value={form.content}
                onChange={(e) => setForm({ ...form, content: e.target.value })}
                data-testid="comment-content-input"
                required
                rows={4}
                className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-gray-500 outline-none focus:ring-1 focus:ring-[#c9a84c] resize-none"
                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", fontFamily: "'Outfit', sans-serif" }}
              />
              <button
                type="submit"
                disabled={sending}
                data-testid="comment-submit-btn"
                className="px-8 py-3 rounded-full font-semibold text-sm text-[#0a0f1a] transition-all duration-300 hover:scale-105 disabled:opacity-60"
                style={{ background: "linear-gradient(135deg, #c9a84c, #f0c040)", fontFamily: "'Outfit', sans-serif" }}
              >
                {sending ? <><i className="fas fa-spinner fa-spin mr-2" />Envoi...</> : <><i className="fas fa-paper-plane mr-2" />Publier</>}
              </button>
            </form>
          </div>
        </div>

        {/* Back link */}
        <Link to="/blog" data-testid="back-to-blog" className="flex items-center gap-2 text-sm text-[#c9a84c] hover:underline" style={{ fontFamily: "'Outfit', sans-serif" }}>
          <i className="fas fa-arrow-left" /> Retour au blog
        </Link>
      </div>
    </div>
  );
}
