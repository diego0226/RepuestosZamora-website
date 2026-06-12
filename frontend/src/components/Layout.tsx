// Importa el tipo ReactNode para tipar el contenido que se renderiza dentro del Layout
import type { ReactNode } from "react";
// Importa NavLink (enlaces con estado activo) y useNavigate (navegación programática)
import { NavLink, useNavigate } from "react-router-dom";
// Importa el hook de autenticación para poder cerrar la sesión del usuario
import { useAuth } from "../contexts/AuthContext";

// Define las props que recibe el Layout: el contenido (children) que se mostrará bajo la barra de navegación
interface LayoutProps {
  children: ReactNode;
}

// Componente Layout: envuelve cada página autenticada con la barra de navegación común.
// Aquí se integra toda la lógica de navegación (antes en Navbar) para centralizar el flujo.
export function Layout({ children }: LayoutProps) {
  // Obtiene la función logout del contexto para cerrar la sesión del usuario
  const { logout } = useAuth();
  // Hook de React Router para redirigir al usuario tras cerrar sesión
  const navigate = useNavigate();

  // Función que cierra la sesión y redirige a la página de login
  function handleLogout() {
    logout();            // Limpia el usuario del contexto y de localStorage
    navigate("/login");  // Envía al usuario a la pantalla de inicio de sesión
  }

  return (
    <>
      {/* Barra de navegación común a todas las páginas protegidas */}
      <nav>
        <div>Repuestos Zamora</div>
        <div>
          {/* Enlace a las citas; isActive se tipa explícitamente como boolean para evitar el error de "any" */}
          <NavLink
            to="/citas"
            className={({ isActive }: { isActive: boolean }) => (isActive ? "active" : "")}
          >
            Mis citas
          </NavLink>
          {/* Enlace a los vehículos del cliente */}
          <NavLink
            to="/vehiculo"
            className={({ isActive }: { isActive: boolean }) => (isActive ? "active" : "")}
          >
            Mis vehículos
          </NavLink>
          {/* Enlace al perfil del cliente con sus datos personales */}
          <NavLink
            to="/perfil"
            className={({ isActive }: { isActive: boolean }) => (isActive ? "active" : "")}
          >
            Mi perfil
          </NavLink>
        </div>
        {/* Botón que ejecuta el cierre de sesión */}
        <button onClick={handleLogout}>Cerrar sesión</button>
      </nav>

      {/* Contenido específico de cada página que usa este Layout */}
      <main style={{ padding: "24px" }}>{children}</main>
    </>
  );
}
