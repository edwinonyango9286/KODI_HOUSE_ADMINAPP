import { Navigate } from "react-router-dom";

export const PrivateRoutes = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user?.accessToken !== undefined ? (
    children
  ) : (
    <Navigate to={"/"} replace />
  );
};
