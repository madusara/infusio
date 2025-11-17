"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "../ui/button";
import { Product } from "@/types";
import SlidingPane from "react-sliding-pane";
import "react-sliding-pane/dist/react-sliding-pane.css";
import clsx from "clsx";
import { XIcon } from "lucide-react";

type Props = {
  product: Product;
  addToCart: (
    product: Product,
    variant: { size: string; price: number }
  ) => void;
};

const BannerProductItem = ({ product, addToCart }: Props) => {
  const [isPaneOpen, setIsPaneOpen] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState(product.variants[0]);
  const [paneWidth, setPaneWidth] = useState("100%");

  useEffect(() => {
    if (typeof window !== "undefined") {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setPaneWidth(window.innerWidth > 768 ? "50%" : "100%");
    }
  }, [paneWidth]);

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
      <div className="text-center p-8 bg-white">
        <h2 className="mt-3 text-2xl font-bold">{product.title}</h2>
        <div className="mt-2 text-base leading-6">{product.description}</div>
        {/* <div className="mt-5 text-xl">From {product.price}/=</div> */}
        <Button
          className="absolute right-4 top-4 font-bold"
          size="lg"
          onClick={() => setIsPaneOpen(true)}
        >
          Add to Cart
        </Button>
      </div>
      <SlidingPane
        width={paneWidth}
        overlayClassName="z-60"
        isOpen={isPaneOpen}
        onRequestClose={() => {
          setIsPaneOpen(false);
        }}
        hideHeader
      >
        <div>
        <h2 className="text-2xl font-bold">Choose your volume</h2>
        <Button
          className="absolute right-4 top-4 font-bold"
          size="icon"
          variant="outline"
          onClick={() => setIsPaneOpen(false)}
        >
          <XIcon className="w-4 h-4" />
        </Button>
        </div>
        <div className="flex gap-4">
          <div className="mt-10 relative w-1/2 pt-[50%]">
            <Image
              src={product.image}
              alt={product.title}
              fill
              className="object-cover rounded-md"
            />
          </div>
          <div className="mt-10 relative w-1/2 pt-[50%]">
            <Image
              src={product.image}
              alt={product.title}
              fill
              className="object-cover rounded-md"
            />
          </div>
        </div>
        <div className="flex flex-col items-end">
          <div className="mt-10 text-xl font-semibold">
            {`${product.title} - ${selectedVariant.size}`}
          </div>
          <div className="mt-4 flex justify-end gap-1">
            {product.variants.map((variant) => (
              <Button
                key={variant.size}
                className={clsx(
                  "font-bold hover:bg-green-500 hover:text-green-200 min-w-16",
                  selectedVariant.size === variant.size &&
                    "bg-green-200 text-white"
                )}
                variant={
                  selectedVariant.size === variant.size
                    ? "secondary"
                    : "secondary"
                }
                size="sm"
                onClick={() => setSelectedVariant(variant)}
              >
                {variant.size}
              </Button>
            ))}
          </div>
          <div className="mt-4 text-xl font-bold">
            Rs. {selectedVariant.price.toFixed(2)}
          </div>
          <Button
            className="mt-4 text-center font-bold min-w-40"
            size="lg"
            onClick={() => {
              addToCart(product, selectedVariant)
              setIsPaneOpen(false)
            }}
          >
            Add to Cart
          </Button>
        </div>
      </SlidingPane>
    </div>
  );
};

export default BannerProductItem;
