import  { useEffect, useState } from "react";
import { Button, Select } from "antd";
import * as signalR from "@microsoft/signalr";

type Props = {};

function Admin({}: Props) {
  useEffect(() => {
    const userData = localStorage.getItem("userData");
    if (userData) {
      const parsedData = JSON.parse(userData);
      setUsuario(parsedData);
    }
  }, []);
  useEffect(() => {
    fetch("https://localhost:7093/api/Ronda")
      .then((response) => response.json())
      .then((dataRondas) => setDataRondas(dataRondas));
    console.log(dataRondas);
  }, []);
  useEffect(() => {
    fetch("https://localhost:7093/api/Participantes")
      .then((response) => response.json())
      .then((dataCandidata) => setDataCandidata(dataCandidata));
    console.log(dataCandidata);
  }, []);
  const [usuario, setUsuario] = useState<respuesta>();
  const [dataRondas, setDataRondas] = useState<rondas[]>([]);
  const [dataCandidata, setDataCandidata] = useState<response>();
  const [selectedRonda, setSelectedRonda] = useState<number | null>(null);
  const [selectedCandidata, setSelectedCandidata] = useState<number | null>(
    null
  );
  const [connection, setConnection] = useState<signalR.HubConnection | null>(
    null
  );
  const handleRondaChange = (value: number) => {
    console.log(`selected ronda ${value}`);
    setSelectedRonda(value);
  };

  const handleCandidataChange = (value: number) => {
    console.log(`selected candidata ${value}`);
    setSelectedCandidata(value);
  };
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
  interface rondas {
    ronda_ID: Number;
    nombre: String;
  }
  const optionsRondas = dataRondas.map((ronda) => ({
    value: ronda.ronda_ID,
    label: ronda.nombre,
  }));
  const optionsCandidatas = dataCandidata?.data.map((participante) => ({
    value: participante.participanteId,
    label: participante.nombre,
  }));
  useEffect(() => {
    const initSignalRConnection = async () => {
      const conn = new signalR.HubConnectionBuilder()
        .withUrl("https://localhost:7093/notificationHub")
        .build();

      try {
        await conn.start();
        console.log("Connected to SignalR hub");

        if (usuario) {
          const groupName = `Group_${usuario.data.rol_id}`;
          await conn.invoke("AddToGroup", groupName);
          console.log(`Joined group ${groupName}`);
        }

        // Configurar el evento para recibir mensajes
        conn.on("ReceiveMessage", (message) => {
          console.log("Received message: ", message);
          // Lógica para cambiar a la pantalla de votación
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

  const sendMessage = async () => {
    if (selectedRonda !== null && selectedCandidata !== null && connection) {
      const message = {
        ronda_id: selectedRonda,
        participante_id: selectedCandidata,
      };
      const groupName = `Group_${usuario?.data.rol_id}`;

      try {
        await connection.invoke(
          "SendMessage",
          groupName,
          JSON.stringify(message)
        );
        console.log("Mensaje enviado:", message);
      } catch (err) {
        console.error("Error sending message", err);
      }
    } else {
      console.log("Seleccione una ronda y una candidata antes de enviar.");
    }
  };
  return (
    <div>
      <h2>Candidata</h2>
      <Select
        style={{ width: 120 }}
        options={optionsCandidatas}
        onChange={handleCandidataChange}
      />
      <h2>Ronda</h2>
      <Select
        style={{ width: 120 }}
        options={optionsRondas}
        onChange={handleRondaChange}
      />
      <Button type="primary" onClick={sendMessage}>
        Enviar
      </Button>
    </div>
  );
}

export default Admin;
