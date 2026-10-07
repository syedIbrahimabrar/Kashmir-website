import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Calendar, User, Clock, ArrowRight, X, Heart, MessageSquare } from 'lucide-react';
import { blogPosts } from '../data';
import { BlogPost } from '../types';

export default function Blog() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [likedPosts, setLikedPosts] = useState<Record<string, boolean>>({});

  const filteredPosts = blogPosts.filter(post => 
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleLike = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setLikedPosts(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section id="blog" className="py-24 bg-black border-t border-neutral-950 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 text-left">
          <div className="space-y-4 max-w-2xl">
            <span className="text-xs uppercase tracking-[0.3em] font-bold text-gold-500">
              Valued Knowledge
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-normal tracking-tight text-white">
              Travel Blog & Guides
            </h2>
            <p className="text-sm text-[#BDBDBD] leading-relaxed">
              Your comprehensive hub for local mountain lore, packaging tips, best coordinates, and budget vs luxury itineraries curated by our expert team.
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:max-w-xs">
            <input
              type="text"
              placeholder="Search guides..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-full text-white text-xs focus:border-gold-500 focus:outline-none transition backdrop-blur-md"
            />
            <Search className="w-4 h-4 text-neutral-500 absolute left-3.5 top-3" />
          </div>
        </div>

        {/* Blog grid */}
        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post, i) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-25px' }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                onClick={() => setSelectedPost(post)}
                className="group bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-md flex flex-col justify-between hover:border-gold-500/50 transition duration-300 cursor-pointer"
              >
                <div>
                  {/* Card Cover */}
                  <div className="relative aspect-video overflow-hidden bg-neutral-900 rounded-xl mb-4">
                    <img
                      src={post.image}
                      alt={post.title}
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        e.currentTarget.src = 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=800';
                      }}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 rounded-xl"
                    />
                    <div className="absolute top-3 left-3 py-1 px-2.5 rounded-lg bg-black/80 backdrop-blur-sm border border-white/10 text-[9px] font-bold text-gold-500 uppercase tracking-wider">
                      {post.category}
                    </div>
                  </div>

                  {/* Body Info */}
                  <div className="space-y-3 text-left">
                    <div className="flex items-center gap-4 text-[10px] text-[#BDBDBD] font-semibold">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-gold-500" />
                        {post.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <User className="w-3 h-3 text-gold-500" />
                        By {post.author}
                      </span>
                    </div>

                    <h3 className="font-serif font-normal text-xl text-white group-hover:text-gold-500 transition duration-300 leading-snug">
                      {post.title}
                    </h3>

                    <p className="text-xs text-[#BDBDBD] leading-relaxed line-clamp-3">
                      {post.description}
                    </p>
                  </div>
                </div>

                {/* Footer buttons */}
                <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between">
                  <span className="text-[10px] uppercase font-bold text-[#BDBDBD] tracking-wider flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-gold-500" />
                    {post.readTime}
                  </span>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={(e) => toggleLike(e, post.id)}
                      className={`p-1.5 rounded-lg border transition cursor-pointer ${
                        likedPosts[post.id] 
                          ? 'bg-rose-500/10 border-rose-500/30 text-rose-500' 
                          : 'bg-white/5 border-white/10 text-neutral-400 hover:text-white'
                      }`}
                      aria-label="Like post"
                    >
                      <Heart className={`w-3.5 h-3.5 ${likedPosts[post.id] ? 'fill-rose-500' : ''}`} />
                    </button>
                    <button
                      onClick={() => setSelectedPost(post)}
                      className="text-xs font-bold text-gold-500 group-hover:text-white transition flex items-center gap-1 group/btn cursor-pointer"
                    >
                      Read More
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1" />
                    </button>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 p-8 bg-white/5 border border-white/10 rounded-2xl">
            <p className="text-sm text-[#BDBDBD]">No guides match your search term. Try another keyword.</p>
          </div>
        )}
      </div>

      {/* Article Reader Modal */}
      <AnimatePresence>
        {selectedPost && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPost(null)}
              className="absolute inset-0 bg-black/90 backdrop-blur-md"
            />

            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="relative w-full max-w-2xl bg-[#0c0c0c] border border-white/10 rounded-2xl overflow-hidden shadow-2xl z-10 max-h-[85vh] flex flex-col p-1"
            >
              {/* Cover Header */}
              <div className="relative h-60 shrink-0 bg-[#0c0c0c] rounded-t-xl overflow-hidden">
                <img
                  src={selectedPost.image}
                  alt={selectedPost.title}
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=800';
                  }}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0c] via-transparent to-transparent" />
                
                <button
                  onClick={() => setSelectedPost(null)}
                  className="absolute top-4 right-4 z-20 p-2 text-white bg-black/60 hover:bg-white/5 border border-white/15 rounded-full transition cursor-pointer"
                  aria-label="Close article"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="absolute bottom-4 left-6 right-6 text-left">
                  <span className="py-1 px-2.5 rounded-lg bg-gold-500 text-black text-[9px] font-extrabold uppercase tracking-wider">
                    {selectedPost.category}
                  </span>
                  <h4 className="font-serif text-2xl sm:text-3xl font-normal text-white mt-2 leading-tight">
                    {selectedPost.title}
                  </h4>
                </div>
              </div>

              {/* Scrollable Content Body */}
              <div className="p-6 overflow-y-auto space-y-6 flex-1 no-scrollbar text-[#BDBDBD] text-xs sm:text-sm leading-relaxed">
                {/* Meta details */}
                <div className="flex flex-wrap items-center gap-4 py-3 border-b border-white/10 text-[#BDBDBD] text-[11px] font-bold">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-gold-500" />
                    Published: {selectedPost.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <User className="w-3.5 h-3.5 text-gold-500" />
                    Author: {selectedPost.author}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-gold-500" />
                    Reading Time: {selectedPost.readTime}
                  </span>
                </div>

                {/* Subheading intro */}
                <p className="text-white font-normal italic text-left">
                  "{selectedPost.description}"
                </p>

                {/* Body paragraphs */}
                <div className="space-y-4 text-left">
                  <h5 className="font-serif font-normal text-white text-base sm:text-lg">
                    Unlocking the Mystique of Kashmir
                  </h5>
                  <p>
                    Azad Kashmir stands as an unparalleled jewel on the map of Northern Pakistan. Traveling into Neelum Valley and its high-altitude alpine basins like Ratti Gali Lake is an exploration of towering cliffs, gushing glacier feeds, and hospitality steeped in warm traditions.
                  </p>
                  <p>
                    For the premium traveler, the secret lies in timing and logistics. Standard mountain paths can experience heavy monsoon shifts, but an experienced private guide ensures fully secured detours, high-end vehicle support, and direct coordination with local tribal hosts.
                  </p>
                  <h5 className="font-serif font-normal text-white text-base sm:text-lg mt-6">
                    Key Recommendations from Our Expeditions Team:
                  </h5>
                  <ul className="list-disc pl-5 space-y-2">
                    <li><strong>Always pack layers:</strong> Mountain temperatures fluctuate drastically, dropping near freezing at dawn.</li>
                    <li><strong>Support Local Hosts:</strong> Try local trout fish preparations in Sharda and purchase handmade wool shawls.</li>
                    <li><strong>Inquire ahead:</strong> Certain high-altitude spots like Ratti Gali require standard 4x4 off-road permit clearances, which Kashmir Escape organizes pre-arrival.</li>
                  </ul>
                  <p className="pt-4 border-t border-white/10 text-[11px] text-neutral-500 flex items-center justify-between">
                    <span>© 2026 Kashmir Escape Guides. All Rights Reserved.</span>
                    <span className="flex items-center gap-1.5">
                      <MessageSquare className="w-3.5 h-3.5 text-gold-500" />
                      Comments are disabled
                    </span>
                  </p>
                </div>

                {/* Modal footer action */}
                <div className="pt-6 border-t border-white/10 flex justify-end gap-3">
                  <button
                    onClick={() => setSelectedPost(null)}
                    className="px-6 py-2.5 bg-transparent hover:bg-white/5 text-white border border-white/15 rounded-full text-xs font-semibold transition cursor-pointer"
                  >
                    Close Article
                  </button>
                  <a
                    href="https://wa.me/923000000000"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-2.5 bg-gold-500 hover:bg-opacity-90 text-black font-bold text-xs uppercase tracking-widest rounded-full transition cursor-pointer"
                  >
                    Discuss With Guide
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
