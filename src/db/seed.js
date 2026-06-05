require("dotenv").config()
const pool = require("./connection")
const articles = require("../../data/articles.json")

/**
 * Tarea 3: Inserta los artículos de data/articles.json en la tabla articles.
 * IMPORTANTE: si el script se ejecuta más de una vez, no debe duplicar registros.
 * Pista: puedes usar INSERT IGNORE junto con un índice UNIQUE en title,
 *        o comprobar si el título ya existe antes de insertar.
 */
async function seed() {
  for (const article of articles) {
    const [rows] = await pool.query(`SELECT id FROM articles WHERE title = ?`, [
      article.title,
    ])
    if (rows.length === 0) {
      await pool.query(
        `INSERT IGNORE INTO articles (title, content, author, published) VALUES (?, ?, ?, ?)`,
        [
          article.title,
          article.content,
          article.author,
          article.published ? 1 : 0,
        ],
      )
    }
  }
  // TODO: recorrer articles e insertar cada uno sin duplicar en reruns
  console.log("✅ Seed completado")
}

if (require.main === module) {
  seed()
    .then(() => process.exit(0))
    .catch((err) => {
      console.error("❌ Error en seed:", err.message)
      process.exit(1)
    })
}

module.exports = { seed }
