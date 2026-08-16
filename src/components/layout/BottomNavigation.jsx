import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, Search, Grid3x3, Heart, User } from 'lucide-react';
import useUIStore from '../../store/useUIStore';

const tabs = [
  { icon: Home, label: 'Home', path: '/' },
  { icon: Search, label: 'Search', path: null, action: 'search' },
  { icon: Grid3x3, label: 'Categories', path: '/products' },
  { icon: Heart, label: 'Wishlist', path: '/wishlist' },
  { icon: User, label: 'Account', path: '/profile' },
];

export default function BottomNavigation() {
  const location = useLocation();
  const { openSearch } = useUIStore();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 glass border-t border-gray-200/50 md:hidden" id="bottom-nav">
      <div className="flex items-center justify-around py-1.5">
        {tabs.map((tab) => {
          const isActive = tab.path && location.pathname === tab.path;
          const Icon = tab.icon;

          if (tab.action === 'search') {
            return (
              <button
                key={tab.label}
                onClick={openSearch}
                className="flex flex-col items-center gap-0.5 px-3 py-1.5 text-gray-400 transition-colors"
              >
                <Icon size={20} />
                <span className="text-[10px] font-medium">{tab.label}</span>
              </button>
            );
          }

          return (
            <Link
              key={tab.label}
              to={tab.path}
              className={`relative flex flex-col items-center gap-0.5 px-3 py-1.5 transition-colors ${
                isActive ? 'text-primary-600' : 'text-gray-400'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="bottomNavIndicator"
                  className="absolute -top-1.5 h-0.5 w-6 rounded-full bg-primary-500"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
              <Icon size={20} />
              <span className="text-[10px] font-medium">{tab.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
