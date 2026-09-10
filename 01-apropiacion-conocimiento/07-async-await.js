/**
 * EJERCICIO 7: Uso de Async/Await
 * Meta: comprender cómo await pausa la ejecución sin bloquear el hilo.
 *
 * `await` NO bloquea el hilo principal de JavaScript: internamente
 * sigue siendo una Promesa. Lo que hace es "pausar" la ejecución de
 * la función async en la que se encuentra, permitiendo que el resto
 * del programa (y del event loop) siga funcionando mientras se
 * espera el resultado.
 */

function obtenerDatos() {
  return new Promise((resolve) => {
    setTimeout(() => resolve("Datos listos desde el servidor"), 2000);
  });
}

async function iniciar() {
  console.log("Esperando datos...");
  const datos = await obtenerDatos(); // se "pausa" aquí sin bloquear el hilo
  console.log(datos);
  console.log("Función iniciar() terminada");
}

iniciar();

console.log("Este mensaje se imprime ANTES de que lleguen los datos,");
console.log("porque el hilo principal nunca se bloqueó.");
