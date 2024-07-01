import { ReactNode, useState } from "react";
import 'bootstrap/dist/css/bootstrap.css'
import '../App.css'

type Props = {
  children: ReactNode;
};

function boton({ children }: Props) {
  return <button className="btn btn-dark" >{children}</button>;
}

export default boton;
