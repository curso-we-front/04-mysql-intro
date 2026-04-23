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
  const [articles] = await pool.query(
    "SELECT * FROM articles WHERE published = 1",
  );
  return articles;
}

/**
 * Devuelve un artículo por su id, o null si no existe
 * @param {number} id
 * @returns {Promise<Object|null>}
 */
async function findById(id) {
  // TODO
  const [rows] = await pool.query(`SELECT * FROM articles WHERE id = ?`, [id]);
  const result = rows[0] ? rows[0] : null;
  return result;
}

/**
 * Inserta un artículo y devuelve el registro completo
 * @param {{ title, content, author, published? }} data
 * @returns {Promise<Object>}
 */
async function create(data) {
  // TODO
  const [article] = await pool.query(
    `INSERT INTO articles (title, content, author, published) VALUES (?,?,?,?)`,
    [data.title, data.content, data.author, data.published ?? 0],
  );
  const newArticle = await findById(article.insertId);
  return newArticle;
}

/**
 * Actualiza los campos indicados y devuelve el artículo actualizado
 * Devuelve null si no existe
 * @param {number} id
 * @param {Object} data
 * @returns {Promise<Object|null>}
 */
async function update(id, data) {
  // TODO
  const sql = "UPDATE articles SET title = ? WHERE id = ?";
  const [result] = await pool.query(sql, [data.title, id]);
  if (result.affectedRows === 0) {
    return null;
  }
  return await findById(id);
}

/**
 * Elimina el artículo con ese id
 * @param {number} id
 * @returns {Promise<boolean>} true si se eliminó, false si no existía
 */
async function remove(id) {
  // TODO
  const sql = 'DELETE FROM articles WHERE id = ?'
  const [result] = await pool.query(sql, [id]);
  return result.affectedRows > 0;
}

module.exports = { findAll, findById, create, update, remove };
