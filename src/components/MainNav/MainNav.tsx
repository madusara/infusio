import Image from "next/image";
import { NavLink } from "./NavLink";
import { ShoppingCartIcon } from "lucide-react";
import { Button } from "../ui/button";

const MainNav = () => {
  return (
    <div className="flex justify-between items-center w-full bg-green-200 p-8 py-12">
      <div>
        <Image
          src="/assets/images/eg-logo-white-cropped.png"
          alt="EG Logo"
          width={120}
          height={120}
          className="bg-green-500 p-5 rounded-full"
        />
      </div>
      <div className="flex gap-6 text-xl font-semibold text-brown-500">
        <NavLink href="/">Home</NavLink>
        <NavLink href="/">Our story</NavLink>
        <NavLink href="/">Recipes</NavLink>
        <NavLink href="/">FAQ</NavLink>
        <NavLink href="/">Contact us</NavLink>
      </div>
      <Button size="icon-lg" variant="link"><ShoppingCartIcon className="text-white size-8" /></Button>
    </div>
  );
};

export default MainNav;
