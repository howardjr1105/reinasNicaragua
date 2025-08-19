import "bootstrap/dist/css/bootstrap.css";
import { Input } from "antd";

type Props = {
  type: string;
  placeholder: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
  status?: "error" | "warning"; // para mostrar bordes en rojo/amarillo
};

function Entrada({ type, placeholder, onChange, name, status }: Props) {
  /*const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();*/
  return (
    <div className="input-group mb-3">
      <Input
        type={type}
        placeholder={placeholder}
        aria-label="Username"
        aria-describedby="basic-addon1"
        onChange={onChange}
        required
        name={name}
        status={status}
        //{...register("text", { required: true, minLength: 2, maxLength: 20 })}
      />
    </div>
  );
}

export default Entrada;
