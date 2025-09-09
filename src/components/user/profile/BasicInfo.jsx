"use client";
import { useEffect, useRef, useState } from 'react';

export default function BasicInfo() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [verified, setVerified] = useState(true);
  const [avatar, setAvatar] = useState('');
  const fileRef = useRef(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setName(localStorage.getItem('displayName') || 'User');
      setEmail(localStorage.getItem('email') || 'user@example.com');
      setPhone(localStorage.getItem('phone') || '');
      const saved = localStorage.getItem('avatarDataUrl');
      if (saved) setAvatar(saved);
    }
  }, []);

  const onPickFile = () => fileRef.current?.click();
  const onFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result;
      setAvatar(dataUrl);
      if (typeof window !== 'undefined') {
        localStorage.setItem('avatarDataUrl', dataUrl);
      }
    };
    reader.readAsDataURL(file);
  };

  const saveBasic = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('displayName', name);
      localStorage.setItem('email', email);
      localStorage.setItem('phone', phone);
    }
    setMessage('Profile saved');
    setTimeout(() => setMessage(''), 2000);
  };

  const verifyPhone = () => {
    setVerified(true);
    setMessage('Phone verified');
    setTimeout(() => setMessage(''), 2000);
  };

  return (
    <section className="rounded-2xl bg-white p-5 shadow-sm border border-gray-200">
      <div className="flex items-center justify-between">
        <div className="text-base font-semibold text-gray-900">Basic Info</div>
        <div className="flex items-center gap-2">
          {message && (<span className="text-xs text-green-700 bg-green-100 border border-green-200 rounded-full px-2 py-0.5">{message}</span>)}
          <button onClick={saveBasic} className="rounded-md bg-black text-white px-3 py-1.5 text-sm font-medium hover:bg-gray-900">Save</button>
        </div>
      </div>
      <div className="mt-4 grid gap-4 sm:grid-cols-[120px_1fr] items-start">
        <div className="flex flex-col items-center">
          {avatar ? (
            <img src={avatar} alt="Profile" className="h-24 w-24 rounded-full object-cover border border-gray-200" />
          ) : (
            <div className="h-24 w-24 rounded-full bg-gray-200 border border-gray-200" />
          )}
          <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={onFileChange} />
          <button onClick={onPickFile} className="mt-2 w-full rounded-md bg-black text-white px-3 py-1.5 text-sm font-medium hover:bg-gray-900">Change</button>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-xs text-gray-600">Full Name</label>
            <input value={name} onChange={(e) => setName(e.target.value)} className="mt-1 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900" />
          </div>
          <div>
            <label className="block text-xs text-gray-600">Email</label>
            <div className="mt-1 flex items-center gap-2">
              <input value={email} onChange={(e) => setEmail(e.target.value)} className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900" />
              <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${verified ? 'bg-green-100 text-green-800 border border-green-200' : 'bg-yellow-100 text-yellow-800 border border-yellow-200'}`}>{verified ? 'Verified' : 'Unverified'}</span>
            </div>
          </div>
          <div>
            <label className="block text-xs text-gray-600">Phone</label>
            <div className="mt-1 flex items-center gap-2">
              <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+91 xxxxx xxxxx" className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900" />
              <button onClick={verifyPhone} className="rounded-md border border-gray-300 bg-white px-3 py-2 text-xs text-gray-800 hover:bg-gray-50">Verify</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


