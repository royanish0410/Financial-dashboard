"use client";
import { useState } from "react";
import Image from "next/image";
import {
  FunnelIcon,
  LightBulbIcon,
  Cog6ToothIcon,
  BellIcon,
  StarIcon,
  MagnifyingGlassIcon,
  UserIcon,
  LockClosedIcon,
  AcademicCapIcon,
  PlayCircleIcon,
  ArrowRightOnRectangleIcon,
  ChatBubbleLeftIcon,
  Bars3Icon,
  XMarkIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";

// Define proper TypeScript interface
interface MenuItem {
  name: string;
  hasDropdown: boolean;
  dropdownItems?: string[];
}

const menuItems: MenuItem[] = [
  { name: "HOME", hasDropdown: false },
  { name: "CRM", hasDropdown: false },
  { name: "UTILITIES", hasDropdown: false },
  { 
    name: "INSURANCE", 
    hasDropdown: true, 
    dropdownItems: [
      "Life Insurance",
      "Health Insurance", 
      "Motor Insurance",
      "Travel Insurance",
      "Home Insurance"
    ]
  },
  { 
    name: "ASSETS", 
    hasDropdown: true,
    dropdownItems: [
      "Real Estate",
      "Gold & Silver",
      "Fixed Deposits",
      "Bonds",
      "Alternative Investments"
    ]
  },
  { name: "MUTUAL", hasDropdown: false },
  { name: "RESEARCH", hasDropdown: false },
  { name: "TRANSACT ONLINE", hasDropdown: false },
  { name: "GOAL GPS", hasDropdown: false },
  { name: "FINANCIAL PLANNING", hasDropdown: false },
  { name: "WEALTH REPORT", hasDropdown: false },
  { 
    name: "OTHER", 
    hasDropdown: true,
    dropdownItems: [
      "Tax Planning",
      "Retirement Planning",
      "Education Planning",
      "Portfolio Review",
      "Market Updates",
      "Tools & Calculators"
    ]
  }
];

export default function NavBar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const handleDropdownToggle = (itemName: string) => {
    setActiveDropdown(activeDropdown === itemName ? null : itemName);
  };

  return (
    <header className="top-0 z-50 w-full shadow-lg">
      {/* Top row: Logo + Search + Icons */}
      <div className="bg-white border-b border-gray-200">
        <div className="w-full flex items-center justify-between px-6 lg:px-8 py-4">
          {/* Left: Logo */}
          <div className="flex items-center flex-shrink-0">
            <Image
              src="/wealth-elite-logo.png"
              alt="Wealth Elite Logo"
              width={160} 
              height={56}  
              className="h-14 w-auto"
            />
          </div>

          {/* Center: Search Bar (Desktop & Tablet) */}
          <div className="hidden md:flex flex-1 max-w-2xl mx-8">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="ex. Live portfolio"
                className="w-full rounded-lg border-2 border-gray-300 pl-4 pr-12 py-3 text-sm focus:outline-none focus:ring-2  bg-white text-gray-800 shadow-sm transition-all duration-200"
              />
              <div className="absolute right-2 top-2 bg-gray-500 rounded-md p-2 cursor-pointer  transition-colors border">
                <MagnifyingGlassIcon className="h-4 w-4 text-white" />
              </div>
            </div>
          </div>

          {/* Right: Desktop Icons */}
          <div className="hidden lg:flex items-center gap-4 text-gray-600 flex-shrink-0">
            <div className="flex items-center gap-4">
              <FunnelIcon className="h-7 w-7 cursor-pointer hover:text-red-500 transition-colors p-1 hover:bg-red-50 rounded-lg" />
              <LightBulbIcon className="h-7 w-7 cursor-pointer hover:text-red-500 transition-colors p-1 hover:bg-red-50 rounded-lg" />
              <Cog6ToothIcon className="h-7 w-7 cursor-pointer hover:text-red-500 transition-colors p-1 hover:bg-red-50 rounded-lg" />
              <BellIcon className="h-7 w-7 cursor-pointer hover:text-red-500 transition-colors p-1 hover:bg-red-50 rounded-lg" />
              <StarIcon className="h-7 w-7 cursor-pointer hover:text-red-500 transition-colors p-1 hover:bg-red-50 rounded-lg" />
              <ChatBubbleLeftIcon className="h-7 w-7 cursor-pointer hover:text-red-500 transition-colors p-1 hover:bg-red-50 rounded-lg" />
              <MagnifyingGlassIcon className="h-7 w-7 cursor-pointer hover:text-red-500 transition-colors p-1 hover:bg-red-50 rounded-lg" />
              <UserIcon className="h-7 w-7 cursor-pointer hover:text-red-500 transition-colors p-1 hover:bg-red-50 rounded-lg" />
              <LockClosedIcon className="h-7 w-7 cursor-pointer hover:text-red-500 transition-colors p-1 hover:bg-red-50 rounded-lg" />
              <AcademicCapIcon className="h-7 w-7 cursor-pointer hover:text-red-500 transition-colors p-1 hover:bg-red-50 rounded-lg" />
              <PlayCircleIcon className="h-7 w-7 cursor-pointer hover:text-red-500 transition-colors p-1 hover:bg-red-50 rounded-lg" />
            </div>
            <div className="h-8 w-px bg-gray-300 mx-2"></div>
            <div className="flex items-center gap-3 cursor-pointer hover:text-red-500 transition-colors px-3 py-2 hover:bg-red-50 rounded-lg">
              <ArrowRightOnRectangleIcon className="h-6 w-6" />
              <span className="text-sm font-semibold">LOGOUT</span>
            </div>
          </div>

          {/* Right: Tablet Icons (Simplified) */}
          <div className="hidden md:flex lg:hidden items-center gap-4 text-gray-600">
            <UserIcon className="h-7 w-7 cursor-pointer hover:text-red-500 transition-colors p-1 hover:bg-red-50 rounded-lg" />
            <BellIcon className="h-7 w-7 cursor-pointer hover:text-red-500 transition-colors p-1 hover:bg-red-50 rounded-lg" />
            <Cog6ToothIcon className="h-7 w-7 cursor-pointer hover:text-red-500 transition-colors p-1 hover:bg-red-50 rounded-lg" />
            <ArrowRightOnRectangleIcon className="h-7 w-7 cursor-pointer hover:text-red-500 transition-colors p-1 hover:bg-red-50 rounded-lg" />
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-3 rounded-xl hover:bg-gray-100 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <XMarkIcon className="w-6 h-6" />
            ) : (
              <Bars3Icon className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile search bar */}
        <div className="md:hidden px-6 pb-4">
          <div className="relative">
            <input
              type="text"
              placeholder="ex. Live portfolio"
              className="w-full rounded-xl border-2 border-gray-200 pl-6 pr-14 py-4 text-base focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-white text-gray-800 shadow-sm"
            />
            <div className="absolute right-4 top-4 bg-gray-500 rounded-lg p-1 cursor-pointer">
              <MagnifyingGlassIcon className="h-5 w-5 text-white" />
            </div>
          </div>
        </div>

        {/* Mobile icons row */}
        <div className="md:hidden px-6 pb-4">
          <div className="flex items-center justify-around text-gray-600 bg-gray-50 rounded-xl py-3">
            <UserIcon className="h-7 w-7 cursor-pointer hover:text-red-500 transition-colors p-1" />
            <BellIcon className="h-7 w-7 cursor-pointer hover:text-red-500 transition-colors p-1" />
            <ChatBubbleLeftIcon className="h-7 w-7 cursor-pointer hover:text-red-500 transition-colors p-1" />
            <Cog6ToothIcon className="h-7 w-7 cursor-pointer hover:text-red-500 transition-colors p-1" />
            <ArrowRightOnRectangleIcon className="h-7 w-7 cursor-pointer hover:text-red-500 transition-colors p-1" />
          </div>
        </div>
      </div>

      {/* Red menu row with dropdowns */}
      <div className="bg-red-600 w-full relative">
        {/* Desktop/Tablet Navigation */}
        <nav className="w-full hidden md:flex px-6 lg:px-8">
          <div className="flex w-full justify-between">
            {menuItems.map((item) => (
              <div key={item.name} className="relative group">
                <button
                  className={`flex items-center gap-2 px-4 lg:px-5 py-4 text-sm font-semibold text-white hover:bg-red-700 transition-colors duration-200 whitespace-nowrap ${
                    item.hasDropdown ? 'pr-3' : ''
                  }`}
                  onClick={() => item.hasDropdown && handleDropdownToggle(item.name)}
                >
                  {item.name}
                  {item.hasDropdown && (
                    <ChevronDownIcon 
                      className={`h-4 w-4 transition-transform duration-200 ${
                        activeDropdown === item.name ? 'rotate-180' : ''
                      }`} 
                    />
                  )}
                </button>
                
                {/* Dropdown Menu */}
                {item.hasDropdown && item.dropdownItems && (
                  <div className={`absolute top-full left-0 w-56 bg-white rounded-lg shadow-xl border border-gray-200 z-50 transform transition-all duration-200 origin-top ${
                    activeDropdown === item.name 
                      ? 'opacity-100 scale-100 visible' 
                      : 'opacity-0 scale-95 invisible'
                  }`}>
                    <div className="py-2">
                      {item.dropdownItems.map((dropdownItem) => (
                        <button
                          key={dropdownItem}
                          className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors duration-150"
                          onClick={() => setActiveDropdown(null)}
                        >
                          {dropdownItem}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </nav>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <nav className="md:hidden bg-red-600 w-full border-t border-red-700">
            <div className="max-h-96 overflow-y-auto">
              {menuItems.map((item) => (
                <div key={item.name}>
                  <button
                    className={`w-full flex items-center justify-between px-6 py-4 text-left text-sm font-semibold text-white hover:bg-red-700 transition-colors duration-200 border-b border-red-700`}
                    onClick={() => {
                      if (item.hasDropdown) {
                        handleDropdownToggle(item.name);
                      } else {
                        setIsMobileMenuOpen(false);
                      }
                    }}
                  >
                    <span>{item.name}</span>
                    {item.hasDropdown && (
                      <ChevronDownIcon 
                        className={`h-4 w-4 transition-transform duration-200 ${
                          activeDropdown === item.name ? 'rotate-180' : ''
                        }`} 
                      />
                    )}
                  </button>
                  
                  {/* Mobile Dropdown */}
                  {item.hasDropdown && item.dropdownItems && activeDropdown === item.name && (
                    <div className="bg-red-500 border-b border-red-700">
                      {item.dropdownItems.map((dropdownItem) => (
                        <button
                          key={dropdownItem}
                          className="w-full text-left px-10 py-3 text-sm text-white hover:bg-red-400 transition-colors duration-150"
                          onClick={() => {
                            setActiveDropdown(null);
                            setIsMobileMenuOpen(false);
                          }}
                        >
                          {dropdownItem}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </nav>
        )}
        
        {/* Overlay to close dropdown when clicking outside */}
        {activeDropdown && (
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setActiveDropdown(null)}
          />
        )}
      </div>
    </header>
  );
}