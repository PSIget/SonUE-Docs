import React, { useCallback, useState, FC, useRef, useEffect } from "react";
import { EmblaCarouselType, EmblaEventType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import ClassNames from "embla-carousel-class-names";
import Image from "next/image";
import dynamic from "next/dynamic";

import styles from "./ScreenshotsSlider.module.scss";
import Data from "./data.json";
import useLocalesMap, { ILocaleMap } from "utils/use-locales-map";

const TWEEN_FACTOR_BASE = 0.6;

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
  ssr: true,
});

const ImageSlide: FC<ImageSlideProps> = ({
  image,
  index,
  openLightboxOnSlide,
}) => {
  const localizedName = useLocalesMap<string>(image.name);

  return (
    <div key={`${image.name.en}-${index}`} className={styles.slide}>
      <figure>
        <Image
          src={image.url}
          alt={localizedName}
          width={792}
          height={444}
          quality={100}
          onClick={() => openLightboxOnSlide(index)}
          sizes="(max-width: 768px) 294px, (max-width: 916px) 600px, 792px"
        />
        <figcaption>{localizedName}</figcaption>
      </figure>
    </div>
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

  const numberWithinRange = (
    number: number,
    min: number,
    max: number
  ): number => Math.min(Math.max(number, min), max);

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ playOnInit: true, delay: 60000, stopOnMouseEnter: true }),
    ClassNames({ snapped: styles.active }),
  ]);
  const tweenFactor = useRef(0);

  const setTweenFactor = useCallback((emblaApi: EmblaCarouselType) => {
    tweenFactor.current = TWEEN_FACTOR_BASE * emblaApi.scrollSnapList().length;
  }, []);

  const tweenOpacity = useCallback(
    (emblaApi: EmblaCarouselType, eventName?: EmblaEventType) => {
      const engine = emblaApi.internalEngine();
      const scrollProgress = emblaApi.scrollProgress();
      const slidesInView = emblaApi.slidesInView();
      const isScrollEvent = eventName === "scroll";

      emblaApi.scrollSnapList().forEach((scrollSnap, snapIndex) => {
        let diffToTarget = scrollSnap - scrollProgress;
        const slidesInSnap = engine.slideRegistry[snapIndex];

        slidesInSnap.forEach((slideIndex) => {
          if (isScrollEvent && !slidesInView.includes(slideIndex)) return;

          if (engine.options.loop) {
            engine.slideLooper.loopPoints.forEach((loopItem) => {
              const target = loopItem.target();

              if (slideIndex === loopItem.index && target !== 0) {
                const sign = Math.sign(target);

                if (sign === -1) {
                  diffToTarget = scrollSnap - (1 + scrollProgress);
                }
                if (sign === 1) {
                  diffToTarget = scrollSnap + (1 - scrollProgress);
                }
              }
            });
          }

          const tweenValue = 1 - Math.abs(diffToTarget * tweenFactor.current);
          const opacity = numberWithinRange(tweenValue, 0, 1).toString();
          emblaApi.slideNodes()[slideIndex].style.opacity = opacity;
        });
      });
    },
    []
  );

  useEffect(() => {
    if (!emblaApi) return;

    setTweenFactor(emblaApi);
    tweenOpacity(emblaApi);
    emblaApi
      .on("reInit", setTweenFactor)
      .on("reInit", tweenOpacity)
      .on("scroll", tweenOpacity);
  }, [emblaApi, tweenOpacity, setTweenFactor]);

  return (
    <div className={styles.slider} ref={emblaRef}>
      <div className={styles.sliderContainer}>
        {Data.map((image, index) => (
          <ImageSlide
            key={`${image.name.en}-${index}`}
            image={image}
            index={index}
            openLightboxOnSlide={openLightboxOnSlide}
          />
        ))}
      </div>
      <DynamicFsLightbox
        toggler={lightboxController.toggler}
        sources={urls}
        sourceIndex={lightboxController.sourceIndex}
      />
    </div>
  );
};
