/**
 * Tests de integración para el script de seed.
 * Verifican que seed() inserta los artículos y que es idempotente.
 * Ejecuta `npm run migrate` antes de `npm test`.
 */
const pool = require('../src/db/connection');
const { seed } = require('../src/db/seed');
const articles = require('../data/articles.json');

beforeAll(async () => {
  await pool.execute('DELETE FROM articles');
});

describe('seed', () => {
  test('inserta todos los artículos del JSON', async () => {
    await seed();
    const [rows] = await pool.execute('SELECT * FROM articles');
    expect(rows.length).toBe(articles.length);
  });

  test('no duplica registros al ejecutarse una segunda vez', async () => {
    await seed();
    const [rows] = await pool.execute('SELECT * FROM articles');
    expect(rows.length).toBe(articles.length);
  });
});
