import "bootstrap/dist/css/bootstrap.css";
import { Input } from "antd";

type Props = {
  type: string;
  placeholder: string;
};

function Entrada({ type, placeholder }: Props) {
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
        required
        //{...register("text", { required: true, minLength: 2, maxLength: 20 })}
      />
    </div>
  );
}

export default Entrada;
