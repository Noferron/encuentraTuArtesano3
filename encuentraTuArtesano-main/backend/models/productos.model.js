import pool from '../config/db.js';

//---------------------POST productos---------------------------------------------------------------------------------------------------
export async function actualizarProductos({nombre, descripcion, imagenUrl, categoria,precio,stock,comprarUrl,activo,artesanoId}) {
  
  const [result] = await pool.query(
    "INSERT INTO productos (nombre, descripcion, imagen_url, categoria, precio, stock, comprar_url, activo,artesano_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?) ",
    [nombre, descripcion, imagenUrl, categoria, precio, stock, comprarUrl, activo, artesanoId]
  )

  return result;
}

//-------------------GET productos----------------------------------------------------------------------------------------------------------
export async function obtenerProductos(artesanoId){
  const [result] = await pool.query(
    `SELECT id, nombre, descripcion, imagen_url, categoria, precio, stock, comprar_url, activo, artesano_id
    FROM productos
    WHERE artesano_id = ? `,
    [artesanoId]
  );
  return result;
}

//-------------------PUT productos------------------------------------------------------------------------------------------------------------
export async function modificarProducto(id,{nombre, descripcion, imagenUrl, categoria,precio,stock,comprarUrl,activo}) {
   const [result] = await pool.query(
    `UPDATE productos 
     SET nombre=?, descripcion=?, imagen_url=?, categoria=?, precio=?, stock=?, comprar_url=?, activo=?
     WHERE id = ?`,
    [nombre, descripcion, imagenUrl, categoria, precio, stock, comprarUrl, activo, id]
  );

  return result;
}