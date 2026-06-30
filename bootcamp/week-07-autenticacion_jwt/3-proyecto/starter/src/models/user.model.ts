import mongoose, { Document, Schema } from 'mongoose';

// ============================================
// MODELO DE USUARIO — Empresa de Importación
// ============================================
// Roles del sistema:
//   admin   — acceso total a todas las entidades
//   agent   — agente de compras, gestiona proveedores y productos
//   manager — gerente de logística, gestiona envíos y aduana
// ============================================

export interface IUser extends Document {
  email: string;
  password: string;
  name: string;
  role: 'admin' | 'agent' | 'manager';
  refreshToken?: string;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: [true, 'El email es requerido'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, 'La contraseña es requerida'],
      select: false, // nunca se devuelve en queries por defecto
    },
    name: {
      type: String,
      required: [true, 'El nombre es requerido'],
      trim: true,
    },
    role: {
      type: String,
      enum: ['admin', 'agent', 'manager'],
      default: 'agent',
    },
    refreshToken: {
      type: String,
      select: false, // nunca se devuelve por defecto
    },
  },
  { timestamps: true }
);

export const UserModel = mongoose.model<IUser>('User', userSchema);
