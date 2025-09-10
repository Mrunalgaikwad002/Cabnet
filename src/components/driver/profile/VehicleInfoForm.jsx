"use client";

export default function VehicleInfoForm({ profile, onChange }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Vehicle Model</label>
        <input name="vehicleModel" value={profile.vehicleModel} onChange={onChange} className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">License Plate</label>
        <input name="licensePlate" value={profile.licensePlate} onChange={onChange} className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">RC Number</label>
        <input name="rcNumber" value={profile.rcNumber} onChange={onChange} className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">License Number</label>
        <input name="licenseNumber" value={profile.licenseNumber} onChange={onChange} className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Insurance Number</label>
        <input name="insuranceNumber" value={profile.insuranceNumber} onChange={onChange} className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500" />
      </div>
    </div>
  );
}


