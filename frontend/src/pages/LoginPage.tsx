import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { Mail, Shield, ChevronRight, AlertTriangle, ArrowLeft } from "lucide-react";
import { login } from "../services/AuthService";
import { useAuth } from "../contexts/AuthContext";
import { Logo } from "../components/ui/Logo";
import { Field } from "../components/ui/Field";
import { Button } from "../components/ui/Button";
import { ViewIn } from "../components/ui/ViewIn";

interface LoginFormData {
  correo: string;
  contrasena: string;
}

export function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>();
  const [error, setError] = useState("");
  const { setUser } = useAuth();
  const navigate = useNavigate();

  async function onSubmit(data: LoginFormData) {
    setError("");
    try {
      const user = await login(data.correo, data.contrasena);
      setUser(user);
      navigate("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al iniciar sesión");
    }
  }

  return (
    <div className="min-h-[100svh] bg-neutral tex-grid grid place-items-center p-5">
      <ViewIn className="w-full max-w-[440px]">
        <Link to="/" className="mono inline-flex items-center gap-2 text-secondary text-[12px] uppercase font-bold mb-5" style={{ letterSpacing: "0.1em" }}>
          <ArrowLeft size={16} /> Volver al inicio
        </Link>
        <div className="surface rounded-lg overflow-hidden">
          <div className="hazard h-[5px]" />
          <div className="px-[30px] pt-7 pb-8">
            <div className="flex justify-center mb-5"><Logo /></div>
            <div className="mono text-[11px] text-primary uppercase font-bold" style={{ letterSpacing: "0.2em" }}>
              Acceso al panel
            </div>
            <h2 className="display text-white text-[28px] mt-2 mb-6">INICIAR SESIÓN</h2>

            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-[15px]">
              <Field
                label="Correo"
                type="email"
                icon={Mail}
                placeholder="vos@correo.com"
                error={errors.correo?.message}
                {...register("correo", {
                  required: "El correo es obligatorio",
                  pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Formato de correo inválido" },
                })}
              />
              <Field
                label="Contraseña"
                type="password"
                icon={Shield}
                placeholder="••••••••"
                error={errors.contrasena?.message}
                {...register("contrasena", { required: "La contraseña es obligatoria" })}
              />

              {error && (
                <div className="flex gap-2 items-center text-[#ff5252] text-[13px]">
                  <AlertTriangle size={16} /> {error}
                </div>
              )}

              <Button type="submit" variant="primary" size="lg" full iconRight={ChevronRight} disabled={isSubmitting} className="mt-1">
                {isSubmitting ? "Entrando…" : "Entrar al panel"}
              </Button>
            </form>

            <div className="text-center mt-5 text-[13.5px] text-secondary">
              ¿No tenés cuenta?{" "}
              <Link to="/register" className="text-primary font-bold">Registrate</Link>
            </div>
          </div>
        </div>
      </ViewIn>
    </div>
  );
}
