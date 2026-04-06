import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Phone, MessageCircle, X, Star, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

const steps = ['Confirmed', 'On the Way', 'Arrived'];

const Tracking = () => {
  const navigate = useNavigate();
  const loc = useLocation();
  const state = loc.state as any;
  const mechanic = state?.mechanic;
  const [eta, setEta] = useState(mechanic?.eta * 60 || 480);
  const [step, setStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setEta((prev: number) => {
        if (prev <= 0) { clearInterval(interval); return 0; }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (eta <= 0) setStep(2);
    else if (eta < (mechanic?.eta * 60 || 480) * 0.5) setStep(1);
    else setStep(0);
  }, [eta, mechanic]);

  const mins = Math.floor(eta / 60);
  const secs = eta % 60;

  return (
    <div className="phone-frame pb-20">
      <div className="flex flex-col items-center pt-8 px-4">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
          <CheckCircle2 size={72} className="text-success" />
        </motion.div>
        <h1 className="text-xl font-heading font-bold mt-4">Ustaad is on the way!</h1>

        {/* Mechanic info */}
        <div className="flex items-center gap-3 mt-4">
          <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center text-xl">🔧</div>
          <div>
            <p className="font-heading font-bold text-sm">{mechanic?.name || 'Ali Karigar'}</p>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Star size={12} className="text-primary fill-primary" /> {mechanic?.rating || 4.8}
            </div>
          </div>
        </div>

        {/* ETA */}
        <div className="mt-6 text-center">
          <p className="text-4xl font-heading font-bold text-primary">
            {mins}:{secs.toString().padStart(2, '0')}
          </p>
          <p className="text-xs text-muted-foreground mt-1">Estimated arrival</p>
        </div>

        {/* Map */}
        <div className="w-full mt-4 rounded-2xl overflow-hidden border border-border h-44">
          <iframe
            src="https://www.openstreetmap.org/export/embed.html?bbox=73.04%2C33.65%2C73.08%2C33.69&layer=mapnik&marker=33.67%2C73.06"
            className="w-full h-full"
            title="Tracking map"
          />
        </div>

        {/* Status steps */}
        <div className="flex items-center gap-2 mt-4 w-full">
          {steps.map((s, i) => (
            <div key={s} className="flex-1 text-center">
              <div className={`h-1.5 rounded-full ${i <= step ? 'bg-primary' : 'bg-muted'}`} />
              <p className={`text-[10px] mt-1 font-medium ${i <= step ? 'text-primary' : 'text-muted-foreground'}`}>{s}</p>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="flex gap-3 w-full mt-6">
          <button className="flex-1 py-3 rounded-xl bg-primary text-primary-foreground font-heading font-semibold text-sm flex items-center justify-center gap-2">
            <Phone size={16} /> Call Ustaad
          </button>
          <button
            onClick={() => navigate('/chat', { state })}
            className="flex-1 py-3 rounded-xl bg-card border border-border font-heading font-semibold text-sm flex items-center justify-center gap-2"
          >
            <MessageCircle size={16} /> Chat
          </button>
        </div>

        <button className="mt-3 py-2 text-xs text-destructive flex items-center gap-1">
          <X size={14} /> Cancel Request
        </button>
      </div>
    </div>
  );
};

export default Tracking;
