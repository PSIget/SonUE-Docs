import Script from 'next/script';

const Analytics: React.FC = () => (
  <>
    {/* Google tag (gtag.js) */}
    <Script async src="https://www.googletagmanager.com/gtag/js?id=G-55PM901V2S" />
    <Script id="gtag" strategy="afterInteractive">
      {`
        window.dataLayer = window.dataLayer || [];
        const gtag = (...args) => dataLayer.push(args);
        gtag('js', new Date());

        gtag('config', 'G-55PM901V2S');
      `}
    </Script>
  </>
);

export default Analytics;
