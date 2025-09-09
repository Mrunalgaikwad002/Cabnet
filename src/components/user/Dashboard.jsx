"use client";

import { useEffect, useState } from 'react';
import Image from 'next/image';
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
    { key: 'home', label: 'Home' },
    { key: 'book', label: 'Book a ride' },
    { key: 'map', label: 'Live tracking' },
    { key: 'history', label: 'Ride history' },
    { key: 'payments', label: 'Payments' },
    { key: 'profile', label: 'Profile' },
  ];

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
            <div className="mt-4"><LiveTracking active={!!activeRide} ride={activeRide} /></div>
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
      <aside
        className={`fixed top-0 left-0 h-screen w-64 transform transition-transform duration-200 z-20 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="relative h-full bg-[#113A4A] p-5">
          <button onClick={() => setOpen(!open)} aria-label={open ? 'Close sidebar' : 'Open sidebar'} className="absolute -right-5 top-4 z-30 rounded-full bg-white shadow-md border border-gray-200 p-1">
            <Image src="/sidebar-toggle.svg" alt="Toggle sidebar" width={28} height={28} />
          </button>
          <div className="text-white text-base">User Dashboard</div>
          <ul className="mt-5 space-y-1 text-base">
            {items.map((s) => (
              <li key={s.key}>
                <button onClick={() => setActiveNav(s.key)} className={`w-full text-left rounded-md px-3 py-2 transition-colors ${activeNav === s.key ? 'bg-[#165064] text-white' : 'text-white/90 hover:bg-[#165064]'}`}>{s.label}</button>
              </li>
            ))}
          </ul>
        </div>
      </aside>

      {/* Main content wrapper */}
      <div className={`min-h-screen transition-[padding] duration-200 ${open ? 'pl-64' : 'pl-0'}`}>
        {paymentStatus && (
          <PaymentToast inline status={paymentStatus} onClose={() => setPaymentStatus(null)} />
        )}
        {rideToast && (
          <PaymentToast inline status="success" onClose={() => setRideToast(null)} />
        )}
        <div className="sticky top-0 z-10 bg-white/90 backdrop-blur border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-black text-white font-bold">C</span>
              <span className="text-lg font-semibold tracking-tight text-gray-900">CabNet</span>
            </div>
            <div className="flex items-center gap-4 relative">
              <button onClick={() => setShowNotif((p) => !p)} className="relative inline-flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white hover:bg-gray-50" aria-label="Notifications">
                <span className="text-lg">🔔</span>
                {unread > 0 && (<span className="absolute -top-1 -right-1 h-5 min-w-[20px] rounded-full bg-black px-1 text-[10px] font-semibold text-white flex items-center justify-center">{unread}</span>)}
              </button>
              {showNotif && (
                <div className="absolute right-14 top-12 w-72 rounded-xl border border-gray-200 bg-white shadow-md p-3 text-sm">
                  <div className="font-semibold text-gray-900">Notifications</div>
                  <ul className="mt-2 space-y-2">
                    <li className="text-gray-700">Your promo SAVE20 is live — tap to apply.</li>
                    <li className="text-gray-700">Driver Rahul accepted your last request.</li>
                    <li className="text-gray-700">₹/ $120 charged for ride #12345.</li>
                  </ul>
                  <button className="mt-3 w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-gray-800 hover:bg-gray-50 text-xs">View all</button>
                </div>
              )}
              <span className="text-sm text-gray-700">{greeting}, {displayName}</span>
              <button onClick={()=>setShowProfile((p)=>!p)} className="h-9 w-9 rounded-full overflow-hidden border border-gray-300">
                <img src={`https://i.pravatar.cc/36?u=${encodeURIComponent(email || displayName || 'user')}`} alt="User" width={36} height={36} />
              </button>
              {showProfile && (
                <div className="absolute right-0 top-12 w-64 rounded-xl border border-gray-200 bg-white shadow-md p-3 text-sm z-10">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full overflow-hidden border border-gray-200">
                      <img src={`https://i.pravatar.cc/40?u=${encodeURIComponent(email || displayName || 'user')}`} alt="User" width={40} height={40} />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">{displayName || 'User'}</div>
                      <div className="text-xs text-gray-600 break-all">{email || '—'}</div>
                    </div>
                  </div>
                  <hr className="my-3 border-gray-200" />
                  <button onClick={()=>{ if (typeof window !== 'undefined') { localStorage.clear(); sessionStorage.clear(); window.location.href = '/login'; } }} className="w-full text-left rounded-md bg-red-600 text-white px-3 py-2 text-sm font-medium hover:bg-red-700">Log out</button>
                </div>
              )}
            </div>
          </div>
        </div>

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


