import {ReactNode} from "react";
import "bootstrap/dist/css/bootstrap.css";

type Props = {
    children: ReactNode;
    type: string;
    placeholder:string;
};

function Entrada({children, type, placeholder}: Props) {
  return (
    <div className="input-group mb-3">
      <span className="input-group-text" id="basic-addon1">
        {children}
      </span>
      <input
        type={type}
        className="form-control"
        placeholder={placeholder}
        aria-label="Username"
        aria-describedby="basic-addon1"
        required
      />
    </div>
  );
}

export default Entrada;
