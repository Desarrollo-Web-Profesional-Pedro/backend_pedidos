import mongoose from "mongoose";
import { describe, expect, test, beforeEach } from "@jest/globals";

import {
  creaPedido,
  listaPedidos,
  listaAllPedidos,
  listaPedidosByNombre,
  listPedidosByPagado,
  getPedidoById,
  modificaPedido,
  eliminaPedido,
} from "../servicios/pedidos.js";
import { Pedido } from "../bd/modelos/pedido.js";

/**
 * Pruebas unitarias para las operaciones CRUD de pedidos utilizando Jest y Mongoose.
 * Estas pruebas verifican la creación, lectura, actualización y eliminación de pedidos en la base de datos.
 * Se utilizan ejemplos de pedidos para validar el correcto funcionamiento de las funciones del servicio de pedidos.
 */
describe("Creando Pedidos", () => {
  // Prueba para verificar que la creación de un pedido con todos los parámetros es exitosa.
  test("Con todos los parámetros será exitoso", async () => {
    const pedidoData = {
      nombre: "Juan Gabriel Lopez",
      telefono: "4181231234",
      fecha_solicitud: "07/02/2026",
      fecha_envio: "09/02/2026",
      total: 45.0,
      pagado: "PAGADO",
      abono: 45.0,
      comentario: "Ha sido pagado el pedido",
    };
    const createdPedido = await creaPedido(pedidoData);
    expect(createdPedido._id).toBeInstanceOf(mongoose.Types.ObjectId);
    const foundPedido = await Pedido.findById(createdPedido._id);
    expect(foundPedido.nombre).toEqual(pedidoData.nombre);
    expect(foundPedido.createdAt).toBeInstanceOf(Date);
    expect(foundPedido.updatedAt).toBeInstanceOf(Date);
  });

  // Prueba para verificar que la creación de un pedido sin el nombre requerido falla con un error de validación.
  test("Sin nombre debe fallar", async () => {
    const pedidoData = {
      telefono: "4181231234",
      fecha_solicitud: "07/02/2026",
      fecha_envio: "09/02/2026",
      total: 45.0,
      pagado: "PAGADO",
      abono: 45.0,
      comentario: "Ha sido pagado el pedido",
    };
    try {
      await creaPedido(pedidoData);
    } catch (err) {
      expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
      expect(err.message).toContain("nombre");
    }
  });

  // Prueba para verificar que la creación de un pedido con los parámetros mínimos requeridos es exitosa.
  test("Con parámetros mínimos debe ser exitoso", async () => {
    const pedidoData = {
      nombre: "Juan Gabriel Lopez",
      telefono: "4181231234",
      fecha_solicitud: "07/02/2026",
      fecha_envio: "09/02/2026",
      total: 45.0,
    };
    const createdPedido = await creaPedido(pedidoData);
    expect(createdPedido._id).toBeInstanceOf(mongoose.Types.ObjectId);
  });
});

// Ejemplos de pedidos para las pruebas de listado, actualización y eliminación.
const ejemplosPedidos = [
  {
    nombre: "Alfredo Lima Perú",
    telefono: "4181231235",
    fecha_solicitud: "07/02/2026",
    fecha_envio: "09/02/2026",
    total: 90.0,
    pagado: "PAGADO",
    abono: 45.0,
    comentario: "Ha sido pagado el pedido",
  },
  {
    nombre: "Natalia Arévalo Sanchez",
    telefono: "4181231236",
    fecha_solicitud: "07/02/2026",
    fecha_envio: "09/02/2026",
    total: 90.0,
    pagado: "NO PAGADO",
    abono: 90.0,
    comentario: "Ha sido pagado el pedido",
  },
  {
    nombre: "Alberto Olmos Vazquez",
    telefono: "4181231237",
    fecha_solicitud: "07/02/2026",
    fecha_envio: "09/02/2026",
    total: 100.0,
    pagado: "PAGADO",
    abono: 50.0,
    comentario: "NO Ha sido pagado el pedido en su totalidad",
  },
];

// Variable para almacenar los pedidos creados durante las pruebas.
let creandoEjemplosPedidos = [];

/**
 * Función que se ejecuta antes de cada prueba para limpiar la colección de pedidos
 * y crear nuevos pedidos de ejemplo en la base de datos.
 */
beforeEach(async () => {
  await Pedido.deleteMany({});
  creandoEjemplosPedidos = [];
  for (const pedido of ejemplosPedidos) {
    const nuevoPedido = new Pedido(pedido);
    creandoEjemplosPedidos.push(await nuevoPedido.save());
  }
});

/**
 * Pruebas para el listado de pedidos
 */
describe("Listando Pedidos", () => {
  test("Debe regresar todos los pedidos", async () => {
    const pedidos = await listaAllPedidos();
    expect(pedidos.length).toEqual(creandoEjemplosPedidos.length);
  });

  test("Debe regresar pedidos ordenados por fecha de creación descendente por defecto", async () => {
    const pedidos = await listaAllPedidos();
    const sortedSamplePedidos = creandoEjemplosPedidos.sort(
      (a, b) => b.createdAt - a.createdAt,
    );
    expect(pedidos.map((pedido) => pedido.createdAt)).toEqual(
      sortedSamplePedidos.map((pedido) => pedido.createdAt),
    );
  });

  test("Debe tomar en cuenta las opciones de ordenamiento proporcionadas", async () => {
    const pedidos = await listaAllPedidos({
      sortBy: "updatedAt",
      sortOrder: "ascending",
    });
    const sortedSamplePedidos = creandoEjemplosPedidos.sort(
      (a, b) => a.updatedAt - b.updatedAt,
    );
    expect(pedidos.map((pedido) => pedido.updatedAt)).toEqual(
      sortedSamplePedidos.map((pedido) => pedido.updatedAt),
    );
  });

  test("Debe poder filtrar pedidos por nombre", async () => {
    const pedidos = await listaPedidosByNombre("Natalia Arévalo Sanchez");
    expect(pedidos.length).toBe(1);
  });

  test("Debe poder filtrar pedidos por pagado", async () => {
    const pedidos = await listPedidosByPagado("PAGADO");
    expect(pedidos.length).toBe(2);
  });
});

describe("Obteniendo un pedido", () => {
  test("Debe regresar el pedido completo", async () => {
    const pedido = await getPedidoById(creandoEjemplosPedidos[0]._id);
    expect(pedido.toObject()).toEqual(creandoEjemplosPedidos[0].toObject());
  });

  test("Debe fallar si el id no existe", async () => {
    const pedido = await getPedidoById("000000000000000000000000");
    expect(pedido).toEqual(null);
  });
});

describe("Actualizando pedidos", () => {
  test("Debe actualizar la propiedad especificada", async () => {
    await modificaPedido(creandoEjemplosPedidos[0]._id, {
      nombre: "Test Nombre",
    });
    const pedidoActualizado = await Pedido.findById(creandoEjemplosPedidos[0]._id);
    expect(pedidoActualizado.nombre).toEqual("Test Nombre");
  });

  test("No debe modificar otras propiedades", async () => {
    await modificaPedido(creandoEjemplosPedidos[0]._id, {
      nombre: "Test Nombre",
    });
    const pedidoActualizado = await Pedido.findById(creandoEjemplosPedidos[0]._id);
    expect(pedidoActualizado.telefono).toEqual(creandoEjemplosPedidos[0].telefono);
  });

  test("Debe actualizar el timestamp updatedAt", async () => {
    await modificaPedido(creandoEjemplosPedidos[0]._id, {
      nombre: "Test Nombre",
    });
    const pedidoActualizado = await Pedido.findById(creandoEjemplosPedidos[0]._id);
    expect(pedidoActualizado.updatedAt.getTime()).toBeGreaterThan(
      creandoEjemplosPedidos[0].updatedAt.getTime(),
    );
  });

  test("Debe fallar si el id no existe", async () => {
    const pedido = await modificaPedido("000000000000000000000000", {
      nombre: "Test Nombre",
    });
    expect(pedido).toEqual(null);
  });
});

describe("Eliminando pedidos", () => {
  test("Debe remover el pedido de la base de datos", async () => {
    const result = await eliminaPedido(creandoEjemplosPedidos[0]._id);
    expect(result.deletedCount).toEqual(1);
    const deletedPedido = await Pedido.findById(creandoEjemplosPedidos[0]._id);
    expect(deletedPedido).toEqual(null);
  });

  test("Debe fallar si el id no existe", async () => {
    const result = await eliminaPedido("000000000000000000000000");
    expect(result.deletedCount).toEqual(0);
  });
});
