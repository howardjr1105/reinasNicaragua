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
        <h6>{children}</h6>
        <h5>{depart}</h5>
      </div>
    </div>
  );
}

export default Candidata;
