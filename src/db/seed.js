const pool = require("./connection");
const data = require("../../data/articles.json");

async function seed() {
  await Promise.all(
    data.map((article) =>
      pool.execute(
        "INSERT INTO articles (title, content, author, published) VALUES (?, ?, ?, ?)",
        [article.title, article.content, article.author, article.published],
      ),
    ),
  );

  console.log("✅ Seed completado");
}

seed().catch(console.error);
