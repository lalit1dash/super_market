import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight, Star, Clock, Truck, Shield, ChevronLeft, ChevronRight,
  ShoppingCart, Heart, Leaf, Plus, Minus, Zap
} from 'lucide-react';
import { categories } from '../data/categories';
import { products } from '../data/products';
import { offers, testimonials, heroStats } from '../data/offers';
import useCartStore from '../store/useCartStore';
import useWishlistStore from '../store/useWishlistStore';
import useUIStore from '../store/useUIStore';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }
  })
};

function ProductCard({ product }) {
  const { addItem, getItemQuantity, incrementQuantity, decrementQuantity } = useCartStore();
  const { toggleWishlist, isInWishlist } = useWishlistStore();
  const { openProductModal, addToast } = useUIStore();
  const qty = getItemQuantity(product.id);
  const wishlisted = isInWishlist(product.id);

  const handleAdd = (e) => {
    e.stopPropagation();
    addItem(product);
    addToast({ type: 'cart', message: `${product.name} added to cart` });
  };

  const handleWishlist = (e) => {
    e.stopPropagation();
    const added = toggleWishlist(product);
    addToast({
      type: added ? 'success' : 'info',
      message: added ? 'Added to wishlist' : 'Removed from wishlist'
    });
  };

  return (
    <motion.div
      whileHover={{ y: -4 }}
      onClick={() => openProductModal(product)}
      className="group relative flex cursor-pointer flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-shadow hover:shadow-xl"
    >
      {/* Image */}
      <div className="relative h-44 overflow-hidden bg-gray-50">
        <img src={product.image} alt={product.name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
        {product.discount > 0 && (
          <span className="absolute left-2 top-2 rounded-lg bg-red-500 px-2 py-0.5 text-xs font-bold text-white">
            {product.discount}% OFF
          </span>
        )}
        {product.isOrganic && (
          <span className="absolute left-2 top-2 rounded-lg bg-primary-500 px-2 py-0.5 text-xs font-bold text-white" style={product.discount > 0 ? { top: 32 } : {}}>
            <Leaf size={10} className="mr-0.5 inline" /> Organic
          </span>
        )}
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleAdd(e);
          }}
          className="absolute bottom-2 right-2 flex items-center gap-1 rounded-xl bg-primary-500 px-2.5 py-1.5 text-[10px] font-bold text-white shadow-lg transition-all hover:bg-primary-600"
        >
          <Plus size={12} /> Add
        </button>
        <button
          onClick={handleWishlist}
          className={`absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-xl transition-all ${
            wishlisted ? 'bg-red-500 text-white' : 'bg-white/80 text-gray-500 hover:text-red-500 backdrop-blur-sm'
          }`}
        >
          <Heart size={14} fill={wishlisted ? 'currentColor' : 'none'} />
        </button>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-3">
        <p className="mb-0.5 text-[10px] font-medium uppercase tracking-wider text-gray-400">{product.brand}</p>
        <h3 className="mb-1 text-sm font-semibold text-charcoal line-clamp-1">{product.name}</h3>
        <p className="mb-2 text-xs text-gray-400">{product.weight}</p>

        <div className="mt-auto flex items-center justify-between">
          <div>
            <span className="text-base font-bold text-charcoal">₹{product.price}</span>
            {product.originalPrice > product.price && (
              <span className="ml-1 text-xs text-gray-400 line-through">₹{product.originalPrice}</span>
            )}
          </div>

          {qty === 0 ? (
            <button
              onClick={handleAdd}
              className="flex h-8 items-center gap-1 rounded-xl bg-primary-50 px-3 text-xs font-semibold text-primary-600 transition-all hover:bg-primary-500 hover:text-white"
            >
              <Plus size={13} /> Add
            </button>
          ) : (
            <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
              <button
                onClick={() => decrementQuantity(product.id)}
                className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary-50 text-primary-600 transition-colors hover:bg-primary-100"
              >
                <Minus size={13} />
              </button>
              <span className="w-5 text-center text-xs font-bold text-primary-600">{qty}</span>
              <button
                onClick={() => incrementQuantity(product.id)}
                className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary-500 text-white transition-colors hover:bg-primary-600"
              >
                <Plus size={13} />
              </button>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function Home() {
  const navigate = useNavigate();
  const [currentOffer, setCurrentOffer] = useState(0);

  const bestsellers = products.filter((p) => p.isBestseller).slice(0, 8);
  const freshPicks = products.filter((p) => p.category === 'fruits-vegetables').slice(0, 4);
  const dairyProducts = products.filter((p) => p.category === 'dairy').slice(0, 4);

  return (
    <div className="pb-8">
      {/* ========== HERO ========== */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-600 via-primary-500 to-emerald-400">
        <div className="absolute inset-0">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-white/5"
              style={{
                width: 100 + i * 60,
                height: 100 + i * 60,
                right: `${-5 + i * 12}%`,
                top: `${10 + i * 15}%`,
              }}
              animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
              transition={{ duration: 5 + i, repeat: Infinity, ease: 'easeInOut' }}
            />
          ))}
        </div>

        <div className="relative mx-auto flex max-w-7xl flex-col items-center gap-8 px-4 py-16 md:flex-row md:py-24 lg:px-6">
          <motion.div
            className="flex-1 text-center md:text-left"
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
          >
            <motion.div variants={fadeUp} className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-xs font-medium text-white backdrop-blur-sm">
              <Zap size={12} /> Delivery in 30 minutes
            </motion.div>
            <motion.h1 variants={fadeUp} className="font-display text-4xl font-extrabold leading-tight text-white md:text-5xl lg:text-6xl">
              Fresh Groceries,
              <br />
              <span className="text-yellow-300">Delivered Fast</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="mx-auto mt-4 max-w-lg text-base text-white/80 md:mx-0">
              Get fresh fruits, vegetables, dairy and more delivered to your doorstep in minutes. Best prices guaranteed.
            </motion.p>
            <motion.div variants={fadeUp} className="mt-6 flex flex-wrap justify-center gap-3 md:justify-start">
              <Link
                to="/products"
                className="flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-bold text-primary-600 shadow-xl shadow-primary-900/20 transition-all hover:shadow-2xl hover:shadow-primary-900/30 active:scale-95"
              >
                Shop Now <ArrowRight size={16} />
              </Link>
              <button
                onClick={() => document.getElementById('categories')?.scrollIntoView({ behavior: 'smooth' })}
                className="rounded-xl border-2 border-white/30 px-6 py-3 text-sm font-semibold text-white transition-all hover:border-white/60 hover:bg-white/10"
              >
                Browse Categories
              </button>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="relative hidden md:block"
          >
            <div className="relative h-80 w-80 lg:h-96 lg:w-96">
              <img
                src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&q=80"
                alt="Fresh groceries"
                className="h-full w-full rounded-3xl object-cover shadow-2xl"
              />
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -bottom-4 -left-4 glass rounded-2xl px-4 py-3 shadow-lg"
              >
                <p className="text-xs font-medium text-gray-500">Today's Deal</p>
                <p className="text-lg font-bold text-primary-600">Up to 50% OFF</p>
              </motion.div>
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 4, repeat: Infinity, delay: 1 }}
                className="absolute -right-4 top-8 glass rounded-2xl px-4 py-3 shadow-lg"
              >
                <div className="flex items-center gap-1">
                  <Star size={14} className="fill-amber-400 text-amber-400" />
                  <span className="font-bold text-charcoal">4.9</span>
                </div>
                <p className="text-xs text-gray-500">50k+ Reviews</p>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Stats */}
        <div className="relative border-t border-white/10 bg-white/5 backdrop-blur-sm">
          <div className="mx-auto flex max-w-7xl items-center justify-around px-4 py-4 lg:px-6">
            {heroStats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.1 }}
                className="text-center"
              >
                <p className="text-lg font-bold text-white md:text-2xl">{stat.value}</p>
                <p className="text-[10px] font-medium text-white/60 md:text-xs">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== OFFERS CAROUSEL ========== */}
      <section className="mx-auto max-w-7xl px-4 py-10 lg:px-6">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="font-display text-2xl font-bold text-charcoal">🔥 Today's Offers</h2>
            <p className="text-sm text-gray-400">Don't miss these incredible deals</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentOffer(Math.max(0, currentOffer - 1))}
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-gray-200 text-gray-400 transition-colors hover:bg-gray-50 hover:text-charcoal"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => setCurrentOffer(Math.min(offers.length - 1, currentOffer + 1))}
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-gray-200 text-gray-400 transition-colors hover:bg-gray-50 hover:text-charcoal"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        <div className="flex gap-4 overflow-x-auto pb-2 hide-scrollbar">
          {offers.map((offer, i) => (
            <motion.div
              key={offer.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`min-w-[280px] flex-1 cursor-pointer rounded-2xl bg-gradient-to-r ${offer.bgColor} p-6 text-white shadow-lg transition-transform hover:scale-[1.02] md:min-w-0`}
              onClick={() => navigate('/products')}
            >
              <p className="mb-1 text-sm font-medium text-white/80">{offer.title}</p>
              <h3 className="mb-1 text-2xl font-extrabold">{offer.subtitle}</h3>
              <p className="mb-4 text-sm text-white/70">{offer.description}</p>
              <div className="flex items-center justify-between">
                <span className="rounded-lg bg-white/20 px-3 py-1 text-xs font-bold backdrop-blur-sm">
                  Code: {offer.code}
                </span>
                <ArrowRight size={18} />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ========== CATEGORIES ========== */}
      <section id="categories" className="mx-auto max-w-7xl px-4 py-10 lg:px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{ visible: { transition: { staggerChildren: 0.05 } } }}
        >
          <h2 className="mb-1 font-display text-2xl font-bold text-charcoal">Shop by Category</h2>
          <p className="mb-6 text-sm text-gray-400">Explore our wide range of categories</p>

          <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-6">
            {categories.map((cat) => (
              <motion.div key={cat.id} variants={fadeUp}>
                <Link
                  to={`/products/${cat.id}`}
                  className="group flex flex-col items-center gap-2 rounded-2xl border border-gray-100 bg-white p-4 text-center transition-all hover:border-primary-200 hover:shadow-lg"
                >
                  <div
                    className="flex h-14 w-14 items-center justify-center rounded-2xl text-2xl transition-transform group-hover:scale-110"
                    style={{ backgroundColor: cat.bgColor }}
                  >
                    {cat.icon}
                  </div>
                  <span className="text-xs font-medium text-gray-600 line-clamp-1">{cat.shortName}</span>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ========== BESTSELLERS ========== */}
      <section className="mx-auto max-w-7xl px-4 py-10 lg:px-6">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="font-display text-2xl font-bold text-charcoal">⭐ Bestsellers</h2>
            <p className="text-sm text-gray-400">Most loved by our customers</p>
          </div>
          <Link
            to="/products"
            className="flex items-center gap-1 rounded-xl px-4 py-2 text-sm font-semibold text-primary-600 transition-colors hover:bg-primary-50"
          >
            View All <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:gap-4">
          {bestsellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* ========== FRESH PICKS BANNER ========== */}
      <section className="mx-auto max-w-7xl px-4 py-6 lg:px-6">
        <div className="overflow-hidden rounded-3xl bg-gradient-to-r from-green-50 to-emerald-50 p-6 md:p-10">
          <div className="flex flex-col gap-6 md:flex-row md:items-center">
            <div className="flex-1">
              <span className="mb-2 inline-flex items-center gap-1 rounded-full bg-primary-100 px-3 py-1 text-xs font-semibold text-primary-700">
                <Leaf size={12} /> Farm Fresh
              </span>
              <h2 className="mb-2 font-display text-2xl font-bold text-charcoal md:text-3xl">
                Fresh from the Farm
              </h2>
              <p className="mb-4 text-sm text-gray-500">
                Handpicked fruits and vegetables, delivered fresh from the farm to your table within 24 hours.
              </p>
              <Link
                to="/products/fruits-vegetables"
                className="inline-flex items-center gap-2 rounded-xl bg-primary-500 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-primary-500/25 transition-all hover:bg-primary-600"
              >
                Shop Fresh <ArrowRight size={14} />
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-3 md:w-96">
              {freshPicks.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========== DAIRY SECTION ========== */}
      <section className="mx-auto max-w-7xl px-4 py-10 lg:px-6">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="font-display text-2xl font-bold text-charcoal">🥛 Dairy & Eggs</h2>
            <p className="text-sm text-gray-400">Farm-fresh dairy products</p>
          </div>
          <Link
            to="/products/dairy"
            className="flex items-center gap-1 rounded-xl px-4 py-2 text-sm font-semibold text-primary-600 transition-colors hover:bg-primary-50"
          >
            View All <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:gap-4">
          {dairyProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* ========== TRUST BADGES ========== */}
      <section className="mx-auto max-w-7xl px-4 py-10 lg:px-6">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {[
            { icon: <Truck size={24} />, title: 'Fast Delivery', desc: '30 min express delivery' },
            { icon: <Shield size={24} />, title: 'Quality Assured', desc: '100% quality guarantee' },
            { icon: <Clock size={24} />, title: 'Fresh Always', desc: 'Daily fresh stock' },
            { icon: <Star size={24} />, title: 'Best Prices', desc: 'Lowest price guarantee' },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col items-center gap-3 rounded-2xl border border-gray-100 bg-white p-6 text-center shadow-sm"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-50 text-primary-600">
                {item.icon}
              </div>
              <h3 className="text-sm font-semibold text-charcoal">{item.title}</h3>
              <p className="text-xs text-gray-400">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ========== TESTIMONIALS ========== */}
      <section className="mx-auto max-w-7xl px-4 py-10 lg:px-6">
        <h2 className="mb-1 text-center font-display text-2xl font-bold text-charcoal">What Our Customers Say</h2>
        <p className="mb-8 text-center text-sm text-gray-400">Trusted by thousands of happy shoppers</p>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm"
            >
              <div className="mb-3 flex items-center gap-1">
                {[...Array(t.rating)].map((_, s) => (
                  <Star key={s} size={14} className="fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="mb-4 text-sm leading-relaxed text-gray-500">&ldquo;{t.text}&rdquo;</p>
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-100 text-xs font-bold text-primary-700">
                  {t.avatar}
                </div>
                <div>
                  <p className="text-sm font-semibold text-charcoal">{t.name}</p>
                  <p className="text-xs text-gray-400">{t.location}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ========== CTA BANNER ========== */}
      <section className="mx-auto max-w-7xl px-4 py-10 lg:px-6">
        <div className="overflow-hidden rounded-3xl bg-gradient-to-r from-charcoal to-charcoal-light p-8 text-center md:p-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="mb-3 font-display text-3xl font-extrabold text-white md:text-4xl">
              Get ₹200 OFF your first order
            </h2>
            <p className="mb-6 text-base text-gray-400">
              Use code <span className="rounded-lg bg-white/10 px-3 py-1 font-bold text-primary-400">FIRST200</span> at checkout
            </p>
            <Link
              to="/products"
              className="inline-flex items-center gap-2 rounded-xl bg-primary-500 px-8 py-3.5 text-sm font-bold text-white shadow-xl shadow-primary-500/25 transition-all hover:bg-primary-600 hover:shadow-2xl"
            >
              Start Shopping <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
