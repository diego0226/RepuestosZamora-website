import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronRight, Gauge, Shield, Clock, Check, MapPin, Phone, User, Sparkles } from "lucide-react";
import type { Servicio } from "../models/Servicio/responses/Servicio";
import { getServices } from "../services/Servicio/ServicionService";
import { useAuth } from "../contexts/AuthContext";
import { Logo } from "../components/ui/Logo";
import { Button } from "../components/ui/Button";
import { Badge } from "../components/ui/Badge";
import { ViewIn } from "../components/ui/ViewIn";
import { iconParaServicio } from "../components/ui/icons";
import { colones } from "../components/ui/format";

const FEATURES = [
  { icon: Gauge, title: "Diagnóstico de precisión", desc: "Escáner OBD-II de última generación y un informe técnico claro de cada falla." },
  { icon: Shield, title: "Técnicos certificados", desc: "Mecánicos con certificación y repuestos de marcas garantizadas, sin sorpresas." },
  { icon: Clock, title: "Citas sin filas", desc: "Agendá en línea, seguí el estado de tu vehículo y recibí avisos en tiempo real." },
];

const STATS = [
  { n: "15", suf: "años", label: "en el oficio" },
  { n: "12K", suf: "+", label: "servicios al año" },
  { n: "4.9", suf: "★", label: "calificación" },
];

// Página pública de inicio. Si el usuario ya está autenticado, lo lleva al panel.
export function LandingPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [servicios, setServicios] = useState<Servicio[]>([]);

  useEffect(() => {
    if (user) {
      navigate("/dashboard", { replace: true });
    }
  }, [user, navigate]);

  useEffect(() => {
    getServices()
      .then((data) => setServicios(data))
      .catch(() => setServicios([]));
  }, []);

  return (
    <div className="min-h-[100svh] bg-neutral tex-grid">
      {/* Barra superior */}
      <header
        className="sticky top-0 z-40"
        style={{ borderBottom: "1px solid var(--line)", background: "rgba(15,15,15,0.82)", backdropFilter: "blur(10px)" }}
      >
        <div className="max-w-[1180px] mx-auto px-6 py-4 flex items-center justify-between">
          <Logo />
          <div className="flex gap-2.5">
            <Button variant="ghost" data-cy="nav-login" onClick={() => navigate("/login")}>Iniciar sesión</Button>
            <Button variant="primary" icon={User} data-cy="nav-register" onClick={() => navigate("/register")}>Registrarse</Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-[1180px] mx-auto px-6 pt-[72px] pb-14">
        <div className="grid gap-12 items-center lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
          <ViewIn>
            <Badge tone="red">
              <span className="pulse-dot w-1.5 h-1.5 rounded-full bg-current" />
              Taller abierto · Lun–Sáb
            </Badge>
            <h1 className="display text-white mt-5" style={{ fontSize: "clamp(40px, 7vw, 76px)" }}>
              TU MOTOR EN<br />
              <span className="text-primary">MANOS EXPERTAS</span>
            </h1>
            <p className="text-secondary text-[18px] leading-relaxed max-w-[480px] mt-[22px]">
              Mantenimiento, repuestos originales y reparación para tu vehículo. Agendá tu cita, gestioná tus carros y
              comprá repuestos desde un solo panel.
            </p>
            <div className="flex gap-3 mt-[30px] flex-wrap">
              <Button variant="primary" size="lg" iconRight={ChevronRight} data-cy="hero-register" onClick={() => navigate("/register")}>
                Crear cuenta gratis
              </Button>
              <Button variant="ghost" size="lg" data-cy="hero-login" onClick={() => navigate("/login")}>Ya tengo cuenta</Button>
            </div>
            <div className="flex gap-10 mt-11 flex-wrap">
              {STATS.map((s) => (
                <div key={s.label}>
                  <div className="display text-white text-[34px]">
                    {s.n}
                    <span className="text-primary text-[20px]">{s.suf}</span>
                  </div>
                  <div className="mono text-[11px] text-secondary uppercase" style={{ letterSpacing: "0.12em" }}>
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </ViewIn>

          {/* Panel visual del hero */}
          <ViewIn>
            <div className="surface corner-cut tex-carbon rounded-[10px] p-[26px] relative overflow-hidden">
              <div className="hazard absolute top-0 left-0 right-0 h-1.5" />
              <div className="flex justify-between items-center mt-2">
                <div className="mono text-[11px] text-secondary uppercase" style={{ letterSpacing: "0.2em" }}>
                  Orden de trabajo
                </div>
                <Badge tone="red">#OT-5012</Badge>
              </div>
              <div className="mt-[18px] grid place-items-center py-[18px]">
                <div className="w-24 h-24 rounded-full grid place-items-center relative" style={{ border: "2px solid var(--line-strong)" }}>
                  <div
                    className="absolute rounded-full"
                    style={{ inset: -2, border: "2px solid transparent", borderTopColor: "var(--primary)", borderRightColor: "var(--primary)", transform: "rotate(45deg)" }}
                  />
                  <Gauge size={42} className="text-white" />
                </div>
                <div className="display text-white text-[30px] mt-3.5">78% LISTO</div>
                <div className="mono text-[12px] text-secondary">Toyota Corolla · BNT-845</div>
              </div>
              <div className="mt-2 pt-4 flex flex-col gap-3" style={{ borderTop: "1px solid var(--line)" }}>
                {[["Cambio de aceite", true], ["Revisión de frenos", true], ["Diagnóstico A/C", false]].map(
                  ([t, done]) => (
                    <div key={t as string} className="flex items-center gap-3">
                      <div
                        className="w-5 h-5 rounded grid place-items-center shrink-0"
                        style={{ background: done ? "var(--primary)" : "transparent", border: done ? "none" : "1px solid var(--line-strong)" }}
                      >
                        {done && <Check size={13} className="text-white" strokeWidth={3} />}
                      </div>
                      <span className="text-sm" style={{ color: done ? "#fff" : "var(--secondary)" }}>{t}</span>
                    </div>
                  )
                )}
              </div>
            </div>
          </ViewIn>
        </div>
      </section>

      {/* Franja de servicios */}
      <section style={{ borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)", background: "rgba(34,34,34,0.4)" }}>
        <div className="max-w-[1180px] mx-auto px-6 py-14">
          <div className="mono text-[11px] text-primary uppercase font-bold text-center" style={{ letterSpacing: "0.22em" }}>
            Lo que hacemos
          </div>
          <h2 className="display text-white text-center mt-2.5 mb-9" style={{ fontSize: "clamp(28px,4vw,40px)" }}>
            SERVICIOS DEL TALLER
          </h2>
          <div className="grid gap-3.5" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))" }} data-cy="servicios-grid">
            {servicios.slice(0, 6).map((s) => {
              const Icon = iconParaServicio(s.nombreServicio);
              return (
                <div key={s.idServicio} className="surface surface-hover rounded-lg p-[22px]" data-cy="servicio-card">
                  <div className="w-11 h-11 rounded-md grid place-items-center text-primary" style={{ background: "rgba(230,0,0,0.12)" }}>
                    <Icon size={24} />
                  </div>
                  <div className="font-bold text-white text-base mt-4">{s.nombreServicio}</div>
                  <div className="text-secondary text-[13.5px] leading-relaxed mt-[7px]">{s.descripcion}</div>
                  <div className="mono mt-3.5 text-primary font-bold text-[17px]">{colones(s.precio)}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Propuestas de valor */}
      <section className="max-w-[1180px] mx-auto px-6 py-16">
        <div className="grid gap-5" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(260px,1fr))" }}>
          {FEATURES.map((f) => (
            <div key={f.title} className="flex gap-4">
              <div className="w-12 h-12 shrink-0 rounded-md grid place-items-center text-primary" style={{ border: "1px solid var(--line-strong)" }}>
                <f.icon size={24} />
              </div>
              <div>
                <div className="font-bold text-white text-[17px]">{f.title}</div>
                <div className="text-secondary text-sm leading-relaxed mt-1.5">{f.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Banda CTA */}
      <section className="max-w-[1180px] mx-auto mb-[72px] px-6">
        <div className="surface corner-cut rounded-xl relative overflow-hidden" style={{ padding: "clamp(32px,5vw,56px)", borderColor: "rgba(230,0,0,0.4)" }}>
          <div className="tex-carbon absolute inset-0" />
          <div className="relative flex items-center justify-between gap-7 flex-wrap">
            <div>
              <h2 className="display text-white m-0" style={{ fontSize: "clamp(26px,4vw,38px)" }}>¿LISTO PARA RODAR SEGURO?</h2>
              <p className="text-secondary text-base mt-3 max-w-[460px]">
                Creá tu cuenta y agendá tu primera cita en menos de dos minutos.
              </p>
            </div>
            <Button variant="primary" size="lg" icon={Sparkles} onClick={() => navigate("/register")}>Empezar ahora</Button>
          </div>
        </div>
      </section>

      <footer style={{ borderTop: "1px solid var(--line)" }} className="py-7 px-6">
        <div className="max-w-[1180px] mx-auto flex justify-between items-center gap-4 flex-wrap">
          <Logo size={28} />
          <div className="mono text-[12px] text-secondary flex gap-[22px] flex-wrap items-center">
            <span className="inline-flex gap-[7px] items-center"><MapPin size={14} /> San José, Costa Rica</span>
            <span className="inline-flex gap-[7px] items-center"><Phone size={14} /> 2253-8800</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
