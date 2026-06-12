// Importa los hooks de estado (useState) y el tipo para el evento de formulario desde React
import { useState, type FormEvent } from "react";
// Importa el hook para navegar entre páginas y el componente Link para enlaces de navegación
import { useNavigate, Link } from "react-router-dom";
// Importa la función de registro y la interfaz de datos del servicio de autenticación
import { register, type RegisterData } from "../services/AuthService";
// Importa el hook para acceder y modificar el contexto de autenticación global
import { useAuth } from "../contexts/AuthContext";

// Componente de página para el registro de nuevos clientes en el sistema
export function RegisterPage() {
  // Estado para almacenar el valor del campo nombre mientras el usuario escribe
  const [nombre, setNombre] = useState("");
  // Estado para almacenar el primer apellido
  const [apellido1, setApellido1] = useState("");
  // Estado para almacenar el segundo apellido (campo opcional)
  const [apellido2, setApellido2] = useState("");
  // Estado para almacenar el correo electrónico
  const [correo, setCorreo] = useState("");
  // Estado para almacenar la contraseña
  const [contrasena, setContrasena] = useState("");
  // Estado para almacenar el teléfono (campo opcional)
  const [telefono, setTelefono] = useState("");
  // Estado para almacenar y mostrar mensajes de error si el registro falla
  const [error, setError] = useState("");
  // Estado para deshabilitar el botón de envío mientras se procesa la solicitud
  const [loading, setLoading] = useState(false);

  // Obtiene la función setUser del contexto para guardar al usuario tras el registro exitoso
  const { setUser } = useAuth();
  // Hook de React Router para redirigir al usuario a otra ruta programáticamente
  const navigate = useNavigate();

  // Función que se ejecuta cuando el usuario envía el formulario de registro
  async function handleSubmit(e: FormEvent) {
    e.preventDefault(); // Previene el comportamiento por defecto del formulario (recargar la página)
    setError("");       // Limpia cualquier mensaje de error previo que se estuviera mostrando
    setLoading(true);   // Activa el estado de carga para mostrar "Registrando..." y deshabilitar el botón

    // Agrupa todos los valores de los campos en un objeto con la estructura que espera el servicio
    const data: RegisterData = {
      nombre,
      apellido1,
      apellido2,
      correo,
      contrasena,
      telefono,
    };

    try {
      // Llama a la función register del servicio; envía los datos al backend y espera la respuesta
      const user = await register(data);
      // Guarda los datos del usuario recién registrado en el contexto global y en localStorage
      setUser(user);
      // Redirige al perfil del usuario para que vea su información recién creada
      navigate("/perfil");
    } catch (err) {
      // Si ocurre un error (correo duplicado, error del servidor, etc.), lo muestra en pantalla
      setError(err instanceof Error ? err.message : "Error al registrarse");
    } finally {
      setLoading(false); // Desactiva el estado de carga, tanto si el registro fue exitoso como si falló
    }
  }

  return (
    <div>
      <h1>Crear cuenta</h1>

      {/* Formulario de registro que llama a handleSubmit cuando el usuario hace clic en "Crear cuenta" */}
      <form onSubmit={handleSubmit}>

        {/* Campo para el nombre del cliente */}
        <div>
          <label htmlFor="nombre">Nombre</label>
          <input
            id="nombre"
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)} // Actualiza el estado cada vez que el usuario escribe
            required // HTML5: no permite enviar el formulario si este campo está vacío
          />
        </div>

        {/* Campo para el primer apellido */}
        <div>
          <label htmlFor="apellido1">Primer apellido</label>
          <input
            id="apellido1"
            type="text"
            value={apellido1}
            onChange={(e) => setApellido1(e.target.value)}
            required
          />
        </div>

        {/* Campo para el segundo apellido (no es requerido) */}
        <div>
          <label htmlFor="apellido2">Segundo apellido</label>
          <input
            id="apellido2"
            type="text"
            value={apellido2}
            onChange={(e) => setApellido2(e.target.value)}
          />
        </div>

        {/* Campo para el correo electrónico (type="email" valida el formato automáticamente) */}
        <div>
          <label htmlFor="correo">Correo electrónico</label>
          <input
            id="correo"
            type="email"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            required
          />
        </div>

        {/* Campo para la contraseña; minLength valida un mínimo de 8 caracteres en el cliente */}
        <div>
          <label htmlFor="contrasena">Contraseña</label>
          <input
            id="contrasena"
            type="password"
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
            minLength={8} // Validación básica en el navegador antes de enviar al servidor
            required
          />
        </div>

        {/* Campo para el teléfono (type="tel" muestra teclado numérico en móviles; no es requerido) */}
        <div>
          <label htmlFor="telefono">Teléfono</label>
          <input
            id="telefono"
            type="tel"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
          />
        </div>

        {/* Muestra el mensaje de error solo si el estado error no está vacío */}
        {error && <p style={{ color: "red" }}>{error}</p>}

        {/* Botón de envío que se deshabilita mientras loading es true para evitar envíos duplicados */}
        <button type="submit" disabled={loading}>
          {loading ? "Registrando..." : "Crear cuenta"} {/* Cambia el texto según el estado de carga */}
        </button>
      </form>

      {/* Enlace para ir al login si el usuario ya tiene una cuenta */}
      <p>
        ¿Ya tenés cuenta? <Link to="/login">Iniciá sesión</Link>
      </p>
    </div>
  );
}
