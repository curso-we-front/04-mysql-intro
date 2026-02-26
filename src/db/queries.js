const pool = require('./connection');

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
}

/**
 * Devuelve un artículo por su id, o null si no existe
 * @param {number} id
 * @returns {Promise<Object|null>}
 */
async function findById(id) {
  // TODO
}

/**
 * Inserta un artículo y devuelve el registro completo
 * @param {{ title, content, author, published? }} data
 * @returns {Promise<Object>}
 */
async function create(data) {
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
  // TODO
}

/**
 * Elimina el artículo con ese id
 * @param {number} id
 * @returns {Promise<boolean>} true si se eliminó, false si no existía
 */
async function remove(id) {
  // TODO
}

module.exports = { findAll, findById, create, update, remove };
