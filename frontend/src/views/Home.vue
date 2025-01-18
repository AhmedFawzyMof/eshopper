<template>
  <div class="container-fluid pt-5">
    <div class="text-center mb-4">
      <h2 class="section-title px-5">
        <span class="px-2">Trandy Products</span>
      </h2>
    </div>
    <div class="row px-xl-5 pb-3">
      <div class="col-lg-3 col-md-6 col-sm-12 pb-1" v-for="product in products">
        <ProductCard :product="product" />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import ProductCard from "../components/ProductCard.vue";
import type { Product } from "../types";

export default defineComponent({
  name: "HomePage",
  components: { ProductCard },
  setup() {
    const products = ref<Product[]>([]);

    onMounted(() => {
      get_trandy_products();
    });

    const get_trandy_products = async () => {
      const req = await fetch("/api/v1", {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const res = await req.json();
      products.value = res.trandy_products;
    };

    return { products };
  },
});
</script>
<style>
#product_image {
  height: 400px;
}
</style>
