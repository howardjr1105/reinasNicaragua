import React, { useEffect, useState } from "react";
import logo from "../Img/reinasLogo.png";
import { Navigate } from "react-router-dom";
import {API} from "../config"
import { signalRService } from "../services/signalr";

const Espera = () => {
  useEffect(() => {
    const userData = localStorage.getItem("userData");
    if (userData) {
      const parsedData = JSON.parse(userData);
      setUsuario(parsedData);
    }
  }, []);
  // Conexión gestionada por signalRService
  const [usuario, setUsuario] = useState<respuesta>();
  const [goToFinal, setGoToFinal] = React.useState(false);
  useEffect(() => {
    if (!usuario) return;
    let mounted = true;
    const handler = (receivedMessage: string) => {
      if (!mounted) return;
      const parsedMessage = JSON.parse(receivedMessage);
      console.log("Received message: ", parsedMessage);
      if (parsedMessage.pagina == "Final" && parsedMessage.ronda_id) {
        localStorage.setItem("messageData", JSON.stringify(parsedMessage));
        setGoToFinal(true);
      } else if (parsedMessage.pagina == "Home") {
        setGoToHome(true);
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
  const [goToEspera, setGoToHome] = React.useState(false);

  if (goToFinal) return <Navigate to="/Final" />;
  if (goToEspera) return <Navigate to="/Home" />;

  return (
    <div className="centrar">
      <img src={logo} />
    </div>
  );
};

export default Espera;
