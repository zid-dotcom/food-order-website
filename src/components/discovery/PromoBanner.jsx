import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Copy, Check } from 'lucide-react';
import { banners } from '../../data/banners';

export const PromoBanner = () => {
  const scrollRef = useRef(null);
  const [copiedId, setCopiedId] = React.useState(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -400 : 400;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const copyCode = (code, id) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <section className="py-6 bg-gray-50/60 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-800 tracking-tight">
            Best offers for you
          </h2>
          <div className="hidden md:flex items-center gap-2">
            <button
              onClick={() => scroll('left')}
              className="p-2 rounded-full bg-white shadow-2xs hover:bg-gray-100 text-gray-600 transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="p-2 rounded-full bg-white shadow-2xs hover:bg-gray-100 text-gray-600 transition-colors cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Banners Slider */}
        <div
          ref={scrollRef}
          className="flex items-center gap-4 sm:gap-6 overflow-x-auto scrollbar-none py-1 px-1 scroll-smooth"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {banners.map((banner) => (
            <div
              key={banner.id}
              className={`relative w-[290px] sm:w-[360px] h-[160px] sm:h-[180px] rounded-2xl shrink-0 overflow-hidden shadow-md bg-gradient-to-r ${banner.bgGradient} p-5 flex flex-col justify-between text-white group cursor-pointer`}
            >
              {/* Background food image with overlay */}
              <img
                src={banner.image}
                alt={banner.title}
                className="absolute right-0 top-0 w-1/2 h-full object-cover opacity-25 group-hover:scale-105 transition-transform duration-500 pointer-events-none mix-blend-overlay"
              />

              <div className="relative z-10">
                <span className="inline-block px-2.5 py-0.5 bg-white/20 backdrop-blur-xs rounded-full text-[10px] font-semibold uppercase tracking-wider mb-2">
                  {banner.tag}
                </span>
                <h3 className="text-base sm:text-lg font-semibold leading-snug drop-shadow-2xs max-w-[240px]">
                  {banner.title}
                </h3>
                <p className="text-xs text-white/90 font-normal mt-1 max-w-[220px]">
                  {banner.subtitle}
                </p>
              </div>

              <div className="relative z-10 flex items-center justify-between pt-2">
                <button
                  onClick={() => copyCode(banner.code, banner.id)}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-white text-gray-900 rounded-lg text-xs font-semibold shadow-xs hover:bg-gray-100 transition-colors cursor-pointer"
                >
                  <span>{copiedId === banner.id ? "COPIED!" : `USE ${banner.code}`}</span>
                  {copiedId === banner.id ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-gray-500" />}
                </button>

                <Link
                  to="/offers"
                  className="text-xs font-medium text-white underline underline-offset-2 hover:text-white/80"
                >
                  View Offers &rarr;
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
