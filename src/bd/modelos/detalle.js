import mongoose, { Schema } from "mongoose";
import { Pedido } from "./pedido";

const detalleSchema = new Schema(
  {
    pedido: { type: Pedido, required: true },
    sabor: {type: String, required:true},
    cantidad: {type:Number, required:true, default:1},
    precio: { type: Number, required: true },
  },
  { timestamps: true },
);

export const Detalle = mongoose.model("detalle", detalleSchema);
