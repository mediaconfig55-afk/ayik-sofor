import React, { useState, useEffect, useCallback } from 'react';
// Capacitor App plugin'ini içe aktarıyoruz
import { App as CapacitorApp } from '@capacitor/app';
import SplashScreen from './components/SplashScreen';
import MainScreen from './components/MainScreen';
import RequestForm from './components/RequestForm';
import PriceList from './components/PriceList';
import ContactModal from './components/ContactModal';
import QRCodeModal from './components/QRCodeModal';
import LocationRequiredShield from './components/LocationRequiredShield';
import { AppStage, LocationState } from './types';

import { useEffect } from 'react';
import { App } from '@capacitor/app';

const CURRENT_VERSION = "1.0.0"; // Mevcut uygulamanın sürümü
const VERSION_URL = "https://raw.githubusercontent.com/mediaconfig55-afk/ayik-sofor/main/version.json";

function AppUpdateChecker() {
  useEffect(() => {
    const checkUpdates = async () => {
      try {
        const response = await fetch(VERSION_URL);
        const data = await response.json();

        if (data.version !== CURRENT_VERSION) {
          const confirmUpdate = window.confirm(
            `Yeni bir sürüm mevcut (${data.version})! Şimdi indirmek ister misiniz?\n\nNotlar: ${data.notes}`
          );

          if (confirmUpdate) {
            // Kullanıcıyı APK indirme linkine yönlendir
            window.location.href = data.url;
          }
        }
      } catch (error) {
        console.error("Güncelleme kontrolü başarısız:", error);
      }
    };

    checkUpdates();
  }, []);

  return null;
}

const App: React.FC = () => {
  const [stage, setStage] = useState<AppStage>(AppStage.SPLASH);
  
  const [location, setLocation] = useState<LocationState>({
    latitude: null,
    longitude: null,
    error: null,
    loading: true
  });

  const requestLocation = useCallback(() => {
    setLocation(prev => ({ ...prev, loading: true, error: null }));
    
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            error: null,
            loading: false
          });
        },
        (error) => {
          let errorMessage = "Konum izni reddedildi.";
          if (error.code === error.PERMISSION_DENIED) {
            errorMessage = "Konum izni zorunludur. Lütfen ayarlardan izin verin.";
          } else if (error.code === error.POSITION_UNAVAILABLE) {
            errorMessage = "Konum bilgisi şu an alınamıyor.";
          } else if (error.code === error.TIMEOUT) {
            errorMessage = "Konum alma isteği zaman aşımına uğradı.";
          }
          setLocation(prev => ({ ...prev, error: errorMessage, loading: false }));
        },
        { enableHighAccuracy: true, timeout: 10000 }
      );
    } else {
      setLocation(prev => ({ ...prev, error: "Cihazınız konum özelliğini desteklemiyor.", loading: false }));
    }
  }, []);

  // --- GERİ TUŞU YÖNETİMİ ---
  useEffect(() => {
    const backButtonListener = CapacitorApp.addListener('backButton', () => {
      // Eğer Splash ekranında değilsek ve ana sayfada değilsek, ana sayfaya dön
      if (stage !== AppStage.SPLASH && stage !== AppStage.MAIN) {
        setStage(AppStage.MAIN);
      } else if (stage === AppStage.MAIN) {
        // Eğer zaten ana sayfadaysak uygulamadan çık
        CapacitorApp.exitApp();
      }
    });

    return () => {
      backButtonListener.then(l => l.remove());
    };
  }, [stage]); // stage her değiştiğinde listener güncel durumu bilmeli
  // --------------------------

  useEffect(() => {
    const timer = setTimeout(() => {
      setStage(AppStage.MAIN);
    }, 3500);

    requestLocation();

    return () => clearTimeout(timer);
  }, [requestLocation]);

  const handleOpenForm = () => {
    if (location.error || location.loading || !location.latitude) {
      return;
    }
    setStage(AppStage.FORM);
  };

  const handleBackToMain = () => setStage(AppStage.MAIN);
  const handleOpenPrices = () => setStage(AppStage.PRICES);
  const handleOpenContact = () => {
    if (location.error || location.loading || !location.latitude) {
      return;
    }
    setStage(AppStage.CONTACT);
  };
  const handleOpenQR = () => setStage(AppStage.QR);

  const isLocationBlocked = location.error !== null;

  return (
    <div className="h-screen w-full relative overflow-hidden bg-[#050505] text-white">
      {stage === AppStage.SPLASH && <SplashScreen />}
      
      {stage === AppStage.MAIN && (
        <>
          <MainScreen 
            onOpenForm={handleOpenForm} 
            onOpenPrices={handleOpenPrices}
            onOpenContact={handleOpenContact}
            onOpenQR={handleOpenQR}
            location={location} 
          />
          {isLocationBlocked && <LocationRequiredShield error={location.error!} onRetry={requestLocation} />}
        </>
      )}

      {stage === AppStage.FORM && (
        <RequestForm 
          onClose={handleBackToMain} 
          location={location}
        />
      )}

      {stage === AppStage.PRICES && (
        <PriceList
          onClose={handleBackToMain}
        />
      )}

      {stage === AppStage.CONTACT && (
        <ContactModal
          onClose={handleBackToMain}
        />
      )}

      {stage === AppStage.QR && (
        <QRCodeModal
          onClose={handleBackToMain}
        />
      )}
    </div>
  );
};

export default App;