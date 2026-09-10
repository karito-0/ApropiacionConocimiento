# Proyecto: Asincronía en JavaScript
**Programa:** Tecnología en Análisis y Desarrollo de Software (3234206)
**Proyecto:** Construcción de software integrador de tecnologías orientadas a servicios
**Actividad de proyecto:** Introducción a la asincronía
**Guía base:** GFPI-F-135 V04 — "Introducción a la asincronía"

## 1. Objetivo del proyecto

Documentar y resolver, de forma progresiva y práctica, los tres pilares de la
asincronía en JavaScript (**Callbacks**, **Promesas** y **Async/Await**),
desarrollando todos los ejercicios propuestos en las secciones **A. Actividades
de apropiación del conocimiento** y **B. Actividades de transferencia del
conocimiento** de la guía de aprendizaje.

Cada archivo `.js` está comentado explicando:
- Qué problema resuelve.
- Qué decisión de diseño se tomó y por qué.
- Un análisis del resultado real de ejecución (tiempos y orden).

## 2. Cómo ejecutar los ejercicios

Requiere tener [Node.js](https://nodejs.org/) instalado (usado v22 para las pruebas).

```bash
node 01-apropiacion-conocimiento/01-asincronia-basica.js
node 02-transferencia-conocimiento/05-integracion-servicios.js
# etc. Cada archivo se ejecuta de forma independiente.
```

Todos los archivos fueron probados y verificados; las salidas reales obtenidas
se documentan en cada sección de este README.

---

## 3. A. Actividades de apropiación del conocimiento

Corresponde a la sección donde se avanza "desde los fundamentos hasta los
mecanismos más utilizados para manejar procesos asincrónicos".

### Ejercicio 1 — Asincronía básica (`01-asincronia-basica.js`)
`console.log("Inicio")`, un `setTimeout` de 2s y `console.log("Fin")`.
**Salida real:** `Inicio → Fin → Operación asincrónica completada`.
**Conclusión:** el código síncrono (Inicio/Fin) siempre corre primero; el
callback del `setTimeout` se ejecuta cuando el call stack está vacío.

### Ejercicio 2 — Código bloqueante (`02-codigo-bloqueante.js`)
Un ciclo `for` de 200 millones de iteraciones ocupa el hilo principal por
completo.
**Salida real:** el ciclo bloqueante tardó ~141 ms y durante ese tiempo nada
más pudo ejecutarse. **Conclusión:** a diferencia del `setTimeout`, este
código no delega nada a una Web API: bloquea literalmente el hilo.

### Ejercicio 3 — Callback simple (`03-callback-pedido.js`)
`procesarPedido(callback)` simula un pedido de comida de 3 segundos.
**Conclusión:** el callback es la función que "recibe el aviso" cuando la
tarea principal termina.

### Ejercicio 4 — Callback Hell controlado (`04-callback-hell.js`)
Tres pasos encadenados (`tomarDatos → procesarDatos → mostrarResultado`)
anidando callbacks. **Conclusión documentada:** a más pasos, más anidación;
el código forma una "pirámide" difícil de leer y de depurar.

### Ejercicio 5 — De callbacks a promesas (`05-callbacks-a-promesas.js`)
Mismo flujo del ejercicio 4, mismo problema, pero usando `.then()`
encadenado. **Conclusión:** el código queda plano, sin anidación, y el
manejo de errores puede centralizarse en un único `.catch()`.

### Ejercicio 6 — Manejo de errores con promesas (`06-manejo-errores-promesas.js`)
Una promesa que falla ~50% de las veces (`Math.random()`), usando
`resolve`/`reject` y `.then().catch().finally()`.
**Conclusión:** sin `.catch()`, un `reject` no manejado puede detener o
degradar la aplicación; por eso el manejo de errores es obligatorio.

### Ejercicio 7 — Async/Await (`07-async-await.js`)
Una función `async` que usa `await` para esperar una promesa de 2 segundos.
**Salida real:** el mensaje posterior a `iniciar()` se imprime ANTES de que
lleguen los datos, comprobando que `await` no bloquea el hilo principal.

### Ejercicio 8 — Comparación práctica final (`08-comparacion-final/`)
Se implementó el mismo flujo (`buscarUsuario` 1s → `consultarPermisos` 2s →
`generarReporte` 1s) en **tres versiones**:

| Versión | Archivo | Tiempo real medido |
|---|---|---|
| Callbacks | `version-callbacks.js` | ~4006 ms |
| Promesas | `version-promesas.js` | ~4005 ms |
| Async/Await | `version-async-await.js` | ~4006 ms |

**Conclusión:** el tiempo total es prácticamente idéntico en las tres
versiones (son pasos secuenciales por diseño, cada uno depende del
anterior). La diferencia real entre las técnicas no es de rendimiento, sino
de **legibilidad y mantenibilidad**: Callbacks → anidación creciente;
Promesas → cadena plana con `.then()`; Async/Await → lectura casi idéntica a
código síncrono, con `try/catch` para errores.

---

## 4. B. Actividades de transferencia del conocimiento

Ejercicios integradores que combinan procesos secuenciales, paralelos, con
dependencias y con manejo de errores, tal como exige la guía.

### 1. Gestión de una cola de atención (`01-cola-atencion.js`)
**Requisito de la guía:** procesar solicitudes de forma secuencial (una a la
vez), registrando inicio/fin y tiempo total.
**Decisión de diseño:** `async/await` dentro de un `for...of`, que espera
cada solicitud antes de iniciar la siguiente.
**Resultado real:** orden de atención = orden de llegada; tiempo total
(~4006 ms) = suma de los 4 tiempos individuales, confirmando que el proceso
es intencionalmente secuencial.

### 2. Entrega de paquetes con tiempos variables (`02-entrega-paquetes.js`)
**Requisito de la guía:** ejecutar entregas en paralelo, registrar el orden
real de finalización y reportar errores sin detener las demás entregas.
**Decisión de diseño:** `Promise.allSettled()`, porque espera a que TODAS las
promesas terminen (con éxito o error) sin abortar ante el primer fallo —
justo lo que pide el enunciado ("mostrar errores si alguna entrega falla" sin
detener el proceso).
**Resultado real:** con paquetes de 900–2200 ms, el tiempo total del proceso
fue de ~2200 ms (el más lento), no la suma de todos (~5700 ms), demostrando
la ventaja de la ejecución en paralelo. Se simuló un 20% de probabilidad de
fallo por paquete y el informe final separa exitosos de fallidos
correctamente.

### 3. Validación de formulario con verificaciones externas (`03-validacion-formulario.js`)
**Requisito de la guía:** ejecutar 3 validaciones en paralelo, pero continuar
solo si TODAS son exitosas.
**Decisión de diseño:** `Promise.all()`, que se comporta de forma "fail-fast":
se rechaza en cuanto UNA validación falla, sin esperar a las demás.
**Resultado real:**
- Caso válido: las tres validaciones (800/1200/600 ms) corren en paralelo;
  tiempo total ~1201 ms (el más lento), resultado: *"Formulario validado"*.
- Caso con correo inválido: el proceso terminó en ~800 ms (el tiempo del
  campo que falló, no el más lento), resultado: *"Validación fallida"*.

### 4. Procesamiento de pedidos con pasos obligatorios y opcionales (`04-procesamiento-pedidos.js`)
**Requisito de la guía:** pasos obligatorios en orden estricto; un paso
opcional que no bloquee el flujo; la factura depende de los dos primeros
pasos obligatorios.
**Decisión de diseño:**
- `validarStock` → `calcularCostos` → `enviarFactura`: secuenciales con
  `await`, porque cada uno depende lógicamente del control del flujo
  anterior.
- `generarRecomendaciones` (opcional, 1500 ms) se lanza en paralelo justo
  después del paso 2, sin bloquear el envío de la factura, y con su propio
  `.catch()` para que un fallo en ella nunca detenga el flujo obligatorio.
**Resultado real:** orden real de ejecución =
`[validarStock, calcularCostos, enviarFactura, generarRecomendaciones]`;
la factura se generó sin esperar a que terminaran las recomendaciones
(aunque en este caso ambas terminaron antes de imprimir el resumen final).

### 5. Integración de servicios con dependencias (`05-integracion-servicios.js`)
**Requisito de la guía:** servicios A, B y C en paralelo; servicio D depende
de B y C; manejo de errores aislados y globales.
**Decisión de diseño:** `Promise.all([A, B, C])` para las tareas
independientes, y solo tras resolverse se invoca a D usando los resultados
de B y C como parámetros.
**Resultado real:**
- Caso exitoso: A (600 ms), B (1000 ms) y C (800 ms) en paralelo tardan
  ~1000 ms (el más lento, B); luego D (700 ms) se ejecuta secuencialmente
  tras ellos. Tiempo total real: ~1702 ms, muy cercano al valor teórico
  1000 + 700 = 1700 ms.
- Caso con fallo en B: `Promise.all()` se rechaza a los ~1000 ms (cuando B
  falla), el sistema nunca intenta llamar a D (porque depende de un servicio
  que falló) y el estado general se reporta como *"Error general"*.

---

## 5. Glosario aplicado (resumen)

| Término | Aplicado en este proyecto |
|---|---|
| **Bloqueante** | Ejercicio 2 (ciclo `for` pesado) |
| **No bloqueante** | Ejercicios 1, 3–8 (setTimeout, promesas, await) |
| **Callback** | Ejercicios 3, 4 y versión callbacks del ejercicio 8 |
| **Callback Hell** | Ejercicio 4 |
| **Promesa / resolve / reject** | Ejercicios 5, 6 y transferencia 2, 3 |
| **`Promise.all()`** (fail-fast) | Transferencia 3 y 5 |
| **`Promise.allSettled()`** (tolerante a fallos) | Transferencia 2 |
| **Async/Await** | Ejercicio 7, versión async/await del 8, y todos los de transferencia |
| **Dependencias entre tareas asincrónicas** | Transferencia 4 y 5 |
| **Concurrencia vs. paralelismo de tareas independientes** | Transferencia 2 y 5 |

## 6. Evidencias de aprendizaje

- ✅ Código fuente en archivos separados por ejercicio (esta carpeta).
- ✅ Comentarios en el código explicando el uso de callbacks, promesas y
  async/await, y por qué se eligió cada uno.
- ✅ Análisis de resultados (tiempos y orden real de ejecución) documentado
  al final de cada archivo y resumido en este README.
- Pendiente por parte del aprendiz: registrar los *commits* del proceso en
  un repositorio de GitHub, tal como solicita la guía en la sección de
  Estrategias didácticas activas ("Uso de GitHub como portafolio de
  evidencias").
