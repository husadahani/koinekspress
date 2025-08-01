'use client';

import { useSmartWallet } from '../hooks/useSmartWallet';
import { motion, AnimatePresence } from 'framer-motion';

export const BackgroundInitStatus = () => {
  const { backgroundInitializing } = useSmartWallet();

  if (!backgroundInitializing) {
    return null;
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="fixed top-4 right-4 z-50"
      >
        <div className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
          <span className="text-sm font-medium">
            Initializing Smart Wallet...
          </span>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};