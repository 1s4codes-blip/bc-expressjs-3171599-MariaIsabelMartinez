# Proyecto Semana 06 — API de Importación con MongoDB + Mongoose

## Dominio: Empresa de Importación

API REST para la gestión de una empresa de importación. Permite administrar **proveedores (suppliers)** y **productos importados (products)** con relaciones referenciadas y `populate()`.

---

## Entidades

### Supplier (Proveedor) — Entidad Secundaria

| Campo          | Tipo   | Validación             |
|----------------|--------|------------------------|
| name           | String | requerido, único, trim, max 100 |
| contactPerson  | String | requerido, trim, max 100       |
| phone          | String | requerido, trim, max 20        |
| email          | String | requerido, email válido        |
| address        | String | requerido, trim, max 200       |
| country        | String | requerido, trim, max 100       |

### Product (Producto Importado) — Entidad Principal

| Campo         | Tipo     | Validación                    |
|---------------|----------|-------------------------------|
| name          | String   | requerido, trim, max 150      |
| sku           | String   | requerido, único, uppercase   |
| description   | String   | opcional, max 500             |
| purchasePrice | Number   | requerido, min 0              |
| salePrice     | Number   | requerido, min 0              |
| stock         | Number   | requerido, min 0, default 0   |
| category      | String   | requerido, trim, max 100      |
| originCountry | String   | requerido, trim, max 100      |
| supplier      | ObjectId | ref: 'Supplier', requerido    |
| active        | Boolean  | default true                  |

---

## Endpoints

### Suppliers (`/api/v1/suppliers`)

| Método | Ruta              | Descripción              | Códigos de respuesta       |
|--------|-------------------|--------------------------|----------------------------|
| GET    | `/api/v1/suppliers`     | Listar todos los proveedores      | 200 |
| GET    | `/api/v1/suppliers/:id` | Obtener proveedor por ID          | 200, 400, 404 |
| POST   | `/api/v1/suppliers`     | Crear un proveedor                | 201, 409 |
| PUT    | `/api/v1/suppliers/:id` | Actualizar un proveedor           | 200, 400, 404, 409 |
| DELETE | `/api/v1/suppliers/:id` | Eliminar un proveedor             | 204, 400, 404 |

### Products (`/api/v1/products`)

| Método | Ruta              | Descripción              | Códigos de respuesta       |
|--------|-------------------|--------------------------|----------------------------|
| GET    | `/api/v1/products`     | Listar productos con paginación y populate | 200 |
| GET    | `/api/v1/products/:id` | Obtener producto con populate              | 200, 400, 404 |
| POST   | `/api/v1/products`     | Crear un producto                  | 201, 400, 409 |
| PUT    | `/api/v1/products/:id` | Actualizar un producto             | 200, 400, 404, 409 |
| DELETE | `/api/v1/products/:id` | Eliminar un producto               | 204, 400, 404 |

### Paginación

```
GET /api/v1/products?page=1&limit=10&search=laptop
```

Respuesta:
```json
{
  "data": [...],
  "total": 25,
  "page": 1,
  "totalPages": 3
}
```

---

## Manejo de Errores

| Condición                     | Código | Descripción                |
|-------------------------------|--------|----------------------------|
| CastError (ID inválido)       | 400    | Bad Request                |
| Documento no encontrado       | 404    | Not Found                  |
| Violación de índice unique    | 409    | Conflict                   |
| Error interno                 | 500    | Internal Server Error      |

---

## Seed

El seed inserta 3 proveedores y 6 productos con datos coherentes del dominio de importación.

```bash
pnpm seed
```

---

## Tecnologías

- Node.js 22 + Express 5.1
- TypeScript 5.8
- Mongoose 9.4 + MongoDB 7 (Docker)
- Zod 4.3
