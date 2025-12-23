import pool from "./config/db.js"

async function crearBBDD() {
  // TABLA ARTESANOS
  await pool.query(`
    CREATE TABLE IF NOT EXISTS artesanos (
      id INT AUTO_INCREMENT PRIMARY KEY,
      nombre VARCHAR(100) NOT NULL,
      email VARCHAR(100) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL,
      creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);


//TABLA PRESENTACIÓN
await pool.query(`
    CREATE TABLE IF NOT EXISTS presentacion (
      id INT AUTO_INCREMENT PRIMARY KEY,
      nombre VARCHAR(100) NOT NULL,
      descripcion TEXT,
      localizacion VARCHAR(200),
      categoria VARCHAR(100) NOT NULL,
      instagram_url VARCHAR (200),
      tienda_url VARCHAR (200),
      facebook_url VARCHAR (200),
      comentarios_url TEXT, 
      logo_url VARCHAR(500),
      activo BOOLEAN DEFAULT TRUE,
      creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      artesano_id INT NOT NULL,
      CONSTRAINT fk_artesano_presentacion
        FOREIGN KEY (artesano_id) REFERENCES artesanos(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
    )
  `);

  //TABLA PRODUCTOS
  await pool.query(`
    CREATE TABLE IF NOT EXISTS productos (
      id INT AUTO_INCREMENT PRIMARY KEY,
      nombre VARCHAR(100) NOT NULL,
      descripcion TEXT,
      imagen_url VARCHAR(200),
      categoria VARCHAR(100),
      precio INT NOT NULL,
      stock INT NOT NULL, 
      comprar_url VARCHAR (200),
      activo BOOLEAN DEFAULT TRUE,
      creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      artesano_id INT NOT NULL,
      CONSTRAINT fk_artesano_productos
        FOREIGN KEY (artesano_id) REFERENCES artesanos(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
    )
  `);


  console.log("✅ Base de datos creada correctamente");
}
async function artesanosEjemplo() {

const [result]= await pool.query(`
  INSERT INTO artesanos (nombre,email,password)
  VALUES ("Sembrao","sembrao@ejemplo.com","123456")
  `)
const artesanoId = result.insertId; // id autogenerado

await pool.query(`
  INSERT INTO presentacion 
    (nombre, descripcion, localizacion, categoria, instagram_url, tienda_url, facebook_url, comentarios_url, logo_url, artesano_id)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`, [
  'Sembrao',
  `Somos William y Ari, una joven pareja que un día decidió empezar este pequeño proyecto llamado Sembrao. 
Todo nació en una época de incertidumbre laboral y personal, un momento difícil que nos llevó a dar un salto al vacío y dedicarnos a lo que más nos apasiona: crear con nuestras propias manos. 
Ari, una amante del arte en todas sus formas, siempre buscando nuevas ideas y creatividad en cada detalle. 
William, por su parte, es un emprendedor nato, con una pasión innata por conectar con las personas y convertir ideas en realidad. 
Juntos queremos iluminar tu hogar y tu vida, llevándote un pedacito de nuestro sueño, hecho con mucho corazón.`,
  'Sevilla',
  'velas',
  'https://www.instagram.com/sembraomarket?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw%3D%3D',
  'https://sembraomarket.com/',
  'https://www.facebook.com/profile.php?id=61568556785686&locale=es_ES',
  'No hay',
  'https://sembraomarket.com/cdn/shop/files/logoweb_00afd599-b872-476c-ae2d-df0c16901d91.png?v=1757942342&width=220',
   artesanoId // ← aquí pasamos el id válido
]);
}

(async () => {
  await crearBBDD();
  await artesanosEjemplo();
})();