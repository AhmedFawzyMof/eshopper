<template>
  <div class="container-fluid pt-5">
    <div class="text-center mb-4">
      <h2 class="section-title px-5">
        <span class="px-2">Contact For Any Questions</span>
      </h2>
    </div>
    <div class="row px-xl-5">
      <div class="col-lg-7 mb-5">
        <div class="contact-form">
          <div id="success"></div>
          <form
            name="sentMessage"
            id="contactForm"
            @submit.prevent="submitForm"
          >
            <div class="control-group">
              <input
                type="text"
                class="form-control"
                id="name"
                placeholder="Your Name"
                v-model="contact.name"
                required
                data-validation-required-message="Please enter your name"
              />
              <p class="help-block text-danger"></p>
            </div>
            <div class="control-group">
              <input
                type="email"
                class="form-control"
                id="email"
                placeholder="Your Email"
                v-model="contact.email"
                required
                data-validation-required-message="Please enter your email"
              />
              <p class="help-block text-danger"></p>
            </div>
            <div class="control-group">
              <input
                type="tel"
                class="form-control"
                id="phone"
                placeholder="Phone Number"
                v-model="contact.phone"
                required
                data-validation-required-message="Please enter your phone number"
              />
              <p class="help-block text-danger"></p>
            </div>
            <div class="control-group">
              <textarea
                class="form-control"
                rows="6"
                id="message"
                placeholder="Message"
                v-model="contact.message"
                required
                data-validation-required-message="Please enter your message"
              ></textarea>
              <p class="help-block text-danger"></p>
            </div>
            <div>
              <button
                class="btn btn-primary py-2 px-4"
                type="submit"
                id="sendMessageButton"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
      <div class="col-lg-5 mb-5">
        <h5 class="font-weight-semi-bold mb-3">Get In Touch</h5>
        <p>
          contact us and we will get back to you within 24 hours via this email
          or phone number
        </p>
        <p class="mb-2">
          <i class="fa fa-envelope text-primary mr-3"></i>
          <a href="mailto:ahmof2002@gmail.com"> ahmof2002@gmail.com </a>
        </p>
        <p class="mb-2">
          <i class="fa fa-phone-alt text-primary mr-3"></i>
          <a href="tel:+201212158465">+2012 121 58465</a>
        </p>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "Contact",
  setup() {
    const contact = ref({
      name: "",
      email: "",
      phone: "",
      message: "",
    });

    const clearForm = () => {
      contact.value.name = "";
      contact.value.email = "";
      contact.value.phone = "";
      contact.value.message = "";
    };

    const submitForm = async () => {
      const req = await fetch("/api/v1/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(contact.value),
      });

      const res = await req.json();
      console.log(res);
      clearForm();
    };

    return {
      contact,
      submitForm,
    };
  },
});
</script>
