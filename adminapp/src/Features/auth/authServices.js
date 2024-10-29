import { newRequest } from "../../Utils/newRequest";

const registerNewUser = async (data) => {
  const response = await newRequest.post("auth/register-new-user", data);
  if (response?.data) {
    return response.data;
  }
};

const activateNewUser = async (data) => {
  const response = await newRequest.post(
    "auth/activate-landlord-account",
    data
  );
  if (response?.data) {
    return response.data;
  }
};

const loginNewUser = async (data) => {
  const response = await newRequest.post("auth/login-landlord", data);
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

const authService = {
  registerNewUser,
  activateNewUser,
  loginNewUser,
  passwordResetToken,
  resetUserPassword,
};
export default authService;
