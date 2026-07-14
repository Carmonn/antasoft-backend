import type { Context, MiddlewareHandler } from "hono";
import { OpenAPIHono } from "@hono/zod-openapi";
import { PrismaClient } from "@/generated/client.ts";
import { PrismaLibSql } from "@prisma/adapter-libsql";
import { Scalar } from "@scalar/hono-api-reference";

import { AppError } from "./shared/AppError.ts";
import { toApiError } from "@/shared/mapper.ts";

import estadosRoutes from "@/modules/catalogos/estados/routes/router.ts";
import municipiosRoutes from "@/modules/catalogos/municipios/routes/router.ts";
import permisosRoutes from "@/modules/catalogos/permisos/routes/router.ts";
import mediosRoutes from "@/modules/catalogos/medios/routes/router.ts";
import trabajosRoutes from "@/modules/catalogos/trabajos/routes/router.ts";
import estatusAsignacionesRoutes from "@/modules/catalogos/estatusAsignaciones/routes/router.ts";
import estatusHonorariosRoutes from "@/modules/catalogos/estatusHonorarios/routes/router.ts";

import personasRoutes from "@/modules/personas/routes/router.ts";

import rolesRoutes from "@/modules/usuarios/roles/routes/router.ts";

// ----- Type Definition on the app -----
export type AppEnv = { Variables: { prisma: PrismaClient } };

const app = new OpenAPIHono<AppEnv>();

// ----- Prisma Middleware -----
const adapter = new PrismaLibSql({
  url: Deno.env.get("DATABASE_URL")!,
});
const prisma = new PrismaClient({ adapter });
app.use("*", (c, next) => {
  if (!c.get("prisma")) {
    c.set("prisma", prisma);
  }
  return next();
});

//----- API Reference -----
app.use(
  "/docs",
  Scalar({ url: "/docs/openapi.json" }) as unknown as MiddlewareHandler<AppEnv>,
);
app.doc("/docs/openapi.json", {
  openapi: "3.0.0",
  info: {
    version: "1.0.0",
    title: "Antasoft API",
  },
});

//----- Error handling -----
app.onError((err, c) => {
  if (err instanceof AppError) {
    return c.json(toApiError(err.code, err.message, err.details), err.status);
  }
  console.error(err);
  return c.json(toApiError("INTERNAL_ERROR", "Algo salió mal"), 500);
});

// ----- Routes -----
app.get("/", (c: Context) => {
  return c.text("Hello Hono!");
});

app.route("/catalogos/estados", estadosRoutes);
app.route("/catalogos/municipios", municipiosRoutes);
app.route("/catalogos/permisos", permisosRoutes);
app.route("/catalogos/medios", mediosRoutes);
app.route("/catalogos/trabajos", trabajosRoutes);
app.route("/catalogos/estatus-asignaciones", estatusAsignacionesRoutes);
app.route("/catalogos/estatus-honorarios", estatusHonorariosRoutes);

app.route("/personas", personasRoutes);

app.route("/usuarios/roles", rolesRoutes);

Deno.serve(app.fetch);
console.log("📄 Docs: http://localhost:8000/docs");
