import { CartList, ICartItem } from "@/app/cart/type";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ICartStore {
  cartList: CartList;
  addCartItem(item: ICartItem): void;
  deleteCartItem(id: number, variant: string): void;
  updateCartItem(item: ICartItem): void;
  getCartItemIndex(id: number, variant: string): number;
}

const useCartStore = create<ICartStore>()(
  persist(
    (set, get) => ({
      cartList: [],
      addCartItem(item) {
        set((state) => ({
          cartList: [...state.cartList, item],
        }));
      },
      deleteCartItem(id, variant) {
        set((state) => ({
          cartList: state.cartList.filter(
            (item) => !(item.id === id && item.variant === variant)
          ),
        }));
      },
      updateCartItem(item) {
        set((state) => ({
          cartList: state.cartList.map((cartItem) =>
            cartItem.id === item.id && cartItem.variant === item.variant
              ? item
              : cartItem
          ),
        }));
      },
      getCartItemIndex(id, variant) {
        return get().cartList.findIndex(
          (item) => item.id === id && item.variant === variant
        );
      },
    }),
    { name: "cart-storage" }
  )
);

export default useCartStore;
