import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle, AlertCircle, Info, X, ShoppingCart } from 'lucide-react';
import useUIStore from '../../store/useUIStore';

const iconMap = {
  success: CheckCircle,
  error: AlertCircle,
  info: Info,
  cart: ShoppingCart,
};

const colorMap = {
  success: 'bg-primary-500',
  error: 'bg-red-500',
  info: 'bg-blue-500',
  cart: 'bg-primary-500',
};

export default function Toast() {
  const { toasts, removeToast } = useUIStore();

  return (
    <div className="fixed bottom-20 right-4 z-[9999] flex flex-col gap-2 md:bottom-6">
      <AnimatePresence>
        {toasts.map((toast) => {
          const Icon = iconMap[toast.type] || Info;
          const bgColor = colorMap[toast.type] || 'bg-gray-700';

          return (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, x: 100, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 100, scale: 0.9 }}
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              className="glass flex items-center gap-3 rounded-2xl px-4 py-3 shadow-xl"
              style={{ minWidth: 280 }}
            >
              <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${bgColor} text-white`}>
                <Icon size={18} />
              </div>
              <p className="flex-1 text-sm font-medium text-charcoal">{toast.message}</p>
              <button
                onClick={() => removeToast(toast.id)}
                className="shrink-0 rounded-lg p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
              >
                <X size={16} />
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
