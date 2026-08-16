import { useState, useMemo } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  SlidersHorizontal, X, ChevronDown, Grid3x3, List, Star,
  Plus, Minus, Heart, Leaf, Search
} from 'lucide-react';
import { products } from '../data/products';
import { categories } from '../data/categories';
import useCartStore from '../store/useCartStore';
import useWishlistStore from '../store/useWishlistStore';
import useUIStore from '../store/useUIStore';

function ProductCard({ product, viewMode }) {
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

  if (viewMode === 'list') {
    return (
      <motion.div
        layout
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        onClick={() => openProductModal(product)}
        className="group flex cursor-pointer gap-4 rounded-2xl border border-gray-100 bg-white p-3 shadow-sm transition-shadow hover:shadow-lg"
      >
        <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-xl bg-gray-50">
          <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
          {product.discount > 0 && (
            <span className="absolute left-1 top-1 rounded bg-red-500 px-1.5 py-0.5 text-[10px] font-bold text-white">
              {product.discount}%
            </span>
          )}
        </div>
        <div className="flex flex-1 flex-col justify-between">
          <div>
            <p className="text-[10px] font-medium uppercase tracking-wider text-gray-400">{product.brand}</p>
            <h3 className="text-sm font-semibold text-charcoal">{product.name}</h3>
            <div className="mt-1 flex items-center gap-2">
              <div className="flex items-center gap-0.5">
                <Star size={11} className="fill-amber-400 text-amber-400" />
                <span className="text-xs font-medium text-gray-500">{product.rating}</span>
              </div>
              <span className="text-xs text-gray-300">·</span>
              <span className="text-xs text-gray-400">{product.weight}</span>
              {product.isOrganic && (
                <>
                  <span className="text-xs text-gray-300">·</span>
                  <span className="flex items-center gap-0.5 text-xs font-medium text-primary-600">
                    <Leaf size={10} /> Organic
                  </span>
                </>
              )}
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-baseline gap-1">
              <span className="text-base font-bold text-charcoal">₹{product.price}</span>
              {product.originalPrice > product.price && (
                <span className="text-xs text-gray-400 line-through">₹{product.originalPrice}</span>
              )}
            </div>
            {qty === 0 ? (
              <button onClick={handleAdd} className="flex h-8 items-center gap-1 rounded-xl bg-primary-50 px-3 text-xs font-semibold text-primary-600 transition-all hover:bg-primary-500 hover:text-white">
                <Plus size={13} /> Add
              </button>
            ) : (
              <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                <button onClick={() => decrementQuantity(product.id)} className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary-50 text-primary-600"><Minus size={13} /></button>
                <span className="w-5 text-center text-xs font-bold text-primary-600">{qty}</span>
                <button onClick={() => incrementQuantity(product.id)} className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary-500 text-white"><Plus size={13} /></button>
              </div>
            )}
          </div>
        </div>
        <button onClick={handleWishlist} className={`mt-1 self-start rounded-lg p-1.5 ${wishlisted ? 'text-red-500' : 'text-gray-300 hover:text-red-500'}`}>
          <Heart size={16} fill={wishlisted ? 'currentColor' : 'none'} />
        </button>
      </motion.div>
    );
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      whileHover={{ y: -4 }}
      onClick={() => openProductModal(product)}
      className="group relative flex cursor-pointer flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-shadow hover:shadow-xl"
    >
      <div className="relative h-40 overflow-hidden bg-gray-50 sm:h-44">
        <img src={product.image} alt={product.name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
        {product.discount > 0 && (
          <span className="absolute left-2 top-2 rounded-lg bg-red-500 px-2 py-0.5 text-xs font-bold text-white">{product.discount}% OFF</span>
        )}
        {product.isOrganic && (
          <span className="absolute left-2 rounded-lg bg-primary-500 px-2 py-0.5 text-xs font-bold text-white" style={{ top: product.discount > 0 ? 32 : 8 }}>
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
        <button onClick={handleWishlist} className={`absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-xl transition-all ${wishlisted ? 'bg-red-500 text-white' : 'bg-white/80 text-gray-500 hover:text-red-500 backdrop-blur-sm'}`}>
          <Heart size={14} fill={wishlisted ? 'currentColor' : 'none'} />
        </button>
      </div>
      <div className="flex flex-1 flex-col p-3">
        <p className="mb-0.5 text-[10px] font-medium uppercase tracking-wider text-gray-400">{product.brand}</p>
        <h3 className="mb-1 text-sm font-semibold text-charcoal line-clamp-1">{product.name}</h3>
        <div className="mb-2 flex items-center gap-1">
          <Star size={11} className="fill-amber-400 text-amber-400" />
          <span className="text-xs text-gray-500">{product.rating}</span>
          <span className="ml-1 text-xs text-gray-400">{product.weight}</span>
        </div>
        <div className="mt-auto flex items-center justify-between">
          <div>
            <span className="text-base font-bold text-charcoal">₹{product.price}</span>
            {product.originalPrice > product.price && (
              <span className="ml-1 text-xs text-gray-400 line-through">₹{product.originalPrice}</span>
            )}
          </div>
          {qty === 0 ? (
            <button onClick={handleAdd} className="flex h-8 items-center gap-1 rounded-xl bg-primary-50 px-3 text-xs font-semibold text-primary-600 transition-all hover:bg-primary-500 hover:text-white">
              <Plus size={13} /> Add
            </button>
          ) : (
            <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
              <button onClick={() => decrementQuantity(product.id)} className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary-50 text-primary-600"><Minus size={13} /></button>
              <span className="w-5 text-center text-xs font-bold text-primary-600">{qty}</span>
              <button onClick={() => incrementQuantity(product.id)} className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary-500 text-white"><Plus size={13} /></button>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

const sortOptions = [
  { label: 'Relevance', value: 'relevance' },
  { label: 'Price: Low to High', value: 'price-asc' },
  { label: 'Price: High to Low', value: 'price-desc' },
  { label: 'Rating', value: 'rating' },
  { label: 'Discount', value: 'discount' },
];

export default function Products() {
  const { categoryId } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('relevance');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState(categoryId ? [categoryId] : []);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [onlyOrganic, setOnlyOrganic] = useState(false);
  const [onlyInStock, setOnlyInStock] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const currentCategory = categoryId ? categories.find((c) => c.id === categoryId) : null;
  const offersOnly = searchParams.get('filter') === 'offers';

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (offersOnly) {
      result = result.filter((p) => p.discount > 0);
    }

    // Category filter
    if (selectedCategories.length > 0) {
      result = result.filter((p) => selectedCategories.includes(p.category));
    }

    // Price filter
    result = result.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1]);

    // Organic filter
    if (onlyOrganic) result = result.filter((p) => p.isOrganic);

    // In stock filter
    if (onlyInStock) result = result.filter((p) => p.inStock);

    // Search query
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) => p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q)
      );
    }

    // Sort
    switch (sortBy) {
      case 'price-asc': result.sort((a, b) => a.price - b.price); break;
      case 'price-desc': result.sort((a, b) => b.price - a.price); break;
      case 'rating': result.sort((a, b) => b.rating - a.rating); break;
      case 'discount': result.sort((a, b) => b.discount - a.discount); break;
      default: break;
    }

    return result;
  }, [selectedCategories, priceRange, onlyOrganic, onlyInStock, sortBy, searchQuery]);

  const toggleCategory = (id) => {
    setSelectedCategories((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setPriceRange([0, 1000]);
    setOnlyOrganic(false);
    setOnlyInStock(false);
    setSearchQuery('');
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.delete('filter');
      return next;
    });
  };

  const activeFilterCount =
    selectedCategories.length +
    (onlyOrganic ? 1 : 0) +
    (onlyInStock ? 1 : 0) +
    (priceRange[0] > 0 || priceRange[1] < 1000 ? 1 : 0) +
    (offersOnly ? 1 : 0);

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 lg:px-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="font-display text-2xl font-bold text-charcoal md:text-3xl">
          {currentCategory ? currentCategory.name : offersOnly ? "Today's Offers" : 'All Products'}
        </h1>
        <p className="mt-1 text-sm text-gray-400">
          {filteredProducts.length} products{currentCategory ? ` in ${currentCategory.name}` : offersOnly ? ' on special offer' : ' available'}
        </p>
      </div>

      {/* Toolbar */}
      <div className="mb-6 flex flex-wrap items-center gap-3">
        {/* Search in products */}
        <div className="relative flex-1 sm:max-w-xs">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search products..."
            className="w-full rounded-xl border border-gray-200 bg-white py-2.5 pl-9 pr-4 text-sm outline-none transition-colors focus:border-primary-300 focus:ring-2 focus:ring-primary-100"
          />
        </div>

        {/* Filters button */}
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-medium transition-colors ${
            showFilters ? 'border-primary-300 bg-primary-50 text-primary-600' : 'border-gray-200 bg-white text-gray-600 hover:bg-gray-50'
          }`}
        >
          <SlidersHorizontal size={16} />
          Filters
          {activeFilterCount > 0 && (
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary-500 text-[10px] font-bold text-white">
              {activeFilterCount}
            </span>
          )}
        </button>

        {/* Sort */}
        <div className="relative">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="appearance-none rounded-xl border border-gray-200 bg-white py-2.5 pl-4 pr-10 text-sm font-medium text-gray-600 outline-none transition-colors focus:border-primary-300 hover:bg-gray-50"
          >
            {sortOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
          <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
        </div>

        {/* View toggle */}
        <div className="hidden items-center gap-1 rounded-xl border border-gray-200 bg-white p-1 md:flex">
          <button
            onClick={() => setViewMode('grid')}
            className={`rounded-lg p-1.5 transition-colors ${viewMode === 'grid' ? 'bg-primary-50 text-primary-600' : 'text-gray-400 hover:text-gray-600'}`}
          >
            <Grid3x3 size={16} />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`rounded-lg p-1.5 transition-colors ${viewMode === 'list' ? 'bg-primary-50 text-primary-600' : 'text-gray-400 hover:text-gray-600'}`}
          >
            <List size={16} />
          </button>
        </div>
      </div>

      <div className="flex gap-6">
        {/* Filters sidebar */}
        <AnimatePresence>
          {showFilters && (
            <motion.aside
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: 260 }}
              exit={{ opacity: 0, width: 0 }}
              className="hidden shrink-0 overflow-hidden md:block"
            >
              <div className="w-[260px] rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-sm font-bold text-charcoal">Filters</h3>
                  <button onClick={clearFilters} className="text-xs font-medium text-primary-600 hover:underline">Clear all</button>
                </div>

                {/* Categories */}
                <div className="mb-5">
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-gray-400">Category</p>
                  <div className="space-y-1">
                    {categories.map((cat) => (
                      <label key={cat.id} className="flex cursor-pointer items-center gap-2 rounded-lg px-2 py-1.5 transition-colors hover:bg-gray-50">
                        <input
                          type="checkbox"
                          checked={selectedCategories.includes(cat.id)}
                          onChange={() => toggleCategory(cat.id)}
                          className="h-4 w-4 rounded border-gray-300 text-primary-500 focus:ring-primary-500"
                        />
                        <span className="text-sm">{cat.icon}</span>
                        <span className="text-sm text-gray-600">{cat.shortName}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Price */}
                <div className="mb-5">
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-gray-400">Price Range</p>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      value={priceRange[0]}
                      onChange={(e) => setPriceRange([+e.target.value, priceRange[1]])}
                      className="w-full rounded-lg border border-gray-200 px-2 py-1.5 text-sm outline-none focus:border-primary-300"
                      placeholder="Min"
                    />
                    <span className="text-gray-400">-</span>
                    <input
                      type="number"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], +e.target.value])}
                      className="w-full rounded-lg border border-gray-200 px-2 py-1.5 text-sm outline-none focus:border-primary-300"
                      placeholder="Max"
                    />
                  </div>
                </div>

                {/* Toggles */}
                <div className="space-y-3">
                  <label className="flex cursor-pointer items-center justify-between rounded-lg px-2 py-1.5 transition-colors hover:bg-gray-50">
                    <span className="text-sm text-gray-600">Organic Only</span>
                    <input
                      type="checkbox"
                      checked={onlyOrganic}
                      onChange={(e) => setOnlyOrganic(e.target.checked)}
                      className="h-4 w-4 rounded border-gray-300 text-primary-500 focus:ring-primary-500"
                    />
                  </label>
                  <label className="flex cursor-pointer items-center justify-between rounded-lg px-2 py-1.5 transition-colors hover:bg-gray-50">
                    <span className="text-sm text-gray-600">In Stock Only</span>
                    <input
                      type="checkbox"
                      checked={onlyInStock}
                      onChange={(e) => setOnlyInStock(e.target.checked)}
                      className="h-4 w-4 rounded border-gray-300 text-primary-500 focus:ring-primary-500"
                    />
                  </label>
                </div>
              </div>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* Product grid */}
        <div className="flex-1">
          {/* Active filter chips */}
          {activeFilterCount > 0 && (
            <div className="mb-4 flex flex-wrap gap-2">
              {selectedCategories.map((catId) => {
                const cat = categories.find((c) => c.id === catId);
                return (
                  <button
                    key={catId}
                    onClick={() => toggleCategory(catId)}
                    className="flex items-center gap-1 rounded-lg bg-primary-50 px-2.5 py-1 text-xs font-medium text-primary-600"
                  >
                    {cat?.icon} {cat?.shortName} <X size={12} />
                  </button>
                );
              })}
              {onlyOrganic && (
                <button onClick={() => setOnlyOrganic(false)} className="flex items-center gap-1 rounded-lg bg-primary-50 px-2.5 py-1 text-xs font-medium text-primary-600">
                  🌿 Organic <X size={12} />
                </button>
              )}
              {offersOnly && (
                <button
                  onClick={() => setSearchParams((prev) => {
                    const next = new URLSearchParams(prev);
                    next.delete('filter');
                    return next;
                  })}
                  className="flex items-center gap-1 rounded-lg bg-primary-50 px-2.5 py-1 text-xs font-medium text-primary-600"
                >
                  🔥 Offers <X size={12} />
                </button>
              )}
              <button onClick={clearFilters} className="rounded-lg px-2.5 py-1 text-xs font-medium text-gray-400 hover:text-gray-600">
                Clear all
              </button>
            </div>
          )}

          {filteredProducts.length === 0 ? (
            <div className="py-20 text-center">
              <p className="text-5xl">🔍</p>
              <h3 className="mt-4 text-lg font-semibold text-charcoal">No products found</h3>
              <p className="mt-1 text-sm text-gray-400">Try adjusting your filters or search query</p>
              <button
                onClick={clearFilters}
                className="mt-4 rounded-xl bg-primary-50 px-4 py-2 text-sm font-medium text-primary-600 transition-colors hover:bg-primary-100"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <motion.div
              layout
              className={
                viewMode === 'grid'
                  ? 'grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 lg:gap-4'
                  : 'space-y-3'
              }
            >
              <AnimatePresence mode="popLayout">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} viewMode={viewMode} />
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
