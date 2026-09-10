/**
 * EJERCICIO 1: Explorando la asincronía básica
 * Meta: reconocer el orden real de ejecución en JavaScript.
 *
 * Análisis esperado:
 * "Inicio" y "Fin" son código SINCRÓNICO: se ejecutan de inmediato,
 * uno detrás del otro, sin esperar a nadie.
 * El setTimeout es ASINCRÓNICO: JavaScript lo delega a la Web API
 * del entorno (navegador/Node) y sigue ejecutando el resto del
 * programa sin bloquearse. Cuando pasan los 2 segundos, el callback
 * vuelve a la cola de tareas y se ejecuta cuando el hilo principal
 * (call stack) está vacío.
 */

console.log("Inicio");

setTimeout(() => {
  console.log("Operación asincrónica completada (2 segundos)");
}, 2000);

console.log("Fin");

// Orden real esperado en consola: Inicio -> Fin -> Operación asincrónica completada
