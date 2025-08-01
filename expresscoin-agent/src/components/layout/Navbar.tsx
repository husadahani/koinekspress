'use client';

import { FaShippingFast, FaBars, FaUser } from 'react-icons/fa';
import { useAuth } from '@/hooks/useAuth';

interface NavbarProps {
  onMobileMenuToggle: () => void;
}

export default function Navbar({ onMobileMenuToggle }: NavbarProps) {
  const { user, signOut } = useAuth();
  return (
    <div className="navbar bg-base-100 shadow-lg lg:hidden">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl text-fedex-purple">
          <FaShippingFast className="mr-2" />
          ExpressCoin
        </a>
      </div>
      <div className="flex-none">
        {user && (
          <div className="dropdown dropdown-end mr-2">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-8 h-8 rounded-full bg-fedex-purple flex items-center justify-center">
                <FaUser className="text-white text-sm" />
              </div>
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
              <li>
                <div className="text-sm font-medium">
                  {user.displayName || user.email}
                </div>
              </li>
              <li><a onClick={signOut}>Sign Out</a></li>
            </ul>
          </div>
        )}
        <button 
          onClick={onMobileMenuToggle}
          className="btn btn-square btn-ghost"
        >
          <FaBars />
        </button>
      </div>
    </div>
  );
}