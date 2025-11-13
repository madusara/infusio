import React from "react";
import Image from "next/image";
import { BannerProductItem } from "../BannerProductItem";


const ShopBanner = () => {
  return (
    <div className="p-10  pb-72">
      <h1 className="mt-16 text-8xl font-bold font-arial text-center">Shop</h1>
      <div className="mt-28 grid grid-cols-4 gap-6">
        <BannerProductItem title="Masala Chai Elixir" description="For making masala chai latte, mocktails and more" price={1500} image="/assets/images/chai-banner-1.jpg" />
        <BannerProductItem title="Ginger Elixir" description="For making masala chai latte, mocktails and more" price={1300} image="/assets/images/ginger-banner-1.jpg" />
        <BannerProductItem title="Masala Chai Elixir" description="For making masala chai latte, mocktails and more" price={1500} image="/assets/images/chai-banner-1.jpg" />
        <BannerProductItem title="Ginger Elixir" description="For making masala chai latte, mocktails and more" price={1500} image="/assets/images/ginger-banner-1.jpg" />
      </div>
    </div>
  );
};

export default ShopBanner;
