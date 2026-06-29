# 🚀 Proyecto Semana 05 — API con PostgreSQL y Prisma ORM

## 🎯 Objetivo

Migrar la API de tu dominio asignado del almacenamiento en memoria a **PostgreSQL** usando **Prisma ORM**. La API debe tener migraciones versionadas, seed de datos iniciales y manejo correcto de errores de base de datos.

## 📋 Tu Dominio Asignado

**Import Company** — Empresa de importación que gestiona embarques internacionales y agentes aduanales.

| Recurso principal | Recurso secundario (relación) |
|-------------------|-------------------------------|
| **Shipment** (embarque) | **CustomsBroker** (agente aduanal) |

Un `CustomsBroker` puede gestionar múltiples `Shipment` (relación 1:N).

---

## ✅ Requisitos Funcionales

### 1. Schema y Migraciones

- Definir al menos **2 modelos** en `prisma/schema.prisma`:
  - Recurso principal (items de tu dominio) con mínimo 6 campos tipados
  - Recurso secundario con relación 1:N al principal
- Ejecutar migraciones con `prisma migrate dev`
- Carpeta `prisma/migrations/` versionada (no ignorada por `.gitignore`)

### 2. Seed

- `prisma/seed.ts` que carga datos demo en ambas entidades
- Debe ser idempotente (ejecutable múltiples veces sin duplicar datos)
- Mínimo 5 registros en el recurso principal

### 3. API CRUD con Prisma

Implementar los siguientes endpoints para el recurso principal:

| Método | Ruta | Descripción | Status |
|--------|------|-------------|--------|
| GET | `/api/v1/shipments` | Listado paginado | 200 |
| GET | `/api/v1/shipments/:id` | Detalle con broker | 200 / 404 |
| POST | `/api/v1/shipments` | Crear (validar con Zod) | 201 / 400 / 409 |
| PUT | `/api/v1/shipments/:id` | Actualizar | 200 / 404 |
| DELETE | `/api/v1/shipments/:id` | Eliminar | 204 / 404 |

### 4. Manejo de Errores Prisma

- `P2025` (record not found) → `AppError(404, 'Shipment not found')`
- `P2002` (unique constraint) → `AppError(409, 'Tracking number already exists')`
- Todos los errores deben pasar por el middleware `errorHandler`

### 5. Paginación

- `GET /api/v1/shipments?page=1&limit=10` debe retornar:
  ```json
  {
    "data": [...],
    "total": 25,
    "page": 1,
    "limit": 10
  }
  ```

---

## 🗂️ Estructura del Starter

```
starter/
├── package.json
├── tsconfig.json
├── .env.example
├── docker-compose.yml
├── prisma/
│   ├── schema.prisma      → modelos Shipment + CustomsBroker
│   └── seed.ts            → 2 brokers + 6 shipments
└── src/
    ├── lib/prisma.ts       → singleton PrismaClient
    ├── config/logger.ts    → Winston
    ├── errors/AppError.ts  → dado
    ├── middlewares/
    │   ├── errorHandler.ts → global error handler
    │   └── notFound.ts     → 404 handler
    ├── schemas/items.schema.ts  → Zod schema para Shipment
    ├── repositories/items.repository.ts  → CRUD + errores Prisma
    ├── services/items.service.ts         → lógica de negocio
    ├── controllers/items.controller.ts   → handlers HTTP
    ├── routes/items.routes.ts            → rutas /api/v1/shipments
    ├── app.ts             → router registrado
    └── server.ts          → logger.info
```

---

## 💡 Modelos del Dominio (Import Company)

**CustomsBroker → Shipment (1:N):**
```prisma
model CustomsBroker {
  id            Int       @id @default(autoincrement())
  companyName   String
  licenseNumber String    @unique
  contactEmail  String    @unique
  phone         String?
  country       String
  active        Boolean   @default(true)
  shipments     Shipment[]
  createdAt     DateTime  @default(now())
}

model Shipment {
  id              Int      @id @default(autoincrement())
  trackingNumber  String   @unique
  origin          String
  destination     String
  status          String   @default("PENDING")
  weight          Float
  containerCount  Int      @default(1)
  departureDate   DateTime
  arrivalDate     DateTime?
  customsBrokerId Int?
  broker          CustomsBroker? @relation(fields: [customsBrokerId], references: [id], onDelete: SetNull)
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
}
```

---

## 🛠️ Iniciar el Proyecto

```bash
# 1. Levantar PostgreSQL
docker compose up -d

# 2. Instalar dependencias
pnpm install

# 3. Copiar variables de entorno y ajustar
cp .env.example .env

# 4. Definir tus modelos en prisma/schema.prisma

# 5. Ejecutar primera migración
pnpm dlx prisma migrate dev --name init

# 6. Ejecutar seed
pnpm dlx prisma db seed

# 7. Iniciar servidor en modo desarrollo
pnpm dev
```

## 📌 Entregables

1. **Repositorio** con `prisma/migrations/` incluida
2. **README.md** del proyecto con:
   - Descripción del dominio
   - Diagrama de entidades (texto o imagen)
   - Endpoints documentados con ejemplos de request/response
3. **Screenshots** de Postman/Thunder Client mostrando los 5 endpoints
4. **Logs del seed** (`pnpm dlx prisma db seed`) adjuntos en README
