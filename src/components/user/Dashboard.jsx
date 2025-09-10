"use client";

import { useEffect, useState } from 'react';
import Image from 'next/image';
import UserSidebar from './layout/Sidebar';
import UserHeader from './layout/Header';
import LiveTracking from './tracking/LiveTracking';
import PaymentsPanel from './payments/PaymentsPanel';
import ProfilePanel from './profile/ProfilePanel';
import { RideHistoryList, RideHistoryDetail } from './history';
import BookingForm from './booking/BookingForm';
import PaymentToast from './notifications/PaymentToast';

export default function UserDashboard() {
  const [open, setOpen] = useState(true);
  const [displayName, setDisplayName] = useState('');
  const [greeting, setGreeting] = useState('Welcome');
  const [unread, setUnread] = useState(3);
  const [showNotif, setShowNotif] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [activeNav, setActiveNav] = useState('home');
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [activeRide, setActiveRide] = useState(null);
  const [rideToast, setRideToast] = useState(null);
  const [email, setEmail] = useState('');
  const [rides, setRides] = useState([
    { id: 'r1', pickup: 'Pune', drop: 'Mumbai', date: '2025-09-01 10:20', duration: '2h 45m', vehicle: 'Sedan', fare: 450, payment: 'Cash', status: 'Completed', route: [[18.52,73.85],[18.6,73.9],[18.9,73.95]], driver: { name: 'Rahul', rating: 4.9, plate: 'MH12 AB 1234' }, invoice: { base: 100, distance: 320, tax: 50, discount: 20 } },
  ]);
  const [selectedRide, setSelectedRide] = useState(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const name = localStorage.getItem('displayName');
      setDisplayName(name || 'User');
      const em = localStorage.getItem('currentEmail');
      setEmail(em || '');
    }
    const hour = new Date().getHours();
    const g = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';
    setGreeting(g);
    // read ?payment= from URL
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const p = params.get('payment');
      if (p) {
        setPaymentStatus(p);
        // Remove the payment param so refresh doesn't show the toast again
        params.delete('payment');
        const newQuery = params.toString();
        const newUrl = `${window.location.pathname}${newQuery ? `?${newQuery}` : ''}${window.location.hash}`;
        window.history.replaceState({}, '', newUrl);
      }
    }
  }, []);

  const items = [
    { key: 'home', label: 'Home', icon: '🏠' },
    { key: 'book', label: 'Book a ride', icon: '🚖' },
    { key: 'map', label: 'Live tracking', icon: '📍' },
    { key: 'history', label: 'Ride history', icon: '📜' },
    { key: 'payments', label: 'Payments', icon: '💳' },
    { key: 'profile', label: 'Profile', icon: '👤' },
  ];

  const handlePayNow = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/payments/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: 20000, // ₹200 in paise
          currency: 'inr',
          description: 'Ride payment'
        })
      });
      
      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert('Payment error: ' + (data.error || 'Unable to start payment'));
      }
    } catch (error) {
      alert('Payment error: ' + error.message);
    }
  };

  const renderContent = () => {
    switch (activeNav) {
      case 'book':
        return (
          <section className="rounded-2xl bg-white p-6 shadow-sm">
            <div className="text-xl font-semibold text-gray-900">📍 Book a Ride</div>
            <div className="mt-4"><BookingForm onRideConfirmed={(ride)=>{ setActiveRide(ride); }} onRideToast={() => setRideToast('success')} onGoLive={() => setActiveNav('map')} /></div>
          </section>
        );
      case 'map':
        return (
          <section className="rounded-2xl bg-white p-6 shadow-sm">
            <div className="text-xl font-semibold text-gray-900">🌍 Live tracking</div>
            <div className="mt-4"><LiveTracking active={!!activeRide} ride={activeRide} onPayNow={handlePayNow} /></div>
          </section>
        );
      case 'history':
        return (
          <section className="rounded-2xl bg-white p-6 shadow-sm">
            <div className="text-xl font-semibold text-gray-900">📜 Ride history</div>
            <div className="mt-4">
              {!selectedRide ? (
                <RideHistoryList rides={rides} onSelect={(r)=>setSelectedRide(r)} />
              ) : (
                <RideHistoryDetail ride={selectedRide} onClose={()=>setSelectedRide(null)} onSubmitReview={({ rideId, rating, text }) => {
                  // For now, just log; later can send to backend
                  console.log('review', { rideId, rating, text });
                  setSelectedRide(null);
                }} />
              )}
            </div>
          </section>
        );
      case 'payments':
        return (
          <section className="rounded-2xl bg-white p-6 shadow-sm">
            <div className="text-xl font-semibold text-gray-900">💳 Payments</div>
            <div className="mt-4">
              <PaymentsPanel />
            </div>
          </section>
        );
      case 'profile':
        return (
          <section className="rounded-2xl bg-white p-6 shadow-sm">
            <div className="text-xl font-semibold text-gray-900">👤 Profile</div>
            <div className="mt-4"><ProfilePanel /></div>
          </section>
        );
      
      case 'home':
      default:
        return (
          <>
            <section className="rounded-2xl bg-white p-6 shadow-sm">
              <div className="text-xl font-semibold text-gray-900">🚖 Upcoming / Active Ride</div>
              <div className="mt-4 grid gap-6 md:grid-cols-2">
                <div className="rounded-2xl p-5 shadow-sm bg-gradient-to-br from-amber-50 to-blue-50">
                  {!activeRide ? (
                    <>
                      <div className="flex flex-col items-start gap-3">
                        <div className="text-4xl">🚕</div>
                        <div className="text-base font-semibold text-gray-900">No active ride right now — ready for your next trip?</div>
                        <button className="inline-flex items-center justify-center rounded-md bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-900" onClick={() => setActiveNav('book')}>Book a Ride</button>
                      </div>
                      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                        <div className="rounded-xl border border-gray-200 bg-white/70 p-3">
                          <div className="font-medium text-gray-900">📍 Saved Locations</div>
                          <div className="text-gray-700 mt-1">Home • Work • Recent</div>
                        </div>
                        <div className="rounded-xl border border-gray-200 bg-white/70 p-3">
                          <div className="font-medium text-gray-900">🔥 Promotions</div>
                          <div className="text-gray-700 mt-1">Get 20% off your first ride</div>
                        </div>
                      </div>
                      <div className="mt-4 rounded-xl border border-gray-200 bg-white/70 p-3 text-sm">
                        <div className="font-medium text-gray-900">Last ride</div>
                        <div className="text-gray-700 mt-1">Pune → Mumbai • ₹450</div>
                      </div>
                    </>
                  ) : (
                    <div className="space-y-3">
                      <div className="text-base font-semibold text-gray-900">Active ride</div>
                      <div className="grid gap-3 sm:grid-cols-2 text-sm">
                        <div className="rounded-xl border border-gray-200 bg-white/70 p-3">
                          <div className="font-medium text-gray-900">From</div>
                          <div className="text-gray-700 mt-1">{activeRide.pickup}</div>
                        </div>
                        <div className="rounded-xl border border-gray-200 bg-white/70 p-3">
                          <div className="font-medium text-gray-900">To</div>
                          <div className="text-gray-700 mt-1">{activeRide.drop}</div>
                        </div>
                        <div className="rounded-xl border border-gray-200 bg-white/70 p-3 sm:col-span-2">
                          <div className="font-medium text-gray-900">Status</div>
                          <div className="text-gray-700 mt-1">{activeRide.status}</div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div className="rounded-2xl bg-white p-5 shadow-sm">
                  <LiveTracking mode="preview" />
                  <div className="mt-2 text-xs text-gray-600">Mini map preview</div>
                </div>
              </div>
            </section>

            <section className="rounded-2xl bg-white p-6 shadow-sm">
              <div className="text-xl font-semibold text-gray-900">⚡ Quick Actions</div>
              <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                <button className="rounded-2xl bg-white p-5 text-left shadow-sm hover:shadow-md" onClick={() => setActiveNav('book')}>
                  <div className="text-base font-semibold text-gray-900">🚖 Book a Ride</div>
                  <div className="mt-1 text-sm text-gray-600">Start a new booking</div>
                </button>
                <div className="rounded-2xl bg-white p-5 shadow-sm">
                  <div className="text-base font-semibold text-gray-900">🏠 Saved Locations</div>
                  <div className="mt-2 text-sm text-gray-700">Home • Work • Recent</div>
                </div>
                <div className="rounded-2xl bg-white p-5 shadow-sm">
                  <div className="text-base font-semibold text-gray-900">📜 Ride History</div>
                  <div className="mt-2 text-sm text-gray-700">See recent rides</div>
                </div>
                <div className="rounded-2xl bg-white p-5 shadow-sm">
                  <div className="text-base font-semibold text-gray-900">💳 Wallet / Payments</div>
                  <div className="mt-2 text-sm text-gray-700">Balance: —</div>
                </div>
              </div>
            </section>

            <section className="rounded-2xl bg-blue-50 text-gray-900 p-5 flex items-center justify-between border border-blue-100">
              <div>
                <div className="text-base font-semibold">Limited-time offer</div>
                <div className="text-sm opacity-90">Use code <span className="font-mono bg-white px-1.5 py-0.5 rounded border border-blue-100">SAVE20</span> to get 20% off up to ₹/ $50.</div>
              </div>
              <button className="rounded-md bg-black text-white px-4 py-2 text-sm font-medium hover:bg-gray-900" onClick={() => setActiveNav('book')}>Apply now</button>
            </section>
          </>
        );
    }
  };

  return (
    <div className="w-full bg-white min-h-screen text-foreground">
      {/* Sidebar */}
      <UserSidebar open={open} setOpen={setOpen} activeNav={activeNav} onNavigate={setActiveNav} />

      {/* Main content wrapper */}
      <div className={`min-h-screen transition-[padding] duration-200 ${open ? 'pl-64' : 'pl-16'}`}>
        {paymentStatus && (
          <PaymentToast inline status={paymentStatus} onClose={() => setPaymentStatus(null)} />
        )}
        {rideToast && (
          <PaymentToast inline status="success" onClose={() => setRideToast(null)} />
        )}
        <UserHeader greeting={greeting} displayName={displayName} email={email} unread={unread} showNotif={showNotif} setShowNotif={setShowNotif} showProfile={showProfile} setShowProfile={setShowProfile} />

        <main className="max-w-7xl mx-auto px-4 py-8 space-y-10">
          {renderContent()}
          {activeNav === 'home' && activeRide && (
            <section className="rounded-2xl bg-white p-6 shadow-sm">
              <div className="text-xl font-semibold text-gray-900">🚖 Active Ride</div>
              <div className="mt-3 grid gap-4 sm:grid-cols-2">
                <div className="rounded-xl border border-gray-200 p-3">
                  <div className="text-sm text-gray-700">From</div>
                  <div className="font-medium text-gray-900">{activeRide.pickup}</div>
                </div>
                <div className="rounded-xl border border-gray-200 p-3">
                  <div className="text-sm text-gray-700">To</div>
                  <div className="font-medium text-gray-900">{activeRide.drop}</div>
                </div>
              </div>
              <div className="mt-3 text-sm text-gray-700">Status: {activeRide.status}</div>
            </section>
          )}
        </main>
      </div>
    </div>
  );
}



