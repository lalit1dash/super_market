import { motion } from 'framer-motion';

export default function LoadingScreen() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-br from-primary-600 via-primary-500 to-emerald-400"
    >
      {/* Floating background circles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white/10"
            style={{
              width: 60 + i * 40,
              height: 60 + i * 40,
              left: `${15 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
            }}
            animate={{
              y: [0, -20, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.3,
            }}
          />
        ))}
      </div>

      <div className="relative flex flex-col items-center gap-8">
        {/* Logo */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, type: 'spring', bounce: 0.5 }}
          className="relative"
        >
          <div className="flex h-24 w-24 items-center justify-center rounded-3xl bg-white shadow-2xl shadow-primary-900/30">
            <span className="text-5xl">🛒</span>
          </div>
          <motion.div
            className="absolute -right-1 -top-1 flex h-8 w-8 items-center justify-center rounded-full bg-orange-400 text-sm font-bold text-white shadow-lg"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            ✦
          </motion.div>
        </motion.div>

        {/* Brand name */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-center"
        >
          <h1 className="font-display text-4xl font-extrabold tracking-tight text-white">
            Fresh<span className="text-yellow-300">Mart</span>
          </h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-2 text-sm font-medium text-white/80"
          >
            Fresh Groceries, Delivered Fast
          </motion.p>
        </motion.div>

        {/* Progress bar */}
        <motion.div
          initial={{ opacity: 0, width: 0 }}
          animate={{ opacity: 1, width: 200 }}
          transition={{ delay: 0.6, duration: 0.4 }}
          className="h-1.5 overflow-hidden rounded-full bg-white/20"
          style={{ width: 200 }}
        >
          <motion.div
            className="h-full rounded-full bg-white"
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 1.8, delay: 0.8, ease: 'easeInOut' }}
          />
        </motion.div>
      </div>
    </motion.div>
  );
}
