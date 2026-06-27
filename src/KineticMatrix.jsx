import React, { useState, useEffect, useCallback } from 'react';
import { Play, Pause, XCircle } from 'lucide-react';

// Standard clock angles (0 is UP, 90 is RIGHT, 180 is DOWN, 270 is LEFT)
const TL = [90, 180];  // Top-Left corner (Right, Down)
const TR = [270, 180]; // Top-Right corner (Left, Down)
const BL = [0, 90];    // Bottom-Left corner (Up, Right)
const BR = [0, 270];   // Bottom-Right corner (Up, Left)
const HH = [270, 90];  // Horizontal line (Left, Right)
const VV = [0, 180];   // Vertical line (Up, Down)
const XX = [225, 225]; // Blank / Resting state (Down-Left)

// Matrix definitions for each digit (6 rows x 4 columns)
// Designed carefully to form perfect closed loops without any T-junctions.
const DIGITS = {
  0: [
    [TL, HH, HH, TR],
    [VV, TL, TR, VV],
    [VV, VV, VV, VV],
    [VV, VV, VV, VV],
    [VV, BL, BR, VV],
    [BL, HH, HH, BR]
  ],
  1: [
    [XX, XX, TL, TR],
    [XX, XX, VV, VV],
    [XX, XX, VV, VV],
    [XX, XX, VV, VV],
    [XX, XX, VV, VV],
    [XX, XX, BL, BR]
  ],
  2: [
    [TL, HH, HH, TR],
    [BL, HH, TR, VV],
    [TL, HH, BR, VV],
    [VV, TL, HH, BR],
    [VV, BL, HH, TR],
    [BL, HH, HH, BR]
  ],
  3: [
    [TL, HH, HH, TR],
    [BL, HH, TR, VV],
    [TL, HH, BR, VV],
    [BL, HH, TR, VV],
    [TL, HH, BR, VV],
    [BL, HH, HH, BR]
  ],
  4: [
    [TL, TR, TL, TR],
    [VV, VV, VV, VV],
    [VV, BL, BR, VV],
    [BL, HH, TR, VV],
    [XX, XX, VV, VV],
    [XX, XX, BL, BR]
  ],
  5: [
    [TL, HH, HH, TR],
    [VV, TL, HH, BR],
    [VV, BL, HH, TR],
    [BL, HH, TR, VV],
    [TL, HH, BR, VV],
    [BL, HH, HH, BR]
  ],
  6: [
    [TL, HH, HH, TR],
    [VV, TL, HH, BR],
    [VV, BL, HH, TR],
    [VV, TL, TR, VV],
    [VV, BL, BR, VV],
    [BL, HH, HH, BR]
  ],
  7: [
    [TL, HH, HH, TR],
    [BL, HH, TR, VV],
    [XX, XX, VV, VV],
    [XX, XX, VV, VV],
    [XX, XX, VV, VV],
    [XX, XX, BL, BR]
  ],
  8: [
    [TL, HH, HH, TR],
    [VV, TL, TR, VV],
    [VV, BL, BR, VV],
    [VV, TL, TR, VV],
    [VV, BL, BR, VV],
    [BL, HH, HH, BR]
  ],
  9: [
    [TL, HH, HH, TR],
    [VV, TL, TR, VV],
    [VV, BL, BR, VV],
    [BL, HH, TR, VV],
    [TL, HH, BR, VV],
    [BL, HH, HH, BR]
  ],
  '-1': Array(6).fill(Array(4).fill(XX)) // Blank Canvas
};

// Math helpers to enforce continuous sweeping rotations
function calculateNextAngleCW(currentAbs, targetRaw) {
  const currentMod = ((currentAbs % 360) + 360) % 360;
  let diff = targetRaw - currentMod;
  if (diff <= 0) diff += 360; // Force clockwise rotation
  return currentAbs + diff + 360; // Add an extra 360 spin for kinetic flourish
}

function calculateNextAngleCCW(currentAbs, targetRaw) {
  const currentMod = ((currentAbs % 360) + 360) % 360;
  let diff = targetRaw - currentMod;
  if (diff >= 0) diff -= 360; // Force counter-clockwise rotation
  return currentAbs + diff - 360; // Add an extra 360 spin CCW
}

const Clock = ({ h1, h2, delay, isBlank }) => {
  const transitionStyle = {
    transitionProperty: 'transform',
    transitionDuration: '2.5s',
    transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)', // Smooth, elegant ease
    transitionDelay: `${delay}s`,
  };

  // Subtle dimming if the clock is in the "blank/resting" state
  const faceStroke = isBlank ? "#222222" : "#333333";
  const handStroke = isBlank ? "#444444" : "#FFFFFF";

  return (
    <div className="relative flex items-center justify-center">
      <svg viewBox="0 0 100 100" className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20">
        <circle cx="50" cy="50" r="46" fill="#111111" stroke={faceStroke} strokeWidth="2" className="transition-colors duration-1000" />
        
        {/* Hand 1 */}
        <line
          x1="50" y1="50" x2="50" y2="12"
          stroke={handStroke} strokeWidth="6" strokeLinecap="round"
          className="transition-colors duration-1000 shadow-lg"
          style={{ ...transitionStyle, transform: `rotate(${h1}deg)`, transformOrigin: '50px 50px' }}
        />
        
        {/* Hand 2 */}
        <line
          x1="50" y1="50" x2="50" y2="12"
          stroke={handStroke} strokeWidth="6" strokeLinecap="round"
          className="transition-colors duration-1000 shadow-lg"
          style={{ ...transitionStyle, transform: `rotate(${h2}deg)`, transformOrigin: '50px 50px' }}
        />
        
        {/* Center Pivot */}
        <circle cx="50" cy="50" r="4" fill={handStroke} className="transition-colors duration-1000" />
      </svg>
    </div>
  );
};

export default function KineticMatrix() {
  const [digit, setDigit] = useState(0);
  const [autoPlay, setAutoPlay] = useState(false);
  
  // Initialize state with exact starting angles (no spinning on first load)
  const [angles, setAngles] = useState(() => 
    DIGITS[0].flat().map(([h1, h2]) => ({ h1, h2 }))
  );

  const setDigitAndAnimate = useCallback((newDigit) => {
    setDigit(newDigit);
    setAngles(prev => {
      const targets = DIGITS[newDigit].flat();
      return prev.map((curr, i) => {
        const [t1, t2] = targets[i];
        return {
          h1: calculateNextAngleCW(curr.h1, t1),
          h2: calculateNextAngleCCW(curr.h2, t2)
        };
      });
    });
  }, []);

  // Keyboard Event Listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key >= '0' && e.key <= '9') {
        setAutoPlay(false); // Stop autoplay on manual intervention
        setDigitAndAnimate(parseInt(e.key));
      } else if (e.key.toLowerCase() === 'c' || e.key === 'Escape') {
        setAutoPlay(false);
        setDigitAndAnimate(-1);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setDigitAndAnimate]);

  // Autoplay Logic
  useEffect(() => {
    let interval;
    if (autoPlay) {
      interval = setInterval(() => {
        setDigit(current => {
          const next = current >= 9 || current === -1 ? 0 : current + 1;
          setDigitAndAnimate(next);
          return next;
        });
      }, 4500); // 4.5s allows time for the 2.5s animation + resting state to be appreciated
    }
    return () => clearInterval(interval);
  }, [autoPlay, setDigitAndAnimate]);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-slate-200 flex flex-col items-center justify-center p-6 relative overflow-hidden font-sans">
      {/* Subtle Math Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-sky-900/10 via-[#0a0a0a] to-[#0a0a0a] pointer-events-none" />

      <div className="z-10 max-w-2xl w-full flex flex-col items-center gap-12">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl md:text-4xl font-light tracking-widest text-white">
            KINETIC MATRIX
          </h1>
          <p className="text-slate-400 text-sm md:text-base font-light tracking-wide max-w-md mx-auto">
            A continuous loop topology. Observe the mechanical wave dynamics generated by phase-staggered analog paths.
          </p>
        </div>

        {/* Clock Grid */}
        <div className="p-4 md:p-6 bg-[#0f0f0f] rounded-2xl shadow-2xl border border-white/5">
          <div className="grid grid-cols-4 gap-1 md:gap-2">
            {angles.map((clck, i) => {
              const row = Math.floor(i / 4);
              const col = i % 4;
              
              // Calculate Manhattan distance from center to create a stunning ripple wave effect
              const distFromCenter = Math.abs(row - 2.5) + Math.abs(col - 1.5);
              const delay = distFromCenter * 0.12; 

              // Check if the target state for this clock is Blank (XX)
              const currentTarget = DIGITS[digit].flat()[i];
              const isBlank = currentTarget[0] === XX[0] && currentTarget[1] === XX[1];

              return (
                <Clock 
                  key={i} 
                  h1={clck.h1} 
                  h2={clck.h2} 
                  delay={delay} 
                  isBlank={isBlank} 
                />
              );
            })}
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-col items-center gap-6 w-full">
          {/* Keypad */}
          <div className="flex flex-wrap justify-center gap-2 max-w-sm">
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
              <button
                key={num}
                onClick={() => { setAutoPlay(false); setDigitAndAnimate(num); }}
                className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center text-lg font-medium transition-all duration-300
                  ${digit === num 
                    ? 'bg-white text-black shadow-[0_0_15px_rgba(255,255,255,0.4)] scale-110' 
                    : 'bg-white/5 text-slate-400 hover:bg-white/20 hover:text-white'
                  }`}
              >
                {num}
              </button>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => { setAutoPlay(false); setDigitAndAnimate(-1); }}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm uppercase tracking-wider transition-colors
                ${digit === -1 ? 'bg-rose-500/20 text-rose-400 border border-rose-500/50' : 'bg-white/5 text-slate-400 hover:bg-white/10 border border-transparent'}`}
            >
              <XCircle size={16} />
              Clear
            </button>

            <button
              onClick={() => setAutoPlay(!autoPlay)}
              className={`flex items-center gap-2 px-6 py-2 rounded-full text-sm uppercase tracking-wider transition-all duration-300
                ${autoPlay 
                  ? 'bg-sky-500/20 text-sky-400 border border-sky-500/50 shadow-[0_0_20px_rgba(14,165,233,0.2)]' 
                  : 'bg-white/5 text-slate-400 hover:bg-white/10 border border-transparent'}`}
            >
              {autoPlay ? <Pause size={16} /> : <Play size={16} />}
              {autoPlay ? 'Auto-playing' : 'Auto-play'}
            </button>
          </div>
        </div>

        <p className="text-slate-500 text-xs tracking-widest uppercase opacity-50 absolute bottom-6">
          Tip: You can use your keyboard numbers 0-9
        </p>
      </div>
    </div>
  );
}