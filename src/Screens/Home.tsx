import React, { useEffect, useState } from "react";
import Candidata from "../Components/Candidata";
import "../App.css";
import logo from "../Img/reinasLogo.png";
import { FloatButton } from "antd";
import { RightOutlined } from "@ant-design/icons";
import { Navigate } from "react-router-dom";

type Props = {};

function Home({}: Props) {
  const [data, setData] = useState<Participante[]>([]);
  useEffect(() => {
    fetch("https://reinasapiprueba.azurewebsites.net/api/Participantes")
      .then((response) => response.json())
      .then((data) => setData(data));
  }, []);
  interface Participante {
    participanteId: number;
    nombre: string;
    edad: number;
    departamento: string;
    peso: number;
    estatura: number;
    biografia: string;
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
          {data.map((candidata: any) => (
            <Candidata
              img={"https://i.ibb.co/n74x0jJ/cristel-Morales.png"}
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
