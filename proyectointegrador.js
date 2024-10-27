const prompt = require("prompt-sync")({ sigint: true });

//Array para almacenar tareas
let tareas = [];

//Funcion para agregar una nueva tarea al array
function agregarTarea(nombrerecibido, fechaLimiteRecibida = null) {
  tareas.push({
    nombre: nombrerecibido,
    completada: false,
    fechaLimite: fechaLimiteRecibida,
  });
}

//Eliminar una tarea
function eliminarTarea(indice) {
  if (indice >= 0 && indice < tareas.length) {
    tareas.splice(indice, 1);
    console.log("¡Tarea eliminada correctamente!");
  } else {
    console.log("Índice de tarea inexistente");
  }
}

//Funcion paramarcar tarea como completada
function completarTarea(indice) {
  if (indice >= 0 && indice < tareas.length) {
    tareas[indice].completada = true;
    console.log("Tarea marcada como correcta!");
  } else {
    console.log("Indice de tarea invalido!");
  }
}

//funcion para modificar una tarea especifica
function modificarTarea(indice, nuevoNombre, nuevaFechaLimite = null) {
  if (indice >= 0 && indice < tareas.length) {
    tareas[indice].nombre = nuevoNombre;
    if (nuevaFechaLimite !== null) {
      tareas[indice].fechaLimite = nuevaFechaLimite;
    }
    console.log("Tarea modificada con exito!");
  } else {
    console.log("Indice de tarea invalido");
  }
}

//Funcion para mostrar el menú de opciones

function mostrarMenu() {
  console.log("-----Menú-----");
  console.log("1. Agregar tarea.");
  console.log("2. Eliminar tarea.");
  console.log("3. Marcar tarea como completada.");
  console.log("4. Modificar una tarea.");
  console.log("5. Mostrar todas las tareas");
  console.log("0. Salir");
}

//Funcion para interactuar con el usuario
function interactuarConUsuario() {
  let opcion = -1;

  while (opcion != 0) {
    mostrarMenu();
    opcion = parseInt(prompt("Ingrese la opcion  seleccionada: "));
    switch (opcion) {
      case 1:
        let nombreTareaNueva = prompt(
          "Ingrese el nombre de la tarea a cargar: "
        );
        agregarTarea(nombreTareaNueva);
        break;
      case 2:
        let indiceAEliminar = parseInt(
          prompt("Ingrese el nombre de la tarea a eliminar: ")
        );
        eliminarTareaTarea(indiceAEliminar);
        break;
      case 3:
        let indiceACompletar = parseInt(
          prompt("Ingrese el nombre de la tarea a completar: ")
        );
        completarTarea(indiceACompletar);
        break;
      case 4:
        let indice = parseInt(prompt("Ingrese el indice a modificar: "));
        let nuevoNombre = prompt("Ingrese el nuevo nombre de la tarea: ");
        modificarTarea(indice, nuevoNombre);
        break;
      case 5:
        console.log("----LISTA DE TAREAS----");
        console.log(tareas);
        break;

      default:
        console.log("Opcion invalida");
        break;
    }
  }
}

interactuarConUsuario();
