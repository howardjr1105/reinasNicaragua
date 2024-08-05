import { useState } from "react";
import logo from "../Img/reinasLogo.png";
import Candidata from "../Components/Candidata";
import Boton from "../Components/Boton";
import "../App.css";

type Props = {};

function Votar({}: Props) {
  const [buttonState, setButtonState] = useState(new Array(10).fill(false));
  const [candidatas] = useState([
    {
      img: "https://i.ibb.co/28nTBmx/maria-Betanco.png",
      nombre: "Maria Betanco",
    },
  ]);
  const pasarela = "traje de baño";
  const negro = "btn btn-dark";
  const blanco = "btn btn-light";
  const verde = "btn btn-success";
  const handleButtonClick = (index: number) => {
    const updateState = buttonState;
    updateState[index] = !updateState[index];
    setButtonState(updateState);
  };

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
          {buttonState.map((state, index) => (
            <Boton
              key={index}
              onClick={() => handleButtonClick(index)}
              color={state ? verde : blanco}
            >
              {index + 1}
            </Boton>
          ))}
        </div>
        <div>
          <Boton onClick={() => {}} color={negro}>
            Votar
          </Boton>
        </div>
      </div>
    </div>
  );
}

export default Votar;
