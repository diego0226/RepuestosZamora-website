import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { Layout } from "./components/Layout";
import { LoginPage } from "./pages/LoginPage";
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
          <Route path="/login" element={<LoginPage />} />
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
          <Route path="*" element={<Navigate to="/citas" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
