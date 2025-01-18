<template>
  <Loading v-if="loading" />
  <div class="container-fluid pt-5">
    <div class="row px-xl-5">
      <div class="col-lg-3 col-md-12">
        <div class="border-bottom mb-4 pb-4">
          <h5 class="font-weight-semi-bold mb-4">Filter by price</h5>
          <form>
            <div
              class="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3"
            >
              <input
                type="radio"
                name="price"
                class="custom-control-input"
                checked
                id="price-all"
                v-model="selectedPrice"
                value="all"
              />
              <label class="custom-control-label" for="price-all">
                All Price
              </label>
            </div>
            <div
              class="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3"
              v-for="(price, index) in priceRange"
            >
              <input
                type="radio"
                name="price"
                v-model="selectedPrice"
                class="custom-control-input"
                :id="`price-${index + 1}`"
                :value="priceRange[index].price_range"
              />
              <label class="custom-control-label" :for="`price-${index + 1}`">
                {{ price.price_range }}
              </label>
            </div>
          </form>
        </div>

        <div class="border-bottom mb-4 pb-4">
          <h5 class="font-weight-semi-bold mb-4">Filter by size</h5>
          <form>
            <div
              class="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3"
            >
              <input
                type="radio"
                name="size"
                class="custom-control-input"
                v-model="selectedSize"
                checked
                id="size-all"
                value="0"
              />
              <label class="custom-control-label" for="size-all">
                All Size
              </label>
            </div>
            <div
              class="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3"
              v-for="size in sizes"
            >
              <input
                type="radio"
                name="size"
                class="custom-control-input"
                v-model="selectedSize"
                :id="`size-${size.id}`"
                :value="size.id"
              />
              <label class="custom-control-label" :for="`size-${size.id}`">{{
                size.size
              }}</label>
            </div>
          </form>
        </div>

        <div class="mb-5">
          <h5 class="font-weight-semi-bold mb-4">Filter by Category</h5>
          <form>
            <div
              class="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3"
            >
              <input
                type="radio"
                name="category"
                class="custom-control-input"
                checked
                v-model="selectedCategory"
                id="category-all"
                value="0"
              />
              <label class="custom-control-label" for="category-all">
                All Size
              </label>
            </div>
            <div
              class="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3"
              v-for="category in categories"
            >
              <input
                type="radio"
                name="category"
                class="custom-control-input"
                v-model="selectedCategory"
                :id="`category-${category.id}`"
                :value="category.id"
              />
              <label
                class="custom-control-label"
                :for="`category-${category.id}`"
                >{{ category.name }}</label
              >
            </div>
          </form>
        </div>
      </div>

      <div class="col-lg-9 col-md-12">
        <div class="row pb-3">
          <div
            class="col-lg-4 col-md-6 col-sm-12 pb-1"
            v-for="product in products"
          >
            <ProductCard :product="product" />
          </div>
          <div class="col-12 pb-1"></div>
        </div>
      </div>
    </div>
  </div>
  <Pagination
    :totalPages="pages"
    :currentPage="currentPage"
    @update:current-page="currentPage = $event"
  />
</template>
<script lang="ts">
import { defineComponent, onMounted, ref, watch } from "vue";
import ProductCard from "../components/ProductCard.vue";
import Pagination from "../components/Pagination.vue";
import Loading from "../components/Loading.vue";

import type { Product, Category, Sizes, PriceRange } from "../types";

export default defineComponent({
  name: "Shop",
  components: { ProductCard, Pagination, Loading },
  setup() {
    const limit = ref(30);
    const products = ref<Product[]>([]);
    const categories = ref<Category[]>([]);
    const sizes = ref<Sizes[]>([]);
    const priceRange = ref<PriceRange[]>([]);
    const selectedCategory = ref(0);
    const selectedSize = ref(0);
    const selectedPrice = ref("all");
    const currentPage = ref(1);
    const pages = ref(0);
    const loading = ref(false);

    onMounted(() => {
      currentPage.value = Number(localStorage.getItem("current_page")) || 1;
      get_shop_products();
    });
    const get_shop_products = async () => {
      loading.value = true;
      const req = await fetch(`/api/v1/products/${limit.value}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const res = await req.json();
      products.value = res.products.products;
      pages.value = res.products.pages;
      priceRange.value = res.products.priceRange;
      categories.value = res.categories;
      sizes.value = res.sizes;
      loading.value = false;
    };

    const filterProducts = async () => {
      loading.value = true;
      const req = await fetch(`/api/v1/products/filter`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          category: selectedCategory.value,
          size: selectedSize.value,
          price: selectedPrice.value,
          limit: limit.value,
        }),
      });
      const res = await req.json();
      pages.value = res.products.pages;
      products.value = res.products.products;
      priceRange.value = res.products.priceRange;
      categories.value = res.categories;
      sizes.value = res.sizes;
      loading.value = false;
    };

    watch(
      () => selectedCategory.value,
      () => {
        filterProducts();
      }
    );
    watch(
      () => selectedSize.value,
      () => {
        filterProducts();
      }
    );
    watch(
      () => selectedPrice.value,
      () => {
        filterProducts();
      }
    );
    watch(
      () => currentPage.value,
      () => {
        limit.value = currentPage.value * 30;
      }
    );

    watch(
      () => limit.value,
      () => {
        if (
          selectedCategory.value !== 0 ||
          selectedSize.value !== 0 ||
          selectedPrice.value !== "all"
        ) {
          filterProducts();
        } else {
          get_shop_products();
        }
      }
    );

    return {
      products,
      categories,
      selectedCategory,
      sizes,
      selectedSize,
      priceRange,
      selectedPrice,
      currentPage,
      pages,
      loading,
    };
  },
});
</script>
