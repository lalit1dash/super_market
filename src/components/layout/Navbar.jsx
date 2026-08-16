import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, ShoppingCart, Heart, User, Menu, X, MapPin, ChevronDown
} from 'lucide-react';
import useCartStore from '../../store/useCartStore';
import useUIStore from '../../store/useUIStore';
import useScrollPosition from '../../hooks/useScrollPosition';
import { categories } from '../../data/categories';

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { isScrolled } = useScrollPosition();
  const { openCart, openSearch, isMobileMenuOpen, openMobileMenu, closeMobileMenu } = useUIStore();
  const items = useCartStore((s) => s.items);
  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
  const [showCategories, setShowCategories] = useState(false);
  const catRef = useRef(null);
  const isOffersActive = location.pathname === '/products' && new URLSearchParams(location.search).get('filter') === 'offers';

  useEffect(() => {
    closeMobileMenu();
  }, [location.pathname, closeMobileMenu]);

  useEffect(() => {
    const handler = (e) => {
      if (catRef.current && !catRef.current.contains(e.target)) setShowCategories(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Products', path: '/products' },
    { label: 'Offers', path: '/products?filter=offers' },
  ];

  return (
    <>
      {/* Top announcement bar */}
      <div className="bg-charcoal text-center text-xs font-medium text-white py-2 px-4">
        🚚 Free delivery on orders above ₹499 &nbsp;|&nbsp; ⚡ Express delivery in 30 mins
      </div>

      {/* Main navbar */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'glass shadow-lg shadow-black/5'
            : 'bg-white'
        }`}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 lg:px-6">
          {/* Left: Logo + Mobile menu */}
          <div className="flex items-center gap-3">
            <button
              onClick={isMobileMenuOpen ? closeMobileMenu : openMobileMenu}
              className="rounded-xl p-2 text-charcoal transition-colors hover:bg-gray-100 lg:hidden"
              id="mobile-menu-btn"
            >
              {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>

            <Link to="/" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 text-white shadow-md shadow-primary-500/30">
                <span className="text-lg">🛒</span>
              </div>
              <span className="font-display text-xl font-bold text-charcoal">
                Fresh<span className="text-primary-500">Mart</span>
              </span>
            </Link>
          </div>

          {/* Center: Nav links (desktop) */}
          <nav className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => {
              const isActive = link.label === 'Offers'
                ? isOffersActive
                : location.pathname === link.path;

              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`rounded-xl px-4 py-2 text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-primary-50 text-primary-600'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-charcoal'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}

            {/* Categories dropdown */}
            <div className="relative" ref={catRef}>
              <button
                onClick={() => setShowCategories(!showCategories)}
                className="flex items-center gap-1 rounded-xl px-4 py-2 text-sm font-medium text-gray-600 transition-all hover:bg-gray-50 hover:text-charcoal"
              >
                Categories <ChevronDown size={14} className={`transition-transform ${showCategories ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {showCategories && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.96 }}
                    transition={{ duration: 0.2 }}
                    className="glass absolute left-0 top-full mt-2 w-72 overflow-hidden rounded-2xl p-2 shadow-xl shadow-black/10"
                  >
                    {categories.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => {
                          navigate(`/products/${cat.id}`);
                          setShowCategories(false);
                        }}
                        className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors hover:bg-gray-50"
                      >
                        <span className="text-xl">{cat.icon}</span>
                        <div>
                          <p className="text-sm font-medium text-charcoal">{cat.name}</p>
                          <p className="text-xs text-gray-400">{cat.productCount} products</p>
                        </div>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </nav>

          {/* Right: Actions */}
          <div className="flex items-center gap-1">
            {/* Location (desktop) */}
            <button className="hidden items-center gap-1 rounded-xl px-3 py-2 text-sm text-gray-500 transition-colors hover:bg-gray-50 md:flex">
              <MapPin size={15} className="text-primary-500" />
              <span className="max-w-24 truncate">Noida</span>
            </button>

            <button
              onClick={openSearch}
              className="rounded-xl p-2.5 text-gray-600 transition-colors hover:bg-gray-100"
              id="search-btn"
            >
              <Search size={20} />
            </button>

            <Link
              to="/wishlist"
              className="hidden rounded-xl p-2.5 text-gray-600 transition-colors hover:bg-gray-100 md:block"
              id="wishlist-btn"
            >
              <Heart size={20} />
            </Link>

            <Link
              to="/profile"
              className="hidden rounded-xl p-2.5 text-gray-600 transition-colors hover:bg-gray-100 md:block"
              id="profile-btn"
            >
              <User size={20} />
            </Link>

            {/* Cart button */}
            <button
              onClick={openCart}
              className="relative ml-1 flex items-center gap-2 rounded-xl bg-primary-500 px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-primary-500/25 transition-all hover:bg-primary-600 hover:shadow-lg hover:shadow-primary-500/30 active:scale-95"
              id="cart-btn"
            >
              <ShoppingCart size={18} />
              <span className="hidden sm:inline">Cart</span>
              {totalItems > 0 && (
                <motion.span
                  key={totalItems}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="flex h-5 min-w-5 items-center justify-center rounded-full bg-white px-1 text-xs font-bold text-primary-600"
                >
                  {totalItems}
                </motion.span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/40"
              onClick={closeMobileMenu}
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed bottom-0 left-0 top-0 z-50 w-80 overflow-y-auto bg-white shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-gray-100 p-4">
                <Link to="/" className="flex items-center gap-2" onClick={closeMobileMenu}>
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 text-white">
                    <span className="text-lg">🛒</span>
                  </div>
                  <span className="font-display text-xl font-bold text-charcoal">
                    Fresh<span className="text-primary-500">Mart</span>
                  </span>
                </Link>
                <button
                  onClick={closeMobileMenu}
                  className="rounded-xl p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-charcoal"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="p-4">
                <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-400">Menu</p>
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`mb-1 flex items-center rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
                      location.pathname === link.path
                        ? 'bg-primary-50 text-primary-600'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>

              <div className="border-t border-gray-100 p-4">
                <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-400">Categories</p>
                <div className="grid grid-cols-2 gap-2">
                  {categories.slice(0, 8).map((cat) => (
                    <Link
                      key={cat.id}
                      to={`/products/${cat.id}`}
                      className="flex flex-col items-center gap-1 rounded-xl border border-gray-100 p-3 text-center transition-colors hover:bg-gray-50"
                    >
                      <span className="text-2xl">{cat.icon}</span>
                      <span className="text-xs font-medium text-gray-600">{cat.shortName}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
