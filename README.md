```
# Antasoft Backend API

API backend construida con Deno + Hono + Prisma, enfocada en exponer catálogos de estados y municipios mediante endpoints REST documentados con OpenAPI.

## Stack Tecnológico

- Deno 2.x
- Hono + OpenAPI (zod-openapi)
- Prisma ORM 7.x
- SQLite/libSQL como datasource local
- Scalar para documentación interactiva

## Requisitos

- Deno instalado (recomendado: versión estable reciente)
- Archivo de entorno .env en la raíz del proyecto

## Variables de Entorno

Crear un archivo .env en la raíz con, al menos:

```env
DATABASE_URL="file:./prisma/dev.db"
```

Notas:
- Si ya usas otro archivo/localización de SQLite, respeta tu ruta actual.
- No subas el .env al repositorio (ya está en .gitignore).

## Instalación y Primer Arranque

1. Instalar dependencias y generar cliente Prisma:

```bash
deno task prisma:generate
```

2. Ejecutar migraciones:

```bash
deno task prisma:migrate
```

3. Cargar datos semilla:

```bash
deno task prisma:seed
```

4. Levantar el servidor:

```bash
deno task start
```

La API corre por defecto en:
- http://localhost:8000

Documentación interactiva:
- http://localhost:8000/docs

OpenAPI JSON:
- http://localhost:8000/docs/openapi.json

## Tareas Disponibles

- deno task start: inicia la API
- deno task prisma:generate: genera el cliente Prisma en src/generated
- deno task prisma:migrate: crea/aplica migraciones de desarrollo
- deno task prisma:seed: ejecuta el seed de catálogos
- deno task prisma:reset: resetea BD, reaplica migraciones y vuelve a sembrar
- deno task prisma:studio: abre Prisma Studio

## Endpoints Principales

Base URL: /catalogos

- GET /catalogos/estados
- GET /catalogos/estados/:id
- GET /catalogos/municipios
- GET /catalogos/municipios/:id

## Estructura del Proyecto

```text
src/
	main.ts                # bootstrap de app, OpenAPI, middlewares y rutas
	modules/
		estados/             # módulo de catálogo de estados
		municipios/          # módulo de catálogo de municipios
	shared/                # utilidades compartidas, errores y mapeadores
	generated/             # cliente Prisma generado

prisma/
	schema.prisma          # modelos y datasource
	migrations/            # historial de migraciones
	seed/                  # scripts y datos de seed
```

## Flujo Recomendado de Desarrollo

1. Modificar modelos en prisma/schema.prisma.
2. Ejecutar deno task prisma:migrate.
3. Regenerar cliente con deno task prisma:generate (si aplica).
4. Ajustar módulo/rutas/servicios afectados.
5. Re-sembrar datos con deno task prisma:seed cuando sea necesario.

## Solución de Problemas Comunes

- Error de conexión a base de datos:
	- Verifica DATABASE_URL y que el archivo SQLite exista o pueda crearse.
- Cambios de schema no reflejados:
	- Ejecuta deno task prisma:generate.
- Seed duplicado o fallando por restricciones:
	- Usa deno task prisma:reset para reiniciar el estado local.

## Seguridad y Buenas Prácticas

- Mantén .env fuera de control de versiones.
- No publiques archivos locales de base de datos.
- Evita commitear dumps, colecciones con secrets o datos sensibles.

## Estado del Proyecto

Proyecto en evolución. Se recomienda mantener convenciones por módulo (routes, handlers, services, repository, schemas) para escalar nuevas funcionalidades con bajo acoplamiento.
```
