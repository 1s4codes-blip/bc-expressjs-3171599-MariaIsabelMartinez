# Proyecto Semanal: API de Importación con Autenticación JWT

## Objetivo

Sistema de autenticación completo con **bcrypt**, **JWT access/refresh tokens** y **cookies HttpOnly**, aplicado al dominio de una **Empresa de Importación**. La API protege 4 recursos del dominio con rutas privadas.

---

## Dominio: Empresa de Importación

| Entidad | Descripción |
|---------|-------------|
| **Suppliers** | Proveedores internacionales (nombre, contacto, país, email) |
| **Products** | Productos importados (SKU, nombre, categoría, precio, proveedor) |
| **Shipments** | Envíos internacionales (tracking, proveedor, productos, estado) |
| **CustomsDeclarations** | Declaraciones aduaneras (envío, valor declarado, impuestos, estado) |

### Roles del sistema

| Rol | Permisos |
|-----|----------|
| `admin` | Acceso total a todas las entidades |
| `agent` | Gestión de proveedores y productos |
| `manager` | Gestión de envíos y declaraciones aduaneras |

---

## Endpoints

### Autenticación

| Método | Ruta | Descripción | Auth |
|--------|------|-------------|------|
| `POST` | `/api/v1/auth/register` | Registrar usuario | No |
| `POST` | `/api/v1/auth/login` | Iniciar sesión | No |
| `GET` | `/api/v1/auth/me` | Perfil del usuario autenticado | Sí |
| `POST` | `/api/v1/auth/refresh` | Renovar tokens | No (usa cookie) |
| `POST` | `/api/v1/auth/logout` | Cerrar sesión | Sí |

### Proveedores (Suppliers)

| Método | Ruta | Descripción |
|--------|------|-------------|
| `GET` | `/api/v1/suppliers` | Listar todos los proveedores |
| `GET` | `/api/v1/suppliers/:id` | Obtener proveedor por ID |
| `POST` | `/api/v1/suppliers` | Crear nuevo proveedor |
| `PATCH` | `/api/v1/suppliers/:id` | Actualizar proveedor |
| `DELETE` | `/api/v1/suppliers/:id` | Eliminar proveedor |

### Productos (Products)

| Método | Ruta | Descripción |
|--------|------|-------------|
| `GET` | `/api/v1/products` | Listar todos los productos |
| `GET` | `/api/v1/products/:id` | Obtener producto por ID |
| `POST` | `/api/v1/products` | Crear nuevo producto |
| `PATCH` | `/api/v1/products/:id` | Actualizar producto |
| `DELETE` | `/api/v1/products/:id` | Eliminar producto |

### Envíos (Shipments)

| Método | Ruta | Descripción |
|--------|------|-------------|
| `GET` | `/api/v1/shipments` | Listar todos los envíos |
| `GET` | `/api/v1/shipments/:id` | Obtener envío por ID |
| `POST` | `/api/v1/shipments` | Crear nuevo envío |
| `PATCH` | `/api/v1/shipments/:id` | Actualizar envío |
| `DELETE` | `/api/v1/shipments/:id` | Eliminar envío |

### Declaraciones Aduaneras (Customs Declarations)

| Método | Ruta | Descripción |
|--------|------|-------------|
| `GET` | `/api/v1/customs-declarations` | Listar todas las declaraciones |
| `GET` | `/api/v1/customs-declarations/:id` | Obtener declaración por ID |
| `POST` | `/api/v1/customs-declarations` | Crear nueva declaración |
| `PATCH` | `/api/v1/customs-declarations/:id` | Actualizar declaración |
| `DELETE` | `/api/v1/customs-declarations/:id` | Eliminar declaración |

---

## Modelo de datos

### Supplier
| Campo | Tipo | Descripción |
|-------|------|-------------|
| name | String | Nombre del proveedor |
| contactPerson | String | Persona de contacto |
| email | String (unique) | Email corporativo |
| phone | String (opcional) | Teléfono |
| address | String (opcional) | Dirección |
| country | String | País de origen |
| active | Boolean | Estado operativo |
| createdBy | ObjectId (User) | Usuario que registró |

### Product
| Campo | Tipo | Descripción |
|-------|------|-------------|
| name | String | Nombre del producto |
| sku | String (unique) | Código de inventario |
| description | String (opcional) | Descripción |
| category | String | Categoría del producto |
| unitPrice | Number | Precio unitario USD |
| supplier | ObjectId (Supplier) | Proveedor |
| createdBy | ObjectId (User) | Usuario que registró |

### Shipment
| Campo | Tipo | Descripción |
|-------|------|-------------|
| trackingNumber | String (unique) | Número de seguimiento |
| supplier | ObjectId (Supplier) | Proveedor del envío |
| items | Array[{product, quantity}] | Productos y cantidades |
| status | Enum | pending, in_transit, arrived, customs_held, cleared |
| estimatedArrival | Date | Fecha estimada de llegada |
| actualArrival | Date (opcional) | Fecha real de llegada |
| notes | String (opcional) | Notas del envío |
| createdBy | ObjectId (User) | Usuario que registró |

### CustomsDeclaration
| Campo | Tipo | Descripción |
|-------|------|-------------|
| shipment | ObjectId (Shipment, unique) | Envío asociado |
| declarationNumber | String (unique) | Número de declaración |
| status | Enum | pending, approved, rejected |
| declaredValue | Number | Valor declarado USD |
| taxes | Number | Impuestos calculados |
| customsOfficer | String (opcional) | Oficial de aduana |
| clearanceDate | Date (opcional) | Fecha de despacho |
| notes | String (opcional) | Notas adicionales |
| createdBy | ObjectId (User) | Usuario que registró |

---

## Instrucciones de uso

```bash
# 1. Instalar dependencias
cd starter
pnpm install

# 2. Configurar variables de entorno
cp .env.example .env
# Editar JWT_ACCESS_SECRET y JWT_REFRESH_SECRET con valores seguros
# openssl rand -base64 64

# 3. Iniciar MongoDB
docker compose up -d

# 4. Iniciar servidor
pnpm dev
```

### Flujo de prueba recomendado

1. **Registrar usuario** → `POST /api/v1/auth/register`
2. **Iniciar sesión** → `POST /api/v1/auth/login` (recibir cookies HttpOnly)
3. **Crear proveedor** → `POST /api/v1/suppliers`
4. **Crear producto** → `POST /api/v1/products`
5. **Crear envío** → `POST /api/v1/shipments`
6. **Crear declaración aduanera** → `POST /api/v1/customs-declarations`
7. **Refrescar tokens** → `POST /api/v1/auth/refresh`
8. **Cerrar sesión** → `POST /api/v1/auth/logout`

---

## Seguridad

- Contraseñas hasheadas con bcrypt (salt rounds 10)
- JWT access token (15 min) y refresh token (7 días) con secretos distintos
- Tokens en cookies HttpOnly, Secure y SameSite
- Refresh token hasheado en base de datos
- Rotación de refresh token en cada renovación
- Sin secrets hardcodeados (solo en .env)
- Mensajes de error genéricos para evitar user enumeration

---

## Estructura del código

```
starter/src/
├── app.ts
├── server.ts
├── lib/mongoose.ts
├── errors/AppError.ts
├── types/express.d.ts
├── utils/jwt.ts
├── middlewares/
│   ├── auth.middleware.ts
│   ├── errorHandler.ts
│   └── notFound.ts
├── models/
│   ├── user.model.ts
│   ├── supplier.model.ts
│   ├── product.model.ts
│   ├── shipment.model.ts
│   └── customsDeclaration.model.ts
├── schemas/
│   ├── auth.schema.ts
│   ├── supplier.schema.ts
│   ├── product.schema.ts
│   ├── shipment.schema.ts
│   └── customsDeclaration.schema.ts
├── repositories/
│   ├── users.repository.ts
│   ├── supplier.repository.ts
│   ├── product.repository.ts
│   ├── shipment.repository.ts
│   └── customsDeclaration.repository.ts
├── services/
│   ├── auth.service.ts
│   ├── supplier.service.ts
│   ├── product.service.ts
│   ├── shipment.service.ts
│   └── customsDeclaration.service.ts
├── controllers/
│   ├── auth.controller.ts
│   ├── supplier.controller.ts
│   ├── product.controller.ts
│   ├── shipment.controller.ts
│   └── customsDeclaration.controller.ts
└── routes/
    ├── auth.routes.ts
    ├── supplier.routes.ts
    ├── product.routes.ts
    ├── shipment.routes.ts
    └── customsDeclaration.routes.ts
```
