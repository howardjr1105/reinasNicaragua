import React from "react";
import { ReactNode } from "react";
import Card from "../Components/Card";
import Boton from "../Components/Boton";
import "bootstrap/dist/css/bootstrap.css";
import reinas from "../Img/reinasLogo.png";
import Entrada from "../Components/Entrada";

type Props = {};

function Login({}: Props) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Card>
        <img src={reinas} className="img-fluid" width={"400px"}></img>
        <form style={{ alignItems: "center", justifyItems: "center" }}>
          <Entrada type="text" placeholder="Usuario">
            @
          </Entrada>
          <Entrada type="password" placeholder="Contraseña">
            *
          </Entrada>
          <Boton>Iniciar Sesión</Boton>
        </form>
      </Card>
    </div>
  );
}

export default Login;
