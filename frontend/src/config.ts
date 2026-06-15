export const config = {
  api: {
    // En producción usa el backend de Render. En desarrollo, .env.development
    // define VITE_API_URL=http://localhost:8080 y tiene prioridad.
    url: import.meta.env.VITE_API_URL ?? "https://repuestoszamora-website.onrender.com",
  },
};
