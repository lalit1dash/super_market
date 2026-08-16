import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  User, MapPin, Package, Heart, LogOut, ChevronRight,
  Phone, Mail, Edit3
} from 'lucide-react';
import { mockUser } from '../data/mockUser';

const statusColors = {
  delivered: 'bg-green-50 text-green-600',
  preparing: 'bg-amber-50 text-amber-600',
  shipped: 'bg-blue-50 text-blue-600',
  cancelled: 'bg-red-50 text-red-600',
};

export default function Profile() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      {/* Profile header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 overflow-hidden rounded-3xl bg-gradient-to-br from-primary-500 to-primary-600 p-6 text-white shadow-xl shadow-primary-500/20 md:p-8"
      >
        <div className="flex items-center gap-5">
          <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-white/20 text-3xl font-bold backdrop-blur-sm">
            {mockUser.avatar}
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold">{mockUser.name}</h1>
            <div className="mt-2 flex flex-wrap gap-4 text-sm text-white/80">
              <span className="flex items-center gap-1"><Mail size={14} /> {mockUser.email}</span>
              <span className="flex items-center gap-1"><Phone size={14} /> {mockUser.phone}</span>
            </div>
          </div>
          <button className="hidden rounded-xl bg-white/15 p-2.5 backdrop-blur-sm transition-colors hover:bg-white/25 md:block">
            <Edit3 size={18} />
          </button>
        </div>
      </motion.div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Quick links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm"
        >
          <h2 className="mb-4 text-sm font-bold uppercase tracking-wider text-gray-400">Quick Links</h2>
          <div className="space-y-1">
            {[
              { icon: Package, label: 'My Orders', path: '/order-tracking', color: 'text-blue-600 bg-blue-50' },
              { icon: Heart, label: 'Wishlist', path: '/wishlist', color: 'text-red-500 bg-red-50' },
              { icon: MapPin, label: 'Saved Addresses', path: '#', color: 'text-amber-600 bg-amber-50' },
            ].map((item) => (
              <Link
                key={item.label}
                to={item.path}
                className="flex items-center gap-3 rounded-xl px-3 py-3 transition-colors hover:bg-gray-50"
              >
                <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${item.color}`}>
                  <item.icon size={18} />
                </div>
                <span className="flex-1 text-sm font-medium text-charcoal">{item.label}</span>
                <ChevronRight size={16} className="text-gray-300" />
              </Link>
            ))}
          </div>
        </motion.div>

        {/* Addresses */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm"
        >
          <h2 className="mb-4 text-sm font-bold uppercase tracking-wider text-gray-400">Saved Addresses</h2>
          <div className="space-y-3">
            {mockUser.addresses.map((addr) => (
              <div
                key={addr.id}
                className="rounded-xl border border-gray-100 p-3 transition-colors hover:border-gray-200"
              >
                <div className="flex items-start justify-between">
                  <span className={`rounded-md px-2 py-0.5 text-xs font-semibold ${
                    addr.type === 'Home' ? 'bg-blue-50 text-blue-600' : 'bg-orange-50 text-orange-600'
                  }`}>
                    {addr.type} {addr.isDefault && '(Default)'}
                  </span>
                </div>
                <p className="mt-2 text-sm text-gray-600">{addr.address}</p>
                <p className="text-sm text-gray-500">{addr.city}, {addr.state} - {addr.pincode}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Recent orders */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-6 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm"
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-sm font-bold uppercase tracking-wider text-gray-400">Recent Orders</h2>
          <Link to="/order-tracking" className="text-xs font-semibold text-primary-600 hover:underline">
            View All
          </Link>
        </div>
        <div className="space-y-3">
          {mockUser.orders.map((order) => (
            <Link
              key={order.id}
              to={`/order-tracking/${order.id}`}
              className="flex items-center gap-4 rounded-xl border border-gray-100 p-4 transition-colors hover:border-gray-200 hover:shadow-sm"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-50 text-xl">
                📦
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-semibold text-charcoal">{order.id}</p>
                  <span className={`rounded-md px-2 py-0.5 text-[10px] font-semibold capitalize ${statusColors[order.status]}`}>
                    {order.status}
                  </span>
                </div>
                <p className="text-xs text-gray-400">{order.items} items · ₹{order.total}</p>
              </div>
              <ChevronRight size={16} className="text-gray-300" />
            </Link>
          ))}
        </div>
      </motion.div>

      {/* Logout */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mt-6 text-center"
      >
        <button className="flex w-full items-center justify-center gap-2 rounded-2xl border border-red-100 py-3 text-sm font-medium text-red-500 transition-colors hover:bg-red-50">
          <LogOut size={16} /> Sign Out
        </button>
      </motion.div>
    </div>
  );
}
