import mongoose, { Document, Schema } from 'mongoose';

// Interfaz del documento Product para TypeScript
export interface IProduct extends Document {
  name: string;
  sku: string;
  description?: string;
  category: string;
  unitPrice: number;
  supplier: mongoose.Types.ObjectId;
  createdBy: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const productSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: [true, 'El nombre del producto es requerido'],
      trim: true,
      minlength: [2, 'Mínimo 2 caracteres'],
      maxlength: [120, 'Máximo 120 caracteres'],
    },
    sku: {
      type: String,
      required: [true, 'El SKU es requerido'],
      unique: true,
      uppercase: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
      maxlength: [500, 'Máximo 500 caracteres'],
    },
    category: {
      type: String,
      required: [true, 'La categoría es requerida'],
      trim: true,
    },
    unitPrice: {
      type: Number,
      required: [true, 'El precio unitario es requerido'],
      min: [0.01, 'El precio debe ser mayor a 0'],
    },
    supplier: {
      type: Schema.Types.ObjectId,
      ref: 'Supplier',
      required: [true, 'El proveedor es requerido'],
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

export const ProductModel = mongoose.model<IProduct>('Product', productSchema);
