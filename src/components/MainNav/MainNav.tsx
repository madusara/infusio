"use client";
import Image from "next/image";
import { NavLink } from "./NavLink";
import { CartButton } from "./CartButton";
import { useEffect, useState, useCallback } from "react";
import clsx from "clsx";
import { useSelectedLayoutSegment } from "next/navigation";

const MainNav = () => {
  const [isSticky, setIsSticky] = useState(false);
  const layoutSegment = useSelectedLayoutSegment();
  const [barPaddingY, setBarPaddingY] = useState(layoutSegment === null ? 12 : 1);

  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY;
    const newPadding = Math.max(1, 12 - scrollY / 20); // minimum py-4
    setBarPaddingY(newPadding);
    setIsSticky(scrollY > 0);
  }, []);

  useEffect(() => {
    if(layoutSegment === null) {  
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, [handleScroll, layoutSegment]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setBarPaddingY(layoutSegment === null ? 12 : 1);
  }, [layoutSegment])

  useEffect(() => {
    console.log("scrollY", barPaddingY);
  }, [barPaddingY])

  return (
    <div
      className={clsx(
        "flex justify-between items-center w-full bg-green-200 transition-all duration-100",
        isSticky && "sticky top-0 z-50"
      )}
      style={{
        padding: "24px",
        paddingTop: `${barPaddingY * 0.25}rem`,
        paddingBottom: `${barPaddingY * 0.25}rem`,
      }} // Tailwind py-12 = 3rem
    >
      <div>
        <Image
          src="/assets/images/eg-logo-white-cropped.png"
          alt="EG Logo"
          width={120}
          height={120}
          className={clsx(
            "p-5 rounded-full transition-all duration-300",
            barPaddingY > 1 && "bg-green-500"
          )}
        />
      </div>
      <div className="flex gap-6 text-xl font-semibold text-brown-500">
        <NavLink href="/">Home</NavLink>
        <NavLink href="/">Our story</NavLink>
        <NavLink href="/">Recipes</NavLink>
        <NavLink href="/">FAQ</NavLink>
        <NavLink href="/">Contact us</NavLink>
      </div>
      <CartButton />
    </div>
  );
};

export default MainNav;
