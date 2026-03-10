# Backend Pedidos

API REST para la gestión de pedidos, construida con Node.js, Express y MongoDB.

---

## Tecnologías

- Node.js
- Express
- MongoDB + Mongoose
- Jest (pruebas automatizadas)

---

## Instalación

```bash
npm install
npm run dev
```

El servidor corre en `http://localhost:3001`

---

## Modelo de Pedido

| Campo            | Tipo     | Requerido | Descripción                        |
|------------------|----------|-----------|------------------------------------|
| `nombre`         | String   | Sí        | Nombre del cliente                 |
| `telefono`       | String   | Sí        | Teléfono del cliente (10 dígitos)  |
| `fecha_solicitud`| Date     | Sí        | Fecha en que se solicitó el pedido |
| `fecha_envio`    | Date     | Sí        | Fecha de entrega del pedido        |
| `total`          | Number   | No        | Total del pedido (default: 0.0)    |
| `pagado`         | [String] | No        | Métodos de pago utilizados         |
| `abono`          | Number   | No        | Monto abonado                      |
| `comentario`     | String   | No        | Comentarios adicionales            |

---

## Endpoints

### Crear un pedido
**POST** `/api/v1/pedidos`

**Body (JSON):**
```json
{
  "nombre": "Pedro Uriel",
  "telefono": "4151775265",
  "fecha_solicitud": "2026-03-09",
  "fecha_envio": "2026-03-15",
  "total": 350.00,
  "pagado": ["tranferencia"],
  "abono": 100,
  "comentario": "Con azúcar"
}
```

<img width="600" src="https://github.com/user-attachments/assets/ef5929c8-52c7-4d16-8c09-023cbf35e8e1" />

---

### Listar todos los pedidos
**GET** `/api/v1/pedidos`

**Query params opcionales:**
| Parámetro  | Descripción                                  | Ejemplo           |
|------------|----------------------------------------------|-------------------|
| `sortBy`   | Campo por el que ordenar                     | `sortBy=total`    |
| `sortOrder`| Dirección del orden (`ascending`/`descending`)| `sortOrder=ascending` |
| `nombre`   | Filtrar por nombre del cliente               | `nombre=Juan`     |
| `pagado`   | Filtrar por método de pago                   | `pagado=efectivo` |

> No se puede usar `nombre` y `pagado` al mismo tiempo.

<img width="600" src="https://github.com/user-attachments/assets/3ddde9a5-ce5e-44f6-bf11-84ace3c804d9" />

---

### Listar pedidos filtrados por nombre
**GET** `/api/v1/pedidos?nombre=Pedro Uriel`

<img width="600" src="https://github.com/user-attachments/assets/47e7ae5c-1d8a-480e-b2df-2125b7cf1c6e" />

---

### Listar pedidos filtrados por método de pago
**GET** `/api/v1/pedidos?pagado=efectivo`

<img width="600" src="https://github.com/user-attachments/assets/35a6d1ef-e6d4-42cf-a1c6-77bef818f750" />

---

### Obtener un pedido por ID
**GET** `/api/v1/pedidos/:id`

```
GET http://localhost:3001/api/v1/pedidos/69af7a305845a0405abd0e83
```

**Respuestas:**
- `200` — Pedido encontrado
- `400` — ID inválido
- `404` — Pedido no encontrado

<img width="600" src="https://github.com/user-attachments/assets/a179d7f8-5c6f-47b4-9c9b-0798a2489687" />

---

### Modificar un pedido
**PATCH** `/api/v1/pedidos/:id`

**Body (JSON) — solo los campos a modificar:**
```json
{
  "total": 500.00,
  "pagado": ["efectivo", "transferencia"]
}
```

**Respuestas:**
- `200` — Pedido actualizado
- `400` — ID inválido

<img width="600" src="https://github.com/user-attachments/assets/941d5e8c-9443-4355-a10a-1cbd33e43cf2" />

---

### Eliminar un pedido
**DELETE** `/api/v1/pedidos/:id`

```
DELETE http://localhost:3001/api/v1/pedidos/69af7df15845a0405abd0e8f
```

**Respuestas:**
- `204` — Eliminado correctamente
- `404` — Pedido no encontrado

<img width="600" src="https://github.com/user-attachments/assets/10bad19a-d2fa-47f1-ba13-4c4b800d00d2" />

---

