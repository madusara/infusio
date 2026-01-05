"use client";
import React, { useState } from "react";
import { Button, Input } from "../ui";
import { useCartContext } from "@/hooks";
import { CheckoutOrderItem } from "../CheckoutOrderItem";

const CheckoutPage = () => {
  const { subTotal, cartItems, resetCart } = useCartContext();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const addOrder = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Get form data
    const formData = new FormData(e.currentTarget);
    try {
      setIsSubmitting(true);
      setError(null);

      const userEmail = formData.get("email") as string;

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
          name: formData.get("name") as string,
          email: userEmail,
          phone1: formData.get("phone1") as string,
          phone2: formData.get("phone2") as string,
          addressLine1: formData.get("addressLine1") as string,
          addressLine2: formData.get("addressLine2") as string,
          district: formData.get("district") as string,
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
      // resetCart();

      // TODO: Redirect to order confirmation page
      // router.push(`/orders/${result.data.id}`);
    } catch (err) {
      console.error("Error creating order:", err);
      setError(err instanceof Error ? err.message : "Failed to create order");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Get form data
    const formData = new FormData(e.currentTarget);

    // Convert FormData to object
    const formValues = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone1: formData.get("phone1"),
      phone2: formData.get("phone2"),
      addressLine1: formData.get("addressLine1"),
      addressLine2: formData.get("addressLine2"),
      district: formData.get("district"),
    };

    console.log("Form submitted with values:", formValues);
  };

  return (
    <div>
      {error && (
        <div className="mt-4 p-3 bg-red-100 text-red-700 rounded">{error}</div>
      )}
      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-7 p-8">
          <h1 className="text-2xl font-bold">Delivery Details</h1>
          <p className="text-sm text-gray-500">
            Please fill in the details below to complete your order.
          </p>
          <form className="mt-4" onSubmit={addOrder}>
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-1">
                <Input
                  id="email"
                  name="email"
                  label="Email"
                  placeholder="Email"
                />
                <Input
                  id="phone1"
                  name="phone1"
                  label="Phone 1"
                  placeholder="Phone 1"
                />
                <Input
                  id="phone2"
                  name="phone2"
                  label="Phone 2"
                  placeholder="Phone 2"
                />
              </div>
              <div className="col-span-1">
                <Input id="name" name="name" label="Name" placeholder="Name" />
                <Input
                  id="addressLine1"
                  name="addressLine1"
                  label="Address Line 1"
                  placeholder="Address Line 1"
                />
                <Input
                  id="addressLine2"
                  name="addressLine2"
                  label="Address Line 2"
                  placeholder="Address Line 2"
                />
                <Input
                  id="district"
                  name="district"
                  label="District"
                  placeholder="District"
                />
              </div>
            </div>
            <Button
              type="submit"
              disabled={isSubmitting || cartItems.length === 0}
              className="mt-4 w-full"
            >
              {isSubmitting ? "Creating Order..." : "Place Order"}
            </Button>
          </form>
          {/* <Button
            onClick={addOrder}
            disabled={isSubmitting || cartItems.length === 0}
            className="mt-4 w-full"
          >
            {isSubmitting ? "Creating Order..." : "Place Order"}
          </Button> */}
        </div>
        <div className="col-span-5 bg-gray-100 p-8 rounded-md">
          <h2 className="text-2xl font-bold">Order Summary</h2>
          <div className="mt-4 grid grid-cols-12 gap-4">
          {cartItems.map((item) => (
            <CheckoutOrderItem key={`${item.id}-${item.variant.size}`} item={item} />
          ))}
          </div>
          <div className="mt-6 flex flex-col gap-2 border-t border-gray-400 pt-4">
            <div className="flex justify-between">
              <span className="font-medium text-lg">Subtotal</span>
              <span className="text-lg">{subTotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-base">Shipping</span>
              <span className="text-base">350.00</span>
            </div>
          </div>
          <div className="mt-6 flex justify-between border-t border-gray-200 pt-4">
            <span className="font-medium text-xl">Total</span>
            <span className="text-lg font-medium">{(subTotal + 350).toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
