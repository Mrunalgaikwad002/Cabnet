'use client';

import { useState } from 'react';
import RatingsSummary from './RatingsSummary';
import FeedbackItem from './FeedbackItem';

export default function RatingsFeedback() {
	const [summary] = useState({
		average: 4.8,
		total: 236,
		distribution: { 5: 170, 4: 52, 3: 10, 2: 3, 1: 1 }
	});

	const [feedback] = useState([
		{ id: 1, name: 'John Doe', rating: 5, comment: 'Great ride, very polite driver!', date: '2024-01-15' },
		{ id: 2, name: 'Jane Smith', rating: 4, comment: 'Smooth driving and clean car.', date: '2024-01-14' },
		{ id: 3, name: 'Mike Johnson', rating: 5, comment: 'On time and helpful with luggage.', date: '2024-01-13' },
		{ id: 4, name: 'Sarah Wilson', rating: 5, comment: 'Friendly and professional.', date: '2024-01-12' },
	]);

	return (
		<div className="space-y-6 text-sm">
			<div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
				<h2 className="text-xl font-semibold text-gray-900 mb-4">Ratings & Feedback</h2>
				<RatingsSummary average={summary.average} total={summary.total} distribution={summary.distribution} />
			</div>

			<div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
				<h3 className="text-base font-semibold text-gray-900 mb-3">Recent Feedback</h3>
				<div className="space-y-4">
					{feedback.map(item => (
						<FeedbackItem key={item.id} item={item} />
					))}
				</div>
			</div>
		</div>
	);
}


