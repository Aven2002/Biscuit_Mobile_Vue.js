<template>
  <div id="app" class="app">
    <div class="content">
      <h1>Welcome to SMS App</h1>
      <img src="../assets/Logo.png" alt="Sms Logo" class="welcome-image" />
    </div>
  </div>
</template>

<style scoped>
.app {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  text-align: center;
  background-image: url("../assets/Background.png");
  background-size: cover;
  background-position: center;
  margin: 0;
  padding: 0;
}

.content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.welcome-image {
  max-width: 100%;
  max-height: 300px; /* Adjust as needed */
  margin-top: 20px; /* Adjust spacing between heading and image */
}

h1 {
  font-size: 48px; /* Adjust as needed */
  font-weight: bold;
  color: #333; /* Adjust text color */
  margin: 0;
}
</style>
