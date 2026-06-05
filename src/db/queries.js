const pool = require("./connection")

/**
 * Tarea 4: Implementa las funciones de acceso a datos.
 * Todas deben ser async y usar el pool de conexiones.
 */

/**
 * Devuelve todos los artículos con published = 1
 * @returns {Promise<Array>}
 */
async function findAll() {
  const [articlesPublished] = await pool.query(
    `SELECT * FROM articles WHERE published = 1`,
  )
  return articlesPublished
  // TODO
}

/**
 * Devuelve un artículo por su id, o null si no existe
 * @param {number} id
 * @returns {Promise<Object|null>}
 */
async function findById(id) {
  const [articleById] = await pool.query(
    `SELECT * FROM articles WHERE id = ?`,
    [id],
  )
  if (articleById.length === 0) {
    return null
  }
  return articleById[0]
  // TODO
}

/**
 * Inserta un artículo y devuelve el registro completo
 * @param {{ title, content, author, published? }} data
 * @returns {Promise<Object>}
 */
async function create(data) {
  const [result] = await pool.query(
    `INSERT INTO articles (title, content, author, published) VALUES (?, ?, ?, ?)`,
    [data.title, data.content, data.author, data.published ?? 0],
  )
  return findById(result.insertId)
  // TODO
}

/**
 * Actualiza los campos indicados y devuelve el artículo actualizado
 * Devuelve null si no existe
 * @param {number} id
 * @param {Object} data
 * @returns {Promise<Object|null>}
 */
async function update(id, data) {
  const [result] = await pool.query(
    `UPDATE articles SET title = ? WHERE id = ?`,
    [data.title, id],
  )
  if (result.affectedRows === 0) {
    return null
  }
  return findById(id)
  // TODO
}

/**
 * Elimina el artículo con ese id
 * @param {number} id
 * @returns {Promise<boolean>} true si se eliminó, false si no existía
 */
async function remove(id) {
  const [result] = await pool.query(`DELETE FROM articles WHERE id = ?`, [id])
  return result.affectedRows > 0
  // TODO
}

module.exports = { findAll, findById, create, update, remove }
