# 🔧 Sistema de Citas y Repuestos para Taller Mecánico — Repuestos Zamora

Aplicación web full-stack para la gestión de **citas de taller mecánico y venta de repuestos**. Permite a los clientes registrar sus vehículos, agendar, consultar y cancelar citas de servicio, y comprar repuestos desde un carrito, mientras que el negocio administra su catálogo de servicios, repuestos y agenda desde una interfaz moderna y responsiva.

> Proyecto Programado — Curso **IF0006** · **Desarrollo de Software III** · Universidad de Costa Rica · 2026-S1

![Java](https://img.shields.io/badge/Java-17-007396?style=for-the-badge&logo=openjdk&logoColor=white)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-6DB33F?style=for-the-badge&logo=springboot&logoColor=white)
![Hibernate](https://img.shields.io/badge/Hibernate-59666C?style=for-the-badge&logo=hibernate&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white)
![Maven](https://img.shields.io/badge/Maven-C71A36?style=for-the-badge&logo=apachemaven&logoColor=white)

![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white)
![Lucide](https://img.shields.io/badge/Lucide-F56565?style=for-the-badge&logo=lucide&logoColor=white)

![Jira](https://img.shields.io/badge/Jira-0052CC?style=for-the-badge&logo=jira&logoColor=white)
![Cypress](https://img.shields.io/badge/Cypress-69D3A7?style=for-the-badge&logo=cypress&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

---

## 📋 Descripción

El sistema digitaliza el flujo de atención de un taller mecánico y su tienda de repuestos. El cliente puede:

- Explorar los **servicios** ofrecidos (cambio de aceite, frenos, diagnóstico, etc.) con su precio.
- Registrar sus **vehículos** y administrarlos (placa, marca, modelo).
- **Agendar una cita** seleccionando servicio, vehículo, fecha y descripción del problema.
- Consultar el estado de su orden de trabajo, **reprogramar (PUT)** o **cancelar (DELETE)** sus citas.
- Explorar el catálogo de **repuestos** y agregarlos a un **carrito** de compra.

Toda la información mostrada, registrada, actualizada o eliminada proviene directamente de la base de datos a través del backend, **no de datos estáticos**.

---

## 🛠️ Stack Tecnológico

### Backend
- **Java 17**
- **Spring Boot** (Spring Web MVC, Spring Data JPA, Bean Validation)
- **Hibernate** como ORM
- **MySQL** como gestor de base de datos
- **Lombok**
- **Maven** como gestor de dependencias
- Arquitectura por capas: `controller → facade → service → repository` con DTOs y mappers

### Frontend
- **React 19 + TypeScript**
- **Vite** como build tool
- **React Router DOM** para la navegación
- **React Hook Form** para el manejo de formularios
- **Tailwind CSS 4** para los estilos
- **Framer Motion** para animaciones
- **Lucide React** para los iconos SVG
- Estilo visual oscuro, *industrial/automotor* (rojo + carbono)

### Herramientas y DevOps
- **Git / GitHub** — control de versiones (rama principal + ramas + Pull Requests)
- **Jira** — gestión del backlog e historias de usuario
- **Cypress** — pruebas End-to-End (E2E)
- **Docker** — contenerización del backend
- **Vercel** — despliegue del frontend
- **Render** — despliegue del backend · **Aiven** — base de datos MySQL gestionada

---

## 📱 Pantallas (Frontend — Responsive)

| Pantalla / Componente        | Funcionalidad                                                        |
|------------------------------|---------------------------------------------------------------------|
| Landing / Home               | Página pública con hero, servicios y CTA hacia el registro.         |
| Navegación (Header/Footer)   | Cabecera con logo y accesos, presente en todas las páginas.         |
| Registro de Usuario          | Registro de nuevos clientes.                                        |
| Inicio de Sesión             | Autenticación del usuario (rutas protegidas).                       |
| Perfil                       | Ver y editar los datos del cliente.                                 |
| Registro de Vehículo         | Registrar un nuevo vehículo del cliente.                            |
| Lista de Vehículos           | Listar, editar y eliminar los vehículos del cliente.               |
| Catálogo de Servicios        | Servicios del taller con precio.                                    |
| Catálogo de Repuestos        | Listado y detalle de repuestos disponibles.                         |
| Carrito                      | Agregar repuestos y gestionar la compra.                            |
| Agendar Cita                 | Crear una cita (servicio + vehículo + fecha + problema).            |
| Lista de Citas               | Listar y filtrar las citas del cliente por estado.                  |
| Detalle / Seguimiento de Cita| Ver el progreso de la orden de trabajo y **cancelar la cita**.      |

---

## 🚀 Cómo ejecutar el proyecto

### Requisitos previos
- Java 17+
- Node.js 18+
- MySQL en ejecución

### Backend
```bash
cd repuestos-api
./mvnw spring-boot:run
```
El backend se levanta en `http://localhost:8080`.
Configura tus credenciales de base de datos en `repuestos-api/src/main/resources/application-local.properties`.

### Frontend
```bash
cd frontend
npm install
npm run dev
```
El frontend se levanta en `http://localhost:5173`.

---

## ✅ Pruebas E2E (Cypress)

```bash
cd frontend
npx cypress open    # modo interactivo
npx cypress run     # modo headless
```

Suites implementadas, cada una validando un flujo completo de la aplicación:

- `landing.cy.ts` — carga de la página pública y catálogo de servicios.
- `login.cy.ts` — inicio de sesión.
- `register.cy.ts` — registro de nuevos usuarios.
- `navigation.cy.ts` — navegación entre las pantallas principales.
- `protected-routes.cy.ts` — control de acceso a rutas protegidas.

---

## 🔗 Enlaces

- **Aplicación en producción (Vercel):** https://repuestos-zamora-website.vercel.app
- **API en producción (Render):** https://repuestoszamora-website.onrender.com

> ⚠️ El backend está en el plan gratuito de Render: tras un periodo de inactividad el primer request puede tardar **30–50 s** (cold start).

---

## 👥 Integrantes

- Diego Zamora Arce
- Rafael Porras Rakow
- Jered Arias Ávila
- Valeria Sanchez Roldán

---

© 2026 Repuestos Zamora · Aplicación Web. Todos los derechos reservados.
