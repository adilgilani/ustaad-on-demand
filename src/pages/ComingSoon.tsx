import { useLocation } from 'react-router-dom';
import { Construction } from 'lucide-react';

const labels: Record<string, string> = {
  '/requests': 'My Requests',
  '/nearby': 'Nearby',
  '/profile': 'Profile',
};

const ComingSoon = () => {
  const { pathname } = useLocation();
  return (
    <div className="phone-frame flex flex-col items-center justify-center min-h-[70vh] pb-20">
      <Construction size={48} className="text-primary mb-4" />
      <h1 className="text-xl font-heading font-bold">{labels[pathname] || 'Page'}</h1>
      <p className="text-sm text-muted-foreground font-body mt-1">Coming Soon</p>
    </div>
  );
};

export default ComingSoon;
