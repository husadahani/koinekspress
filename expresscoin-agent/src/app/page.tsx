'use client';

import { useState, useEffect } from 'react';
import { PageType } from '@/types';
import { mockUser, mockStats } from '@/data/mockData';

// Components
import LoginScreen from '@/components/auth/LoginScreen';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import Dashboard from '@/components/pages/Dashboard';
import LicensePage from '@/components/pages/LicensePage';
import PackagesPage from '@/components/pages/PackagesPage';
import HistoryPage from '@/components/pages/HistoryPage';
import ReferralPage from '@/components/pages/ReferralPage';
import WalletPage from '@/components/pages/WalletPage';
import { BackgroundInitStatus } from '@/components/BackgroundInitStatus';

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState<PageType>('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Dark mode support
  useEffect(() => {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.documentElement.setAttribute('data-theme', 'dark');
    }
    
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (event: MediaQueryListEvent) => {
      document.documentElement.setAttribute('data-theme', event.matches ? 'dark' : 'light');
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentPage('dashboard');
  };

  const handlePageChange = (page: PageType) => {
    setCurrentPage(page);
  };

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleMobileMenuClose = () => {
    setIsMobileMenuOpen(false);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard stats={mockStats} />;
      case 'license':
        return <LicensePage />;
      case 'packages':
        return <PackagesPage />;
      case 'history':
        return <HistoryPage />;
      case 'referral':
        return <ReferralPage />;
      case 'wallet':
        return <WalletPage />;
      default:
        return <Dashboard stats={mockStats} />;
    }
  };

  if (!isLoggedIn) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  return (
    <div>
      <Navbar onMobileMenuToggle={handleMobileMenuToggle} />
      
      {/* Background Initialization Status */}
      <BackgroundInitStatus />
      
      <div className="drawer lg:drawer-open">
        <input 
          id="mobile-menu" 
          type="checkbox" 
          className="drawer-toggle" 
          checked={isMobileMenuOpen}
          onChange={handleMobileMenuToggle}
        />
        
        <Sidebar
          user={mockUser}
          currentPage={currentPage}
          onPageChange={handlePageChange}
          onLogout={handleLogout}
          isMobileMenuOpen={isMobileMenuOpen}
          onMobileMenuClose={handleMobileMenuClose}
        />

        {/* Main Content */}
        <div className="drawer-content flex flex-col">
          <main className="flex-1 p-6">
            {renderPage()}
          </main>
        </div>
      </div>
    </div>
  );
}
