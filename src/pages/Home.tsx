import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import VehicleToggle from '@/components/VehicleToggle';
import IssueCard from '@/components/IssueCard';
import { mainIssues } from '@/data/issues';

const Home = () => {
  const [vehicle, setVehicle] = useState<'bike' | 'car'>('car');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const navigate = useNavigate();

  const filtered = mainIssues.filter((i) => i.vehicles.includes(vehicle));

  const handleSelect = (id: string) => {
    if (id === 'other') {
      navigate('/other-issues', { state: { vehicle } });
      return;
    }
    setSelectedId(id);
    setTimeout(() => {
      navigate('/location', { state: { vehicle, issue: id } });
    }, 200);
  };

  return (
    <div className="phone-frame pb-20">
      {/* Header */}
      <div className="flex items-center justify-between px-4 pt-4 pb-1">
        <div>
          <h1 className="text-2xl font-heading font-bold text-foreground tracking-tight">Ustaad</h1>
          <p className="text-xs font-body text-muted-foreground mt-0.5">Ustaad Pelug Shaat Hai!</p>
        </div>
        <button className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
          <User size={20} className="text-muted-foreground" />
        </button>
      </div>

      <VehicleToggle vehicle={vehicle} onChange={setVehicle} />

      {/* Issue Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={vehicle}
          initial={{ opacity: 0, x: vehicle === 'car' ? 30 : -30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: vehicle === 'car' ? -30 : 30 }}
          transition={{ duration: 0.25 }}
          className="grid grid-cols-2 gap-3 px-4"
        >
          {filtered.map((issue, i) => (
            <IssueCard
              key={issue.id}
              issue={issue}
              selected={selectedId === issue.id}
              onClick={() => handleSelect(issue.id)}
              index={i}
            />
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Home;
