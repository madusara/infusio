import React from "react";
import Image from "next/image";
import { CartItem as CartItemType } from "@/types";

type Props = {
  item: CartItemType;
};

const CheckoutOrderItem = ({ item }: Props) => {
  return (
    <React.Fragment key={`${item.id}-${item.variant.size}`}>
      <div className="flex gap-4 col-span-8">
        <div className="relative min-w-16 w-16 h-16">
          <Image
            src={item.image}
            alt={item.title}
            fill
            className="object-cover rounded-md border border-gray-200"
          />
        </div>
        <div>
          <h2 className="text-lg font-semibold">{item.title}</h2>
          <p className="text-sm text-gray-500">{item.variant.size} ({item.variant.price.toFixed(2)}) x {item.orderQuantity}</p>
        </div>
      </div>
      {/* <p className="col-span-2">{item.orderQuantity}</p> */}
      {/* <div className="col-span-3">
        {item.orderQuantity}
      </div> */}
      <p className="col-span-4 text-right">
        {(item.variant.price * item.orderQuantity).toFixed(2)}
      </p>
    </React.Fragment>
  );
};

export default CheckoutOrderItem;
