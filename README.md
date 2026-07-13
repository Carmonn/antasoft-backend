```
# Antasoft Backend API

Backend de Antasoft construido con Deno, Hono y Prisma. Expone endpoints REST con especificación OpenAPI para catálogos del sistema.

## Situación Actual (2026-07-13)

Estado funcional del proyecto:

- API levantando sobre Deno + Hono en puerto 8000.
- Documentación OpenAPI disponible en /docs.
- Catálogos activos con rutas de listado y detalle por id:
	- estados
	- municipios
	- permisos
	- medios
	- trabajos
	- estatus de asignaciones
	- estatus de honorarios
- Prisma configurado con SQLite/libSQL adapter.
- Migraciones activas en prisma/migrations (migración inicial aplicada).
- Seed implementado para catálogos.
- Modelos de personas/contactos/cobertura definidos en Prisma, pero sin rutas expuestas en la API en este momento.

## Stack Tecnológico

- Deno 2.x
- Hono + zod-openapi
- Prisma ORM 7.x
- @prisma/adapter-libsql
- SQLite (desarrollo local)
- Scalar (referencia de API)

## Requisitos

- Deno instalado
- Archivo .env en la raíz del proyecto

## Variables de Entorno

Define al menos la URL de base de datos:

```env
DATABASE_URL="file:./dev.db"
```

Notas:

- Puedes usar otra ruta SQLite según tu entorno.
- .env y archivos de base de datos local no deben versionarse.

## Cómo Levantar el Proyecto

1. Generar cliente Prisma:

```bash
deno task prisma:generate
```

2. Aplicar migraciones:

```bash
deno task prisma:migrate
```

3. Poblar catálogos iniciales:

```bash
deno task prisma:seed
```

4. Iniciar servidor:

```bash
deno task start
```

Accesos:

- API: http://localhost:8000
- Docs UI: http://localhost:8000/docs
- OpenAPI JSON: http://localhost:8000/docs/openapi.json

## Tareas Disponibles

- deno task start
- deno task prisma:generate
- deno task prisma:migrate
- deno task prisma:seed
- deno task prisma:reset
- deno task prisma:studio

## Endpoints Disponibles

Base path: /catalogos

- GET /catalogos/estados
- GET /catalogos/estados/:id
- GET /catalogos/municipios
- GET /catalogos/municipios/:id
- GET /catalogos/permisos
- GET /catalogos/permisos/:id
- GET /catalogos/medios
- GET /catalogos/medios/:id
- GET /catalogos/trabajos
- GET /catalogos/trabajos/:id
- GET /catalogos/estatus-asignaciones
- GET /catalogos/estatus-asignaciones/:id
- GET /catalogos/estatus-honorarios
- GET /catalogos/estatus-honorarios/:id

## Estructura Principal

```text
src/
	main.ts
	modules/
		catalogos/
			estados/
			municipios/
			permisos/
			medios/
			trabajos/
			estatusAsignaciones/
			estatusHonorarios/
		personas/               # estructura base, no expuesta en main.ts
	generated/
	shared/

prisma/
	schema.prisma
	migrations/
	seed/

postman/                    # colecciones locales (ignorado por git)
```

## Flujo Recomendado de Desarrollo

1. Editar prisma/schema.prisma.
2. Ejecutar deno task prisma:migrate.
3. Ejecutar deno task prisma:generate.
4. Implementar/ajustar módulo (schemas, repository, services, handlers, routes).
5. Actualizar seed si el catálogo lo requiere.

## Troubleshooting

- Error de conexión a DB:
	- Verifica DATABASE_URL y permisos de escritura del archivo SQLite.
- Cliente Prisma desactualizado:
	- Ejecuta deno task prisma:generate.
- Datos duplicados o inconsistentes en local:
	- Ejecuta deno task prisma:reset.

## Seguridad

- No commitear .env.
- No commitear dev.db ni otros archivos SQLite.
- No commitear dumps ni colecciones con secretos.
- Mantener postman/ fuera del repositorio si contiene tokens o variables sensibles.
```
