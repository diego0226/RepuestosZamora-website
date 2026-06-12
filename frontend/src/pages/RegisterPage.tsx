// Importa el hook useState para el mensaje de error del servidor
import { useState } from "react";
// Importa el hook useForm de react-hook-form para manejar el formulario
import { useForm } from "react-hook-form";
// Importa el hook para navegar entre páginas y el componente Link para enlaces de navegación
import { useNavigate, Link } from "react-router-dom";
// Importa la función de registro y la interfaz de datos del servicio de autenticación
import { register as registerCliente, type RegisterData } from "../services/AuthService";
// Importa el hook para acceder y modificar el contexto de autenticación global
import { useAuth } from "../contexts/AuthContext";

// Componente de página para el registro de nuevos clientes en el sistema
export function RegisterPage() {
  // useForm administra los valores, la validación y el estado de envío del formulario.
  // - register: conecta cada input al formulario.
  // - handleSubmit: valida y, si todo está bien, ejecuta nuestra función onSubmit.
  // - formState.errors: errores de validación por campo.
  // - formState.isSubmitting: true mientras se procesa el envío (reemplaza el estado loading manual).
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterData>();

  // Estado para almacenar y mostrar mensajes de error si el registro falla en el servidor
  const [error, setError] = useState("");

  // Obtiene la función setUser del contexto para guardar al usuario tras el registro exitoso
  const { setUser } = useAuth();
  // Hook de React Router para redirigir al usuario a otra ruta programáticamente
  const navigate = useNavigate();

  // Función que se ejecuta solo cuando react-hook-form valida correctamente el formulario.
  // Recibe directamente los datos tipados del formulario, sin necesidad de manejar el evento.
  async function onSubmit(data: RegisterData) {
    setError(""); // Limpia cualquier mensaje de error previo que se estuviera mostrando

    try {
      // Llama a la función register del servicio; envía los datos al backend y espera la respuesta
      const user = await registerCliente(data);
      // Guarda los datos del usuario recién registrado en el contexto global y en localStorage
      setUser(user);
      // Redirige al perfil del usuario para que vea su información recién creada
      navigate("/perfil");
    } catch (err) {
      // Si ocurre un error (correo duplicado, error del servidor, etc.), lo muestra en pantalla
      setError(err instanceof Error ? err.message : "Error al registrarse");
    }
  }

  return (
    <div>
      <h1>Crear cuenta</h1>

      {/* handleSubmit valida los campos y solo entonces llama a onSubmit. Previene el recargado de la página */}
      <form onSubmit={handleSubmit(onSubmit)}>

        {/* Campo para el nombre del cliente */}
        <div>
          <label htmlFor="nombre">Nombre</label>
          <input
            id="nombre"
            type="text"
            {...register("nombre", { required: "El nombre es obligatorio" })}
          />
          {/* Muestra el error de validación de este campo si existe */}
          {errors.nombre && <p style={{ color: "red" }}>{errors.nombre.message}</p>}
        </div>

        {/* Campo para el primer apellido */}
        <div>
          <label htmlFor="apellido1">Primer apellido</label>
          <input
            id="apellido1"
            type="text"
            {...register("apellido1", { required: "El primer apellido es obligatorio" })}
          />
          {errors.apellido1 && <p style={{ color: "red" }}>{errors.apellido1.message}</p>}
        </div>

        {/* Campo para el segundo apellido (no es requerido) */}
        <div>
          <label htmlFor="apellido2">Segundo apellido</label>
          <input
            id="apellido2"
            type="text"
            {...register("apellido2")}
          />
        </div>

        {/* Campo para el correo electrónico */}
        <div>
          <label htmlFor="correo">Correo electrónico</label>
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
          {errors.correo && <p style={{ color: "red" }}>{errors.correo.message}</p>}
        </div>

        {/* Campo para la contraseña; valida un mínimo de 8 caracteres */}
        <div>
          <label htmlFor="contrasena">Contraseña</label>
          <input
            id="contrasena"
            type="password"
            {...register("contrasena", {
              required: "La contraseña es obligatoria",
              minLength: {
                value: 8,
                message: "La contraseña debe tener al menos 8 caracteres",
              },
            })}
          />
          {errors.contrasena && <p style={{ color: "red" }}>{errors.contrasena.message}</p>}
        </div>

        {/* Campo para el teléfono (type="tel" muestra teclado numérico en móviles; no es requerido) */}
        <div>
          <label htmlFor="telefono">Teléfono</label>
          <input
            id="telefono"
            type="tel"
            {...register("telefono")}
          />
        </div>

        {/* Muestra el mensaje de error del servidor solo si el estado error no está vacío */}
        {error && <p style={{ color: "red" }}>{error}</p>}

        {/* Botón de envío que se deshabilita mientras isSubmitting es true para evitar envíos duplicados */}
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Registrando..." : "Crear cuenta"} {/* Cambia el texto según el estado de envío */}
        </button>
      </form>

      {/* Enlace para ir al login si el usuario ya tiene una cuenta */}
      <p>
        ¿Ya tenés cuenta? <Link to="/login">Iniciá sesión</Link>
      </p>
    </div>
  );
}