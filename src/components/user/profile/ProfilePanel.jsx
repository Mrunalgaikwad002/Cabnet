"use client";
import BasicInfo from './BasicInfo';
import AccountSettings from './AccountSettings';
import RidePreferences from './RidePreferences';
import SecurityPrivacy from './SecurityPrivacy';
import SupportAbout from './SupportAbout';

export default function ProfilePanel() {
  return (
    <div className="space-y-6">
      <BasicInfo />
      <AccountSettings />
      <RidePreferences />
      <SecurityPrivacy />
      <SupportAbout />
    </div>
  );
}


