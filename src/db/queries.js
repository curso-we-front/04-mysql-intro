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
  // TODO
  const query = `SELECT * FROM articles WHERE published = 1`;
  const [articles] = await pool.query(query);
  return articles;
}

/**
 * Devuelve un artículo por su id, o null si no existe
 * @param {number} id
 * @returns {Promise<Object|null>}
 */
async function findById(id) {
  // TODO
  const [article] = await pool.query(`SELECT * from articles WHERE id = ?`, [
    id,
  ]);
  return article[0] ? article[0] : null;
}

/**
 * Inserta un artículo y devuelve el registro completo
 * @param {{ title, content, author, published? }} data
 * @returns {Promise<Object>}
 */
async function create(data) {
  // TODO
  const [article] = await pool.query(
    `INSERT INTO articles (title, content, author, published) VALUES (?, ?, ?, ?)`,
    [data.title, data.content, data.author, data.published],
  );
  const newArticle = findById(article.insertId);
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
  const [article] = await pool.query(`UPDATE articles SET title = ? WHERE id = ?`, [data.title, id])
  if(article.affectedRows === 0){
    return null
  }
  return findById(id)
}

/**
 * Elimina el artículo con ese id
 * @param {number} id
 * @returns {Promise<boolean>} true si se eliminó, false si no existía
 */
async function remove(id) {
  // TODO
  const [article] = await pool.query(`DELETE FROM articles WHERE id = ?`, [id])
  return article.affectedRows > 0 ? true : false
}

module.exports = { findAll, findById, create, update, remove };
