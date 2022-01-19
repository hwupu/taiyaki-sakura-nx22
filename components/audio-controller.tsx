import { useState, useRef } from 'react';

export default function AudioController() {
  const [isPlaying, setIsPlaying] = useState(false);
  const player = useRef<HTMLMediaElement>(null);

  const toggle = () => {
    if (player.current) {
      const paused = player.current.paused;
      setIsPlaying(!paused);
      if (paused) {
        player.current.play();
        player.current.volume = 0.3;
      } else {
        player.current.volume = 0;
        player.current.pause();
      }
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
