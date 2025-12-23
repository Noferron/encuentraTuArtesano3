import 'dotenv';
import express from 'express';
import cors from 'cors';
//import pool from './config/db.js';

import artesanosRoutes from './routes/artesano.routes.js';
import productosRoutes from './routes/producto.routes.js';
import authRoutes from './routes/auth.routes.js';
import presentacionesRoutes from './routes/presentaciones.routes.js';

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());


// Middleware de logging para desarrollo
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// Ruta raíz de prueba
app.get('/', (req, res) => {
  res.send('API Node + MySQL - Bloque 3');
});

//Rutas
app.use("/api/artesanos",artesanosRoutes);
app.use("/api/presentaciones", presentacionesRoutes);
app.use("/api/productos", productosRoutes );
app.use('/api/auth', authRoutes);



// Arrancar el servidor
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});