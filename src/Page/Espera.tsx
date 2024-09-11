import React, { useEffect, useState } from "react";
import logo from "../Img/reinasLogo.png";
import * as signalR from "@microsoft/signalr";
import { Navigate } from "react-router-dom";
import {API} from "../config"

const Espera = () => {
  useEffect(() => {
    const userData = localStorage.getItem("userData");
    if (userData) {
      const parsedData = JSON.parse(userData);
      setUsuario(parsedData);
    }
  }, []);
  const [connection, setConnection] = useState<signalR.HubConnection | null>(
    null
  );
  const [usuario, setUsuario] = useState<respuesta>();
  const [goToFinal, setGoToFinal] = React.useState(false);
  useEffect(() => {
    const initSignalRConnection = async () => {
      const conn = new signalR.HubConnectionBuilder()
        .withUrl(API.NotificationHub)
        .build();

      try {
        await conn.start();
        console.log("Connected to SignalR hub");

        if (usuario) {
          const groupName = `Group_1`;
          await conn.invoke("AddToGroup", groupName);
          console.log(`Joined group ${groupName}`);
        }

        // Configurar el evento para recibir mensajes
        conn.on("ReceiveMessage", (receivedMessage: string) => {
          const parsedMessage = JSON.parse(receivedMessage);
          console.log("Received message: ", parsedMessage);
          if (parsedMessage.pagina == "Final" && parsedMessage.ronda_id) {
            localStorage.setItem("messageData", JSON.stringify(parsedMessage));
            setGoToFinal(true);
          } else if (parsedMessage.pagina == "Home") {
            setGoToHome(true); // Set navigation to home screen
          }
        });
        setConnection(conn);
      } catch (err) {
        console.error("Error connecting to SignalR hub", err);
        
      }
    };

    if (usuario) {
      initSignalRConnection();
    }

    return () => {
      if (connection) {
        connection.stop();
      }
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
