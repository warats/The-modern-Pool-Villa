import React from 'react';
import type { Reward, RedeemedRewards, UsedRewards } from '../types';
import { CheckCircleIcon } from './icons/CheckCircleIcon';
import { TrophyIcon } from './icons/TrophyIcon';

interface RedeemedRewardsModalProps {
  onClose: () => void;
  rewards: Reward[];
  redeemedRewards: RedeemedRewards;
  usedRewards: UsedRewards;
  onUseReward: (rewardId: string) => void;
}

const RedeemedRewardsModal: React.FC<RedeemedRewardsModalProps> = ({ onClose, rewards, redeemedRewards, usedRewards, onUseReward }) => {
  const redeemedList = rewards.filter(reward => redeemedRewards[reward.id]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50 transition-opacity" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 sm:p-8 relative transform transition-transform scale-95 animate-modal-pop-in" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 text-3xl font-bold">&times;</button>

        <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-blue-100 rounded-full">
                <TrophyIcon className="w-7 h-7 text-blue-600"/>
            </div>
            <div>
                <h2 className="text-2xl font-bold text-slate-800">รางวัลที่แลกแล้ว</h2>
                <p className="text-slate-500">นี่คือรายการรางวัลที่คุณได้รับ</p>
            </div>
        </div>
        
        <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
          {redeemedList.length > 0 ? (
            redeemedList.map(reward => {
              const isUsed = !!usedRewards[reward.id];
              return (
              <div key={reward.id} className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex items-center gap-4">
                <div className="p-2 bg-green-100 rounded-full self-start mt-1">
                  <CheckCircleIcon className="w-6 h-6 text-green-600" />
                </div>
                <div className="flex-grow">
                  <h3 className="font-semibold text-slate-700">{reward.title}</h3>
                  <p className="text-sm text-slate-500">{reward.description}</p>
                </div>
                <div className="ml-2 flex-shrink-0">
                  {isUsed ? (
                      <span className="text-sm font-medium text-slate-500 cursor-default bg-slate-200 rounded-full px-4 py-2">
                        ใช้แล้ว
                      </span>
                  ) : (
                    <button
                      onClick={() => onUseReward(reward.id)}
                      className="bg-blue-500 text-white font-bold rounded-lg px-4 py-2 text-sm hover:bg-blue-600 transition-colors shadow-sm"
                    >
                      ใช้รางวัล
                    </button>
                  )}
                </div>
              </div>
            )})
          ) : (
            <div className="text-center py-10 px-6 bg-slate-50 rounded-lg">
              <p className="font-medium text-slate-600">คุณยังไม่ได้แลกรางวัลใดๆ</p>
              <p className="text-sm text-slate-400 mt-1">ทำภารกิจให้สำเร็จเพื่อรับคะแนนมาแลกรางวัล!</p>
            </div>
          )}
        </div>
        <style>{`
            @keyframes modal-pop-in {
                from {
                    opacity: 0;
                    transform: scale(0.95) translateY(10px);
                }
                to {
                    opacity: 1;
                    transform: scale(1) translateY(0);
                }
            }
            .animate-modal-pop-in {
                animation: modal-pop-in 0.3s ease-out forwards;
            }
        `}</style>
      </div>
    </div>
  );
};

export default RedeemedRewardsModal;