# 04 — MySQL con Node.js

## Objetivo

Conectar Node.js a MySQL usando el paquete `mysql2`, ejecutar queries básicas y entender el manejo asíncrono de la base de datos.

## Prerequisitos

Necesitas tener MySQL corriendo. Puedes usar Docker:
```bash
docker run --name blog-mysql -e MYSQL_ROOT_PASSWORD=root -e MYSQL_DATABASE=blog -p 3306:3306 -d mysql:8
```

## Tareas

### Tarea 1 — Conexión y configuración (`src/db/connection.js`)
Crea un pool de conexiones con `mysql2/promise` usando variables de entorno del fichero `.env`.

### Tarea 2 — Migraciones (`src/db/migrate.js`)
Crea el script que crea la tabla `articles`:
```sql
CREATE TABLE IF NOT EXISTS articles (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(100) NOT NULL,
  content TEXT NOT NULL,
  author VARCHAR(80) NOT NULL,
  published TINYINT(1) DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```
El script debe ejecutarse con `npm run migrate`.

### Tarea 3 — Seeds (`src/db/seed.js`)
Crea un script que inserte los artículos del fichero `data/articles.json`.  
Ejecutable con `npm run seed`.

### Tarea 4 — Queries básicas (`src/db/queries.js`)
Implementa y exporta estas funciones usando el pool:
- `findAll()` → todos los artículos publicados
- `findById(id)` → artículo por id
- `create(data)` → inserta y devuelve el artículo creado
- `update(id, data)` → actualiza y devuelve el artículo
- `remove(id)` → elimina por id, devuelve `true`/`false`

## Estructura esperada

```
04-mysql-intro/
├── data/
│   └── articles.json
├── src/
│   └── db/
│       ├── connection.js   ← Tarea 1
│       ├── migrate.js      ← Tarea 2
│       ├── seed.js         ← Tarea 3
│       └── queries.js      ← Tarea 4
├── tests/
│   └── queries.test.js
├── .env.example
└── package.json
```

## Variables de entorno

Copia `.env.example` a `.env` y ajusta los valores:
```
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=root
DB_NAME=blog
```

## Cómo empezar

```bash
cp .env.example .env
npm install
npm run migrate
npm run seed
npm test
```

## Criterios de evaluación

- [ ] La conexión usa pool y variables de entorno (no hardcoded)
- [ ] `migrate` crea la tabla si no existe
- [ ] `seed` inserta los artículos sin duplicar en reruns
- [ ] Las 5 funciones de queries funcionan correctamente
- [ ] Los tests pasan contra una BD real (o BD en memoria con mock)
