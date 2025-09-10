'use client';

export default function DriverSidebar({ open, setOpen, activeNav, onNavigate, isOnline, setIsOnline, driverName, email }) {
	const items = [
		{ key: 'home', label: 'Home', icon: '🏠' },
		{ key: 'requests', label: 'Live Requests', icon: '🚖' },
		{ key: 'current', label: 'Current Ride', icon: '📍' },
		{ key: 'earnings', label: 'Earnings', icon: '💰' },
		{ key: 'history', label: 'Ride History', icon: '📜' },
		{ key: 'ratings', label: 'Ratings', icon: '⭐' },
		{ key: 'profile', label: 'Profile', icon: '👤' },
		{ key: 'support', label: 'Support', icon: '❓' }
	];

	return (
		<div className={`${open ? 'w-64' : 'w-16'} bg-[#113A4A] text-white shadow-lg transition-all duration-300 flex flex-col`}>
			<div className="p-4 border-b border-[#165064]">
				<div className="flex items-center justify-between">
					{open && (<h1 className="text-base font-semibold text-white">Driver Dashboard</h1>)}
					<button onClick={() => setOpen(!open)} className="p-2 hover:bg-[#165064] rounded-lg transition-colors text-white">
						<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"/></svg>
					</button>
				</div>
			</div>
			<div className="p-4 border-b border-[#165064]">
				<div className="flex items-center justify-between">
					{open && (<span className="text-sm font-medium text-white/90">Status</span>)}
					<button onClick={() => setIsOnline(!isOnline)} className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${isOnline ? 'bg-[#165064]' : 'bg-[#0c2a36]'}`}>
						<span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${isOnline ? 'translate-x-6' : 'translate-x-1'}`} />
					</button>
				</div>
				{open && (<p className="text-xs text-white/80 mt-1">{isOnline ? 'Online - Available for rides' : 'Offline - Not accepting rides'}</p>)}
			</div>
			<nav className="flex-1 p-4">
				<ul className="space-y-2">
					{items.map((item)=> (
						<li key={item.key}>
							<button onClick={() => onNavigate(item.key)} className={`w-full flex items-center px-3 py-2 rounded-lg text-left transition-colors ${activeNav === item.key ? 'bg-[#165064] text-white font-medium' : 'text-white/90 hover:bg-[#165064]'}`}>
								<span className="text-lg mr-3">{item.icon}</span>
								{open && <span className="text-sm">{item.label}</span>}
							</button>
						</li>
					))}
				</ul>
			</nav>
			<div className="p-4 border-t border-[#165064]">
				<div className="flex items-center space-x-3">
					<div className="relative">
						<img src={`https://i.pravatar.cc/40?u=${encodeURIComponent(email || driverName || 'driver')}`} alt="Driver" className="h-10 w-10 rounded-full" />
						<div className={`absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-2 border-white ${isOnline ? 'bg-green-500' : 'bg-gray-400'}`} />
					</div>
					{open && (
						<div className="flex-1 min-w-0">
							<p className="text-sm font-medium text-white truncate">{driverName}</p>
							<p className="text-xs text-white/80 truncate">{email}</p>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}


