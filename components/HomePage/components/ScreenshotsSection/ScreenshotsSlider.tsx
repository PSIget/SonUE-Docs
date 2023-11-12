import React, { useCallback, useState, FC } from "react";
import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import Image from "next/image";
import dynamic from "next/dynamic";

import styles from "./ScreenshotsSlider.module.scss";
import Data from "./data.json";
import useLocalesMap, { ILocaleMap } from "utils/use-locales-map";

interface ImageData {
  name: ILocaleMap<string>;
  url: string;
}

interface LightboxController {
  toggler: boolean;
  sourceIndex: number;
}

interface ImageSlideProps {
  image: ImageData;
  index: number;
  openLightboxOnSlide: (index: number) => void;
}

const DynamicFsLightbox = dynamic(() => import("fslightbox-react"), {
  ssr: false,
});

const ImageSlide: FC<ImageSlideProps> = ({
  image,
  index,
  openLightboxOnSlide,
}) => {
  const localizedName = useLocalesMap<string>(image.name);

  return (
    <SplideSlide key={`${image.name}-${index}`}>
      <figure>
        <Image
          src={image.url}
          alt={`Screenshot of the game - ${localizedName}`}
          width={792}
          height={444}
          quality={100}
          onClick={() => openLightboxOnSlide(index)}
          sizes="(max-width: 768px) 294px, (max-width: 916px) 600px, 828px"
          style={{
            width: "100%",
            height: "auto",
          }}
        />
        <figcaption>{localizedName}</figcaption>
      </figure>
    </SplideSlide>
  );
};

export const ScreenshotsSlider: FC = () => {
  const [lightboxController, setLightboxController] =
    useState<LightboxController>({
      toggler: false,
      sourceIndex: 0,
    });

  const urls = Data.map((item) => item.url);

  const openLightboxOnSlide = useCallback(
    (index: number) => {
      setLightboxController({
        toggler: !lightboxController.toggler,
        sourceIndex: index,
      });
    },
    [lightboxController]
  );

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
            autoplay: "pause",
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
            <ImageSlide
              key={`${image.name}-${index}`}
              image={image}
              index={index}
              openLightboxOnSlide={openLightboxOnSlide}
            />
          ))}
        </SplideTrack>
      </Splide>
      <DynamicFsLightbox
        toggler={lightboxController.toggler}
        sources={urls}
        sourceIndex={lightboxController.sourceIndex}
      />
    </div>
  );
};
