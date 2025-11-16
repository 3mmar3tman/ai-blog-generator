import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/users",
  withCredentials: true,
});

export interface User {
  id: string;
  name: string;
  email: string;
  role?: string;
  imgUrl?: string;
}

interface apiResponse<T> {
  success: boolean;
  message?: string;
  error?: string;
  data?: T;
}

export const registerUser = async (
  name: string,
  email: string,
  password: string
): Promise<apiResponse<User>> => {
  try {
    const res = await api.post<apiResponse<User>>("/register", {
      name,
      email,
      password,
    });

    return res.data;
  } catch (error: any) {
    return {
      success: false,
      error: error.response?.data?.error || "Registration failed",
    };
  }
};

export const loginUser = async (
  email: string,
  password: string
): Promise<apiResponse<User>> => {
  try {
    const res = await api.post<apiResponse<User>>("/login", {
      email,
      password,
    });

    return res.data;
  } catch (error: any) {
    return {
      success: false,
      error: error.response?.data?.error || "Login failed",
    };
  }
};

export const getCurrentUser = async (): Promise<apiResponse<User>> => {
  try {
    const res = await api.get<apiResponse<User>>("/me");

    return res.data;
  } catch (error: any) {
    return {
      success: false,
      error: error.response?.data?.error || "Failed to fetch user",
    };
  }
};

export const logoutUser = async (): Promise<apiResponse<null>> => {
  try {
    const res = await api.post<apiResponse<null>>("/logout", {});

    return res.data;
  } catch (error: any) {
    return {
      success: false,
      error: error.response?.data?.error || "Logout failed",
    };
  }
};
