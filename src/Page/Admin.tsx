import { useEffect, useState } from "react";
import { Button, Select, Modal } from "antd";
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
    fetch("https://reinasapiprueba.azurewebsites.net/api/Ronda")
      .then((response) => response.json())
      .then((dataRondas) => setDataRondas(dataRondas));
    console.log(dataRondas);
  }, []);
  useEffect(() => {
    fetch("https://reinasapiprueba.azurewebsites.net/api/Participantes")
      .then((response) => response.json())
      .then((dataCandidata) => setDataCandidata(dataCandidata));
    console.log(dataCandidata);
  }, []);
  const [usuario, setUsuario] = useState<respuesta>();
  const [dataRondas, setDataRondas] = useState<rondas[]>([]);
  const [dataRondasPremdio, setDataRondasPromedio] = useState<number>();
  const [dataCandidata, setDataCandidata] = useState<response>();
  const [selectedRonda, setSelectedRonda] = useState<number | null>(null);
  const [data, setData] = useState<top[]>([]);
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
  const handleRondaPromedioChange = (value: number) => {
    console.log(`selected ronda Promedio ${value}`);
    setDataRondasPromedio(value);
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
  interface top {
    participanteId: Number;
    nombre: string;
    puntajeFinal: Number;
    rango: number;
  }
  const optionsRondas = dataRondas.map((ronda) => ({
    value: ronda.ronda_ID,
    label: ronda.nombre,
  }));
  const RondasPromedio: rondas[] = [
    { ronda_ID: 1, nombre: "Promedio 4 rondas" },
    { ronda_ID: 2, nombre: "Top 6" },
    { ronda_ID: 3, nombre: "Top 3" },
    { ronda_ID: 4, nombre: "Top 1" },
  ];
  const optionsRondasPromedio = RondasPromedio.map((promedio) => ({
    value: promedio.ronda_ID,
    label: promedio.nombre,
  }));
  const optionsCandidatas = dataCandidata?.data.map((participante) => ({
    value: participante.participanteId,
    label: participante.nombre,
  }));
  useEffect(() => {
    const initSignalRConnection = async () => {
      const conn = new signalR.HubConnectionBuilder()
        .withUrl("https://reinasapiprueba.azurewebsites.net/notificationHub")
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

  const sendMessageCand = async () => {
    if (selectedRonda !== null && selectedCandidata !== null && connection) {
      const message = {
        ronda_id: selectedRonda,
        participante_id: selectedCandidata,
      };
      const groupName = `Group_1`;

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
  const sendMessageEspera = async () => {
    if (connection) {
      const message = {
        pagina: "Espera",
      };
      const groupName = `Group_1`;

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
      console.log("Pagina de espera no fue enviada");
    }
  };
  const sendMessageHome = async () => {
    if (connection) {
      const message = {
        pagina: "Home",
      };
      const groupName = `Group_1`;

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
      console.log("Pagina de espera no fue enviada");
    }
  };
  const sendMessageFinal = async () => {
    if (connection) {
      const message = {
        pagina: "Final",
        ronda_id: 2,
      };
      const groupName = `Group_1`;

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
      console.log("Pagina de espera no fue enviada");
    }
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  useEffect(() => {
    if (isModalOpen) {
      switch (dataRondasPremdio) {
        case 1:
          fetch("https://reinasapiprueba.azurewebsites.net/api/Promedios")
            .then((response) => response.json())
            .then((data) => setData(data));
          break;
        case 2:
          fetch(
            "https://reinasapiprueba.azurewebsites.net/api/Promedios/ListarTop6"
          )
            .then((response) => response.json())
            .then((data) => setData(data));
          break;
        case 3:
          fetch(
            "https://reinasapiprueba.azurewebsites.net/api/Promedios/ListarTop3"
          )
            .then((response) => response.json())
            .then((data) => setData(data));
          break;
        case 4:
          fetch(
            "https://reinasapiprueba.azurewebsites.net/api/Promedios/ListarGanadora"
          )
            .then((response) => response.json())
            .then((data) => setData(data));
          break;

        default:
          console.log("Error en el switch");
          break;
      }
    }
  }, [isModalOpen]);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const [mensaje, setMensaje] = useState("");
  const [isTop10, setIsTop10] = useState(false);
  useEffect(() => {
    if (isTop10) {
      fetch(
        "https://reinasapiprueba.azurewebsites.net/api/Participantes/ActualizarTop10"
      )
        .then((response) => response.json())
        .then((data) => setMensaje(data));
      console.log(mensaje);
    }
  }, [isModalOpen]);
  const top10 = () => {
    setIsTop10(true);
  };
  const [isTop6, setIsTop6] = useState(false);
  useEffect(() => {
    if (isTop6) {
      fetch(
        "https://reinasapiprueba.azurewebsites.net/api/Participantes/ActualizarTop6"
      )
        .then((response) => response.json())
        .then((data) => setMensaje(data));
      console.log(mensaje);
    }
  }, [isModalOpen]);
  const top6 = () => {
    setIsTop6(true);
  };
  const [isTop3, setIsTop3] = useState(false);
  useEffect(() => {
    if (isTop3) {
      fetch(
        "https://reinasapiprueba.azurewebsites.net/api/Participantes/ActualizarTop3"
      )
        .then((response) => response.json())
        .then((data) => setMensaje(data));
      console.log(mensaje);
    }
  }, [isModalOpen]);
  const top3 = () => {
    setIsTop3(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
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
        <Button type="primary" onClick={sendMessageCand}>
          Enviar
        </Button>
      </div>
      <div>
        <Button type="dashed" onClick={sendMessageEspera}>
          Espera
        </Button>
        <Button type="dashed" onClick={sendMessageHome}>
          Home
        </Button>
        <Button type="dashed" onClick={sendMessageFinal}>
          Final
        </Button>
      </div>
      <div>
        <>
          <Select
            style={{ width: 120 }}
            options={optionsRondasPromedio}
            onChange={handleRondaPromedioChange}
          />
          <Button type="primary" onClick={showModal}>
            Listar
          </Button>
          <Button type="primary" onClick={top10}>
            Top 10
          </Button>
          <Button type="primary" onClick={top6}>
            Top 6
          </Button>
          <Button type="primary" onClick={top3}>
            Top 3
          </Button>
          <Modal
            title="Listado por promedios"
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
          >
            <table>
              <thead>
                <tr>
                  <th>Rango</th>
                  <th>Nombre</th>
                  <th>Puntaje Final</th>
                </tr>
              </thead>
              <tbody>
                {data?.map((candidata: any) => (
                  <tr key={candidata.participanteId}>
                    <td>{candidata.rango}</td>
                    <td>{candidata.nombre}</td>
                    <td>{candidata.puntajeFinal}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Modal>
        </>
      </div>
    </div>
  );
}

export default Admin;
