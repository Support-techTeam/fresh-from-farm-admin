import axios from "axios";
import BaseDirectories from "./base_directory/BaseDirectory";

const apiUrl = `${BaseDirectories.BASE_API_URL}/admin`; // Replace with your actual API URL

const apiClient = axios.create({
  baseURL: apiUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor
apiClient.interceptors.request.use(
  (config) => {
    const getUserData: any = localStorage.getItem("f3_user_data");
    const userData = JSON.parse(getUserData);
    const fetchedToken = userData["accessToken"];
    if (fetchedToken) {
      config.headers["Authorization"] = `Bearer ${fetchedToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { response } = error;

    if (response && response.status === 401) {
      // Token might be expired
      //   console.log(response, "response Error");
      try {
        // const refreshToken = localStorage.getItem("f3_user_data");
        const getUserData: any = localStorage.getItem("f3_user_data");
        const userData = JSON.parse(getUserData);
        const fetchedToken = userData["accessToken"];
        const refreshResponse = await apiClient.post("/refresh-token", {
          refreshToken: fetchedToken,
        });
        const newToken = refreshResponse.data.data.accessToken;

        // Save the new token
        userData["accessToken"] = newToken;
        if (getUserData) {
          localStorage.setItem("f3_user_data", JSON.stringify(userData));
        } else {
          //   console.error("No user data found to update.");
        }

        // Retry the original request
        error.config.headers["Authorization"] = `Bearer ${newToken}`;
        return apiClient.request(error.config);
      } catch (refreshError) {
        // If refresh fails, log the user out
        localStorage.removeItem("f3_user_data");
        localStorage.removeItem("authToken");
        localStorage.removeItem("username");
        window.location.href = "/login"; // Redirect to login
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;
