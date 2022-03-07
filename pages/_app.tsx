import '../styles/globals.css';
import '../styles/animated-logo.css';

import type { ReactElement, ReactNode } from 'react';
import Head from 'next/head';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import { appWithTranslation } from 'next-i18next';

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      </Head>
      {getLayout(<Component {...pageProps} />)}
    </>
  );
}

export default appWithTranslation(MyApp);
