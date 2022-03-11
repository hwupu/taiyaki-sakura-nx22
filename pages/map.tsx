import type { ReactElement } from 'react';
import type { NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import Layout from '../components/layout';
import TaiyakiMapView from '../components/Taiyaki';

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
      // Will be passed to the page component as props
    },
  };
}

const Map: NextPage = () => {
  return <TaiyakiMapView />;
};

// @ts-ignore
Map.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Map;
