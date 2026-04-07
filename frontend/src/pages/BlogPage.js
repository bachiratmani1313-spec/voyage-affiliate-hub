import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { blogPosts as localPosts } from "../data/blogData";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const TAG_COLORS = {
  "Plage": "#0ea5e9",
  "Luxe": "#c9a84c",
  "Culture": "#a855f7",
  "Gastronomie": "#f97316",
  "Plongée": "#06b6d4",
  "Famille": "#22c55e",
  "Soleil": "#f59e0b",
  "All-inclusive": "#ec4899",
};

export default function BlogPage() {
  const [posts, setPosts] = useState(localPosts);
  const [likes, setLikes] = useState({});
  const [liked, setLiked] = useState({});
  const [filter, setFilter] = useState("Tous");

  useEffect(() => {
    document.title = "Blog Destinations Ensoleillées | Vrax Voyage";
    const stored = JSON.parse(localStorage.getItem("vrax_liked") || "{}");
    setLiked(stored);
    axios.get(`${API}/blog/posts`).then((res) => {
      const map = {};
      res.data.forEach((p) => { map[p.id] = p.likes; });
      setLikes(map);
    }).catch(() => {
      const map = {};
      localPosts.forEach((p) => { map[p.id] = p.likes; });
      setLikes(map);
    });
  }, []);

  const handleLike = async (e, postId) => {
    e.preventDefault();
    if (liked[postId]) return;
    try {
      const res = await axios.post(`${API}/blog/posts/${postId}/like`);
      setLikes((prev) => ({ ...prev, [postId]: res.data.likes }));
      const newLiked = { ...liked, [postId]: true };
      setLiked(newLiked);
      localStorage.setItem("vrax_liked", JSON.stringify(newLiked));
    } catch {
      setLikes((prev) => ({ ...prev, [postId]: (prev[postId] || 0) + 1 }));
    }
  };

  const allTags = ["Tous", ...new Set(localPosts.flatMap((p) => p.tags))];
  const filtered = filter === "Tous" ? posts : posts.filter((p) => p.tags.includes(filter));

  return (
    <div style={{ background: "#0a0f1a", minHeight: "100vh" }}>
      {/* Header */}
      <div
        className="pt-28 pb-16 px-6 lg:px-12 text-center"
        style={{ background: "linear-gradient(to bottom, #0d1930, #0a0f1a)" }}
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs mb-4" style={{ background: "rgba(201,168,76,0.1)", border: "1px solid rgba(201,168,76,0.3)", color: "#c9a84c", fontFamily: "'Outfit', sans-serif" }}>
          <i className="fas fa-sun" /> Blog Voyage
        </div>
        <h1 className="text-4xl sm:text-5xl font-semibold text-white mb-4" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
          Destinations <span style={{ color: "#c9a84c" }}>Ensoleillées</span>
        </h1>
        <p className="text-gray-400 text-base max-w-2xl mx-auto" style={{ fontFamily: "'Outfit', sans-serif" }}>
          Inspirez-vous avec nos guides de voyage complets vers les plus beaux pays ensoleillés du monde.
          Conseils pratiques, meilleures saisons et adresses incontournables.
        </p>

        {/* Tag filters */}
        <div className="flex flex-wrap justify-center gap-2 mt-8" data-testid="tag-filters">
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setFilter(tag)}
              data-testid={`tag-filter-${tag}`}
              className="px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200"
              style={{
                fontFamily: "'Outfit', sans-serif",
                background: filter === tag ? "linear-gradient(135deg, #c9a84c, #f0c040)" : "rgba(255,255,255,0.06)",
                color: filter === tag ? "#0a0f1a" : "#9ca3af",
                border: filter === tag ? "none" : "1px solid rgba(255,255,255,0.1)",
              }}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Posts grid */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((post) => (
            <Link
              key={post.id}
              to={`/blog/${post.slug}`}
              data-testid={`blog-post-${post.id}`}
              className="block rounded-2xl overflow-hidden group transition-all duration-300 hover:-translate-y-1 no-underline"
              style={{
                background: "rgba(18,24,38,0.9)",
                border: "1px solid rgba(255,255,255,0.06)",
                boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(201,168,76,0.35)";
                e.currentTarget.style.boxShadow = "0 0 25px rgba(201,168,76,0.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)";
                e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.2)";
              }}
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#121826]/90 to-transparent" />
                <div className="absolute top-3 left-3 flex flex-wrap gap-1">
                  {post.tags.slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 text-xs rounded-full font-medium text-white"
                      style={{ background: "rgba(201,168,76,0.85)", color: "#0a0f1a", fontFamily: "'Outfit', sans-serif" }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                  <span className="text-xs text-gray-300" style={{ fontFamily: "'Outfit', sans-serif" }}>
                    <i className="fas fa-calendar-alt mr-1 text-[#c9a84c]" />
                    {new Date(post.date).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}
                  </span>
                  <span className="text-xs text-gray-300" style={{ fontFamily: "'Outfit', sans-serif" }}>
                    <i className="fas fa-clock mr-1 text-[#c9a84c]" />{post.readTime}
                  </span>
                </div>
              </div>

              <div className="p-5">
                <div className="text-xs text-gray-500 mb-2 flex items-center gap-1" style={{ fontFamily: "'Outfit', sans-serif" }}>
                  <i className="fas fa-map-marker-alt text-[#c9a84c]" /> {post.country}
                </div>
                <h3 className="text-xl font-semibold text-white mb-2 leading-snug" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                  {post.title}
                </h3>
                <p className="text-sm text-gray-400 mb-4 leading-relaxed line-clamp-2" style={{ fontFamily: "'Outfit', sans-serif" }}>
                  {post.excerpt}
                </p>

                {/* Quick info */}
                <div className="grid grid-cols-2 gap-2 mb-4 text-xs text-gray-400 p-3 rounded-xl" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)", fontFamily: "'Outfit', sans-serif" }}>
                  <div><i className="fas fa-sun text-[#c9a84c] mr-1" />{post.bestSeason.split("/")[0]}</div>
                  <div><i className="fas fa-thermometer-half text-[#c9a84c] mr-1" />{post.temperature}</div>
                  <div><i className="fas fa-plane text-[#c9a84c] mr-1" />{post.flightTime}</div>
                  <div><i className="fas fa-money-bill-wave text-[#c9a84c] mr-1" />{post.currency.split(" ")[0]}</div>
                </div>

                <div className="flex items-center justify-between">
                  <button
                    onClick={(e) => handleLike(e, post.id)}
                    data-testid={`like-btn-blog-${post.id}`}
                    className={`flex items-center gap-1.5 text-sm transition-all duration-300 ${liked[post.id] ? "text-red-400" : "text-gray-400 hover:text-red-400"}`}
                    style={{ fontFamily: "'Outfit', sans-serif", background: "none", border: "none", cursor: "pointer" }}
                  >
                    <i className={`${liked[post.id] ? "fas" : "far"} fa-heart`} />
                    {likes[post.id] ?? post.likes}
                  </button>
                  <span className="text-xs text-[#c9a84c] font-medium group-hover:underline flex items-center gap-1" style={{ fontFamily: "'Outfit', sans-serif" }}>
                    Lire l'article <i className="fas fa-arrow-right" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
