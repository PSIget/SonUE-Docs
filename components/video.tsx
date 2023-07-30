import 'intersection-observer';
import React, { useCallback, useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';

interface VideoProps {
  src: string;
  caption?: string;
  ratio: number;
  className?: string;
}

const Video: React.FC<VideoProps> = ({ src, caption, ratio, className = '' }) => {
  const [inViewRef, inView] = useInView({
    threshold: 1,
  });

  const videoRef = useRef<HTMLVideoElement | null>(null);

  const setRefs = useCallback(
    (node: HTMLVideoElement | null) => {
      if (node) {
        videoRef.current = node;
        inViewRef(node);
        node.addEventListener('click', function () {
          if (this.paused) {
            this.play();
          } else {
            this.pause();
          }
        });
      }
    },
    [inViewRef]
  );

  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) {
      return;
    }

    if (inView) {
      videoElement.play();
    } else {
      videoElement.pause();
    }
  }, [inView]);

  return (
    <div style={{ position: 'relative', marginBlock: '2rem 1rem' }} className={className}>
      <div style={{ paddingBottom: ratio * 100 + '%' }} />
      <video style={{ position: 'absolute', top: 0, left: 0 }} loop muted autoPlay playsInline ref={setRefs}>
        <source src={src} type="video/mp4" />
      </video>
      {caption && (
        <figcaption style={{ fontSize: '.9rem', textAlign: 'center', marginTop: '1em' }}>{caption}</figcaption>
      )}
    </div>
  );
};

export default Video;
