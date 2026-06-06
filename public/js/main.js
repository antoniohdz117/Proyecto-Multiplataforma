let table;
let currentTable = "";

$(document).ready(function () {
  loadAlumnos();

  //boton generico para ver el item del tablero
  $("#mainTable").on("click", ".btn-view", function () {
    const data = table.row($(this).parents("tr")).data();

    const form = $("#viewForm");
    form.empty();

    for (let key in data) {
      if (typeof data[key] !== "object") {
        form.append(`
        <div class="mb-2">
          <label class="form-label">${key}</label>
          <input type="text" class="form-control" value="${data[key] ?? ""}" readonly>
        </div>
      `);
      }
    }

    const modal = new bootstrap.Modal(document.getElementById("viewModal"));
    modal.show();
  });

  // botones para profesorFields, entidades, y alumnos
  $("#btnAlumnos").click(function () {
    loadAlumnos();
  });

  $("#btnProfesores").click(function () {
    loadProfesores();
  });

  $("#btnEntidades").click(function () {
    loadEntidades();
  });

  $("#btnGrupos").click(function () {
    loadGrupos();
  });

  $("#btnNiveles").click(function () {
    loadNiveles();
  });

  $("#btnOfertas").click(function () {
    loadOfertas();
  });
  $("#btnCursos").click(function () {
    loadCursos();
  });
  $("#btnAsignaturas").click(function () {
    loadAsignaturas();
  });
  $("#btnPeriodos").click(function () {
    loadPeriodos();
  });

  $("#btnTiposCurso").click(function () {
    loadTiposCurso();
  });

  $("#btnOpenCreate").click(function () {
    if (currentTable === "alumnos") {
      openCreateAlumno();
    }

    if (currentTable === "profesores") {
      modalCreateProfesor();
    }

    if (currentTable === "entidades") {
      openCreateEntidad();
    }

    if (currentTable === "niveles") {
      openCreateNivel();
    }

    if (currentTable === "grupos") {
      openCreateGrupo();
    }
  });

  $("#btnCreate").click(function () {
    if (currentTable === "alumnos") {
      createAlumno();
    }

    if (currentTable === "profesores") {
      createProfesor();
    }

    if (currentTable === "entidades") {
      createEntidad();
    }

    if (currentTable === "niveles") {
      createNivel();
    }

    if (currentTable === "grupos") {
      createGrupo();
    }
  });

  $("#btnUpdate").click(function () {
    if (currentTable === "alumnos") {
      updateAlumno();
    }

    if (currentTable === "profesores") {
      updateProfesor();
    }

    if (currentTable === "entidades") {
      updateEntidad();
    }

    if (currentTable === "niveles") {
      updateNivel();
    }

    if (currentTable === "grupos") {
      updateGrupo();
    }
  });

  $("#mainTable").on("click", ".btn-view-alumno", function () {
    modalUpdateAlumno(this);
  });

  $("#mainTable").on("click", ".btn-delete-alumno", function () {
    deleteAlumno(this);
  });

  $("#mainTable").on("click", ".btn-view-profesor", function () {
    modalUpdateProfesor(this);
  });

  $("#mainTable").on("click", ".btn-delete-profesor", function () {
    deleteProfesor(this);
  });

  $("#mainTable").on("click", ".btn-view-entidad", function () {
    modalUpdateEntidad(this);
  });

  $("#mainTable").on("click", ".btn-delete-entidad", function () {
    deleteEntidad(this);
  });

  $("#mainTable").on("click", ".btn-view-nivel", function () {
    modalUpdateNivel(this);
  });

  $("#mainTable").on("click", ".btn-delete-nivel", function () {
    deleteNivel(this);
  });

  $("#mainTable").on("click", ".btn-view-grupo", function () {
    modalUpdateGrupo(this);
  });

  $("#mainTable").on("click", ".btn-delete-grupo", function () {
    deleteGrupo(this);
  });
});

//funcion para cerrar el formulario de crear o actualizar
function closeFormEntidad() {
  //CERAR MODAL
  $("#createSection").hide();

  // Limpiar formulario de crear
  $("#createForm").empty();

  // Limpiar formulario de ver/actualizar
  $("#viewForm").empty();
  // Cerrar modal de actualizar/ver si está abierto
  const modalElemento = document.getElementById("viewModal");

  if (modalElemento) {
    const modalInstance = bootstrap.Modal.getInstance(modalElemento);

    if (modalInstance) {
      modalInstance.hide();
    }
  }
}

function resetTable(headers) {
  //llamada de la funcioin para limpiar formularios
  closeFormEntidad();

  // Destruir tabla si ya existe
  if (table) {
    table.destroy();
  }

  $("#mainTable").empty();

  $("#mainTable").append(`
    <thead>
      <tr>${headers}</tr>
    </thead>
  `);
}
