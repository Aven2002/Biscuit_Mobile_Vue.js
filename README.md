# SMS App

This is a simple Vue.js application for managing SMS messages. It demonstrates the integration between the frontend and backend, using Vue Router for navigation, Axios for making HTTP requests, and handling CORS for cross-origin resource sharing.

## Views

### Home View

- Description: The landing page displaying a welcome message and the SMS App logo.

### Get View

- Description: Allows users to retrieve list of SMS data.

### Push View

- Description: Enables users to add a new SMS by providing sender, recipient, and text information.

### Edit View

- Description: Allows users to edit an existing SMS by entering the SMS ID and updating sender, recipient, and text information.

### Delete View

- Description: Enables users to delete an SMS by entering the SMS ID.

## Endpoints

### GET SMS

- Endpoint: `http://localhost:5678/sms/get`
- Description: Retrieves SMS data based on the provided ID.
- Method: GET

### PUSH SMS

- Endpoint: `http://localhost:5678/sms/push`
- Description: Adds a new SMS to the database.
- Method: POST

### PUT SMS

- Endpoint: `http://localhost:5678/sms/edit`
- Description: Edits an existing SMS in the database.
- Method: PUT

### DELETE SMS

- Endpoint: `http://localhost:5678/sms/delete`
- Description: Deletes an SMS from the database based on the provided ID.
- Method: DELETE

## Technologies Used

- Vue.js: The progressive JavaScript framework used for building the user interface.
- Vue Router: Provides navigation management for single-page applications.
- Axios: A promise-based HTTP client for making requests to the backend.
- CORS: Cross-Origin Resource Sharing is configured to allow the frontend to communicate with the backend.

## Bootstrap Integration

- Styling Home Views
- Enhancing Form Elements
- Responsive Design
- Navbar Styling

## Setup

1. Clone the repository.
2. Install dependencies: `npm install`
3. Run the application: `npm run serve`

Make sure to configure your backend server and update the endpoint URLs accordingly in the Vue.js application.
