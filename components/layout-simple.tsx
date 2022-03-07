import { useTranslation } from 'next-i18next';

export default function Layout({ children }: { children: React.ReactNode }) {
  const { t } = useTranslation('common');

  const srLinks = [
    { href: '#sr-nav', t: 'sr.nav' },
    { href: '#sr-main', t: 'sr.main' },
    { href: '#sr-footer', t: 'sr.footer' },
  ];

  const listSrLinks = srLinks.map((link) => (
    <a
      key={link.t}
      href={link.href}
      className="fixed top-0 left-8 p-2 rounded-b-lg bg-red-800 text-white z-50
                 transition-transform -translate-y-full focus:translate-y-0"
    >
      {t(link.t)}
    </a>
  ));

  return (
    <>
      {listSrLinks}
      <main id="sr-main">{children}</main>
    </>
  );
}
