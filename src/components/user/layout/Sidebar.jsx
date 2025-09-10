'use client';

import { useState } from 'react';

export default function UserSidebar({ open, setOpen, activeNav, onNavigate }) {
	const items = [
		{ key: 'home', label: 'Home', icon: '🏠' },
		{ key: 'book', label: 'Book a ride', icon: '🚖' },
		{ key: 'map', label: 'Live tracking', icon: '📍' },
		{ key: 'history', label: 'Ride history', icon: '📜' },
		{ key: 'payments', label: 'Payments', icon: '💳' },
		{ key: 'profile', label: 'Profile', icon: '👤' },
	];

	return (
		<aside className={`fixed top-0 left-0 h-screen ${open ? 'w-64' : 'w-16'} transition-all duration-200 z-20`}>
			<div className="h-full bg-[#113A4A] flex flex-col">
				<div className="flex items-center justify-between px-3 py-3 border-b border-[#165064]">
					{open && <div className="text-white text-base font-semibold">User Dashboard</div>}
					<button onClick={() => setOpen(!open)} aria-label={open ? 'Close sidebar' : 'Open sidebar'} className="p-2 rounded-lg hover:bg-[#165064] text-white">
						<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"/></svg>
					</button>
				</div>
				<ul className="flex-1 p-3 space-y-1">
					{items.map((s) => (
						<li key={s.key}>
							<button onClick={() => onNavigate(s.key)} className={`w-full flex items-center ${open ? 'justify-start px-3' : 'justify-center'} py-2 rounded-md transition-colors ${activeNav === s.key ? 'bg-[#165064] text-white' : 'text-white/90 hover:bg-[#165064]'}` }>
								<span className="text-lg mr-3">{s.icon}</span>
								{open && <span className="text-base">{s.label}</span>}
							</button>
						</li>
					))}
				</ul>
			</div>
		</aside>
	);
}


