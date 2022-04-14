import type { ReactElement } from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import type { Page } from '../types/page';
import Layout from '../components/layout-simple';
import OpenMap from '../components/Map';

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
      // Will be passed to the page component as props
    },
  };
}

const MapPage: Page = () => {
  return <OpenMap />;
};

MapPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default MapPage;
