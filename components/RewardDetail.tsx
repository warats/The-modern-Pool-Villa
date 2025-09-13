import React from 'react';
import type { Reward } from '../types';
import { ArrowLeftIcon } from './icons/ArrowLeftIcon';
import { StarIcon } from './icons/StarIcon';
import { TrophyIcon } from './icons/TrophyIcon';

interface RewardDetailProps {
  reward: Reward;
  onGoBack: () => void;
}

const RewardDetail: React.FC<RewardDetailProps> = ({ reward, onGoBack }) => {
  return (
    <div className="bg-slate-100 min-h-screen">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto p-4 max-w-4xl flex items-center gap-4">
            <button 
              onClick={onGoBack} 
              aria-label="กลับไปหน้ารางวัล" 
              className="p-2 rounded-full transition-colors hover:bg-slate-200 -ml-2"
            >
              <ArrowLeftIcon className="w-6 h-6 text-slate-700"/>
            </button>
            <h1 className="text-xl font-bold text-slate-800">รายละเอียดรางวัล</h1>
        </div>
      </header>
      <main className="container mx-auto p-4 sm:p-6 lg:p-8 max-w-4xl">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="p-8 bg-gradient-to-r from-cyan-500 to-blue-500 flex flex-col items-center justify-center text-white text-center">
                <div className="p-4 bg-white/20 rounded-full mb-4">
                    <TrophyIcon className="w-12 h-12"/>
                </div>
                <h2 className="text-3xl font-bold tracking-tight">{reward.title}</h2>
            </div>
            <div className="p-8 space-y-6">
                <div>
                    <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-2">คำอธิบาย</h3>
                    <p className="text-lg text-slate-600">{reward.description}</p>
                </div>
                <div className="border-t border-slate-200 pt-6">
                     <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-2">คะแนนที่ต้องใช้</h3>
                     <div className="flex items-center gap-2 text-2xl font-bold text-yellow-500">
                        <StarIcon className="w-7 h-7" />
                        <span>{reward.pointsRequired} คะแนน</span>
                     </div>
                </div>
            </div>
        </div>
      </main>
    </div>
  );
};

export default RewardDetail;