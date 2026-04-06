import { Home, ClipboardList, MapPin, User } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const tabs = [
  { icon: Home, label: 'Home', path: '/' },
  { icon: ClipboardList, label: 'My Requests', path: '/requests' },
  { icon: MapPin, label: 'Nearby', path: '/nearby' },
  { icon: User, label: 'Profile', path: '/profile' },
];

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-card border-t border-border z-50">
      <div className="flex justify-around py-2">
        {tabs.map(({ icon: Icon, label, path }) => {
          const active = path === '/' ? location.pathname === '/' : location.pathname.startsWith(path);
          return (
            <button
              key={path}
              onClick={() => navigate(path)}
              className={`flex flex-col items-center gap-0.5 px-3 py-1.5 text-xs font-medium transition-colors ${
                active ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              <Icon size={22} strokeWidth={active ? 2.5 : 1.8} />
              <span>{label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
