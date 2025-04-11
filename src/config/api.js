// src/config/api.js
const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:3001";

export default {
  bookAppointment: `${API_BASE_URL}/api/book-appointment`,
  checkAvailability: `${API_BASE_URL}/api/check-availability`,
  // Add other endpoints here
};
