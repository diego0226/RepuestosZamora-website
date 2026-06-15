import rawConfig from "./config.json";
import type { Configuration } from "./configuration";

// La URL base de la API vive en config.json (apunta al backend de Render en
// producción). En desarrollo, .env.development define VITE_API_URL=localhost,
// que tiene prioridad para no pegarle a producción desde la máquina local.
const apiUrl = import.meta.env.VITE_API_URL ?? (rawConfig as Configuration).api.url;

export const config: Configuration = {
  api: {
    url: apiUrl,
  },
};
