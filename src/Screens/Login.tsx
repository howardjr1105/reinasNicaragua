import React from "react";
import Card from "../Components/Card";
import Boton from "../Components/Boton";
import "bootstrap/dist/css/bootstrap.css";
import reinas from "../Img/reinasLogo.png";
import Entrada from "../Components/Entrada";
import { Navigate } from "react-router-dom";

type Props = {};

function Login({}: Props) {
  const negro = "btn btn-dark";
  const [goToHome, setGoToHome] = React.useState(false);
  if (goToHome) {
    return <Navigate to="/Home" />;
  }
  function submit() {
    setGoToHome(true);
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
          onSubmit={submit}
        >
          <Entrada type="text" placeholder="Usuario"></Entrada>
          <Entrada type="password" placeholder="Contraseña"></Entrada>
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
