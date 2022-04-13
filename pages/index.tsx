import type { ReactElement } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

import type { Page } from '../types/page';
import Layout from '../components/layout-simple';

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'home'])),
      // Will be passed to the page component as props
    },
  };
}

const Home: Page = () => {
  const { t } = useTranslation(['common', 'home']);

  return (
    <>
      <Head>
        <title>{t('title')}</title>
        <meta name="description" content={t('seo.description', { ns: 'home' })} />
      </Head>
      <div className="flex flex-col gap-4 p-4 justify-center items-center text-center w-screen h-screen bg-sakura-100">
        <Image
          src="/images/taiyaki-type-ring@3x.png"
          width="238"
          height="231"
          alt="Logo of Taiyaki Sakura"
        />
        <div className="w-full max-width-sm">
          <h1 className="text-3xl text-sakura-500">
            This homepage is still under construction. 😥
          </h1>
          <div>But you may visit some preview pages:</div>
        </div>
        <ul className="flex gap-4 items-center w-full max-w-sm">
          <li className="flex-auto w-1/2 px-4 py-2 text-white bg-sakura-300 rounded-lg">
            <Link href="/map">
              <a>Map Explorer</a>
            </Link>
          </li>
          <li className="flex-auto w-1/2 px-4 py-2 text-white bg-sakura-300 rounded-lg cursor-not-allowed">
            <div>Discord</div>
          </li>
        </ul>
      </div>
    </>
  );
};

Home.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Home;
