
import React, { useState, useEffect } from 'react';

interface PriceListProps {
  onClose: () => void;
}

const PriceList: React.FC<PriceListProps> = ({ onClose }) => {
  const [estimatedTime, setEstimatedTime] = useState(7);

  // Simüle edilmiş canlı varış süresi güncellemesi
  useEffect(() => {
    const interval = setInterval(() => {
      setEstimatedTime(prev => {
        const change = Math.random() > 0.5 ? 1 : -1;
        const newValue = prev + change;
        return newValue < 4 ? 4 : newValue > 12 ? 12 : newValue;
      });
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const prices = [
    { 
      title: 'Açılış Ücreti (4KM)', 
      price: '500 ₺', 
      coverage: '4KM sonra KM Başına +100₺.',
      icon: <path d="M13 10V3L4 14h7v7l9-11h-7z" />,
      tag: 'BAŞLANGIÇ'
    },
    { 
      title: 'Şehir İçi (0-4 KM)', 
      price: '500 ₺', 
      coverage: 'Kısa mesafe hızlı transfer.',
      icon: <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />,
      tag: 'POPÜLER'
    },
    { 
      title: 'Premium (5-10 KM)', 
      price: '1400 ₺', 
      coverage: 'Geniş kapsama alanı hizmeti.',
      icon: <path d="M3 21h18M3 7l9-4 9 4M4 10h16v11H4V10z" />,
      tag: 'VIP SEÇİM'
    },
    
    { 
      title: 'Bekleme Ücreti', 
      price: '250 ₺', 
      coverage: 'Saatlik bekleme hizmeti.',
      icon: <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />,
      tag: 'SAATLİK'
    },
  ];

  return (
    <div className="fixed inset-0 z-[60] bg-[#050505] flex flex-col overflow-hidden animate-[slideUpPrice_0.6s_cubic-bezier(0.16, 1, 0.3, 1)]">
      {/* Dynamic Background FX */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-yellow-600/5 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-96 h-96 bg-zinc-800/10 rounded-full blur-[100px]"></div>
      </div>

      {/* Premium Header */}
      <div className="relative p-6 pt-10 flex items-center justify-between bg-zinc-950/40 backdrop-blur-3xl border-b border-white/5 z-20">
        <button 
          onClick={onClose} 
          className="p-3 bg-zinc-900/80 rounded-2xl text-zinc-400 active:scale-90 transition-all border border-white/5 shadow-xl"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div className="text-center">
            <h3 className="text-xl font-extrabold tracking-[0.2em] text-white uppercase">TARİFELER</h3>
            <div className="flex items-center justify-center gap-2 mt-1">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                <span className="text-[9px] text-zinc-400 font-black tracking-widest uppercase">GÜNCEL VIP FİYATLAR</span>
            </div>
        </div>
        <div className="w-12"></div>
      </div>

      {/* Content Area */}
      <div className="flex-grow overflow-y-auto px-6 py-8 space-y-5 relative z-10 custom-scroll pb-32">
        {prices.map((item, index) => (
          <div 
            key={index} 
            className="group relative flex flex-col p-6 bg-zinc-900/40 backdrop-blur-md border border-white/10 rounded-[2.5rem] overflow-hidden opacity-0 animate-[staggerPriceIn_0.5s_ease-out_forwards]"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            {/* Glint Effect Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:animate-[glint_2s_ease-in-out_infinite]"></div>
            
            <div className="flex justify-between items-start relative z-10">
                <div className="flex gap-4">
                    <div className="w-12 h-12 bg-yellow-500/10 rounded-2xl flex items-center justify-center border border-yellow-500/20 group-hover:scale-110 transition-transform duration-500">
                        <svg className="w-6 h-6 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                            {item.icon}
                        </svg>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[10px] text-yellow-500/60 font-black tracking-widest uppercase mb-1">{item.tag}</span>
                        <h4 className="font-black text-white text-base tracking-tight">{item.title}</h4>
                    </div>
                </div>
                <div className="text-right">
                    <span className="block font-black text-yellow-500 text-2xl tracking-tighter">{item.price}</span>
                </div>
            </div>
            
            <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between">
                <p className="text-[10px] text-zinc-500 font-medium tracking-wide">
                    {item.coverage}
                </p>
                <div className="w-2 h-2 rounded-full bg-zinc-800"></div>
            </div>
          </div>
        ))}

        {/* Dynamic Footer Info */}
        <div className="p-8 rounded-[2.5rem] border border-dashed border-yellow-500/20 bg-yellow-500/5 mt-8 flex flex-col items-center text-center opacity-0 animate-[fadeIn_1s_ease-out_forwards_0.8s]">
            <div className="w-14 h-14 bg-zinc-900 rounded-full flex items-center justify-center mb-4 border border-white/10">
                <div className="relative">
                    <div className="absolute inset-0 bg-green-500/20 rounded-full animate-ping"></div>
                    <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
            </div>
            <h5 className="text-white font-black text-sm tracking-widest uppercase">Canlı Operasyon Durumu</h5>
            <p className="text-zinc-500 text-[10px] mt-2 font-bold uppercase tracking-widest">
                Şu an bölgenizde <span className="text-yellow-500">Aktif Şoförler</span> mevcut.
            </p>
            <div className="mt-4 px-4 py-2 bg-zinc-950 rounded-full border border-white/5 flex items-center gap-3">
                <span className="text-[9px] text-zinc-400 font-black tracking-[0.2em] uppercase">Tahmini Varış:</span>
                <span className="text-yellow-500 font-black text-sm">{estimatedTime} dk</span>
            </div>
        </div>
      </div>

      {/* Fixed Call to Action Background Blur */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-[#050505] via-[#050505]/80 to-transparent z-20 pointer-events-none"></div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes slideUpPrice {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
        @keyframes staggerPriceIn {
          from { transform: translateY(30px) scale(0.95); opacity: 0; }
          to { transform: translateY(0) scale(1); opacity: 1; }
        }
        @keyframes glint {
          0% { transform: translateX(-150%) skewX(-25deg); }
          100% { transform: translateX(150%) skewX(-25deg); }
        }
        .custom-scroll::-webkit-scrollbar {
          display: none;
        }
        .custom-scroll {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}} />
    </div>
  );
};

export default PriceList;
