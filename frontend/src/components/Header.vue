<template>
  <div class="container-fluid">
    <div class="row align-items-center py-3 px-xl-5">
      <div class="col-lg-3 d-none d-lg-block">
        <router-link to="/eshopper" class="text-decoration-none">
          <h1 class="m-0 display-5 font-weight-semi-bold">
            <span class="text-primary font-weight-bold border px-3 mr-1">E</span
            >Shopper
          </h1>
        </router-link>
      </div>
      <div class="col-lg-6 col-6 text-left">
        <form @submit.prevent="Search">
          <div class="input-group">
            <input
              type="search"
              class="form-control"
              v-model="searchQuery"
              placeholder="Search for products"
            />
            <div class="input-group-append">
              <button class="input-group-text bg-transparent text-primary">
                <i class="fa fa-search"></i>
              </button>
            </div>
          </div>
        </form>
      </div>
      <div class="col-lg-3 col-6 text-right">
        <router-link to="/eshopper/cart" class="btn border">
          <i class="fas fa-shopping-cart text-primary"></i>
          <span class="badge">{{ cartStore.getLength }}</span>
        </router-link>
      </div>
    </div>
  </div>
  <div class="container-fluid mb-5">
    <div class="row border-top px-xl-5">
      <div class="col-lg-3 d-none d-lg-block">
        <a
          class="btn shadow-none d-flex align-items-center justify-content-between bg-primary text-white w-100"
          data-toggle="collapse"
          href="#navbar-vertical"
          style="height: 65px; margin-top: -1px; padding: 0 30px"
        >
          <h6 class="m-0">Categories</h6>
          <i class="fa fa-angle-down text-dark"></i>
        </a>
        <nav
          :class="`collapse ${
            showCategories ? 'show' : ''
          } navbar navbar-vertical navbar-light align-items-start p-0 border border-top-0 border-bottom-0`"
          id="navbar-vertical"
        >
          <div class="navbar-nav w-100 overflow-hidden" style="height: 410px">
            <router-link
              v-for="category in categories"
              :to="`/eshopper/category/${category.id}`"
              class="nav-item nav-link"
            >
              {{ category.name }}
            </router-link>
          </div>
        </nav>
      </div>
      <div class="col-lg-9">
        <nav
          class="navbar navbar-expand-lg bg-light navbar-light py-3 py-lg-0 px-0"
        >
          <a href="" class="text-decoration-none d-block d-lg-none">
            <h1 class="m-0 display-5 font-weight-semi-bold">
              <span class="text-primary font-weight-bold border px-3 mr-1"
                >E</span
              >Shopper
            </h1>
          </a>
          <button
            type="button"
            class="navbar-toggler"
            data-toggle="collapse"
            data-target="#navbarCollapse"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div
            class="collapse navbar-collapse justify-content-between"
            id="navbarCollapse"
          >
            <div class="navbar-nav mr-auto py-0">
              <router-link to="/eshopper" class="nav-item nav-link"
                >Home</router-link
              >
              <router-link to="/eshopper/shop" class="nav-item nav-link"
                >Shop</router-link
              >
              <router-link to="/eshopper/contact" class="nav-item nav-link"
                >Contact</router-link
              >
              <div class="dropdown">
                <a
                  class="dropdown-toggle nav-item nav-link"
                  href="#"
                  role="button"
                  id="dropdownMenuLink"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Categories
                </a>

                <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                  <router-link
                    v-for="category in categories"
                    class="dropdown-item"
                    :to="`/eshopper/category/${category.id}`"
                    >{{ category.name }}</router-link
                  >
                </div>
              </div>
            </div>
            <div class="navbar-nav ml-auto py-0">
              <router-link
                to="/eshopper/login"
                class="nav-item nav-link"
                v-if="!authStore.isAuthenticated"
              >
                Login
              </router-link>
              <router-link
                to="/eshopper/register"
                class="nav-item nav-link"
                v-if="!authStore.isAuthenticated"
              >
                Register
              </router-link>
              <a
                type="button"
                class="nav-item nav-link"
                @click="logout"
                v-if="authStore.isAuthenticated"
              >
                Logout
              </a>
            </div>
          </div>
        </nav>
        <div
          v-if="!hideOffer"
          id="header-carousel"
          class="carousel slide"
          data-ride="carousel"
        >
          <div class="carousel-inner">
            <div
              style="height: 410px"
              v-for="(offer, index) in offers"
              :class="`carousel-item ${index === 0 ? 'active' : ''}`"
            >
              <img class="img-fluid" :src="offer.image" alt="Image" />
              <div
                class="carousel-caption d-flex flex-column align-items-center justify-content-center"
              >
                <div class="p-3" style="max-width: 700px">
                  <h4 class="text-light text-uppercase font-weight-medium mb-3">
                    {{ offer.offer_description }}
                  </h4>
                  <h3 class="display-4 text-white font-weight-semi-bold mb-4">
                    {{ offer.title }}
                  </h3>
                  <router-link
                    :to="`/eshopper/category/${offer.id}`"
                    class="btn btn-light py-2 px-3"
                  >
                    Shop Now
                  </router-link>
                </div>
              </div>
            </div>
          </div>
          <a
            class="carousel-control-prev"
            href="#header-carousel"
            data-slide="prev"
          >
            <div class="btn btn-dark" style="width: 45px; height: 45px">
              <span class="carousel-control-prev-icon mb-n2"></span>
            </div>
          </a>
          <a
            class="carousel-control-next"
            href="#header-carousel"
            data-slide="next"
          >
            <div class="btn btn-dark" style="width: 45px; height: 45px">
              <span class="carousel-control-next-icon mb-n2"></span>
            </div>
          </a>
        </div>
        <div v-if="showHeader" class="container-fluid bg-secondary mb-5">
          <div
            class="d-flex flex-column align-items-center justify-content-center"
            style="min-height: 300px"
          >
            <h1 class="font-weight-semi-bold text-uppercase mb-3">
              {{ CurrenPage }}
            </h1>
            <div class="d-inline-flex">
              <p class="m-0">
                <router-link to="/eshopper">Home</router-link>
              </p>
              <p class="m-0 px-2">-</p>
              <p class="m-0">{{ CurrenPage }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch } from "vue";
import { useCartStore } from "../stores/cart";
import { useRouter } from "vue-router";
import type { Category, Offer } from "../types";
import { useAuthStore } from "../stores/auth";

export default defineComponent({
  name: "Header",
  setup() {
    const categories = ref<Category[]>([]);
    const offers = ref<Offer[]>([]);
    const hideOffer = ref(false);
    const showHeader = ref(false);
    const cartStore = useCartStore();
    const router = useRouter();
    const CurrenPage = ref("");
    const showCategories = ref(true);
    const searchQuery = ref("");
    const authStore = useAuthStore();

    onMounted(() => {
      getCategories();
    });

    const getCategories = async () => {
      const req = await fetch("/api/v1/category", {
        headers: {
          "Content-Type": "application/json",
        },
      });

      const res = await req.json();
      categories.value = res.categories;
      offers.value = res.offers;
    };

    const logout = () => {
      authStore.logout();
      router.push("/login");
    };

    const RemoveOffers = (currentRoute: string) => {
      const routesTitles = {
        "/eshopper/shop": "Our Shop",
        "/eshopper/contact": "Contact Us",
        "/eshopper/cart": "Your Cart",
        "/eshopper/checkout": "Checkout",
      } as const;

      if (currentRoute !== "/eshopper") {
        hideOffer.value = true;
      }

      if (currentRoute === "/eshopper/" || currentRoute === "/eshopper") {
        hideOffer.value = false;
        showHeader.value = false;
        showCategories.value = true;
        return;
      }

      if (
        currentRoute.includes("/eshopper/login") ||
        currentRoute.includes("/eshopper/register") ||
        currentRoute.includes("/eshopper/category") ||
        currentRoute.includes("/eshopper/products")
      ) {
        showHeader.value = false;
        hideOffer.value = true;
        showCategories.value = false;
        return;
      }

      if (currentRoute in routesTitles) {
        showHeader.value = true;
        hideOffer.value = true;
        showCategories.value = true;
        CurrenPage.value =
          routesTitles[currentRoute as keyof typeof routesTitles];
      }
    };

    const Search = () => {
      router.push("/eshopper/search?query=" + searchQuery.value);
    };

    watch(
      () => router.currentRoute.value.fullPath,
      (currentRoute) => {
        RemoveOffers(currentRoute);
      }
    );

    return {
      categories,
      cartStore,
      offers,
      hideOffer,
      showHeader,
      CurrenPage,
      showCategories,
      authStore,
      searchQuery,
      Search,
      logout,
    };
  },
});
</script>
