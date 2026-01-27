
import React, { useState } from 'react';

interface RatingScreenProps {
  onClose: () => void;
}

const RatingScreen: React.FC<RatingScreenProps> = ({ onClose }) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = () => {
    if (rating === 0) {
      alert("Lütfen bir puan seçiniz.");
      return;
    }
    // Simulate submission
    setIsSubmitted(true);
    setTimeout(() => {
      onClose();
    }, 2500);
  };

  if (isSubmitted) {
    return (
      <div className="fixed inset-0 z-50 bg-[#050505] flex flex-col items-center justify-center p-8 animate-[fadeIn_0.5s_ease-out]">
        <div className="relative mb-8">
            <div className="absolute inset-0 bg-yellow-500/20 rounded-full scale-150 blur-3xl animate-pulse"></div>
            <div className="relative w-32 h-32 bg-gold-gradient rounded-full flex items-center justify-center shadow-2xl scale-0 animate-[popIn_0.6s_cubic-bezier(0.175, 0.885, 0.32, 1.275)_forwards]">
                <svg className="w-16 h-16 text-zinc-950" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                </svg>
            </div>
        </div>
        <h2 className="text-3xl font-black text-white tracking-tighter uppercase mb-2 text-center">TEŞEKKÜRLER!</h2>
        <p className="text-zinc-500 text-sm font-medium tracking-wide text-center">Değerlendirmeniz VIP şoför ağımızı <br/> güçlendirmemize yardımcı oldu.</p>
        <div className="mt-12 flex gap-1">
            {[1,2,3].map(i => (
                <div key={i} className="w-1.5 h-1.5 rounded-full bg-yellow-500 animate-bounce" style={{ animationDelay: `${i * 0.1}s` }}></div>
            ))}
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-[#050505] flex flex-col overflow-hidden animate-[slideUp_0.6s_cubic-bezier(0.16, 1, 0.3, 1)]">
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[40%] bg-yellow-600/10 blur-[120px] rounded-full"></div>
      
      <div className="relative p-6 flex items-center justify-between border-b border-white/5 bg-zinc-950/80 backdrop-blur-3xl z-20">
        <button 
          onClick={onClose} 
          className="p-3 bg-zinc-900 rounded-2xl text-zinc-400 active:scale-90 transition-all border border-white/5"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <div className="text-center">
            <h3 className="text-lg font-black tracking-widest text-white uppercase">SÜRÜŞÜ PUANLA</h3>
            <p className="text-[7px] text-yellow-500/60 font-black uppercase tracking-[0.4em] mt-0.5">YOLCULUK SONRASI</p>
        </div>
        <div className="w-12"></div>
      </div>

      <div className="flex-grow flex flex-col items-center justify-center p-8 space-y-12 relative z-10">
        <div className="text-center space-y-2">
            <h4 className="text-xl font-black text-white tracking-tight">Hizmetten memnun kaldınız mı?</h4>
            <p className="text-zinc-500 text-xs font-medium uppercase tracking-widest">Şoför performansı ve araç konforu</p>
        </div>

        {/* Stars Grid */}
        <div className="flex gap-3">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              className={`relative transition-all duration-300 transform active:scale-90 ${
                (hover || rating) >= star ? 'scale-110' : 'scale-100 opacity-30 grayscale'
              }`}
              onMouseEnter={() => setHover(star)}
              onMouseLeave={() => setHover(0)}
              onClick={() => setRating(star)}
            >
              <div className={`absolute inset-0 bg-yellow-500/30 rounded-full blur-xl transition-opacity duration-300 ${
                (hover || rating) >= star ? 'opacity-100' : 'opacity-0'
              }`}></div>
              <svg 
                className={`relative w-12 h-12 ${ (hover || rating) >= star ? 'text-yellow-500' : 'text-zinc-700'}`} 
                fill="currentColor" 
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </button>
          ))}
        </div>

        <div className="w-full max-w-sm space-y-4">
            <div className="relative group">
                <label className="text-[10px] text-zinc-500 font-black uppercase tracking-[0.2em] mb-2 block ml-2">Deneyiminiz (Opsiyonel)</label>
                <div className="bg-zinc-900/40 border border-white/10 rounded-[2rem] p-4 group-focus-within:border-yellow-500/40 transition-all shadow-inner">
                    <textarea 
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Yolculuğunuz hakkında bir şeyler yazın..."
                        rows={4}
                        className="w-full bg-transparent outline-none text-white text-sm font-medium resize-none placeholder:text-zinc-700"
                    />
                </div>
            </div>
        </div>
      </div>

      <div className="p-8 pb-12 relative z-20">
        <button 
          onClick={handleSubmit}
          className="glint-effect w-full bg-gold-gradient text-zinc-950 h-20 rounded-[2.5rem] font-black tracking-[0.2em] uppercase text-sm shadow-[0_20px_40px_rgba(234,179,8,0.25)] active:scale-95 transition-all"
        >
          DEĞERLENDİRMEYİ GÖNDER
        </button>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes slideUp {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
        @keyframes popIn {
          from { transform: scale(0); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
      `}} />
    </div>
  );
};

export default RatingScreen;
