'use client';

import { FaShippingFast, FaBars } from 'react-icons/fa';

interface NavbarProps {
  onMobileMenuToggle: () => void;
}

export default function Navbar({ onMobileMenuToggle }: NavbarProps) {
  return (
    <div className="navbar bg-base-100 shadow-lg lg:hidden">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl text-fedex-purple">
          <FaShippingFast className="mr-2" />
          ExpressCoin
        </a>
      </div>
      <div className="flex-none">
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