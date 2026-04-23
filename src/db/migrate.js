const pool = require("./connection");

/**
 * Tarea 2: Crea la tabla articles si no existe.
 *
 * La tabla debe tener:
 *   id          INT AUTO_INCREMENT PRIMARY KEY
 *   title       VARCHAR(100) NOT NULL
 *   content     TEXT NOT NULL
 *   author      VARCHAR(80) NOT NULL
 *   published   TINYINT(1) DEFAULT 0
 *   created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
 */

async function migrate() {
  // TODO: ejecutar el CREATE TABLE IF NOT EXISTS
  const sql = `
  CREATE TABLE IF NOT EXISTS articles (id INT AUTO_INCREMENT PRIMARY KEY, 
  title VARCHAR(100) NOT NULL,
  content TEXT NOT NULL, 
  author VARCHAR(80) NOT NULL, 
  published TINYINT(1) DEFAULT 0, 
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP);`;

  await pool.query(sql);
  console.log("✅ Migración completada");
  process.exit(0);
}

migrate().catch((err) => {
  console.error("❌ Error en migración:", err.message);
  process.exit(1);
});
