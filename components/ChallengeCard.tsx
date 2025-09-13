
import React from 'react';
import type { Challenge } from '../types';
import { ChallengeType } from '../types';
import { CameraIcon } from './icons/CameraIcon';
import { QrIcon } from './icons/QrIcon';
import { MapPinIcon } from './icons/MapPinIcon';
import { QuestionIcon } from './icons/QuestionIcon';
import { CheckIcon } from './icons/CheckIcon';
import { StarIcon } from './icons/StarIcon';

interface ChallengeCardProps {
  challenge: Challenge;
  isCompleted: boolean;
  onSelect: () => void;
}

const challengeIcons: Record<ChallengeType, JSX.Element> = {
  [ChallengeType.PHOTO]: <CameraIcon className="w-6 h-6 text-slate-500" />,
  [ChallengeType.QR]: <QrIcon className="w-6 h-6 text-slate-500" />,
  [ChallengeType.GPS]: <MapPinIcon className="w-6 h-6 text-slate-500" />,
  [ChallengeType.QUESTION]: <QuestionIcon className="w-6 h-6 text-slate-500" />,
};

const ChallengeCard: React.FC<ChallengeCardProps> = ({ challenge, isCompleted, onSelect }) => {
  const icon = challengeIcons[challenge.type];

  return (
    <button
      onClick={onSelect}
      disabled={isCompleted}
      className={`w-full text-left p-4 border rounded-xl flex items-center gap-4 transition-all duration-300 ${
        isCompleted
          ? 'bg-green-50 border-green-200 cursor-not-allowed'
          : 'bg-white hover:bg-slate-50 hover:shadow-md hover:border-blue-300'
      }`}
    >
      <div className={`p-3 rounded-full ${isCompleted ? 'bg-green-100' : 'bg-slate-100'}`}>
        {isCompleted ? <CheckIcon className="w-6 h-6 text-green-600" /> : icon}
      </div>
      <div className="flex-grow">
        <h3 className={`font-semibold ${isCompleted ? 'text-slate-400 line-through' : 'text-slate-800'}`}>
          {challenge.title}
        </h3>
        <p className={`text-sm ${isCompleted ? 'text-slate-400' : 'text-slate-500'}`}>{challenge.description}</p>
      </div>
      <div className="flex items-center gap-1 text-yellow-500 font-bold bg-yellow-100 rounded-full px-3 py-1 text-sm">
        <StarIcon className="w-4 h-4" />
        <span>{challenge.points}</span>
      </div>
    </button>
  );
};

export default ChallengeCard;
