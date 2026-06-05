require("dotenv").config()
const mysql = require("mysql2/promise")

/**
 * Tarea 1: Crea y exporta un pool de conexiones MySQL.
 *
 * Usa las siguientes variables de entorno:
 *   DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME
 *
 * Configura waitForConnections: true y connectionLimit: 10
 */

// TODO: crear el pool con mysql.createPool(...)

// TODO: exportar el pool
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
})
module.exports = pool // reemplaza null con el pool
