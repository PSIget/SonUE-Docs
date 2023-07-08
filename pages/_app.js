import "nextra-theme-docs/style.css";

import "nprogress/nprogress.css";
import "../styles.css";

import { Analytics } from "@vercel/analytics/react";

import { useRouter } from "next/router";
import Head from "next/head";
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

  const CANONICAL_DOMAIN = 'https://s2ue.org';

  const _pathSliceLength = Math.min.apply(Math, [
      router.asPath.indexOf('?') > 0 ? router.asPath.indexOf('?') : router.asPath.length,
      router.asPath.indexOf('#') > 0 ? router.asPath.indexOf('#') : router.asPath.length
  ]);
  const canonicalURL = CANONICAL_DOMAIN + router.asPath.substring(0, _pathSliceLength);

  return (
    <>
      <Head>
        <link rel="canonical" href={canonicalURL} />
      </Head>
      <Component {...pageProps} />
      <Analytics />
    </>
  );
}
