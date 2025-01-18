import { defineStore } from "pinia";
import type { ProductCart } from "../types";

export const useCartStore = defineStore("CartStore", {
  state: () => ({
    cart: [] as ProductCart[],
  }),
  getters: {
    getLength: (state) => {
      return state.cart.reduce((acc, item) => acc + item.quantity, 0);
    },
  },
  actions: {
    initalizeCart() {
      if (!localStorage.getItem("cart")) {
        this.cart = [] as any[];
        localStorage.setItem("cart", JSON.stringify(this.cart));
        return;
      }
      this.cart = JSON.parse(String(localStorage.getItem("cart")));
    },
    productInCart(product_id: number) {
      return (
        this.cart.find((item: ProductCart) => item.product === product_id) !==
        undefined
      );
    },
    clearCart() {
      this.cart = [] as any[];
      localStorage.setItem("cart", JSON.stringify(this.cart));
    },
    removeFromCart(product_id: number) {
      this.cart = this.cart.filter(
        (item: ProductCart) => item.product !== product_id
      );
      localStorage.setItem("cart", JSON.stringify(this.cart));
    },
    addToCart(product_id: number, quantity: number, size: number) {
      const inCart = this.cart.find(
        (item: ProductCart) => item.product === product_id
      );

      if (!inCart) {
        this.cart.push({ product: product_id, quantity: quantity, size: size });
        localStorage.setItem("cart", JSON.stringify(this.cart));
        return;
      }

      if (inCart.quantity + quantity < 20) {
        inCart.quantity += quantity;
        localStorage.setItem("cart", JSON.stringify(this.cart));
      }
    },
    incrementQuantity(product_id: number) {
      const inCart = this.cart.find(
        (item: ProductCart) => item.product === product_id
      );

      if (inCart!.quantity < 20) {
        inCart!.quantity += 1;
        localStorage.setItem("cart", JSON.stringify(this.cart));
      }
    },
    decrementQuantity(product_id: number) {
      const inCart = this.cart.find(
        (item: ProductCart) => item.product === product_id
      );

      if (inCart!.quantity > 1) {
        inCart!.quantity -= 1;
        localStorage.setItem("cart", JSON.stringify(this.cart));
      }
    },
    getProductQuantity(product_id: number) {
      const inCart = this.cart.find(
        (item: ProductCart) => item.product === product_id
      );
      return inCart ? inCart.quantity : 0;
    },
    getProductSize(product_id: number) {
      const inCart = this.cart.find(
        (item: ProductCart) => item.product === product_id
      );
      return inCart ? inCart.size : 0;
    },
    getCartProducts() {
      return this.cart.map((item: ProductCart) => item.product);
    },
    setProductSize(product_id: number, size: number) {
      const inCart = this.cart.find(
        (item: ProductCart) => item.product === product_id
      );
      if (inCart) {
        inCart.size = size;
        localStorage.setItem("cart", JSON.stringify(this.cart));
      }
    },
  },
});
