import pool from "../config/db.js"

export async function buscarPorEmail(email) {
    const [rows] = await pool.query(
        ' SELECT id, nombre, email, password, creado_en FROM artesanos WHERE email=?', 
        [email]
    );
    return rows[0];
}

export async function crearUsuario({nombre, email, password}) {
    const [result] = await pool.query(
        'INSERT INTO artesanos (nombre,email,password) VALUES (?,?,?)',
        [nombre, email, password]
    );
    return{
        insertId: result.insertId,
        id: result.insertId,
        nombre,
        email
    };
}