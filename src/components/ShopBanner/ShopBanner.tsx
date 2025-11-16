"use client";
import { useCartContext } from "@/hooks";
import { BannerProductItem } from "../BannerProductItem";
import { Product } from "@/types";

export const ProductsList = [
  {
    title: "Masala Chai Elixir",
    id: "masala-chai-elixir",
    description: "For making masala chai latte, mocktails, cocktails, coffee-chai blends, desserts, baking, etc.",
    variants: [
      { size: "200ml", price: 1500 },
      { size: "500ml", price: 2500 },
      { size: "1l", price: 4000 },
    ],
    image: "/assets/images/chai-banner-1.jpg",
  },
  {
    title: "Ginger Elixir",
    id: "ginger-elixir",
    description: "For making Ginger tea, mocktails, cocktails, juices, smoothies, sparkling drinks, etc.",
    variants: [
      { size: "200ml", price: 1500 },
      { size: "500ml", price: 2500 },
      { size: "1l", price: 4000 },
    ],
    image: "/assets/images/ginger-banner-1.jpg",
  },
  {
    title: "Cardamom-Rose Elixir",
    id: "cardamom-rose-elixir",
    description: "For making latte, mocktails, desserts, Middle Eastern/Indian inspired milk drinks, etc.",
    variants: [
      { size: "200ml", price: 1500 },
      { size: "500ml", price: 2500 },
      { size: "1l", price: 4000 },
    ],
    image: "/assets/images/chai-banner-1.jpg",
  },
  {
    title: "Cinnamon-Vanilla Elixir",
    id: "cinnamon-vanilla-elixir",
    description: "For making latte, cinnamon tea, mocktails, smoothies, breakfast bowls, baking etc",
    variants: [
      { size: "200ml", price: 1500 },
      { size: "500ml", price: 2500 },
      { size: "1l", price: 4000 },
    ],
    image: "/assets/images/ginger-banner-1.jpg",
  },
];

const ShopBanner = () => {

  const { addItem } = useCartContext();

  const handleAddToCart = (product: Product, variant: { size: string; price: number }) => {
    // console.log("variant 1", { ...product, orderQuantity: 1, variant: variant });
    if (product) addItem({ ...product, orderQuantity: 1, variant: variant });
  };

  return (
    <div>
      <div className="relative z-1 p-16">
        <div className="absolute top-0 left-0 w-full h-full z-[-1] bg-[url('/assets/images/grey-strips-bg.svg')]"></div>
        <h1 className="text-6xl font-bold font-arial text-center m-auto flex justify-center items-center">Shop</h1>
      </div>
      <div className="grid grid-cols-4 gap-6 px-4 pb-16">
        {ProductsList.map((product) => (
          <BannerProductItem
            key={product.title}
            product={product}
            addToCart={handleAddToCart}
          />
        ))}
      </div>
    </div>
  );
};

export default ShopBanner;
