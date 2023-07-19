import Script from 'next/script';

const Analytics: React.FC = () => {
  return (
    <div className="container">
      {/* Google tag (gtag.js) */}
      <Script async src="https://www.googletagmanager.com/gtag/js?id=G-55PM901V2S" />
      <Script strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-55PM901V2S');
        `}
      </Script>
    </div>
  );
};

export default Analytics;
