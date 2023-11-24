import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css"; // Import Bootstrap Icons
import "bootstrap/dist/js/bootstrap.bundle.min.js"; // Import Bootstrap JavaScript
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle";
import "toastr/build/toastr.min.css";

// Create the Vue app instance
const app = createApp(App);

// Set up Axios globally with default configuration
app.config.globalProperties.$axios = axios.create({
  baseURL: "http://localhost:5678", // Adjust the base URL according to your API endpoint
});

// Use the router and mount the app
app.use(router).mount("#app");
