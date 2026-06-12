import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { Layout } from "./components/Layout";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage"; // Página de registro para nuevos clientes
import { PerfilPage } from "./pages/PerfilPage";     // Página de perfil con los datos del cliente
import { CitaList } from "./components/CitaList";
import { CitaDetail } from "./components/CitaDetail";
import { VehiculoList } from "./components/VehiculoList";
import { VehiculoDetail } from "./components/VehiculoDetail";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Ruta pública para iniciar sesión */}
          <Route path="/login" element={<LoginPage />} />
          {/* Ruta pública para registrarse como nuevo cliente */}
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/citas"
            element={
              <ProtectedRoute>
                <Layout>
                  <CitaList />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/citas/:id"
            element={
              <ProtectedRoute>
                <Layout>
                  <CitaDetail />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/vehiculo"
            element={
              <ProtectedRoute>
                <Layout>
                  <VehiculoList />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/vehiculo/:placa"
            element={
              <ProtectedRoute>
                <Layout>
                  <VehiculoDetail />
                </Layout>
              </ProtectedRoute>
            }
          />
          {/* Ruta protegida para ver el perfil del cliente autenticado */}
          <Route
            path="/perfil"
            element={
              <ProtectedRoute>
                <Layout>
                  <PerfilPage />
                </Layout>
              </ProtectedRoute>
            }
          />
          {/* Cualquier ruta desconocida redirige a /citas */}
          <Route path="*" element={<Navigate to="/citas" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
