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
    //console.log(formData);
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
      setGoToHome(true);

      //setRespAPI(data);
      //console.log("Success:", respAPI);
      //submit(respAPI);
      // Maneja la respuesta exitosa, por ejemplo, almacena el token o redirige
    } catch (error) {
      console.error("Error:", error);
      // Maneja el error, como mostrar un mensaje al usuario
    }
  };
  const negro = "btn btn-dark";

  function submit(data?: respuesta) {
    if (data?.autenticado) {
      setGoToHome(data.autenticado);
    }
  }

  interface FormData {
    // Define los campos de tu formulario
    correo: string;
    contraseña: string;
  }
  interface respuesta {
    // Define los campos de tu formulario

    autenticado: boolean;
    usuario_id: number;
  }
  const [respAPI, setRespAPI] = useState<respuesta>();

  const [goToHome, setGoToHome] = React.useState(false);
  if (goToHome) {
    return <Navigate to="/Home" />;
  }
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
      }}
    >
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
          <Boton
            onClick={() => {
              //setGoToHome(true);
            }}
            color={negro}
          >
            Iniciar Sesión
          </Boton>
        </form>
      </Card>
    </div>
  );
}

export default Login;
