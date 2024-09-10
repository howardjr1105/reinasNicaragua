import React, { useState } from "react";
import Card from "../Components/Card";
import Boton from "../Components/Boton";
import "bootstrap/dist/css/bootstrap.css";
import reinas from "../Img/reinasLogo.png";
import Entrada from "../Components/Entrada";
import { Navigate } from "react-router-dom";


type Props = {};

function Login({}: Props) {
  const [formData, setFormData] = useState<FormData>({
    correo: "",
    contraseña: "",
  });
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await fetch(
        "https://reinasapiprueba.azurewebsites.net/api/Auth/authenticate",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error("Error: " + response.statusText);
      }
      const data = await response.json();
      console.log("Success:", data);
      localStorage.setItem("userData", JSON.stringify(data));
      setGoToPage(data);
    } catch (error) {
      console.error("Error:", error);
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
          ></Entrada>
          <Entrada
            type="password"
            placeholder="Contraseña"
            onChange={handleChange}
            name="contraseña"
          ></Entrada>
          <Boton onClick={() => {}} color={negro}>
            Iniciar Sesión
          </Boton>
        </form>
      </Card>
    </div>
  );
}

export default Login;
