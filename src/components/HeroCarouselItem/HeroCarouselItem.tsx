import React from 'react'
import Image from 'next/image'

type Props = {
  title: string;
  description: string;
  image: string;
}

const HeroCarouselItem = ({ title, description, image }: Props) => {
  return (
    <div className="relative" style={{ height: "calc(100vh - 180px)" }}>
    <div className="absolute bottom-0 p-10 pt-20 left-0 bg-linear-to-t from-black/80 to-transparent w-full">
      <h1 className="text-6xl font-bold text-white ">{title}</h1>
      <div className="mt-2 mb-4 text-2xl font-bold text-white">{description}</div>
    </div>
    <Image
      src={image}
      alt="Carousel slide 2"
      width={1000}
      height={100}
      className="w-full h-full object-cover block"
    />
  </div>
  )
}

export default HeroCarouselItem