const API_BASE_URL = "http://localhost:3000";

const eventService = {
  fetchEvents: async () => {
    const response = await axios.get(`${API_BASE_URL}/events`);
    return response.data;
  },
  createEvent: async (event) => {
    await axios.post(`${API_BASE_URL}/events`, event);
  },
};