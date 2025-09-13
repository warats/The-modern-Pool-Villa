
import React from 'react';
import { UserIcon } from './icons/UserIcon';
import { CogIcon } from './icons/CogIcon';
import { SparklesIcon } from './icons/SparklesIcon';

interface HomeProps {
  onSelectUser: () => void;
  onSelectAdmin: () => void;
  onSelectGamePixel: () => void;
}

const Home: React.FC<HomeProps> = ({ onSelectUser, onSelectAdmin, onSelectGamePixel }) => {
  return (
    <div className="bg-slate-50 min-h-screen flex flex-col items-center justify-center p-4 text-center">
      <div className="mb-12">
        <h1 className="text-5xl sm:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-500 mb-3">
          The modern Pool Villa
        </h1>
        <p className="text-xl text-slate-500">กรุณาเลือกบทบาทของคุณเพื่อเริ่มต้น</p>
      </div>
      <div className="flex flex-col sm:flex-row gap-6 w-full max-w-2xl">
        <button
          onClick={onSelectUser}
          className="w-full flex flex-col items-center justify-center gap-3 bg-white text-blue-600 font-bold py-8 px-8 rounded-2xl shadow-lg hover:shadow-xl border border-transparent hover:border-blue-300 transition-all transform hover:-translate-y-1"
        >
          <UserIcon className="w-10 h-10" />
          <span className="text-xl">สำหรับผู้ใช้งาน</span>
        </button>
        <button
          onClick={onSelectGamePixel}
          className="w-full flex flex-col items-center justify-center gap-3 bg-white text-purple-600 font-bold py-8 px-8 rounded-2xl shadow-lg hover:shadow-xl border border-transparent hover:border-purple-300 transition-all transform hover:-translate-y-1"
        >
          <SparklesIcon className="w-10 h-10" />
          <span className="text-xl">Game Pixel</span>
        </button>
        <button
          onClick={onSelectAdmin}
          className="w-full flex flex-col items-center justify-center gap-3 bg-white text-slate-700 font-bold py-8 px-8 rounded-2xl shadow-lg hover:shadow-xl border border-transparent hover:border-slate-300 transition-all transform hover:-translate-y-1"
        >
          <CogIcon className="w-10 h-10" />
          <span className="text-xl">สำหรับแอดมิน</span>
        </button>
      </div>
       <footer className="absolute bottom-6 text-slate-400">
        <p>The modern Pool Villa &copy; 2024</p>
      </footer>
    </div>
  );
};

export default Home;
