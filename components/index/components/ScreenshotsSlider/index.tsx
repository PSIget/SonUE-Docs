import styles from "./index.module.scss";
import React, { useCallback, useState } from "react";
import FsLightbox from "fslightbox-react";

import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";

import Image from "next/image";

import Data from "./data.json";

interface ImageData {
  name: string;
  url: string;
}

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
                  quality={80}
                  onClick={() => openLightboxOnSlide(index)}
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
                  quality={80}
                  className={styles.shadow}
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
      <FsLightbox
        toggler={lightboxController.toggler}
        sources={urls}
        sourceIndex={lightboxController.sourceIndex}
      />
    </div>
  );
}
