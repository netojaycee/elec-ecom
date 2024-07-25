import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const Protected = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }
  return <Outlet />;
};

export default Protected;
