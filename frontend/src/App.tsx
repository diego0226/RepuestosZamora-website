import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { LoginPage } from "./pages/LoginPage";
import { CitaList } from "./components/CitaList";
import { CitaDetail } from "./components/CitaDetail";
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
                <CitaList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/citas/:id"
            element={
              <ProtectedRoute>
                <CitaDetail />
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
