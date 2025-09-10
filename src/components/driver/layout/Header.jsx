'use client';

export default function DriverHeader({ driverName, email, showProfile, setShowProfile, onLogout }) {
	return (
		<header className="sticky top-0 z-10 bg-white/90 backdrop-blur border-b border-gray-200">
			<div className="px-6 py-3 flex items-center justify-between">
				<div className="flex items-center gap-2">
					<span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-black text-white font-bold">C</span>
					<span className="text-lg font-semibold tracking-tight text-gray-900">CabNet</span>
				</div>
				<div className="flex items-center gap-4 relative">
					<button className="relative inline-flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white hover:bg-gray-50" aria-label="Notifications">
						<span className="text-lg">🔔</span>
						<span className="absolute -top-1 -right-1 h-5 min-w-[20px] rounded-full bg-black px-1 text-[10px] font-semibold text-white flex items-center justify-center">3</span>
					</button>
					<span className="text-sm text-gray-700">Welcome, {driverName}</span>
					<div className="relative">
						<button onClick={() => setShowProfile((p)=>!p)} className="h-9 w-9 rounded-full overflow-hidden border border-gray-300">
							<img src={`https://i.pravatar.cc/36?u=${encodeURIComponent(email || driverName || 'driver')}`} alt="Driver" width={36} height={36} />
						</button>
						{showProfile && (
							<div className="absolute right-0 top-12 w-64 rounded-xl border border-gray-200 bg-white shadow-md p-3 text-sm z-10">
								<div className="flex items-center gap-3">
									<div className="h-10 w-10 rounded-full overflow-hidden border border-gray-200">
										<img src={`https://i.pravatar.cc/40?u=${encodeURIComponent(email || driverName || 'driver')}`} alt="Driver" width={40} height={40} />
									</div>
									<div>
										<div className="font-semibold text-gray-900">{driverName}</div>
										<div className="text-xs text-gray-600 break-all">{email || '—'}</div>
									</div>
								</div>
								<hr className="my-3 border-gray-200" />
								<button onClick={onLogout} className="mt-2 w-full text-left rounded-md bg-red-600 text-white px-3 py-2 text-sm font-medium hover:bg-red-700">Log out</button>
							</div>
						)}
					</div>
				</div>
			</div>
		</header>
	);
}


