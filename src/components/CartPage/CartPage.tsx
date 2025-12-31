"use client";
import { useCartContext } from "@/hooks";
import { CartItem } from "../CartItem";

const CartPage = () => {
  const { itemCount, formattedSubTotal, cartItems } =
    useCartContext();
  return (
    <div className="pt-16 px-16 pb-32">
      <h1 className="text-3xl font-bold">Your Cart ({itemCount})</h1>
      <h3 className="mt-1 text-lg font-thin">
        Your Cart total is {formattedSubTotal}
      </h3>
      <div className="mt-12 grid grid-cols-12 gap-8">
        <div className="col-span-7">
          <div className="grid grid-cols-12 gap-y-4 gap-x-8">
            <div className="col-span-6"></div>
            <div className="col-span-3 font-bold">Quantity</div>
            <div className="col-span-2 font-bold">Total</div>
            <div className="col-span-1"></div>
            {cartItems.map((item) => <CartItem key={`${item.id}-${item.variant.size}`} item={item} />)}
          </div>
        </div>
        <div className="col-span-5 border-l border-gray-200 p-8 py-2 h-fit">
          <h2 className="text-2xl font-bold">Order Summary</h2>
          <div className="mt-8">
            <div className="flex justify-between">
              <p>Subtotal</p>
              <p>{formattedSubTotal}</p>
            </div>
            <div className="mt-4 flex justify-between">
              <p>Shipping</p>
              <p>0</p>
            </div>
            <hr className="my-6" />
            <div className="flex justify-between text-lg font-bold">
              <p>Total</p>
              <p>{formattedSubTotal}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
