<template>
  <div>
    <!-- Bootstrap Navigation Bar -->
    <nav class="navbar navbar-expand-lg navbar-light bg-warning">
      <div class="container">
        <a class="navbar-brand" href="#">
          <img
            src="./assets/ComLogo.png"
            alt="ComLogo"
            height="35"
            class="d-inline-block align-top"
          />
          Biscuit Mobile
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
          @click="toggleDropdown"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav" ref="navbarNav">
          <ul class="navbar-nav">
            <router-link to="/" class="nav-link" @click="hideDropdown"
              >Home</router-link
            >
            <router-link to="/get" class="nav-link" @click="hideDropdown"
              >GET</router-link
            >
            <router-link to="/push" class="nav-link" @click="hideDropdown"
              >PUSH</router-link
            >
            <router-link to="/put" class="nav-link" @click="hideDropdown"
              >PUT</router-link
            >
            <router-link to="/delete" class="nav-link" @click="hideDropdown"
              >DELETE</router-link
            >
          </ul>
        </div>
      </div>
    </nav>
    <router-view @beforeRouteUpdate="hideDropdown" />
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
