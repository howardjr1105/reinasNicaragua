import { ReactNode } from "react";
import "../App.css";

type Props = {
  img: string;
  children: ReactNode;
};

function Candidata({ children, img }: Props) {
  return (
    <div className="cand">
      <div>
        <img src={img}></img>
      </div>
      <div>
        <h4>{children}</h4>
      </div>
    </div>
  );
}

export default Candidata;
