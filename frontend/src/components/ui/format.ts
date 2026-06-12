// Formatea un monto en colones costarricenses (sin decimales). Ej: 15000 -> "₡15.000"
export const colones = (n: number): string =>
  "₡" + Number(n ?? 0).toLocaleString("es-CR", { maximumFractionDigits: 0 });

const MESES = ["ENE", "FEB", "MAR", "ABR", "MAY", "JUN", "JUL", "AGO", "SET", "OCT", "NOV", "DIC"];

// Devuelve el día del mes (dos dígitos) a partir de una fecha ISO. Ej: "2026-06-18T09:30" -> "18"
export const diaDe = (iso: string): string => {
  const d = new Date(iso);
  return isNaN(d.getTime()) ? "--" : String(d.getDate()).padStart(2, "0");
};

// Devuelve el mes abreviado en español a partir de una fecha ISO. Ej: -> "JUN"
export const mesDe = (iso: string): string => {
  const d = new Date(iso);
  return isNaN(d.getTime()) ? "" : MESES[d.getMonth()];
};

// Devuelve la hora (HH:mm) a partir de una fecha ISO. Ej: -> "09:30"
export const horaDe = (iso: string): string => {
  const d = new Date(iso);
  if (isNaN(d.getTime())) return "";
  return d.toLocaleTimeString("es-CR", { hour: "2-digit", minute: "2-digit", hour12: false });
};

// Devuelve la fecha legible (dd/mm/aaaa) a partir de una fecha ISO.
export const fechaLegible = (iso: string): string => {
  const d = new Date(iso);
  return isNaN(d.getTime()) ? iso : d.toLocaleDateString("es-CR");
};
