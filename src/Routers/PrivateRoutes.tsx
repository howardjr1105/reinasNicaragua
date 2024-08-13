import { message } from "antd";
import { Navigate, Outlet } from "react-router-dom";

type Props = {
  allowroled: any;
};

export default function PrivateRoutes({ allowroled }: Props) {
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
  const userData = localStorage.getItem("userData");

  let miRespuesta: respuesta | null = null;

  if (userData) {
    miRespuesta = JSON.parse(userData) as respuesta;
  }

  const isAuth = miRespuesta?.data.autenticado; //es si el usuario swe autentico correctemente
  const roleId = miRespuesta?.data.rol_id; //Aqui tenes que buscar el role ID

  const notpermission = () => {
    message.open({
      key: "notpermission",
      type: "error",
      content: "No Tiene Permiso",
    });

    if (roleId == 1) {
      return <Navigate to={"/admin"}></Navigate>;
    } else {
      return <Navigate to={"/home"}></Navigate>;
    }
  };

  return !isAuth ? (
    <Navigate to={"/"}></Navigate>
  ) : allowroled.includes(roleId) ? (
    <Outlet />
  ) : (
    notpermission()
  );
}
