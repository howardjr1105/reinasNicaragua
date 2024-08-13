import { Navigate, Outlet } from "react-router-dom";

export default function PublicRoutes() {
  const isAuth = false;

  if (isAuth) {
    console.log("Hola");
    return <Navigate to={"/home"}></Navigate>;
  }
  return <Outlet />;
}
