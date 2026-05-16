"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled ? "bg-white/80 dark:bg-slate-900/80 backdrop-blur-md shadow-sm" : "bg-transparent"
    }`}>
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-2 group cursor-pointer">
          <div className="w-10 h-10 bg-slate-900 dark:bg-white rounded-xl flex items-center justify-center transition-transform group-hover:rotate-12">
            <span className="text-white dark:text-slate-900 font-bold text-xl italic">S</span>
          </div>
          <span className="text-2xl font-black tracking-tighter uppercase">Studio</span>
        </div>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          <a href="#" className="hover:text-sky-500 transition-colors">Latest</a>
          <a href="#" className="hover:text-sky-500 transition-colors">Categories</a>
          <a href="#" className="hover:text-sky-500 transition-colors">Newsletter</a>
          <a href="#" className="hover:text-sky-500 transition-colors">About</a>
          <button
            onClick={() => setIsMenuOpen((s) => !s)}
            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
            aria-label="Search"
          >
            <span role="img" aria-label="search">🔍</span>
          </button>
        </div>

        <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Menu">
          <span className="text-xl">{isMenuOpen ? '✕' : '≡'}</span>
        </button>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-slate-900 border-t dark:border-slate-800 p-6 flex flex-col gap-4 animate-in slide-in-from-top duration-300">
          <a href="#" className="text-lg font-semibold">Latest</a>
          <a href="#" className="text-lg font-semibold">Categories</a>
          <a href="#" className="text-lg font-semibold">Newsletter</a>
          <button className="flex items-center gap-2 text-sky-500 font-bold">
            <span role="img" aria-label="search">🔍</span> Search
          </button>
        </div>
      )}
    </nav>
  );
}
