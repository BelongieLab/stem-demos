import React, { useState, useEffect, useRef } from 'react';

// --- VISUAL COMPONENTS ---

// 1. The Chocolate Bar (Fractions)
const FractionVisual = ({ active }) => {
  return (
    <div className="relative w-64 h-64 flex flex-col items-center justify-center">
      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-2xl">
        <circle cx="50" cy="50" r="45" fill="#1e293b" stroke="#334155" strokeWidth="2" />
        {/* Slices of the pie */}
        <path d="M50 50 L50 5 A45 45 0 0 1 95 50 Z" 
              fill={active ? "#2dd4bf" : "#334155"} 
              className="transition-colors duration-1000 ease-out" />
        <path d="M50 50 L95 50 A45 45 0 0 1 50 95 Z" fill="#334155" />
        <path d="M50 50 L50 95 A45 45 0 0 1 5 50 Z" fill="#334155" />
        <path d="M50 50 L5 50 A45 45 0 0 1 50 5 Z" fill="#334155" />
        
        {/* Divider lines */}
        <line x1="50" y1="5" x2="50" y2="95" stroke="#0f172a" strokeWidth="2" />
        <line x1="5" y1="50" x2="95" y2="50" stroke="#0f172a" strokeWidth="2" />
      </svg>
      <div className={`absolute transition-all duration-1000 ${active ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}>
        <div className="bg-slate-900/80 backdrop-blur px-4 py-2 rounded-xl border border-teal-500/30 text-teal-300 font-bold text-2xl flex flex-col items-center shadow-lg">
          <span>1</span>
          <div className="w-full h-0.5 bg-teal-400 my-1 rounded-full"></div>
          <span>4</span>
        </div>
      </div>
    </div>
  );
};

// 2. The 100 Grid (Percentages)
const GridVisual = ({ active, highlightCount = 0 }) => {
  return (
    <div className="relative w-72 h-72">
      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-2xl">
        {Array.from({ length: 100 }).map((_, i) => {
          const row = Math.floor(i / 10);
          const col = i % 10;
          const isHighlighted = active && i < highlightCount;
          return (
            <rect
              key={i}
              x={col * 10 + 0.5}
              y={row * 10 + 0.5}
              width="9"
              height="9"
              rx="1.5"
              fill={isHighlighted ? "#facc15" : "#1e293b"}
              className="transition-all duration-700 ease-in-out"
              style={{ transitionDelay: active ? `${i * 10}ms` : '0ms' }}
            />
          );
        })}
      </svg>
      
      <div className={`absolute -bottom-16 left-1/2 -translate-x-1/2 transition-all duration-1000 ${active ? 'opacity-100' : 'opacity-0 translate-y-4'}`}>
        <div className="text-yellow-400 font-bold text-3xl tracking-widest bg-slate-900/80 px-6 py-2 rounded-full border border-yellow-500/30">
          {active ? highlightCount : 0}%
        </div>
      </div>
    </div>
  );
};

// 3. The Interactive Playground
const Playground = () => {
  const [x, setX] = useState(20);
  const [y, setY] = useState(50);
  const result = (x * y) / 100;

  return (
    <div className="w-full max-w-lg bg-slate-800/50 p-6 rounded-3xl border border-slate-700 shadow-2xl backdrop-blur-sm pointer-events-auto">
      <h3 className="text-xl font-bold text-pink-400 mb-6 text-center">The Magic Mirror Trick</h3>
      
      <div className="flex flex-col gap-8 mb-8">
        {/* Controls */}
        <div className="grid grid-cols-2 gap-8">
          <div className="flex flex-col gap-2">
            <label className="text-cyan-300 font-bold flex justify-between">
              <span>Number X:</span> <span>{x}</span>
            </label>
            <input 
              type="range" min="0" max="100" value={x} 
              onChange={(e) => setX(Number(e.target.value))}
              className="accent-cyan-400 h-2 bg-slate-900 rounded-lg appearance-none cursor-pointer"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-yellow-300 font-bold flex justify-between">
              <span>Number Y:</span> <span>{y}</span>
            </label>
            <input 
              type="range" min="0" max="100" value={y} 
              onChange={(e) => setY(Number(e.target.value))}
              className="accent-yellow-400 h-2 bg-slate-900 rounded-lg appearance-none cursor-pointer"
            />
          </div>
        </div>

        {/* Visual Proof */}
        <div className="bg-slate-900 rounded-xl p-6 flex flex-col gap-6 relative overflow-hidden border border-slate-700/50">
          {/* Grid background for scale */}
          <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '10% 100%' }}></div>
          
          {/* Top Bar: X% of Y */}
          <div className="flex flex-col gap-1 relative z-10">
            <div className="flex justify-between text-sm font-medium">
              <span className="text-cyan-300">{x}%</span>
              <span className="text-slate-400">of a total {y}</span>
            </div>
            <div className="h-6 w-full bg-slate-800 rounded-md overflow-hidden relative">
              {/* Total Y container (scales up to 100%) */}
              <div className="absolute top-0 left-0 h-full border-r-2 border-dashed border-slate-500 transition-all duration-300" style={{ width: `${y}%` }}></div>
              {/* Filled X% of Y container */}
              <div className="h-full bg-gradient-to-r from-cyan-600 to-cyan-400 transition-all duration-300 rounded-r-md shadow-[0_0_15px_rgba(34,211,238,0.4)]" style={{ width: `${(x * y) / 100}%` }}></div>
            </div>
            <div className="text-right text-lg font-bold text-white mt-1">= {result.toFixed(1).replace('.0', '')}</div>
          </div>

          {/* Bottom Bar: Y% of X */}
          <div className="flex flex-col gap-1 relative z-10">
            <div className="flex justify-between text-sm font-medium">
              <span className="text-yellow-300">{y}%</span>
              <span className="text-slate-400">of a total {x}</span>
            </div>
            <div className="h-6 w-full bg-slate-800 rounded-md overflow-hidden relative">
              {/* Total X container */}
              <div className="absolute top-0 left-0 h-full border-r-2 border-dashed border-slate-500 transition-all duration-300" style={{ width: `${x}%` }}></div>
              {/* Filled Y% of X container */}
              <div className="h-full bg-gradient-to-r from-yellow-600 to-yellow-400 transition-all duration-300 rounded-r-md shadow-[0_0_15px_rgba(250,204,21,0.4)]" style={{ width: `${(y * x) / 100}%` }}></div>
            </div>
            <div className="text-right text-lg font-bold text-white mt-1">= {result.toFixed(1).replace('.0', '')}</div>
          </div>
          
          {/* Vertical alignment line demonstrating equality */}
          <div className="absolute top-0 bottom-0 border-r-2 border-pink-500/60 z-20 transition-all duration-300 shadow-[0_0_10px_rgba(236,72,153,0.5)]" style={{ left: `${result}%`, transform: 'translateX(-1px)' }}></div>
        </div>
      </div>
      
      <p className="text-center text-slate-300 text-sm">
        See how the glowing bars always end at the exact same spot? <br/> The Pink line proves they are equal!
      </p>
    </div>
  );
};

// --- MAIN APPLICATION APP ---

export default function Percentages() {
  const [activeStep, setActiveStep] = useState(0);
  const stepRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveStep(Number(entry.target.dataset.step));
          }
        });
      },
      { rootMargin: '-40% 0px -40% 0px' } // Triggers when item hits middle 20% of screen
    );

    stepRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const steps = [
    {
      title: "Hi, Emilia!",
      content: (
        <>
          <p className="mb-4">Welcome to the secret world of numbers. Today, we're going to learn about a mathematical superpower that adults use every single day.</p>
          <p>Scroll down gently to start the magic...</p>
        </>
      ),
      color: "text-white"
    },
    {
      title: "Pieces of a Whole",
      content: (
        <>
          <p className="mb-4">Let's start with something you already know: <strong>Fractions</strong>.</p>
          <p>Imagine a delicious blueberry pie. If we cut it into 4 equal slices, and you take 1 slice... you have exactly <strong>one fourth</strong> (1/4) of the pie.</p>
          <p className="text-teal-300 mt-4 font-semibold">Keep your eyes on the pie over there! 👉</p>
        </>
      ),
      color: "text-teal-400"
    },
    {
      title: "The Magic Number: 100",
      content: (
        <>
          <p className="mb-4">Now, imagine we have a giant chocolate bar, but we chop it into exactly <strong>100 tiny squares</strong>.</p>
          <p>This is where <strong>Percentages</strong> come in. The word "Percent" literally means "For every 100" in Latin (<em>per centum</em>).</p>
          <p>So, a percentage is just a fraction wearing a disguise! It's a fraction where the bottom number is always 100.</p>
        </>
      ),
      color: "text-yellow-400"
    },
    {
      title: "Connecting the Dots",
      content: (
        <>
          <p className="mb-4">Let's bring back our 1/4 from earlier.</p>
          <p>If we have 100 squares, what is 1/4 of them? If we divide 100 by 4, we get 25.</p>
          <p className="mt-4 font-bold text-xl text-yellow-300 bg-slate-800/50 p-4 rounded-xl border border-slate-700">
            So, 1/4 is exactly the same as 25 out of 100... which means it's 25%!
          </p>
        </>
      ),
      color: "text-cyan-400"
    },
    {
      title: "The Coolest Trick in Math",
      content: (
        <>
          <p className="mb-4">Are you ready for a secret? Most adults don't even know this trick!</p>
          <p className="mb-4">Let's say you need to find <strong>8% of 50</strong>. That sounds really hard to do in your head, right?</p>
          <p>But what if I told you that you can just flip them around? <strong>8% of 50</strong> is the exact same answer as <strong>50% of 8</strong>.</p>
          <p className="text-pink-300 font-bold">And 50% just means half. Half of 8 is 4. Boom! Answer solved.</p>
        </>
      ),
      color: "text-pink-400"
    },
    {
      title: "Emilia's Math Lab",
      content: (
        <>
          <p className="mb-4">Don't take my word for it. It's time for you to prove it yourself!</p>
          <p>Slide the numbers for X and Y in the lab over there. The glowing bars will draw themselves based on your numbers.</p>
          <p className="font-semibold text-slate-200">Notice how no matter what numbers you pick, the top bar and bottom bar always end at the exact same spot.</p>
        </>
      ),
      color: "text-purple-400"
    }
  ];

  // Logic to determine which visual to show based on the scrolled step
  const renderVisual = () => {
    switch (activeStep) {
      case 0:
        return (
          <div className="text-center animate-pulse duration-1000">
            <div className="text-6xl mb-4">✨</div>
            <div className="text-slate-400 font-medium tracking-widest uppercase">Scroll to begin</div>
          </div>
        );
      case 1:
        return <FractionVisual active={true} />;
      case 2:
        return <GridVisual active={true} highlightCount={0} />;
      case 3:
        return <GridVisual active={true} highlightCount={25} />;
      case 4:
        return (
           <div className="flex flex-col items-center gap-8 bg-slate-800/80 p-8 rounded-3xl border-2 border-pink-500/30 shadow-[0_0_40px_rgba(236,72,153,0.15)] backdrop-blur">
             <div className="text-3xl md:text-5xl font-bold text-slate-300 flex items-center gap-4">
               <span className="text-cyan-400">8%</span>
               <span className="text-xl text-slate-500">of</span>
               <span className="text-yellow-400">50</span>
             </div>
             <div className="text-pink-500 font-black text-2xl">IS EQUAL TO</div>
             <div className="text-3xl md:text-5xl font-bold text-slate-300 flex items-center gap-4">
               <span className="text-yellow-400">50%</span>
               <span className="text-xl text-slate-500">of</span>
               <span className="text-cyan-400">8</span>
             </div>
           </div>
        );
      case 5:
        return <Playground />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-slate-900 min-h-screen text-slate-100 font-sans selection:bg-pink-500/30 overflow-x-hidden">
      {/* Background ambient light effects */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-cyan-900/20 blur-[100px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-pink-900/10 blur-[100px]"></div>
      </div>

      <div className="relative z-10 flex flex-col md:flex-row w-full max-w-7xl mx-auto">
        
        {/* Left Column: Scrolling Text */}
        <div className="w-full md:w-5/12 px-6 md:px-12 pt-[50vh] md:pt-32 pb-64 z-20 flex flex-col gap-[70vh]">
          {steps.map((step, index) => (
            <div 
              key={index} 
              data-step={index}
              ref={el => stepRefs.current[index] = el}
              className={`transition-all duration-700 ease-in-out ${
                activeStep === index ? 'opacity-100 translate-y-0 scale-100' : 'opacity-30 translate-y-8 scale-95'
              }`}
            >
              <div className="bg-slate-800/60 backdrop-blur-md p-8 rounded-3xl shadow-2xl border border-slate-700/50">
                <h2 className={`text-3xl md:text-4xl font-black mb-6 tracking-tight ${step.color}`}>
                  {step.title}
                </h2>
                <div className="text-lg md:text-xl leading-relaxed text-slate-300 space-y-4">
                  {step.content}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right Column: Sticky Visuals */}
        <div className="w-full md:w-7/12 h-[45vh] md:h-screen fixed md:sticky top-0 right-0 left-0 md:left-auto flex items-center justify-center p-4 md:p-12 pointer-events-none z-10">
          {/* Subtle background container for the visualizer */}
          <div className="w-full h-full max-h-[600px] relative flex items-center justify-center">
            {/* Morphing shape behind the visualizer */}
            <div className={`absolute inset-0 bg-gradient-to-tr from-slate-800 to-slate-800/20 rounded-[3rem] transition-all duration-1000 ease-in-out ${
                activeStep === 5 ? 'scale-105 opacity-100' : 'scale-95 opacity-50'
              } border border-slate-700/50 -z-10`}
            />
            
            {/* The active visualizer */}
            <div className="w-full h-full flex items-center justify-center transition-all duration-500 ease-out">
              {renderVisual()}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
