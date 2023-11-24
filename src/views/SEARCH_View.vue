<template>
  <div class="search-view text-center mt-5">
    <div class="card mx-auto" style="max-width: 400px">
      <div class="card-body">
        <h2 class="title">Search SMS by ID</h2>
        <label for="searchId" class="label">Enter SMS ID:</label>
        <input type="text" v-model="searchId" id="searchId" class="input" />
        <button @click="search" class="btn btn-primary">Search</button>

        <div v-if="sms">
          <h3 class="title">Results:</h3>
          <div class="result">
            <p class="label">ID: {{ sms.id }}</p>
            <p class="label">Sender: {{ sms.from }}</p>
            <p class="label">Receiver: {{ sms.to }}</p>
            <p class="label">Text: {{ sms.text }}</p>
          </div>
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchId: "",
      sms: null,
    };
  },
  methods: {
    async search() {
      try {
        const response = await this.$axios.get(`/sms/get?id=${this.searchId}`);
        this.sms = response.data;

        // Show the Bootstrap modal if the response is empty (invalid ID)
        if (!this.sms) {
          this.showModal("invalidIdModal");
        }
      } catch (error) {
        console.error("Error searching SMS:", error);
      }
    },
    showModal(modalId) {
      const modal = document.getElementById(modalId);
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
/* Existing styles */

.title {
  font-size: 28px;
  margin-bottom: 20px;
  color: #4285f4; /* Google Blue */
}

.input {
  width: 100%;
  padding: 12px;
  margin-bottom: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
}

.label {
  margin-bottom: 10px;
  font-size: 18px; /* Increased font size */
  color: #555;
}

.btn {
  background-color: #4285f4; /* Google Blue */
  color: #fff;
  border: none;
  padding: 12px 20px;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
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
