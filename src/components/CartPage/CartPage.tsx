"use client";
import { useState } from "react";
import { useCartContext } from "@/hooks";
import { CartItem } from "../CartItem";
import { Button } from "../ui";
import Link from "next/link";

const CartPage = () => {
  const { itemCount, formattedSubTotal, subTotal, cartItems, resetCart } =
    useCartContext();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notes, setNotes] = useState("");

  const addOrder = async () => {
    try {
      setIsSubmitting(true);
      setError(null);

      // TODO: Replace with actual user email (from authentication)
      // For now, using a placeholder
      const userEmail = "customer@example.com";

      // Transform cart items to match the order schema
      const orderItems = cartItems.map((item) => ({
        id: item.id,
        variant: {
          size: item.variant.size,
          price: item.variant.price,
        },
        quantity: item.orderQuantity,
      }));

      // TODO: Replace with actual address from a checkout form
      // For now, using placeholder data
      const orderData = {
        userEmail,
        items: orderItems,
        notes: "Please deliver to the nearest post office",
        address: {
          name: "John Doe",
          email: userEmail,
          phone1: "+94771234567",
          phone2: "",
          addressLine1: "123 Main Street",
          addressLine2: "Apartment 4B",
          district: "Colombo",
        },
        paymentMethod: "cod" as const,
        totalAmount: subTotal,
      };

      // Send order to API
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to create order");
      }

      // Success! Clear the cart
      alert(`Order created successfully! Order ID: ${result.data.id}`);
      resetCart();

      // TODO: Redirect to order confirmation page
      // router.push(`/orders/${result.data.id}`);
    } catch (err) {
      console.error("Error creating order:", err);
      setError(err instanceof Error ? err.message : "Failed to create order");
    } finally {
      setIsSubmitting(false);
    }
  };

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
            {cartItems.map((item) => (
              <CartItem key={`${item.id}-${item.variant.size}`} item={item} />
            ))}
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

          {error && (
            <div className="mt-4 p-3 bg-red-100 text-red-700 rounded">
              {error}
            </div>
          )}

          <div>
            <textarea
              placeholder="Notes to the seller"
              rows={3}
              className="mt-8 w-full border border-gray-300 rounded-md p-2"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
            <Button className="mt-4 w-full">
              <Link href="/checkout" className="w-full">
                Checkout
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
