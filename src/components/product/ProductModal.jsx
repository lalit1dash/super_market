import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, Star, Plus, Minus, ShoppingCart, Truck, Shield, RotateCcw } from 'lucide-react';
import useUIStore from '../../store/useUIStore';
import useCartStore from '../../store/useCartStore';
import useWishlistStore from '../../store/useWishlistStore';

export default function ProductModal() {
  const { isProductModalOpen, selectedProduct, closeProductModal, addToast } = useUIStore();
  const { addItem, getItemQuantity, incrementQuantity, decrementQuantity } = useCartStore();
  const { toggleWishlist, isInWishlist } = useWishlistStore();

  const product = selectedProduct;
  const quantity = product ? getItemQuantity(product.id) : 0;
  const inWishlist = product ? isInWishlist(product.id) : false;

  const handleAddToCart = () => {
    if (!product) return;
    addItem(product);
    addToast({ type: 'cart', message: `${product.name} added to cart` });
  };

  const handleWishlist = () => {
    if (!product) return;
    const added = toggleWishlist(product);
    addToast({
      type: added ? 'success' : 'info',
      message: added ? `${product.name} added to wishlist` : `Removed from wishlist`,
    });
  };

  return (
    <AnimatePresence>
      {isProductModalOpen && product && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] bg-black/50"
            onClick={closeProductModal}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            className="fixed inset-0 z-[70] m-auto flex h-fit max-h-[90vh] max-w-lg flex-col overflow-hidden rounded-3xl bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Image section */}
            <div className="relative">
              <img
                src={product.image}
                alt={product.name}
                className="h-64 w-full object-cover md:h-72"
              />

              {/* Overlay actions */}
              <div className="absolute right-3 top-3 flex gap-2">
                <button
                  onClick={handleWishlist}
                  className={`flex h-10 w-10 items-center justify-center rounded-xl shadow-lg transition-all ${
                    inWishlist
                      ? 'bg-red-500 text-white'
                      : 'glass text-gray-600 hover:text-red-500'
                  }`}
                >
                  <Heart size={18} fill={inWishlist ? 'currentColor' : 'none'} />
                </button>
                <button
                  onClick={closeProductModal}
                  className="glass flex h-10 w-10 items-center justify-center rounded-xl shadow-lg transition-colors hover:bg-gray-100"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Tags */}
              <div className="absolute bottom-3 left-3 flex gap-2">
                {product.discount > 0 && (
                  <span className="rounded-lg bg-red-500 px-2.5 py-1 text-xs font-bold text-white shadow-lg">
                    {product.discount}% OFF
                  </span>
                )}
                {product.isOrganic && (
                  <span className="rounded-lg bg-primary-500 px-2.5 py-1 text-xs font-bold text-white shadow-lg">
                    🌿 Organic
                  </span>
                )}
                {product.isBestseller && (
                  <span className="rounded-lg bg-amber-500 px-2.5 py-1 text-xs font-bold text-white shadow-lg">
                    ⭐ Bestseller
                  </span>
                )}
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-5">
              <div className="mb-1 text-xs font-medium uppercase tracking-wider text-primary-600">
                {product.brand}
              </div>
              <h2 className="mb-2 text-xl font-bold text-charcoal">{product.name}</h2>

              <div className="mb-3 flex items-center gap-3">
                <div className="flex items-center gap-1 rounded-lg bg-amber-50 px-2 py-0.5">
                  <Star size={13} className="fill-amber-400 text-amber-400" />
                  <span className="text-xs font-semibold text-amber-700">{product.rating}</span>
                </div>
                <span className="text-xs text-gray-400">({product.reviewCount} reviews)</span>
                <span className="text-xs text-gray-400">·</span>
                <span className="text-xs text-gray-400">{product.weight}</span>
              </div>

              {/* Price */}
              <div className="mb-4 flex items-baseline gap-2">
                <span className="text-2xl font-bold text-charcoal">₹{product.price}</span>
                {product.originalPrice > product.price && (
                  <>
                    <span className="text-base text-gray-400 line-through">₹{product.originalPrice}</span>
                    <span className="rounded-lg bg-primary-50 px-2 py-0.5 text-xs font-bold text-primary-600">
                      Save ₹{product.originalPrice - product.price}
                    </span>
                  </>
                )}
              </div>

              {/* Description */}
              <p className="mb-5 text-sm leading-relaxed text-gray-500">{product.description}</p>

              {/* Trust badges */}
              <div className="flex gap-4 rounded-2xl bg-gray-50 p-3">
                <div className="flex flex-1 items-center gap-2">
                  <Truck size={16} className="text-primary-500" />
                  <span className="text-xs text-gray-500">Free delivery</span>
                </div>
                <div className="flex flex-1 items-center gap-2">
                  <Shield size={16} className="text-primary-500" />
                  <span className="text-xs text-gray-500">Quality assured</span>
                </div>
                <div className="flex flex-1 items-center gap-2">
                  <RotateCcw size={16} className="text-primary-500" />
                  <span className="text-xs text-gray-500">Easy returns</span>
                </div>
              </div>
            </div>

            {/* Bottom action bar */}
            <div className="border-t border-gray-100 p-4">
              {quantity === 0 ? (
                <button
                  onClick={handleAddToCart}
                  className="flex w-full items-center justify-center gap-2 rounded-2xl bg-primary-500 py-3.5 text-sm font-bold text-white shadow-lg shadow-primary-500/25 transition-all hover:bg-primary-600 hover:shadow-xl hover:shadow-primary-500/30 active:scale-[0.98]"
                >
                  <ShoppingCart size={18} />
                  Add to Cart — ₹{product.price}
                </button>
              ) : (
                <div className="flex items-center justify-between rounded-2xl bg-primary-50 px-5 py-2">
                  <button
                    onClick={() => decrementQuantity(product.id)}
                    className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-primary-600 shadow-sm transition-all hover:shadow-md"
                  >
                    <Minus size={16} />
                  </button>
                  <div className="text-center">
                    <span className="text-lg font-bold text-primary-600">{quantity}</span>
                    <p className="text-xs text-primary-600/60">in cart</p>
                  </div>
                  <button
                    onClick={() => incrementQuantity(product.id)}
                    className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-500 text-white shadow-sm transition-all hover:bg-primary-600 hover:shadow-md"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
