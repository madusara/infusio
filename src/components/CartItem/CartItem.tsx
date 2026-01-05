import React from "react";
import { useCartContext } from "@/hooks";
import Image from "next/image";
import { Button } from "../ui";
import { TrashIcon } from "lucide-react";
import { QuantityChanger } from "../QuantityChanger";
import { CartItem as CartItemType } from "@/types";

type Props = {
  item: CartItemType;
};

const CartItem = ({ item }: Props) => {
  const { removeItem, incrementItemQuantity, decrementItemQuantity } =
    useCartContext();

  return (
    <React.Fragment key={`${item.id}-${item.variant.size}`}>
      <div className="flex gap-4 col-span-6">
        <div className="relative min-w-32 w-32 h-32">
          <Image
            src={item.image}
            alt={item.title}
            fill
            className="object-cover rounded-md border border-gray-200"
          />
        </div>
        <div>
          <h2 className="text-lg font-semibold">{item.title}</h2>
          <p>{item.variant.size}</p>
          <p>Rs.{item.variant.price.toFixed(2)}</p>
        </div>
      </div>
      {/* <p className="col-span-2">{item.orderQuantity}</p> */}
      <div className="col-span-3">
        <QuantityChanger
          quantity={item.orderQuantity}
          onQuantityDecrement={() =>
            decrementItemQuantity(item.id, item.variant)
          }
          onQuantityIncrement={() =>
            incrementItemQuantity(item.id, item.variant)
          }
        />
      </div>
      <p className="col-span-2">
        {(item.variant.price * item.orderQuantity).toFixed(2)}
      </p>
      <div className="col-span-1">
        <Button
          variant="outline"
          size="icon"
          onClick={() => removeItem(item.id, item.variant)}
        >
          <TrashIcon className="w-4 h-4" />
        </Button>
      </div>
    </React.Fragment>
  );
};

export default CartItem;
