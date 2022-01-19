import Link from 'next/link';
import { useTranslation } from 'next-i18next';

import AnimatedLogo from '../components/AnimatedLogo';

export default function Navigation() {
  const { t } = useTranslation('common');

  const links = [
    { href: '/', t: 'nav.tour', css: 'sm:order-1 cursor-not-allowed' },
    { href: '/map', t: 'nav.map', css: 'sm:order-2' },
    { href: '/', t: 'nav.guild', css: 'sm:order-4 cursor-not-allowed' },
    { href: '/', t: 'nav.build', css: 'sm:order-5 cursor-not-allowed' },
  ];

  const listLinks = links.map((link) => (
    <li key={link.t} className={link.css}>
      <Link href={link.href}>
        <a className="bg-neutral-100 rounded-full sm:rounded-none">
          <img src="/images/mock-icon.svg" alt="icon placeholder" width="48" height="48" />
          <div>{t(link.t)}</div>
        </a>
      </Link>
    </li>
  ));

  return (
    <nav id="sr-nav" className="sm:sticky sm:top-[-130px] sm:mb-[2rem] z-40">
      <ul
        className="relative sm:static bottom-0 right-0
                   flex flex-col-reverse gap-4 sm:flex-row sm:justify-center sm:items-end
                   text-right sm:text-center"
      >
        <li className="sm:order-3">
          <Link href="/">
            <a className="">
              <AnimatedLogo />
              <div className="sm:sr-only">{t('nav.home')}</div>
            </a>
          </Link>
        </li>
        {listLinks}
      </ul>
    </nav>
  );
}
