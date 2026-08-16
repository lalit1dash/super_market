import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MapPin, Clock, CreditCard, Check, ArrowRight, ArrowLeft,
  Truck, ShoppingBag, ChevronRight
} from 'lucide-react';
import useCartStore from '../store/useCartStore';
import useCheckoutStore from '../store/useCheckoutStore';
import { mockUser, deliverySlots, paymentMethods } from '../data/mockUser';

const stepLabels = ['Cart', 'Address', 'Delivery', 'Payment', 'Done'];
const stepIcons = [ShoppingBag, MapPin, Truck, CreditCard, Check];

function StepIndicator({ currentStep }) {
  return (
    <div className="mb-8 flex items-center justify-center gap-0">
      {stepLabels.map((label, i) => {
        const Icon = stepIcons[i];
        const isActive = i === currentStep;
        const isCompleted = i < currentStep;

        return (
          <div key={label} className="flex items-center">
            <div className="flex flex-col items-center">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-xl text-sm font-bold transition-all ${
                  isCompleted
                    ? 'bg-primary-500 text-white shadow-md shadow-primary-500/25'
                    : isActive
                    ? 'bg-primary-500 text-white shadow-md shadow-primary-500/25 scale-110'
                    : 'bg-gray-100 text-gray-400'
                }`}
              >
                {isCompleted ? <Check size={16} /> : <Icon size={16} />}
              </div>
              <span className={`mt-1.5 text-[10px] font-medium ${isActive ? 'text-primary-600' : 'text-gray-400'}`}>
                {label}
              </span>
            </div>
            {i < stepLabels.length - 1 && (
              <div className={`mx-1 mb-5 h-0.5 w-6 rounded-full md:w-12 ${i < currentStep ? 'bg-primary-500' : 'bg-gray-200'}`} />
            )}
          </div>
        );
      })}
    </div>
  );
}

function CartReview() {
  const { items, removeItem, incrementQuantity, decrementQuantity } = useCartStore();
  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const savings = items.reduce((sum, i) => sum + (i.originalPrice - i.price) * i.quantity, 0);
  const deliveryFee = subtotal >= 499 ? 0 : 49;
  const total = subtotal + deliveryFee;

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-bold text-charcoal">Review Your Cart</h2>
      <div className="space-y-3">
        {items.map((item) => (
          <div key={item.id} className="flex items-center gap-3 rounded-2xl bg-gray-50 p-3">
            <img src={item.image} alt={item.name} className="h-16 w-16 rounded-xl object-cover" />
            <div className="flex-1">
              <h4 className="text-sm font-semibold text-charcoal">{item.name}</h4>
              <p className="text-xs text-gray-400">{item.weight}</p>
              <p className="text-sm font-bold text-charcoal">₹{item.price} × {item.quantity}</p>
            </div>
            <p className="text-sm font-bold text-charcoal">₹{item.price * item.quantity}</p>
          </div>
        ))}
      </div>

      <div className="rounded-2xl bg-gray-50 p-4">
        <div className="space-y-2 text-sm">
          <div className="flex justify-between text-gray-500">
            <span>Subtotal</span><span>₹{subtotal}</span>
          </div>
          {savings > 0 && (
            <div className="flex justify-between text-primary-600">
              <span>Savings</span><span>-₹{savings}</span>
            </div>
          )}
          <div className="flex justify-between text-gray-500">
            <span>Delivery</span>
            <span>{deliveryFee === 0 ? <span className="font-medium text-primary-600">FREE</span> : `₹${deliveryFee}`}</span>
          </div>
          <div className="flex justify-between border-t border-dashed border-gray-200 pt-2 text-base font-bold text-charcoal">
            <span>Total</span><span>₹{total}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function AddressStep() {
  const { selectedAddress, setSelectedAddress } = useCheckoutStore();

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-bold text-charcoal">Select Delivery Address</h2>
      <div className="space-y-3">
        {mockUser.addresses.map((addr) => (
          <button
            key={addr.id}
            onClick={() => setSelectedAddress(addr)}
            className={`w-full rounded-2xl border-2 p-4 text-left transition-all ${
              selectedAddress?.id === addr.id
                ? 'border-primary-500 bg-primary-50/50 shadow-md shadow-primary-500/10'
                : 'border-gray-100 bg-white hover:border-gray-200 hover:shadow-sm'
            }`}
          >
            <div className="flex items-start justify-between">
              <div>
                <span className={`inline-block rounded-lg px-2 py-0.5 text-xs font-semibold ${
                  addr.type === 'Home' ? 'bg-blue-50 text-blue-600' : 'bg-orange-50 text-orange-600'
                }`}>
                  {addr.type}
                </span>
                <p className="mt-2 text-sm font-semibold text-charcoal">{addr.name}</p>
                <p className="mt-0.5 text-sm text-gray-500">{addr.address}</p>
                <p className="text-sm text-gray-500">{addr.city}, {addr.state} - {addr.pincode}</p>
                <p className="mt-1 text-xs text-gray-400">{addr.phone}</p>
              </div>
              <div className={`flex h-6 w-6 items-center justify-center rounded-full border-2 ${
                selectedAddress?.id === addr.id ? 'border-primary-500 bg-primary-500' : 'border-gray-300'
              }`}>
                {selectedAddress?.id === addr.id && <Check size={12} className="text-white" />}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

function DeliveryStep() {
  const { selectedDeliverySlot, setSelectedDeliverySlot } = useCheckoutStore();

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-bold text-charcoal">Choose Delivery Slot</h2>
      <div className="space-y-3">
        {deliverySlots.map((slot) => (
          <button
            key={slot.id}
            onClick={() => setSelectedDeliverySlot(slot)}
            className={`flex w-full items-center gap-4 rounded-2xl border-2 p-4 text-left transition-all ${
              selectedDeliverySlot?.id === slot.id
                ? 'border-primary-500 bg-primary-50/50 shadow-md shadow-primary-500/10'
                : 'border-gray-100 bg-white hover:border-gray-200 hover:shadow-sm'
            }`}
          >
            <span className="text-2xl">{slot.icon}</span>
            <div className="flex-1">
              <p className="text-sm font-semibold text-charcoal">{slot.label}</p>
              <p className="text-xs text-gray-400">{slot.time}</p>
            </div>
            <span className={`text-sm font-bold ${slot.price === 0 ? 'text-primary-600' : 'text-charcoal'}`}>
              {slot.price === 0 ? 'FREE' : `₹${slot.price}`}
            </span>
            <div className={`flex h-6 w-6 items-center justify-center rounded-full border-2 ${
              selectedDeliverySlot?.id === slot.id ? 'border-primary-500 bg-primary-500' : 'border-gray-300'
            }`}>
              {selectedDeliverySlot?.id === slot.id && <Check size={12} className="text-white" />}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

function PaymentStep() {
  const { selectedPaymentMethod, setSelectedPaymentMethod } = useCheckoutStore();

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-bold text-charcoal">Payment Method</h2>
      <div className="space-y-3">
        {paymentMethods.map((method) => (
          <button
            key={method.id}
            onClick={() => setSelectedPaymentMethod(method)}
            className={`flex w-full items-center gap-4 rounded-2xl border-2 p-4 text-left transition-all ${
              selectedPaymentMethod?.id === method.id
                ? 'border-primary-500 bg-primary-50/50 shadow-md shadow-primary-500/10'
                : 'border-gray-100 bg-white hover:border-gray-200 hover:shadow-sm'
            }`}
          >
            <span className="text-2xl">{method.icon}</span>
            <div className="flex-1">
              <p className="text-sm font-semibold text-charcoal">{method.name}</p>
              <p className="text-xs text-gray-400">{method.description}</p>
            </div>
            <div className={`flex h-6 w-6 items-center justify-center rounded-full border-2 ${
              selectedPaymentMethod?.id === method.id ? 'border-primary-500 bg-primary-500' : 'border-gray-300'
            }`}>
              {selectedPaymentMethod?.id === method.id && <Check size={12} className="text-white" />}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

function OrderSuccess({ orderNumber }) {
  const { clearCart } = useCartStore();

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="py-10 text-center"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', bounce: 0.5, delay: 0.2 }}
        className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-3xl bg-primary-100"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.4, type: 'spring', bounce: 0.6 }}
        >
          <Check size={48} className="text-primary-600" />
        </motion.div>
      </motion.div>

      <h2 className="mb-2 font-display text-2xl font-extrabold text-charcoal">Order Placed! 🎉</h2>
      <p className="mb-1 text-sm text-gray-500">Your order has been placed successfully</p>
      <p className="mb-6 text-sm text-gray-400">
        Order ID: <span className="font-bold text-primary-600">{orderNumber}</span>
      </p>

      <div className="mx-auto mb-8 max-w-sm rounded-2xl bg-primary-50 p-4">
        <div className="flex items-center gap-3">
          <Truck size={20} className="text-primary-600" />
          <div className="text-left">
            <p className="text-sm font-semibold text-charcoal">Estimated Delivery</p>
            <p className="text-xs text-gray-500">Tomorrow, 9 AM - 12 PM</p>
          </div>
        </div>
      </div>

      <div className="flex justify-center gap-3">
        <Link
          to={`/order-tracking/${orderNumber}`}
          className="flex items-center gap-2 rounded-xl bg-primary-500 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-primary-500/25 transition-all hover:bg-primary-600"
        >
          Track Order <ArrowRight size={14} />
        </Link>
        <Link
          to="/"
          className="rounded-xl border border-gray-200 px-6 py-3 text-sm font-semibold text-gray-600 transition-colors hover:bg-gray-50"
        >
          Continue Shopping
        </Link>
      </div>
    </motion.div>
  );
}

export default function Checkout() {
  const navigate = useNavigate();
  const { items } = useCartStore();
  const {
    step, nextStep, prevStep, placeOrder, orderNumber,
    selectedAddress, selectedDeliverySlot, selectedPaymentMethod
  } = useCheckoutStore();

  if (items.length === 0 && step < 4) {
    return (
      <div className="mx-auto max-w-xl px-4 py-20 text-center">
        <p className="text-5xl">🛒</p>
        <h2 className="mt-4 text-xl font-bold text-charcoal">Your cart is empty</h2>
        <p className="mt-2 text-sm text-gray-400">Add some items to proceed to checkout</p>
        <Link
          to="/products"
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary-500 px-6 py-3 text-sm font-bold text-white shadow-md shadow-primary-500/25"
        >
          Browse Products <ArrowRight size={14} />
        </Link>
      </div>
    );
  }

  const canProceed = () => {
    switch (step) {
      case 0: return items.length > 0;
      case 1: return !!selectedAddress;
      case 2: return !!selectedDeliverySlot;
      case 3: return !!selectedPaymentMethod;
      default: return false;
    }
  };

  const handleNext = () => {
    if (step === 3) {
      placeOrder();
    } else {
      nextStep();
    }
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <StepIndicator currentStep={step} />

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          {step === 0 && <CartReview />}
          {step === 1 && <AddressStep />}
          {step === 2 && <DeliveryStep />}
          {step === 3 && <PaymentStep />}
          {step === 4 && <OrderSuccess orderNumber={orderNumber} />}
        </motion.div>
      </AnimatePresence>

      {/* Navigation buttons */}
      {step < 4 && (
        <div className="mt-8 flex items-center justify-between">
          {step > 0 ? (
            <button
              onClick={prevStep}
              className="flex items-center gap-2 rounded-xl border border-gray-200 px-5 py-2.5 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50"
            >
              <ArrowLeft size={14} /> Back
            </button>
          ) : (
            <div />
          )}

          <button
            onClick={handleNext}
            disabled={!canProceed()}
            className={`flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-bold shadow-lg transition-all ${
              canProceed()
                ? 'bg-primary-500 text-white shadow-primary-500/25 hover:bg-primary-600 hover:shadow-xl hover:shadow-primary-500/30 active:scale-[0.98]'
                : 'cursor-not-allowed bg-gray-200 text-gray-400 shadow-none'
            }`}
          >
            {step === 3 ? 'Place Order' : 'Continue'} <ArrowRight size={14} />
          </button>
        </div>
      )}
    </div>
  );
}
