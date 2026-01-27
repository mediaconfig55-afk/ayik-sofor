
import React, { useEffect, useRef } from 'react';
import { GoogleGenAI, Modality } from "@google/genai";

const SplashScreen: React.FC = () => {
  const audioPlayed = useRef(false);

  useEffect(() => {
    const playGreeting = async () => {
      if (audioPlayed.current) return;
      audioPlayed.current = true;

      try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const response = await ai.models.generateContent({
          model: "gemini-2.5-flash-preview-tts",
          contents: [{ parts: [{ text: 'Say elegantly and professionally: Ayık Şoför VIP hizmetine hoş geldiniz. Güvenli ve konforlu yolculuklar dileriz.' }] }],
          config: {
            responseModalities: [Modality.AUDIO],
            speechConfig: {
                voiceConfig: {
                  prebuiltVoiceConfig: { voiceName: 'Kore' }, // 'Kore' is a deep, professional male voice
                },
            },
          },
        });

        const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
        if (base64Audio) {
          const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
          const audioBuffer = await decodeAudioData(
            decodeBase64(base64Audio),
            audioContext,
            24000,
            1,
          );
          const source = audioContext.createBufferSource();
          source.buffer = audioBuffer;
          source.connect(audioContext.destination);
          source.start();
        }
      } catch (error) {
        console.error("TTS Audio error:", error);
      }
    };

    playGreeting();
  }, []);

  function decodeBase64(base64: string) {
    const binaryString = atob(base64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes;
  }

  async function decodeAudioData(
    data: Uint8Array,
    ctx: AudioContext,
    sampleRate: number,
    numChannels: number,
  ): Promise<AudioBuffer> {
    const dataInt16 = new Int16Array(data.buffer);
    const frameCount = dataInt16.length / numChannels;
    const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

    for (let channel = 0; channel < numChannels; channel++) {
      const channelData = buffer.getChannelData(channel);
      for (let i = 0; i < frameCount; i++) {
        channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
      }
    }
    return buffer;
  }

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#050505] p-8 overflow-hidden">
      {/* Decorative background light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-yellow-600/10 rounded-full blur-[120px]"></div>
      
      <div className="relative w-72 h-72 flex items-center justify-center">
        {/* Spinning VIP Border */}
        <div className="absolute inset-0 border-[1px] border-yellow-500/20 rounded-full"></div>
        <div className="absolute inset-0 border-t-2 border-yellow-500 rounded-full animate-orbit"></div>
        
        {/* Car Silhouette with Entry and Exit Animations */}
        <div className="relative z-10 animate-[bounceIn_1.2s_ease-out]">
          <div className="animate-[zoomOutFade_0.8s_ease-in-out_2.7s_forwards]">
            <svg 
              viewBox="0 0 24 24" 
              className="w-36 h-36 fill-yellow-500 drop-shadow-[0_0_15px_rgba(234,179,8,0.6)]"
            >
              <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"/>
            </svg>
          </div>
        </div>
      </div>

      <div className="mt-12 text-center relative z-10">
        <div className="animate-[zoomOutFade_0.8s_ease-in-out_2.7s_forwards]">
          <h1 className="text-5xl font-extrabold tracking-[0.3em] text-gold opacity-0 translate-y-8 animate-[fadeUp_0.8s_ease-out_0.5s_forwards]">
            AYIK ŞOFÖR
          </h1>
          <div className="h-[2px] w-24 bg-gradient-to-r from-transparent via-yellow-500 to-transparent mx-auto mt-4 opacity-0 animate-[scaleIn_1s_ease-out_1s_forwards]"></div>
          <p className="mt-4 text-yellow-500/60 font-medium tracking-[0.4em] text-[10px] uppercase opacity-0 animate-[fadeIn_1s_ease-out_1.5s_forwards]">
            Executive Concierge Service
          </p>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes fadeUp {
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from { transform: scaleX(0); opacity: 0; }
          to { transform: scaleX(1); opacity: 1; }
        }
        @keyframes bounceIn {
          0% { transform: scale(0.3); opacity: 0; }
          50% { transform: scale(1.05); opacity: 1; }
          70% { transform: scale(0.9); }
          100% { transform: scale(1); }
        }
        @keyframes zoomOutFade {
          0% { transform: scale(1); opacity: 1; }
          100% { transform: scale(0.7); opacity: 0; }
        }
      `}} />
    </div>
  );
};

export default SplashScreen;
