import { ReactNode } from "react";
import Card from "./Components/Card";
import Boton from "./Components/Boton";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import reinas from "./Img/reinasLogo.png";
import Entrada from "./Components/Entrada";
import "./App.css";

type Props = {};

function App({}: Props) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Card>
        <form style={{ alignItems: "center", justifyItems: "center" }}>
          <img src={reinas} className="img-fluid" width={"400px"}></img>
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

export default App;
