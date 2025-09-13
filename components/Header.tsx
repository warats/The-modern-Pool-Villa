
import React from 'react';
import { StarIcon } from './icons/StarIcon';
import { ArrowLeftIcon } from './icons/ArrowLeftIcon';

interface HeaderProps {
  userPoints: number;
  onGoHome?: () => void;
}

const Header: React.FC<HeaderProps> = ({ userPoints, onGoHome }) => {
  return (
    <header className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-2xl shadow-lg p-6 flex justify-between items-center">
      <div className="flex items-center gap-4">
        {onGoHome && (
          <button onClick={onGoHome} aria-label="กลับไปหน้าแรก" className="p-2 rounded-full transition-colors hover:bg-white/20 -ml-2">
            <ArrowLeftIcon className="w-6 h-6"/>
          </button>
        )}
        <div>
          <h1 className="text-3xl font-bold tracking-tight">The modern Pool Villa</h1>
          <p className="text-blue-100">เกมส์สำหรับแขกคนพิเศษ</p>
        </div>
      </div>
      <div className="flex items-center gap-2 bg-white/20 rounded-full px-4 py-2">
        <StarIcon className="w-6 h-6 text-yellow-300" />
        <span className="text-xl font-bold">{userPoints}</span>
        <span className="text-sm font-light">คะแนน</span>
      </div>
    </header>
  );
};

export default Header;