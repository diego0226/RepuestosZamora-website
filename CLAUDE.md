# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

RepuestosZamora is a full-stack web application for an auto parts and repair shop. It has two independently runnable sub-projects:

- **`frontend/`** — React 19 + TypeScript + Vite SPA
- **`repuestos-api/`** — Spring Boot 4 REST API backed by MySQL

---

## Commands

### Frontend

```bash
cd frontend
npm install       # install dependencies
npm run dev       # start dev server (http://localhost:5173)
npm run build     # tsc + vite build
npm run lint      # eslint
npm run preview   # serve the production build locally
```

### Backend

```bash
cd repuestos-api
./mvnw spring-boot:run          # run with Maven wrapper (uses application-local.properties)
./mvnw test                     # run all tests
./mvnw test -Dtest=MyTest       # run a single test class
./mvnw package                  # build jar
```

The backend requires a local MySQL database named `repuestos_zamora` on port 3306. Credentials are read from `src/main/resources/application-local.properties` (gitignored; the committed file contains example credentials that must be updated locally).

---

## Architecture

### Backend layering

Each domain (Cliente, Cita, Vehiculo, Repuesto, Servicio, ServicioBrindado, Empleado, Auth) follows the same strict four-layer pattern:

```
Controller → Facade → Service → Repository
```

- **Controller** — thin REST adapter; maps HTTP to/from models using a Mapper
- **Facade** — orchestrates calls across services; owns `@Transactional`
- **Service** — business rules and entity manipulation; queries the repository
- **Repository** — Spring Data JPA interface

Mappers convert between the three data shapes used across layers:

| Shape | Used by |
|---|---|
| `*RequestModel` / `*ResponseModel` | Controller ↔ HTTP (JSON in/out) |
| `*RequestDto` / `*ResponseDto` | Controller → Facade → Service internal API |
| JPA Entity | Service ↔ Repository ↔ DB |

`GlobalExceptionHandler` (`@RestControllerAdvice`) centralises all HTTP error responses. All domain exceptions (e.g., `CitaNotFoundException`) are caught here and converted to a standard `ErrorDto`.

JPA uses `PhysicalNamingStrategyStandardImpl`, so `@Table(name=...)` and `@Column(name=...)` annotations are taken literally — camelCase is **not** automatically converted to snake_case.

Passwords are stored as plain text (no hashing currently implemented).

### Frontend architecture

- `AuthContext` stores the authenticated `AuthUser` in `localStorage` under key `auth_user`. All protected routes check this via `ProtectedRoute`.
- API base URL is loaded from `src/config/config.json` at build time via `src/config/index.ts`. The default is `http://localhost:8080`.
- Service files under `src/services/` make `fetch` calls directly — no HTTP client library is used.
- Models under `src/models/` define TypeScript interfaces for API responses.
- `react-hook-form` is used for form state in login/register pages.

### API endpoints (backend)

| Method | Path | Description |
|---|---|---|
| POST | `/api/auth/login` | Login with `correo` + `contrasena` |
| POST | `/api/auth/register` | Register new client |
| GET/POST/PUT/DELETE | `/api/cliente` | CRUD for clients |
| GET/POST/PUT/DELETE | `/api/vehiculo` | CRUD for vehicles |
| GET/POST/PUT/DELETE | `/api/cita` | Appointment management |
| GET/POST/PUT/DELETE | `/api/repuesto` | Spare parts |
| GET/POST/PUT/DELETE | `/api/servicio` | Services catalog |
| GET/POST/PUT/DELETE | `/api/servicioBrindado` | Rendered services (links Cita to Repuesto/Servicio) |
| GET/POST/PUT/DELETE | `/api/empleado` | Employees |
