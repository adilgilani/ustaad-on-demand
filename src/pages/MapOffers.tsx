import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Star, MapPin, Clock, Banknote } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { mechanics } from '@/data/issues';
import mechanicAli from '@/assets/mechanic-ali.jpg';
import mechanicUsman from '@/assets/mechanic-usman.jpg';
import mechanicMehmood from '@/assets/mechanic-mehmood.jpg';

const avatarMap: Record<string, string> = {
  '1': mechanicAli,
  '2': mechanicUsman,
  '3': mechanicMehmood,
};

const MapOffers = () => {
  const navigate = useNavigate();
  const loc = useLocation();
  const state = loc.state as any;
  const isPetrol = state?.isPetrol;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(t);
  }, []);

  const handleAccept = (mechanic: typeof mechanics[0]) => {
    navigate('/tracking', { state: { ...state, mechanic } });
  };

  return (
    <div className="phone-frame pb-20 flex flex-col h-screen">
      <div className="flex items-center gap-3 px-4 pt-4 pb-2">
        <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-lg font-heading font-bold">
          {loading ? 'Finding Ustaads near you…' : '3 Ustaads Found Near You'}
        </h1>
      </div>

      {/* Map */}
      <div className="relative flex-1 min-h-[250px] mx-4 rounded-2xl overflow-hidden border border-border">
        <iframe
          src="https://www.openstreetmap.org/export/embed.html?bbox=73.03%2C33.64%2C73.09%2C33.70&layer=mapnik&marker=33.67%2C73.06"
          className="w-full h-full"
          title="Map"
        />
        {/* User pulse dot */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="w-4 h-4 bg-primary rounded-full relative">
            <div className="absolute inset-0 bg-primary rounded-full animate-pulse-ring" />
          </div>
          <p className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[9px] font-heading font-bold text-primary whitespace-nowrap bg-card/80 px-1.5 py-0.5 rounded">You are here</p>
        </div>

        {/* Mechanic pins on map */}
        <div className="absolute top-[30%] left-[35%]">
          <img src={mechanicAli} alt="Ali" className="w-8 h-8 rounded-full border-2 border-primary shadow-lg" />
        </div>
        <div className="absolute top-[25%] right-[25%]">
          <img src={mechanicUsman} alt="Usman" className="w-8 h-8 rounded-full border-2 border-primary shadow-lg" />
        </div>
        <div className="absolute bottom-[30%] left-[25%]">
          <img src={mechanicMehmood} alt="Mehmood" className="w-8 h-8 rounded-full border-2 border-primary shadow-lg" />
        </div>

        {loading && (
          <div className="absolute inset-0 bg-card/60 flex flex-col items-center justify-center gap-3">
            <div className="flex -space-x-2">
              <img src={mechanicAli} alt="" className="w-10 h-10 rounded-full border-2 border-card" />
              <img src={mechanicUsman} alt="" className="w-10 h-10 rounded-full border-2 border-card" />
              <img src={mechanicMehmood} alt="" className="w-10 h-10 rounded-full border-2 border-card" />
            </div>
            <motion.p
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="text-sm font-heading font-semibold text-foreground"
            >
              Contacting nearby mechanics…
            </motion.p>
          </div>
        )}
      </div>

      {/* Bottom sheet */}
      <AnimatePresence>
        {!loading && (
          <motion.div
            initial={{ y: 300, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="px-4 pt-4 pb-4 space-y-3"
          >
            {mechanics.map((m, i) => {
              const totalFee = isPetrol ? 382 + m.fee : m.fee;
              return (
                <motion.div
                  key={m.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.15 }}
                  className="p-4 rounded-xl bg-card border border-border shadow-sm"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <img src={avatarMap[m.id]} alt={m.name} className="w-10 h-10 rounded-full object-cover" />
                      <div>
                        <p className="font-heading font-bold text-sm">{m.name}</p>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Star size={12} className="text-primary fill-primary" /> {m.rating}
                        </div>
                      </div>
                    </div>
                    {m.badge && (
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                        m.badge === 'Nearest' ? 'bg-success/15 text-success' : 'bg-primary/15 text-primary'
                      }`}>
                        {m.badge === 'Nearest' ? '🟢' : '🔵'} {m.badge}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                    <span className="flex items-center gap-1"><MapPin size={12} /> {m.distance} km</span>
                    <span className="flex items-center gap-1"><Clock size={12} /> ~{m.eta} min</span>
                    <span className="flex items-center gap-1"><Banknote size={12} /> Rs. {totalFee}</span>
                  </div>
                  {isPetrol && (
                    <p className="text-[10px] text-muted-foreground mb-2">Rs. 382 petrol + Rs. {m.fee} service</p>
                  )}
                  <button
                    onClick={() => handleAccept(m)}
                    className="w-full py-2.5 rounded-lg bg-primary text-primary-foreground font-heading font-semibold text-sm"
                  >
                    Accept Offer
                  </button>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MapOffers;
