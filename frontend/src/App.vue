<script setup lang="ts">
import Headers from "./components/Header.vue";
import Footer from "./components/Footer.vue";
import { useAuthStore } from "./stores/auth";
import { useCartStore } from "./stores/cart";

const authStore = useAuthStore();
const cartStore = useCartStore();

authStore.initializeStore();
cartStore.initalizeCart();
</script>

<template>
  <Headers />
  <router-view />
  <Footer />
</template>
