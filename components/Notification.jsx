"use client";

import { useEffect, useState } from 'react';

export default function Notification() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`notification-badge ${show ? 'show' : ''}`}>
      <span className="pulse"></span>
      2 slots left for current month
    </div>
  );
}
