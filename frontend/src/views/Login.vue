<template>
  <div class="container">
    <div class="row">
      <div class="offset-md-2 col-lg-5 col-md-7 offset-lg-4 offset-md-3">
        <div class="panel border bg-white">
          <div class="panel-heading">
            <h3 class="pt-3 font-weight-bold">Login</h3>
          </div>
          <div class="panel-body p-3">
            <form @submit.prevent="login">
              <div class="form-group py-2">
                <div class="input-field">
                  <i class="far fa-user p-2"></i>
                  <input
                    type="text"
                    placeholder="Username"
                    required
                    v-model="username"
                  />
                </div>
              </div>
              <div class="form-group py-1 pb-2">
                <div class="input-field">
                  <i class="fas fa-lock px-2"></i>
                  <input
                    :type="`${showPassword ? 'text' : 'password'}`"
                    placeholder="Enter your Password"
                    v-model="password"
                    required
                  />
                  <button
                    class="btn bg-white text-muted"
                    @click="showPassword = !showPassword"
                  >
                    <i class="far fa-eye-slash"></i>
                  </button>
                </div>
              </div>
              <div class="btn btn-primary btn-block mt-3">Login</div>
              <div class="text-center pt-4 text-muted">
                Don't have an account?
                <router-link to="/eshopper/register">Register</router-link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/auth";

export default defineComponent({
  name: "Login",
  setup() {
    const showPassword = ref(false);
    const username = ref("");
    const password = ref("");
    const router = useRouter();
    const authStore = useAuthStore();

    const login = async () => {
      const req = await fetch("/api/v1/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username.value,
          password: password.value,
        }),
      });

      const res = await req.json();
      authStore.setToken(res.token);
      router.push("/");
    };

    return {
      username,
      password,
      showPassword,
      login,
    };
  },
});
</script>
<style>
.container {
  margin: 50px auto;
}

.panel-heading {
  text-align: center;
  margin-bottom: 10px;
}

#forgot {
  min-width: 100px;
  margin-left: auto;
  text-decoration: none;
}

a:hover {
  text-decoration: none;
}

.form-inline label {
  padding-left: 10px;
  margin: 0;
  cursor: pointer;
}

.btn.btn-primary {
  margin-top: 20px;
  border-radius: 15px;
}

.panel {
  min-height: 380px;
  box-shadow: 20px 20px 80px rgb(218, 218, 218);
  border-radius: 12px;
}

.input-field {
  border-radius: 5px;
  padding: 5px;
  display: flex;
  align-items: center;
  cursor: pointer;
  border: 1px solid #ddd;
  color: #4343ff;
}

input[type="text"],
input[type="password"] {
  border: none;
  outline: none;
  box-shadow: none;
  width: 100%;
}

i {
  color: #ffa46f;
}

a[target="_blank"] {
  position: relative;
  transition: all 0.1s ease-in-out;
}

.bordert {
  border-top: 1px solid #aaa;
  position: relative;
}

.bordert:after {
  content: "or connect with";
  position: absolute;
  top: -13px;
  left: 33%;
  background-color: #fff;
  padding: 0px 8px;
}

@media (max-width: 360px) {
  #forgot {
    margin-left: 0;
    padding-top: 10px;
  }

  body {
    height: 100%;
  }

  .container {
    margin: 30px 0;
  }

  .bordert:after {
    left: 25%;
  }
}
</style>
