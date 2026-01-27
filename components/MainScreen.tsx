
import React from 'react';
import { LocationState } from '../types';

interface MainScreenProps {
  onOpenForm: () => void;
  onOpenPrices: () => void;
  onOpenContact: () => void;
  onOpenQR: () => void;
  location: LocationState;
}

const MainScreen: React.FC<MainScreenProps> = ({ 
  onOpenForm, 
  onOpenPrices, 
  onOpenContact, 
  onOpenQR, 
  location
}) => {
  const isBlocked = !!location.error || location.loading;

  return (
    <div className="flex flex-col h-screen w-full p-6 justify-between bg-[#050505] overflow-hidden relative animate-[fadeIn_0.8s_ease-out]">
      {/* Animated Background Blobs with Rich Gold */}
      <div className="ambient-blob bg-[#ca8a04] top-[-5%] left-[-10%] opacity-10"></div>
      <div className="ambient-blob bg-[#a16207] bottom-[-10%] right-[-5%] opacity-10" style={{ animationDelay: '-5s' }}></div>
      
      {/* Top Header Section */}
      <div className="flex justify-between items-start mt-6 relative z-10">
        <div className="animate-[slideDown_0.6s_ease-out]">
          <span className="text-[10px] text-[#ca8a04] tracking-[0.4em] font-black uppercase mb-1 block">VIP HİZMET</span>
          <h2 className="text-3xl font-black tracking-tighter text-white drop-shadow-lg">
            AYIK ŞOFÖR
          </h2>
        </div>
        
        {/* Right Corner Location Indicator */}
        <div className="flex items-center bg-zinc-900/60 backdrop-blur-2xl px-3 py-2 rounded-2xl border border-white/10 shadow-2xl animate-[fadeIn_1s_ease-out]">
          <div className="relative mr-2">
            <div className={`w-2.5 h-2.5 rounded-full ${location.error ? 'bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]' : location.loading ? 'bg-yellow-600' : 'bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]'} animate-pulse`}></div>
          </div>
          <div className="flex flex-col items-start">
            <span className="text-[7px] text-zinc-500 font-black uppercase tracking-widest leading-none">GPS</span>
            <span className="text-[9px] text-white font-bold uppercase tracking-tighter leading-tight">
              {location.error ? 'Hata' : location.loading ? '...' : 'Aktif'}
            </span>
          </div>
        </div>
      </div>

      {/* Central Interactive Hub */}
      <div className="flex flex-col items-center justify-center flex-grow relative">
        <div className="absolute w-[360px] h-[360px] border border-[#ca8a04]/10 rounded-full animate-pulse"></div>
        <div className="absolute w-[300px] h-[300px] border border-white/5 rounded-full"></div>
        <div className="absolute w-[330px] h-[330px] border-2 border-dashed border-[#ca8a04]/10 rounded-full animate-orbit"></div>

        <button 
          onClick={onOpenForm}
          disabled={isBlocked}
          className={`relative group focus:outline-none z-10 transition-transform active:scale-90 duration-300 ${isBlocked ? 'opacity-40 grayscale pointer-events-none' : ''}`}
        >
          <div className="absolute inset-0 bg-[#ca8a04]/30 rounded-full scale-125 blur-2xl opacity-40 group-active:opacity-100 transition-opacity"></div>
          <div className="absolute inset-0 bg-[#ca8a04]/20 rounded-full scale-110 animate-[pulse-gold-rich_2s_infinite]"></div>
          
          <div className="relative w-64 h-64 bg-zinc-900 rounded-full flex flex-col items-center justify-center border-[6px] border-[#050505] shadow-[inset_0_0_20px_rgba(255,255,255,0.05)] overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent -translate-x-full animate-[glint_4s_infinite]"></div>
            
            <div className="relative flex flex-col items-center z-20">
                <div className="w-24 h-24 bg-gold-gradient rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(202,138,4,0.5)] mb-6 transform group-hover:scale-110 transition-transform">
                    <svg viewBox="0 0 24 24" className="w-12 h-12 fill-zinc-950 drop-shadow-md">
                        <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"/>
                    </svg>
                </div>
                <div className="text-center">
                    <span className="text-white font-black text-2xl tracking-[0.2em] uppercase leading-none block">TALEP ET</span>
                    <span className="text-[#ca8a04]/80 text-[10px] font-black mt-2 tracking-[0.4em] uppercase opacity-70">Secured Order</span>
                </div>
            </div>

            <div className="absolute bottom-6 flex gap-1">
                {[1,2,3].map(i => (
                    <div key={i} className="w-1 h-1 rounded-full bg-[#ca8a04]/40 animate-pulse" style={{ animationDelay: `${i*0.2}s` }}></div>
                ))}
            </div>
          </div>
        </button>
        
        <div className="mt-14 flex flex-col items-center animate-[fadeIn_1.5s_ease-out]">
            <span className="text-[10px] text-zinc-500 font-bold tracking-[0.3em] uppercase mb-2">Operational Region: IST</span>
            <div className="h-[1px] w-12 bg-zinc-800"></div>
        </div>
      </div>

      {/* Bottom Actions - Now much more prominent and colorful */}
      <div className="flex flex-col gap-4 mb-10 relative z-10 px-2 animate-[slideUp_0.8s_ease-out]">
        <button 
          onClick={onOpenContact}
          disabled={isBlocked}
          className={`glint-effect group relative bg-zinc-900 border-2 border-[#ca8a04] p-5 rounded-[2.5rem] active:scale-[0.98] transition-all flex items-center justify-between px-8 shadow-[0_10px_30px_rgba(202,138,4,0.15)] ${isBlocked ? 'opacity-40 grayscale pointer-events-none' : ''}`}
        >
          <div className="flex items-center gap-4">
            <div className="bg-gold-gradient w-12 h-12 rounded-full flex items-center justify-center border border-white/20 shadow-lg group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6 text-zinc-950" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.11-.27c1.12.45 2.33.69 3.58.69a1 1 0 011 1V20a1 1 0 01-1 1A18 18 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.24 2.46.69 3.58a1 1 0 01-.27 1.11l-2.2 2.2z" />
                </svg>
            </div>
            <div className="text-left">
                <span className="font-black text-sm text-[#eab308] uppercase tracking-widest block">ŞOFÖRÜ ARA</span>
                <span className="text-[10px] text-zinc-400 font-bold uppercase">Bize Ulaşın / VIP Destek</span>
            </div>
          </div>
          <svg className="w-5 h-5 text-[#ca8a04]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7" />
          </svg>
        </button>

        <div className="grid grid-cols-2 gap-4">
          <button 
            onClick={onOpenPrices}
            className="group relative bg-zinc-900 border-2 border-[#ca8a04]/40 p-6 rounded-[2.5rem] active:bg-zinc-800 transition-all flex flex-col gap-4 items-start shadow-xl hover:border-[#ca8a04]/80"
          >
            <div className="bg-[#ca8a04]/20 w-12 h-12 rounded-2xl flex items-center justify-center border border-[#ca8a04]/40 group-active:scale-90 transition-transform">
              <svg className="w-6 h-6 text-[#eab308]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
            <span className="font-black text-xs text-white uppercase tracking-[0.1em]">Tarifeler</span>
          </button>

          <button 
            onClick={onOpenQR}
            className="group relative bg-zinc-900 border-2 border-[#ca8a04]/40 p-6 rounded-[2.5rem] active:bg-zinc-800 transition-all flex flex-col gap-4 items-start shadow-xl hover:border-[#ca8a04]/80"
          >
            <div className="bg-[#ca8a04]/20 w-12 h-12 rounded-2xl flex items-center justify-center border border-[#ca8a04]/40 group-active:scale-90 transition-transform">
              <svg className="w-6 h-6 text-[#eab308]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </div>
            <span className="font-black text-xs text-white uppercase tracking-[0.1em]">APK İNDİR</span>
          </button>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse-gold-rich {
            0% { box-shadow: 0 0 0 0 rgba(202, 138, 4, 0.4), 0 0 20px rgba(202, 138, 4, 0.2); }
            70% { box-shadow: 0 0 0 40px rgba(202, 138, 4, 0), 0 0 60px rgba(202, 138, 4, 0.4); }
            100% { box-shadow: 0 0 0 0 rgba(202, 138, 4, 0), 0 0 20px rgba(202, 138, 4, 0.1); }
        }
      `}} />
    </div>
  );
};

export default MainScreen;
