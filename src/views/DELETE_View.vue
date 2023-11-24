<template>
  <div class="delete-view text-center mt-5">
    <div class="card mx-auto" style="max-width: 400px">
      <div class="card-body">
        <h2 class="title">Delete SMS</h2>
        <form @submit.prevent="deleteSms" class="sms-form">
          <div v-if="alertMessage" class="alert alert-danger" role="alert">
            SMS Successfully Deleted !
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
      <!-- Bootstrap Modal for Invalid ID -->
      <div class="modal" id="invalidIdModal" tabindex="-1" role="dialog">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Error Message</h5>
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
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      smsId: "",
      isSuccess: false,
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

        this.isSuccess = response.data.isSuccess;

        if (this.isSuccess) {
          // SMS deletion successful
          this.alertMessage = "Successfully Deleted!";
          // Optionally, you can handle the response or reset the form
          this.smsId = "";
        } else {
          this.showModal();
          this.alertMessage = "";
        }
      } catch (error) {
        console.error("Error deleting SMS:", error);
      }
    },
    showModal() {
      const modal = document.getElementById("invalidIdModal");
      if (modal) {
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
</style>
