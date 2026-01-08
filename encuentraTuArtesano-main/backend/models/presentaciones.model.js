import pool from '../config/db.js';


//---------Petición GET por id-------------------

export async function obtenerPresentacion(artesanoId){
  const [result] = await pool.query(
    `SELECT id, nombre, descripcion, localizacion, categoria, instagram_url AS instagramUrl, tienda_url AS tiendaUrl, facebook_url AS facebookUrl, comentarios_url AS comentariosUrl,logo_url AS logoUrl, activo, creado_en
    FROM presentacion
    WHERE artesano_id = ? `,
    [artesanoId]
  );
  return result;
}


//---------Petición GET junto con producto para frontend clientes----------------

export async function obtenerPyP() {
  const [rows] = await pool.query(`
   SELECT presentacion.nombre,
    presentacion.descripcion, 
    presentacion.localizacion, 
    presentacion.categoria, 
    presentacion.instagram_url AS instagramUrl, 
    presentacion.tienda_url AS tiendaUrl, 
    presentacion.facebook_url AS facebookUrl, 
    presentacion.comentarios_url AS comentariosUrl,
    presentacion.logo_url AS logoUrl,
    productos.nombre,
    productos.descripcion, 
    productos.imagen_url, 
    productos.categoria, 
    productos.precio, 
    productos.stock, 
    productos.comprar_url, 
    productos.activo, 
    productos.artesano_id
    FROM presentacion 
    LEFT JOIN productos
	    ON productos.artesano_id = presentacion.artesano_id
    WHERE productos.activo = 1`
  );
  return rows;
  
}