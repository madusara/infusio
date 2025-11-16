"use client";
import React from "react";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { HeroCarouselItem } from "../HeroCarouselItem";

const TopHero = () => {
  return (
    <div className="relative w-full" style={{ height: "calc(100vh - 180px)" }}>
      <Carousel
        additionalTransfrom={0}
        arrows
        autoPlay
        autoPlaySpeed={3000}
        centerMode={false}
        className="w-full"
        containerClass="w-full h-full containerClass"
        focusOnSelect={false}
        infinite
        itemClass=""
        keyBoardControl
        minimumTouchDrag={80}
        pauseOnHover
        renderArrowsWhenDisabled={false}
        renderButtonGroupOutside={false}
        responsive={{
          desktop: {
            breakpoint: {
              max: 3000,
              min: 1024,
            },
            items: 1,
          },
          mobile: {
            breakpoint: {
              max: 464,
              min: 0,
            },
            items: 1,
          },
          tablet: {
            breakpoint: {
              max: 1024,
              min: 464,
            },
            items: 1,
          },
        }}
        rewind={false}
        rewindWithAnimation={false}
        rtl={false}
        shouldResetAutoplay
        sliderClass=""
        slidesToSlide={1}
        swipeable
      >
        <HeroCarouselItem
          title="Infusio Chai elixir"
          description="Your Daily Ritual, Reimagined in Chai."
          image="/assets/images/chai-banner-1.jpg"
        />
        <HeroCarouselItem
          title="Infusio Ginger elixir"
          description="Zest, Warmth, and Wellness in a Bottle."
          image="/assets/images/ginger-banner-1.jpg"
        />
      </Carousel>
    </div>
  );
};

export default TopHero;
