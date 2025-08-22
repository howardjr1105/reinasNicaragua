import { useEffect, useState } from "react";
import logo from "../Img/reinasLogo.png";
import Candidata from "../Components/Candidata";
import Boton from "../Components/Boton";
import "../App.css";
import { Navigate } from "react-router-dom";
import React from "react";
import { API } from "../config";

type Props = {};

function Votar({}: Props) {
  const [data, setData] = useState<Participante>();
  const [message, setMessage] = useState<dataRecibe>();
  const [goToHome, setGoToHome] = React.useState(false);
  const [usuario, setUsuario] = useState<respuesta>();
  const [buttonState, setButtonState] = useState(
    new Array(10).fill(false).map((_, index) => ({
      key: index,
      value: false,
    }))
  );
  const [timeLeft, setTimeLeft] = useState(45); // Nuevo estado para el contador

  // useEffect para el temporizador
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);

      return () => clearInterval(timer); // Limpiar el intervalo si el componente se desmonta o si el tiempo se acaba
    } else {
      setGoToHome(true); // Redirige a Home cuando el tiempo se acaba
    }
  }, [timeLeft]);
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
      fetch(`${API.Participantes}/${message.participante_id.toString()}`)
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
      console.log(usuario);
    }
  }, []);

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

  let pasarela;
  const negro = "btn btn-dark";
  const blanco = "btn btn-light";
  const verde = "btn btn-success";

  switch (message?.ronda_id) {
    case 1:
      pasarela = "Entrevista";
      break;
    case 2:
      pasarela = "Pasarela de traje baño";
      break;
    case 3:
      pasarela = "Pasarela de traje casual";
      break;
    case 4:
      pasarela = "Pasarela de traje de noche";
      break;
    case 5:
      pasarela = "Ronda de preguntas";
      break;
    case 6:
      pasarela = "Pasarela";
      break;
    case 7:
      pasarela = "Ronda de preguntas";
      break;
    default:
      pasarela = "Ronda de preguntas";
  }

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
        puntuacion,
        usuario_ID: usuario?.data.usuario_id,
        participante_ID: message?.participante_id, // Asumiendo que solo hay una candidata
        ronda_ID: message?.ronda_id,
      };
      console.log(data);
      try {
        const response = await fetch(API.Votacion, {
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
      alert("Debes seleccionar una puntuación para continuar.");
      // Mostrar mensaje al usuario para seleccionar una puntuación
    }
  };

  if (goToHome) {
    return <Navigate to="/Home" />;
  }

  return (
    <div className="columna centrar full-screen-center">
      <div>
        <img src={logo} className="img-fluid" width={"200px"}></img>
      </div>
      <div className="fila" style={{ alignItems: "flex-start" }}>
        <div className="columna">
          <div className="candidata-container">
            <Candidata
              children={data?.nombre}
              depart={data?.departamento}
              key={data?.participanteId}
              img={data?.img || ""}
            />
          </div>
        </div>
        <div className="columna">
          <div
            className="columna titulo-container"
            style={{ justifyContent: "center" }}
          >
            <h1>{pasarela}</h1>
            <h3>Puntuación</h3>
            <p>Tiempo restante: {timeLeft} segundos</p>{" "}
            {/* Mostrar el contador */}
          </div>
          <div className="fila botonera">
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
    </div>
  );
}

export default Votar;
