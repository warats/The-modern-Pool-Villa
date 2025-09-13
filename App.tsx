
import React, { useState, useCallback } from 'react';
import { challenges as initialChallenges, rewards as initialRewards } from './data/mockData';
import type { Challenge, Reward, UserProgress, RedeemedRewards, UsedRewards } from './types';
import Header from './components/Header';
import ChallengeList from './components/ChallengeList';
import ChallengeDetailModal from './components/ChallengeDetailModal';
import RewardsSection from './components/RewardsSection';
import Home from './components/Home';
import Admin from './components/Admin';
import GamePixel from './components/Game-Pixel';
import RedeemedRewardsModal from './components/RedeemedRewardsModal';
import RewardDetail from './components/RewardDetail';

const App: React.FC = () => {
  const [view, setView] = useState<'home' | 'user' | 'admin' | 'game_pixel'>('home');
  const [challenges] = useState<Challenge[]>(initialChallenges);
  const [rewards] = useState<Reward[]>(initialRewards);
  const [userPoints, setUserPoints] = useState<number>(0);
  const [userProgress, setUserProgress] = useState<UserProgress>({});
  const [activeChallenge, setActiveChallenge] = useState<Challenge | null>(null);
  const [selectedReward, setSelectedReward] = useState<Reward | null>(null);
  const [redeemedRewards, setRedeemedRewards] = useState<RedeemedRewards>({});
  const [usedRewards, setUsedRewards] = useState<UsedRewards>({});
  const [isRedeemedModalOpen, setIsRedeemedModalOpen] = useState(false);

  const handleGoHome = () => setView('home');

  const handleSelectChallenge = (challenge: Challenge) => {
    if (!userProgress[challenge.id]) {
      setActiveChallenge(challenge);
    }
  };

  const handleCloseModal = () => {
    setActiveChallenge(null);
  };

  const handleCompleteChallenge = useCallback((challengeId: string, points: number) => {
    setUserProgress(prev => ({ ...prev, [challengeId]: true }));
    setUserPoints(prev => prev + points);
    setActiveChallenge(null);
  }, []);
  
  const handleRedeemReward = useCallback((reward: Reward) => {
    if (userPoints >= reward.pointsRequired && !redeemedRewards[reward.id]) {
      setUserPoints(prev => prev - reward.pointsRequired);
      setRedeemedRewards(prev => ({...prev, [reward.id]: true}));
    }
  }, [userPoints, redeemedRewards]);

  const handleUseReward = useCallback((rewardId: string) => {
    setUsedRewards(prev => ({...prev, [rewardId]: true}));
  }, []);

  const handleOpenRedeemedModal = () => setIsRedeemedModalOpen(true);
  const handleCloseRedeemedModal = () => setIsRedeemedModalOpen(false);
  
  const handleSelectReward = (reward: Reward) => setSelectedReward(reward);
  const handleDeselectReward = () => setSelectedReward(null);

  if (view === 'home') {
    return <Home 
      onSelectUser={() => setView('user')} 
      onSelectAdmin={() => setView('admin')} 
      onSelectGamePixel={() => setView('game_pixel')}
    />;
  }

  if (view === 'admin') {
    return <Admin onGoHome={handleGoHome} />;
  }

  if (view === 'game_pixel') {
    return <GamePixel onGoHome={handleGoHome} />;
  }

  if (selectedReward) {
    return <RewardDetail reward={selectedReward} onGoBack={handleDeselectReward} />;
  }

  return (
    <div className="bg-slate-50 min-h-screen text-slate-800">
      <div className="container mx-auto p-4 sm:p-6 lg:p-8 max-w-4xl">
        <Header userPoints={userPoints} onGoHome={handleGoHome} />
        <main>
          <div className="bg-white rounded-2xl shadow-lg p-6 my-8">
            <h2 className="text-2xl font-bold text-slate-700 mb-2">ภารกิจท้าทาย</h2>
            <p className="text-slate-500 mb-6">ทำภารกิจให้สำเร็จเพื่อรับคะแนนและปลดล็อครางวัลสุดพิเศษ!</p>
            <ChallengeList
              challenges={challenges}
              userProgress={userProgress}
              onSelectChallenge={handleSelectChallenge}
            />
          </div>

          <RewardsSection 
            rewards={rewards} 
            userPoints={userPoints}
            redeemedRewards={redeemedRewards}
            onRedeem={handleRedeemReward}
            onShowRedeemed={handleOpenRedeemedModal}
            onSelectReward={handleSelectReward}
          />
        </main>
      </div>
      {activeChallenge && (
        <ChallengeDetailModal
          challenge={activeChallenge}
          onClose={handleCloseModal}
          onComplete={handleCompleteChallenge}
        />
      )}
      {isRedeemedModalOpen && (
        <RedeemedRewardsModal
          onClose={handleCloseRedeemedModal}
          rewards={rewards}
          redeemedRewards={redeemedRewards}
          usedRewards={usedRewards}
          onUseReward={handleUseReward}
        />
      )}
      <footer className="text-center py-6 text-slate-400">
        <p>The modern Pool Villa &copy; 2024</p>
      </footer>
    </div>
  );
};

export default App;
