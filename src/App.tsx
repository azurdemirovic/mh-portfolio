import React from 'react';
import { PROJECTS } from './constants';

interface CarouselProps {
  project: typeof PROJECTS[0];
}

const HorizontalCarousel = ({ project }: CarouselProps) => {
  return (
    <section className="min-h-[80vh] flex flex-col justify-start py-12">
      <div className="flex justify-between items-baseline mb-4 shrink-0 pb-2">
        <h3 className="text-xl md:text-3xl tracking-tighter">
          {project.title}
        </h3>
        <span className="text-sm font-mono">{project.id}</span>
      </div>
      
      <div className="flex-grow flex items-center overflow-hidden relative">
        <div 
          className="flex overflow-x-auto gap-8 no-scrollbar pb-8 cursor-ew-resize w-full"
        >
          {project.images.map((img, idx) => (
            <div 
              key={idx} 
              className="flex-none h-[50vh] md:h-[65vh]"
            >
              <img
                src={`${project.path}${img}`}
                alt={`${project.title} - ${idx + 1}`}
                className="h-full w-auto object-contain block"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

function App() {
  return (
    <div className="min-h-screen bg-white font-univers">
      {/* HERO SECTION - Full Viewport Height */}
      <section className="h-screen w-full relative flex flex-col justify-between overflow-hidden">
        <header className="w-full p-4 md:p-6 relative z-10">
          <h1 className="text-[4.5vw] leading-[0.9] tracking-tighter flex flex-col w-full">
            <span className="block whitespace-nowrap">I AM MATEJ HANŽEL, A VISUAL DESIGNER WITH,</span>
            <span className="flex justify-between w-full">
              <span>EXPIRIENCE</span>
              <span>IN</span>
              <span>PHOTOGRAPHY,</span>
            </span>
            <span className="flex gap-[0.2em] justify-start">
              <span>MIXING</span>
              <span>LIGHT</span>
              <span>AND</span>
              <span>MOTION.</span>
            </span>
          </h1>
        </header>

        <div className="absolute bottom-0 right-[16.666%] w-[60%] md:w-[50%] lg:w-[40%] z-0">
          <img 
            src="/profile.jpg" 
            alt="Matej Hanžel" 
            className="w-full h-auto block"
          />
        </div>
      </section>

      {/* SELECTED WORKS SECTION */}
      <main className="relative z-10 px-4 md:px-6">
        <h2 className="text-[8vw] leading-[0.8] tracking-tighter pt-24 mb-12 w-full">
          SELECTED WORKS
        </h2>

        <div className="flex flex-col">
          {PROJECTS.map((project) => (
            <HorizontalCarousel key={project.id} project={project} />
          ))}
        </div>
      </main>

      <footer className="py-24 px-4 md:px-6 text-center text-sm md:text-base tracking-tighter">
        <p>@matej_hanzel — matej.hanzel.photography@gmail.com</p>
      </footer>
    </div>
  );
}

export default App;
