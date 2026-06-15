import rawConfig from "./config.json";
import type { Configuration } from "./configuration";

// En producción la URL de la API se inyecta por la variable de entorno
// VITE_API_URL (configurada en Vercel). En desarrollo local se usa el valor
// de config.json (http://localhost:8080) como respaldo.
const apiUrl = import.meta.env.VITE_API_URL ?? (rawConfig as Configuration).api.url;

export const config: Configuration = {
  api: {
    url: apiUrl,
  },
};
