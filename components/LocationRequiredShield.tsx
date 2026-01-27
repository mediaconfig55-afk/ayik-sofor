
import React from 'react';

interface LocationRequiredShieldProps {
  error: string;
  onRetry: () => void;
}

const LocationRequiredShield: React.FC<LocationRequiredShieldProps> = ({ error, onRetry }) => {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-[#050505]/95 backdrop-blur-3xl animate-[fadeIn_0.5s_ease-out]">
      <div className="w-full max-w-sm bg-zinc-900 border border-red-500/20 rounded-[3rem] p-10 relative overflow-hidden shadow-[0_40px_80px_rgba(0,0,0,0.8)] flex flex-col items-center text-center">
        
        {/* Animated Warning Icon */}
        <div className="relative mb-10">
          <div className="absolute inset-0 bg-red-500/20 rounded-full scale-150 blur-2xl animate-pulse"></div>
          <div className="relative w-24 h-24 bg-zinc-950 border-2 border-red-500/30 rounded-full flex items-center justify-center shadow-inner">
            <svg className="w-12 h-12 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <div className="absolute -top-1 -right-1 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center border-4 border-zinc-900 shadow-lg">
                <span className="text-white text-lg font-black leading-none">!</span>
            </div>
          </div>
        </div>

        <h2 className="text-2xl font-black text-white tracking-tighter uppercase mb-3">KONUM ERİŞİMİ GEREKLİ</h2>
        <div className="h-1 w-12 bg-red-500/40 rounded-full mb-6"></div>
        
        <p className="text-sm text-zinc-400 font-medium leading-relaxed mb-10">
          VIP Hizmet politikamız gereği, uygulamayı kullanabilmek için aktif konum izni zorunludur. 
          <br/><br/>
          <span className="text-red-400 font-bold uppercase text-[10px] tracking-widest">{error}</span>
        </p>

        <button 
          onClick={onRetry}
          className="w-full bg-white text-zinc-950 py-5 rounded-[1.5rem] font-black tracking-widest uppercase text-sm shadow-xl active:scale-95 transition-all hover:bg-zinc-200"
        >
          İZİN VER VE TEKRAR DENE
        </button>

        <p className="mt-8 text-[9px] text-zinc-600 font-bold uppercase tracking-[0.2em]">
            GÜVENLİĞİNİZ İÇİN ZORUNLU PROSEDÜR
        </p>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}} />
    </div>
  );
};

export default LocationRequiredShield;
