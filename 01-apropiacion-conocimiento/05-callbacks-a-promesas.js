/**
 * EJERCICIO 5: Transformando Callbacks en Promesas
 * Meta: visualizar cómo mejora la legibilidad respecto al Ejercicio 4.
 *
 * En lugar de recibir un callback, cada función ahora DEVUELVE una
 * Promesa. Esto permite encadenar los pasos con .then() en lugar de
 * anidarlos, quedando el código "plano" (sin pirámide) y mucho más
 * fácil de leer en el orden en que realmente ocurren las cosas.
 */

function tomarDatos() {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("1) Datos tomados");
      resolve({ datos: "datos crudos del cliente" });
    }, 1000);
  });
}

function procesarDatos(datosRecibidos) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("2) Datos procesados");
      resolve({ ...datosRecibidos, procesado: true });
    }, 1000);
  });
}

function mostrarResultado(resultado) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("3) Resultado final:", resultado);
      resolve();
    }, 1000);
  });
}

// --- Encadenamiento plano con .then(), sin anidación ---
tomarDatos()
  .then((datos) => procesarDatos(datos))
  .then((resultado) => mostrarResultado(resultado))
  .then(() => console.log("Flujo completo (con Promesas encadenadas)"));

/**
 * COMPARACIÓN CON EL EJERCICIO 4:
 * - El código ya no crece hacia la derecha (no hay pirámide).
 * - El orden de los pasos se lee de arriba hacia abajo, de forma lineal.
 * - Es mucho más fácil agregar manejo de errores con un solo .catch()
 *   al final de la cadena, en vez de repetirlo en cada callback.
 */
