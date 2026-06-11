import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import "./Navbar.css";

export function Navbar() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <nav className="navbar">
      <div className="navbar-brand">Repuestos Zamora</div>
      <div className="navbar-links">
        <NavLink
          to="/citas"
          className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
        >
          Mis citas
        </NavLink>
        <NavLink
          to="/vehiculo"
          className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
        >
          Mis vehículos
        </NavLink>
      </div>
      <button className="btn-logout" onClick={handleLogout}>
        Cerrar sesión
      </button>
    </nav>
  );
}
