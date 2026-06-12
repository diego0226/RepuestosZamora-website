import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { CartProvider } from "./contexts/CartContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { Layout } from "./components/Layout";
import { LandingPage } from "./pages/LandingPage";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { PerfilPage } from "./pages/PerfilPage";
import { Dashboard } from "./components/Dashboard";
import { CitaList } from "./components/CitaList";
import { CitaDetail } from "./components/CitaDetail";
import { VehiculoList } from "./components/VehiculoList";
import { RepuestoList } from "./components/Repuesto/RepuestoList";
import { RepuestoDetail } from "./components/Repuesto/RepuestoDetail";
import { ServicioList } from "./components/Servicio/ServicioList";
import { Carrito } from "./components/Carrito";
import type { ReactNode } from "react";
import "./App.css";

// Envuelve cualquier vista autenticada con la protección de ruta y el Layout común.
function Protected({ children }: { children: ReactNode }) {
  return (
    <ProtectedRoute>
      <Layout>{children}</Layout>
    </ProtectedRoute>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <Routes>
            {/* Rutas públicas */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            {/* Rutas protegidas (con Layout) */}
            <Route path="/dashboard" element={<Protected><Dashboard /></Protected>} />
            <Route path="/citas" element={<Protected><CitaList /></Protected>} />
            <Route path="/citas/:id" element={<Protected><CitaDetail /></Protected>} />
            <Route path="/vehiculo" element={<Protected><VehiculoList /></Protected>} />
            <Route path="/repuestos" element={<Protected><RepuestoList /></Protected>} />
            <Route path="/repuestos/:id" element={<Protected><RepuestoDetail /></Protected>} />
            <Route path="/servicios" element={<Protected><ServicioList /></Protected>} />
            <Route path="/carrito" element={<Protected><Carrito /></Protected>} />
            <Route path="/perfil" element={<Protected><PerfilPage /></Protected>} />

            {/* Cualquier ruta desconocida vuelve al inicio */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
