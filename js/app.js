// SI NO HAY EN LOCALSTORAGE CREAMOS UN ARRAY, SI HAY ENTONCES OBTENEMOS DEL LOCALSTORAGE
let tareasArr = JSON.parse(localStorage.getItem("tareas")) || [];

// OBTENEMOS EL ELEMENTO PADRE
const tareaPadre = document.querySelector(".tareas");

// OBTENEMOS EL ELEMENTO DE BOTON AGREGAR
const btnAgregar = document.getElementById("agregarTarea");

// VARIABLE QUE SIRVE PARA MANEJAR ESTADO DEL BOTON AGREGAR
let agregarActivo = false;

// OBTENEMOS EL ELEMENTO LUPA PARA BUSCAR
const buscadorBtnLupa = document.getElementById("buscarLupa");

// OBTENEMOS EL ELEMENTO INPUT PARA BUSCAR
const buscadorInput = document.getElementById("buscarTareas");

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
const crearTarea = (elementoInput) => {
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
        // UTILIZAMOS UN ALERT PERSONALIZADO
        Swal.fire({
          html: '<h1 class="sweet-alert">Debe ingresar una tarea</h1>',
          icon: "error",
        });
        return;
      }

      const tareasObj = crearTarea(elementoInput);

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

    // EVENTO QUE SE ACTIVA AL DAR TECLA ENTER DEL TECLADO, GUARDA LA TAREA EN LOCAL STORAGE
    elementoInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        guardar();
      }
    });

    // EVENTO QUE AL DAR CLICK ELIMINA EL ELEMENTO AGREGAR
    elementoBtnCancelar.addEventListener("click", eliminarElementoAgregar);
  }
};

// FUNCION QUE MUESTRA TODAS LAS TAREAS GUARDADAS
const mostrarTareas = () => {
  tareasArr.forEach((tarea) => {
    const { elementoTituloTarea, elementoBtnEliminar, elementoTarea } =
      elementosTareas();
    elementoTituloTarea.textContent = tarea.titulo;

    // FUNCION QUE ELIMINA LAS TAREAS SELECCIONADAS POR SU ID
    const eliminarTarea = () => {
      // FILTRAMOS HACIENDO QUE DEVUELVA UN ARRAY AL MISMO ARRAY ORIGINAL MEDIANTE TODOS SUS DATOS MENOS EL ID QUE COINCIDA CON EL QUE BORRAMOS
      tareasArr = tareasArr.filter((tareas) => tareas.id !== tarea.id);

      // VOLVEMOS A GURDAR EL NUEVO ARRAY AL LOCAL STORAGE
      localStorage.setItem("tareas", JSON.stringify(tareasArr));

      // ELIMINAMOS EL ELEMENTO DE LA TAREA BORRADA
      elementoTarea.remove();
    };

    // EVENTO QUE ELIMINA EL ELEMENTO DE LA TAREA
    elementoBtnEliminar.addEventListener("click", eliminarTarea);
  });
};

// FUNCION QUE MUESTRA LA ULTIMA TAREA AGREGADA A LOS ELEMENTOS SIN TENER QUE REINICIAR PAGINA
const mostrarUltimaTareaAgregada = () => {
  const ultimaTarea = tareasArr[tareasArr.length - 1];
  const { elementoTituloTarea, elementoBtnEliminar, elementoTarea } =
    elementosTareas();
  elementoTituloTarea.textContent = ultimaTarea.titulo;

  const eliminarUltimaTareaAgregada = () => {
    // FILTRAMOS HACIENDO QUE DEVUELVA UN ARRAY AL MISMO ARRAY ORIGINAL MEDIANTE TODOS SUS DATOS MENOS EL ID QUE COINCIDA CON EL QUE BORRAMOS
    tareasArr = tareasArr.filter((tareas) => tareas.id !== ultimaTarea.id);

    // VOLVEMOS A GURDAR EL NUEVO ARRAY AL LOCAL STORAGE
    localStorage.setItem("tareas", JSON.stringify(tareasArr));

    // ELIMINAMOS EL ELEMENTO DE LA TAREA BORRADA
    elementoTarea.remove();
  };

  // EVENTO QUE ELIMINA AL HACER CLICK LA ULTIMA TAREA AGREGADA
  elementoBtnEliminar.addEventListener("click", eliminarUltimaTareaAgregada);
};

const obtenerInputValor = () => {
  return document.getElementById("buscarTareas").value;
};

const buscar = () => {
  const inpBuscar = obtenerInputValor();

  const busqueda = tareasArr.filter((tarea) =>
    tarea.titulo.toLowerCase().includes(inpBuscar.toLowerCase().trim()),
  );

  while (tareaPadre.firstChild) {
    tareaPadre.removeChild(tareaPadre.firstChild);
  }

  busqueda.forEach((tarea) => {
    const { elementoTituloTarea, elementoBtnEliminar, elementoTarea } =
      elementosTareas();
    elementoTituloTarea.textContent = tarea.titulo;

    // FUNCION QUE ELIMINA LAS TAREAS SELECCIONADAS POR SU ID
    const eliminarTarea = () => {
      // FILTRAMOS HACIENDO QUE DEVUELVA UN ARRAY AL MISMO ARRAY ORIGINAL MEDIANTE TODOS SUS DATOS MENOS EL ID QUE COINCIDA CON EL QUE BORRAMOS
      tareasArr = tareasArr.filter((tareas) => tareas.id !== tarea.id);

      // VOLVEMOS A GURDAR EL NUEVO ARRAY AL LOCAL STORAGE
      localStorage.setItem("tareas", JSON.stringify(tareasArr));

      // ELIMINAMOS EL ELEMENTO DE LA TAREA BORRADA
      elementoTarea.remove();
    };

    // EVENTO QUE ELIMINA EL ELEMENTO DE LA TAREA
    elementoBtnEliminar.addEventListener("click", eliminarTarea);
  });
};

//

// MAIN - EVENTOS
document.addEventListener("DOMContentLoaded", mostrarTareas);

btnAgregar.addEventListener("click", agregarTarea);

buscadorBtnLupa.addEventListener("click", buscar);

buscadorInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    buscar();
  }
});
