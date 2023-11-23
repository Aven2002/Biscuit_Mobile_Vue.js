<template>
  <div class="delete-view text-center mt-5">
    <div class="card mx-auto" style="max-width: 400px">
      <div class="card-body">
        <h2 class="title">Delete SMS</h2>
        <form @submit.prevent="deleteSms" class="sms-form">
          <div v-if="alertMessage" class="alert alert-danger" role="alert">
            {{ alertMessage }}
          </div>
          <label for="smsId" class="label">SMS ID:</label>
          <input
            type="text"
            id="smsId"
            v-model="smsId"
            required
            class="input"
            placeholder="Enter the SMS ID..."
          />
          <button type="submit" class="btn btn-danger">Delete</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      smsId: "",
      alertMessage: "", // New data property for alert message
    };
  },
  methods: {
    async deleteSms() {
      if (!this.smsId.trim()) {
        // Set an alert message if the SMS ID is empty
        this.alertMessage = "SMS ID cannot be empty!";
        return;
      }

      try {
        // Make a DELETE request to delete SMS from the database
        const response = await this.$axios.delete(
          "http://localhost:5678/sms/delete",
          {
            params: { id: this.smsId },
          }
        );

        console.log("API Response:", response.data);

        if (response.data.isSuccess) {
          // SMS deletion successful
          this.alertMessage = "Successfully Deleted!";
          // Optionally, you can handle the response or reset the form
          this.smsId = "";
        } else {
          // SMS ID is invalid
          this.alertMessage = "Invalid SMS ID. Please enter a valid ID.";
        }
      } catch (error) {
        console.error("Error deleting SMS:", error);
      }
    },
  },
};
</script>

<style scoped>
.delete-view {
  text-align: center;
}

.title {
  font-size: 24px;
  margin-bottom: 20px;
  color: #333;
}

.sms-form {
  max-width: 400px;
  margin: 0 auto;
}

.label {
  margin-bottom: 10px;
  font-size: 16px;
  color: #555;
}

.input {
  width: 100%;
  padding: 12px;
  margin-bottom: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
}
</style>
