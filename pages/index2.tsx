import type { ReactElement } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

import Layout from '../components/layout';

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'home'])),
      // Will be passed to the page component as props
    },
  };
}

const Home: NextPage = () => {
  const { t } = useTranslation(['common', 'home']);

  return (
    <>
      <Head>
        <title>{t('title')}</title>
        <meta name="description" content={t('seo.description', { ns: 'home' })} />
      </Head>
      <h1 className="text-3xl font-bold underline">Hello Next</h1>
      <div className="h-screen"></div>
      <div className="h-screen"></div>
    </>
  );
};

export default Home;

Home.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
