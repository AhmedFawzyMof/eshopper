<template>
  <Loading v-if="loading" />
  <div class="container-fluid pt-5">
    <div class="row px-xl-5 pb-3">
      <div class="col-lg-3 col-md-6 col-sm-12 pb-1" v-for="product in products">
        <ProductCard :product="product" />
      </div>
    </div>
  </div>
  <Pagination :totalPages="pages" :currentPage="currentPage" />
</template>
<script lang="ts">
import { defineComponent, onMounted, ref, watch } from "vue";
import ProductCard from "../components/ProductCard.vue";
import type { Product } from "../types";
import { useRoute } from "vue-router";
import Pagination from "../components/Pagination.vue";
import Loading from "../components/Loading.vue";

export default defineComponent({
  name: "Category",
  components: { ProductCard, Pagination, Loading },
  setup() {
    const products = ref<Product[]>([]);
    const route = useRoute();
    let id = route.params.id;
    const limit = ref(30);
    const pages = ref(0);
    const currentPage = ref(1);
    const loading = ref(false);

    onMounted(() => {
      currentPage.value = Number(localStorage.getItem("current_page")) || 1;
      get_products();
    });

    const get_products = async () => {
      loading.value = true;
      const req = await fetch(`/api/v1/category/${id}/${limit.value}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const res = await req.json();
      products.value = res.products.products;
      pages.value = res.products.pages;
      loading.value = false;
    };

    watch(
      () => currentPage.value,
      () => {
        limit.value = currentPage.value * 30;
      }
    );

    watch(
      () => limit.value,
      () => {
        get_products();
      }
    );

    watch(
      () => route.params.id,
      () => {
        id = route.params.id;
        get_products();
      }
    );

    return {
      products,
      currentPage,
      pages,
      loading,
    };
  },
});
</script>
