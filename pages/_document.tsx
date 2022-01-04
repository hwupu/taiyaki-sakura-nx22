import Document, { DocumentContext, Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
          <meta name="format-detection" content="telephone=no" />
          <meta name="theme-color" media="(prefers-color-scheme: light)" content="#fceaec" />
          <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#e06460" />
          <link
            href="https://fonts.googleapis.com/css2?family=Noto+Serif+TC:wght@400;700&display=optional"
            rel="stylesheet"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@400;700&display=optional"
            rel="stylesheet"
          />
          <link rel="icon" href="/favicon.svg" />
          <link rel="alternate icon" href="/favicon.png" />
          <link rel="mask-icon" href="/mask-icon.svg" color="#000000" />
          <link rel="applie-touch-icon" href="/apple-touch-icon.png" />
	  <link rel="manifest" href="/manifest.json" />
	  <link href="/css/fontawesome.min.css" rel="stylesheet" />
	  <link href="/css/brands.min.css" rel="stylesheet" />
	  <link href="/css/solid.min.css" rel="stylesheet" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
