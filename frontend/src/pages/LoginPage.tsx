import { useState } from "react";
// Importa el hook useForm de react-hook-form para manejar el formulario
import { useForm } from "react-hook-form";
// Importa Link además de useNavigate para agregar un enlace a la página de registro
import { useNavigate, Link } from "react-router-dom";
import { login } from "../services/AuthService";
import { useAuth } from "../contexts/AuthContext";

// Estructura de los campos del formulario de login
interface LoginFormData {
  correo: string;
  contrasena: string;
}

export function LoginPage() {
  // useForm administra los valores, la validación y el estado de envío del formulario.
  // - register: conecta cada input al formulario.
  // - handleSubmit: valida y, si todo está bien, ejecuta nuestra función onSubmit.
  // - formState.errors: errores de validación por campo.
  // - formState.isSubmitting: true mientras se procesa el envío (reemplaza el estado loading manual).
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>();

  // Estado para almacenar y mostrar el mensaje de error que devuelve el servidor
  const [error, setError] = useState("");

  const { setUser } = useAuth();
  const navigate = useNavigate();

  // Se ejecuta solo cuando react-hook-form valida correctamente el formulario.
  // Recibe directamente los datos tipados del formulario, sin manejar el evento.
  async function onSubmit(data: LoginFormData) {
    setError("");

    try {
      const user = await login(data.correo, data.contrasena);
      setUser(user);
      navigate("/citas");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al iniciar sesión");
    }
  }

  return (
    <div>
      <h1>Iniciar sesión</h1>
      {/* handleSubmit valida los campos y solo entonces llama a onSubmit. Previene el recargado de la página */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="correo">Correo</label>
          <input
            id="correo"
            type="email"
            {...register("correo", {
              required: "El correo es obligatorio",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Formato de correo inválido",
              },
            })}
          />
          {/* Muestra el error de validación de este campo si existe */}
          {errors.correo && <p style={{ color: "red" }}>{errors.correo.message}</p>}
        </div>
        <div>
          <label htmlFor="contrasena">Contraseña</label>
          <input
            id="contrasena"
            type="password"
            {...register("contrasena", { required: "La contraseña es obligatoria" })}
          />
          {errors.contrasena && <p style={{ color: "red" }}>{errors.contrasena.message}</p>}
        </div>
        {/* Muestra el mensaje de error del servidor solo si el estado error no está vacío */}
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Cargando..." : "Entrar"}
        </button>
      </form>

      {/* Enlace hacia la página de registro para usuarios que aún no tienen cuenta */}
      <p>
        ¿No tenés cuenta? <Link to="/register">Registrate</Link>
      </p>
    </div>
  );
}