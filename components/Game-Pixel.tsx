
import React from 'react';
import { ArrowLeftIcon } from './icons/ArrowLeftIcon';

interface GamePixelProps {
  onGoHome: () => void;
}

const GamePixel: React.FC<GamePixelProps> = ({ onGoHome }) => {
  return (
    <div className="bg-slate-900 flex flex-col items-stretch" style={{ height: '100vh' }}>
      <header className="w-full bg-slate-800 p-4 flex justify-between items-center shadow-md flex-shrink-0 z-10">
        <h1 className="text-xl sm:text-2xl font-bold text-white">Game Pixel</h1>
        <button
          onClick={onGoHome}
          className="flex items-center gap-2 bg-slate-700 text-white font-semibold py-2 px-4 rounded-lg hover:bg-slate-600 transition-colors"
        >
          <ArrowLeftIcon className="w-5 h-5" />
          <span className="hidden sm:inline">กลับไปหน้าแรก</span>
        </button>
      </header>

      <main className="w-full flex-grow relative">
        <iframe
          src="https://gameserver.beta-host.com/codecanyon-YGPLvZaZ-word-finder-html5-word-game-/game/index.html"
          title="Game Pixel - Word Finder"
          className="absolute top-0 left-0 w-full h-full border-0"
          allowFullScreen
        ></iframe>
      </main>
    </div>
  );
};

export default GamePixel;
