import jwt from "jsonwebtoken";

export function verificarToken(req, res, next) {
    // Leer la cabecera Authorization
    const authHeader = req.headers.authorization;

    // Verificar que la cabecera existe
  if (!authHeader) {
    return res.status(401).json({ 
      mensaje: "Falta cabecera Authorization",
      detalle: "Debes incluir 'Authorization: Bearer <token>' en la petición"
    });
  }

   // Esperamos formato: "Bearer <token_jwt>"
  const [bearer, token] = authHeader.split(" ");

  // Verificar que tiene el formato correcto
  if (bearer !== "Bearer" || !token) {
    return res.status(401).json({ 
      mensaje: "Formato de token no válido",
      detalle: "El formato debe ser: 'Bearer <token>'"
    });
  }

    try {
    // Verificar el token con la clave secreta del entorno
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Guardar los datos del usuario decodificado en req.user
    // Estos datos estarán disponibles en todos los controladores
    // que usen este middleware
    req.user = {
      cliente_id: decoded.id, // ID del cliente en la base de datos
      id: decoded.id,         // Alias para compatibilidad
      email: decoded.email,           // Email del usuario (si está en el token)
      nombre: decoded.nombre          // Nombre del usuario (si está en el token)
    };
  // El token es válido, continuar con la siguiente función
    next();

  } catch (error) {
     console.error("Error al verificar token:", error.message);
    
    // Determinar el tipo de error específico
    let mensaje = "Token no válido";
    
    if (error.name === "TokenExpiredError") {
      mensaje = "Token expirado";
    } else if (error.name === "JsonWebTokenError") {
      mensaje = "Token malformado";
    } else if (error.name === "NotBeforeError") {
      mensaje = "Token no es válido todavía";
    }

    return res.status(401).json({ 
      mensaje: mensaje,
      detalle: "Por favor, inicia sesión nuevamente"
    });
  }
}

export const verifyToken = verificarToken;