import { ReactNode } from "react";
import "../App.css";

type Props = {
  img: string;
  children: ReactNode;
  depart: ReactNode;
};

function Candidata({ children, img, depart }: Props) {
  return (
    <div className="cand">
      <div>
        <img src={img}></img>
      </div>
      <div>
        <h4>{children}</h4>
        <p>{depart}</p>
      </div>
    </div>
  );
}

export default Candidata;
