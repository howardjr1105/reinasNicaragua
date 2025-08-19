import React, { useState } from "react";
import Card from "../Components/Card";
import Boton from "../Components/Boton";
import "bootstrap/dist/css/bootstrap.css";
import reinas from "../Img/reinasLogo.png";
import Entrada from "../Components/Entrada";
import { Navigate } from "react-router-dom";
import {API} from "../config"


type Props = {};

function Login({}: Props) {
  const [formData, setFormData] = useState<FormData>({
    correo: "",
    contraseña: "",
  });
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [inputStatus, setInputStatus] = useState<{ correo: "error" | undefined; contraseña: "error" | undefined }>({
    correo: undefined,
    contraseña: undefined,
  });
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
    // limpiar estado de error del campo editado y el mensaje
    const field = event.target.name as keyof FormData;
    setInputStatus((prev) => ({ ...prev, [field]: undefined }));
    if (errorMsg) setErrorMsg(null);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      setErrorMsg(null);
      const response = await fetch(
        API.Authenticate,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        // Credenciales inválidas u otro error del servidor
        if (response.status === 401 || response.status === 400) {
          setErrorMsg("Correo o contraseña incorrectos");
          setInputStatus({ correo: "error", contraseña: "error" });
          return;
        }
        setErrorMsg("No se pudo iniciar sesión. Intenta de nuevo.");
        return;
      }
      const data = await response.json();
      console.log("Success:", data);
      if (!data?.data?.autenticado) {
        setErrorMsg("Correo o contraseña incorrectos");
        setInputStatus({ correo: "error", contraseña: "error" });
        return;
      }
      localStorage.setItem("userData", JSON.stringify(data));
      setGoToPage(data);
    } catch (error) {
      console.error("Error:", error);
      setErrorMsg("Error de red. Verifica tu conexión e intenta nuevamente.");
    }
  };
  const negro = "btn btn-dark";

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

  interface FormData {
    // Define los campos de tu formulario
    correo: string;
    contraseña: string;
  }

  const [goToPage, setGoToPage] = React.useState<respuesta>();

  if (goToPage?.data.rol_id == 2) {
    return <Navigate to="/Home" />;
  } else if (goToPage?.data.rol_id == 1) {
    return <Navigate to="/Admin" />;
  }

  return (
    <div className="centrar">
      <Card>
        <img
          src={reinas}
          className="img-fluid"
          width={"400px"}
          style={{ marginBottom: "4rem" }}
        ></img>

        <form
          style={{ alignItems: "center", justifyItems: "center" }}
          onSubmit={handleSubmit}
        >
          <Entrada
            type="text"
            placeholder="Usuario"
            onChange={handleChange}
            name="correo"
            status={inputStatus.correo}
          ></Entrada>
          <Entrada
            type="password"
            placeholder="Contraseña"
            onChange={handleChange}
            name="contraseña"
            status={inputStatus.contraseña}
          ></Entrada>
          <Boton onClick={() => {}} color={negro}>
            Iniciar Sesión
          </Boton>
          {errorMsg && (
            <div style={{ color: "red", marginTop: "0.75rem", fontSize: "0.9rem" }}>
              {errorMsg}
            </div>
          )}
        </form>
      </Card>
    </div>
  );
}

export default Login;
