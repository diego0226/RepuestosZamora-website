// Importa el hook personalizado para acceder al contexto de autenticación global
import { useAuth } from "../contexts/AuthContext";

// Componente de página que muestra todos los datos del perfil del cliente autenticado
export function PerfilPage() {
  // Obtiene el objeto "user" con los datos del cliente desde el contexto de autenticación
  // "user" es del tipo AuthUser y contiene: idCliente, nombre, apellido1, apellido2, correo, telefono, fecha_registro
  const { user } = useAuth();

  // Verificación de seguridad: si por algún motivo no hay usuario en el contexto, muestra un aviso
  // En condiciones normales esto no ocurre porque la ruta /perfil está protegida por ProtectedRoute
  if (!user) {
    return <p>No hay información del usuario disponible.</p>;
  }

  return (
    <div>
      <h1>Mi perfil</h1>

      {/* Sección que agrupa todos los datos del cliente autenticado */}
      <section>

        {/* Muestra el nombre completo del cliente uniendo nombre y ambos apellidos */}
        <div>
          <strong>Nombre completo: </strong>
          {/* Concatena los tres campos de nombre con espacios entre ellos */}
          <span>{user.nombre} {user.apellido1} {user.apellido2}</span>
        </div>

        {/* Muestra el correo electrónico del cliente */}
        <div>
          <strong>Correo: </strong>
          <span>{user.correo}</span>
        </div>

        {/* Muestra el teléfono del cliente; si está vacío o null muestra un texto alternativo */}
        <div>
          <strong>Teléfono: </strong>
          {/* El operador || muestra "No registrado" si telefono es null, undefined o string vacío */}
          <span>{user.telefono || "No registrado"}</span>
        </div>

        {/* Muestra la fecha de registro del cliente en formato local de Costa Rica */}
        <div>
          <strong>Fecha de registro: </strong>
          <span>
            {user.fecha_registro
              // Si existe la fecha, la convierte a formato legible en español costarricense (ej: "15/1/2024")
              ? new Date(user.fecha_registro).toLocaleDateString("es-CR")
              // Si la fecha no está disponible por algún motivo, muestra este texto de reemplazo
              : "No disponible"}
          </span>
        </div>

      </section>
    </div>
  );
}
