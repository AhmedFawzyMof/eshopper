import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";

const routes = [
  {
    path: "/eshopper",
    name: "Home",
    component: Home,
  },
  {
    path: "/eshopper/shop",
    name: "Shop",
    component: () => import("../views/Shop.vue"),
  },
  {
    path: "/eshopper/contact",
    name: "Contact",
    component: () => import("../views/Contact.vue"),
  },
  {
    path: "/eshopper/category/:id",
    name: "Category",
    component: () => import("../views/Category.vue"),
  },
  {
    path: "/eshopper/products/:id",
    name: "Product",
    component: () => import("../views/Product.vue"),
  },
  {
    path: "/eshopper/cart",
    name: "Cart",
    component: () => import("../views/Cart.vue"),
  },
  {
    path: "/eshopper/login",
    name: "Login",
    component: () => import("../views/Login.vue"),
  },
  {
    path: "/eshopper/register",
    name: "Register",
    component: () => import("../views/Register.vue"),
  },
  {
    path: "/eshopper/checkout",
    name: "Checkout",
    component: () => import("../views/Checkout.vue"),
  },
  {
    path: "/eshopper/search",
    name: "Search",
    component: () => import("../views/Search.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
