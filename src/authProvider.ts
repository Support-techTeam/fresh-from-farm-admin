import { AuthProvider } from "react-admin";
import BaseDirectories from "./base_directory/BaseDirectory";
import apiClient from "./apiClient";

const authProvider: AuthProvider = {
  login: async ({ email, password }) => {
    try {
      // Make a request to the login endpoint
      const response = await apiClient.post(
        `${BaseDirectories.BASE_API_URL}/admin/login`,
        {
          email: email,
          password: password,
        }
      );
      if (response.data.error) {
        localStorage.removeItem("username");
        localStorage.removeItem("authToken");
        localStorage.removeItem("f3_user_data");
        return Promise.reject(new Error(response.data.message));
      } else {
        console.log(response.data.data);
        // Store the token and username in localStorage
        localStorage.setItem("authToken", response.data.data?.accessToken);
        localStorage.setItem("username", email);
        localStorage.setItem(
          "f3_user_data",
          JSON.stringify(response.data.data)
        );
        return Promise.resolve();
      }
    } catch (error: any) {
      console.error("Login error", error);
      return Promise.reject(
        new Error(error.response?.data?.message || "Login failed")
      );
    }
  },
  logout: () => {
    localStorage.removeItem("username");
    localStorage.removeItem("authToken");
    localStorage.removeItem("f3_user_data");
    return Promise.resolve();
  },
  checkError: (error) => {
    if (error.status === 401) {
      // Handle token expiration
      // localStorage.removeItem("authToken");
      return Promise.reject();
    }
    return Promise.resolve();
  },
  checkAuth: () =>
    localStorage.getItem("f3_user_data") ? Promise.resolve() : Promise.reject(),
  getPermissions: () => Promise.resolve(),
  getIdentity: () => {
    const identity = localStorage.getItem("f3_user_data");

    if (identity) {
      const user = JSON.parse(identity);

      return Promise.resolve({
        id: user.userId || "user", // Provide default id if not present
        fullName: `${user.firstName} ${user.lastName}` || "Jane Doe",
      });
    }
    return Promise.reject();
  },
};

export default authProvider;
