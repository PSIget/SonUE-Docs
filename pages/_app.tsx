import { AppProps } from 'next/app';
import "nextra-theme-docs/style.css";
import "nprogress/nprogress.css";
import "../styles.scss";
import Analytics from "components/google-analytics";
import { useRouter } from "next/router";
import Head from "next/head";
import { useEffect, useCallback } from 'react';
import NProgress from 'nprogress';

export default function Nextra({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const { asPath, pathname } = router;

  const CANONICAL_DOMAIN = process.env.NEXT_PUBLIC_BASE_URL;

  const generateHref = (locale = '', asPath = '') => {
    const processedPath = (asPath === '/' || asPath.includes('/index.ru') || asPath.includes('/index.en') || asPath.includes('/index.uk')) ? '' : asPath.replace(/\.(en|ru|uk)$/, '');
    return `${CANONICAL_DOMAIN}${locale}${processedPath}`;
  }


  const getCanonicalURL = useCallback(() => {
    if (!CANONICAL_DOMAIN) return '';
    const _pathSliceLength = Math.min(...[
      asPath.indexOf('?') > 0 ? asPath.indexOf('?') : asPath.length,
      asPath.indexOf('#') > 0 ? asPath.indexOf('#') : asPath.length
    ]);
    return CANONICAL_DOMAIN + pathname.substring(0, _pathSliceLength).replace(/\.(en|ru|uk)$/, '');
  }, [asPath, pathname, CANONICAL_DOMAIN]);

  useEffect(() => {
    NProgress.configure({ showSpinner: false });

    const handleRouteChangeStart = () => NProgress.start();
    const handleRouteChangeComplete = () => NProgress.done();
    const handleRouteChangeError = () => NProgress.done();

    router.events.on('routeChangeStart', handleRouteChangeStart);
    router.events.on('routeChangeComplete', handleRouteChangeComplete);
    router.events.on('routeChangeError', handleRouteChangeError);

    return () => {
      router.events.off('routeChangeStart', handleRouteChangeStart);
      router.events.off('routeChangeComplete', handleRouteChangeComplete);
      router.events.off('routeChangeError', handleRouteChangeError);
    };
  }, []);

  return (
    <>
      <Head>
        <link rel="canonical" href={getCanonicalURL()} />
        <link rel="alternate" hrefLang="x-default" href={generateHref('', asPath)} />
        <link rel="alternate" hrefLang="en" href={generateHref('/en', asPath)} />
        <link rel="alternate" hrefLang="uk" href={generateHref('/uk', asPath)} />
      </Head>
      <Component {...pageProps} />
      <Analytics />
    </>
  );
}
