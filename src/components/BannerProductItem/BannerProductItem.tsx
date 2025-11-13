import React from "react";
import Image from "next/image";

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
      <div className="text-center p-8 border border-gray-300 rounded-b-lg">
        <h2 className="mt-3 text-3xl font-bold">{title}</h2>
        <div className="mt-2 text-xl leading-6">{description}</div>
        <div className="mt-5 text-xl">From {price}/=</div>
        <button className="bg-brown-500 text-white px-4 py-2 rounded-md absolute right-4 top-4">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default BannerProductItem;
