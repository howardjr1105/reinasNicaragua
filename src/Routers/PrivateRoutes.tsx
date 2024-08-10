import { message } from "antd";
import { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

type Props = {
  allowroled: any;
};

export default function PrivateRoutes({ allowroled }: Props) {
  //   const { isAuth, datatoken } = useDataContext();
  //const dataResposeToken = datatoken;
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
  const dataResposeToken = usuario?.data.rol_id;
  const isAuth = usuario?.data.autenticado;

  const notpermission = () => {
    message.open({
      key: "notpermission",
      type: "error",
      content: "No Tiene Permiso",
    });
    return <Navigate to={"/Home"}></Navigate>;
  };

  return !isAuth ? (
    <Navigate to={"/"}></Navigate>
  ) : allowroled.includes(dataResposeToken) ? (
    <Outlet />
  ) : (
    notpermission()
  );
}
