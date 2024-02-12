import type { AppProps } from "next/app";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { ReactNode } from "react";
import "nextra-theme-docs/style.css";
import "nprogress/nprogress.css";
import "../styles/global.scss";
import { useRouter } from "next/router";
import { useEffect } from "react";
import NProgress from "nprogress";
import { Inter } from "next/font/google";
import { setupWebVitals } from "utils/webVitals";
import { GoogleAnalytics } from "@next/third-parties/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

type NextraAppProps = AppProps & {
  Component: AppProps["Component"] & {
    getLayout: (page: ReactNode) => ReactNode;
  };
};

export default function Nextra({ Component, pageProps }: NextraAppProps) {
  const router = useRouter();

  useEffect(() => {
    NProgress.configure({ showSpinner: false });

    const handleRouteChangeStart = () => NProgress.start();
    const handleRouteChangeComplete = () => NProgress.done();
    const handleRouteChangeError = () => NProgress.done();

    router.events.on("routeChangeStart", handleRouteChangeStart);
    router.events.on("routeChangeComplete", handleRouteChangeComplete);
    router.events.on("routeChangeError", handleRouteChangeError);

    return () => {
      router.events.off("routeChangeStart", handleRouteChangeStart);
      router.events.off("routeChangeComplete", handleRouteChangeComplete);
      router.events.off("routeChangeError", handleRouteChangeError);
    };
  }, [router.events]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setupWebVitals();
    }
  }, []);

  return (
    <>
      <style jsx global>{`
        html {
          font-family: ${inter.style.fontFamily};
        }
      `}</style>
      <Component {...pageProps} />
      <SpeedInsights />
      <GoogleAnalytics gaId="G-55PM901V2S" />
    </>
  );
}
