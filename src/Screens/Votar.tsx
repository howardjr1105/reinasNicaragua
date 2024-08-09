import { useEffect, useState } from "react";
import logo from "../Img/reinasLogo.png";
import Candidata from "../Components/Candidata";
import Boton from "../Components/Boton";
import "../App.css";
import { Navigate } from "react-router-dom";
import React from "react";

type Props = {};

function Votar({}: Props) {
  const [candidatas] = useState([
    {
      img: "https://i.ibb.co/28nTBmx/maria-Betanco.png",
      nombre: "Maria Betanco",
      participanteId: 1,
    },
  ]);
  const [goToHome, setGoToHome] = React.useState(false);
  const [usuario, setUsuario] = useState<autenticacion>();
  const [buttonState, setButtonState] = useState(
    new Array(10).fill(false).map((_, index) => ({
      key: index,
      value: false,
    }))
  );
  useEffect(() => {
    const userData = localStorage.getItem("userData");
    if (userData) {
      const parsedData = JSON.parse(userData);
      setUsuario(parsedData);
    }
  }, []);

  interface autenticacion {
    // Define los campos de tu formulario
    autenticado: boolean;
    usuario_id: number;
  }
  const rondaId = 1;
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

  const handleSubmitVote = async () => {
    const selectedButtonIndex = buttonState.findIndex((boton) => boton.value);
    if (selectedButtonIndex !== -1) {
      const puntuacion = selectedButtonIndex + 1;

      const data = {
        usuario_ID: usuario?.usuario_id,
        participante_ID: candidatas[0].participanteId, // Asumiendo que solo hay una candidata
        ronda_ID: rondaId,
        puntuacion,
      };

      try {
        const response = await fetch(
          "https://reinasapiprueba.azurewebsites.net/api/Votacion",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          }
        );

        if (!response.ok) {
          throw new Error("Error: " + response.statusText);
        }

        console.log("Voto enviado con éxito!");
        setGoToHome(true); // Redirigir a Home tras un voto exitoso (opcional)
      } catch (error) {
        console.error("Error al enviar el voto:", error);
        // Manejar el error, como mostrar un mensaje al usuario
      }
    } else {
      console.warn("Debes seleccionar una puntuación antes de votar.");
      // Mostrar mensaje al usuario para seleccionar una puntuación
    }
  };

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
          <Boton onClick={handleSubmitVote} color={negro}>
            Votar
          </Boton>
        </div>
      </div>
    </div>
  );
}

export default Votar;
