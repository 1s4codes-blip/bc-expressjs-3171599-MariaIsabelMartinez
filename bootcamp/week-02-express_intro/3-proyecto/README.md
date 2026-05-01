# Proyecto Semana 02 — API REST: Empresa de Importación

## Dominio
**Recurso principal**: Suppliers (Proveedores)

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id` | `number` | Identificador autoincremental |
| `name` | `string` | Nombre del proveedor |
| `country` | `string` | País de origen |
| `contactEmail` | `string` | Correo de contacto |
| `phone` | `string` | Teléfono de contacto |
| `active` | `boolean` | Estado del proveedor |

---

## Endpoints

| Método | Ruta | Status |
|--------|------|--------|
| GET | `/api/v1/suppliers` | 200 |
| GET | `/api/v1/suppliers/:id` | 200 / 404 |
| POST | `/api/v1/suppliers` | 201 |
| PUT | `/api/v1/suppliers/:id` | 200 / 404 |
| DELETE | `/api/v1/suppliers/:id` | 204 / 404 |

---

## Cómo ejecutar

```bash
pnpm install
pnpm run dev
```

Servidor disponible en `http://localhost:3000`.

---

## Decisiones de diseño

- Store en memoria con array (sin base de datos)
- `strict: true` con tipos explícitos en todos los handlers
- `UpdateSupplierDto` usa `Partial` para actualizaciones parciales
- Graceful shutdown con `SIGTERM` y `SIGINT`
- Gestor de paquetes: `pnpm`