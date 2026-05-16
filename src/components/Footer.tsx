"use client";
import React from "react";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white pt-20 pb-10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                <span className="text-slate-900 font-bold text-lg italic">S</span>
              </div>
              <span className="text-2xl font-black tracking-tighter uppercase">Studio</span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              A modern platform for thinkers, designers, and builders. Curating the best in design systems and development trends.
            </p>
            <div className="flex items-center gap-4">
                <a href="#" className="p-3 bg-slate-800 rounded-xl hover:bg-sky-500 transition-colors">🐦</a>
                <a href="#" className="p-3 bg-slate-800 rounded-xl hover:bg-sky-500 transition-colors">🐙</a>
                <a href="#" className="p-3 bg-slate-800 rounded-xl hover:bg-sky-500 transition-colors">💼</a>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-black uppercase tracking-widest mb-6">Explore</h4>
            <ul className="space-y-4 text-slate-400 text-sm font-medium">
              <li><a href="#" className="hover:text-white transition-colors">Case Studies</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Free Assets</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Our Process</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Authors</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-black uppercase tracking-widest mb-6">Support</h4>
            <ul className="space-y-4 text-slate-400 text-sm font-medium">
              <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">RSS Feed</a></li>
            </ul>
          </div>

          <div className="bg-slate-800/50 p-8 rounded-3xl space-y-4">
            <h4 className="text-lg font-bold">Have a tip?</h4>
            <p className="text-sm text-slate-400">Found something interesting you want us to cover? Drop us a line.</p>
            <a href="mailto:hello@studio.blog" className="block text-sky-400 font-bold hover:underline">hello@studio.blog</a>
          </div>
        </div>

        <div className="pt-10 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-6 text-slate-500 text-xs font-bold uppercase tracking-widest">
          <p>&copy; {new Date().getFullYear()} Studio Blog. All Rights Reserved.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">Cookie Settings</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
