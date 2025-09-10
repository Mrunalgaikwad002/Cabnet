'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import DriverSidebar from './layout/Sidebar';
import DriverHeader from './layout/Header';

// Import driver components
import LiveRideRequests from './requests/LiveRideRequests';
import CurrentRide from './ride/CurrentRide';
import EarningsOverview from './earnings/EarningsOverview';
import RideHistory from './history/RideHistory';
import RatingsFeedback from './ratings/RatingsFeedback';
import ProfileVehicle from './profile/ProfileVehicle';
import SupportHelp from './support/SupportHelp';

export default function DriverDashboard() {
  const [activeNav, setActiveNav] = useState('home');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showProfile, setShowProfile] = useState(false);
  const [isOnline, setIsOnline] = useState(false);
  const [driverName, setDriverName] = useState('Driver');
  const [email, setEmail] = useState('');

  const router = useRouter();

  useEffect(() => {
    // Get driver data from localStorage
    const storedDriver = localStorage.getItem('driver');
    if (storedDriver) {
      const driverData = JSON.parse(storedDriver);
      setDriverName(driverData.displayName || driverData.firstName || 'Driver');
      setEmail(driverData.email || '');
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('driver');
    localStorage.removeItem('authToken');
    router.push('/login');
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  const sidebarItems = [
    { key: 'home', label: 'Home', icon: '🏠' },
    { key: 'requests', label: 'Live Requests', icon: '🚖' },
    { key: 'current', label: 'Current Ride', icon: '📍' },
    { key: 'earnings', label: 'Earnings', icon: '💰' },
    { key: 'history', label: 'Ride History', icon: '📜' },
    { key: 'ratings', label: 'Ratings', icon: '⭐' },
    { key: 'profile', label: 'Profile', icon: '👤' },
    { key: 'support', label: 'Support', icon: '❓' }
  ];

  const renderContent = () => {
    switch (activeNav) {
      case 'home':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Welcome back, {driverName}!</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-teal-50 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-teal-600">Today's Earnings</p>
                      <p className="text-2xl font-bold text-teal-900">₹1,250</p>
                    </div>
                    <div className="text-3xl">💰</div>
                  </div>
                </div>
                <div className="bg-blue-50 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-blue-600">Rides Completed</p>
                      <p className="text-2xl font-bold text-blue-900">12</p>
                    </div>
                    <div className="text-3xl">🚖</div>
                  </div>
                </div>
                <div className="bg-yellow-50 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-yellow-600">Rating</p>
                      <p className="text-2xl font-bold text-yellow-900">4.8</p>
                    </div>
                    <div className="text-3xl">⭐</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <button 
                  onClick={() => setActiveNav('requests')}
                  className="p-4 bg-teal-50 hover:bg-teal-100 rounded-lg text-center transition-colors"
                >
                  <div className="text-2xl mb-2">🚖</div>
                  <div className="text-sm font-medium text-teal-900">Live Requests</div>
                </button>
                <button 
                  onClick={() => setActiveNav('current')}
                  className="p-4 bg-blue-50 hover:bg-blue-100 rounded-lg text-center transition-colors"
                >
                  <div className="text-2xl mb-2">📍</div>
                  <div className="text-sm font-medium text-blue-900">Current Ride</div>
                </button>
                <button 
                  onClick={() => setActiveNav('earnings')}
                  className="p-4 bg-green-50 hover:bg-green-100 rounded-lg text-center transition-colors"
                >
                  <div className="text-2xl mb-2">💰</div>
                  <div className="text-sm font-medium text-green-900">Earnings</div>
                </button>
                <button 
                  onClick={() => setActiveNav('history')}
                  className="p-4 bg-purple-50 hover:bg-purple-100 rounded-lg text-center transition-colors"
                >
                  <div className="text-2xl mb-2">📜</div>
                  <div className="text-sm font-medium text-purple-900">History</div>
                </button>
              </div>
            </div>
          </div>
        );
      case 'requests':
        return <LiveRideRequests onAccept={() => setActiveNav('current')} />;
      case 'current':
        return <CurrentRide onViewEarnings={() => setActiveNav('earnings')} />;
      case 'earnings':
        return <EarningsOverview />;
      case 'history':
        return <RideHistory />;
      case 'ratings':
        return <RatingsFeedback />;
      case 'profile':
        return <ProfileVehicle />;
      case 'support':
        return <SupportHelp />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-white flex">
      {/* Sidebar */}
      <DriverSidebar open={sidebarOpen} setOpen={setSidebarOpen} activeNav={activeNav} onNavigate={setActiveNav} isOnline={isOnline} setIsOnline={setIsOnline} driverName={driverName} email={email} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Header */}
        <DriverHeader driverName={driverName} email={email} showProfile={showProfile} setShowProfile={setShowProfile} onLogout={handleLogout} />

        {/* Main Content Area */}
        <main className="flex-1 p-6 overflow-y-auto max-w-7xl mx-auto w-full space-y-10">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}