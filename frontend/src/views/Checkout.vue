<template>
  <div class="container-fluid pt-5">
    <div class="row px-xl-5">
      <div class="col-lg-8">
        <div class="mb-4">
          <h4 class="font-weight-semi-bold mb-4">Shipping Address</h4>
          <div class="row">
            <div class="col-md-12 form-group">
              <label>Full Name</label>
              <input
                class="form-control"
                v-model="order.name"
                type="text"
                placeholder="John"
              />
            </div>

            <div class="col-md-12 form-group">
              <label>Phone Number</label>
              <input
                class="form-control"
                type="tel"
                v-model="order.phone"
                placeholder="+20121 215 8465"
              />
            </div>
            <div class="col-md-12 form-group">
              <label>Address</label>
              <input
                class="form-control"
                type="text"
                v-model="order.address"
                placeholder="123 Street"
              />
            </div>
            <div class="col-md-12 form-group">
              <label>City</label>
              <input
                class="form-control"
                v-model="order.city"
                type="text"
                placeholder="New York"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-4">
        <div class="card border-secondary mb-5">
          <div class="card-header bg-secondary border-0">
            <h4 class="font-weight-semi-bold m-0">Order Total</h4>
          </div>
          <div class="card-body">
            <h5 class="font-weight-medium mb-3">Products</h5>
            <div
              class="d-flex justify-content-between"
              v-for="product in cartProducts"
            >
              <p>{{ product.name }}</p>
              <p>
                L.E
                {{ product.price * cartStore.getProductQuantity(product.id) }}
              </p>
            </div>
            <hr class="mt-0" />
            <div class="d-flex justify-content-between mb-3 pt-1">
              <h6 class="font-weight-medium">Subtotal</h6>
              <h6 class="font-weight-medium">L.E {{ total }}</h6>
            </div>
            <div class="d-flex justify-content-between">
              <h6 class="font-weight-medium">Shipping</h6>
              <h6 class="font-weight-medium">L.E 10</h6>
            </div>
          </div>
          <div class="card-footer border-secondary bg-transparent">
            <div class="d-flex justify-content-between mt-2">
              <h5 class="font-weight-bold">Total</h5>
              <h5 class="font-weight-bold">L.E {{ total + 10 }}</h5>
            </div>
            <button
              class="btn btn-lg btn-block btn-primary font-weight-bold my-3 py-3"
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, onMounted, ref } from "vue";
import { useCartStore } from "../stores/cart";
import type { Product } from "../types";

export default defineComponent({
  name: "Checkout",
  components: {},
  setup() {
    const cartProducts = ref<Product[]>([]);
    const cartStore = useCartStore();
    const order = ref({
      name: "",
      phone: "",
      address: "",
      city: "",
    });

    onMounted(() => {
      get_cart_products();
    });

    const get_cart_products = async () => {
      const products = cartStore.getCartProducts();

      const req = await fetch("/api/v1/products/cart", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ products }),
      });

      const res = await req.json();
      cartProducts.value = res.products;
    };

    const total = computed(() => {
      let currentTotal = 0;
      cartProducts.value.forEach((product: any) => {
        const quantity = cartStore.getProductQuantity(product.id);
        currentTotal += product.price * quantity;
      });
      return currentTotal;
    });

    const reCall = () => {
      get_cart_products();
    };

    return {
      cartProducts,
      total,
      cartStore,
      order,
      reCall,
    };
  },
});
</script>
