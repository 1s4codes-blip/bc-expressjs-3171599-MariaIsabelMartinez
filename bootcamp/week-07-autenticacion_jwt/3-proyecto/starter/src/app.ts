import express from 'express';
import cookieParser from 'cookie-parser';
import authRouter from './routes/auth.routes';
import supplierRouter from './routes/supplier.routes';
import productRouter from './routes/product.routes';
import shipmentRouter from './routes/shipment.routes';
import customsDeclarationRouter from './routes/customsDeclaration.routes';
import { errorHandler } from './middlewares/errorHandler';
import { notFound } from './middlewares/notFound';

export const app = express();

app.use(express.json());
app.use(cookieParser());

// Rutas de autenticación
app.use('/api/v1/auth', authRouter);

// Rutas del dominio de importación
app.use('/api/v1/suppliers', supplierRouter);
app.use('/api/v1/products', productRouter);
app.use('/api/v1/shipments', shipmentRouter);
app.use('/api/v1/customs-declarations', customsDeclarationRouter);

// Middlewares de errores (siempre al final)
app.use(notFound);
app.use(errorHandler);
