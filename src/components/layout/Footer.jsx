import { Link } from 'react-router-dom';
import { categories } from '../../data/categories';

export default function Footer() {
  return (
    <footer className="bg-charcoal pb-24 text-white md:pb-8">
      {/* Wave top */}
      <div className="bg-[#fafafa]">
        <svg viewBox="0 0 1440 60" fill="none" className="w-full">
          <path d="M0 60V20C360 50 720 0 1080 30C1260 45 1380 35 1440 20V60H0Z" fill="#1a1a2e" />
        </svg>
      </div>

      <div className="mx-auto max-w-7xl px-4 pt-8 lg:px-6">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <Link to="/" className="mb-4 flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 text-white shadow-lg shadow-primary-500/25">
                <span className="text-xl">🛒</span>
              </div>
              <span className="font-display text-2xl font-bold">
                Fresh<span className="text-primary-400">Mart</span>
              </span>
            </Link>
            <p className="mb-6 text-sm leading-relaxed text-gray-400">
              Your trusted partner for fresh groceries delivered to your doorstep. Quality assured, always fresh.
            </p>
            <div className="flex gap-3">
              {['📘', '📸', '🐦', '📺'].map((icon, i) => (
                <button
                  key={i}
                  className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-lg transition-colors hover:bg-white/10"
                >
                  {icon}
                </button>
              ))}
            </div>
          </div>

          {/* Categories */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-400">Categories</h3>
            <ul className="space-y-2.5">
              {categories.slice(0, 6).map((cat) => (
                <li key={cat.id}>
                  <Link
                    to={`/products/${cat.id}`}
                    className="flex items-center gap-2 text-sm text-gray-300 transition-colors hover:text-primary-400"
                  >
                    <span className="text-sm">{cat.icon}</span>
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-400">Quick Links</h3>
            <ul className="space-y-2.5">
              {[
                { label: 'My Orders', path: '/order-tracking' },
                { label: 'My Wishlist', path: '/wishlist' },
                { label: 'My Profile', path: '/profile' },
                { label: 'All Products', path: '/products' },
              ].map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className="text-sm text-gray-300 transition-colors hover:text-primary-400"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-400">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm text-gray-300">
                <span>📍</span>
                <span>42, Green Park Colony, Noida, UP 201301</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-gray-300">
                <span>📞</span>
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-gray-300">
                <span>✉️</span>
                <span>support@freshmart.in</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-gray-300">
                <span>⏰</span>
                <span>Open 24/7</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 md:flex-row">
          <p className="text-xs text-gray-500">&copy; 2026 FreshMart. All rights reserved.</p>
          <div className="flex gap-6 text-xs text-gray-500">
            <a href="#" className="transition-colors hover:text-gray-300">Privacy Policy</a>
            <a href="#" className="transition-colors hover:text-gray-300">Terms of Service</a>
            <a href="#" className="transition-colors hover:text-gray-300">Refund Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
