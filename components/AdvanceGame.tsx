
import React from 'react';

interface AdvanceGameProps {
  onGoHome: () => void;
}

const AdvanceGame: React.FC<AdvanceGameProps> = ({ onGoHome }) => {
  return (
    <div className="bg-slate-50 min-h-screen flex flex-col items-center justify-center p-4 text-center">
      <div className="bg-white p-10 rounded-2xl shadow-lg">
        <h1 className="text-4xl font-bold text-slate-800 mb-4">Game Pixel</h1>
        <p className="text-slate-600 mb-8">เร็วๆ นี้!</p>
        <button
          onClick={onGoHome}
          className="bg-slate-500 text-white font-bold py-2 px-6 rounded-lg hover:bg-slate-600 transition-colors"
        >
          กลับไปหน้าแรก
        </button>
      </div>
    </div>
  );
};

export default AdvanceGame;
