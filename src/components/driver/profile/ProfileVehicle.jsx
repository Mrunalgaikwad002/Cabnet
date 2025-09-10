"use client";

import { useState } from 'react';
import PersonalInfoForm from './PersonalInfoForm';
import VehicleInfoForm from './VehicleInfoForm';

export default function ProfileVehicle() {
	const [profile, setProfile] = useState({
		name: 'Bob Driver',
		email: 'bob@example.com',
		phone: '+91 98765 43210',
		vehicleModel: 'Hyundai i20',
		licensePlate: 'MH 12 AB 1234',
		rcNumber: 'RC-987654',
		licenseNumber: 'DL-0420190012345',
		insuranceNumber: 'INS-1234567890'
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setProfile((prev) => ({ ...prev, [name]: value }));
	};

	const handleSave = () => {
		// Integrate with backend later
		alert('Profile saved');
	};

	return (
		<div className="space-y-6">
			<div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
				<h2 className="text-2xl font-bold text-gray-900 mb-6">Profile & Vehicle Info</h2>

				<PersonalInfoForm profile={profile} onChange={handleChange} />
				<div className="my-6" />
				<VehicleInfoForm profile={profile} onChange={handleChange} />

				<div className="mt-6 flex justify-end">
					<button onClick={handleSave} className="bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700 transition-colors">Save Changes</button>
				</div>
			</div>
		</div>
	);
}


