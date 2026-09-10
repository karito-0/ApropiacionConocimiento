# Actividades de Apropiación del Conocimiento — Asincronía en JavaScript
**Programa:** Tecnología en Análisis y Desarrollo de Software (3234206)
**Proyecto:** Construcción de software integrador de tecnologías orientadas a servicios
**Actividad de proyecto:** Introducción a la asincronía
**Guía base:** GFPI-F-135 V04 — "Introducción a la asincronía"
**Sección de la guía:** A. Actividades de apropiación del conocimiento

## 1. Objetivo

Resolver de manera progresiva los 8 ejercicios propuestos en la guía para
comprender los fundamentos de la asincronía en JavaScript: sincronía vs.
asincronía, código bloqueante, el event loop, y los tres mecanismos para
manejar tareas asincrónicas (**Callbacks**, **Promesas** y **Async/Await**).

Cada archivo `.js` está comentado explicando qué problema resuelve, la
decisión de diseño tomada, y un análisis del resultado real de ejecución.

## 2. Cómo ejecutar

Requiere [Node.js](https://nodejs.org/) instalado (probado con v22).

```bash
node 01-asincronia-basica.js
node 02-codigo-bloqueante.js
# etc. Cada archivo se ejecuta de forma independiente.
```

## 3. Ejercicios

### Ejercicio 1 — Asincronía básica (`01-asincronia-basica.js`)
`console.log("Inicio")`, un `setTimeout` de 2s y `console.log("Fin")`.
**Salida real:** `Inicio → Fin → Operación asincrónica completada`.
**Conclusión:** el código síncrono siempre corre primero; el callback del
`setTimeout` se ejecuta cuando el call stack está vacío.

### Ejercicio 2 — Código bloqueante (`02-codigo-bloqueante.js`)
Un ciclo `for` de 200 millones de iteraciones ocupa el hilo principal por
completo. **Salida real:** el ciclo tardó ~141 ms y durante ese tiempo nada
más pudo ejecutarse. A diferencia del `setTimeout`, este código no delega
nada a una Web API: bloquea literalmente el hilo.

### Ejercicio 3 — Callback simple (`03-callback-pedido.js`)
`procesarPedido(callback)` simula un pedido de comida de 3 segundos. El
callback es la función que "recibe el aviso" cuando la tarea principal
termina.

### Ejercicio 4 — Callback Hell controlado (`04-callback-hell.js`)
Tres pasos encadenados (`tomarDatos → procesarDatos → mostrarResultado`)
anidando callbacks. A más pasos, más anidación: el código forma una
"pirámide" difícil de leer y de depurar.

### Ejercicio 5 — De callbacks a promesas (`05-callbacks-a-promesas.js`)
Mismo flujo del ejercicio 4, mismo problema, pero usando `.then()`
encadenado. El código queda plano, sin anidación, y el manejo de errores
puede centralizarse en un único `.catch()`.

### Ejercicio 6 — Manejo de errores con promesas (`06-manejo-errores-promesas.js`)
Una promesa que falla ~50% de las veces, usando `resolve`/`reject` y
`.then().catch().finally()`. Sin `.catch()`, un `reject` no manejado puede
degradar la aplicación; el manejo de errores es obligatorio.

### Ejercicio 7 — Async/Await (`07-async-await.js`)
Una función `async` que usa `await` para esperar una promesa de 2 segundos.
**Salida real:** el mensaje posterior a `iniciar()` se imprime ANTES de que
lleguen los datos, comprobando que `await` no bloquea el hilo principal.

### Ejercicio 8 — Comparación práctica final (`08-comparacion-final/`)
Mismo flujo (`buscarUsuario` 1s → `consultarPermisos` 2s → `generarReporte`
1s) implementado en tres versiones:

| Versión | Archivo | Tiempo real medido |
|---|---|---|
| Callbacks | `version-callbacks.js` | ~4006 ms |
| Promesas | `version-promesas.js` | ~4005 ms |
| Async/Await | `version-async-await.js` | ~4006 ms |

**Conclusión:** el tiempo total es prácticamente idéntico en las tres
versiones (son pasos secuenciales por diseño). La diferencia real no es de
rendimiento, sino de **legibilidad y mantenibilidad**: Callbacks → anidación
creciente; Promesas → cadena plana con `.then()`; Async/Await → lectura
casi idéntica a código síncrono, con `try/catch` para errores.

## 4. Glosario aplicado

| Término | Aplicado en |
|---|---|
| **Bloqueante** | Ejercicio 2 |
| **No bloqueante** | Ejercicios 1, 3–8 |
| **Callback** | Ejercicios 3, 4 y versión callbacks del 8 |
| **Callback Hell** | Ejercicio 4 |
| **Promesa / resolve / reject** | Ejercicios 5 y 6 |
| **Async/Await** | Ejercicio 7 y versión async/await del 8 |

## 5. Repositorio relacionado

Los ejercicios de la sección B de la guía (Actividades de transferencia del
conocimiento) se encuentran en un repositorio separado:
[TransferenciaConocimiento](https://github.com/karito-0/TransferenciaConocimiento).
