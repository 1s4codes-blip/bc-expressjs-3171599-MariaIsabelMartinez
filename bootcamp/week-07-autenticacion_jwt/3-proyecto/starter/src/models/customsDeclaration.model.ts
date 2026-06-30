import mongoose, { Document, Schema } from 'mongoose';

// Interfaz del documento CustomsDeclaration para TypeScript
export interface ICustomsDeclaration extends Document {
  shipment: mongoose.Types.ObjectId;
  declarationNumber: string;
  status: 'pending' | 'approved' | 'rejected';
  declaredValue: number;
  taxes: number;
  customsOfficer?: string;
  clearanceDate?: Date;
  notes?: string;
  createdBy: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const customsDeclarationSchema = new Schema<ICustomsDeclaration>(
  {
    shipment: {
      type: Schema.Types.ObjectId,
      ref: 'Shipment',
      required: [true, 'El envío es requerido'],
      unique: true,
    },
    declarationNumber: {
      type: String,
      required: [true, 'El número de declaración es requerido'],
      unique: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending',
    },
    declaredValue: {
      type: Number,
      required: [true, 'El valor declarado es requerido'],
      min: [0.01, 'El valor debe ser mayor a 0'],
    },
    taxes: {
      type: Number,
      default: 0,
      min: [0, 'Los impuestos no pueden ser negativos'],
    },
    customsOfficer: {
      type: String,
      trim: true,
    },
    clearanceDate: {
      type: Date,
    },
    notes: {
      type: String,
      trim: true,
      maxlength: [1000, 'Máximo 1000 caracteres'],
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

export const CustomsDeclarationModel = mongoose.model<ICustomsDeclaration>(
  'CustomsDeclaration',
  customsDeclarationSchema
);
