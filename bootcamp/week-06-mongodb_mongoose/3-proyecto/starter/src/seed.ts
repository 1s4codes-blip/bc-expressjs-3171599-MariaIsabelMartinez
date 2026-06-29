import 'dotenv/config';
import { connectDB, disconnectDB } from './lib/mongoose';
import { Supplier } from './models/supplier.model';
import { Product } from './models/product.model';

async function seed(): Promise<void> {
  await connectDB();

  await Product.deleteMany({});
  await Supplier.deleteMany({});
  console.log('Colecciones limpiadas');

  const [proveedor1, proveedor2, proveedor3] = await Supplier.insertMany([
    {
      name: 'TechImport S.A.',
      contactPerson: 'Carlos Mendoza',
      phone: '+1-305-555-0100',
      email: 'carlos@techimport.com',
      address: '1250 NW 107th Ave, Miami, FL 33172',
      country: 'Estados Unidos',
    },
    {
      name: 'AsiaLogistics Co.',
      contactPerson: 'Li Wei',
      phone: '+86-21-5555-0101',
      email: 'liwei@asialogistics.cn',
      address: '300 Nanjing Road, Shanghai',
      country: 'China',
    },
    {
      name: 'EuroDistribuciones SL',
      contactPerson: 'Ana García',
      phone: '+34-93-555-0102',
      email: 'ana@eurodistribuciones.es',
      address: 'Calle de la Industria 45, Barcelona',
      country: 'España',
    },
  ]);
  console.log('Proveedores insertados');

  await Product.insertMany([
    {
      name: 'Laptop Gamer Pro X',
      sku: 'LAP-GAM-001',
      description: 'Laptop con RTX 4060, 16GB RAM, 512GB SSD',
      purchasePrice: 580000,
      salePrice: 899000,
      stock: 15,
      category: 'Electrónica',
      originCountry: 'China',
      supplier: proveedor1._id,
      active: true,
    },
    {
      name: 'Smartphone Ultra 5G',
      sku: 'SMT-ULT-001',
      description: 'Smartphone 5G con pantalla AMOLED 6.7"',
      purchasePrice: 320000,
      salePrice: 599000,
      stock: 30,
      category: 'Electrónica',
      originCountry: 'China',
      supplier: proveedor2._id,
      active: true,
    },
    {
      name: 'Aceite de Oliva Virgen Extra',
      sku: 'ACE-OLI-001',
      description: 'Aceite de oliva extra virgen 500ml, producción ecológica',
      purchasePrice: 3500,
      salePrice: 8900,
      stock: 200,
      category: 'Alimentos',
      originCountry: 'España',
      supplier: proveedor3._id,
      active: true,
    },
    {
      name: 'Vino Tinto Reserva 2019',
      sku: 'VIN-TIN-001',
      description: 'Vino tinto reserva D.O. Rioja, caja de 6 botellas',
      purchasePrice: 18000,
      salePrice: 45000,
      stock: 50,
      category: 'Bebidas',
      originCountry: 'España',
      supplier: proveedor3._id,
      active: true,
    },
    {
      name: 'Teclado Mecánico RGB',
      sku: 'TEC-MEC-001',
      description: 'Teclado mecánico inalámbrico con switches Cherry MX',
      purchasePrice: 25000,
      salePrice: 55000,
      stock: 40,
      category: 'Electrónica',
      originCountry: 'China',
      supplier: proveedor2._id,
      active: true,
    },
    {
      name: 'Monitor 27" 4K IPS',
      sku: 'MON-4K-001',
      description: 'Monitor 27 pulgadas 4K UHD, panel IPS, HDR10',
      purchasePrice: 120000,
      salePrice: 249000,
      stock: 10,
      category: 'Electrónica',
      originCountry: 'Estados Unidos',
      supplier: proveedor1._id,
      active: true,
    },
  ]);
  console.log('Productos insertados');

  console.log('Seed completado exitosamente');
  await disconnectDB();
}

seed().catch((err: unknown) => {
  console.error('Seed falló:', err);
  process.exit(1);
});
