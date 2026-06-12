import {
  Filter,
  Disc,
  BatteryCharging,
  Zap,
  Cog,
  Droplet,
  Thermometer,
  Gauge,
  Shield,
  Wrench,
  Package,
  type LucideIcon,
} from "lucide-react";

// Deriva un icono de lucide a partir del nombre/descripción de un repuesto.
// El backend no almacena un icono, así que lo inferimos por palabras clave para mantener el diseño.
export function iconParaRepuesto(nombre: string): LucideIcon {
  const t = (nombre || "").toLowerCase();
  if (t.includes("filtro")) return Filter;
  if (t.includes("freno") || t.includes("disco") || t.includes("pastilla")) return Disc;
  if (t.includes("bater")) return BatteryCharging;
  if (t.includes("buj") || t.includes("sensor") || t.includes("eléctr") || t.includes("electr")) return Zap;
  if (t.includes("aceite") || t.includes("lubric") || t.includes("agua") || t.includes("refriger")) return Droplet;
  if (t.includes("radiador") || t.includes("temperatura") || t.includes("térm")) return Thermometer;
  if (t.includes("correa") || t.includes("bomba") || t.includes("amortig") || t.includes("motor")) return Cog;
  return Package;
}

// Deriva un icono de lucide a partir del nombre de un servicio.
export function iconParaServicio(nombre: string): LucideIcon {
  const t = (nombre || "").toLowerCase();
  if (t.includes("aceite")) return Droplet;
  if (t.includes("freno") || t.includes("pastilla")) return Disc;
  if (t.includes("bater")) return BatteryCharging;
  if (t.includes("alinea") || t.includes("balanceo") || t.includes("diagn")) return Gauge;
  if (t.includes("rtv") || t.includes("revis")) return Shield;
  if (t.includes("correa") || t.includes("distribu")) return Cog;
  if (t.includes("a/c") || t.includes("aire") || t.includes("refriger")) return Thermometer;
  return Wrench;
}
