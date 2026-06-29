import { Schema, model } from 'mongoose';

interface ISupplier {
  name: string;
  contactPerson: string;
  phone: string;
  email: string;
  address: string;
  country: string;
}

const supplierSchema = new Schema<ISupplier>(
  {
    name: {
      type: String,
      required: [true, 'El nombre del proveedor es requerido'],
      trim: true,
      maxlength: [100, 'El nombre no puede superar 100 caracteres'],
      unique: true,
    },
    contactPerson: {
      type: String,
      required: [true, 'La persona de contacto es requerida'],
      trim: true,
      maxlength: 100,
    },
    phone: {
      type: String,
      required: [true, 'El teléfono es requerido'],
      trim: true,
      maxlength: 20,
    },
    email: {
      type: String,
      required: [true, 'El email es requerido'],
      trim: true,
      lowercase: true,
      maxlength: 100,
    },
    address: {
      type: String,
      required: [true, 'La dirección es requerida'],
      trim: true,
      maxlength: 200,
    },
    country: {
      type: String,
      required: [true, 'El país es requerido'],
      trim: true,
      maxlength: 100,
    },
  },
  { timestamps: true },
);

export const Supplier = model<ISupplier>('Supplier', supplierSchema);
