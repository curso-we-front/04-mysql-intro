const pool = require("./connection");


/**
 * Tarea 4: Implementa las funciones de acceso a datos.
 * Todas deben ser async y usar el pool de conexiones.
 */

/**
 * Devuelve todos los artículos con published = 1
 * @returns {Promise<Array>}
 */
async function findAll() {
  const [rows] = await pool.query(
    "SELECT * FROM articles where published = 1",
  );
  return rows;
}

const allArticles = async () => {
  const articles = await findAll();
  if (articles.length === 0) {
    console.log("No hay datos");
  } else {
    console.log(articles);
  }
};

/**
 * Devuelve un artículo por su id, o null si no existe
 * @param {number} id
 * @returns {Promise<Object|null>}
 */
async function findById(id) {
  const [rows] = await pool.query("SELECT * FROM articles WHERE id = ?", [id]);
  return rows[0] || null;
}

const article = async () => {
  const article = await findById(7);
  if (!article) {
    console.log("No se encontró el artículo");
  } else {
    console.log("Artículo encontrado:", article);
  }
};

/**
 * Inserta un artículo y devuelve el registro completo
 * @param {{ title, content, author, published? }} data
 * @returns {Promise<Object>}
 */
async function create(data) {
 
  const [result] = await pool.execute(
    "INSERT INTO articles (title, content, author, published) VALUES (?, ?, ?, ?)",
    [data.title, data.content, data.author, data.published],
  );

  console.log("Articulo insertado exitosamente");

  const [rows] = await pool.query(
    `SELECT * FROM articles WHERE id = ${result.insertId}`,
  );

  return rows[0];
}

const createArticle = async () => {
  const newArticle = await create({
    title: "XBox One Nueva",
    content: "Consola de videojuegos Nueva",
    author: "Pepe Garcia",
    published: false,
  });

  console.log("Artículo creado:", newArticle);
};

/**
 * Actualiza los campos indicados y devuelve el artículo actualizado
 * Devuelve null si no existe
 * @param {number} id
 * @param {Object} data
 * @returns {Promise<Object|null>}
 */
async function update(id, data) {
  const { title } = data;

  const [result] = await pool.execute(
    `UPDATE articles 
     SET title = ? 
     WHERE id = ?`,
    [title, id],
  );

  if (result.affectedRows === 0) {
    return null;
  }

  const [rows] = await pool.query("SELECT * FROM articles WHERE id = ?", [id]);
  return rows[0];
}

const updatedArticle = async () => {
  const updatedArticle = await update(1, {
    title: "Nintendo 64 actualizada",
  });

  if (!updatedArticle) {
    console.log("Artículo no encontrado");
  } else {
    console.log("Artículo actualizado:", updatedArticle);
  }
};

/**
 * Elimina el artículo con ese id
 * @param {number} id
 * @returns {Promise<boolean>} true si se eliminó, false si no existía
 */
async function remove(id) {
  const [result] = await pool.execute(`DELETE FROM articles where id = ${id}`);

  if (result.affectedRows > 0) {
    console.log("Articulo borrado correctamente");
    return true;
  } else {
    console.log("Articulo no existe");
    return false;
  }
}


module.exports = { findAll, findById, create, update, remove };
