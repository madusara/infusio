import { Button } from "@/components/ui/button";
import { ShoppingCartIcon } from "lucide-react";
import { useCartContext } from "@/hooks";
import Link from "next/link";


const CartButton = () => {
  const { itemCount } = useCartContext();


  return (
    <Link href="/cart">
      <Button size="icon-lg" variant="link">
        <ShoppingCartIcon className="text-white size-8" />
        <span className="text-white size-8">
          {itemCount > 0 ? itemCount : ""}
        </span>
      </Button>
    </Link>
  );
};

export default CartButton;
