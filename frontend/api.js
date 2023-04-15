import axios from "axios";
import { logout } from "./shared/utils/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

// const url = "https://wild-button-fuschia.glitch.me/api";

const url = "http://10.212.11.117:5000/api";

const apiClient = axios.create({
  baseURL: url,
});

apiClient.interceptors.request.use(
  async (config) => {
    const userDetails = await AsyncStorage.getItem("user");
    if (userDetails) {
      const token = JSON.parse(userDetails).token;
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    // Handle unauthorized error
    if (error.response && error.response.status === 401) {
      // Perform logout or token refresh logic
      await AsyncStorage.removeItem("user");
      // Redirect to login page
      // e.g. navigation.navigate('Login');
    }
    return Promise.reject(error);
  }
);

// Public Routes
export const login = async (data) => {
  console.log("data", data);
  try {
    return await apiClient.post("/auth/login", data);
  } catch (exception) {
    return {
      error: true,
      exception,
    };
  }
};

export const register = async (data) => {
  try {
    // console.log("data", data);
    return await apiClient.post("/auth/register", data);
  } catch (exception) {
    return {
      error: true,
      exception,
    };
  }
};

export const getUserDetails = async () => {
  try {
    return await apiClient.get("/auth/getUserDetails");
  } catch (exception) {
    return {
      error: true,
      exception,
    };
  }
};

export const addBooking = async () => {
  try {
    return await apiClient.post("/bookings/addBooking");
  } catch (exception) {
    return {
      error: true,
      exception,
    };
  }
};

export const updateBooking = async () => {
  try {
    return await apiClient.post("/bookings/updateBooking");
  } catch (exception) {
    return {
      error: true,
      exception,
    };
  }
};

export const deleteBooking = async () => {
  try {
    return await apiClient.post("/bookings/deleteBooking");
  } catch (exception) {
    return {
      error: true,
      exception,
    };
  }
};

const checkResponseCode = (exception) => {
  const responseCode = exception?.response?.status;

  if (responseCode) {
    (responseCode === 401 || responseCode === 403) && logout();
  }
};
