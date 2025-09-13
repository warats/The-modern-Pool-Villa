import React from 'react';
import type { Reward, RedeemedRewards } from '../types';
import { StarIcon } from './icons/StarIcon';
import { LockClosedIcon } from './icons/LockClosedIcon';
import { CheckCircleIcon } from './icons/CheckCircleIcon';
import { TrophyIcon } from './icons/TrophyIcon';

interface RewardsSectionProps {
  rewards: Reward[];
  userPoints: number;
  redeemedRewards: RedeemedRewards;
  onRedeem: (reward: Reward) => void;
  onShowRedeemed: () => void;
  onSelectReward: (reward: Reward) => void;
}

const RewardsSection: React.FC<RewardsSectionProps> = ({ rewards, userPoints, redeemedRewards, onRedeem, onShowRedeemed, onSelectReward }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-700 mb-2">รางวัลของฉัน</h2>
          <p className="text-slate-500">สะสมคะแนนเพื่อปลดล็อคและรับรางวัลสุดพิเศษเหล่านี้!</p>
        </div>
        <button 
          onClick={onShowRedeemed}
          className="flex-shrink-0 flex items-center gap-2 bg-slate-100 text-slate-600 font-semibold py-2 px-4 rounded-lg hover:bg-slate-200 transition-colors"
        >
          <TrophyIcon className="w-5 h-5"/>
          <span>ดูรางวัลที่แลกแล้ว</span>
        </button>
      </div>
      <div className="space-y-4">
        {rewards.sort((a,b) => a.pointsRequired - b.pointsRequired).map(reward => {
          const isRedeemed = !!redeemedRewards[reward.id];
          const canUnlock = userPoints >= reward.pointsRequired;
          const isUnlocked = canUnlock && !isRedeemed;
          
          let cardClasses = 'p-4 border rounded-xl flex items-center gap-4 transition-all duration-300 cursor-pointer';
          let iconContainerClasses = 'p-3 rounded-full mt-1';
          let iconClasses = 'w-6 h-6';

          if (isRedeemed) {
            cardClasses += ' border-slate-200 bg-slate-100';
            iconContainerClasses += ' bg-slate-200 text-slate-500';
          } else if (isUnlocked) {
            cardClasses += ' border-green-200 bg-green-50 hover:bg-green-100 hover:border-green-300';
            iconContainerClasses += ' bg-green-100 text-green-600';
          } else {
            cardClasses += ' border-slate-200 bg-slate-50 opacity-70 hover:opacity-100 hover:bg-slate-100';
            iconContainerClasses += ' bg-slate-200 text-slate-500';
          }

          return (
            <div key={reward.id} className={cardClasses} onClick={() => onSelectReward(reward)}>
              <div className={iconContainerClasses}>
                {canUnlock || isRedeemed ? <CheckCircleIcon className={iconClasses} /> : <LockClosedIcon className={iconClasses} />}
              </div>
              <div className="flex-grow">
                <h3 className={`font-semibold ${isRedeemed ? 'text-slate-500 line-through' : isUnlocked ? 'text-green-800' : 'text-slate-600'}`}>
                  {reward.title}
                </h3>
                <p className={`text-sm ${isRedeemed ? 'text-slate-400' : isUnlocked ? 'text-green-700' : 'text-slate-500'}`}>
                  {reward.description}
                </p>
              </div>
              <div className="ml-auto flex-shrink-0" onClick={(e) => e.stopPropagation()}>
                {isRedeemed ? (
                  <span className="text-sm font-medium text-slate-500 cursor-default bg-slate-200 rounded-full px-4 py-2">
                    แลกแล้ว
                  </span>
                ) : isUnlocked ? (
                  <button
                    onClick={() => onRedeem(reward)}
                    className="bg-green-500 text-white font-bold rounded-lg px-4 py-2 text-sm hover:bg-green-600 transition-colors shadow-sm"
                  >
                    แลกรางวัล
                  </button>
                ) : (
                  <div className="flex items-center gap-1 text-yellow-600 font-bold bg-yellow-100 rounded-full px-3 py-1 text-sm whitespace-nowrap">
                    <StarIcon className="w-4 h-4 text-yellow-500" />
                    <span>{reward.pointsRequired}</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RewardsSection;