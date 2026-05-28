// SI NO HAY EN LOCALSTORAGE CREAMOS UN ARRAY, SI HAY ENTONCES OBTENEMOS DEL LOCALSTORAGE
let tareasArr = JSON.parse(localStorage.getItem("tareas")) || [];

// OBTENEMOS EL ELEMENTO PADRE
const tareaPadre = document.querySelector(".tareas");

// OBTENEMOS EL ELEMENTO DE BOTON AGREGAR
const btnAgregar = document.getElementById("agregarTarea");

// VARIABLE QUE SIRVE PARA MANEJAR ESTADO DEL BOTON AGREGAR
let agregarActivo = false;

// FUNCION QUE CREA ELEMENTO PARA AGREGAR TAREA
const elementoNuevaTarea = () => {
  const elementoTareaAgregar = document.createElement("div");
  const elementoInput = document.createElement("input");
  const elementoBtns = document.createElement("div");
  const elementoBtnGuardar = document.createElement("button");
  const elementoBtnCancelar = document.createElement("button");
  const elementoIconoGuardar = document.createElement("i");
  const elementoIconoCancelar = document.createElement("i");

  tareaPadre.appendChild(elementoTareaAgregar);
  elementoTareaAgregar.appendChild(elementoInput);
  elementoTareaAgregar.appendChild(elementoBtns);
  elementoBtns.appendChild(elementoBtnGuardar);
  elementoBtns.appendChild(elementoBtnCancelar);
  elementoBtnGuardar.appendChild(elementoIconoGuardar);
  elementoBtnCancelar.appendChild(elementoIconoCancelar);

  elementoTareaAgregar.classList.add("tarea-agregar");
  elementoInput.type = "text";
  elementoInput.id = "tareaInput";
  elementoInput.placeholder = "Escriba una Tarea";
  elementoBtns.classList.add("btns-add-cancel");
  elementoBtnGuardar.id = "btnGuardar";
  elementoBtnCancelar.id = "btnCancelar";
  elementoIconoGuardar.classList.add("ri-save-fill");
  elementoIconoCancelar.classList.add("ri-close-circle-fill");
  elementoIconoGuardar.textContent = "Guardar";
  elementoIconoCancelar.textContent = "Cancelar";

  return {
    elementoTareaAgregar,
    elementoInput,
    elementoBtnGuardar,
    elementoBtnCancelar,
  };
};

// FUNCION QUE CREA ELEMENTOS PARA MOSTRAR AHI LAS TAREAS
const elementosTareas = () => {
  const elementoTarea = document.createElement("div");
  const elementoTituloTarea = document.createElement("h2");
  const elementoBotones = document.createElement("div");
  const elementoBtnEditar = document.createElement("button");
  const elementoBtnEliminar = document.createElement("button");
  const elementoIconoEditar = document.createElement("i");
  const elementoIconoEliminar = document.createElement("i");

  tareaPadre.appendChild(elementoTarea);
  elementoTarea.appendChild(elementoTituloTarea);
  elementoTarea.appendChild(elementoBotones);
  elementoBotones.appendChild(elementoBtnEditar);
  elementoBotones.appendChild(elementoBtnEliminar);
  elementoBtnEditar.appendChild(elementoIconoEditar);
  elementoBtnEliminar.appendChild(elementoIconoEliminar);

  elementoTarea.classList.add("tarea");
  elementoBotones.classList.add("btns");
  elementoIconoEditar.classList.add("ri-edit-fill");
  elementoIconoEliminar.classList.add("ri-delete-bin-7-fill");
  elementoIconoEditar.textContent = "Editar";
  elementoIconoEliminar.textContent = "Eliminar";

  return {
    elementoTarea,
    elementoTituloTarea,
    elementoBotones,
    elementoBtnEditar,
    elementoBtnEliminar,
  };
};

// CREAMOS OBJETO CON EL VALOR DEL INPUT Y CON UN ID ALEATORIO Y UNICO,
const objTareas = (elementoInput) => {
  let id = Date.now();
  return {
    id,
    titulo: elementoInput.value,
  };
};

// FUNCION PARA AGREGAR TAREA
const agregarTarea = () => {
  if (!agregarActivo) {
    const {
      elementoTareaAgregar,
      elementoBtnCancelar,
      elementoInput,
      elementoBtnGuardar,
    } = elementoNuevaTarea();

    // FUNCION QUE ELIMINA ELEMENTO AGREGAR
    const eliminarElementoAgregar = () => {
      elementoTareaAgregar.remove();
      agregarActivo = false;
    };

    // DAMOS SUAVIDAD AL BAJAR PARA IR AL INPUT
    elementoInput.scrollIntoView({ behavior: "smooth" });

    // QUEDA SELECCIONADO PARA ESCRIBIR EL INPUT
    elementoInput.focus();

    // FUNCION QUE VALIDA Y GUARDA EL VALOR DEL INPUT AL LOCAL STORAGE
    const guardar = () => {
      if (elementoInput.value === "") {
        alert("Debe ingresar una tarea");
        return;
      }

      const tareasObj = objTareas(elementoInput);

      // GUARDAMOS EL OBJETO CON SUS DATOS AL ARRAY
      tareasArr.push(tareasObj);

      // GUARDAMOS EL ARRAY EN EL LOCAL STORAGE
      localStorage.setItem("tareas", JSON.stringify(tareasArr));

      // MOSTRAR LA ULTIMA TAREA AGREGADA SIN TENER QUE REINICIAR PAGINA
      mostrarUltimaTareaAgregada();

      // ELIMINAMOS EL ELEMENTO DEL AGREGAR UNA VEZ GUARDADO
      eliminarElementoAgregar();
    };

    agregarActivo = true;

    // EVENTO QUE AL DAR CLICK AGREGA LA TAREA EN LOCALSTORAGE
    elementoBtnGuardar.addEventListener("click", guardar);

    // EVENTO QUE AL DAR CLICK ELIMINA EL ELEMENTO AGREGAR
    elementoBtnCancelar.addEventListener("click", eliminarElementoAgregar);
  }
};

// FUNCION QUE MUESTRA TODAS LAS TAREAS GUARDADAS
const mostrarTareas = () => {
  tareasArr.forEach((tarea) => {
    const { elementoTituloTarea } = elementosTareas();
    elementoTituloTarea.textContent = tarea.titulo;
  });
};

// FUNCION QUE MUESTRA LA ULTIMA TAREA AGREGADA A LOS ELEMENTOS SIN TENER QUE REINICIAR PAGINA
const mostrarUltimaTareaAgregada = () => {
  const ultimaTarea = tareasArr[tareasArr.length - 1];
  const { elementoTituloTarea } = elementosTareas();
  elementoTituloTarea.textContent = ultimaTarea.titulo;
};

// MAIN - EVENTOS
document.addEventListener("DOMContentLoaded", mostrarTareas);

btnAgregar.addEventListener("click", agregarTarea);

// localStorage.clear();
