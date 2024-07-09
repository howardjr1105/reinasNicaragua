
import "bootstrap/dist/css/bootstrap.css";
import { Input } from "antd";

type Props = {
  type: string;
  placeholder: string;
};

function Entrada({ type, placeholder }: Props) {
  return (
    <div className="input-group mb-3">
      <Input
        type={type}
        
        placeholder={placeholder}
        aria-label="Username"
        aria-describedby="basic-addon1"
        required
      />
    </div>
  );
}

export default Entrada;
