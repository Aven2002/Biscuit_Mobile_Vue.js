<template>
  <div class="edit-view text-center mt-5">
    <div class="card mx-auto" style="max-width: 400px">
      <div class="card-body">
        <h2 class="title">Edit SMS Sent</h2>

        <!-- Alert message for invalid ID using alert -->
        <div class="form-container">
          <div v-if="alertMessage" class="alert alert-warning" role="alert">
            SMS Successfully Edited !
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

          <!-- Bootstrap Modal for Invalid ID -->
          <div class="modal" id="invalidIdModal" tabindex="-1" role="dialog">
            <div class="modal-dialog" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title">Invalid ID</h5>
                  <button
                    type="button"
                    class="close"
                    @click="closeModal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body">
                  <p>Invalid SMS ID. Please enter a valid ID.</p>
                </div>
                <div class="modal-footer">
                  <button
                    type="button"
                    class="btn btn-secondary"
                    @click="closeModal"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
          <!-- End Bootstrap Modal -->

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
      </div>
    </div>
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
          this.invalidId = true;
          this.showModal();
        }
      } catch (error) {
        console.error("Error fetching SMS data:", error);
      }
    },
    showModal() {
      const modal = document.getElementById("invalidIdModal");
      if (this.invalidId) {
        modal.classList.add("show");
        modal.style.display = "block";
      }
    },

    closeModal() {
      const modal = document.getElementById("invalidIdModal");
      if (modal) {
        modal.classList.remove("show");
        modal.style.display = "none";
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
/* Modal styling */
.modal {
  display: none;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4);
}

.modal-dialog {
  position: relative;
  margin: 10% auto;
  padding: 20px;
  width: 80%;
  max-width: 500px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.modal-content {
  position: relative;
  border-radius: 12px;
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

/* Close button in modal header */
.close {
  font-size: 24px;
  color: #555;
}

/* Button in modal footer */
.modal-footer button {
  background-color: #4285f4; /* Google Blue */
  color: #fff;
  border: none;
  padding: 12px 20px;
  border-radius: 8px;
  cursor: pointer;
}

/* Hover effect for buttons */
.btn:hover,
.modal-footer button:hover {
  background-color: #0d47a1; /* Darker shade of Google Blue */
}

/* Justify the display results */
.result {
  text-align: justify;
}
</style>
