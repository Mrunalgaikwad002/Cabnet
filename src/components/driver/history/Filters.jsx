"use client";

export default function Filters({ selected, onChange }) {
  const filters = [
    { key: 'all', label: 'All Rides' },
    { key: 'today', label: 'Today' },
    { key: 'week', label: 'This Week' },
    { key: 'month', label: 'This Month' }
  ];

  return (
    <div className="flex space-x-2">
      {filters.map((filter) => (
        <button
          key={filter.key}
          onClick={() => onChange(filter.key)}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            selected === filter.key ? 'bg-teal-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
}


