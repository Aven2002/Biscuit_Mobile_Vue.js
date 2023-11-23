<template>
  <div>
    <h2 class="title">SMS History List</h2>
    <table class="table table-bordered table-striped mt-4">
      <thead class="thead-light">
        <tr>
          <th>ID</th>
          <th>Sender</th>
          <th>Receiver</th>
          <th>Text</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(sms, smsId) in smsList" :key="smsId" class="table-info">
          <td class="fw-bold text-primary">{{ smsId }}</td>
          <td>{{ parseSmsText(sms).from || "N/A" }}</td>
          <td>{{ parseSmsText(sms).to || "N/A" }}</td>
          <td>{{ parseSmsText(sms).text || "No text available" }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      smsList: {},
    };
  },
  mounted() {
    // Fetch SMS list from the API when the component is mounted
    this.fetchSmsList();
  },
  methods: {
    async fetchSmsList() {
      try {
        const response = await this.$axios.get(
          "http://localhost:5678/sms/list-all"
        );
        console.log("API Response:", response.data);
        this.smsList = response.data || {};
      } catch (error) {
        console.error("Error fetching SMS list:", error);
      }
    },
    parseSmsText(sms) {
      // Parse the JSON string to an object
      return JSON.parse(sms);
    },
  },
};
</script>

<style scoped>
.title {
  color: #ff6347; /* Tomato */
}

.table {
  width: 100%;
  margin-top: 20px;
}

.table th,
.table td {
  border: 1px solid #ddd;
  padding: 10px;
  text-align: left;
}

.table-info {
  background-color: #add8e6; /* Light Blue */
}

.fw-bold,
.text-primary {
  color: #007bff; /* Royal Blue */
}
</style>
