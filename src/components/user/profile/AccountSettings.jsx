"use client";
import { useState } from 'react';

export default function AccountSettings() {
  const [dark, setDark] = useState(false);
  const [sms, setSms] = useState(true);
  const [email, setEmail] = useState(true);
  const [push, setPush] = useState(false);
  const [lang, setLang] = useState('en');
  const [pw1, setPw1] = useState('');
  const [pw2, setPw2] = useState('');
  const [notice, setNotice] = useState('');

  return (
    <section className="rounded-2xl bg-white p-5 shadow-sm border border-gray-200">
      <div className="text-base font-semibold text-gray-900">Account Settings</div>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <div className="space-y-3">
          <div>
            <label className="block text-xs text-gray-600">Change Password</label>
            <div className="mt-1 grid gap-2 sm:grid-cols-2">
              <input value={pw1} onChange={(e)=>setPw1(e.target.value)} type="password" placeholder="New password" className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900" />
              <input value={pw2} onChange={(e)=>setPw2(e.target.value)} type="password" placeholder="Confirm password" className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900" />
            </div>
            <div className="mt-2 flex items-center gap-2">
              {notice && (<span className="text-xs text-green-700 bg-green-100 border border-green-200 rounded-full px-2 py-0.5">{notice}</span>)}
              <button onClick={()=>{
                if(!pw1 || pw1!==pw2){
                  setNotice('Passwords do not match');
                }else{
                  setNotice('Password updated');
                  setPw1(''); setPw2('');
                }
                setTimeout(()=>setNotice(''),2000);
              }} className="rounded-md bg-black text-white px-3 py-1.5 text-sm font-medium hover:bg-gray-900">Update</button>
            </div>
          </div>

          <div className="flex items-center justify-between rounded-md border border-gray-200 p-3">
            <div>
              <div className="text-sm text-gray-900">Dark Mode</div>
              <div className="text-xs text-gray-600">Toggle app theme</div>
            </div>
            <input type="checkbox" checked={dark} onChange={(e) => { setDark(e.target.checked); if(typeof window!=='undefined'){localStorage.setItem('pref_dark', String(e.target.checked));}}} />
          </div>
        </div>

        <div className="space-y-3">
          <div className="rounded-md border border-gray-200 p-3">
            <div className="text-sm font-medium text-gray-900">Notification Preferences</div>
            <div className="mt-2 flex items-center justify-between text-sm">
              <span>SMS</span>
              <input type="checkbox" checked={sms} onChange={(e) => { setSms(e.target.checked); if(typeof window!=='undefined'){localStorage.setItem('pref_sms', String(e.target.checked));}}} />
            </div>
            <div className="mt-2 flex items-center justify-between text-sm">
              <span>Email</span>
              <input type="checkbox" checked={email} onChange={(e) => { setEmail(e.target.checked); if(typeof window!=='undefined'){localStorage.setItem('pref_email', String(e.target.checked));}}} />
            </div>
            <div className="mt-2 flex items-center justify-between text-sm">
              <span>Push</span>
              <input type="checkbox" checked={push} onChange={(e) => { setPush(e.target.checked); if(typeof window!=='undefined'){localStorage.setItem('pref_push', String(e.target.checked));}}} />
            </div>
          </div>

          <div>
            <label className="block text-xs text-gray-600">Language</label>
            <select value={lang} onChange={(e) => { setLang(e.target.value); if(typeof window!=='undefined'){localStorage.setItem('pref_lang', e.target.value);} }} className="mt-1 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900">
              <option value="en">English</option>
              <option value="hi">Hindi</option>
              <option value="mr">Marathi</option>
            </select>
          </div>
        </div>
      </div>
    </section>
  );
}


