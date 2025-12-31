"use client";

import {
  PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import { CartContext } from "@/context";
import { CartItem, CartItemInSessionStorage, Product } from "@/types";
import { ProductsList } from "@/components/ShopBanner/ShopBanner";

type Props = PropsWithChildren;

let isStorageReconciled = false;

const updateSessionStorage = (items: CartItem[]) => {
  console.log("items writing to session storage", items);
  window.sessionStorage.setItem(
    "qurrent.cart",
    JSON.stringify(
      items.map((cartItem) => ({
        id: cartItem.id,
        quantity: cartItem.orderQuantity,
        variant: cartItem.variant,
      }))
    )
  );
};

const CartProvider = ({ children }: Props) => {
  const availableProducts: Product[] = useMemo(() => ProductsList, []);

  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    // Load cart from sessionStorage when the component mounts and when product information updates
    const storedCart =
      typeof window !== "undefined" &&
      window.sessionStorage.getItem("qurrent.cart");
    const jsonStoredCart: CartItemInSessionStorage[] = storedCart
      ? JSON.parse(storedCart)
      : [];
    const items: CartItem[] = [];

    if (jsonStoredCart.length && availableProducts?.length) {
      jsonStoredCart.forEach((cartItem) => {
        const cartItemFound = availableProducts.find(
          (product) =>
            product.id === cartItem.id &&
            product.variants.find(
              (variant) => variant.size === cartItem.variant.size
            )
        );
        if (cartItemFound)
          items.push({
            ...cartItemFound,
            orderQuantity: cartItem.quantity,
            variant: cartItem.variant,
          });
      });

      // set the cart items array (context) from whats received from the session storage
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setCartItems(items);
      isStorageReconciled = true;
    } else if (!jsonStoredCart.length) {
      isStorageReconciled = true;
    }
  }, [availableProducts]);

  useEffect(() => {
    if (isStorageReconciled) {
      updateSessionStorage(cartItems);
    }
  }, [cartItems]);

  const addItem = useCallback(
    (item: CartItem) => {
      if (!item) return;
      const existingProductIndex = cartItems.findIndex(
        (cartItem) =>
          cartItem.id === item.id && cartItem.variant.size === item.variant.size
      );
      // Update state
      if (existingProductIndex > -1) {
        setCartItems((prevState) => [
          ...prevState.slice(0, existingProductIndex),
          {
            ...prevState[existingProductIndex],
            variant: item.variant,
            orderQuantity:
              prevState[existingProductIndex].orderQuantity +
              item.orderQuantity,
          },
          ...prevState.slice(existingProductIndex + 1),
        ]);
      } else {
        setCartItems((prevState) => [...prevState, { ...item }]);
      }
    },
    [cartItems]
  );

  const removeItem = useCallback(
    (id: string, variant: { size: string; price: number }) => {
      const indexToRemove = cartItems.findIndex(
        (item) => item.id === id && item.variant.size === variant.size
      );
      const updatedCart = [
        ...cartItems.slice(0, indexToRemove),
        ...cartItems.slice(indexToRemove + 1),
      ];

      // Update state
      setCartItems(updatedCart);
    },
    [cartItems]
  );

  const incrementItemQuantity = useCallback(
    (id: string, variant: { size: string; price: number }) => {
      const indexToUpdate = cartItems.findIndex(
        (item) => item.id === id && item.variant.size === variant.size
      );
      if (indexToUpdate > -1) {
        const updatedCart = [
          ...cartItems.slice(0, indexToUpdate),
          {
            ...cartItems[indexToUpdate],
            orderQuantity: cartItems[indexToUpdate].orderQuantity + 1,
          },
          ...cartItems.slice(indexToUpdate + 1),
        ];
        setCartItems(updatedCart);
      }
    },
    [cartItems]
  );

  const decrementItemQuantity = useCallback(
    (id: string, variant: { size: string; price: number }) => {
      const indexToUpdate = cartItems.findIndex(
        (item) => item.id === id && item.variant.size === variant.size
      );
      if (indexToUpdate > -1) {
        const currentQuantity = cartItems[indexToUpdate].orderQuantity;
        if (currentQuantity > 1) {
          const updatedCart = [
            ...cartItems.slice(0, indexToUpdate),
            {
              ...cartItems[indexToUpdate],
              orderQuantity: cartItems[indexToUpdate].orderQuantity - 1,
            },
            ...cartItems.slice(indexToUpdate + 1),
          ];
          setCartItems(updatedCart);
        }
      }
    },
    [cartItems]
  );

  const itemCount = useMemo(
    () =>
      cartItems.reduce((acc, item) => {
        return acc + item.orderQuantity;
      }, 0),
    [cartItems]
  );

  const subTotal = useMemo(
    () =>
      cartItems.reduce((acc, item) => {
        return acc + item.variant.price * item.orderQuantity;
      }, 0),
    [cartItems]
  );

  const formattedSubTotal = useMemo(() => {
    return subTotal.toFixed(2);
  }, [subTotal]);

  const resetCart = () => {
    setCartItems([]);
  };

  const value = useMemo(
    () => ({
      addItem,
      cartItems,
      formattedSubTotal,
      itemCount,
      removeItem,
      incrementItemQuantity,
      decrementItemQuantity,
      resetCart,
      subTotal,
    }),
    [
      cartItems,
      itemCount,
      subTotal,
      formattedSubTotal,
      addItem,
      removeItem,
      incrementItemQuantity,
      decrementItemQuantity
    ]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export default CartProvider;
