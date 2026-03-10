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

![Crear pedido](docs/img/post-pedido.png)

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

![Listar pedidos](docs/img/get-pedidos.png)

---

### Listar pedidos filtrados por nombre
**GET** `/api/v1/pedidos?nombre=Juan`

![Filtrar por nombre](docs/img/get-pedidos-nombre.png)

---

### Listar pedidos filtrados por método de pago
**GET** `/api/v1/pedidos?pagado=efectivo`

![Filtrar por pagado](docs/img/get-pedidos-pagado.png)

---

### Obtener un pedido por ID
**GET** `/api/v1/pedidos/:id`

```
GET http://localhost:3001/api/v1/pedidos/64f1a2b3c4d5e6f7a8b9c0d1
```

**Respuestas:**
- `200` — Pedido encontrado
- `400` — ID inválido
- `404` — Pedido no encontrado

![Obtener pedido por ID](docs/img/get-pedido-id.png)

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

![Modificar pedido](docs/img/patch-pedido.png)

---

### Eliminar un pedido
**DELETE** `/api/v1/pedidos/:id`

```
DELETE http://localhost:3001/api/v1/pedidos/64f1a2b3c4d5e6f7a8b9c0d1
```

**Respuestas:**
- `204` — Eliminado correctamente
- `404` — Pedido no encontrado

![Eliminar pedido](docs/img/delete-pedido.png)

---

## Pruebas automatizadas

```bash
npm test
```

![Pruebas Jest](docs/img/jest-tests.png)
