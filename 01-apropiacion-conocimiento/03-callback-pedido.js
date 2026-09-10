/**
 * EJERCICIO 3: Manejo de asincronía con Callbacks
 * Meta: comprender la ejecución diferida.
 *
 * Un callback es una función que se pasa como argumento a otra
 * función para que se ejecute DESPUÉS de que la tarea principal
 * finalice. Aquí procesarPedido simula un pedido de comida que
 * tarda 3 segundos y, al terminar, "llama de vuelta" al código
 * que le entregamos mediante el parámetro `callback`.
 */

function procesarPedido(callback) {
  console.log("Pedido recibido, preparando...");

  setTimeout(() => {
    // La tarea (preparar el pedido) ya terminó, ahora se ejecuta el callback
    callback("Pedido entregado");
  }, 3000);
}

procesarPedido((mensaje) => {
  console.log(mensaje);
});

console.log("El mesero sigue atendiendo otras mesas mientras se prepara el pedido...");
