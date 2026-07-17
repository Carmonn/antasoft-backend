export function generateClaveSignature(
  claves: { identificador_id: number; valor: string }[],
): string {
  const clave_signature = claves
    .map((item) => {
      return item.identificador_id + "_" + item.valor;
    })
    .join("__");
  return clave_signature;
}
