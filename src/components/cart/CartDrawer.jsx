import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, Trash2, ShoppingBag, ArrowRight, Truck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import useCartStore from '../../store/useCartStore';
import useUIStore from '../../store/useUIStore';

export default function CartDrawer() {
  const navigate = useNavigate();
  const { isCartOpen, closeCart } = useUIStore();
  const {
    items,
    removeItem,
    incrementQuantity,
    decrementQuantity,
  } = useCartStore();

  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
  const savings = items.reduce((sum, i) => sum + (i.originalPrice - i.price) * i.quantity, 0);
  const deliveryFee = subtotal >= 499 ? 0 : 49;
  const total = subtotal + deliveryFee;
  const freeDeliveryProgress = Math.min((subtotal / 499) * 100, 100);
  const amountToFree = Math.max(499 - subtotal, 0);

  const handleCheckout = () => {
    closeCart();
    navigate('/checkout');
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/40"
            onClick={closeCart}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed bottom-0 right-0 top-0 z-50 flex w-full max-w-md flex-col bg-white shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-50 text-primary-600">
                  <ShoppingBag size={20} />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-charcoal">Your Cart</h2>
                  <p className="text-xs text-gray-400">{totalItems} item{totalItems !== 1 ? 's' : ''}</p>
                </div>
              </div>
              <button
                onClick={closeCart}
                className="rounded-xl p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-charcoal"
              >
                <X size={20} />
              </button>
            </div>

            {items.length === 0 ? (
              /* Empty cart */
              <div className="flex flex-1 flex-col items-center justify-center gap-4 p-8">
                <div className="flex h-24 w-24 items-center justify-center rounded-3xl bg-gray-50 text-5xl">
                  🛒
                </div>
                <h3 className="text-lg font-semibold text-charcoal">Your cart is empty</h3>
                <p className="text-center text-sm text-gray-400">
                  Looks like you haven't added anything yet.
                  Start shopping to fill it up!
                </p>
                <button
                  onClick={() => { closeCart(); navigate('/products'); }}
                  className="flex items-center gap-2 rounded-xl bg-primary-500 px-6 py-3 text-sm font-semibold text-white shadow-md shadow-primary-500/25 transition-all hover:bg-primary-600"
                >
                  Start Shopping <ArrowRight size={16} />
                </button>
              </div>
            ) : (
              <>
                {/* Free delivery progress */}
                <div className="border-b border-gray-100 px-5 py-3">
                  {amountToFree > 0 ? (
                    <div className="flex items-center gap-2 text-xs">
                      <Truck size={14} className="text-primary-500" />
                      <span className="text-gray-500">
                        Add <span className="font-bold text-primary-600">₹{amountToFree}</span> more for free delivery
                      </span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-xs font-medium text-primary-600">
                      <Truck size={14} />
                      Yay! You get FREE delivery 🎉
                    </div>
                  )}
                  <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-gray-100">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-primary-400 to-primary-600"
                      initial={{ width: 0 }}
                      animate={{ width: `${freeDeliveryProgress}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                </div>

                {/* Items list */}
                <div className="flex-1 overflow-y-auto p-5">
                  <div className="space-y-4">
                    {items.map((item) => (
                      <motion.div
                        key={item.id}
                        layout
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: 100 }}
                        className="flex gap-3 rounded-2xl bg-gray-50 p-3"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-20 w-20 rounded-xl object-cover"
                        />
                        <div className="flex flex-1 flex-col justify-between">
                          <div>
                            <h4 className="text-sm font-semibold text-charcoal line-clamp-1">{item.name}</h4>
                            <p className="text-xs text-gray-400">{item.weight}</p>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1">
                              <span className="text-sm font-bold text-charcoal">₹{item.price}</span>
                              <span className="text-xs text-gray-400 line-through">₹{item.originalPrice}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <button
                                onClick={() => decrementQuantity(item.id)}
                                className="flex h-7 w-7 items-center justify-center rounded-lg bg-white text-gray-500 shadow-sm transition-colors hover:bg-primary-50 hover:text-primary-600"
                              >
                                {item.quantity === 1 ? <Trash2 size={13} className="text-red-400" /> : <Minus size={13} />}
                              </button>
                              <span className="w-6 text-center text-sm font-semibold">{item.quantity}</span>
                              <button
                                onClick={() => incrementQuantity(item.id)}
                                className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary-500 text-white shadow-sm transition-colors hover:bg-primary-600"
                              >
                                <Plus size={13} />
                              </button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Footer / Summary */}
                <div className="border-t border-gray-100 bg-gray-50/50 p-5">
                  <div className="mb-4 space-y-2 text-sm">
                    <div className="flex justify-between text-gray-500">
                      <span>Subtotal</span>
                      <span>₹{subtotal}</span>
                    </div>
                    {savings > 0 && (
                      <div className="flex justify-between text-primary-600">
                        <span>You Save</span>
                        <span>-₹{savings}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-gray-500">
                      <span>Delivery Fee</span>
                      <span>{deliveryFee === 0 ? <span className="font-medium text-primary-600">FREE</span> : `₹${deliveryFee}`}</span>
                    </div>
                    <div className="flex justify-between border-t border-dashed border-gray-200 pt-2 text-base font-bold text-charcoal">
                      <span>Total</span>
                      <span>₹{total}</span>
                    </div>
                  </div>

                  <button
                    onClick={handleCheckout}
                    className="flex w-full items-center justify-center gap-2 rounded-2xl bg-primary-500 py-3.5 text-sm font-bold text-white shadow-lg shadow-primary-500/25 transition-all hover:bg-primary-600 hover:shadow-xl hover:shadow-primary-500/30 active:scale-[0.98]"
                    id="checkout-btn"
                  >
                    Proceed to Checkout <ArrowRight size={16} />
                  </button>
                </div>
              </>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
