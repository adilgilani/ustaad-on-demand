import { motion } from 'framer-motion';
import type { Issue } from '@/data/issues';

interface IssueCardProps {
  issue: Issue;
  selected?: boolean;
  onClick: () => void;
  index: number;
  fullWidth?: boolean;
}

const IssueCard = ({ issue, selected, onClick, index, fullWidth }: IssueCardProps) => {
  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04, duration: 0.3 }}
      whileTap={{ scale: 0.96 }}
      onClick={onClick}
      className={`flex flex-col items-center justify-center gap-2 p-4 rounded-xl border-2 transition-all bg-card shadow-sm ${
        fullWidth ? 'col-span-2' : ''
      } ${
        selected
          ? 'border-primary shadow-md scale-[1.03]'
          : 'border-transparent hover:border-primary/30'
      }`}
    >
      <span className="text-3xl">{issue.emoji}</span>
      <span className="text-xs font-medium text-card-foreground text-center leading-tight">{issue.label}</span>
    </motion.button>
  );
};

export default IssueCard;
