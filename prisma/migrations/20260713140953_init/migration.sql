-- CreateTable
CREATE TABLE "estados" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "clave" INTEGER NOT NULL,
    "nombre" TEXT NOT NULL,
    "abreviatura" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "municipios" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "estado_id" INTEGER NOT NULL,
    "clave" INTEGER NOT NULL,
    "nombre" TEXT NOT NULL,
    CONSTRAINT "municipios_estado_id_fkey" FOREIGN KEY ("estado_id") REFERENCES "estados" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "permisos" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "identificador" TEXT NOT NULL,
    "asignable" BOOLEAN NOT NULL
);

-- CreateTable
CREATE TABLE "medios" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "trabajos" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "estatus_asignaciones" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "personas" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "alias" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "apellido_paterno" TEXT,
    "apellido_materno" TEXT,
    "fecha_nacimiento" DATETIME
);

-- CreateTable
CREATE TABLE "contactos" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "medio_id" INTEGER NOT NULL,
    "persona_id" INTEGER NOT NULL,
    "valor" TEXT NOT NULL,
    CONSTRAINT "contactos_medio_id_fkey" FOREIGN KEY ("medio_id") REFERENCES "medios" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "contactos_persona_id_fkey" FOREIGN KEY ("persona_id") REFERENCES "personas" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "personas_municipios" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "persona_id" INTEGER NOT NULL,
    "municipio_id" INTEGER NOT NULL,
    CONSTRAINT "personas_municipios_municipio_id_fkey" FOREIGN KEY ("municipio_id") REFERENCES "municipios" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "personas_municipios_persona_id_fkey" FOREIGN KEY ("persona_id") REFERENCES "personas" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "estados_clave_key" ON "estados"("clave");

-- CreateIndex
CREATE UNIQUE INDEX "estados_nombre_key" ON "estados"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "municipios_estado_id_clave_key" ON "municipios"("estado_id", "clave");

-- CreateIndex
CREATE UNIQUE INDEX "permisos_nombre_key" ON "permisos"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "permisos_identificador_key" ON "permisos"("identificador");

-- CreateIndex
CREATE UNIQUE INDEX "medios_nombre_key" ON "medios"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "trabajos_nombre_key" ON "trabajos"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "estatus_asignaciones_nombre_key" ON "estatus_asignaciones"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "personas_alias_nombre_apellido_paterno_apellido_materno_key" ON "personas"("alias", "nombre", "apellido_paterno", "apellido_materno");

-- CreateIndex
CREATE INDEX "contactos_persona_id_idx" ON "contactos"("persona_id");

-- CreateIndex
CREATE UNIQUE INDEX "contactos_medio_id_persona_id_valor_key" ON "contactos"("medio_id", "persona_id", "valor");

-- CreateIndex
CREATE INDEX "personas_municipios_municipio_id_idx" ON "personas_municipios"("municipio_id");

-- CreateIndex
CREATE UNIQUE INDEX "personas_municipios_persona_id_municipio_id_key" ON "personas_municipios"("persona_id", "municipio_id");
