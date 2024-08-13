import React, { useEffect, useState } from "react";
import Candidata from "../Components/Candidata";
import logo from "../Img/reinasLogo.png";
import { Checkbox, Button } from "antd";
import { Navigate } from "react-router-dom";

const Final = () => {
  const [data, setData] = useState<response>();
  const [selectedParticipant, setSelectedParticipant] = useState<number | null>(
    null
  );
  const [message, setMessage] = useState<dataRecibe>();
  const [usuario, setUsuario] = useState<respuesta>();
  const [goToEspera, setGoEspera] = React.useState(false);

  useEffect(() => {
    fetch("https://reinasapiprueba.azurewebsites.net/api/Participantes")
      .then((response) => response.json())
      .then((data) => setData(data));
  }, []);
  useEffect(() => {
    const messageData = localStorage.getItem("messageData");
    if (messageData) {
      const parsedData = JSON.parse(messageData);
      console.log(parsedData); // Verifica si los datos son correctos
      setMessage(parsedData);
    }
  }, []);
  useEffect(() => {
    const userData = localStorage.getItem("userData");
    if (userData) {
      const parsedData = JSON.parse(userData);
      setUsuario(parsedData);
      //console.log(parsedData);
      console.log(usuario);
    }
  }, []);
  interface dataRecibe {
    pagina: string;
    ronda_id: number;
  }

  interface response {
    seccess: Boolean;
    message: String;
    data: Participante[];
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

  const handleCheckboxChange = (participanteId: number) => {
    setSelectedParticipant(participanteId);
    console.log(participanteId);
  };

  const handleSubmit = () => {
    if (selectedParticipant !== null) {
      //const puntuacion = "1";
      const dataV = {
        usuario_ID: usuario?.data.usuario_id,
        participante_ID: selectedParticipant, // Asumiendo que solo hay una candidata
        ronda_ID: message?.ronda_id,
        puntuacion: message?.ronda_id,
      };
      console.log(dataV);
      fetch("https://reinasapiprueba.azurewebsites.net/api/Votacion", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataV),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Success:", data);
          setGoEspera(true);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } else {
      alert("Debes seleccionar una participante.");
    }
  };
  if (goToEspera) {
    return <Navigate to="/Espera" />;
  }

  return (
    <div className="columna">
      <div>
        <img src={logo} className="img-fluid" width={"150px"} alt="Logo" />
      </div>
      <div className="fila">
        {data?.data.map((candidata: Participante) => (
          <div key={candidata.participanteId} className="candidata-container">
            <Candidata
              img={candidata.img}
              children={candidata.nombre}
              depart={candidata.departamento}
            />
            <Checkbox
              checked={selectedParticipant === candidata.participanteId}
              onChange={() => handleCheckboxChange(candidata.participanteId)}
            ></Checkbox>
          </div>
        ))}
      </div>
      <Button type="primary" onClick={handleSubmit}>
        Enviar Selección
      </Button>
    </div>
  );
};

export default Final;
