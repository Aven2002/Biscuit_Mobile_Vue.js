<template>
  <div class="edit-view">
    <h2 class="title">Edit SMS Sent</h2>

    <!-- Alert message for invalid ID using alert -->
    <div v-if="alertMessage" class="alert alert-warning" role="alert">
      {{ alertMessage }}
    </div>

    <form @submit.prevent="getSmsData" class="sms-form">
      <label for="editSmsId" class="label">SMS ID:</label>
      <input
        type="text"
        id="editSmsId"
        v-model="editSmsId"
        required
        class="input"
        placeholder="Enter the SMS ID..."
      />
      <button type="submit" class="btn btn-info">Get SMS Data</button>
    </form>

    <!-- Display the form only if smsData is available -->
    <form v-if="smsData" @submit.prevent="editSms" class="sms-form">
      <label for="editFrom" class="label">From:</label>
      <input
        type="text"
        id="editFrom"
        v-model="editFrom"
        required
        class="input"
        placeholder="Enter the sender..."
      />
      <label for="editTo" class="label">To:</label>
      <input
        type="text"
        id="editTo"
        v-model="editTo"
        required
        class="input"
        placeholder="Enter the recipient..."
      />
      <label for="editText" class="label">Text:</label>
      <input
        type="text"
        id="editText"
        v-model="editText"
        required
        class="input"
        placeholder="Enter the new text..."
      />
      <button type="submit" class="btn btn-warning">Edit SMS</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      editSmsId: "",
      editFrom: "",
      editTo: "",
      editText: "",
      smsData: null,
      invalidId: false,
      invalidIdMessage: "",
      alertMessage: "", // New data property for alert message
    };
  },
  methods: {
    async getSmsData() {
      if (!this.editSmsId.trim()) {
        // Display an error message if the SMS ID is empty
        this.alertMessage = "SMS ID cannot be empty!";
        return;
      }

      try {
        // Make a GET request to fetch SMS data from the database
        const response = await this.$axios.get(
          `http://localhost:5678/sms/get?id=${this.editSmsId}`
        );

        // Check if response is valid
        if (response.data) {
          // Update smsData and reset other form fields
          this.smsData = response.data;
          this.editFrom = this.smsData.from;
          this.editTo = this.smsData.to;
          this.editText = this.smsData.text;
          this.invalidId = false;
        } else {
          // If ID is invalid, show alert
          this.invalidId = true;
          this.invalidIdMessage = "Invalid SMS ID. Please enter a valid ID.";
          this.smsData = null;
          this.alertMessage = "Invalid SMS ID. Please enter a valid ID."; // Alert for invalid ID
        }
      } catch (error) {
        console.error("Error fetching SMS data:", error);
      }
    },
    async editSms() {
      if (
        !this.editSmsId.trim() ||
        !this.editFrom.trim() ||
        !this.editTo.trim() ||
        !this.editText.trim()
      ) {
        // Display an error message if any field is empty
        this.alertMessage = "All fields must be filled!";
        return;
      }

      try {
        // Make a PUT request to edit SMS in the database
        const response = await this.$axios.put(
          "http://localhost:5678/sms/edit",
          {
            smsId: this.editSmsId,
            from: this.editFrom,
            to: this.editTo,
            text: this.editText,
          }
        );

        console.log("API Response:", response.data);
        // Optionally, you can handle the response or reset the form
        this.editSmsId = "";
        this.editFrom = "";
        this.editTo = "";
        this.editText = "";
        // Display a confirmation message using alert
        this.alertMessage = "SMS Edited!";
      } catch (error) {
        console.error("Error editing SMS:", error);
      }
    },
  },
};
</script>

<style scoped>
.edit-view {
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

.alert {
  margin-left: 400px;
  margin-right: 400px;
}
</style>
