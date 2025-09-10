'use client';

export default function SupportHelp() {
	return (
		<div className="space-y-6">
			<div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
				<h2 className="text-2xl font-bold text-gray-900 mb-6">Support & Help</h2>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					<div className="bg-gray-50 rounded-lg p-4">
						<h3 className="font-semibold text-gray-900 mb-2">Contact Admin</h3>
						<p className="text-gray-600 mb-3">Need assistance? Reach out to our support team.</p>
						<button className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors">Email Support</button>
					</div>
					<div className="bg-gray-50 rounded-lg p-4">
						<h3 className="font-semibold text-gray-900 mb-2">FAQs</h3>
						<ul className="list-disc pl-5 text-gray-700 space-y-1">
							<li>How to go online/offline?</li>
							<li>How are fares calculated?</li>
							<li>How are incentives paid?</li>
							<li>What if a rider cancels?</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
}


