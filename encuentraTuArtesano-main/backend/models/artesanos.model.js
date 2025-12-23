import pool from '../config/db.js';

//------Petición consulta GET----------------
export async function obtenerTodos() {
    // Crea un array de filas (rows) que generará una fila por cada una de las consultas realizadas
  const [rows] = await pool.query( 
    `SELECT id, nombre, descripcion, localizacion, categoria, instagram_url AS instagramUrl, tienda_url AS tiendaUrl, facebook_url AS facebookUrl, comentarios_url AS comentariosUrl,logo_url AS logoUrl, activo, creado_en
     FROM presentacion
     WHERE activo = 1
     ORDER BY nombre ASC`
  );
  return rows;  // Aquí le decimos que nos devuelva el array con los datos de la consulta
}


//---------Petición POST-------------------------
export async function subirPresentacion({nombre,descripcion,localizacion,categoria,instagramUrl,tiendaUrl,facebookUrl,comentariosUrl,logoUrl, activo,artesanoId}) {

  const [result] = await pool.query(
  `INSERT INTO presentacion (nombre, descripcion, localizacion, categoria, instagram_url, tienda_url, facebook_url, comentarios_url, logo_url, activo, artesano_id)
   VALUES (?,?,?,?,?,?,?,?,?,?,?)`,
  [nombre, descripcion, localizacion, categoria, instagramUrl, tiendaUrl, facebookUrl, comentariosUrl, logoUrl, activo, artesanoId]
  );
  return result;  
}

//--------Petición PUT, UPDATE-----------------------

export async function modificarPresentacion(id,{nombre,descripcion,localizacion,categoria,instagramUrl,tiendaUrl,facebookUrl,comentariosUrl,logoUrl, activo}) {
   const [result] = await pool.query(
    `UPDATE presentacion 
     SET nombre=?, descripcion=?, localizacion=?, categoria=?, instagram_url=?, tienda_url=?, facebook_url=?, comentarios_url=?, logo_url=?, activo=?
     WHERE id = ?`,
    [nombre, descripcion, localizacion, categoria, instagramUrl, tiendaUrl, facebookUrl, comentariosUrl, logoUrl, activo,id]
  );

  return result;
}
