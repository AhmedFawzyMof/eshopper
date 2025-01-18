<template>
  <div class="container-fluid bg-secondary text-dark mt-5 pt-5">
    <div class="row px-xl-5 pt-5">
      <div class="col-lg-4 col-md-12 mb-5 pr-3 pr-xl-5">
        <a href="" class="text-decoration-none">
          <h1 class="mb-4 display-5 font-weight-semi-bold">
            <span
              class="text-primary font-weight-bold border border-white px-3 mr-1"
              >E</span
            >Shopper
          </h1>
        </a>
        <p>
          Dolore erat dolor sit lorem vero amet. Sed sit lorem magna, ipsum no
          sit erat lorem et magna ipsum dolore amet erat.
        </p>
        <p class="mb-2">
          <i class="fa fa-map-marker-alt text-primary mr-3"></i>123 Street, New
          York, USA
        </p>
        <p class="mb-2">
          <i class="fa fa-envelope text-primary mr-3"></i>info@example.com
        </p>
        <p class="mb-0">
          <i class="fa fa-phone-alt text-primary mr-3"></i>+012 345 67890
        </p>
      </div>
      <div class="col-lg-8 col-md-12">
        <div class="row">
          <div class="col-md-4 mb-5">
            <h5 class="font-weight-bold text-dark mb-4">Quick Links</h5>
            <div class="d-flex flex-column justify-content-start">
              <router-link class="text-dark mb-2" to="/eshopper">
                <i class="fa fa-angle-right mr-2"></i>Home
              </router-link>
              <router-link class="text-dark mb-2" to="/eshopper/shop">
                <i class="fa fa-angle-right mr-2"></i>Our Shop
              </router-link>
              <router-link class="text-dark mb-2" to="/eshopper"
                ><i class="fa fa-angle-right mr-2"></i>Shop Detail
              </router-link>
              <router-link class="text-dark mb-2" to="/eshopper/checkout">
                <i class="fa fa-angle-right mr-2"></i>Checkout
              </router-link>
              <router-link class="text-dark" to="/eshopper/contact"
                ><i class="fa fa-angle-right mr-2"></i>Contact Us
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row border-top border-light mx-xl-5 py-4">
      <div class="col-md-6 px-xl-0">
        <p class="mb-md-0 text-center text-md-left text-dark">
          &copy;
          <a class="text-dark font-weight-semi-bold" href="#">Your Site Name</a
          >. All Rights Reserved. Designed by
          <a class="text-dark font-weight-semi-bold" href="">Easy Web</a><br />
        </p>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Footer",
  setup() {},
});
</script>
