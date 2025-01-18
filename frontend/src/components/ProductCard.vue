<template>
  <div class="card product-item border-0 mb-4">
    <div
      class="card-header product-img position-relative overflow-hidden bg-transparent border p-0"
    >
      <img
        id="product_image"
        class="img-fluid w-100"
        :src="product.image"
        alt=""
      />
    </div>
    <div class="card-body border-left border-right text-center p-0 pt-4 pb-3">
      <h6 class="text-truncate mb-3">{{ product.name }}</h6>
      <div class="d-flex justify-content-center">
        <h6>L.E {{ product.price }}</h6>
        <h6 class="text-muted ml-2">
          <del>L.E {{ product.offer }}</del>
        </h6>
      </div>
    </div>
    <div class="card-footer d-flex justify-content-between bg-light border">
      <router-link
        :to="`/eshopper/products/${product.id}`"
        class="btn btn-sm text-dark p-0"
        ><i class="fas fa-eye text-primary mr-1"></i>View Detail
      </router-link>
      <button @click="addToCart(product.id)" class="btn btn-sm text-dark p-0">
        <i class="fas fa-shopping-cart text-primary mr-1"></i>
        Add To Cart
      </button>
    </div>
  </div>
</template>
<script lang="ts">
import { useCartStore } from "../stores/cart";
import { defineComponent } from "vue";

export default defineComponent({
  name: "ProductCard",
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  setup() {
    const cartStore = useCartStore();

    const addToCart = (id: number) => {
      cartStore.addToCart(id, 1, 0);
    };

    return { cartStore, addToCart };
  },
});
</script>
