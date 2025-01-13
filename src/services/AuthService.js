// src/services/AuthService.js
const BASE_URL = "http://localhost:8080/users";

const AuthService = {
  login: async (formData) => {
    try {
      const response = await fetch(`${BASE_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Invalid credentials");
      }

      return await response.json();
    } catch (error) {
      console.error("Login Error:", error);
      throw error; // Propagate the error to the calling function
    }
  },

  register: async (formData) => {
    try {
      const response = await fetch(`${BASE_URL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Registration failed");
      }

      return await response.json();
    } catch (error) {
      console.error("Registration Error:", error);
      throw error; // Propagate the error to the calling function
    }
  },
};

export default AuthService;
