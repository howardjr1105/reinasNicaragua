import { useState } from "react";
import logo from "../Img/reinasLogo.png";
import Candidata from "../Components/Candidata";
import Boton from "../Components/Boton";
import "../App.css";
import { Navigate } from "react-router-dom";
import React from "react";

type Props = {};

function Votar({}: Props) {
  const [buttonState, setButtonState] = useState(
    new Array(10).fill(false).map((_, index) => ({
      key: index,
      value: false,
    }))
  );
  const [candidatas] = useState([
    {
      img: "https://i.ibb.co/28nTBmx/maria-Betanco.png",
      nombre: "Maria Betanco",
      participanteId: 1,
    },
  ]);
  const pasarela = "traje de baño";
  const negro = "btn btn-dark";
  const blanco = "btn btn-light";
  const verde = "btn btn-success";

  const handleClick = (index: number) => {
    setButtonState(() => {
      const newButtonState = new Array(10).fill(false).map((_, index) => ({
        key: index,
        value: false,
      }));
      newButtonState[index].value = !newButtonState[index].value;
      return newButtonState;
    });
  };
  const [goToHome, setGoToHome] = React.useState(false);

  if (goToHome) {
    return <Navigate to="/Home" />;
  }

  return (
    <div className="fila">
      <div className="columna">
        <div>
          <img src={logo} className="img-fluid" width={"150px"}></img>
        </div>
        <div>
          {candidatas.map((candidata: any) => (
            <Candidata
              img={candidata.img}
              children={candidata.nombre}
              depart="Boaco"
              key={candidata.participanteId}
            />
          ))}
        </div>
      </div>
      <div className="columna">
        <div className="columna" style={{ justifyContent: "initial" }}>
          <h1>Pasarela de {pasarela}</h1>
          <h3>Puntuación</h3>
        </div>
        <div className="fila">
          {buttonState.map((boton, index) => (
            <Boton
              key={index}
              onClick={() => handleClick(index)}
              color={boton.value ? verde : blanco}
            >
              {index + 1}
            </Boton>
          ))}
        </div>
        <div>
          <Boton
            onClick={() => {
              setGoToHome(true);
            }}
            color={negro}
          >
            Votar
          </Boton>
        </div>
      </div>
    </div>
  );
}

export default Votar;
