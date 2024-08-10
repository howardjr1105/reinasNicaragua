import { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

export default function PublicRoutes() {
  interface respuesta {
    seccess: Boolean;
    message: String;
    data: objeto;
  }
  interface objeto {
    usuario_id: Number;
    autenticado: Boolean;
    rol_id: Number;
  }
  const [usuario, setUsuario] = useState<respuesta>();
  const userData = localStorage.getItem("userData");
  if (userData) {
    const parsedData = JSON.parse(userData);
    setUsuario(parsedData);
  }

  const isAuth = usuario?.data.autenticado;

  if (isAuth) {
    return <Navigate to={"/Home"}></Navigate>;
  }

  return <Outlet />;
}
