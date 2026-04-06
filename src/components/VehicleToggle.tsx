import { motion } from 'framer-motion';

interface VehicleToggleProps {
  vehicle: 'bike' | 'car';
  onChange: (v: 'bike' | 'car') => void;
}

const VehicleToggle = ({ vehicle, onChange }: VehicleToggleProps) => {
  return (
    <div className="flex justify-center my-4">
      <div className="relative flex items-center bg-muted rounded-full p-1 gap-0 shadow-inner">
        <motion.div
          className="absolute top-1 bottom-1 rounded-full bg-primary shadow-lg"
          initial={false}
          animate={{ x: vehicle === 'bike' ? 0 : '100%' }}
          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
          style={{ width: 'calc(50% - 4px)' }}
        />
        {(['bike', 'car'] as const).map((v) => (
          <button
            key={v}
            onClick={() => onChange(v)}
            className="relative z-10 flex items-center gap-2 px-6 py-2.5 text-sm font-heading font-semibold transition-colors"
          >
            <motion.span
              animate={{ scale: vehicle === v ? 1.2 : 1 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              className="text-lg"
            >
              {v === 'bike' ? '🏍️' : '🚗'}
            </motion.span>
            <span className={vehicle === v ? 'text-primary-foreground' : 'text-muted-foreground'}>
              {v === 'bike' ? 'Bike' : 'Car'}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default VehicleToggle;
