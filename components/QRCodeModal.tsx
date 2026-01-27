
import React from 'react';

interface QRCodeModalProps {
  onClose: () => void;
}

const QRCodeModal: React.FC<QRCodeModalProps> = ({ onClose }) => {
  const downloadUrl = 'https://github.com/mediaconfig55-afk/ayik-sofor/raw/refs/heads/main/Ay%C4%B1k%20%C5%9Eof%C3%B6r_1.0.apk';
  const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(downloadUrl)}&bgcolor=18181b&color=eab308&margin=10`;

  const handleDownload = () => {
    window.open(downloadUrl, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-[#050505]/90 backdrop-blur-2xl animate-[fadeIn_0.3s_ease-out]">
      <div className="w-full max-w-sm bg-zinc-900/95 border border-yellow-500/20 rounded-[3rem] p-10 relative overflow-hidden shadow-[0_40px_80px_-20px_rgba(0,0,0,0.8)] flex flex-col items-center text-center animate-[popIn_0.4s_cubic-bezier(0.175, 0.885, 0.32, 1.275)]">
        
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-yellow-500/5 rounded-full -translate-y-24 translate-x-24 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-yellow-500/5 rounded-full translate-y-24 -translate-x-24 blur-3xl"></div>

        <h3 className="text-xl font-black text-white tracking-widest uppercase mb-2">Uygulamayı İndir</h3>
        <p className="text-[10px] text-yellow-500/60 font-black uppercase tracking-[0.4em] mb-8">Tarayıcı ile okutun</p>

        {/* QR Code Container */}
        <div className="relative group mb-10">
            <div className="absolute inset-0 bg-yellow-500/10 rounded-[2.5rem] blur-2xl group-hover:bg-yellow-500/20 transition-all duration-500 scale-110"></div>
            <div 
              onClick={handleDownload}
              className="relative w-64 h-64 bg-zinc-950 rounded-[2.5rem] p-4 border border-white/5 flex items-center justify-center overflow-hidden cursor-pointer active:scale-95 transition-transform"
            >
              <img 
                src={qrImageUrl} 
                alt="Download QR" 
                className="w-full h-full rounded-2xl mix-blend-lighten shadow-2xl transition-all group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent -translate-x-full animate-[glint_4s_infinite]"></div>
            </div>
        </div>

        <div className="w-full space-y-4">
            <button 
                onClick={handleDownload}
                className="glint-effect w-full bg-gold-gradient text-zinc-950 py-5 rounded-[1.5rem] font-black tracking-widest uppercase text-sm shadow-[0_15px_30px_rgba(234,179,8,0.3)] active:scale-95 transition-all"
            >
                Direkt İndir
            </button>
            <button 
                onClick={onClose}
                className="w-full bg-zinc-800/80 text-zinc-200 py-5 rounded-[1.5rem] font-black tracking-[0.2em] uppercase text-xs border border-white/10 active:bg-zinc-700 transition-all"
            >
                KAPAT
            </button>
        </div>

        <p className="mt-8 text-[9px] text-zinc-600 font-bold uppercase tracking-widest italic">
            ↪AYIK ŞOFÖR KURUMSAL®↩
        </p>
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

export default QRCodeModal;
