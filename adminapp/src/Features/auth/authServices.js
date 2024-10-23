import { newRequest } from "../../Utils/newRequest";

const registerLandlord = async (data) => {
  const response = await newRequest.post("auth/register-new-user", data);
  if (response?.data) {
    return response.data;
  }
};

const activateNewLandlord = async (data) => {
  const response = await newRequest.post(
    "auth/activate-landlord-account",
    data
  );
  if (response?.data) {
    return response.data;
  }
};



const authService = {
  registerLandlord,
  activateNewLandlord,
};
export default authService;
