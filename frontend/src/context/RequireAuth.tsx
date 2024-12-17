import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequireAuth = () => {
  const { auth } = useAuth();
  const location = useLocation();
  console.log(location);
  console.log(auth);

  return (
   auth?.accessToken ? (
      <Outlet />
    ) : (
      <Navigate to="/sign-up" state={{ from: location?.pathname , pizza: location?.state?.pizza }} replace />
    )
  );
};

export default RequireAuth;
