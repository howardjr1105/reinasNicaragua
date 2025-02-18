import { ReactNode} from "react";
import "bootstrap/dist/css/bootstrap.css";
import "../App.css";

type Props = {
  children: ReactNode;
  onClick: () => void;
  color: string
  isLoading?: boolean
};

function boton({ children, onClick, color}: Props) {
  return (
    <button onClick={onClick} className={color}>
      {children}
    </button>
  );
}

export default boton;
