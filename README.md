# Antasoft Backend API

Backend de Antasoft construido con Deno, Hono y Prisma. Expone una API REST documentada con OpenAPI y organizada por dominios funcionales.

## Situación Actual (2026-07-22)

Estado funcional confirmado en el código:

- API activa sobre Deno + Hono en puerto 8000.
- Documentación OpenAPI/Scalar publicada en /docs.
- Prisma configurado con SQLite y adapter libSQL.
- Migraciones activas en prisma/migrations.
- Seed inicial implementado para catálogos, personas, usuarios y sucursales base.
- Módulos activos en rutas:
  - Catalogos
  - Personas
  - Usuarios
  - Sucursales
  - Asignaciones
  - Honorarios

## Stack Tecnologico

- Deno 2.x
- Hono
- @hono/zod-openapi
- Prisma ORM 7.x
- @prisma/adapter-libsql
- SQLite (desarrollo local)
- Scalar (API Reference UI)

## Requisitos

- Deno instalado
- Archivo .env en la raiz del proyecto
- Archivo seed.ts en prisma/seed/ para inicializar datos base

## Variables de Entorno

Variable minima requerida:

```env
DATABASE_URL="file:./dev.db"
```

Notas:

- Puedes ajustar la ruta SQLite para tu entorno local.
- .env y los archivos de base local deben permanecer fuera del control de versiones.

## Como Levantar el Proyecto

1. Generar cliente Prisma.

```bash
deno task prisma:generate
```

2. Aplicar migraciones.

```bash
deno task prisma:migrate
```

3. Ejecutar seed inicial.

```bash
deno task prisma:seed
```

4. Iniciar API.

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

## Rutas Base Activas

Estas rutas estan registradas en la aplicacion:

- /catalogos/estados
- /catalogos/municipios
- /catalogos/permisos
- /catalogos/medios
- /catalogos/trabajos
- /catalogos/estatus-asignaciones
- /catalogos/estatus-honorarios
- /personas
- /usuarios/roles
- /usuarios/usuarios
- /sucursales/clientes
- /sucursales/sucursales
- /asignaciones
- /honorarios

En los modulos de negocio (personas, usuarios, sucursales, asignaciones, honorarios) ya existe soporte CRUD (listado, detalle por id, creacion, actualizacion y eliminacion). El detalle contractual de cada endpoint se consulta en /docs.

## Estructura Principal

```text
src/
  main.ts
  modules/
    catalogos/
    personas/
    usuarios/
    sucursales/
    asignaciones/
    honorarios/
  generated/
  shared/

prisma/
  schema.prisma
  migrations/
  seed/

postman/
```

## Modelo de Datos

Dominios de datos actualmente modelados en Prisma:

- Catalogos: estados, municipios, permisos, medios, trabajos, estatus_asignaciones, estatus_honorarios
- Personas: personas, contactos, personas_municipios
- Usuarios: roles, roles_permisos, usuarios, usuarios_permisos
- Sucursales: clientes, identificadores, sucursales, claves
- Operacion: asignaciones, honorarios

## Flujo Recomendado de Desarrollo

1. Modificar prisma/schema.prisma.
2. Ejecutar deno task prisma:migrate.
3. Ejecutar deno task prisma:generate.
4. Ajustar modulo afectado (schemas, repository, services, handlers, routes).
5. Actualizar seed cuando agregues catalogos o datos base.

## Troubleshooting

- Error de conexion a DB:
  - Verifica DATABASE_URL y permisos de escritura del archivo SQLite.
- Cliente Prisma desactualizado:
  - Ejecuta deno task prisma:generate.
- Datos locales inconsistentes:
  - Ejecuta deno task prisma:reset.

## Seguridad

- No subir .env.
- No subir dev.db ni otros archivos SQLite locales.
- No subir colecciones, dumps o exports con secretos.
- Mantener postman fuera del repositorio si incluye tokens o credenciales.
```
