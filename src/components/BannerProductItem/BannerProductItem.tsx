import React from "react";
import Image from "next/image";
import { Button } from "../ui/button";
import { Product } from "@/types";

type Props = {
  product: Product;
  addToCart: (product: Product, variant: { size: string; price: number }) => void;
};

const BannerProductItem = ({ product, addToCart }: Props) => {
  return (
    <div className="relative">
      <div className="relative w-full h-72">
        <Image
          src={product.image}
          alt="Hero image"
          fill
          className="object-cover rounded-md"
          priority
        />
      </div>
      <div className='text-center p-8 bg-white'>
        <h2 className="mt-3 text-2xl font-bold">{product.title}</h2>
        <div className="mt-2 text-base leading-6">{product.description}</div>
        {/* <div className="mt-5 text-xl">From {product.price}/=</div> */}
        <Button className="absolute right-4 top-4 font-bold" size="lg" onClick={() => addToCart(product, product.variants[2])}>
          Add to Cart
        </Button>
        <Button className="right-4 top-4 font-bold" size="lg" onClick={() => addToCart(product, product.variants[0])}>
          Add 200ml to Cart
        </Button>
        <Button className="right-4 top-4 font-bold" size="lg" onClick={() => addToCart(product, product.variants[1])}>
          Add 500ml to Cart
        </Button>
        <Button className="right-4 top-4 font-bold" size="lg" onClick={() => addToCart(product, product.variants[2])}>
          Add 1l to Cart
        </Button>
      </div>
    </div>
  );
};

export default BannerProductItem;
