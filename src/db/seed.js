const fs = require("fs");
const path = require("path");
const pool = require("./connection");
// const articles = require("../../data/articles.json");

async function seed() {
    const jsonPath = path.join(__dirname, "../../data/articles.json")
    const data = fs.readFileSync(jsonPath, "utf8");
    const articles = JSON.parse(data);

    const values = articles.map((article) => [article.title, article.content, article.author, article.published] )

    const query = 'INSERT INTO articles (title, content, author, published) VALUES ?'

    const [result] = await pool.query(query, [values])

    console.log(`Seed completado: ${result.affectedRows} articulos insertados`);
 
}

seed().catch((err) => {
  console.error("❌ Error al añadir datos:", err.message);
  process.exit(1);
});
