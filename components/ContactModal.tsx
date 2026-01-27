
import React from 'react';

interface ContactModalProps {
  onClose: () => void;
}

const ContactModal: React.FC<ContactModalProps> = ({ onClose }) => {
  const phoneNumber = '+90 544 294 65 70';
  
  const handleCall = () => {
    window.location.href = 'tel:+905442946570';
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-[#050505]/90 backdrop-blur-xl animate-[fadeIn_0.3s_ease-out]">
      <div className="w-full max-w-sm bg-zinc-900 border border-yellow-500/20 rounded-[2.5rem] p-8 relative overflow-hidden shadow-2xl flex flex-col items-center text-center animate-[popIn_0.4s_cubic-bezier(0.175, 0.885, 0.32, 1.275)]">
        
        {/* Decor */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/5 rounded-full -translate-y-16 translate-x-16 blur-2xl"></div>

        {/* Icon */}
        <div className="w-16 h-16 bg-gold-gradient rounded-full flex items-center justify-center border-2 border-zinc-800 shadow-lg mb-6">
            <svg className="w-8 h-8 text-zinc-950" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.11-.27c1.12.45 2.33.69 3.58.69a1 1 0 011 1V20a1 1 0 01-1 1A18 18 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.24 2.46.69 3.58a1 1 0 01-.27 1.11l-2.2 2.2z" />
            </svg>
        </div>

        <h3 className="text-lg font-black text-white tracking-widest uppercase mb-1">VIP DESTEK</h3>
        <p className="text-[9px] text-yellow-500/60 font-bold tracking-[0.3em] uppercase mb-8 italic">7/24 Kesintisiz Hizmet</p>
        
        <div className="mb-8 w-full bg-zinc-950 border border-white/5 rounded-2xl p-5">
            <span className="text-2xl font-black text-white tracking-tighter">{phoneNumber}</span>
        </div>

        <div className="flex flex-col gap-3 w-full">
            <button 
                onClick={handleCall}
                className="glint-effect w-full bg-gold-gradient text-zinc-950 py-4 rounded-2xl font-black tracking-widest uppercase text-xs shadow-xl active:scale-95 transition-transform"
            >
                Hemen Ara
            </button>
            <button 
                onClick={onClose}
                className="w-full bg-zinc-800 text-white py-4 rounded-2xl font-black tracking-[0.2em] uppercase text-[10px] border border-zinc-700 active:bg-zinc-700 active:scale-95 transition-all"
            >
                KAPAT
            </button>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes popIn {
          from { transform: scale(0.8); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}} />
    </div>
  );
};

export default ContactModal;
