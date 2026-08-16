import React, { useState, useEffect } from 'react';

// --- DATA & CONFIG ---
const EXCHANGE_RATES = { USD: 1, DKK: 6.46, EUR: 0.87 };

const STEPS = [
  {
    id: 0,
    content: (
      <div className="prose prose-invert lg:prose-xl">
        <h1 className="text-4xl md:text-5xl font-serif text-blue-400 mb-6 drop-shadow-[0_0_10px_rgba(59,130,246,0.6)]">
          Dollars, Euros, and Kroner… Oh My!
        </h1>
        <p className="text-gray-300">Welcome to the math of money! Have you ever wondered how people buy things in different parts of the world?</p>
        <div className="mt-12 text-sm text-gray-500 flex flex-col items-center animate-bounce w-fit">
          <span>Scroll down to start</span>
          <span>↓</span>
        </div>
      </div>
    )
  },
  {
    id: 1,
    content: (
      <div className="prose prose-invert lg:prose-xl">
        <h2 className="text-3xl font-serif text-gray-200">Meet the Currencies</h2>
        <p className="text-gray-300">
          Every country (or group of countries) has its own special kind of money, called a <strong>currency</strong>.
        </p>
        <p className="text-gray-300">
          You're probably used to the <strong>US Dollar (USD)</strong>. But if you visit Denmark, you'll need the <strong>Danish Krone (DKK)</strong>, and in many parts of Europe, you'll use the <strong>Euro (EUR)</strong>!
        </p>
      </div>
    )
  },
  {
    id: 2,
    content: (
      <div className="prose prose-invert lg:prose-xl">
        <h2 className="text-3xl font-serif text-amber-400">The Candy Bar Test</h2>
        <p className="text-gray-300">Why do different currencies matter? Let's say you want to buy a yummy chocolate bar.</p>
        <p className="text-gray-300">
          In the US, it might cost exactly <strong>$1.00</strong>. But if you flew to Denmark, you couldn't just hand the cashier a dollar bill. They only accept Kroner!
        </p>
      </div>
    )
  },
  {
    id: 3,
    content: (
      <div className="prose prose-invert lg:prose-xl">
        <h2 className="text-3xl font-serif text-blue-300">The Exchange Machine</h2>
        <p className="text-gray-300">
          To buy that candy in Denmark, you have to <strong>exchange</strong> your money. You give the bank 1 Dollar, and they give you about <strong>6.46 Kroner</strong>.
        </p>
        <p className="text-gray-300">
          It sounds like you got richer because 6 is bigger than 1, right? But remember, that candy bar in Denmark costs about 6.50 Kroner. You just have more coins to buy the exact same thing!
        </p>
      </div>
    )
  },
  {
    id: 4,
    content: (
      <div className="prose prose-invert lg:prose-xl">
        <h2 className="text-3xl font-serif text-yellow-400">What about Euros?</h2>
        <p className="text-gray-300">
          If you take your 1 Dollar to France or Germany, you trade it for Euros. Right now, 1 USD is only worth about <strong>0.87 EUR</strong>.
        </p>
        <p className="text-gray-300">
          Wait, less than 1? Yes! The Euro is a "stronger" currency right now, meaning a single Euro coin holds slightly more purchasing power than a single Dollar. To convert your dollars, you simply multiply by 0.87.
        </p>
      </div>
    )
  },
  {
    id: 5,
    content: (
      <div className="prose prose-invert lg:prose-xl">
        <h2 className="text-3xl font-serif text-purple-400">Advanced Money Magic</h2>
        <p className="text-gray-300">As you get older, you'll discover even more secrets about how money moves.</p>
        <ul className="text-gray-300">
          <li><strong>Inflation:</strong> When money loses its superpower over time, meaning things get more expensive. (That candy bar used to cost only 50 cents!)</li>
          <li><strong>Arbitrage:</strong> A clever trick where people buy something cheap in one country and sell it for more in another!</li>
        </ul>
        <p className="text-gray-300 italic">
          We'll learn those advanced concepts later. For now, keep scrolling to try the Currency Machine yourself!
        </p>
      </div>
    )
  }
];

// --- ANIMATION STATE MAP ---
// Defines { opacity, x, y, scale } for every object in every scene
const animationData = {
  globe: {
    0: { o: 1, x: 0, y: 0, s: 1.5 },
    1: { o: 0, x: 0, y: -50, s: 0.5 },
    2: { o: 0, x: 0, y: -50, s: 0.5 },
    3: { o: 0, x: 0, y: -50, s: 0.5 },
    4: { o: 0, x: 0, y: -50, s: 0.5 },
    5: { o: 0, x: 0, y: -50, s: 0.5 },
  },
  usd: {
    0: { o: 0, x: -90, y: 50, s: 0.5 },
    1: { o: 1, x: -90, y: 0, s: 1 },
    2: { o: 1, x: -90, y: 50, s: 0.8 },
    3: { o: 1, x: -100, y: -40, s: 1.1 },
    4: { o: 1, x: -100, y: -40, s: 1.1 },
    5: { o: 0, x: -100, y: -100, s: 0.5 },
  },
  eur: {
    0: { o: 0, x: 0, y: 50, s: 0.5 },
    1: { o: 1, x: 0, y: 0, s: 1 },
    2: { o: 1, x: 0, y: 50, s: 0.8 },
    3: { o: 0, x: 0, y: 50, s: 0.5 },
    4: { o: 1, x: 100, y: -40, s: 1.1 },
    5: { o: 0, x: 100, y: -100, s: 0.5 },
  },
  dkk: {
    0: { o: 0, x: 90, y: 50, s: 0.5 },
    1: { o: 1, x: 90, y: 0, s: 1 },
    2: { o: 1, x: 90, y: 50, s: 0.8 },
    3: { o: 1, x: 100, y: -40, s: 1.1 },
    4: { o: 0, x: 100, y: -40, s: 0.5 },
    5: { o: 0, x: 100, y: -100, s: 0.5 },
  },
  candy: {
    0: { o: 0, x: 0, y: -100, s: 0.5 },
    1: { o: 0, x: 0, y: -100, s: 0.5 },
    2: { o: 1, x: 0, y: -60, s: 1.2 },
    3: { o: 0, x: 0, y: -100, s: 0.5 },
    4: { o: 0, x: 0, y: -100, s: 0.5 },
    5: { o: 0, x: 0, y: -100, s: 0.5 },
  },
  arrow: {
    0: { o: 0, x: 0, y: -40, s: 0.5 },
    1: { o: 0, x: 0, y: -40, s: 0.5 },
    2: { o: 0, x: 0, y: -40, s: 0.5 },
    3: { o: 1, x: 0, y: -40, s: 1 },
    4: { o: 1, x: 0, y: -40, s: 1 },
    5: { o: 0, x: 0, y: -40, s: 0.5 },
  },
  math1: {
    0: { o: 0, x: 0, y: 50, s: 0.8 },
    1: { o: 0, x: 0, y: 50, s: 0.8 },
    2: { o: 0, x: 0, y: 50, s: 0.8 },
    3: { o: 1, x: 0, y: 40, s: 1 },
    4: { o: 0, x: 0, y: 50, s: 0.8 },
    5: { o: 0, x: 0, y: 50, s: 0.8 },
  },
  math2: {
    0: { o: 0, x: 0, y: 50, s: 0.8 },
    1: { o: 0, x: 0, y: 50, s: 0.8 },
    2: { o: 0, x: 0, y: 50, s: 0.8 },
    3: { o: 0, x: 0, y: 50, s: 0.8 },
    4: { o: 1, x: 0, y: 40, s: 1 },
    5: { o: 0, x: 0, y: 50, s: 0.8 },
  },
  advanced: {
    0: { o: 0, x: 0, y: 50, s: 0.8 },
    1: { o: 0, x: 0, y: 50, s: 0.8 },
    2: { o: 0, x: 0, y: 50, s: 0.8 },
    3: { o: 0, x: 0, y: 50, s: 0.8 },
    4: { o: 0, x: 0, y: 50, s: 0.8 },
    5: { o: 1, x: 0, y: 0, s: 1 },
  }
};

const getStyle = (scene, objId) => {
  const state = animationData[objId][scene] || { o: 0, x: 0, y: 0, s: 1 };
  return {
    opacity: state.o,
    transform: `translate(calc(-50% + ${state.x}px), calc(-50% + ${state.y}px)) scale(${state.s})`,
    transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)', // Bouncy spring feel
    position: 'absolute',
    top: '50%',
    left: '50%',
    pointerEvents: state.o > 0 ? 'auto' : 'none',
  };
};

// --- COMPONENTS ---

const MathText = ({ children, color }) => (
  <span className="font-serif tracking-wider font-bold mx-1" style={{ color, textShadow: `0 0 10px ${color}88` }}>
    {children}
  </span>
);

const CurrencyNode = ({ symbol, name, color, style, scene, price }) => (
  <div style={style} className="flex flex-col items-center justify-center">
    <div 
      className="w-16 h-16 rounded-full border-2 flex items-center justify-center text-2xl font-serif font-bold bg-gray-900/80 backdrop-blur-sm"
      style={{ borderColor: color, color: color, boxShadow: `0 0 20px ${color}66` }}
    >
      {symbol}
    </div>
    <div className="mt-2 text-xs md:text-sm tracking-widest text-gray-400 font-sans uppercase">
      {name}
    </div>
    <div className={`mt-1 font-serif text-white font-bold transition-opacity duration-700 ${scene === 2 ? 'opacity-100' : 'opacity-0'}`}>
      {price}
    </div>
  </div>
);

const Visualization = ({ scene }) => {
  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* 3B1B Style Grid Background */}
      <div 
        className="absolute inset-0 z-0 opacity-10"
        style={{
          backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.2) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          backgroundPosition: 'center center'
        }}
      />

      {/* Graphical Elements */}
      <div style={getStyle(scene, 'globe')} className="text-6xl md:text-8xl animate-pulse">
        🌍
      </div>

      <CurrencyNode scene={scene} style={getStyle(scene, 'usd')} symbol="$" name="USD" color="#3b82f6" price="$1.00" />
      <CurrencyNode scene={scene} style={getStyle(scene, 'eur')} symbol="€" name="EUR" color="#eab308" price="0.87€" />
      <CurrencyNode scene={scene} style={getStyle(scene, 'dkk')} symbol="kr" name="DKK" color="#ef4444" price="6.46kr" />

      {/* Candy Bar */}
      <div style={getStyle(scene, 'candy')} className="flex flex-col items-center">
        <div className="w-28 h-12 bg-[#5D4037] rounded-md border-2 border-[#3E2723] flex items-center justify-center shadow-[0_0_20px_rgba(93,64,55,0.6)] relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-4 bg-[#795548] opacity-30"></div>
          <span className="text-amber-100 font-black tracking-widest text-sm z-10">CHOCO</span>
        </div>
      </div>

      {/* Multiplier Arrow (Scene 3 & 4) */}
      <div style={getStyle(scene, 'arrow')} className="flex flex-col items-center text-gray-400">
        <span className="text-sm font-serif mb-1 font-bold tracking-widest text-white drop-shadow-md">
          {scene === 3 ? '× 6.46' : '× 0.87'}
        </span>
        <svg width="80" height="24" viewBox="0 0 80 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M0 12 H75 M65 2 L75 12 L65 22" />
        </svg>
      </div>

      {/* Math Equations */}
      <div style={getStyle(scene, 'math1')} className="whitespace-nowrap text-2xl md:text-4xl font-serif text-gray-200">
        <MathText color="#3b82f6">1.00 USD</MathText> = <MathText color="#ef4444">6.46 DKK</MathText>
      </div>

      <div style={getStyle(scene, 'math2')} className="whitespace-nowrap text-2xl md:text-4xl font-serif text-gray-200">
        <MathText color="#3b82f6">1.00 USD</MathText> = <MathText color="#eab308">0.87 EUR</MathText>
      </div>

      {/* Advanced Concepts (Scene 5) */}
      <div style={getStyle(scene, 'advanced')} className="flex flex-row gap-4 md:gap-8 items-center w-[300px] md:w-[400px] justify-center">
        {/* Inflation Box */}
        <div className="flex flex-col items-center p-4 border border-gray-700 rounded-xl bg-gray-900/80 w-1/2 shadow-2xl backdrop-blur-md">
          <div className="text-lg text-purple-400 font-serif mb-3 font-bold">Inflation</div>
          <div className="relative w-12 h-12 flex items-center justify-center">
            <div className="absolute inset-0 bg-purple-500/30 rounded-full animate-ping"></div>
            <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center font-bold text-white z-10 border-2 border-purple-300">
              $
            </div>
          </div>
          <div className="text-[10px] md:text-xs text-gray-400 mt-4 text-center leading-tight">
            Prices expand,<br/>value shrinks
          </div>
        </div>

        {/* Arbitrage Box */}
        <div className="flex flex-col items-center p-4 border border-gray-700 rounded-xl bg-gray-900/80 w-1/2 shadow-2xl backdrop-blur-md">
          <div className="text-lg text-emerald-400 font-serif mb-3 font-bold">Arbitrage</div>
          <div className="flex gap-2 items-end h-12">
            <div className="flex flex-col items-center">
              <span className="text-[10px] text-emerald-200 mb-1">Buy $1</span>
              <div className="w-6 h-4 bg-emerald-900 rounded-t-sm border-b-0 border border-emerald-500"></div>
            </div>
            <svg width="24" height="24" viewBox="0 0 30 30" className="text-emerald-400 mb-1" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M0 20 Q 15 0 30 20" />
              <path d="M25 20 L30 20 L30 15"/>
            </svg>
            <div className="flex flex-col items-center">
              <span className="text-[10px] text-emerald-200 mb-1">Sell $2</span>
              <div className="w-6 h-8 bg-emerald-900 rounded-t-sm border-b-0 border border-emerald-500"></div>
            </div>
          </div>
          <div className="text-[10px] md:text-xs text-gray-400 mt-4 text-center leading-tight">
            Buy low,<br/>sell high
          </div>
        </div>
      </div>
    </div>
  );
};

const InteractiveConverter = () => {
  const [amount, setAmount] = useState(10);
  const [fromCur, setFromCur] = useState('USD');
  const [toCur, setToCur] = useState('DKK');

  const handleAmount = (e) => {
    const val = e.target.value;
    setAmount(val === '' ? '' : Number(val));
  };

  const convertedAmount = amount === '' 
    ? '0.00' 
    : ((amount / EXCHANGE_RATES[fromCur]) * EXCHANGE_RATES[toCur]).toFixed(2);

  return (
    <div className="w-full bg-[#0b0c10] py-24 px-4 border-t border-gray-800 flex flex-col items-center z-20 relative shadow-[0_-20px_50px_rgba(0,0,0,0.5)]">
      <h2 className="text-3xl md:text-5xl font-serif text-white mb-12 text-center drop-shadow-lg">
        Your Turn: Currency Machine
      </h2>
      
      <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6 bg-gray-900/50 p-6 md:p-10 rounded-3xl shadow-2xl border border-gray-700 backdrop-blur-sm w-full max-w-4xl">
        
        <div className="flex flex-col w-full md:w-auto">
          <label className="text-gray-400 text-sm mb-2 uppercase tracking-widest font-bold">Amount</label>
          <input
            type="number"
            min="0"
            value={amount}
            onChange={handleAmount}
            className="bg-gray-950 border border-gray-700 text-white text-2xl p-4 rounded-xl text-center outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
          />
        </div>

        <div className="flex flex-col w-full md:w-auto mt-4 md:mt-0">
          <label className="text-gray-400 text-sm mb-2 uppercase tracking-widest font-bold">From</label>
          <select
            value={fromCur}
            onChange={(e) => setFromCur(e.target.value)}
            className="bg-gray-950 border border-gray-700 text-white text-2xl p-4 rounded-xl outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all cursor-pointer"
          >
            <option value="USD">🇺🇸 USD ($)</option>
            <option value="EUR">🇪🇺 EUR (€)</option>
            <option value="DKK">🇩🇰 DKK (kr)</option>
          </select>
        </div>

        <div className="text-4xl text-gray-600 my-4 md:my-0 md:mt-6 animate-pulse">➔</div>

        <div className="flex flex-col w-full md:w-auto">
          <label className="text-gray-400 text-sm mb-2 uppercase tracking-widest font-bold">To</label>
          <select
            value={toCur}
            onChange={(e) => setToCur(e.target.value)}
            className="bg-gray-950 border border-gray-700 text-white text-2xl p-4 rounded-xl outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all cursor-pointer"
          >
            <option value="USD">🇺🇸 USD ($)</option>
            <option value="EUR">🇪🇺 EUR (€)</option>
            <option value="DKK">🇩🇰 DKK (kr)</option>
          </select>
        </div>
      </div>

      <div className="mt-16 text-center">
        <div className="text-gray-400 text-xl mb-4 font-serif italic">The Math Machine says you get:</div>
        <div className="text-6xl md:text-8xl font-serif font-bold text-green-400 tracking-wider drop-shadow-[0_0_20px_rgba(74,222,128,0.4)]">
          {convertedAmount} <span className="text-3xl md:text-5xl text-gray-500 ml-2">{toCur}</span>
        </div>
      </div>
    </div>
  );
};

export default function CurrencyExchange() {
  const [activeScene, setActiveScene] = useState(0);

  useEffect(() => {
    const handleIntersect = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveScene(Number(entry.target.dataset.scene));
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, {
      root: null,
      rootMargin: "-45% 0px -45% 0px", // Triggers right in the middle of the viewport
      threshold: 0
    });

    const elements = document.querySelectorAll('.scene-step');
    elements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-[#07080a] text-gray-200 font-sans selection:bg-blue-500/30">
      
      {/* Scrollytelling Section */}
      <div className="flex flex-col md:flex-row relative">
        
        {/* Right/Top Side: Sticky Visualization */}
        <div className="w-full md:w-1/2 h-[45vh] md:h-screen sticky top-0 bg-[#07080a] border-b md:border-b-0 md:border-l border-gray-800/50 overflow-hidden z-10 md:order-2">
          <Visualization scene={activeScene} />
        </div>

        {/* Left Side: Scrolly Text Content */}
        <div className="w-full md:w-1/2 p-6 md:p-12 lg:p-24 pb-32 md:order-1 relative z-0">
          {STEPS.map((step) => (
            <div 
              key={step.id} 
              data-scene={step.id} 
              className={`scene-step min-h-[70vh] md:min-h-screen flex flex-col justify-center transition-all duration-1000 ${activeScene === step.id ? 'opacity-100 translate-y-0' : 'opacity-20 translate-y-4'}`}
            >
              {step.content}
            </div>
          ))}
        </div>
        
      </div>

      {/* Interactive Free-Play Section */}
      <InteractiveConverter />

    </div>
  );
}
