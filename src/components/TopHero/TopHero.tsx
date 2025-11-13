"use client";
import React from "react";
import Image from "next/image";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

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
        <div className="relative" style={{ height: "calc(100vh - 180px)" }}>
          <div className="absolute bottom-0 p-10 pt-20 left-0 bg-linear-to-t from-black/80 to-transparent w-full">
            <h1 className="text-8xl font-bold text-white ">
              Infusio Chai elixir
            </h1>
            <div className="mt-2 mb-4 text-4xl font-bold text-white">
              Your Daily Ritual, Reimagined in Chai.
            </div>
          </div>
          <Image
            src="/assets/images/chai-banner-1.jpg"
            alt="Carousel slide 2"
            width={1000}
            height={100}
            className="w-full h-full object-cover block"
          />
        </div>
        <div className="relative" style={{ height: "calc(100vh - 180px)" }}>
          <div className="absolute bottom-0 p-10 pt-20 left-0 bg-linear-to-t from-black/80 to-transparent w-full">
            <h1 className="text-8xl font-bold text-white ">
              Infusio Ginger elixir
            </h1>
            <div className="mt-2 mb-4 text-4xl font-bold text-white">
              Zest, Warmth, and Wellness in a Bottle.
            </div>
          </div>
          <Image
            src="/assets/images/ginger-banner-1.jpg"
            alt="Carousel slide 2"
            width={1000}
            height={100}
            className="w-full h-full object-cover block"
          />
        </div>
      </Carousel>
    </div>
  );
};

export default TopHero;
