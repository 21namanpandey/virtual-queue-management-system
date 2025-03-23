import API from "./api";
export const getUserRole = async () => {
  try {
    const response = await API.get("/auth/profile", { withCredentials: true });
    return response.data?.role || null;
  } catch (error) {
    if (error.response?.status === 401) {
      return null;
    }
    console.error(
      "Error fetching user role:",
      error.response?.data?.message || error.message || error
    );
    return null;
  }
};

export const getProfile = async () => {
  try {
    const response = await API.get("/auth/profile", { withCredentials: true });
    return response.data || null;
  } catch (error) {
    console.error(
      "Error fetching user profile:",
      error.response?.data?.message || error.message || error
    );
    return null;
  }
};

export const login = async (credentials) => {
  try {
    const response = await API.post("/auth/login", credentials, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || "An error occurred",
    };
  }
};

export const register = async (userData) => {
  try {
    const { data } = await API.post("/auth/register", userData);
    return data;
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || "An error occurred",
    };
  }
};

export const logout = async () => {
  try {
    await API.post("/auth/logout", {}, { withCredentials: true });
    window.location.href = "/login";
  } catch (error) {
    console.error("Error logging out:", error);
  }
};

export const updateProfile = async (userData) => {
  try {
    const response = await API.put("/auth/profile/edit", userData, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || "An error occurred",
    };
  }
};
