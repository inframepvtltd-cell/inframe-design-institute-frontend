'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { validateUtmFromUrl } from './util';

export default function FacebookPixel() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === 'undefined' || !(window as any).fbq) return;
    // const isValidPath = validateUtmFromUrl(pathname);

    // if (!isValidPath) return;

    (window as any).fbq('track', 'PageView');
  }, [pathname]);

  return null;
}; 