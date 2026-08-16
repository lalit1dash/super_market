import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, TrendingUp, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import useUIStore from '../../store/useUIStore';
import { products } from '../../data/products';
import useCartStore from '../../store/useCartStore';

export default function SearchOverlay() {
  const navigate = useNavigate();
  const { isSearchOpen, closeSearch, openProductModal } = useUIStore();
  const { addItem } = useCartStore();
  const { addToast } = useUIStore();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const inputRef = useRef(null);

  const trendingSearches = ['Mangoes', 'Milk', 'Bread', 'Chicken', 'Rice', 'Coffee'];

  useEffect(() => {
    if (isSearchOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 200);
    }
    if (!isSearchOpen) {
      setQuery('');
      setResults([]);
    }
  }, [isSearchOpen]);

  useEffect(() => {
    if (query.trim().length >= 2) {
      const q = query.toLowerCase();
      const filtered = products.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      );
      setResults(filtered.slice(0, 8));
    } else {
      setResults([]);
    }
  }, [query]);

  const handleProductClick = (product) => {
    openProductModal(product);
    closeSearch();
  };

  const handleQuickAdd = (e, product) => {
    e.stopPropagation();
    addItem(product);
    addToast({ type: 'cart', message: `${product.name} added to cart` });
  };

  return (
    <AnimatePresence>
      {isSearchOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] flex flex-col bg-black/50"
          onClick={closeSearch}
        >
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="mx-auto w-full max-w-2xl p-4 pt-4 md:pt-8"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Search input */}
            <div className="relative flex items-center overflow-hidden rounded-2xl bg-white shadow-2xl">
              <Search size={20} className="ml-5 shrink-0 text-gray-400" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for groceries, brands, categories..."
                className="flex-1 bg-transparent px-4 py-4 text-sm text-charcoal outline-none placeholder:text-gray-400"
              />
              {query && (
                <button
                  onClick={() => setQuery('')}
                  className="mr-2 rounded-lg p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-charcoal"
                >
                  <X size={16} />
                </button>
              )}
              <button
                onClick={closeSearch}
                className="mr-3 rounded-xl bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-500 transition-colors hover:bg-gray-200"
              >
                ESC
              </button>
            </div>

            {/* Results or suggestions */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mt-3 max-h-[60vh] overflow-y-auto rounded-2xl bg-white shadow-2xl"
            >
              {results.length > 0 ? (
                <div className="p-3">
                  <p className="mb-2 px-2 text-xs font-semibold uppercase tracking-wider text-gray-400">
                    {results.length} result{results.length !== 1 ? 's' : ''}
                  </p>
                  <div className="space-y-1">
                    {results.map((product) => (
                      <button
                        key={product.id}
                        onClick={() => handleProductClick(product)}
                        className="flex w-full items-center gap-3 rounded-xl p-2 text-left transition-colors hover:bg-gray-50"
                      >
                        <img
                          src={product.image}
                          alt={product.name}
                          className="h-14 w-14 rounded-xl object-cover"
                        />
                        <div className="flex-1">
                          <p className="text-sm font-medium text-charcoal line-clamp-1">{product.name}</p>
                          <p className="text-xs text-gray-400">{product.brand} · {product.weight}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-bold text-charcoal">₹{product.price}</p>
                          <button
                            onClick={(e) => handleQuickAdd(e, product)}
                            className="mt-1 rounded-lg bg-primary-50 px-2 py-0.5 text-xs font-semibold text-primary-600 transition-colors hover:bg-primary-100"
                          >
                            + Add
                          </button>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              ) : query.length >= 2 ? (
                <div className="p-8 text-center">
                  <p className="text-3xl">🔍</p>
                  <p className="mt-2 text-sm font-medium text-charcoal">No results found</p>
                  <p className="mt-1 text-xs text-gray-400">Try a different search term</p>
                </div>
              ) : (
                <div className="p-4">
                  {/* Trending searches */}
                  <div className="mb-4">
                    <div className="mb-3 flex items-center gap-2 px-1">
                      <TrendingUp size={14} className="text-primary-500" />
                      <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">Trending</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {trendingSearches.map((term) => (
                        <button
                          key={term}
                          onClick={() => setQuery(term)}
                          className="rounded-xl bg-gray-50 px-3 py-1.5 text-xs font-medium text-gray-600 transition-colors hover:bg-primary-50 hover:text-primary-600"
                        >
                          {term}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Popular products */}
                  <div>
                    <div className="mb-3 flex items-center gap-2 px-1">
                      <Clock size={14} className="text-primary-500" />
                      <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">Popular</span>
                    </div>
                    {products.filter((p) => p.isBestseller).slice(0, 4).map((product) => (
                      <button
                        key={product.id}
                        onClick={() => handleProductClick(product)}
                        className="flex w-full items-center gap-3 rounded-xl p-2 text-left transition-colors hover:bg-gray-50"
                      >
                        <img
                          src={product.image}
                          alt={product.name}
                          className="h-10 w-10 rounded-lg object-cover"
                        />
                        <span className="text-sm text-gray-600">{product.name}</span>
                        <span className="ml-auto text-xs font-bold text-charcoal">₹{product.price}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
