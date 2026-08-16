import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Package, Truck, CheckCircle, Clock, MapPin, ChevronRight,
  ArrowRight, Phone
} from 'lucide-react';
import { mockUser } from '../data/mockUser';

const statusSteps = [
  { key: 'placed', label: 'Order Placed', icon: Package, description: 'Your order has been confirmed' },
  { key: 'preparing', label: 'Preparing', icon: Clock, description: 'Your items are being packed' },
  { key: 'shipped', label: 'Out for Delivery', icon: Truck, description: 'Your order is on the way' },
  { key: 'delivered', label: 'Delivered', icon: CheckCircle, description: 'Enjoy your products!' },
];

function getStepIndex(status) {
  switch (status) {
    case 'placed': return 0;
    case 'preparing': return 1;
    case 'shipped': return 2;
    case 'delivered': return 3;
    default: return 1;
  }
}

function OrderDetail({ order }) {
  const currentStep = getStepIndex(order.status);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mx-auto max-w-2xl"
    >
      {/* Order header */}
      <div className="mb-6 rounded-2xl bg-gradient-to-r from-primary-500 to-emerald-500 p-6 text-white shadow-lg shadow-primary-500/20">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-white/70">Order ID</p>
            <p className="text-2xl font-bold">{order.id}</p>
          </div>
          <span className={`rounded-xl px-3 py-1.5 text-xs font-bold capitalize ${
            order.status === 'delivered'
              ? 'bg-white/20 text-white'
              : 'bg-white/20 text-white'
          }`}>
            {order.status}
          </span>
        </div>
        <div className="mt-4 flex gap-6 text-sm text-white/80">
          <span>Ordered: {new Date(order.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
          <span>{order.items} items</span>
          <span>₹{order.total}</span>
        </div>
      </div>

      {/* Tracking timeline */}
      <div className="mb-6 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        <h3 className="mb-6 text-sm font-bold uppercase tracking-wider text-gray-400">Order Status</h3>
        <div className="space-y-0">
          {statusSteps.map((step, i) => {
            const isCompleted = i <= currentStep;
            const isCurrent = i === currentStep;

            return (
              <div key={step.key} className="flex gap-4">
                {/* Vertical line + circle */}
                <div className="flex flex-col items-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: i * 0.15 }}
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                      isCompleted
                        ? 'bg-primary-500 text-white shadow-md shadow-primary-500/25'
                        : 'bg-gray-100 text-gray-400'
                    } ${isCurrent ? 'ring-4 ring-primary-100' : ''}`}
                  >
                    <step.icon size={18} />
                  </motion.div>
                  {i < statusSteps.length - 1 && (
                    <div className={`my-1 h-10 w-0.5 ${i < currentStep ? 'bg-primary-500' : 'bg-gray-200'}`} />
                  )}
                </div>

                {/* Content */}
                <div className="pb-6 pt-1">
                  <p className={`text-sm font-semibold ${isCompleted ? 'text-charcoal' : 'text-gray-400'}`}>
                    {step.label}
                  </p>
                  <p className="text-xs text-gray-400">{step.description}</p>
                  {isCurrent && order.status !== 'delivered' && (
                    <motion.span
                      animate={{ opacity: [1, 0.5, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="mt-1 inline-block text-xs font-medium text-primary-600"
                    >
                      In progress...
                    </motion.span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Delivery info */}
      <div className="mb-6 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
        <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-gray-400">Delivery Details</h3>
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-primary-600">
            <MapPin size={18} />
          </div>
          <div>
            <p className="text-sm font-semibold text-charcoal">{mockUser.addresses[0].type}</p>
            <p className="text-sm text-gray-500">{mockUser.addresses[0].address}</p>
            <p className="text-sm text-gray-500">
              {mockUser.addresses[0].city}, {mockUser.addresses[0].state} - {mockUser.addresses[0].pincode}
            </p>
          </div>
        </div>
        <div className="mt-4 flex items-center gap-3 rounded-xl bg-primary-50 p-3">
          <Truck size={16} className="text-primary-600" />
          <div>
            <p className="text-xs font-medium text-charcoal">Estimated Delivery</p>
            <p className="text-xs text-gray-500">
              {new Date(order.deliveryDate).toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'short' })}
            </p>
          </div>
        </div>
      </div>

      {/* Help */}
      <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <Phone size={18} />
            </div>
            <div>
              <p className="text-sm font-semibold text-charcoal">Need help?</p>
              <p className="text-xs text-gray-400">Contact support for any issues</p>
            </div>
          </div>
          <button className="rounded-xl bg-gray-50 px-4 py-2 text-xs font-semibold text-charcoal transition-colors hover:bg-gray-100">
            Contact Us
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default function OrderTracking() {
  const { orderId } = useParams();

  const selectedOrder = orderId
    ? mockUser.orders.find((o) => o.id === orderId)
    : null;

  if (selectedOrder) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-8">
        <Link
          to="/order-tracking"
          className="mb-4 inline-flex items-center gap-1 text-sm font-medium text-gray-400 transition-colors hover:text-primary-600"
        >
          ← All Orders
        </Link>
        <OrderDetail order={selectedOrder} />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <h1 className="mb-1 font-display text-2xl font-bold text-charcoal">My Orders</h1>
      <p className="mb-6 text-sm text-gray-400">{mockUser.orders.length} orders</p>

      <div className="space-y-4">
        {mockUser.orders.map((order, i) => {
          const currentStep = getStepIndex(order.status);
          return (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Link
                to={`/order-tracking/${order.id}`}
                className="flex items-center gap-4 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-all hover:border-gray-200 hover:shadow-md"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-50 text-2xl">
                  📦
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-bold text-charcoal">{order.id}</p>
                    <span className={`rounded-md px-2 py-0.5 text-[10px] font-semibold capitalize ${
                      order.status === 'delivered'
                        ? 'bg-green-50 text-green-600'
                        : order.status === 'preparing'
                        ? 'bg-amber-50 text-amber-600'
                        : 'bg-blue-50 text-blue-600'
                    }`}>
                      {order.status}
                    </span>
                  </div>
                  <p className="mt-0.5 text-xs text-gray-400">
                    {order.items} items · ₹{order.total} · {new Date(order.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                  </p>
                  {/* Mini progress bar */}
                  <div className="mt-2 flex gap-1">
                    {statusSteps.map((_, si) => (
                      <div
                        key={si}
                        className={`h-1 flex-1 rounded-full ${si <= currentStep ? 'bg-primary-500' : 'bg-gray-200'}`}
                      />
                    ))}
                  </div>
                </div>
                <ChevronRight size={18} className="text-gray-300" />
              </Link>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
