import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { blogPosts } from "../data/blogData";
import axios from "axios";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function BlogSection() {
  const [likes, setLikes] = useState({});
  const [liked, setLiked] = useState({});

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("vrax_liked") || "{}");
    setLiked(stored);
    // Fetch likes from backend
    axios.get(`${API}/blog/posts`).then((res) => {
      const map = {};
      res.data.forEach((p) => { map[p.id] = p.likes; });
      setLikes(map);
    }).catch(() => {
      const map = {};
      blogPosts.forEach((p) => { map[p.id] = p.likes; });
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

  const preview = blogPosts.slice(0, 3);

  return (
    <section id="destinations" data-testid="blog-section" className="py-20 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs mb-4" style={{ background: "rgba(201,168,76,0.1)", border: "1px solid rgba(201,168,76,0.3)", color: "#c9a84c", fontFamily: "'Outfit', sans-serif" }}>
              <i className="fas fa-sun" /> Blog destinations
            </div>
            <h2 className="text-3xl sm:text-4xl font-semibold text-white" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              Destinations Ensoleillées
            </h2>
            <p className="text-gray-400 text-base mt-2" style={{ fontFamily: "'Outfit', sans-serif" }}>
              Inspirez-vous avec nos guides de voyage vers les plus beaux pays du soleil.
            </p>
          </div>
          <Link
            to="/blog"
            data-testid="view-all-blog-btn"
            className="flex-shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105"
            style={{ border: "1px solid rgba(201,168,76,0.4)", color: "#c9a84c", background: "rgba(201,168,76,0.08)", fontFamily: "'Outfit', sans-serif" }}
          >
            Voir tous les articles <i className="fas fa-arrow-right" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {preview.map((post) => (
            <Link
              key={post.id}
              to={`/blog/${post.slug}`}
              data-testid={`blog-card-${post.id}`}
              className="block rounded-2xl overflow-hidden group transition-all duration-300 hover:-translate-y-1 no-underline"
              style={{
                background: "rgba(18,24,38,0.9)",
                border: "1px solid rgba(255,255,255,0.06)",
                boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(201,168,76,0.35)";
                e.currentTarget.style.boxShadow = "0 0 20px rgba(201,168,76,0.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)";
                e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.2)";
              }}
            >
              <div className="relative h-52 overflow-hidden">
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
                      className="px-2 py-0.5 text-xs rounded-full font-medium"
                      style={{ background: "rgba(201,168,76,0.85)", color: "#0a0f1a", fontFamily: "'Outfit', sans-serif" }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="absolute bottom-3 right-3 text-xs text-gray-300" style={{ fontFamily: "'Outfit', sans-serif" }}>
                  <i className="fas fa-clock mr-1 text-[#c9a84c]" />{post.readTime}
                </div>
              </div>
              <div className="p-5">
                <div className="text-xs text-gray-500 mb-2 flex items-center gap-1" style={{ fontFamily: "'Outfit', sans-serif" }}>
                  <i className="fas fa-map-marker-alt text-[#c9a84c]" /> {post.country}
                </div>
                <h3 className="text-lg font-semibold text-white mb-2 leading-snug" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                  {post.title}
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed mb-4 line-clamp-2" style={{ fontFamily: "'Outfit', sans-serif" }}>
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <button
                    onClick={(e) => handleLike(e, post.id)}
                    data-testid={`like-btn-${post.id}`}
                    className={`flex items-center gap-1.5 text-sm transition-all duration-300 ${liked[post.id] ? "text-red-400" : "text-gray-400 hover:text-red-400"}`}
                    style={{ fontFamily: "'Outfit', sans-serif", background: "none", border: "none", cursor: "pointer" }}
                  >
                    <i className={`${liked[post.id] ? "fas" : "far"} fa-heart`} />
                    {likes[post.id] || post.likes}
                  </button>
                  <span className="text-xs text-[#c9a84c] font-medium group-hover:underline" style={{ fontFamily: "'Outfit', sans-serif" }}>
                    Lire l'article <i className="fas fa-arrow-right ml-1" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
