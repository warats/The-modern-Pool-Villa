
import React from 'react';
import type { Challenge, UserProgress } from '../types';
import ChallengeCard from './ChallengeCard';

interface ChallengeListProps {
  challenges: Challenge[];
  userProgress: UserProgress;
  onSelectChallenge: (challenge: Challenge) => void;
}

const ChallengeList: React.FC<ChallengeListProps> = ({ challenges, userProgress, onSelectChallenge }) => {
  return (
    <div className="space-y-4">
      {challenges.map(challenge => (
        <ChallengeCard
          key={challenge.id}
          challenge={challenge}
          isCompleted={!!userProgress[challenge.id]}
          onSelect={() => onSelectChallenge(challenge)}
        />
      ))}
    </div>
  );
};

export default ChallengeList;
