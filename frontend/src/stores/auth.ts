import { defineStore } from "pinia";

export const useAuthStore = defineStore("AuthStore", {
  state: () => {
    return {
      token: "",
      isAuthenticated: false,
    };
  },
  actions: {
    initializeStore() {
      if (!localStorage.getItem("token")) {
        this.token = "";
        this.isAuthenticated = false;
      } else {
        this.token = String(localStorage.getItem("token"));
        this.isAuthenticated = true;
      }
    },
    setToken(token: string) {
      this.token = token;
      this.isAuthenticated = true;
      localStorage.setItem("token", token);
    },
    logout() {
      this.token = "";
      this.isAuthenticated = false;
      localStorage.removeItem("token");
    },
  },
});
