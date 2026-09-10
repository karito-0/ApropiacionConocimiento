/**
 * EJERCICIO 6: Manejo de errores con Promesas
 * Meta: entender .catch() y la importancia del manejo de errores.
 *
 * Una promesa puede terminar de dos formas: resuelta (resolve) o
 * rechazada (reject). El método .then() maneja el caso exitoso y
 * .catch() captura cualquier rechazo, evitando que el programa se
 * rompa o que el error quede "silencioso".
 */

function procesoInestable() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const exito = Math.random() > 0.5; // ~50% de probabilidad de fallar

      if (exito) {
        resolve("Proceso completado exitosamente");
      } else {
        reject(new Error("El proceso falló durante la ejecución"));
      }
    }, 1000);
  });
}

procesoInestable()
  .then((resultado) => {
    console.log("Éxito:", resultado);
  })
  .catch((error) => {
    console.error("Error capturado:", error.message);
  })
  .finally(() => {
    console.log("Proceso finalizado (haya tenido éxito o no)");
  });

/**
 * NOTA IMPORTANTE:
 * Sin el .catch(), un reject no manejado generaría una
 * "UnhandledPromiseRejection" y, dependiendo del entorno, podría
 * detener la aplicación. Por eso el manejo de errores en promesas
 * es una buena práctica obligatoria, no opcional.
 */
