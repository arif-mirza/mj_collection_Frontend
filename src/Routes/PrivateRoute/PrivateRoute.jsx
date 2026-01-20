

import { Navigate } from "react-router-dom";
import { getUser } from "../../utils/api.js";



export const PrivateRoute = ({ children }) => {
  const user = getUser();
  if (!user || user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

   return children;
}