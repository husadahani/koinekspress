'use client';

import { useState } from 'react';
import { FaShippingFast, FaGoogle } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useAuth } from '@/hooks/useAuth';

interface LoginScreenProps {
  onLogin: () => void;
}

export default function LoginScreen({ onLogin }: LoginScreenProps) {
  const { signInWithGoogle, loading, error } = useAuth();
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const handleGoogleLogin = async () => {
    try {
      setIsAuthenticating(true);
      await signInWithGoogle();
      onLogin();
    } catch (error) {
      console.error('Login error:', error);
      // Fallback to demo login if Firebase fails
      setTimeout(() => {
        onLogin();
      }, 1000);
    } finally {
      setIsAuthenticating(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-fedex-purple to-fedex-light">
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="card w-96 bg-base-100 shadow-2xl"
      >
        <div className="card-body items-center text-center">
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-20 h-20 bg-fedex-purple rounded-full flex items-center justify-center mb-4"
          >
            <FaShippingFast className="text-3xl text-white" />
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="card-title text-2xl font-bold text-fedex-purple"
          >
            ExpressCoin Agent
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-gray-600 mb-6"
          >
            Platform GameFi untuk Agent Pengiriman Koin
          </motion.p>
          
          <motion.button 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleGoogleLogin}
            disabled={loading || isAuthenticating}
            className="btn btn-primary bg-fedex-purple hover:bg-fedex-dark border-none w-full"
          >
            {loading || isAuthenticating ? (
              <>
                <span className="loading loading-spinner loading-sm"></span>
                Loading...
              </>
            ) : (
              <>
                <FaGoogle className="mr-2" />
                Login dengan Google
              </>
            )}
          </motion.button>
          
          {error && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="alert alert-error mt-4"
            >
              <span>{error}</span>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
}