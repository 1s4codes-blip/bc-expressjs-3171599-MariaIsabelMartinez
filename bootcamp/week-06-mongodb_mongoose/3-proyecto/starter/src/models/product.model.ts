import { Schema, model, Types } from 'mongoose';

interface IProduct {
  name: string;
  sku: string;
  description?: string;
  purchasePrice: number;
  salePrice: number;
  stock: number;
  category: string;
  originCountry: string;
  supplier: Types.ObjectId;
  active: boolean;
}

const productSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: [true, 'El nombre del producto es requerido'],
      trim: true,
      maxlength: [150, 'El nombre no puede superar 150 caracteres'],
    },
    sku: {
      type: String,
      required: [true, 'El SKU es requerido'],
      unique: true,
      uppercase: true,
      trim: true,
      maxlength: 50,
    },
    description: {
      type: String,
      maxlength: 500,
      trim: true,
    },
    purchasePrice: {
      type: Number,
      required: [true, 'El precio de compra es requerido'],
      min: [0, 'El precio no puede ser negativo'],
    },
    salePrice: {
      type: Number,
      required: [true, 'El precio de venta es requerido'],
      min: [0, 'El precio no puede ser negativo'],
    },
    stock: {
      type: Number,
      required: [true, 'El stock es requerido'],
      min: [0, 'El stock no puede ser negativo'],
      default: 0,
    },
    category: {
      type: String,
      required: [true, 'La categoría es requerida'],
      trim: true,
      maxlength: 100,
    },
    originCountry: {
      type: String,
      required: [true, 'El país de origen es requerido'],
      trim: true,
      maxlength: 100,
    },
    supplier: {
      type: Schema.Types.ObjectId,
      ref: 'Supplier',
      required: [true, 'El proveedor es requerido'],
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

export const Product = model<IProduct>('Product', productSchema);
