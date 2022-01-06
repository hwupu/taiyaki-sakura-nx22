import Image from 'next/image';
import { useRouter } from 'next/router';
import { Autoplay, EffectFade } from 'swiper';

import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/effect-fade';

import AudioController from './audio-controller';

export default function Header() {
  const router = useRouter();

  const changeLocaleTo = (locale: string) => {
    const { pathname, asPath, query } = router;
    router.push({ pathname, query }, asPath, { locale: locale });
  };

  return (
    <header className="h-screen mb-[calc(-230px-2rem)]">
      <div className="sticky top-0 inset-0 px-4 h-0 overflow-visible flex gap-2 justify-end z-30">
        <AudioController />
        <button onClick={() => changeLocaleTo('en')}>EN</button>
        <button onClick={() => changeLocaleTo('zh')}>TW</button>
        <button onClick={() => changeLocaleTo('ja')}>JP</button>
      </div>
      <Swiper
        className="h-full"
        modules={[Autoplay, EffectFade]}
        effect="fade"
        autoplay={{ delay: 5000 }}
        allowTouchMove={false}
      >
        <SwiperSlide>
          <Image src="/images/header1.png" alt="" layout="fill" objectFit="cover" />
        </SwiperSlide>
        <SwiperSlide>
          <Image src="/images/header2.png" alt="" layout="fill" objectFit="cover" />
        </SwiperSlide>
        <SwiperSlide>
          <Image src="/images/header3.png" alt="" layout="fill" objectFit="cover" />
        </SwiperSlide>
      </Swiper>
    </header>
  );
}
