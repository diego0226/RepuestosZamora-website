import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { User, Mail, Phone, Shield, ChevronRight, AlertTriangle, ArrowLeft } from "lucide-react";
import { register as registerCliente, type RegisterData } from "../services/AuthService";
import { useAuth } from "../contexts/AuthContext";
import { Logo } from "../components/ui/Logo";
import { Field } from "../components/ui/Field";
import { Button } from "../components/ui/Button";
import { ViewIn } from "../components/ui/ViewIn";

export function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterData>();
  const [error, setError] = useState("");
  const { setUser } = useAuth();
  const navigate = useNavigate();

  async function onSubmit(data: RegisterData) {
    setError("");
    try {
      const user = await registerCliente(data);
      setUser(user);
      navigate("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al registrarse");
    }
  }

  return (
    <div className="min-h-[100svh] bg-neutral tex-grid grid place-items-center p-5 py-10">
      <ViewIn className="w-full max-w-[460px]">
        <Link to="/" className="mono inline-flex items-center gap-2 text-secondary text-[12px] uppercase font-bold mb-5" style={{ letterSpacing: "0.1em" }}>
          <ArrowLeft size={16} /> Volver al inicio
        </Link>
        <div className="surface rounded-lg overflow-hidden">
          <div className="hazard h-[5px]" />
          <div className="px-[30px] pt-7 pb-8">
            <div className="flex justify-center mb-5"><Logo /></div>
            <div className="mono text-[11px] text-primary uppercase font-bold" style={{ letterSpacing: "0.2em" }}>
              Nueva cuenta
            </div>
            <h2 className="display text-white text-[28px] mt-2 mb-6">REGISTRARSE</h2>

            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-[15px]" data-cy="register-form">
              <div className="grid grid-cols-2 gap-3">
                <Field
                  label="Nombre"
                  icon={User}
                  placeholder="Andrés"
                  data-cy="register-nombre"
                  error={errors.nombre?.message}
                  {...register("nombre", { required: "El nombre es obligatorio" })}
                />
                <Field
                  label="Apellido"
                  placeholder="Solano"
                  data-cy="register-apellido1"
                  error={errors.apellido1?.message}
                  {...register("apellido1", { required: "El apellido es obligatorio" })}
                />
              </div>
              <Field label="Segundo apellido" placeholder="Vargas" data-cy="register-apellido2" {...register("apellido2")} />
              <Field
                label="Correo"
                type="email"
                icon={Mail}
                placeholder="vos@correo.com"
                data-cy="register-correo"
                error={errors.correo?.message}
                {...register("correo", {
                  required: "El correo es obligatorio",
                  pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Formato de correo inválido" },
                })}
              />
              <Field label="Teléfono" type="tel" icon={Phone} placeholder="8888-8888" data-cy="register-telefono" {...register("telefono")} />
              <Field
                label="Contraseña"
                type="password"
                icon={Shield}
                placeholder="••••••••"
                data-cy="register-contrasena"
                error={errors.contrasena?.message}
                {...register("contrasena", {
                  required: "La contraseña es obligatoria",
                  minLength: { value: 8, message: "La contraseña debe tener al menos 8 caracteres" },
                })}
              />

              {error && (
                <div className="flex gap-2 items-center text-[#ff5252] text-[13px]" data-cy="register-error">
                  <AlertTriangle size={16} /> {error}
                </div>
              )}

              <Button type="submit" variant="primary" size="lg" full iconRight={ChevronRight} disabled={isSubmitting} className="mt-1" data-cy="register-submit">
                {isSubmitting ? "Creando cuenta…" : "Crear mi cuenta"}
              </Button>
            </form>

            <div className="text-center mt-5 text-[13.5px] text-secondary">
              ¿Ya tenés cuenta?{" "}
              <Link to="/login" className="text-primary font-bold">Iniciá sesión</Link>
            </div>
          </div>
        </div>
      </ViewIn>
    </div>
  );
}
