import React, { useState } from "react";
import logo from "../Img/reinasLogo.png";
import Candidata from "../Components/Candidata";
import Boton from "../Components/Boton";
import "../App.css";

type Props = {};

function Votar({}: Props) {
  const pasarela = "traje de baño";
  const negro = "btn btn-dark";
  const blanco = "btn btn-light";
  const verde = "btn btn-success";
  const [candidatas, setCandidatas] = useState([
    {
      img: "https://i.ibb.co/28nTBmx/maria-Betanco.png",
      nombre: "Maria Betanco",
    },
  ]);
  return (
    <div className="fila">
      <div className="columna">
        <div>
          <img src={logo} className="img-fluid" width={"150px"}></img>
        </div>
        <div>
          {candidatas.map((candidata: any) => (
            <Candidata img={candidata.img} children={candidata.nombre} />
          ))}
        </div>
      </div>
      <div className="columna">
        <div className="columna" style={{ justifyContent: "initial" }}>
          <h1>Pasarela de {pasarela}</h1>
          <h3>Puntuación</h3>
        </div>
        <div className="fila">
          <Boton onClick={() => {}} color={blanco}>
            1
          </Boton>
          <Boton onClick={() => {}} color={blanco}>
            2
          </Boton>
          <Boton onClick={() => {}} color={blanco}>
            3
          </Boton>
          <Boton onClick={() => {}} color={blanco}>
            4
          </Boton>
          <Boton onClick={() => {}} color={blanco}>
            5
          </Boton>
          <Boton onClick={() => {}} color={blanco}>
            6
          </Boton>
          <Boton onClick={() => {}} color={blanco}>
            7
          </Boton>
          <Boton onClick={() => {}} color={blanco}>
            8
          </Boton>
          <Boton onClick={() => {}} color={blanco}>
            9
          </Boton>
          <Boton onClick={() => {}} color={blanco}>
            10
          </Boton>
        </div>
        <div>
          <Boton onClick={() => {}} color={negro}>
            Votar
          </Boton>
        </div>
      </div>
    </div>
  );
}

export default Votar;
