require("dotenv").config();
const pool = require("./connection");
const articles = require("../../data/articles.json");

/**
 * Tarea 3: Inserta los artículos de data/articles.json en la tabla articles.
 * IMPORTANTE: si el script se ejecuta más de una vez, no debe duplicar registros.
 * Pista: puedes usar INSERT IGNORE junto con un índice UNIQUE en title,
 *        o comprobar si el título ya existe antes de insertar.
 */
async function seed() {
  // TODO: recorrer articles e insertar cada uno sin duplicar en reruns
  const query = `INSERT IGNORE INTO articles (title, content, author, published) VALUES ?`;
  const values = articles.map((article) => [
    article.title,
    article.content,
    article.author,
    article.published,
  ]);
  const [result] = await pool.query(query, [values]);
  console.log(
    `✅ Seed completado, ${result.affectedRows} articulos insertados`,
  );
}

if (require.main === module) {
  seed()
    .then(() => process.exit(0))
    .catch((err) => {
      console.error("❌ Error en seed:", err.message);
      process.exit(1);
    });
}

module.exports = { seed };
