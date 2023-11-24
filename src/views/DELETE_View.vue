<template>
  <div class="delete-view text-center mt-5">
    <div class="card mx-auto" style="max-width: 400px">
      <div class="card-body">
        <h2 class="title">Delete SMS</h2>
        <form @submit.prevent="verifySms" class="sms-form">
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
      <!-- Bootstrap Modal for Invalid ID -->
      <div class="modal" id="invalidIdModal" tabindex="-1" role="dialog">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Error Message</h5>
              <button
                type="button"
                class="close"
                @click="closeErrorModal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <img
                src="../assets/DbErrors.png"
                alt="Error_Icon"
                style="max-width: 30%; height: auto; margin-bottom: 20px"
              />
              <p>Invalid SMS ID. Please enter a valid ID.</p>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                @click="closeErrorModal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
      <!-- End Bootstrap Modal for Invalid ID -->

      <!-- Bootstrap Modal for Confirmation -->
      <div class="modal" id="confirmationModal" tabindex="-1" role="dialog">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Confirmation</h5>
              <button
                type="button"
                class="close"
                @click="closeConfirmationModal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <img
                src="../assets/DbDelete.png"
                alt="Delete_Icon"
                style="max-width: 30%; height: auto; margin-bottom: 20px"
              />
              <p>Are you sure you want to delete this SMS?</p>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                @click="closeConfirmationModal"
              >
                Cancel
              </button>
              <button type="button" class="btn btn-danger" @click="deleteSms">
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      </div>
      <!-- End Bootstrap Modal for Confirmation -->
    </div>
  </div>
</template>

<script>
import toastr from "toastr";
import "toastr/build/toastr.min.css";

export default {
  data() {
    return {
      smsId: "",
      alertMessage: "",
    };
  },
  methods: {
    async verifySms() {
      if (!this.smsId.trim()) {
        this.alertMessage = "SMS ID cannot be empty!";
        return;
      }

      try {
        // Make a request to verify if the SMS with the given ID exists
        const response = await this.$axios.get(
          "http://localhost:5678/sms/get",
          {
            params: { id: this.smsId },
          }
        );

        console.log("Verification Response:", response.data);

        if (response.data) {
          // If the ID is valid, show the confirmation modal
          this.showConfirmationModal();
        } else {
          // If the ID is invalid, show the error modal
          this.showErrorModal();
        }
      } catch (error) {
        if (error.response && error.response.status === 404) {
          // If the server responds with a 404 status code, show the error modal
          this.showErrorModal();
        } else {
          console.error("Error verifying SMS ID:", error);
        }
      }
    },
    async deleteSms() {
      // Make a DELETE request to delete SMS from the database
      const response = await this.$axios.delete(
        "http://localhost:5678/sms/delete",
        {
          params: { id: this.smsId },
        }
      );

      console.log("API Response:", response.data);

      if (response.data.isSuccess) {
        this.alertMessage = "Successfully Deleted!";
        this.smsId = "";
        toastr.success("Successfully Deleted SMS!", "Notice");
      } else {
        this.alertMessage = "Failed to delete SMS.";
      }

      this.closeConfirmationModal();
    },
    showErrorModal() {
      const modal = document.getElementById("invalidIdModal");
      if (modal) {
        modal.classList.add("show");
        modal.style.display = "block";
      }
    },
    showConfirmationModal() {
      const modal = document.getElementById("confirmationModal");
      if (modal) {
        modal.classList.add("show");
        modal.style.display = "block";
      }
    },
    closeErrorModal() {
      const modal = document.getElementById("invalidIdModal");
      if (modal) {
        modal.classList.remove("show");
        modal.style.display = "none";
      }
    },
    closeConfirmationModal() {
      const modal = document.getElementById("confirmationModal");
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

/* Modal content text styling */
.modal-content {
  position: relative;
  border-radius: 12px;
  background-color: #f5f5f5; /* Light grey background */
  padding: 20px; /* Add padding for better spacing */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Add a subtle box shadow */
}

.modal-title {
  font-size: 28px;
  color: #333;
  margin-bottom: 15px;
  font-weight: bold;
}

.modal-body {
  font-size: 18px;
  color: #555;
  line-height: 1.6; /* Adjust line height for better readability */
}

/* Close button in modal header */
.close {
  font-size: 50px;
  color: #2f2f2f;
  cursor: pointer;
  background-color: #f5f5f5;
  border: none;
  border-radius: 50%;
}

/* Button in modal footer */
.modal-footer button {
  background-color: #e74c3c;
  color: #fff;
  border: none;
  padding: 12px 20px;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s;
}

/* Hover effect for buttons */
.btn:hover,
.modal-footer button:hover {
  background-color: #c0392b;
}
</style>
