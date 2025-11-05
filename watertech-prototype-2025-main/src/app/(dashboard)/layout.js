'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { RiDashboardLine, RiWaterFlashLine, RiChat3Line, RiFileChartLine, 
         RiSettings4Line, RiLogoutBoxLine } from 'react-icons/ri';
import BRAND from '@/utils/brandConfig';

export default function DashboardLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const pathname = usePathname();

  const navigation = [
    {
      name: 'Dashboard',
      href: '/dashboard',
      icon: RiDashboardLine,
    },
    {
      name: 'Water Analysis',
      href: '/dashboard/water-analysis',
      icon: RiWaterFlashLine,
    },
    {
      name: 'Advisory Assistant',
      href: '/dashboard/advisory',
      icon: RiChat3Line,
    },
    {
      name: 'Reports & History',
      href: '/dashboard/reports',
      icon: RiFileChartLine,
    },
    {
      name: 'Settings',
      href: '/dashboard/settings',
      icon: RiSettings4Line,
    },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside 
        className={`${
          isSidebarOpen ? 'translate-x-0 w-64' : '-translate-x-full w-0'
        } fixed inset-y-0 left-0 z-50 flex flex-col bg-white shadow-lg transition-all duration-300 lg:static lg:translate-x-0 lg:w-64`}
      >
        {/* Logo and brand */}
        <div className="flex h-16 items-center justify-between border-b px-4">
          <Link href="/dashboard" className="flex items-center space-x-3">
            <Image
              src={BRAND.logo}
              alt={BRAND.name}
              width={120}
              height={40}
              className="h-8 w-auto"
            />
          </Link>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="rounded-md p-1.5 text-gray-500 hover:bg-gray-100 lg:hidden"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 px-2 py-4">
          {navigation.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`group flex items-center rounded-md px-3 py-2 text-sm font-medium ${
                  isActive
                    ? 'bg-brand-light text-brand-primary'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <item.icon
                  className={`mr-3 h-5 w-5 flex-shrink-0 ${
                    isActive ? 'text-brand-primary' : 'text-gray-500'
                  }`}
                  aria-hidden="true"
                />
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* User profile section */}
        <div className="border-t p-4">
          <div className="flex items-center">
            <div className="h-10 w-10 flex-shrink-0 overflow-hidden rounded-full bg-gray-200">
              <Image
                src="https://ui-avatars.com/api/?name=E+M&background=0D8ABC&color=fff"
                alt="User profile"
                width={40}
                height={40}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900">Eldar Mammadov</p>
              <p className="text-xs text-gray-500">Araz Valley Farm</p>
            </div>
            <Link
              href="/login"
              className="ml-auto text-gray-500 hover:text-gray-700"
            >
              <RiLogoutBoxLine className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top header */}
        <header className="bg-white shadow-sm">
          <div className="flex h-16 items-center justify-between px-4">
            <div className="flex items-center">
              {/* Mobile menu button */}
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="rounded-md p-1.5 text-gray-500 hover:bg-gray-100 lg:hidden"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <h1 className="ml-2 text-lg font-semibold text-gray-900 lg:ml-0">
                {pathname === '/dashboard'
                  ? 'Dashboard'
                  : pathname.includes('/water-analysis')
                  ? 'Water Analysis'
                  : pathname.includes('/advisory')
                  ? 'Advisory Assistant'
                  : pathname.includes('/reports')
                  ? 'Reports & History'
                  : pathname.includes('/map')
                  ? 'Farm Map'
                  : pathname.includes('/settings')
                  ? 'Settings'
                  : 'Dashboard'}
              </h1>
            </div>

            {/* Header right side */}
            <div className="flex items-center space-x-4">
              {/* Notifications */}
              <button className="relative rounded-md p-1.5 text-gray-500 hover:bg-gray-100">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500"></span>
              </button>

              {/* Help */}
              <button className="rounded-md p-1.5 text-gray-500 hover:bg-gray-100">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </button>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-auto bg-gray-50 p-4">
          {children}
        </main>
      </div>
    </div>
  );
}
