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

-- CreateIndex
CREATE UNIQUE INDEX "estados_clave_key" ON "estados"("clave");

-- CreateIndex
CREATE UNIQUE INDEX "estados_nombre_key" ON "estados"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "municipios_estado_id_clave_key" ON "municipios"("estado_id", "clave");
