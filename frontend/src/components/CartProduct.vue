<template>
  <tr>
    <td class="align-middle">
      <img :src="product.image" :alt="product.name" style="width: 50px" />
      {{ product.name }}
    </td>
    <td class="align-middle">L.E {{ product.price }}</td>
    <td class="align-middle">
      <div class="input-group quantity mx-auto" style="width: 100px">
        <div class="input-group-btn">
          <button class="btn btn-sm btn-primary btn-minus" @click="decrement">
            <i class="fa fa-minus"></i>
          </button>
        </div>
        <p class="form-control form-control-sm bg-secondary text-center">
          {{ quantity }}
        </p>
        <div class="input-group-btn">
          <button class="btn btn-sm btn-primary btn-plus" @click="increment">
            <i class="fa fa-plus"></i>
          </button>
        </div>
      </div>
    </td>
    <td class="align-middle">L.E {{ product.price * quantity }}</td>
    <td class="align-middle">
      <button
        class="btn btn-sm btn-primary"
        @click="removeFromCart(product.id)"
      >
        <i class="fa fa-times"></i>
      </button>
    </td>
  </tr>
</template>
<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import { useCartStore } from "../stores/cart";

export default defineComponent({
  name: "CartProduct",
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  emits: ["removeFromCart"],
  setup(props, { emit }) {
    const cartStore = useCartStore();
    const quantity = ref(cartStore.getProductQuantity(props.product.id));

    const increment = () => cartStore.incrementQuantity(props.product.id);
    const decrement = () => cartStore.decrementQuantity(props.product.id);
    const removeFromCart = (id: number) => {
      cartStore.removeFromCart(id);
      emit("removeFromCart");
    };

    watch(
      () => cartStore.getProductQuantity(props.product.id),
      () => {
        quantity.value = cartStore.getProductQuantity(props.product.id);
      }
    );
    return {
      quantity,
      increment,
      decrement,
      removeFromCart,
    };
  },
});
</script>
