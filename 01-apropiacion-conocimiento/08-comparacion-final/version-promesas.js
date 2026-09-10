/**
 * EJERCICIO 8: Comparación práctica final - VERSIÓN CON PROMESAS
 * Mismo flujo que la versión de callbacks, pero encadenado con .then()
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

console.log("--- Iniciando consulta de usuario (PROMESAS) ---");
const inicio = Date.now();

buscarUsuario()
  .then((usuario) => consultarPermisos(usuario))
  .then((permisos) => generarReporteFinal(permisos))
  .then((reporte) => {
    console.log(reporte);
    console.log(`Tiempo total: ${Date.now() - inicio} ms`);
  })
  .catch((error) => console.error("Error en el flujo:", error));

/**
 * VENTAJA: el código queda plano (sin anidación) y con un único
 * punto de manejo de errores (.catch) para toda la cadena.
 */
