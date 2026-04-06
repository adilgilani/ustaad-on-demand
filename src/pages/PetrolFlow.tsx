import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Fuel, Banknote, Wrench } from 'lucide-react';
import { motion } from 'framer-motion';

const PetrolFlow = () => {
  const navigate = useNavigate();
  const loc = useLocation();
  const state = loc.state as any;

  return (
    <div className="phone-frame pb-20">
      <div className="flex items-center gap-3 px-4 pt-4 pb-2">
        <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-xl font-heading font-bold">Petrol Delivery</h1>
      </div>

      <div className="px-4 mt-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-5 rounded-2xl bg-card border border-border shadow-sm space-y-4"
        >
          <div className="flex items-center gap-3">
            <Fuel size={24} className="text-primary" />
            <p className="text-sm font-body font-medium">1 Litre of Petrol will be sent to you</p>
          </div>
          <div className="flex items-center gap-3">
            <Banknote size={24} className="text-primary" />
            <p className="text-sm font-body font-medium">Petrol Cost: <span className="font-bold">Rs. 382</span> <span className="text-xs text-muted-foreground">(fixed govt rate)</span></p>
          </div>
          <div className="flex items-center gap-3">
            <Wrench size={24} className="text-primary" />
            <p className="text-sm font-body font-medium">Mechanic Service Fee: shown per offer</p>
          </div>
          <p className="text-xs text-muted-foreground">Enough to reach the nearest petrol pump</p>
        </motion.div>

        <button
          onClick={() => navigate('/map-offers', { state: { ...state, isPetrol: true } })}
          className="w-full mt-6 py-4 rounded-xl bg-primary text-primary-foreground font-heading font-bold text-base"
        >
          Find Petrol Helper Near Me
        </button>
      </div>
    </div>
  );
};

export default PetrolFlow;
