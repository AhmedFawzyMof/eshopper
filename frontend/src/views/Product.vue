<template>
  <div class="container-fluid py-5">
    <div class="row px-xl-5">
      <div class="col-lg-5 pb-5">
        <div id="product-carousel" class="carousel slide" data-ride="carousel">
          <div class="carousel-inner border">
            <div class="carousel-item active">
              <img class="w-100 h-100" :src="product.image" alt="Image" />
            </div>
          </div>
        </div>
      </div>

      <div class="col-lg-7 pb-5">
        <h3 class="font-weight-semi-bold">{{ product.name }}</h3>
        <h3 class="font-weight-semi-bold mb-4">L.E {{ product.price }}</h3>
        <p class="mb-4">
          {{ product.description }}
        </p>
        <div class="d-flex mb-3">
          <p class="text-dark font-weight-medium mb-0 mr-3">Sizes:</p>
          <form>
            <div
              class="custom-control custom-radio custom-control-inline"
              v-for="(size, index) in sizes"
            >
              <input
                type="radio"
                class="custom-control-input"
                v-model="selectedSize"
                :checked="index === 0"
                :id="`size-${size.id}`"
                :value="size.id"
                name="size"
              />
              <label class="custom-control-label" :for="`size-${size.id}`">{{
                size.size
              }}</label>
            </div>
          </form>
        </div>
        <div class="d-flex align-items-center mb-4 pt-2">
          <div class="input-group quantity mr-3" style="width: 130px">
            <div class="input-group-btn">
              <button
                class="btn btn-primary btn-minus"
                @click="decrementQuantity"
              >
                <i class="fa fa-minus"></i>
              </button>
            </div>
            <p class="form-control bg-secondary text-center">{{ quantity }}</p>
            <div class="input-group-btn">
              <button
                class="btn btn-primary btn-plus"
                @click="incrementQuantity"
              >
                <i class="fa fa-plus"></i>
              </button>
            </div>
          </div>
          <button class="btn btn-primary px-3" @click="addToCart">
            <i class="fa fa-shopping-cart mr-1"></i> Add To Cart
          </button>
        </div>
      </div>
    </div>
  </div>
  <div class="container-fluid py-5">
    <div class="text-center mb-4">
      <h2 class="section-title px-5">
        <span class="px-2">You May Also Like</span>
      </h2>
    </div>
    <div class="row px-xl-5 pb-3">
      <div
        class="col-lg-3 col-md-6 col-sm-12 pb-1"
        v-for="category_product in category_products"
      >
        <ProductCard :product="category_product" />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref, watch } from "vue";
import type { Product, Sizes } from "../types";
import { useRoute } from "vue-router";
import { useCartStore } from "../stores/cart";
import ProductCard from "../components/ProductCard.vue";

export default defineComponent({
  name: "Product",
  components: { ProductCard },
  setup() {
    const product = ref<Product>({} as Product);
    const sizes = ref<Sizes[]>([]);
    const selectedSize = ref(0);
    const quantity = ref(1);
    const category_products = ref<Product[]>([]);
    const route = useRoute();
    const cartStore = useCartStore();
    let id = route.params.id;

    onMounted(() => {
      get_product();
    });

    const get_product = async () => {
      const req = await fetch(`/api/v1/products/get/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const res = await req.json();
      product.value = res.product;
      sizes.value = res.sizes;
      category_products.value = res.category_products;
      selectedSize.value = sizes.value[0].id;

      if (cartStore.productInCart(product.value.id)) {
        quantity.value = cartStore.getProductQuantity(product.value.id);
        selectedSize.value = cartStore.getProductSize(product.value.id);
      }
    };

    const incrementQuantity = () => {
      if (!cartStore.productInCart(product.value.id)) {
        if (quantity.value < 20) {
          quantity.value += 1;
        }
        return;
      }
      cartStore.incrementQuantity(product.value.id);
    };

    const decrementQuantity = () => {
      if (!cartStore.productInCart(product.value.id)) {
        if (quantity.value > 1) {
          quantity.value -= 1;
        }
        return;
      }
      cartStore.decrementQuantity(product.value.id);
    };

    const addToCart = () => {
      cartStore.addToCart(product.value.id, quantity.value, selectedSize.value);
    };

    watch(
      () => cartStore.getProductQuantity(product.value.id),
      () => {
        if (cartStore.productInCart(product.value.id)) {
          quantity.value = cartStore.getProductQuantity(product.value.id);
        }
      }
    );

    watch(
      () => selectedSize.value,
      () => {
        if (cartStore.productInCart(product.value.id)) {
          cartStore.setProductSize(product.value.id, selectedSize.value);
        }
      }
    );

    return {
      product,
      sizes,
      selectedSize,
      quantity,
      category_products,
      incrementQuantity,
      decrementQuantity,
      addToCart,
    };
  },
});
</script>
