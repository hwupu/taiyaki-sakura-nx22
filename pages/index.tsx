import type { ReactElement } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

import Layout from '../components/layout-simple';

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
      <div className="flex flex-col gap-4 justify-center items-center w-screen h-screen bg-sakura-100">
          <Image src="/images/taiyaki-type-ring@3x.png" width="238" height="231" alt="Logo of Taiyaki Sakura"  />
          <h1 className="text-3xl text-sakura-500">This homepage is still under construction. 😥</h1>
      </div>
    </>
  );
};

// @ts-ignore
Home.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Home;
