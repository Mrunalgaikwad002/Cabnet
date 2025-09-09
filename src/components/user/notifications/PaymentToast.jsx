'use client';

import { useEffect, useState } from 'react';

export default function PaymentToast({ status, onClose, inline = false }) {
  const [message, setMessage] = useState('');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!status) return;
    if (status === 'success') {
      setMessage('Your ride is on the way');
      setVisible(true);
      const timer = setTimeout(() => {
        setMessage('Your cab is at the pickup point');
      }, 60000);
      return () => clearTimeout(timer);
    }
    if (status === 'cancel') {
      setMessage('Payment cancelled');
      setVisible(true);
    }
  }, [status]);

  if (!visible) return null;

  const Container = ({ children }) => (
    inline ? (
      <div className="max-w-7xl mx-auto px-4 py-3">{children}</div>
    ) : (
      <div className="fixed bottom-5 right-5 z-[60]">{children}</div>
    )
  );

  return (
    <Container>
      <div className={`rounded-xl border border-gray-200 bg-white shadow-lg p-4 ${inline ? 'w-full' : 'w-80'}`}>
        <div className="flex items-start gap-3">
          <div className="text-xl">🚖</div>
          <div className="flex-1">
            <div className="text-sm font-semibold text-gray-900">{message}</div>
            {status === 'success' && (
              <div className="mt-1 text-xs text-gray-700">We will notify you when the driver arrives.</div>
            )}
          </div>
          <button aria-label="Close" onClick={onClose} className="rounded-md border border-gray-200 px-2 py-1 text-xs hover:bg-gray-50">Close</button>
        </div>
      </div>
    </Container>
  );
}


