import React from "react";
import Image from "next/image";
import { Button } from "../ui/button";

type Props = {
  image: string;
  title: string;
  description: string;
  price: number;
};

const BannerProductItem = ({ image, title, description, price }: Props) => {
  return (
    <div className="relative">
      <div className="relative w-full h-72">
        <Image
          src={image}
          alt="Hero image"
          fill
          className="object-cover"
          priority
        />
      </div>
      <div className="text-center p-8 font-family-montserrat">
        <h2 className="mt-3 text-2xl font-bold">{title}</h2>
        <div className="mt-2 text-base leading-6">{description}</div>
        <div className="mt-5 text-xl">From {price}/=</div>
        <Button className="absolute right-4 top-4 font-bold" size="lg">
          Add to Cart
        </Button>
      </div>
    </div>
  );
};

export default BannerProductItem;
