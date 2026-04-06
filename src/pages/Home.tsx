import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import VehicleToggle from '@/components/VehicleToggle';
import IssueCard from '@/components/IssueCard';
import { mainIssues } from '@/data/issues';
import ustaadLogo from '@/assets/ustaad-logo.png';

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
        <div className="flex items-center gap-2.5">
          <img src={ustaadLogo} alt="Ustaad" width={36} height={36} className="rounded-lg" />
          <div>
            <h1 className="text-xl font-heading font-bold text-foreground tracking-tight leading-none">Ustaad</h1>
            <p className="text-[10px] font-body text-muted-foreground mt-0.5">Ustaad Pelug Shaat Hai!</p>
          </div>
        </div>
        <button className="w-9 h-9 rounded-full bg-muted flex items-center justify-center">
          <User size={18} className="text-muted-foreground" />
        </button>
      </div>

      {/* Hero text */}
      <div className="px-4 mt-3 mb-1">
        <p className="text-sm font-body text-muted-foreground">Stuck on the road? Help is coming.</p>
        <h2 className="text-lg font-heading font-bold text-foreground mt-0.5">What happened?</h2>
      </div>

      <VehicleToggle vehicle={vehicle} onChange={setVehicle} />

      {/* Issue Grid — 3 columns */}
      <AnimatePresence mode="wait">
        <motion.div
          key={vehicle}
          initial={{ opacity: 0, x: vehicle === 'car' ? 30 : -30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: vehicle === 'car' ? -30 : 30 }}
          transition={{ duration: 0.25 }}
          className="grid grid-cols-3 gap-2.5 px-4"
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
