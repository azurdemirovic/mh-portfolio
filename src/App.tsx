function App() {
  return (
    <div className="min-h-screen bg-white font-univers relative overflow-hidden">
      <header className="w-full relative z-10 p-4 md:p-6">
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
    </div>
  );
}

export default App;
