"use client";

import React, { useEffect, useState } from "react";

type Post = {
  _id?: string;
  title?: string;
  slug?: { current?: string };
  publishedAt?: string;
  image?: string | { asset?: { _ref?: string } } | any;
  author?: string;
  categories?: string[];
  body?: any;
};

const HomeApp: React.FC<{ posts: Post[] }> = ({ posts = [] }) => {
  const formatDate = (iso?: string | Date) => {
    if (!iso) return "";
    const d = typeof iso === "string" ? new Date(iso) : iso;
    return d.toLocaleDateString("en-GB", { day: "2-digit", month: "2-digit", year: "numeric" });
  };

  const formatDateLong = (iso?: string | Date) => {
    if (!iso) return "";
    const d = typeof iso === "string" ? new Date(iso) : iso;
    return d.toLocaleDateString("en-GB", { year: "numeric", month: "long", day: "numeric" });
  };

  const portableTextToPlainText = (pt: any) => {
    if (!pt) return "";
    if (typeof pt === "string") return pt;
    if (Array.isArray(pt)) {
      return pt
        .map((block) => {
          if (!block) return "";
          if (typeof block === "string") return block;
          if (Array.isArray(block.children)) {
            return block.children.map((child: any) => child.text ?? "").join("");
          }
          return "";
        })
        .join("\n\n");
    }
    return "";
  };

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const featured = posts[0];

  const categoryQueryFor = (post?: Post) => {
    const cats = post?.categories ?? [];
    const lower = cats.map((c) => (c || "").toLowerCase());
    if (lower.includes("news")) return "news";
    if (lower.includes("technology") || lower.includes("tech")) return "technology";
    return "blog";
  };
  const svgDataUri = (text: string, w = 1200, h = 700) => {
    const hash = Array.from(text).reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
    const hue = hash % 360;
    const bg = `hsl(${hue} 70% 40%)`;
    const svg = `<?xml version="1.0" encoding="UTF-8"?><svg xmlns='http://www.w3.org/2000/svg' width='${w}' height='${h}'><rect width='100%' height='100%' fill='${bg}'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' font-size='48' fill='white' font-family='system-ui, -apple-system, Segoe UI, Roboto, sans-serif'>${escapeHtml(
      text
    )}</text></svg>`;
    return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
  };

  const escapeHtml = (s: string) =>
    s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");

  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-white">
      <main className="flex-grow pt-28">
        <section className="container mx-auto px-6 mb-20">
          <div className="relative group overflow-hidden rounded-[2rem] bg-slate-100 dark:bg-slate-800 flex flex-col lg:flex-row h-full min-h-[380px]">
            <div className="lg:w-1/2 p-8 lg:p-16 flex flex-col justify-center">
              <div className="flex items-center gap-2 text-sky-500 font-bold text-xs uppercase tracking-widest mb-6">
                <span role="img" aria-label="sparkles">
                  ✨
                </span>
                Featured Today
              </div>
              <h1 className="text-4xl lg:text-6xl font-black mb-6 leading-[1.1] tracking-tight group-hover:text-sky-500 transition-colors">
                {featured?.title ?? "Welcome to the blog"}
              </h1>
              <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 max-w-lg leading-relaxed">
                {portableTextToPlainText(featured?.body) || "Discover stories, tutorials, and ideas from our community."}
              </p>
              <div className="flex items-center gap-6">
                <button className="px-8 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-full font-bold flex items-center gap-2 hover:scale-105 transition-transform active:scale-95 shadow-xl">
                  Read Article <span className="ml-1">→</span>
                </button>
                <div className="hidden sm:flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-slate-300 overflow-hidden">
                    <img src={featured?.image as string} alt={featured?.author ?? "Author"} />
                  </div>
                  <div>
                    <p className="text-sm font-bold">{featured?.author}</p>
                    <p className="text-xs text-slate-500">{featured?.publishedAt ? formatDateLong(featured.publishedAt) : ""}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:w-1/2 h-64 lg:h-auto relative overflow-hidden">
              <img src={(featured as any)?.imageUrl ?? svgDataUri(featured?.title ?? categoryQueryFor(featured), 1200, 700)} alt={featured?.title ?? "Featured"} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent"></div>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-6 mb-20">
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="text-3xl font-black tracking-tight mb-2">Latest Stories</h2>
              <div className="h-1.5 w-20 bg-sky-500 rounded-full"></div>
            </div>
            <button className="text-sm font-bold flex items-center gap-2 hover:text-sky-500 transition-colors group">
              View All <span className="ml-1">→</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {posts.slice(1).map((post, idx) => (
              <article key={post._id ?? idx} className="group flex flex-col h-full bg-white dark:bg-slate-900 border dark:border-slate-800 rounded-3xl overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img src={(post as any)?.imageUrl ?? svgDataUri(post.title ?? categoryQueryFor(post), 800, 500)} alt={post.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  <div className="absolute top-4 left-4 flex gap-2">
                    {(post.categories ?? []).map((cat) => (
                      <span key={cat} className="px-3 py-1 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm rounded-full text-[10px] font-black uppercase tracking-wider shadow-sm">
                        {cat}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="p-8 flex flex-col flex-grow">
                  <div className="flex items-center gap-4 text-xs text-slate-400 mb-4">
                    <span className="flex items-center gap-1">⏱ {formatDate(post.publishedAt)}</span>
                    <span className="flex items-center gap-1">👤 {post.author}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-4 leading-snug group-hover:text-sky-500 transition-colors">{post.title}</h3>
                  <p className="text-slate-500 dark:text-slate-400 text-sm mb-6 line-clamp-3">{portableTextToPlainText(post.body)}</p>
                  <div className="mt-auto pt-6 border-t dark:border-slate-800 flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-widest text-slate-400">0{idx + 1}</span>
                    <button className="text-sm font-black text-slate-900 dark:text-white flex items-center gap-1 group-hover:text-sky-500">
                      Read <span className="ml-1">→</span>
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="container mx-auto px-6 mb-20">
          <div className="bg-sky-500 dark:bg-sky-600 rounded-[3rem] p-8 lg:p-16 relative overflow-hidden text-white shadow-2xl">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-slate-900/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-2xl"></div>

            <div className="relative z-10 flex flex-col lg:flex-row items-center gap-12">
              <div className="lg:w-1/2 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 rounded-full mb-6 backdrop-blur-sm">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                  <span className="text-xs font-black uppercase tracking-widest">Studio NewsBot v2.0</span>
                </div>
                <h2 className="text-4xl lg:text-6xl font-black mb-6 leading-tight tracking-tighter">Stay Ahead <br />of the Curve.</h2>
                <p className="text-sky-50 text-lg mb-8 max-w-md mx-auto lg:mx-0">Join 15,000+ creators and developers getting weekly insights on design, tech, and productivity directly in their inbox.</p>
                <div className="flex flex-col sm:flex-row gap-4 max-w-lg">
                  <div className="flex-grow relative group">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sky-300">✉️</span>
                    <input type="email" placeholder="Enter your email" className="w-full pl-12 pr-6 py-5 bg-white text-slate-900 rounded-2xl focus:outline-none focus:ring-4 focus:ring-white/30 transition-all font-medium" />
                  </div>
                  <button className="px-8 py-5 bg-slate-900 hover:bg-black text-white rounded-2xl font-bold transition-all flex items-center justify-center gap-2 group whitespace-nowrap shadow-xl">Subscribe <span className="w-4 h-4">🔔</span></button>
                </div>
                <p className="mt-4 text-xs text-sky-100/60 italic">No spam. Only high-value bytes. Unsubscribe anytime.</p>
              </div>

              <div className="lg:w-1/2 flex justify-center">
                <div className="relative w-64 h-64 lg:w-80 lg:h-80">
                  <div className="absolute inset-0 bg-white/20 rounded-full animate-ping opacity-20"></div>
                  <div className="absolute inset-4 bg-white/20 rounded-full animate-pulse"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-white p-8 rounded-full shadow-2xl text-sky-500 animate-bounce duration-[2000ms]"><span className="w-20 h-20 text-3xl">💬</span></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default HomeApp;
