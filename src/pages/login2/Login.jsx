import { useForm } from "react-hook-form";
import { useUser } from "../../context/UserContex"; // Importa useUser desde tu contexto
import "./Login.css";

export default function Login() {
  const { register, handleSubmit } = useForm();
  const { login } = useUser(); // Usa el hook para obtener login

  async function handleLogin(data) {
    login(data); // Llama a la función login correctamente
  }

  return (
    <div className="login-container">
      <div className="wave"></div>
      <div className="wave"></div>
      <div className="wave"></div>
      <form className="login-form" onSubmit={handleSubmit(handleLogin)}>
        <h1>Login</h1>
        <label>Correo electrónico</label>
        <input
          type="email"
          placeholder="Correo electrónico"
          {...register("email", { required: "El email es requerido" })}
        />
        <label>Contraseña</label>
        <input
          type="password"
          placeholder="Contraseña"
          {...register("password", { required: "La contraseña es requerida" })}
        />
        <button type="submit" className="button">
          Ingresar
        </button>
      </form>
    </div>
  );
}
