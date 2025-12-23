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
 