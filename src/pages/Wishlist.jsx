import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Trash2, Plus, Minus, ShoppingCart, ArrowRight } from 'lucide-react';
import useWishlistStore from '../store/useWishlistStore';
import useCartStore from '../store/useCartStore';
import useUIStore from '../store/useUIStore';

export default function Wishlist() {
  const { items, removeFromWishlist, clearWishlist } = useWishlistStore();
  const { addItem, getItemQuantity, incrementQuantity, decrementQuantity } = useCartStore();
  const { addToast, openProductModal } = useUIStore();

  const handleAddToCart = (product) => {
    addItem(product);
    addToast({ type: 'cart', message: `${product.name} added to cart` });
  };

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-xl px-4 py-20 text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', bounce: 0.5 }}
          className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-3xl bg-red-50 text-5xl"
        >
          ❤️
        </motion.div>
        <h2 className="text-xl font-bold text-charcoal">Your wishlist is empty</h2>
        <p className="mt-2 text-sm text-gray-400">
          Save your favourite items here to buy them later
        </p>
        <Link
          to="/products"
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary-500 px-6 py-3 text-sm font-bold text-white shadow-md shadow-primary-500/25 transition-all hover:bg-primary-600"
        >
          Explore Products <ArrowRight size={14} />
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-charcoal">My Wishlist</h1>
          <p className="text-sm text-gray-400">{items.length} item{items.length !== 1 ? 's' : ''} saved</p>
        </div>
        <button
          onClick={clearWishlist}
          className="rounded-xl border border-gray-200 px-4 py-2 text-xs font-medium text-gray-500 transition-colors hover:border-red-200 hover:bg-red-50 hover:text-red-500"
        >
          Clear All
        </button>
      </div>

      <motion.div layout className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence>
          {items.map((product) => {
            const qty = getItemQuantity(product.id);
            return (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-shadow hover:shadow-lg"
              >
                <div
                  className="relative h-44 cursor-pointer overflow-hidden bg-gray-50"
                  onClick={() => openProductModal(product)}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  {product.discount > 0 && (
                    <span className="absolute left-2 top-2 rounded-lg bg-red-500 px-2 py-0.5 text-xs font-bold text-white">
                      {product.discount}% OFF
                    </span>
                  )}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeFromWishlist(product.id);
                      addToast({ type: 'info', message: 'Removed from wishlist' });
                    }}
                    className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-xl bg-white/90 text-red-500 shadow-sm backdrop-blur-sm transition-all hover:bg-red-500 hover:text-white"
                  >
                    <Heart size={14} fill="currentColor" />
                  </button>
                </div>

                <div className="p-4">
                  <p className="mb-0.5 text-[10px] font-medium uppercase tracking-wider text-gray-400">{product.brand}</p>
                  <h3 className="mb-1 text-sm font-semibold text-charcoal line-clamp-1">{product.name}</h3>
                  <p className="mb-3 text-xs text-gray-400">{product.weight}</p>

                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-base font-bold text-charcoal">₹{product.price}</span>
                      {product.originalPrice > product.price && (
                        <span className="ml-1 text-xs text-gray-400 line-through">₹{product.originalPrice}</span>
                      )}
                    </div>
                    {qty === 0 ? (
                      <button
                        onClick={() => handleAddToCart(product)}
                        className="flex items-center gap-1 rounded-xl bg-primary-500 px-3 py-2 text-xs font-semibold text-white shadow-md shadow-primary-500/25 transition-all hover:bg-primary-600"
                      >
                        <ShoppingCart size={13} /> Add
                      </button>
                    ) : (
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => decrementQuantity(product.id)}
                          className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-50 text-primary-600 transition-colors hover:bg-primary-100"
                        >
                          <Minus size={13} />
                        </button>
                        <span className="w-6 text-center text-sm font-bold text-primary-600">{qty}</span>
                        <button
                          onClick={() => incrementQuantity(product.id)}
                          className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-500 text-white transition-colors hover:bg-primary-600"
                        >
                          <Plus size={13} />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
