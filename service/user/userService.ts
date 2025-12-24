import axios from "axios";

const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL;

export const userService = {
getUserById: async (id: number) => {
    const response = await axios.get(`${BASE_URL}/users/${id}`);
    return response.data;
  },

  getUser: async () => {
    const response = await axios.get(`${BASE_URL}/users`);
    return response.data;
  },
};