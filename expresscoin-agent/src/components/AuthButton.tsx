'use client';

import { useAuth } from '../hooks/useAuth';
import { FiLogIn, FiLogOut, FiUser } from 'react-icons/fi';

export const AuthButton = () => {
  const { user, loading, error, signInWithGoogle, signOut } = useAuth();

  const handleSignIn = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error('Sign in error:', error);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  if (loading) {
    return (
      <button className="btn btn-primary" disabled>
        <span className="loading loading-spinner loading-sm"></span>
        Loading...
      </button>
    );
  }

  if (user) {
    return (
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2">
          <FiUser className="w-4 h-4" />
          <span className="text-sm font-medium">
            {user.displayName || user.email}
          </span>
        </div>
        <button 
          onClick={handleSignOut}
          className="btn btn-outline btn-sm"
        >
          <FiLogOut className="w-4 h-4" />
          Sign Out
        </button>
      </div>
    );
  }

  return (
    <button 
      onClick={handleSignIn}
      className="btn btn-primary"
    >
      <FiLogIn className="w-4 h-4" />
      Sign in with Google
    </button>
  );
};