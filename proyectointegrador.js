const prompt = require("prompt-sync")({ sigint: true });

let tareas = [];
let categoriasNombres = [
  "Trabajo",
  "Personal",
  //Agregar más categorias segun necesidad
];

function mostrarTodasLasCategorias(){
  console.log("Categorias existentes: ");
  categoriasNombres.forEach(function(categoria, indice){
    console.log(indice, ": "+ categoria);
  });
}

function agregarNuevaCategoriaPorElUsuario(nombreCategoria){
  categoriasNombres.push(nombreCategoria);
  console.log("Categoria "+ nombreCategoria+" agregada correctamente!");


}




//Funcion para agregar una nueva tarea al array
function agregarTarea(nombrerecibido, fechaLimiteRecibida = null) {

  mostrarTodasLasCategorias();
  let numeroCategoria = parseInt(prompt("Ingrese el numero de la categoria para la nueva tarea: "));

  if(numeroCategoria >=0 && numeroCategoria < categoriasNombres.length){

    tareas.push({
      nombre: nombrerecibido,
      completada: false,
      fechaLimite: fechaLimiteRecibida,
      categoria : numeroCategoria
    });
    console.log("Tarea agregada con exito!");

  }else{
    console.log("Numero de categoria incorrecto!");
  }
  
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
function modificarTarea(indice, nuevoNombre, nuevaFechaLimite = null, nuevoNumeroCategoria) {
  if (indice >= 0 && indice < tareas.length) {
    tareas[indice].nombre = nuevoNombre!== undefined ? nuevoNombre : tareas[indice].nombre;
    tareas[indice].fechaLimite = nuevaFechaLimite !== undefined ? nuevaFechaLimite : tareas[indice].fechaLimite;
    tareas[indice].categoria = nuevoNumeroCategoria !== undefined? nuevoNumeroCategoria :tareas[indice].categoria; 
    console.log("Tarea modificada con exito!");
  } else {
    console.log("Indice de tarea invalido");
  }
}


//Funcion que filtra tqareas por categorias

function filtrarTareasPorCategorias (numeroCategoria){
  let tareasFiltradas = tareas.filter(function(tarea){
    return tarea.categoria === numeroCategoria;

  });  
  return tareasFiltradas; 
}

//Funcio que muestra cantidad de tareas completadas

function contarTareasCompletadasPorCategoria(numeroCategoria){

  let tareasCategoria = filtrarTareasPorCategorias(numeroCategoria);
  let tareasCompletadas = tareasCategoria.reduce(function(contador, tarea){
    return tarea.completada ? contador +1 : contador;

  }, 0);

  let tareasEnTotal = tareasCategoria.length;

  console.log("Tareas completadas de la categoria " + numeroCategoria + ": " + tareasCompletadas + " de " + tareasEnTotal + " tareas! ");
}


//Funcion para mostrar todas las tareas no completadas

function mostrarTareasNoCompletadas(){
  console.log("Tareas no completadas: ");
  tareas.forEach(function(tarea){
    if(!tarea.completada){
      console.log("- Nombre: " +tarea.nombre + ", Categoria: "+categoriasNombres[tarea.categoria]);
    }
  });
}





//Funcion para mostrar el menú de opciones

function mostrarMenu() {
  console.log("-----Menú-----");
  console.log("1. Agregar tarea.");
  console.log("2. Eliminar tarea.");
  console.log("3. Marcar tarea como completada.");
  console.log("4. Modificar una tarea.");
  console.log("5. Mostrar todas las tareas");
  console.log("6. Ver todas las categorias");
  console.log("7. Agregar una nueva categoria");
  console.log("8. Filtrar tareas por categoria");
  console.log("9. Visualizar cantidad de tareas completadas por categoria");
  console.log("10. Visualizar todas las tareas no completadas");
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
        
        if(indice >= 0 && indice <tareas.length){
          
          let opcion =parseInt(prompt("¿Qué propiedad desea modificar?  1.Nombre, 2.Fecha Limita, 3. Numero de caegoria"));

          switch (opcion) {
            case 1:
              let nuevoNombre = prompt("Ingrese el nuevo nombre de su tarea: ");
              modificarTarea(indice, nuevoNombre);
              break;
            case 2:
              let nuevaFechaLimite = prompt("Ingrese la nueva fecha limite para su tarea: ");
              modificarTarea(indice, undefined, nuevaFechaLimite);
            break;
            case 3:
              let nuevoNumeroCategoria = parseInt(prompt("Ingrese nuevo numero de categoria: "));
              if(nuevoNumeroCategoria >= 0 && nuevoNumeroCategoria < categoriasNombres.length){
                modificarTarea(indice, undefined, undefined, nuevoNumeroCategoria);
                }
            break;
          
            default:
              break;
          }

        }else{
          console.log("Indice de tarea incorrecto");
        }


        break;
      case 5:
        console.log("----LISTA DE TAREAS----");
        console.log(tareas);
        break;
      case 6: 
          mostrarTodasLasCategorias();
        break;
      case 7:
        let nuevaCategoria = prompt("Ingrese el nombre de la nueva categoria a agregar: ");
        agregarNuevaCategoriaPorElUsuario(nuevaCategoria);

        break;
      case 8:
        mostrarTodasLasCategorias();
        let nroCategoria = parseInt(prompt("Ingrese el numero de la categoria a filtrar: "));
        let tareasCategoria = filtrarTareasPorCategorias(nroCategoria);
        console.log("Tareas de la categoria seleccionada: ");
        console.log(tareasCategoria)

        break;
      case 9:
        mostrarTodasLasCategorias();
        let nroCateg = parseInt(prompt("Ingrese el numero de la categoria a visualizar: "));
        contarTareasCompletadasPorCategoria(nroCateg);
        break;
      case 10:
        mostrarTareasNoCompletadas(); 
        break;

      default:
        console.log("Opcion invalida");
        break;
    }
  }
}

interactuarConUsuario();
