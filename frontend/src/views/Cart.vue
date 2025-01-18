<template>
  <!-- Cart Start -->
  <div class="container-fluid pt-5">
    <div class="row px-xl-5">
      <div class="col-lg-8 table-responsive mb-5">
        <table class="table table-bordered text-center mb-0">
          <thead class="bg-secondary text-dark">
            <tr>
              <th>Products</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody class="align-middle">
            <CartProduct
              v-for="product in cartProducts"
              :product="product"
              @remove-from-cart="reCall"
            />
          </tbody>
        </table>
      </div>
      <div class="col-lg-4">
        <div class="card border-secondary mb-5">
          <div class="card-header bg-secondary border-0">
            <h4 class="font-weight-semi-bold m-0">Cart Summary</h4>
          </div>
          <div class="card-body">
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
            <router-link
              to="/eshopper/checkout"
              class="btn btn-block btn-primary my-3 py-3"
            >
              Proceed To Checkout
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- Cart End -->
</template>
<script lang="ts">
import { computed, defineComponent, onMounted, ref } from "vue";
import CartProduct from "../components/CartProduct.vue";
import { useCartStore } from "../stores/cart";

export default defineComponent({
  name: "Cart",
  components: { CartProduct },
  setup() {
    const cartProducts = ref([]);
    const cartStore = useCartStore();

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
      reCall,
    };
  },
});
</script>
