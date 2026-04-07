import { useEffect, useState } from 'react';
import ustaadLogo from '@/assets/ustaad-logo.png';

interface SplashScreenProps {
  onDone: () => void;
}

const SplashScreen = ({ onDone }: SplashScreenProps) => {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Start fade-out after 2 seconds
    const fadeTimer = setTimeout(() => setFadeOut(true), 2000);
    // Unmount after fade completes (600 ms transition)
    const doneTimer = setTimeout(() => onDone(), 2600);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(doneTimer);
    };
  }, [onDone]);

  return (
    <div
      className="splash-screen"
      style={{ opacity: fadeOut ? 0 : 1, transition: 'opacity 0.6s ease' }}
    >
      <div className="splash-content">
        <img src={ustaadLogo} alt="Ustaad" className="splash-logo" />
        <h1 className="splash-title">Ustaad</h1>
        <p className="splash-tagline">Ustaad Pelug Shaat Hai!</p>
      </div>
    </div>
  );
};

export default SplashScreen;
