
import React from 'react';

interface AdminProps {
  onGoHome: () => void;
}

const Admin: React.FC<AdminProps> = ({ onGoHome }) => {
  return (
    <div className="bg-slate-50 min-h-screen flex flex-col items-center justify-center p-4 text-center">
      <div className="bg-white p-10 rounded-2xl shadow-lg">
        <h1 className="text-4xl font-bold text-slate-800 mb-4">หน้าสำหรับแอดมิน</h1>
        <p className="text-slate-600 mb-8">ส่วนนี้ยังอยู่ในการพัฒนา</p>
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

export default Admin;
