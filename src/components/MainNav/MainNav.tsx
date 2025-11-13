import Image from "next/image";
import Link from "next/link";

const MainNav = () => {
  return (
    <div className="flex justify-between items-center w-full bg-neutral-100">
      <div>
        <Image
          src="/assets/images/eg-logo.png"
          alt="EG Logo"
          width={180}
          height={180}
        />
      </div>
      <div className="flex gap-6 text-xl font-semibold text-brown-500">
        <Link href="/" className="text-brown-500">HOME</Link>
        <Link href="/">OUR STORY</Link>
        <Link href="/">RECIPES</Link>
        <Link href="/">FAQ</Link>
        <Link href="/">CONTACT US</Link>
      </div>
      <div className="mr-12"><Image src="/assets/icons/cart.svg" alt="Cart" width={36} height={36} /></div>
    </div>
  );
};

export default MainNav;
