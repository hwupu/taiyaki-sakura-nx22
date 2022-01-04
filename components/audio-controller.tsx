import { useState, useRef } from 'react';

export default function AudioController() {
  const [isPlaying, setIsPlaying] = useState(false);
  const player = useRef(null);

  const toggle = () => {
    // @ts-ignore: Object is possibly 'null'.
    const paused = player.current.paused;
    setIsPlaying(!paused);
    if (paused) {
      // @ts-ignore: Object is possibly 'null'.
      player.current.play();
      // @ts-ignore: Object is possibly 'null'.
      player.current.volume = 0.3;
    } else {
      // @ts-ignore: Object is possibly 'null'.
      player.current.volume = 0;
      // @ts-ignore: Object is possibly 'null'.
      player.current.pause();
    }
  };

  return (
    <>
      <audio ref={player} src="bgm/docchi.opus" loop />
      <button onClick={toggle} aria-pressed={isPlaying}>
        {!isPlaying ? 'Play' : 'Pause'}
      </button>
    </>
  );
}
