"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import {
  FunnelIcon,
  LightBulbIcon,
  Cog6ToothIcon,
  BellIcon,
  StarIcon,
  MagnifyingGlassCircleIcon,
  UserIcon,
  LockClosedIcon,
  AcademicCapIcon,
  PlayCircleIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";

const menuItems = [
  "Home",
  "CRM",
  "Utilities",
  "Insurance",
  "Assets",
  "Mutual",
  "Research",
  "Transact Online",
  "Goal GPS",
  "Financial Planning",
  "Wealth Report",
  "Other",
];

export default function NavBar() {
  return (
    <header className="sticky top-0 z-50 shadow">
      {/* Top row */}
      <div className="bg-white dark:bg-gray-900 border-b">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
          {/* Left: Logo + Search */}
          <div className="flex items-center gap-6">
            <img
              src="/wealth-elite-logo.png"
              alt="Wealth Elite Logo"
              className="h-12 w-auto" // Increased logo size
            />
            <div className="relative hidden md:block">
              <input
                type="text"
                placeholder="ex. Live portfolio"
                className="w-96 rounded border border-gray-300 pl-4 pr-10 py-2 text-base focus:outline-none focus:ring-2 focus:ring-red-500 dark:bg-gray-800 dark:text-white"
              />
              <MagnifyingGlassIcon className="h-5 w-5 absolute right-3 top-2.5 text-gray-500" />
            </div>
          </div>

          {/* Right: Icons */}
          <div className="flex items-center gap-5 text-gray-600 dark:text-gray-300">
            <FunnelIcon className="h-6 w-6 cursor-pointer" />
            <LightBulbIcon className="h-6 w-6 cursor-pointer" />
            <Cog6ToothIcon className="h-6 w-6 cursor-pointer" />
            <BellIcon className="h-6 w-6 cursor-pointer" />
            <StarIcon className="h-6 w-6 cursor-pointer" />
            <MagnifyingGlassCircleIcon className="h-6 w-6 cursor-pointer" />
            <UserIcon className="h-6 w-6 cursor-pointer" />
            <LockClosedIcon className="h-6 w-6 cursor-pointer" />
            <AcademicCapIcon className="h-6 w-6 cursor-pointer" />
            <PlayCircleIcon className="h-6 w-6 cursor-pointer" />

            {/* Divider */}
            <div className="h-6 w-px bg-gray-300"></div>

            {/* Logout */}
            <div className="flex items-center gap-2 cursor-pointer">
              <ArrowRightOnRectangleIcon className="h-6 w-6" />
              <span className="text-sm font-semibold">LOGOUT</span>
            </div>
          </div>
        </div>
      </div>

      {/* Red menu row */}
      <div className="bg-red-600">
        <nav className="mx-auto flex max-w-7xl flex-wrap">
          {menuItems.map((item) => (
            <button
              key={item}
              className="px-5 py-3 text-sm font-semibold text-white hover:bg-red-700"
            >
              {item}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
}
