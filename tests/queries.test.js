/**
 * Tests de integración para queries MySQL.
 * Requieren una BD MySQL real con las variables de entorno configuradas.
 * Ejecuta `npm run migrate` antes de `npm test`.
 */
const { findAll, findById, create, update, remove } = require('../src/db/queries');
const pool = require('../src/db/connection');

beforeAll(async () => {
  // Limpia la tabla antes de los tests
  await pool.execute('DELETE FROM articles');
});

afterAll(async () => {
  // pool.end() se omite aquí; Jest cierra el proceso con --forceExit
  // para que seed.test.js (que corre después) pueda reutilizar el mismo pool
});

describe('create', () => {
  test('inserta y devuelve el artículo con id', async () => {
    const article = await create({
      title: 'Test Article',
      content: 'Contenido de prueba suficientemente largo.',
      author: 'Tester',
      published: 1
    });
    expect(article.id).toBeDefined();
    expect(article.title).toBe('Test Article');
  });
});

describe('findAll', () => {
  test('devuelve solo los publicados', async () => {
    await create({ title: 'Draft', content: 'Sin publicar todavía.', author: 'X', published: 0 });
    const articles = await findAll();
    expect(articles.every(a => a.published === 1)).toBe(true);
  });
});

describe('findById', () => {
  test('devuelve el artículo correcto', async () => {
    const created = await create({ title: 'Find Me', content: 'Contenido encontrado.', author: 'A', published: 1 });
    const found = await findById(created.id);
    expect(found.title).toBe('Find Me');
  });

  test('devuelve null si no existe', async () => {
    const found = await findById(99999);
    expect(found).toBeNull();
  });
});

describe('update', () => {
  test('actualiza el título', async () => {
    const created = await create({ title: 'Original', content: 'Contenido original válido.', author: 'A', published: 1 });
    const updated = await update(created.id, { title: 'Actualizado' });
    expect(updated.title).toBe('Actualizado');
  });

  test('devuelve null si no existe', async () => {
    const result = await update(99999, { title: 'Fantasma' });
    expect(result).toBeNull();
  });
});

describe('remove', () => {
  test('elimina y devuelve true', async () => {
    const created = await create({ title: 'Delete Me', content: 'Será eliminado en el test.', author: 'A', published: 1 });
    const result = await remove(created.id);
    expect(result).toBe(true);
  });

  test('devuelve false si no existe', async () => {
    const result = await remove(99999);
    expect(result).toBe(false);
  });
});
