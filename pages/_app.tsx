import "nextra-theme-docs/style.css";

import "nprogress/nprogress.css";
import "../styles.scss";

import Analytics from "components/google-analytics";

import { useRouter } from "next/router";
import Head from "next/head";
import { useEffect } from 'react';

import NProgress from 'nprogress';

export default function Nextra({ Component, pageProps }) {
  const router = useRouter();

  NProgress.configure({ showSpinner: false })

  useEffect(() => {
    router.events.on('routeChangeStart', () => NProgress.start());
    router.events.on('routeChangeComplete', () => NProgress.done());
    router.events.on('routeChangeError', () => NProgress.done());
  }, []);

  const CANONICAL_DOMAIN = process.env.NEXT_PUBLIC_BASE_URL;

  const _pathSliceLength = Math.min.apply(Math, [
    router.asPath.indexOf('?') > 0 ? router.asPath.indexOf('?') : router.asPath.length,
    router.asPath.indexOf('#') > 0 ? router.asPath.indexOf('#') : router.asPath.length
  ]);

  const canonicalURL = CANONICAL_DOMAIN + router.pathname.substring(0, _pathSliceLength).replace(/\.(en|ru|uk)$/, '');

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
