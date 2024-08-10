import React, { useEffect, useState } from "react";
import Candidata from "../Components/Candidata";
import "../App.css";
import logo from "../Img/reinasLogo.png";
import { FloatButton } from "antd";
import { RightOutlined } from "@ant-design/icons";
import { Navigate } from "react-router-dom";
import * as signalR from "@microsoft/signalr";

type Props = {};

function Home({}: Props) {
  const [connection, setConnection] = useState<signalR.HubConnection | null>(
    null
  );
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
    fetch("https://localhost:7093/api/Participantes")
      .then((response) => response.json())
      .then((data) => setData(data));
  }, []);

  // Inicializar la conexión a SignalR y unirse a un grupo según el rol del usuario
  useEffect(() => {
    const initSignalRConnection = async () => {
      const conn = new signalR.HubConnectionBuilder()
        .withUrl("https://localhost:7093/notificationHub")
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

          if (parsedMessage.ronda_id && parsedMessage.participante_id) {
            localStorage.setItem("messageData", JSON.stringify(parsedMessage));
            //setMessage();
            setGoToVotar(true); // Set navigation to vote screen
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
    img : string;
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

  if (goToVotar) {
    return <Navigate to="/Votar" />;
  }

  return (
    <div className="cand ">
      <div className="logo">
        <img src={logo} className="img-fluid" width={"150px"}></img>
      </div>
      <div className="album py-5 bg-body-tertiary home">
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3 row-cols-md-4 g-4">
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
      <FloatButton
        onClick={() => {
          setGoToVotar(true);
        }}
        shape="circle"
        type="primary"
        style={{ right: 94 }}
        icon={<RightOutlined />}
      />
    </div>
  );
}

export default Home;
