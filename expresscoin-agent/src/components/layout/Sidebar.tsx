'use client';

import { 
  FaTachometerAlt, 
  FaCertificate, 
  FaBox, 
  FaHistory, 
  FaUsers, 
  FaWallet, 
  FaSignOutAlt
} from 'react-icons/fa';
import { PageType, User } from '@/types';
import { motion } from 'framer-motion';

interface SidebarProps {
  user: User;
  currentPage: PageType;
  onPageChange: (page: PageType) => void;
  onLogout: () => void;
  isMobileMenuOpen: boolean;
  onMobileMenuClose: () => void;
}

export default function Sidebar({ 
  user, 
  currentPage, 
  onPageChange, 
  onLogout,
  isMobileMenuOpen,
  onMobileMenuClose 
}: SidebarProps) {
  // Explicitly mark isMobileMenuOpen as used even though we don't use it in logic
  void isMobileMenuOpen;
  const menuItems = [
    { id: 'dashboard' as PageType, icon: FaTachometerAlt, label: 'Dashboard' },
    { id: 'license' as PageType, icon: FaCertificate, label: 'Lisensi' },
    { id: 'packages' as PageType, icon: FaBox, label: 'Paket' },
    { id: 'history' as PageType, icon: FaHistory, label: 'Histori' },
    { id: 'referral' as PageType, icon: FaUsers, label: 'Referral' },
    { id: 'wallet' as PageType, icon: FaWallet, label: 'Wallet' },
  ];

  const handleMenuClick = (page: PageType) => {
    onPageChange(page);
    onMobileMenuClose();
  };

  return (
    <div className="drawer-side">
      <label 
        htmlFor="mobile-menu" 
        className="drawer-overlay"
        onClick={onMobileMenuClose}
      ></label>
      
      <aside className="min-h-full w-80 bg-base-200">
        {/* User Profile */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-fedex-purple to-fedex-light p-6"
        >
          <div className="flex items-center space-x-4">
            <div className="avatar">
              <div className="w-12 rounded-full ring ring-white ring-offset-2">
                <img src={user.avatar} alt="User Avatar" />
              </div>
            </div>
            <div className="text-white">
              <div className="font-bold">{user.name}</div>
              <div className="text-sm opacity-75">Agent Level {user.level}</div>
            </div>
          </div>
        </motion.div>

        {/* Navigation Menu */}
        <ul className="menu p-4 space-y-2">
          {menuItems.map((item, index) => {
            const IconComponent = item.icon;
            const isActive = currentPage === item.id;
            
            return (
              <motion.li 
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <a 
                  onClick={() => handleMenuClick(item.id)}
                  className={`menu-item cursor-pointer ${isActive ? 'active bg-fedex-purple text-white' : 'hover:bg-base-300'}`}
                >
                  <IconComponent className="text-lg" />
                  {item.label}
                </a>
              </motion.li>
            );
          })}
          
          <motion.li 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: menuItems.length * 0.1 }}
            className="mt-8"
          >
            <a 
              onClick={onLogout}
              className="text-error cursor-pointer hover:bg-error hover:text-white"
            >
              <FaSignOutAlt />
              Logout
            </a>
          </motion.li>
        </ul>
      </aside>
    </div>
  );
}