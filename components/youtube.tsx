import React, { useEffect, useState, useRef, SVGProps } from "react";
import styles from "./YouTube.module.scss";
import Script from "next/script";
import Image from "next/image";
import { Loader } from "./Loader";

declare global {
  interface Window {
    YT: typeof YT;
    onYouTubeIframeAPIReady: () => void;
  }

  namespace YT {
    class Player {
      constructor(element: Element, settings: PlayerSettings);
      playVideo: () => void;
    }

    interface PlayerSettings {
      videoId: string;
      events: {
        onReady: (event: PlayerEvent) => void;
      };
    }

    interface PlayerEvent {
      target: Player;
    }

    interface Player {
      playVideo: () => void;
    }

    interface Window {
      YT: typeof YT;
      onYouTubeIframeAPIReady: () => void;
    }

    let loaded: boolean;
  }
}

interface YoutubeProps {
  code: string;
}

type YoutubeIconProps = SVGProps<SVGSVGElement> & {
  size: number;
};

const MyYoutubeIcon: React.FC<YoutubeIconProps> = ({ size, ...props }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 204 142"
      fill="none"
      {...props}
    >
      <path
        d="M101.937 0.222656C101.937 0.222656 38.7186 0.222712 22.8516 4.3457C14.3558 6.7195 7.36015 13.7152 4.98632 22.3359C0.863371 38.203 0.863281 71.0625 0.863281 71.0625C0.863281 71.0625 0.863371 104.047 4.98632 119.664C7.36015 128.285 14.2308 135.155 22.8516 137.529C38.8436 141.777 101.937 141.777 101.937 141.777C101.937 141.777 165.282 141.777 181.148 137.654C189.769 135.28 196.64 128.535 198.889 119.789C203.137 104.047 203.137 71.1875 203.137 71.1875C203.137 71.1875 203.262 38.203 198.889 22.3359C196.64 13.7152 189.769 6.8446 181.148 4.5957C165.282 0.222854 101.937 0.222656 101.937 0.222656ZM81.8223 40.7031L134.422 71.0625L81.8223 101.297V40.7031Z"
        fill="#FF0000"
      />
      <path
        d="M81.8223 40.7031L134.422 71.0625L81.8223 101.297V40.7031Z"
        fill="white"
      />
    </svg>
  );
};

const Youtube: React.FC<YoutubeProps> = ({ code }) => {
  const [showVideo, setShowVideo] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const playerRef = useRef(null);
  const thumbnailUrl = `https://img.youtube.com/vi/${code}/maxresdefault.jpg`;

  const videoIcon = (
    <MyYoutubeIcon
      size={68}
      style={{ position: "absolute", top: "50%", left: "50%" }}
      className={styles.YoutubeIconPlay}
    />
  );

  const videoImage = (
    <Image
      src={thumbnailUrl}
      width={832}
      height={468}
      alt="Video thumbnail"
      style={{ width: "100%" }}
    />
  );

  useEffect(() => {
    if (!showVideo || window.YT) {
      return undefined; // Explicitly return undefined
    }

    window.onYouTubeIframeAPIReady = loadVideo;

    function loadVideo() {
      if (playerRef.current) {
        new window.YT.Player(playerRef.current, {
          videoId: code,
          events: {
            onReady: (event: YT.PlayerEvent) => {
              event.target.playVideo();
              setIsLoading(false);
            },
          },
        });
      }
    }
  }, [showVideo, code]);

  const handleImageClick = () => {
    setIsLoading(true);
    setShowVideo(true);
  };

  return (
    <div className={`${styles.videoBlock} nx-mt-6`} onClick={handleImageClick}>
      {showVideo && (
        <Script
          src="https://www.youtube.com/iframe_api"
          strategy="lazyOnload"
          onLoad={() =>
            window.YT && window.YT.loaded && window.onYouTubeIframeAPIReady()
          }
        />
      )}
      {showVideo ? (
        <div className={styles.videoContainer}>
          <div ref={playerRef} />
        </div>
      ) : (
        <div style={{ cursor: "pointer", position: "relative" }}>
          {videoImage}
          {videoIcon}
        </div>
      )}
      <div className={styles.cover} style={{ width: "100%", zIndex: "-1" }}>
        <div className={styles.loader}>
          <Loader />
        </div>
        {videoImage}
      </div>
    </div>
  );
};

export { Youtube };
