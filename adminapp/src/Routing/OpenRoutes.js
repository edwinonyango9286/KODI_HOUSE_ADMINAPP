import { Navigate } from "react-router-dom";

export const OpenRoutes = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user?.accessToken === undefined ? (
    children
  ) : (
    <Navigate to={"/admin"} replace={true} />
  );
};




