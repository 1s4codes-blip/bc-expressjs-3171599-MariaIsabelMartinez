import mongoose, { Document, Schema } from 'mongoose';

// Tipo para los items dentro de un envío
export interface IShipmentItem {
  product: mongoose.Types.ObjectId;
  quantity: number;
}

// Interfaz del documento Shipment para TypeScript
export interface IShipment extends Document {
  trackingNumber: string;
  supplier: mongoose.Types.ObjectId;
  items: IShipmentItem[];
  status: 'pending' | 'in_transit' | 'arrived' | 'customs_held' | 'cleared';
  estimatedArrival: Date;
  actualArrival?: Date;
  notes?: string;
  createdBy: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const shipmentItemSchema = new Schema<IShipmentItem>(
  {
    product: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: [1, 'La cantidad mínima es 1'],
    },
  },
  { _id: false }
);

const shipmentSchema = new Schema<IShipment>(
  {
    trackingNumber: {
      type: String,
      required: [true, 'El número de seguimiento es requerido'],
      unique: true,
      trim: true,
    },
    supplier: {
      type: Schema.Types.ObjectId,
      ref: 'Supplier',
      required: [true, 'El proveedor es requerido'],
    },
    items: {
      type: [shipmentItemSchema],
      validate: {
        validator: (items: IShipmentItem[]) => items.length > 0,
        message: 'Debe haber al menos un producto en el envío',
      },
    },
    status: {
      type: String,
      enum: ['pending', 'in_transit', 'arrived', 'customs_held', 'cleared'],
      default: 'pending',
    },
    estimatedArrival: {
      type: Date,
      required: [true, 'La fecha estimada de llegada es requerida'],
    },
    actualArrival: {
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

export const ShipmentModel = mongoose.model<IShipment>('Shipment', shipmentSchema);
