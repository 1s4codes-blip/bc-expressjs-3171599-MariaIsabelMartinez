import mongoose, { Document, Schema } from 'mongoose';

// Interfaz del documento Supplier para TypeScript
export interface ISupplier extends Document {
  name: string;
  contactPerson: string;
  email: string;
  phone?: string;
  address?: string;
  country: string;
  active: boolean;
  createdBy: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const supplierSchema = new Schema<ISupplier>(
  {
    name: {
      type: String,
      required: [true, 'El nombre del proveedor es requerido'],
      trim: true,
      minlength: [2, 'Mínimo 2 caracteres'],
      maxlength: [100, 'Máximo 100 caracteres'],
    },
    contactPerson: {
      type: String,
      required: [true, 'El nombre del contacto es requerido'],
      trim: true,
      minlength: [2, 'Mínimo 2 caracteres'],
      maxlength: [80, 'Máximo 80 caracteres'],
    },
    email: {
      type: String,
      required: [true, 'El email del proveedor es requerido'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    phone: {
      type: String,
      trim: true,
    },
    address: {
      type: String,
      trim: true,
    },
    country: {
      type: String,
      required: [true, 'El país de origen es requerido'],
      trim: true,
    },
    active: {
      type: Boolean,
      default: true,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

export const SupplierModel = mongoose.model<ISupplier>('Supplier', supplierSchema);
