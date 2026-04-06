import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, MapPin, Edit3, Loader2, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Location = () => {
  const navigate = useNavigate();
  const loc = useLocation();
  const state = loc.state as any;
  const [mode, setMode] = useState<'choose' | 'detecting' | 'detected' | 'manual'>('choose');
  const [address, setAddress] = useState('');

  const handleGPS = () => {
    setMode('detecting');
    setTimeout(() => {
      setAddress('Faizabad, Islamabad');
      setMode('detected');
    }, 1500);
  };

  const handleContinue = () => {
    const nextPath = state?.issue === 'petrol-ended' ? '/petrol-flow' : '/upload-photo';
    navigate(nextPath, { state: { ...state, address } });
  };

  return (
    <div className="phone-frame pb-20">
      <div className="flex items-center gap-3 px-4 pt-4 pb-2">
        <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
          <ArrowLeft size={20} />
        </button>
        <div>
          <h1 className="text-xl font-heading font-bold">Where are you right now?</h1>
          <p className="text-xs text-muted-foreground font-body">So we can find the nearest Ustaad for you</p>
        </div>
      </div>

      <div className="px-4 mt-4 space-y-3">
        {/* GPS Option */}
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={handleGPS}
          disabled={mode === 'detecting'}
          className={`w-full p-5 rounded-xl border-2 bg-card text-left flex items-start gap-4 transition-all ${
            mode === 'detected' ? 'border-primary' : 'border-transparent'
          }`}
        >
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
            {mode === 'detecting' ? (
              <Loader2 size={22} className="text-primary animate-spin" />
            ) : mode === 'detected' ? (
              <CheckCircle2 size={22} className="text-primary" />
            ) : (
              <MapPin size={22} className="text-primary" />
            )}
          </div>
          <div>
            <p className="font-heading font-semibold text-sm">📍 Use My Current Location</p>
            <p className="text-xs text-muted-foreground mt-0.5">Detect my GPS location automatically</p>
          </div>
        </motion.button>

        {/* Manual Option */}
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={() => setMode('manual')}
          className={`w-full p-5 rounded-xl border-2 bg-card text-left flex items-start gap-4 transition-all ${
            mode === 'manual' ? 'border-primary' : 'border-transparent'
          }`}
        >
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
            <Edit3 size={22} className="text-primary" />
          </div>
          <div className="flex-1">
            <p className="font-heading font-semibold text-sm">✏️ Enter Manually</p>
            <p className="text-xs text-muted-foreground mt-0.5">Type your address or landmark</p>
          </div>
        </motion.button>

        <AnimatePresence>
          {mode === 'manual' && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="e.g. Faizabad, Islamabad"
                className="w-full p-3 rounded-xl border border-input bg-card text-sm font-body focus:ring-2 focus:ring-primary focus:outline-none"
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Map preview */}
        {(mode === 'detected' || (mode === 'manual' && address)) && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="rounded-xl overflow-hidden border border-border h-40">
            <iframe
              src="https://www.openstreetmap.org/export/embed.html?bbox=73.04%2C33.65%2C73.08%2C33.69&layer=mapnik&marker=33.67%2C73.06"
              className="w-full h-full"
              title="Location map"
            />
          </motion.div>
        )}

        {(mode === 'detected' || (mode === 'manual' && address)) && (
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={handleContinue}
            className="w-full py-4 rounded-xl bg-primary text-primary-foreground font-heading font-bold text-base"
          >
            Find Ustaad Near Me
          </motion.button>
        )}
      </div>
    </div>
  );
};

export default Location;
