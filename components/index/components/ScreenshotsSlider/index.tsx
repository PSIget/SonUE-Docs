import styles from "./index.module.scss";
import React, { useCallback, useState } from "react";

import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";

import Image from "next/image";
import dynamic from "next/dynamic";

import Data from "./data.json";

interface ImageData {
  name: string;
  url: string;
}

const DynamicFsLightbox = dynamic(() => import("fslightbox-react"), {
  ssr: false,
});

export function ScreenshotsSlider() {
  const [lightboxController, setLightboxController] = useState({
    toggler: false,
    sourceIndex: 0,
  });

  const urls: string[] = Data.map((item: ImageData) => item.url);

  const openLightboxOnSlide = useCallback((index: number) => {
    setLightboxController({
      toggler: !lightboxController.toggler,
      sourceIndex: index,
    });
  }, [lightboxController]);

  return (
    <div className={styles.slider}>
      <Splide
        aria-label="Screenshots"
        hasTrack={false}
        options={{
          type: "loop",
          perPage: 1,
          focus: "center",
          autoWidth: true,
          lazyLoad: "nearby",
          gap: "1.5rem",
          pagination: false,
          arrows: false,
          autoplay: true,
          reducedMotion: {
            speed: 0,
            rewindSpeed: 0,
            autoplay: 'pause',
          },
          breakpoints: {
            768: {
              perPage: 1,
              autoWidth: false,
              gap: ".5rem",
            },
          },
        }}
      >
        <SplideTrack>
          {Data.map((image, index) => (
            <SplideSlide key={`${image.name}-${index}`}>
              <figure>
                <Image
                  src={image.url}
                  alt={`Screenshot of the game - ${image.name}`}
                  width={792}
                  height={444}
                  quality={100}
                  onClick={() => openLightboxOnSlide(index)}
                  sizes="(max-width: 768px) 294px, (max-width: 916px) 600px, 828px"
                  style={{
                    width: '100%',
                    height: 'auto',
                  }}
                />
                <Image
                  src={image.url}
                  alt={`Screenshot of the game - ${image.name}`}
                  width={792}
                  height={444}
                  quality={100}
                  className={styles.shadow}
                  sizes="(max-width: 768px) 294px, (max-width: 916px) 600px, 828px"
                  style={{
                    width: '100%',
                    height: 'auto',
                  }}
                />
                <figcaption>{image.name}</figcaption>
              </figure>
            </SplideSlide>
          ))}
        </SplideTrack>
        <button className="splide__toggle hidden" type="button">
          <span className="splide__toggle__play">Play</span>
          <span className="splide__toggle__pause">Pause</span>
        </button>
      </Splide>
      <DynamicFsLightbox
        toggler={lightboxController.toggler}
        sources={urls}
        sourceIndex={lightboxController.sourceIndex}
      />
    </div>
  );
}
