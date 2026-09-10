/**
 * EJERCICIO 8: Comparación práctica final - VERSIÓN CON ASYNC/AWAIT
 * Mismo flujo, pero escrito de forma casi idéntica a código sincrónico.
 */

function buscarUsuario() {
  return new Promise((resolve) => {
    setTimeout(() => resolve("Usuario: Ana Torres"), 1000);
  });
}

function consultarPermisos(usuario) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(`${usuario} | Permisos: [lectura, escritura]`), 2000);
  });
}

function generarReporteFinal(permisos) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(`Reporte generado -> ${permisos}`), 1000);
  });
}

async function consultaCompleta() {
  console.log("--- Iniciando consulta de usuario (ASYNC/AWAIT) ---");
  const inicio = Date.now();

  try {
    const usuario = await buscarUsuario();
    const permisos = await consultarPermisos(usuario);
    const reporte = await generarReporteFinal(permisos);

    console.log(reporte);
    console.log(`Tiempo total: ${Date.now() - inicio} ms`);
  } catch (error) {
    console.error("Error en el flujo:", error);
  }
}

consultaCompleta();

/**
 * VENTAJA: es la forma más legible de las tres. Se lee como código
 * sincrónico de arriba hacia abajo, pero sigue siendo asincrónico
 * (no bloquea el hilo). El try/catch reemplaza al .catch() de forma
 * muy natural.
 *
 * CONCLUSIÓN DEL EJERCICIO 8 (para las tres versiones):
 * - Callbacks: funcionan, pero generan anidación y dificultan el
 *   manejo de errores a medida que crecen los pasos.
 * - Promesas: eliminan la anidación con .then() encadenado y
 *   centralizan errores en un solo .catch().
 * - Async/Await: es "azúcar sintáctico" sobre las promesas; ofrece
 *   la mejor legibilidad y un manejo de errores muy similar al
 *   código síncrono tradicional (try/catch).
 * - El tiempo total en las tres versiones es equivalente (~4 segundos),
 *   porque los pasos son secuenciales por diseño (cada uno depende
 *   del resultado del anterior); la diferencia está en la LEGIBILIDAD
 *   y mantenibilidad del código, no en el rendimiento.
 */
