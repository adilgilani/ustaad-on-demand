import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import IssueCard from '@/components/IssueCard';
import { otherIssues } from '@/data/issues';

const OtherIssues = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const vehicle = (location.state as any)?.vehicle || 'car';
  const [manualText, setManualText] = useState('');
  const [showInput, setShowInput] = useState(false);

  const filtered = otherIssues.filter((i) => i.vehicles.includes(vehicle));

  const handleSelect = (id: string) => {
    navigate('/location', { state: { vehicle, issue: id } });
  };

  return (
    <div className="phone-frame pb-20">
      <div className="flex items-center gap-3 px-4 pt-4 pb-4">
        <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-xl font-heading font-bold">Select Your Issue</h1>
      </div>

      <div className="grid grid-cols-2 gap-3 px-4">
        {filtered.map((issue, i) => (
          <IssueCard
            key={issue.id}
            issue={issue}
            onClick={() => handleSelect(issue.id)}
            index={i}
          />
        ))}
      </div>

      {/* Write Manually */}
      <div className="px-4 mt-3">
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          onClick={() => setShowInput(!showInput)}
          className="w-full flex flex-col items-center gap-2 p-4 rounded-xl border-2 border-transparent bg-card shadow-sm hover:border-primary/30"
        >
          <span className="text-3xl">✍️</span>
          <span className="text-xs font-medium text-card-foreground">Write Manually</span>
        </motion.button>

        {showInput && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="mt-3">
            <textarea
              value={manualText}
              onChange={(e) => setManualText(e.target.value)}
              placeholder="Describe your issue..."
              className="w-full p-3 rounded-xl border border-input bg-card text-sm font-body resize-none h-24 focus:ring-2 focus:ring-primary focus:outline-none"
            />
            <button
              onClick={() => manualText.trim() && navigate('/location', { state: { vehicle, issue: 'manual', description: manualText } })}
              className="w-full mt-2 py-3 rounded-xl bg-primary text-primary-foreground font-heading font-semibold"
            >
              Continue
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default OtherIssues;
