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
                <p>The entered SMS ID is not valid.</p>
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
