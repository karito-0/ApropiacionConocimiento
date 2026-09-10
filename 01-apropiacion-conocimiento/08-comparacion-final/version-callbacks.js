/**
 * EJERCICIO 8: Comparación práctica final - VERSIÓN CON CALLBACKS
 * Flujo: Buscar usuario (1s) -> Consultar permisos (2s) -> Generar reporte (1s)
 * Meta: identificar ventajas y desventajas reales de cada técnica.
 */

function buscarUsuario(callback) {
  setTimeout(() => {
    callback("Usuario: Ana Torres");
  }, 1000);
}

function consultarPermisos(usuario, callback) {
  setTimeout(() => {
    callback(`${usuario} | Permisos: [lectura, escritura]`);
  }, 2000);
}

function generarReporteFinal(permisos, callback) {
  setTimeout(() => {
    callback(`Reporte generado -> ${permisos}`);
  }, 1000);
}

console.log("--- Iniciando consulta de usuario (CALLBACKS) ---");
const inicio = Date.now();

buscarUsuario((usuario) => {
  consultarPermisos(usuario, (permisos) => {
    generarReporteFinal(permisos, (reporte) => {
      console.log(reporte);
      console.log(`Tiempo total: ${Date.now() - inicio} ms`);
    });
  });
});

/**
 * DESVENTAJA evidente: 3 niveles de anidación para solo 3 pasos.
 * Con más pasos, el código sería cada vez más difícil de leer
 * y de manejar errores (habría que validar en cada callback).
 */
