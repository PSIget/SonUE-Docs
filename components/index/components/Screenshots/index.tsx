import React, { useState } from "react";
import FsLightbox from "fslightbox-react";

import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";

import Image from "next/image";

import Data from "./data.json" ;

import styles from "./index.module.scss";

interface ImageData {
  name: string;
  url: string;
}

export function Screenshots() {
  const [lightboxController, setLightboxController] = useState({
    toggler: false,
    sourceIndex: 0,
  });

  const urls: string[] = Data.map((item: ImageData) => item.url);

  function openLightboxOnSlide(index: number) {
    setLightboxController({
      toggler: !lightboxController.toggler,
      sourceIndex: index,
    });
  }


  return (
    <div className={styles.slider}>
      <Splide
        aria-label="My Favorite Images"
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
            <SplideSlide key={image.toString()}>
              <figure>
              <Image
                src={image.url}
                alt={image.name}
                width={792}
                height={444}
                quality={80}
                priority={false}
                onClick={() => openLightboxOnSlide(index)}
              />
              <Image
                src={image.url}
                alt={image.name}
                width={792}
                height={444}
                quality={80}
                priority={false}
                className={styles.shadow}
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
        sourceIndex={lightboxController.sourceIndex} // Set the sourceIndex for the lightbox
      />
    </div>
  );
}
