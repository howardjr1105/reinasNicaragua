import React, { useEffect, useState } from "react";
import Candidata from "../Components/Candidata";
import "../App.css";
import logo from "../Img/reinasLogo.png";
import { Navigate } from "react-router-dom";
import {API} from "../config"
import { signalRService } from "../services/signalr";

type Props = {};

function Home({}: Props) {
  useEffect(() => {
    const userData = localStorage.getItem("userData");
    if (userData) {
      const parsedData = JSON.parse(userData);
      setUsuario(parsedData);
    }
  }, []);
  const [data, setData] = useState<response>();
  const [usuario, setUsuario] = useState<respuesta>();
  useEffect(() => {
    fetch(API.Participantes)
      .then((response) => response.json())
      .then((data) => setData(data));
  }, []);

  // Inicializar la conexión a SignalR y unirse a un grupo
  useEffect(() => {
    if (!usuario) return;
    let mounted = true;
    const handler = (receivedMessage: string) => {
      if (!mounted) return;
      const parsedMessage = JSON.parse(receivedMessage);
      console.log("Received message: ", parsedMessage);

      if (parsedMessage.ronda_id && parsedMessage.participante_id) {
        localStorage.setItem("messageData", JSON.stringify(parsedMessage));
        setGoToVotar(true);
      } else if (parsedMessage.pagina == "Final" && parsedMessage.ronda_id) {
        localStorage.setItem("messageData", JSON.stringify(parsedMessage));
        setGoToFinal(true);
      } else if (parsedMessage.pagina == "Espera") {
        setGoToEspera(true);
      }
    };

    (async () => {
      try {
        await signalRService.start(API.NotificationHub);
        const groupName = `Group_1`;
        await signalRService.joinGroup(groupName);
        console.log(`Joined group ${groupName}`);
        signalRService.on("ReceiveMessage", handler);
      } catch (err) {
        console.error("Error connecting to SignalR hub", err);
      }
    })();

    return () => {
      mounted = false;
      signalRService.off("ReceiveMessage", handler);
    };
  }, [usuario]);
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
  const [goToVotar, setGoToVotar] = React.useState(false);

  const [goToEspera, setGoToEspera] = React.useState(false);
  const [goToFinal, setGoToFinal] = React.useState(false);
  if (goToVotar) return <Navigate to="/Votar" />;
  if (goToFinal) return <Navigate to="/Final" />;
  if (goToEspera) return <Navigate to="/Espera" />;

  return (
    <div className="principal">
      <div className="logo">
        <img src={logo} className="img-fluid" width={"150px"}></img>
      </div>
      <div className="album py-5 bg-body-tertiary home">
        <div className="candidata-grid">
          {data?.data.map((candidata: any) => (
            <Candidata
              img={candidata.img}
              children={candidata.nombre}
              depart={candidata.departamento}
              key={candidata.participanteId}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
