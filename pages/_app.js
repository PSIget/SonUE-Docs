import "nextra-theme-docs/style.css";

import "nprogress/nprogress.css";
import "../styles.css";

import { Analytics } from "@vercel/analytics/react";

import { useRouter } from 'next/router';
import { useEffect } from 'react';

import NProgress from 'nprogress';

export default function Nextra({ Component, pageProps }) {
  const router = useRouter();

  NProgress.configure({showSpinner:false})

  useEffect(() => {
    router.events.on('routeChangeStart', () =>  NProgress.start());
    router.events.on('routeChangeComplete', () =>  NProgress.done());
    router.events.on('routeChangeError', () =>  NProgress.done());
  }, []);

  return (
    <>
      <Component {...pageProps} />
      <Analytics />
    </>
  );
}
