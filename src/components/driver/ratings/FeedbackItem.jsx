"use client";

export default function FeedbackItem({ item }) {
  const renderStars = (count) => (
    <div className="flex">
      {[...Array(5)].map((_, i) => (
        <span key={i} className={`text-lg ${i < count ? 'text-yellow-400' : 'text-gray-300'}`}>⭐</span>
      ))}
    </div>
  );

  return (
    <div className="p-4 border border-gray-200 rounded-lg">
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center">👤</div>
          <div>
            <p className="font-semibold text-gray-900">{item.name}</p>
            <div className="flex items-center space-x-2">
              {renderStars(item.rating)}
              <span className="text-xs text-gray-500">{item.date}</span>
            </div>
          </div>
        </div>
      </div>
      <p className="mt-3 text-gray-700">{item.comment}</p>
    </div>
  );
}


