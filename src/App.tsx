import React, { useState, useEffect, useRef } from 'react';
import { PROJECTS } from './constants';

interface CarouselProps {
  project: typeof PROJECTS[0];
  onImageClick: (src: string, alt: string) => void;
}

const HorizontalCarousel = ({ project, onImageClick }: CarouselProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [hasMoved, setHasMoved] = useState(false);

  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (!isDragging || !scrollRef.current) return;
      
      const x = e.pageX - scrollRef.current.offsetLeft;
      const walk = (x - startX) * 1.5;
      scrollRef.current.scrollLeft = scrollLeft - walk;
      
      if (Math.abs(walk) > 5) {
        setHasMoved(true);
      }
    };

    const handleGlobalMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleGlobalMouseMove);
      window.addEventListener('mouseup', handleGlobalMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleGlobalMouseMove);
      window.removeEventListener('mouseup', handleGlobalMouseUp);
    };
  }, [isDragging, startX, scrollLeft]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    setHasMoved(false);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleImageClick = (imgPath: string, alt: string) => {
    if (!hasMoved) {
      onImageClick(imgPath, alt);
    }
  };

  return (
    <section className="flex flex-col py-20 md:py-24 border-t border-black/5 md:border-none select-none">
      <div className="shrink-0 pb-10 px-4 md:px-0">
        <h3 className="text-xl md:text-3xl tracking-tighter flex gap-2">
          <span className="md:hidden">{project.id} /</span>
          <span>{project.title}</span>
        </h3>
        <span className="hidden md:block text-sm font-mono">{project.id}</span>
      </div>

      <div className="overflow-hidden relative">
        <div
          ref={scrollRef}
          className={`flex overflow-x-auto gap-4 md:gap-8 no-scrollbar pb-8 w-full px-4 md:px-0 touch-pan-x ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
          onMouseDown={handleMouseDown}
        >
          {project.images.map((img, idx) => (
            <div
              key={idx}
              className="flex-none h-[60vw] max-h-[500px] md:h-[65vh]"
              onClick={() => handleImageClick(`${project.path}${img}`, `${project.title} - ${idx + 1}`)}
            >              <img
                src={`${project.path}${img}`}
                alt={`${project.title} - ${idx + 1}`}
                className="h-full w-auto object-contain block hover:opacity-90 transition-opacity pointer-events-none"
                loading="lazy"
              />
            </div>
          ))}
          <div className="flex-none w-4 md:hidden" />
        </div>
      </div>
    </section>
  );
};

const Lightbox = ({ src, alt, onClose }: { src: string; alt: string; onClose: () => void }) => {
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'unset'; };
  }, []);

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      setIsDragging(true);
      setStartPos({ x: e.touches[0].clientX - position.x, y: e.touches[0].clientY - position.y });
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (isDragging && e.touches.length === 1 && scale > 1) {
      setPosition({
        x: e.touches[0].clientX - startPos.x,
        y: e.touches[0].clientY - startPos.y
      });
    }
  };

  const handleDoubleClick = () => {
    if (scale > 1) {
      setScale(1);
      setPosition({ x: 0, y: 0 });
    } else {
      setScale(2.5);
    }
  };

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center bg-white/10 backdrop-blur-xl transition-all duration-300"
      onClick={onClose}
    >
      <div 
        className="relative w-full h-full flex items-center justify-center p-4"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={src}
          alt={alt}
          className="max-w-full max-h-full object-contain transition-transform duration-200 ease-out touch-none"
          style={{ 
            transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
            cursor: scale > 1 ? 'grab' : 'zoom-in'
          }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={() => setIsDragging(false)}
          onDoubleClick={handleDoubleClick}
        />
        <button 
          className="absolute top-6 right-6 text-black text-4xl font-light p-4"
          onClick={onClose}
        >
          ×
        </button>
      </div>
    </div>
  );
};

function App() {
  const [selectedImage, setSelectedImage] = useState<{ src: string; alt: string } | null>(null);

  return (
    <div className="min-h-screen bg-white font-univers">
      <section className="min-h-[85vh] md:h-screen w-full relative flex flex-col overflow-hidden">
        <header className="w-full p-4 md:p-6 relative z-10">
          <h1 className="text-[9vw] md:text-[4.5vw] leading-[0.9] tracking-tighter flex flex-col w-full uppercase">
            <div className="flex flex-col md:flex-row md:justify-between w-full">
              <div className="flex justify-between md:contents">
                <span>I</span><span>AM</span><span>MATEJ</span><span>HANŽEL,</span>
              </div>
              <div className="flex justify-between md:contents">
                <span>A</span><span>VISUAL</span><span>DESIGNER</span>
              </div>
            </div>

            <div className="flex flex-col md:flex-row md:justify-between w-full">
              <div className="flex justify-between md:contents">
                <span>WITH</span><span>EXPIRIENCE</span>
              </div>
              <div className="flex justify-between md:contents">
                <span>IN</span><span>PHOTOGRAPHY,</span>
              </div>
            </div>

            <div className="md:flex md:justify-between w-full">
              <span className="flex justify-between md:justify-start md:gap-[0.2em] w-full md:w-auto">
                <span>MIXING</span><span>LIGHT</span>
              </span>
              <span className="flex gap-[0.2em] justify-between md:justify-start w-full md:w-auto">
                <span>AND</span><span>MOTION.</span>
              </span>
            </div>
          </h1>
        </header>

        <div className="absolute inset-0 flex items-center justify-center md:justify-end md:items-end z-0 pointer-events-none">
          <div className="w-[85%] md:w-[50%] lg:w-[40%] md:mr-[16.666%] mt-[20%] md:mt-0">
            <img src="/profile.jpg" alt="Matej Hanžel" className="w-full h-auto block" />
          </div>
        </div>
      </section>

      <main className="relative z-10 px-0 md:px-6">
        <div className="px-4 md:px-0">
          <h2 className="text-[12vw] md:text-[8vw] leading-[0.8] tracking-tighter pt-8 md:pt-24 mb-12 w-full flex flex-col uppercase">
            <span>SELECTED</span>
            <span className="text-right">WORKS</span>
          </h2>
        </div>

        <div className="flex flex-col">
          {PROJECTS.map((project) => (
            <HorizontalCarousel 
              key={project.id} 
              project={project} 
              onImageClick={(src, alt) => setSelectedImage({ src, alt })}
            />
          ))}
        </div>
      </main>

      <footer className="pt-24 pb-48 px-4 md:px-6 text-center text-sm md:text-base tracking-tighter">
        <p>@matej_hanzel — matej.hanzel.photography@gmail.com</p>
      </footer>

      {selectedImage && (
        <Lightbox 
          src={selectedImage.src} 
          alt={selectedImage.alt} 
          onClose={() => setSelectedImage(null)} 
        />
      )}
    </div>
  );
}

export default App;
