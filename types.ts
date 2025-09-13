export enum ChallengeType {
  QUESTION = 'QUESTION',
  PHOTO = 'PHOTO',
  QR = 'QR',
  GPS = 'GPS',
}

export interface Challenge {
  id: string;
  type: ChallengeType;
  title: string;
  description: string;
  points: number;
  data: {
    question?: string;
    answer?: string | number;
    qrCodeValue?: string;
    targetCoordinates?: { lat: number; lng: number };
    verificationPrompt?: string;
  };
}

export interface Reward {
  id: string;
  title: string;
  description: string;
  pointsRequired: number;
}

export interface UserProgress {
  [challengeId: string]: boolean;
}

export interface RedeemedRewards {
  [rewardId: string]: boolean;
}

export interface UsedRewards {
  [rewardId: string]: boolean;
}
