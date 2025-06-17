import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

/* -------------------------------------------------- */
function MobileGalleryCarousel({ covers }) {
  const images = Object.entries(covers || {});
  const [idx, setIdx] = useState(0);
  const total = images.length;

  const prev = () => setIdx((idx - 1 + total) % total);
  const next = () => setIdx((idx + 1) % total);

  return (
    /* outer container: hide any overflow so the page can’t pan sideways */
    <div className="relative md:hidden overflow-hidden">
      {/* sliding track */}
      <div
        className="flex transition-transform duration-500 ease-out"
        style={{ transform: `translateX(-${idx * 100}%)` }}
      >
        {images.map(([cat, src]) => (
          /* each slide is exactly the viewport width */
          <div key={cat} className="w-full flex-shrink-0">
            {/* margin creates the gap without enlarging width */}
            <div className="mx-2 rounded-2xl overflow-hidden">
              <img
                src={src}
                alt={cat}
                className="w-full h-[60vh] object-cover"
              />
            </div>
          </div>
        ))}
      </div>

      {/* arrows */}
      <button
        onClick={prev}
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 p-2 rounded-full backdrop-blur"
      >
        <ChevronLeft className="w-5 h-5 text-white" />
      </button>
      <button
        onClick={next}
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 p-2 rounded-full backdrop-blur"
      >
        <ChevronRight className="w-5 h-5 text-white" />
      </button>

      {/* dots */}
      <div className="flex justify-center gap-2 mt-4">
        {images.map((_, i) => (
          <span
            key={i}
            className={`w-2 h-2 rounded-full ${
              i === idx ? "bg-white" : "bg-gray-600"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default MobileGalleryCarousel;
