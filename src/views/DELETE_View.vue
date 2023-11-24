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
              <img
                src="../assets/ErrorIcon.png"
                alt="Error_Icon"
                style="max-width: 30%; height: auto; margin-bottom: 20px"
              />

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
import toastr from "toastr";
import "toastr/build/toastr.min.css";

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
          this.alertMessage = "Successfully Deleted!";
          // Optionally, you can handle the response or reset the form
          this.smsId = "";
          toastr.success("Successfully Deleted SMS!", "Notice");
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
