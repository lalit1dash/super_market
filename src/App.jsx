import { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import BottomNavigation from './components/layout/BottomNavigation';
import CartDrawer from './components/cart/CartDrawer';
import SearchOverlay from './components/search/SearchOverlay';
import ProductModal from './components/product/ProductModal';
import Toast from './components/ui/Toast';
import LoadingScreen from './components/ui/LoadingScreen';
import PageTransition from './components/layout/PageTransition';
import Home from './pages/Home';
import Products from './pages/Products';
import Checkout from './pages/Checkout';
import Profile from './pages/Profile';
import Wishlist from './pages/Wishlist';
import OrderTracking from './pages/OrderTracking';
import useUIStore from './store/useUIStore';

export default function App() {
  const location = useLocation();
  const { isLoading, setLoading } = useUIStore();

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2200);
    return () => clearTimeout(timer);
  }, [setLoading]);

  return (
    <>
      <AnimatePresence>
        {isLoading && <LoadingScreen key="loading" />}
      </AnimatePresence>

      {!isLoading && (
        <>
          <Navbar />
          <main className="min-h-screen">
            <AnimatePresence mode="wait">
              <Routes location={location} key={location.pathname}>
                <Route path="/" element={<PageTransition><Home /></PageTransition>} />
                <Route path="/products" element={<PageTransition><Products /></PageTransition>} />
                <Route path="/products/:categoryId" element={<PageTransition><Products /></PageTransition>} />
                <Route path="/checkout" element={<PageTransition><Checkout /></PageTransition>} />
                <Route path="/profile" element={<PageTransition><Profile /></PageTransition>} />
                <Route path="/wishlist" element={<PageTransition><Wishlist /></PageTransition>} />
                <Route path="/order-tracking" element={<PageTransition><OrderTracking /></PageTransition>} />
                <Route path="/order-tracking/:orderId" element={<PageTransition><OrderTracking /></PageTransition>} />
              </Routes>
            </AnimatePresence>
          </main>
          <Footer />
          <BottomNavigation />
          <CartDrawer />
          <SearchOverlay />
          <ProductModal />
          <Toast />
        </>
      )}
    </>
  );
}
