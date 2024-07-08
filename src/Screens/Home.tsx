import React, { useState } from "react";
import Candidata from "../Components/Candidata";
import "../App.css";
import logo from "../Img/reinasLogo.png";
import { FloatButton } from "antd";
import { RightOutlined } from "@ant-design/icons";
import { Navigate, Route, BrowserRouter as Router } from "react-router-dom";

type Props = {};

function Home({}: Props) {
  const [goToVotar, setGoToVotar] = React.useState(false);
  const [candidatas, setCandidatas] = useState([
    {
      img: "https://i.ibb.co/28nTBmx/maria-Betanco.png",
      nombre: "Maria Betanco",
    },
    {
      img: "https://i.ibb.co/n74x0jJ/cristel-Morales.png",
      nombre: "Cristel Morales",
    },
    {
      img: "https://i.ibb.co/61H5NYG/dayami-Izaguirre.png",
      nombre: "Dayami Izaguirre",
    },
    {
      img: "https://i.ibb.co/7SWqDK6/ligia-Martinez.png",
      nombre: "Ligia Martinez",
    },
    {
      img: "https://i.ibb.co/pz6TXNg/faviana-Gutierrez.png",
      nombre: "Faviana Gutierrez",
    },
    {
      img: "https://i.ibb.co/n74x0jJ/cristel-Morales.png",
      nombre: "Cristel Morales",
    },
    {
      img: "https://i.ibb.co/28nTBmx/maria-Betanco.png",
      nombre: "Maria Betanco",
    },
    {
      img: "https://i.ibb.co/n74x0jJ/cristel-Morales.png",
      nombre: "Cristel Morales",
    },
    {
      img: "https://i.ibb.co/28nTBmx/maria-Betanco.png",
      nombre: "Maria Betanco",
    },
    {
      img: "https://i.ibb.co/n74x0jJ/cristel-Morales.png",
      nombre: "Cristel Morales",
    },
    {
      img: "https://i.ibb.co/28nTBmx/maria-Betanco.png",
      nombre: "Maria Betanco",
    },
    {
      img: "https://i.ibb.co/n74x0jJ/cristel-Morales.png",
      nombre: "Cristel Morales",
    },
    {
      img: "https://i.ibb.co/28nTBmx/maria-Betanco.png",
      nombre: "Maria Betanco",
    },
    {
      img: "https://i.ibb.co/n74x0jJ/cristel-Morales.png",
      nombre: "Cristel Morales",
    },
    {
      img: "https://i.ibb.co/28nTBmx/maria-Betanco.png",
      nombre: "Maria Betanco",
    },
    {
      img: "https://i.ibb.co/n74x0jJ/cristel-Morales.png",
      nombre: "Cristel Morales",
    },
  ]);
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
          {candidatas.map((candidata: any) => (
            <Candidata img={candidata.img} children={candidata.nombre} />
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
