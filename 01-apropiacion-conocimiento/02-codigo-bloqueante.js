/**
 * EJERCICIO 2: Identificando código bloqueante
 * Meta: evidenciar cómo una tarea pesada bloquea el hilo principal.
 *
 * Análisis esperado:
 * El ciclo `for` corre en el hilo principal (call stack) y JavaScript
 * NO puede atender nada más -ni siquiera un console.log posterior o
 * un evento del usuario- hasta que el ciclo entero termine. Esto es
 * código BLOQUEANTE: ocupa el único hilo de ejecución por completo.
 * A diferencia del setTimeout del ejercicio 1, aquí no hay ninguna
 * Web API que se encargue de "esperar" por nosotros: todo el trabajo
 * pesado se hace de forma síncrona.
 */

console.log("Inicio");

const inicio = Date.now();
let contador = 0;

// Ciclo que cuenta hasta varios millones (tarea pesada y bloqueante)
for (let i = 0; i < 200_000_000; i++) {
  contador += 1;
}

const duracion = Date.now() - inicio;

console.log(`Ciclo bloqueante terminado. Contador final: ${contador}`);
console.log(`Duración del bloqueo: ${duracion} ms`);
console.log("Fin");

// Mientras el ciclo corría, el programa NO podía hacer nada más:
// eso es exactamente lo que se busca evidenciar en este ejercicio.
