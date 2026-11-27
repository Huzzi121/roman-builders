'use client';

import { useEffect } from 'react';

export default function FontAwesomeLoader() {
  useEffect(() => {
    const id = 'fa-stylesheet-local';
    if (document.getElementById(id)) return;
    const link = document.createElement('link');
    link.id = id;
    link.rel = 'stylesheet';
    link.href = '/vendor/fontawesome/css/all.min.css';
    document.head.appendChild(link);
  }, []);

  return null;
}
