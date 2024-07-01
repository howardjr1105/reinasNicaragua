import { ReactNode } from "react";
import Card from "./Components/Card";
import Boton from "./Components/Boton";
import "bootstrap/dist/css/bootstrap.css";
import reinas from "../Img/reinasLogo.png";
import Entrada from "./Components/Entrada";
import "./App.css";
import Login from "./Screens/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

type Props = {};

function App({}: Props) {
  return (
     <Login />
   /* <Router>
      <Routes>
        <Route path="Login" element={<Login />}/>
      </Routes>
    </Router> */
  );
}

export default App;
