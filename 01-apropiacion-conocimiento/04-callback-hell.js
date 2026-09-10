/**
 * EJERCICIO 4: Encadenamiento de Callbacks (Callback Hell controlado)
 * Meta: mostrar la complejidad que aparece cuando las tareas
 * dependen unas de otras.
 *
 * Cada paso solo puede iniciar cuando el anterior terminó, y para
 * lograrlo anidamos un callback dentro de otro. Esto funciona, pero
 * a medida que crecen los pasos el código forma una "pirámide" hacia
 * la derecha, difícil de leer y de mantener: es el famoso "Callback Hell".
 */

function tomarDatos(callback) {
  setTimeout(() => {
    console.log("1) Datos tomados");
    callback({ datos: "datos crudos del cliente" });
  }, 1000);
}

function procesarDatos(datosRecibidos, callback) {
  setTimeout(() => {
    console.log("2) Datos procesados");
    callback({ ...datosRecibidos, procesado: true });
  }, 1000);
}

function mostrarResultado(resultado, callback) {
  setTimeout(() => {
    console.log("3) Resultado final:", resultado);
    callback();
  }, 1000);
}

// --- Aquí empieza el "callback hell": callback dentro de callback ---
tomarDatos((datos) => {
  procesarDatos(datos, (resultado) => {
    mostrarResultado(resultado, () => {
      console.log("Flujo completo (con callbacks anidados)");
    });
  });
});

/**
 * DOCUMENTACIÓN DEL PROBLEMA (callback hell):
 * - Cada nivel de anidación agrega una indentación más.
 * - Manejar errores requiere repetir validaciones en cada nivel.
 * - Es difícil seguir visualmente el orden real de ejecución.
 * - Este problema es justamente el que resuelven las Promesas (ejercicio 5).
 */
