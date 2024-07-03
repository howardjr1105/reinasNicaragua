import { ReactNode, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "../App.css";

type Props = {
  children: ReactNode;
  onClick: () => void;
};

function boton({ children, onClick }: Props) {
  return (
    <button onClick={onClick} className="btn btn-dark">
      {children}
    </button>
  );
}

export default boton;
