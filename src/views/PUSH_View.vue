<template>
  <div class="push-view text-center mt-5">
    <div class="card mx-auto" style="max-width: 400px">
      <div class="card-body">
        <h2 class="card-title text-center mb-4">Send a SMS</h2>

        <!-- Display alert message if it exists -->
        <div
          v-if="alertMessage"
          class="alert alert-success rounded small-alert"
          role="alert"
        >
          {{ alertMessage }}
        </div>

        <form @submit.prevent="addSms">
          <div class="form-group">
            <label for="smsSender">Sender:</label>
            <input
              type="text"
              id="smsSender"
              v-model="smsSender"
              required
              class="form-control"
              placeholder="Enter sender's name..."
            />
          </div>

          <div class="form-group">
            <label for="smsReceiver">Receiver:</label>
            <input
              type="text"
              id="smsReceiver"
              v-model="smsReceiver"
              required
              class="form-control"
              placeholder="Enter receiver's name..."
            />
          </div>

          <div class="form-group">
            <label for="smsText">SMS Text:</label>
            <input
              type="text"
              id="smsText"
              v-model="smsText"
              required
              class="form-control"
              placeholder="Enter your SMS text..."
            />
          </div>

          <button type="submit" class="btn btn-primary btn-block">Send</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      smsSender: "",
      smsReceiver: "",
      smsText: "",
      alertMessage: "", // New data property for alert message
    };
  },
  methods: {
    async addSms() {
      // Reset alert message before attempting to send a new SMS
      this.alertMessage = "";

      if (
        !this.smsSender.trim() ||
        !this.smsReceiver.trim() ||
        !this.smsText.trim()
      ) {
        // Set an alert message if any of the fields is empty
        this.alertMessage = "All fields must be filled!";
        return;
      }

      try {
        // Make a POST request to add SMS to the database
        const response = await this.$axios.post(
          "http://localhost:5678/sms/add",
          {
            from: this.smsSender,
            to: this.smsReceiver,
            text: this.smsText,
          }
        );

        console.log("API Response:", response.data);

        // Optionally, you can handle the response or reset the form
        this.smsSender = "";
        this.smsReceiver = "";
        this.smsText = "";

        // Display a confirmation message using alert
        this.alertMessage = "SMS Sent!";
      } catch (error) {
        console.error("Error adding SMS:", error);
      }
    },
  },
};
</script>

<style scoped>
.push-view {
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
  font-size: 12px; /* Adjust the font size as needed */
  padding: 15px; /* Adjust the padding as needed */
  margin-left: 10px;
  margin-right: 10px;
}
</style>
