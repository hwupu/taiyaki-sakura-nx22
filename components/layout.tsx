import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

import Header from './header';
import Navigation from './navigation';
import Footer from './footer';
import StateController from './state-controller';
import AudioController from './audio-controller';

export default function Layout({ children, home }: { children: React.ReactNode; home?: boolean }) {
  const { t } = useTranslation('common');
  const router = useRouter();

  const changeLocaleTo = (locale: string) => {
    const { pathname, asPath, query } = router;
    router.push({ pathname, query }, asPath, { locale: locale });
  };

  const srLinks = [
    { href: '#sr-nav', t: 'sr.nav' },
    { href: '#sr-main', t: 'sr.main' },
    { href: '#sr-footer', t: 'sr.footer' },
  ];

  const listSrLinks = srLinks.map((link) => (
    <a
      key={link.t}
      href={link.href}
      className="fixed top-0 left-8 p-2 rounded-b-lg bg-red-800 text-white
                 transition-transform -translate-y-full focus:translate-y-0"
    >
      {t(link.t)}
    </a>
  ));

  return (
    <>
      {listSrLinks}
      <div className="absolute right-4 top-0 flex gap-2 justify-end">
        <AudioController />
        <button onClick={() => changeLocaleTo('en')}>EN</button>
        <button onClick={() => changeLocaleTo('zh')}>TW</button>
        <button onClick={() => changeLocaleTo('ja')}>JP</button>
      </div>
      <Header />
      <Navigation />
      <main id="sr-main">{children}</main>
      <Footer />
      <StateController />
    </>
  );
}
