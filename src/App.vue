<template>
  <div>
    <!-- Bootstrap Navigation Bar -->
    <nav
      class="navbar navbar-expand-lg navbar-light"
      style="background-color: #ff9900"
    >
      <div class="container">
        <a class="navbar-brand" href="#">
          <img
            src="./assets/ComLogo.png"
            alt="ComLogo"
            height="35"
            class="d-inline-block align-top"
          />
          Biscuit Mobile
          <span class="brand-text">
            <strong>PHONE</strong> +603 1022 4197
            <strong> EMAIL</strong> enquiry@biscuitmobile.com
          </span>
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          v-b-toggle.collapseNav
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
          @click="toggleDropdown"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div
          class="collapse navbar-collapse"
          id="navbarNav"
          ref="navbarNav"
          v-b-toggle.collapseNav
        >
          <ul class="navbar-nav">
            <router-link
              to="/"
              class="nav-link"
              @click="hideDropdown"
              :class="{ 'active-link': $route.path === '/' }"
              >Home</router-link
            >
            <router-link
              to="/get"
              class="nav-link"
              @click="hideDropdown"
              :class="{ 'active-link': $route.path === '/get' }"
              >GET</router-link
            >
            <router-link
              to="/search"
              class="nav-link"
              @click="hideDropdown"
              :class="{ 'active-link': $route.path === '/search' }"
              >SEARCH</router-link
            >
            <router-link
              to="/push"
              class="nav-link"
              @click="hideDropdown"
              :class="{ 'active-link': $route.path === '/push' }"
              >PUSH</router-link
            >
            <router-link
              to="/put"
              class="nav-link"
              @click="hideDropdown"
              :class="{ 'active-link': $route.path === '/put' }"
              >PUT</router-link
            >
            <router-link
              to="/delete"
              class="nav-link"
              @click="hideDropdown"
              :class="{ 'active-link': $route.path === '/delete' }"
              >DELETE</router-link
            >
          </ul>
        </div>
      </div>
    </nav>
    <router-view @beforeRouteUpdate="hideDropdown" />
    <!-- Footer Section -->
    <footer
      class="footer mt-auto py-3"
      style="background-color: #333; color: #fff; text-align: center"
    >
      <div class="container">
        <span>&copy; 2023 Biscuit Mobile. All rights reserved.</span>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  methods: {
    toggleDropdown() {
      if (this.$refs.navbarNav.classList.contains("show")) {
        this.$refs.navbarNav.classList.remove("show");
      } else {
        this.$refs.navbarNav.classList.add("show");
      }
    },
    hideDropdown() {
      this.$refs.navbarNav.classList.remove("show");
    },
  },
};
</script>

<style>
/* Adjustments to the brand text */
.brand-text {
  font-size: 13px;
  color: #333; /* Set your desired text color */
  margin-left: 20px; /* Adjust margin for better positioning */
}

/* Adjustments to the navigation links */
.navbar-nav {
  margin-left: 30px; /* Increase margin between Home and Put */
  margin-right: 30px; /* Increase margin between Home and Put */
}

.navbar-nav .nav-link {
  color: #333; /* Set your desired text color */
  margin-right: 10px;
  position: relative;
  text-decoration: none; /* Remove default underline */
  font-size: 16px;
  font-weight: bold;
}

.active-link {
  color: #add8e6 !important;
  background-color: #262626 !important;
  padding-bottom: 2px !important;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2) !important;
  text-align: center;
}

/* Adjustments to the toggler button */
.navbar-toggler {
  border: none; /* Remove border from toggler button */
}

.navbar-toggler-icon {
  background-color: #ff9900;
}

/* Media query for responsiveness */
@media (max-width: 768px) {
  .navbar-nav {
    margin-top: 10px; /* Add spacing on top for small screens */
  }
}
.navbar-nav .dropdown-menu {
  text-align: center;
}

.navbar-nav .dropdown-menu .nav-link {
  display: block;
  width: 100%;
  text-align: left;
}
.footer {
  position: fixed;
  bottom: 0;
  width: 100%;
}
</style>
