// SI NO HAY EN LOCALSTORAGE CREAMOS UN ARRAY, SI HAY ENTONCES OBTENEMOS DEL LOCALSTORAGE
let tareasArr = JSON.parse(localStorage.getItem("tareas")) || [];

// OBTENEMOS EL ELEMENTO PADRE
const tareaPadre = document.querySelector(".tareas");

// OBTENEMOS EL ELEMENTO DE BOTON AGREGAR
const btnAgregar = document.getElementById("agregarTarea");

// VARIABLE QUE SIRVE PARA MANEJAR ESTADO DEL BOTON AGREGAR
let agregarActivo = false;

// VARIABLE QUE SIRVE PARA MANEJAR ESTADO DEL BOTON EDITAR
let editarActivo = false;

// OBTENEMOS EL ELEMENTO LUPA PARA BUSCAR
const buscadorBtnLupa = document.getElementById("buscarLupa");

// OBTENEMOS EL ELEMENTO INPUT PARA BUSCAR
const buscadorInput = document.getElementById("buscarTareas");

// OBTENEMOS EL ELEMENTO BOX DONDE ESTAN TODAS LAS TAREAS
const elementoTareasBox = document.querySelector(".tareas-box");

// OBTENEMOS EL ELEMENTO DE LA TAREA
// const elementoBoxTarea = document.querySelector(".tarea");

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
  if (editarActivo) {
    return;
  }
  if (!agregarActivo) {
    const {
      elementoTareaAgregar,
      elementoBtnCancelar,
      elementoInput,
      elementoBtnGuardar,
    } = elementoNuevaTarea();

    // UNA VEZ QUE ESTE AGREGANDO NUEVA TAREA SE VACIA EL INPUT DEL BUSCADOR
    document.getElementById("buscarTareas").value = "";

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

      if (tareasArr.length === 1) {
        // Seleccionamos el elemento y lo borramos
        document.querySelector(".vacio").remove();
      }

      // LIMPIAMOS EL BUSCADOR UNA VEZ AGREGADA LA TAREA
      document.getElementById("buscarTareas").value = "";

      // MOSTRAR LA ULTIMA TAREA AGREGADA SIN TENER QUE REINICIAR PAGINA
      // MOSTRAR TODAS LAS TAREAS DESPUES DE AGREGAR
      mostrarTareas();

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

// FUNCION QUE MUESTRA LA ULTIMA TAREA AGREGADA A LOS ELEMENTOS SIN TENER QUE REINICIAR PAGINA
// FUNCION QUE MUESTRA TODAS LAS TAREAS GUARDADAS DESPUES DE AGREGAR UNA NUEVA
const mostrarTareas = () => {
  if (tareasArr.length === 0) {
    elementoSinTareas();
    return;
  }

  while (tareaPadre.firstChild) {
    tareaPadre.removeChild(tareaPadre.firstChild);
  }

  tareasArr.forEach((tarea) => {
    const {
      elementoTituloTarea,
      elementoBtnEliminar,
      elementoTarea,
      elementoBtnEditar,
      elementoBotones,
    } = elementosTareas();
    elementoTituloTarea.textContent = tarea.titulo;

    // EVENTO EDITAR TAREA
    elementoBtnEditar.addEventListener("click", () => {
      // SI ESTAMOS EDITANDO Y EDITAR ACTIVO ES TRUE NO DEJA EDITAR OTRAS HASTA QUE TERMINEMOS DE EDITAR
      if (editarActivo) {
        return;
      }

      if (agregarActivo) {
        return;
      }

      editarActivo = true;

      // OCULTAMOS ELEMENTOS
      elementoBotones.style.display = "none";
      elementoTituloTarea.hidden = true;
      const {
        elementoInputEditar,
        elementoBtnGuardarEditar,
        elementoBtnCancelarEditar,
        elementoBtnsEditar,
      } = elementoEditar(elementoTarea);

      elementoInputEditar.focus();

      const editarTarea = () => {
        if (elementoInputEditar.value === "") {
          // UTILIZAMOS UN ALERT PERSONALIZADO
          Swal.fire({
            html: '<h1 class="sweet-alert">Debe escribir una tarea</h1>',
            icon: "error",
          });
          return;
        }
        // EDITAMOS Y AGREGAMOS EL VALOR DEL INPUT AL OBJETO Y PROPIEDAD TITULO
        tarea.titulo = elementoInputEditar.value;
        localStorage.setItem("tareas", JSON.stringify(tareasArr));

        elementoInputEditar.remove();
        elementoBtnsEditar.remove();
        elementoBotones.style.display = "flex";
        elementoTituloTarea.hidden = false;
        elementoTituloTarea.textContent = tarea.titulo;
        editarActivo = false;
      };

      // EVENTO GUARDAR TAREA EDITADA
      elementoBtnGuardarEditar.addEventListener("click", editarTarea);

      // FUNCION QUE CANCELA EDITAR TAREA
      const cancelarEditar = () => {
        editarActivo = false;
        elementoInputEditar.remove();
        elementoBtnsEditar.remove();
        elementoBotones.style.display = "flex";
        elementoTituloTarea.hidden = false;
        elementoTituloTarea.textContent = tarea.titulo;
      };

      // EVENTO QUE CANCELAR EDITAR TAREA
      elementoBtnCancelarEditar.addEventListener("click", cancelarEditar);
    });
    // EVENTO QUE ELIMINA EL ELEMENTO DE LA TAREA
    elementoBtnEliminar.addEventListener("click", () => {
      eliminarTarea(tarea, elementoTarea);
    });
  });
};

// FUNCION QUE OBTIENE EL VALOR DEL INPUT
const obtenerInputValor = () => {
  return document.getElementById("buscarTareas").value;
};

// FUNCION QUE BUSCA LAS TAREAS Y LAS MUESTRA + ELIMINA LA TAREA
const buscar = () => {
  if (agregarActivo) {
    return;
  }

  if (editarActivo) {
    return;
  }

  const inpBuscar = obtenerInputValor();

  const busqueda = tareasArr.filter((tarea) =>
    tarea.titulo.toLowerCase().includes(inpBuscar.toLowerCase().trim()),
  );

  while (tareaPadre.firstChild) {
    tareaPadre.removeChild(tareaPadre.firstChild);
  }

  busqueda.forEach((tarea) => {
    const {
      elementoTituloTarea,
      elementoBtnEliminar,
      elementoTarea,
      elementoBtnEditar,
      elementoBotones,
    } = elementosTareas();
    elementoTituloTarea.textContent = tarea.titulo;

    // EVENTO EDITAR TAREA
    elementoBtnEditar.addEventListener("click", () => {
      // SI ESTAMOS EDITANDO Y EDITAR ACTIVO ES TRUE NO DEJA EDITAR OTRAS HASTA QUE TERMINEMOS DE EDITAR
      if (editarActivo) {
        return;
      }

      editarActivo = true;

      // OCULTAMOS ELEMENTOS
      elementoBotones.style.display = "none";
      elementoTituloTarea.hidden = true;
      const {
        elementoInputEditar,
        elementoBtnGuardarEditar,
        elementoBtnCancelarEditar,
        elementoBtnsEditar,
      } = elementoEditar(elementoTarea);

      elementoInputEditar.focus();

      const editarTarea = () => {
        if (elementoInputEditar.value === "") {
          // UTILIZAMOS UN ALERT PERSONALIZADO
          Swal.fire({
            html: '<h1 class="sweet-alert">Debe escribir una tarea</h1>',
            icon: "error",
          });
          return;
        }
        // EDITAMOS Y AGREGAMOS EL VALOR DEL INPUT AL OBJETO Y PROPIEDAD TITULO
        tarea.titulo = elementoInputEditar.value;
        localStorage.setItem("tareas", JSON.stringify(tareasArr));

        elementoInputEditar.remove();
        elementoBtnsEditar.remove();
        elementoBotones.style.display = "flex";
        elementoTituloTarea.hidden = false;
        elementoTituloTarea.textContent = tarea.titulo;
        editarActivo = false;
      };

      // EVENTO GUARDAR TAREA EDITADA
      elementoBtnGuardarEditar.addEventListener("click", editarTarea);

      // FUNCION QUE CANCELA EDITAR TAREA
      const cancelarEditar = () => {
        editarActivo = false;
        elementoInputEditar.remove();
        elementoBtnsEditar.remove();
        elementoBotones.style.display = "flex";
        elementoTituloTarea.hidden = false;
        elementoTituloTarea.textContent = tarea.titulo;
      };

      // EVENTO QUE CANCELAR EDITAR TAREA
      elementoBtnCancelarEditar.addEventListener("click", cancelarEditar);
    });

    // EVENTO QUE ELIMINA EL ELEMENTO DE LA TAREA
    elementoBtnEliminar.addEventListener("click", () => {
      eliminarTarea(tarea, elementoTarea);
    });
  });
};

// FUNCION QUE ELIMINA LAS TAREAS SELECCIONADAS POR SU ID
const eliminarUltimaTareaAgregada = (ultimaTarea, elementoTarea) => {
  // FILTRAMOS HACIENDO QUE DEVUELVA UN ARRAY AL MISMO ARRAY ORIGINAL MEDIANTE TODOS SUS DATOS MENOS EL ID QUE COINCIDA CON EL QUE BORRAMOS
  tareasArr = tareasArr.filter((tareas) => tareas.id !== ultimaTarea.id);

  // VOLVEMOS A GURDAR EL NUEVO ARRAY AL LOCAL STORAGE
  localStorage.setItem("tareas", JSON.stringify(tareasArr));

  // ELIMINAMOS EL ELEMENTO DE LA TAREA BORRADA
  elementoTarea.remove();

  if (tareasArr.length === 0) {
    elementoSinTareas();
  }
};

// FUNCION QUE ELIMINA LAS TAREAS SELECCIONADAS POR SU ID
const eliminarTarea = (tarea, elementoTarea) => {
  // FILTRAMOS HACIENDO QUE DEVUELVA UN ARRAY AL MISMO ARRAY ORIGINAL MEDIANTE TODOS SUS DATOS MENOS EL ID QUE COINCIDA CON EL QUE BORRAMOS
  tareasArr = tareasArr.filter((tareas) => tareas.id !== tarea.id);

  // VOLVEMOS A GURDAR EL NUEVO ARRAY AL LOCAL STORAGE
  localStorage.setItem("tareas", JSON.stringify(tareasArr));

  // ELIMINAMOS EL ELEMENTO DE LA TAREA BORRADA
  elementoTarea.remove();

  if (tareasArr.length === 0) {
    elementoSinTareas();
  }
};

const elementoSinTareas = () => {
  const elementoVacio = document.createElement("p");
  elementoTareasBox.appendChild(elementoVacio);
  elementoVacio.classList.add("vacio");
  elementoVacio.textContent = "No hay Tareas";
};

const elementoEditar = (elementoTarea) => {
  const elementoInputEditar = document.createElement("input");
  const elementoBtnsEditar = document.createElement("div");
  const elementoBtnGuardarEditar = document.createElement("button");
  const elementoBtnCancelarEditar = document.createElement("button");
  const elementoIconoGuardarEditar = document.createElement("i");
  const elementoIconoCancelarEditar = document.createElement("i");

  elementoTarea.appendChild(elementoInputEditar);
  elementoTarea.appendChild(elementoBtnsEditar);
  elementoBtnsEditar.appendChild(elementoBtnGuardarEditar);
  elementoBtnsEditar.appendChild(elementoBtnCancelarEditar);
  elementoBtnGuardarEditar.appendChild(elementoIconoGuardarEditar);
  elementoBtnCancelarEditar.appendChild(elementoIconoCancelarEditar);

  elementoInputEditar.classList.add("inputEditar");
  elementoInputEditar.placeholder = "Escribir aqui";
  elementoBtnsEditar.classList.add("btns");
  elementoBtnGuardarEditar.classList.add("ri-save-fill");
  elementoBtnCancelarEditar.classList.add("ri-close-circle-fill");
  elementoBtnGuardarEditar.textContent = "Guardar";
  elementoBtnCancelarEditar.textContent = "Cancelar";

  return {
    elementoInputEditar,
    elementoBtnGuardarEditar,
    elementoBtnCancelarEditar,
    elementoBtnsEditar,
  };
};

// MAIN - EVENTOS
document.addEventListener("DOMContentLoaded", mostrarTareas);

btnAgregar.addEventListener("click", agregarTarea);

buscadorBtnLupa.addEventListener("click", buscar);

buscadorInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    buscar();
  }
});
