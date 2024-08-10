import { useEffect, useState } from "react";
import logo from "../Img/reinasLogo.png";
import Candidata from "../Components/Candidata";
import Boton from "../Components/Boton";
import "../App.css";
import { Navigate } from "react-router-dom";
import React from "react";

type Props = {};

function Votar({}: Props) {
  const [data, setData] = useState<Participante>();
  const [message, setMessage] = useState<dataRecibe>();
  const [candidatas, setCandidatas] = useState<response>();
  const [goToHome, setGoToHome] = React.useState(false);
  const [usuario, setUsuario] = useState<respuesta>();
  const [buttonState, setButtonState] = useState(
    new Array(10).fill(false).map((_, index) => ({
      key: index,
      value: false,
    }))
  );
  useEffect(() => {
    const messageData = localStorage.getItem("messageData");
    if (messageData) {
      const parsedData = JSON.parse(messageData);
      console.log(parsedData); // Verifica si los datos son correctos
      setMessage(parsedData);
    }
  }, []);

  /*useEffect(() => {
    if (message) {
      console.log("Message received from SignalR:", message);
      const prueba = message.participante_id;
      console.log(prueba);
    }
  }, [message]);*/
  //const rondaId = message?.participante_id;

  useEffect(() => {
    if (message?.participante_id) {
      //const rondaId = message.participante_id;
      fetch(
        `https://localhost:7093/api/Participantes/${message.participante_id.toString()}`
      )
        .then((response) => response.json())
        .then((data) => setData(data));
      console.log(data);
    }
  }, [message]);
  useEffect(() => {
    if (message) {
      console.log("Message received from SignalR:", message);
      const prueba = message.participante_id;
      console.log(prueba);
    }
  }, [message]);

  useEffect(() => {
    const userData = localStorage.getItem("userData");
    if (userData) {
      const parsedData = JSON.parse(userData);
      setUsuario(parsedData);
    }
  }, []);

  interface candidata {
    img: string;
    nombre: string;
    participanteId: number;
  }

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
  interface response {
    seccess: Boolean;
    message: String;
    data: Participante[];
  }
  interface Participante {
    participanteId: number;
    nombre: string;
    edad: number;
    departamento: string;
    peso: number;
    estatura: number;
    biografia: string;
    img: string;
  }
  interface dataRecibe {
    ronda_id: number;
    participante_id: number;
  }

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

      // const data = {
      //   usuario_ID: usuario?.data.usuario_id,
      //   participante_ID: message?.participante_id, // Asumiendo que solo hay una candidata
      //   ronda_ID: message?.ronda_id,
      //   puntuacion,
      // };

      try {
        const response = await fetch("https://localhost:7093/api/Votacion", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

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
          <Candidata
            children={data?.nombre}
            depart={data?.departamento}
            key={data?.participanteId}
            img={data?.img}
          />
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
