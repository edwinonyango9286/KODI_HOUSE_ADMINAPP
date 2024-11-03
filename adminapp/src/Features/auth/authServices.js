import { newRequest } from "../../Utils/newRequest";

const registerNewUser = async (data) => {
  const response = await newRequest.post("auth/register-new-user", data);
  if (response?.data) {
    return response.data;
  }
};

const activateNewUser = async (data) => {
  const response = await newRequest.post("auth/activate-admin-account", data);
  if (response?.data) {
    return response.data;
  }
};

const loginNewUser = async (data) => {
  const response = await newRequest.post("auth/login-admin", data);
  if (response?.data) {
    return response.data;
  }
};

const passwordResetToken = async (email) => {
  const response = await newRequest.post("auth/password-reset-token", email);
  if (response?.data) {
    return response.data;
  }
};

const resetUserPassword = async (data) => {
  const response = await newRequest.put(`auth/reset-password/${data?.token}`, {
    password: data.password,
    confirmPassword: data.reenterPassword,
  });
  if (response?.data) {
    return response.data;
  }
};

const logout = async () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const config = {
    headers: {
      Authorization: `Bearer ${user?.accessToken || ""}`,
      Accept: "application/json",
    },
    withCredentials: true,
  };
  const response = await newRequest.post("auth/logout", {}, config);
  if (response?.data) {
    return response.data;
  }
};

const authService = {
  registerNewUser,
  activateNewUser,
  loginNewUser,
  passwordResetToken,
  resetUserPassword,
  logout,
};
export default authService;
