// routes/auth.routes.js
import { Router } from 'express';
import * as authController from '../controllers/usuario.cotroller.js';

const router = Router();

/**
 * ==========================================
 * 🔐 RUTAS DE AUTENTICACIÓN
 * ==========================================
 */

// Registrar usuario
router.post('/register', authController.register);

// Login usuario
router.post('/login', authController.login);

export default router;