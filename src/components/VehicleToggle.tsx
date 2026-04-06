import { motion } from 'framer-motion';

interface VehicleToggleProps {
  vehicle: 'bike' | 'car';
  onChange: (v: 'bike' | 'car') => void;
}

const VehicleToggle = ({ vehicle, onChange }: VehicleToggleProps) => {
  return (
    <div className="flex justify-center my-3">
      <div className="relative flex items-center bg-muted rounded-full p-0.5 gap-0 shadow-inner">
        <motion.div
          className="absolute top-0.5 bottom-0.5 rounded-full bg-primary shadow-lg"
          initial={false}
          animate={{ x: vehicle === 'bike' ? 0 : '100%' }}
          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
          style={{ width: 'calc(50% - 2px)' }}
        />
        {(['bike', 'car'] as const).map((v) => (
          <button
            key={v}
            onClick={() => onChange(v)}
            className="relative z-10 flex items-center gap-1.5 px-5 py-1.5 text-sm font-heading font-semibold transition-colors"
          >
            <motion.span
              animate={{ scale: vehicle === v ? 1.15 : 1 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              className="text-base"
            >
              {v === 'bike' ? '🏍️' : '🚗'}
            </motion.span>
            <span className={`text-xs ${vehicle === v ? 'text-primary-foreground' : 'text-muted-foreground'}`}>
              {v === 'bike' ? 'Bike' : 'Car'}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default VehicleToggle;
