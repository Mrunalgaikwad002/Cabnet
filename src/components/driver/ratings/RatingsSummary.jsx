"use client";

export default function RatingsSummary({ average, total, distribution }) {
  const renderStars = (count) => (
    <div className="flex">
      {[...Array(5)].map((_, i) => (
        <span key={i} className={`text-lg ${i < count ? 'text-yellow-400' : 'text-gray-300'}`}>⭐</span>
      ))}
    </div>
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
      <div className="text-center">
        <p className="text-sm text-gray-600 mb-1">Average Rating</p>
        <p className="text-4xl font-bold text-gray-900">{average}</p>
        <div className="mt-2 flex items-center justify-center">{renderStars(Math.round(average))}</div>
        <p className="text-sm text-gray-600 mt-2">{total} ratings</p>
      </div>
      <div className="md:col-span-2 space-y-2">
        {[5,4,3,2,1].map((star) => {
          const value = distribution[star] || 0;
          const pct = total ? Math.round((value / total) * 100) : 0;
          return (
            <div key={star} className="flex items-center space-x-3">
              <span className="w-10 text-sm text-gray-700">{star}★</span>
              <div className="flex-1 h-3 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-yellow-400" style={{ width: `${pct}%` }} />
              </div>
              <span className="w-12 text-sm text-gray-600">{pct}%</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}


