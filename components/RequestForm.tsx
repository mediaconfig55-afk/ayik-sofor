
import React, { useState, useEffect } from 'react';
import { LocationState, FormData } from '../types';

interface RequestFormProps {
  onClose: () => void;
  location: LocationState;
}

const RequestForm: React.FC<RequestFormProps> = ({ onClose, location }) => {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    plate: '',
    personCount: '1',
    description: ''
  });

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleWhatsAppSend = () => {
    if (!formData.fullName || !formData.plate) {
      alert('⚠️ Lütfen adınızı ve araç plakanızı eksiksiz doldurun.');
      return;
    }

    const locString = location.latitude && location.longitude 
      ? `\n📍 VIP LOKASYON: https://www.google.com/maps?q=${location.latitude},${location.longitude}`
      : '\n📍 KONUM: Manuel paylaşılacak';

    const text = `👑 *AYIK ŞOFÖR VIP TALEP* 👑\n\n` +
      `⚜️ *YOLCU:* ${formData.fullName.toUpperCase()}\n` +
      `🚗 *ARAÇ PLAKA:* ${formData.plate.toUpperCase()}\n` +
      `👥 *MİSAFİR SAYISI:* ${formData.personCount} Kişi\n` +
      `📜 *ÖZEL NOT:* ${formData.description || 'Standart VIP Hizmet'}` +
      `${locString}\n\n` +
      `🛡️ _Bu mesaj güvenli AYIK ŞOFÖR altyapısı ile oluşturulmuştur._`;

    window.open(`https://wa.me/905442946570?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#050505] flex flex-col overflow-hidden animate-[slideUp_0.6s_cubic-bezier(0.16, 1, 0.3, 1)]">
      {/* Premium Background FX */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[40%] bg-yellow-600/10 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[40%] bg-zinc-800/20 blur-[100px] rounded-full pointer-events-none"></div>

      {/* Modern Header */}
      <div className="relative p-6 flex items-center justify-between bg-zinc-950/80 backdrop-blur-3xl border-b border-white/5 z-20">
        <button 
          onClick={onClose} 
          className="p-3 bg-zinc-900 rounded-2xl text-zinc-400 active:scale-90 transition-all border border-white/5 shadow-lg"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div className="flex flex-col items-center">
            <h3 className="text-lg font-black tracking-[0.25em] text-white uppercase">HIZLI REZERVASYON</h3>
            <div className="flex items-center gap-1.5 mt-1">
                <div className="w-1.5 h-1.5 rounded-full bg-yellow-500 animate-pulse"></div>
                <span className="text-[9px] text-yellow-500/80 font-black tracking-widest uppercase">VIP Hizmet Hattı</span>
            </div>
        </div>
        <div className="w-12"></div>
      </div>

      <div className="flex-grow overflow-y-auto px-6 py-8 relative z-10 custom-scroll">
        <div className="max-w-md mx-auto space-y-6 pb-12">
          
          {/* Section: Kişisel Bilgiler */}
          <div className={`space-y-5 transition-all duration-700 delay-100 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="group space-y-2">
              <label className="flex items-center gap-2 text-[10px] text-zinc-500 font-black uppercase tracking-[0.2em] ml-2">
                <svg className="w-3 h-3 text-yellow-500" fill="currentColor" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
                ADINIZ VE SOYADINIZ
              </label>
              <div className="relative overflow-hidden rounded-[1.2rem] bg-zinc-900/40 border border-white/10 group-focus-within:border-yellow-500/50 transition-all shadow-inner">
                <input 
                  type="text" 
                  name="fullName" 
                  value={formData.fullName} 
                  onChange={handleChange}
                  placeholder="örn: Ahmet Yılmaz"
                  className="w-full bg-transparent p-4 outline-none text-white font-bold text-base placeholder:text-zinc-700"
                />
              </div>
            </div>

            <div className="group space-y-2">
              <label className="flex items-center gap-2 text-[10px] text-zinc-500 font-black uppercase tracking-[0.2em] ml-2">
                <svg className="w-3 h-3 text-yellow-500" fill="currentColor" viewBox="0 0 24 24"><path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99z"/></svg>
                ARAÇ PLAKASI
              </label>
              <div className="relative overflow-hidden rounded-[1.2rem] bg-zinc-900/40 border border-white/10 group-focus-within:border-yellow-500/50 transition-all shadow-inner">
                <input 
                  type="text" 
                  name="plate" 
                  value={formData.plate} 
                  onChange={handleChange}
                  placeholder="34 ABC 123"
                  className="w-full bg-transparent p-4 outline-none text-white font-black tracking-[0.1em] text-lg uppercase placeholder:text-zinc-700"
                />
              </div>
            </div>
          </div>

          {/* Section: Detaylar */}
          <div className={`grid grid-cols-2 gap-4 transition-all duration-700 delay-200 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="group space-y-2">
              <label className="text-[10px] text-zinc-500 font-black uppercase tracking-[0.2em] ml-2">YOLCU SAYISI</label>
              <div className="relative bg-zinc-900/40 border border-white/10 rounded-xl p-0.5 group-focus-within:border-yellow-500/50 transition-all">
                <select 
                  name="personCount" 
                  value={formData.personCount} 
                  onChange={handleChange}
                  className="w-full bg-transparent p-3 outline-none text-white font-black appearance-none text-center"
                >
                  {[1, 2, 3, 4, 5, 6].map(num => <option key={num} value={num} className="bg-zinc-950">{num} Kişi</option>)}
                </select>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-yellow-500/40">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M19 9l-7 7-7-7" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </div>
              </div>
            </div>
            <div className="space-y-2">
                <label className="text-[10px] text-zinc-500 font-black uppercase tracking-[0.2em] ml-2">HİZMET TÜRÜ</label>
                <div className="w-full bg-yellow-500/5 border border-yellow-500/20 p-3 rounded-xl text-yellow-500 font-black text-[10px] flex items-center justify-center tracking-widest uppercase">
                    VIP VALE
                </div>
            </div>
          </div>

          <div className={`group space-y-2 transition-all duration-700 delay-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <label className="text-[10px] text-zinc-500 font-black uppercase tracking-[0.2em] ml-2">ÖZEL NOT (OPSİYONEL)</label>
            <div className="relative bg-zinc-900/40 border border-white/10 rounded-[1.5rem] p-1.5 group-focus-within:border-yellow-500/50 transition-all shadow-inner">
              <textarea 
                name="description" 
                value={formData.description} 
                onChange={handleChange} 
                rows={3}
                placeholder="Şoföre iletmek istediğiniz not..."
                className="w-full bg-transparent p-3 outline-none text-white text-sm font-medium resize-none placeholder:text-zinc-700"
              />
            </div>
          </div>

          {/* Location Confirmation Banner */}
          <div className={`p-4 rounded-[1.5rem] border border-zinc-800 bg-zinc-900/20 flex items-center gap-4 transition-all duration-700 delay-400 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="relative shrink-0">
                <div className="absolute inset-0 bg-green-500/20 rounded-full animate-ping"></div>
                <div className="relative w-10 h-10 bg-green-500/10 border border-green-500/30 rounded-xl flex items-center justify-center">
                  <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  </svg>
                </div>
            </div>
            <div>
              <p className="text-[10px] text-white font-black uppercase tracking-widest leading-none">KONUM DOĞRULANDI</p>
              <p className="text-[8px] text-zinc-500 mt-1 font-bold uppercase">GPS verisi WhatsApp mesajına eklenecektir.</p>
            </div>
          </div>

          {/* Moved Action Button here inside the flow */}
          <div className={`pt-2 transition-all duration-700 delay-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <button 
              onClick={handleWhatsAppSend}
              className="glint-effect w-full bg-gold-gradient text-zinc-950 h-16 rounded-[1.8rem] flex items-center justify-center gap-3 transition-all shadow-[0_15px_30px_rgba(234,179,8,0.2)] active:scale-95 tracking-[0.15em] font-black uppercase"
            >
              <div className="p-1.5 bg-zinc-950/10 rounded-lg">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
              </div>
              <span className="text-lg">TALEP OLUŞTUR</span>
            </button>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes slideUp {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
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

export default RequestForm;
