# SuelaCarameloApp-BackEnd

API REST para la app Suela Caramelo. Gestiona noticias, equipos, jugadores, fixture, resultados en vivo, posiciones, sponsors, cupones y autenticación de usuarios admin.

## Stack

- **Node.js** + **Express 4** (ES Modules — `"type": "module"`)
- **MongoDB** + **Mongoose 8** (base de datos principal)
- **Firebase Admin SDK** — notificaciones push FCM desde el server
- **Cloudinary** — upload de imágenes (via multer + cloudinary)
- **JWT** + **bcryptjs** — autenticación y hasheo de passwords
- **Zod** — validación de schemas en middlewares
- **Morgan** + **cookie-parser** + **cors**
- **Deploy**: Vercel (`vercel.json` apunta todo a `index.js`)
- **Dev**: nodemon (`npm run dev`)
- **Tests**: Mocha + Chai + Supertest

## Estructura

```
index.js              # Entry point: conecta DB y levanta servidor en puerto 3000
src/
  app.js              # Express app: middlewares, monta rutas en /sc
  db.js               # Conexión Mongoose
  config.js           # Variables de entorno (dotenv)
  routes/
    index.routes.js   # Agrega todos los sub-routers bajo /sc
    auth.routes.js
    notices.routes.js
    teams.routes.js
    players.routes.js
    fixture.routes.js
    positions.routes.js
    matchs.routes.js
    heroSection.routes.js
    sponsors.routes.js
    coupons.routes.js
  controllers/        # Lógica de negocio por recurso
  models/             # Schemas de Mongoose
  middlewares/
    validateToken.js  # Verifica JWT en cookies
    validator.middleware.js  # Valida body con Zod schemas
  schemas/            # Zod schemas (auth, noticias)
  libs/
    jwt.js            # Helpers para crear/verificar tokens
  utils/
    cloudinary.js     # Config Cloudinary
    multer.js         # Config multer para upload
    date.utils.js
```

## Endpoints base

Todos los endpoints arrancan con `/sc`:

| Recurso | Prefijo |
|---------|---------|
| Auth | `/sc/auth` |
| Noticias | `/sc/notices` |
| Equipos | `/sc/teams` |
| Jugadores | `/sc/players` |
| Fixture | `/sc/fixtures` |
| Posiciones | `/sc/positions` |
| Partidos | `/sc/matches` |
| Hero Images | `/sc/hero-images` |
| Sponsors | `/sc/sponsors` |
| Cupones | `/sc/coupons` |

## Modelos principales

- `notices.model.js` — noticias
- `teams.model.js` — equipos
- `players.model.js` — jugadores (con foto en Cloudinary)
- `fixture.model.js` — fechas de fixture
- `matchs.model.js` — partidos y resultados en vivo
- `positions.model.js` / `positionsGeneral.model.js` — tabla de posiciones
- `heroSection.model.js` — imágenes del hero carousel
- `sponsors.model.js` — sponsors
- `coupons.model.js` — cupones de descuento
- `user.model.js` — usuarios admin
- `authors.model.js` — autores/periodistas

## Comandos

```bash
npm run dev    # nodemon index.js (desarrollo con hot reload)
npm start      # node index.js (producción local)
npm test       # mocha -w ./tests/**/*.spec.js
```

## Variables de entorno (`.env`)

Archivo requerido en la raíz. Incluye al menos:
- `MONGO_URI` — connection string de MongoDB
- `JWT_SECRET` — clave para firmar tokens
- `CLOUDINARY_*` — credenciales de Cloudinary
- Variables de Firebase Admin SDK

## Notas importantes

- El `.env` nunca se commitea — tiene todos los secrets.
- El `.npmrc` puede tener config privada de npm — no commitear.
- Los tokens JWT se pasan via **cookies** (cookie-parser habilitado).
- El CORS está completamente abierto (`app.use(cors())`) — ajustar en producción si se necesita restringir origen.
- En Vercel, `vercel.json` redirige todo a `index.js` — el `await connectDB()` en el entry point es crítico.
- Tests corren con `mocha -w` (modo watch) — los archivos de test van en `./tests/`.
