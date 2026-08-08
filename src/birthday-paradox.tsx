import React, { useState, useEffect, useMemo } from 'react';
import { ArrowDown, Dices, PackageOpen, Swords, Sparkles, User } from 'lucide-react';

export default function ProbabilityQuest() {
  const [activeStep, setActiveStep] = useState(0);

  // Scrollytelling narrative tailored for August
  const steps = [
    { 
      title: "Hey August!", 
      text: "Today we're going on a quest to understand Probability. Probability is just a fancy mathematical way of asking: 'How likely is something to happen?'" 
    },
    { 
      title: "Rolling the Dice", 
      text: "Let's start simple. If you roll a standard six-sided die, what's the chance you'll roll a 6? Since there's one winning side out of six total sides, your chance is 1 out of 6." 
    },
    { 
      title: "Roblox Drop Rates", 
      text: "This happens in Roblox games all the time! Imagine you're playing Bed Wars or Steal a Brainrot, and you open a crate. Let's say a super rare Mythic Sword has a 1-in-10 drop chance." 
    },
    { 
      title: "Back-to-Back Luck", 
      text: "But what if you want to pull that Mythic Sword TWO times in a row? Here is the golden rule of probability: When two independent things happen, you MULTIPLY their chances together." 
    },
    { 
      title: "Multiplying Probabilities", 
      text: "So, the chance of two rare drops is 1/10 × 1/10. That's 1/100, or a 1% chance! The more times you need to get lucky in a row, the smaller the fraction gets. This rule is super important." 
    },
    { 
      title: "The Birthday Paradox", 
      text: "Now, let's use that multiplying rule for something crazy. Imagine a room with 23 people (like your class). What are the odds that at least TWO kids have the exact same birthday?" 
    },
    { 
      title: "The Illusion", 
      text: "Most people guess it's a tiny chance. After all, there are 365 days in a year, and only 23 kids. But the math says there is actually a GREATER than 50% chance of a match! Let's see why." 
    },
    { 
      title: "Visualizing the Pairs", 
      text: "To understand this, we shouldn't look at the people individually, but at the PAIRS they form. How many ways can we pair up 23 people? Imagine a 23×23 grid pairing everyone up." 
    },
    { 
      title: "Total Combinations", 
      text: "If we pair every person with every other person, 23 × 23 gives us 529 total combinations." 
    },
    { 
      title: "Removing Self-Matches", 
      text: "But wait! You can't share a birthday with yourself. We must remove the 23 pairs on the diagonal where someone is paired with themselves. (529 - 23 = 506)" 
    },
    { 
      title: "Unique Pairs", 
      text: "Also, order doesn't matter (you & your friend is the same pair as your friend & you). We divide by two to remove duplicates, leaving exactly 253 unique pairs!" 
    },
    { 
      title: "The Chance of Being Different", 
      text: "Now, remember our multiplying rule? Instead of looking for a match, let's find the chance that NO ONE matches. For a single pair, the chance their birthdays are different is 364 out of 365." 
    },
    { 
      title: "Scaling Up", 
      text: "For ALL 253 pairs to have different birthdays, we must multiply this probability by itself 253 times, just like trying to get 253 rare Roblox drops in a row!" 
    },
    { 
      title: "The Result", 
      text: "364/365 multiplied 253 times equals roughly 49.95%. This is the chance that absolutely NO ONE shares a birthday in the entire room." 
    },
    { 
      title: "The Paradox Resolved", 
      text: "If there's a 49.95% chance of NO matches, then the chance of AT LEAST ONE match is 100% minus 49.95%... which is 50.05%! The paradox is solved." 
    }
  ];

  // Scrollytelling observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveStep(Number(entry.target.dataset.index));
          }
        });
      },
      { rootMargin: '-45% 0px -45% 0px' } 
    );
    document.querySelectorAll('.step-element').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // --- DATA GENERATION ---

  // Generate 23 people in a circle for Step 5 & 6
  const circleData = useMemo(() => {
    const nodes = [];
    for (let i = 0; i < 23; i++) {
      const angle = (i / 23) * (2 * Math.PI) - (Math.PI / 2);
      nodes.push({ x: 200 + 150 * Math.cos(angle), y: 200 + 150 * Math.sin(angle), isMatch: i === 4 || i === 15 });
    }
    return nodes;
  }, []);

  // Generate 23x23 Grid for Steps 7-10
  const gridCells = useMemo(() => {
    const cells = [];
    for (let r = 0; r < 23; r++) {
      for (let c = 0; c < 23; c++) {
        cells.push({ row: r, col: c });
      }
    }
    return cells;
  }, []);

  // Grid classes
  const getCellClasses = (row, col) => {
    const base = "w-full h-full rounded-sm transition-all duration-700 ease-in-out border border-slate-800/50";
    if (activeStep < 7) return `${base} bg-slate-800/20 opacity-0`;
    if (activeStep === 7 || activeStep === 8) return `${base} bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.4)]`;
    if (activeStep === 9) {
      if (row === col) return `${base} bg-red-500 scale-90 opacity-80`;
      return `${base} bg-blue-500`;
    }
    if (activeStep >= 10) {
      if (row === col) return `${base} bg-slate-800/30 scale-75 opacity-20`;
      if (row > col) return `${base} bg-slate-700/40 opacity-40`;
      return `${base} bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.5)]`;
    }
    return base;
  };

  return (
    <div className="bg-[#0f111a] min-h-screen text-slate-100 font-sans selection:bg-blue-500/30 flex flex-col md:flex-row">
      
      {/* LEFT PANE: Sticky Visualizer */}
      <div className="w-full md:w-3/5 h-[50vh] md:h-screen sticky top-0 overflow-hidden flex flex-col items-center justify-center p-4 border-b md:border-b-0 md:border-r border-slate-800 z-10 perspective-1000">
        
        {/* --- SCENE 1: Intro (Step 0) --- */}
        <div className={`absolute inset-0 flex flex-col items-center justify-center transition-all duration-1000 ${activeStep === 0 ? 'opacity-100 scale-100' : 'opacity-0 scale-50 pointer-events-none'}`}>
          <Dices size={100} className="text-blue-500 drop-shadow-[0_0_30px_rgba(59,130,246,0.8)] animate-bounce" />
          <h1 className="mt-8 text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">Probability Quest</h1>
        </div>

        {/* --- SCENE 2: Dice & Basic Prob (Step 1) --- */}
        <div className={`absolute inset-0 flex flex-col items-center justify-center transition-all duration-1000 ${activeStep === 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20 pointer-events-none'}`}>
          <div className="grid grid-cols-3 gap-4 mb-8">
            {[1, 2, 3, 4, 5, 6].map((num) => (
              <div key={num} className={`w-20 h-20 rounded-xl flex items-center justify-center text-3xl font-bold border-2 transition-all duration-500 ${num === 6 ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400 scale-110 shadow-[0_0_20px_rgba(16,185,129,0.5)]' : 'bg-slate-800/50 border-slate-700 text-slate-500'}`}>
                {num}
              </div>
            ))}
          </div>
          <div className="text-3xl font-serif">Probability = <span className="text-emerald-400 font-bold">1 / 6</span></div>
        </div>

        {/* --- SCENE 3: Roblox Loot (Steps 2-4) --- */}
        <div className={`absolute inset-0 flex flex-col items-center justify-center transition-all duration-1000 ${activeStep >= 2 && activeStep <= 4 ? 'opacity-100' : 'opacity-0 scale-90 pointer-events-none'}`}>
          
          <div className={`flex items-center gap-8 mb-8 transition-all duration-1000 ${activeStep >= 3 ? 'scale-75' : 'scale-100'}`}>
             <div className="relative group">
                <div className="absolute inset-0 bg-purple-500 blur-xl opacity-50 animate-pulse"></div>
                <div className="relative w-32 h-32 bg-slate-800 border-2 border-purple-500 rounded-2xl flex items-center justify-center shadow-[0_0_30px_rgba(168,85,247,0.6)]">
                  <Swords size={60} className="text-purple-400" />
                  <Sparkles size={24} className="text-yellow-300 absolute top-4 right-4 animate-spin-slow" />
                </div>
                <div className="text-center mt-4 font-bold text-purple-400 text-xl">1 / 10</div>
             </div>

             <div className={`transition-all duration-1000 text-5xl font-light text-slate-500 ${activeStep >= 3 ? 'opacity-100' : 'opacity-0 -translate-x-10'}`}>×</div>

             <div className={`relative group transition-all duration-1000 ${activeStep >= 3 ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
                <div className="absolute inset-0 bg-purple-500 blur-xl opacity-50 animate-pulse"></div>
                <div className="relative w-32 h-32 bg-slate-800 border-2 border-purple-500 rounded-2xl flex items-center justify-center shadow-[0_0_30px_rgba(168,85,247,0.6)]">
                  <Swords size={60} className="text-purple-400" />
                  <Sparkles size={24} className="text-yellow-300 absolute top-4 right-4 animate-spin-slow" />
                </div>
                <div className="text-center mt-4 font-bold text-purple-400 text-xl">1 / 10</div>
             </div>
          </div>

          <div className={`transition-all duration-1000 text-4xl font-serif flex items-center gap-4 ${activeStep >= 4 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <span>=</span>
            <div className="flex flex-col items-center text-purple-400 font-bold drop-shadow-[0_0_15px_rgba(168,85,247,0.8)]">
              <span className="border-b-2 border-purple-400/50 px-4 pb-1">1</span>
              <span className="pt-1">100</span>
            </div>
            <span className="text-2xl text-slate-400 ml-4">(1% chance)</span>
          </div>
        </div>

        {/* --- SCENE 4: Birthday Circle (Steps 5-6) --- */}
        <div className={`absolute inset-0 flex items-center justify-center transition-all duration-1000 ${activeStep >= 5 && activeStep <= 6 ? 'opacity-100 scale-100' : 'opacity-0 scale-50 pointer-events-none'}`}>
          <div className="relative w-[400px] h-[400px]">
            {/* Match Line */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              <path
                d={`M ${circleData[4].x} ${circleData[4].y} Q 200 200 ${circleData[15].x} ${circleData[15].y}`}
                fill="none"
                stroke="#ef4444"
                strokeWidth="3"
                strokeDasharray="6"
                className={`transition-all duration-1000 ease-in-out ${activeStep >= 6 ? 'stroke-dashoffset-0 opacity-100' : 'stroke-dashoffset-[200] opacity-0'}`}
                style={{ strokeDasharray: 200 }}
              />
            </svg>
            
            {/* 23 Avatars */}
            {circleData.map((node, i) => (
              <div 
                key={i} 
                className="absolute transform -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${node.x}px`, top: `${node.y}px` }}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-1000
                  ${activeStep === 5 ? 'bg-blue-500/20 text-blue-400' : ''}
                  ${activeStep >= 6 ? (node.isMatch ? 'bg-red-500 text-white scale-125 shadow-[0_0_20px_rgba(239,68,68,0.8)]' : 'bg-slate-800 text-slate-600 opacity-40') : ''}
                `}>
                  <User size={16} />
                </div>
              </div>
            ))}
            
            {/* 50% Overlay */}
            <div className={`absolute inset-0 flex items-center justify-center transition-all duration-700 ${activeStep >= 6 ? 'opacity-100' : 'opacity-0 scale-50'}`}>
              <div className="bg-slate-900/80 px-6 py-4 rounded-xl border border-red-500/30 backdrop-blur-sm text-center">
                <div className="text-red-400 font-bold text-4xl">&gt; 50%</div>
                <div className="text-slate-300 text-sm mt-1 uppercase tracking-widest">Chance</div>
              </div>
            </div>
          </div>
        </div>

        {/* --- SCENE 5: The Grid (Steps 7-10) --- */}
        <div className={`absolute inset-0 flex flex-col items-center justify-center transition-all duration-1000 ${activeStep >= 7 && activeStep <= 10 ? 'opacity-100' : 'opacity-0 pointer-events-none'} ${activeStep >= 11 ? '-translate-y-32 scale-75' : 'translate-y-0 scale-100'}`}>
          <div 
            className="w-full max-w-[280px] md:max-w-[400px] aspect-square bg-slate-900/80 p-2 rounded-xl border border-slate-700 shadow-2xl transition-transform duration-1000"
            style={{
              display: 'grid',
              gridTemplateColumns: `repeat(23, minmax(0, 1fr))`,
              gap: '2px',
              transform: activeStep >= 10 ? 'rotateX(15deg)' : 'rotateX(0deg)'
            }}
          >
            {gridCells.map((cell, idx) => (
              <div key={idx} className={getCellClasses(cell.row, cell.col)} />
            ))}
          </div>

          <div className="mt-8 font-serif text-xl md:text-2xl h-12 flex items-center justify-center relative w-full">
            <div className={`transition-all duration-700 absolute flex items-center gap-2 ${activeStep === 8 ? 'opacity-100 text-blue-400 translate-y-0' : 'opacity-0 translate-y-4'}`}>
               23<sup className="text-sm">2</sup> = 529 Total Combinations
            </div>
            <div className={`transition-all duration-700 absolute flex items-center gap-2 ${activeStep === 9 ? 'opacity-100 text-red-400 translate-y-0' : 'opacity-0 translate-y-4'}`}>
               529 - 23 (diagonal) = 506
            </div>
            <div className={`transition-all duration-700 absolute flex items-center gap-3 ${activeStep >= 10 ? 'opacity-100 text-emerald-400 translate-y-0' : 'opacity-0 translate-y-4'}`}>
               <div className="flex flex-col items-center text-lg">
                 <span className="border-b border-emerald-400/50 px-2 pb-1">506</span>
                 <span className="pt-1">2</span>
               </div>
               <span>=</span>
               <span className="font-bold text-4xl drop-shadow-[0_0_10px_rgba(52,211,153,0.8)]">253</span>
               <span className="text-lg md:text-xl ml-2 text-slate-300">Unique Pairs!</span>
            </div>
          </div>
        </div>

        {/* --- SCENE 6: The Deep Math (Steps 11-14) --- */}
        <div className={`absolute inset-0 flex flex-col items-center justify-center font-serif transition-all duration-1000 ${activeStep >= 11 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20 pointer-events-none'} ${activeStep >= 11 && activeStep <= 14 ? 'z-20' : 'z-0'}`}>
          
          <div className={`flex flex-col items-center transition-all duration-1000 ${activeStep >= 11 ? 'mt-32 md:mt-48' : ''}`}>
            <div className="flex items-center gap-4 text-2xl md:text-3xl text-slate-200">
              <span className="italic">Chance 1 pair is different</span>
              <span>=</span>
              <div className="flex flex-col items-center">
                <span className="border-b border-slate-400 px-2 pb-1">364</span>
                <span className="pt-1">365</span>
              </div>
            </div>

            <div className={`mt-8 flex flex-wrap justify-center items-center gap-3 text-3xl md:text-4xl transition-all duration-1000 ${activeStep >= 12 ? 'opacity-100 scale-100' : 'opacity-0 scale-90 h-0 overflow-hidden mt-0'}`}>
              <span className="text-4xl md:text-5xl font-light text-slate-300">(</span>
              <div className="flex flex-col items-center mx-1 text-slate-200">
                <span className="border-b border-slate-400 px-2 pb-1 text-xl md:text-2xl">364</span>
                <span className="pt-1 text-xl md:text-2xl">365</span>
              </div>
              <span className="text-4xl md:text-5xl font-light text-slate-300">)</span>
              <sup className="text-emerald-400 font-bold text-2xl md:text-3xl -mt-10 md:-mt-16">253</sup>
              
              <div className={`flex items-center gap-3 transition-all duration-1000 ${activeStep >= 13 ? 'opacity-100 md:ml-4 mt-4 md:mt-0' : 'opacity-0 -ml-10 w-0 overflow-hidden'}`}>
                <span className="text-slate-400 text-2xl md:text-3xl">≈</span>
                <span className="font-bold text-yellow-400 drop-shadow-[0_0_10px_rgba(250,204,21,0.5)]">49.95%</span>
              </div>
            </div>
            {activeStep >= 13 && (
               <div className="text-sm text-slate-400 mt-2 italic animate-fade-in">(Chance that NO ONE matches)</div>
            )}
          </div>

          <div className={`mt-8 md:mt-12 p-6 md:p-8 w-[90%] md:w-auto max-w-md rounded-2xl bg-slate-800/90 border border-slate-600 backdrop-blur-md shadow-2xl transition-all duration-1000 ${activeStep >= 14 ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-90 h-0 overflow-hidden mt-0 p-0 border-0'}`}>
             <div className="flex flex-col items-center text-center gap-4">
               <span className="text-xl md:text-2xl text-slate-200 font-sans tracking-tight">Chance of AT LEAST ONE match:</span>
               <div className="flex items-center justify-center flex-wrap gap-3 text-2xl md:text-3xl font-sans text-slate-300">
                 <span>100% - 49.95%</span>
                 <span>=</span>
                 <span className="text-5xl md:text-6xl font-bold text-white drop-shadow-[0_0_25px_rgba(255,255,255,0.8)] mt-2 md:mt-0">50.05%</span>
               </div>
             </div>
          </div>

        </div>

      </div>

      {/* RIGHT PANE: Scrollable Text Area */}
      <div className="w-full md:w-2/5 px-6 md:px-12 py-[20vh] relative z-20 bg-[#0f111a]/80 md:bg-transparent">
        <div className="flex flex-col gap-[70vh] md:gap-[80vh] pb-[40vh]">
          
          <div className="absolute top-10 left-1/2 -translate-x-1/2 flex flex-col items-center text-slate-500 animate-bounce md:hidden">
            <span className="text-sm font-mono uppercase tracking-widest mb-2">Scroll</span>
            <ArrowDown size={20} />
          </div>

          {steps.map((step, i) => (
            <div 
              key={i} 
              data-index={i}
              className={`step-element transition-all duration-700 ${activeStep === i ? 'opacity-100 scale-100' : 'opacity-30 scale-95'}`}
            >
              <div className="bg-slate-800/95 md:bg-slate-800/80 p-8 md:p-10 rounded-2xl border border-slate-600 shadow-2xl backdrop-blur-lg">
                <div className="text-blue-400 font-mono text-sm md:text-base mb-3 font-semibold tracking-wider uppercase">
                  {i === 0 ? "Start Here" : `Step ${i + 1} of ${steps.length}`}
                </div>
                <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white tracking-tight">{step.title}</h2>
                <p className="text-lg md:text-xl text-slate-300 leading-relaxed font-light">{step.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Background Ambient Glows */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
         <div className={`absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-[150px] transition-colors duration-1000 opacity-20 ${activeStep >= 2 && activeStep <= 4 ? 'bg-purple-600' : 'bg-transparent'}`} />
         <div className={`absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-[150px] transition-colors duration-1000 opacity-20 ${activeStep >= 7 && activeStep < 10 ? 'bg-blue-500' : 'bg-transparent'}`} />
         <div className={`absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-[150px] transition-colors duration-1000 opacity-20 ${activeStep >= 10 ? 'bg-emerald-500' : 'bg-transparent'}`} />
         <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full rounded-full blur-[200px] transition-colors duration-1000 opacity-15 ${activeStep >= 14 ? 'bg-white' : 'bg-transparent'}`} />
      </div>

    </div>
  );
}
