let selectedAlumnoId = null;

// campos que seran llenados, no hacerlo dinamico
const alumnoFields = [
  "numero_cuenta",
  "nombre",
  "apellido_paterno",
  "apellido_materno",
  "curp",
  "telefono",
  "sexo",
  "correo_electronico",
  "fecha_nacimiento",

  "id_entidad",
];

//calendario apra evitar errores de usuario
function getInputTypeAlumno(field) {
  if (field === "fecha_nacimiento") {
    return "date";
  }
  return "text";
}

//carga de archvios en la tabla
function loadAlumnos() {
  currentTable = "alumnos";
  selectedAlumnoId = null;

  resetTable(`
    <th>numero_cuenta</th>
    <th>nombre</th>
    <th>apellido_paterno</th>
    <th>apellido_materno</th>
    <th>curp</th>
    <th>telefono</th>
    <th>sexo</th>
    <th>correo_electronico</th>
    <th>fecha_nacimiento</th>
    
    <th>id_entidad</th>
    <th>Actions</th>
  `);

  table = $("#mainTable").DataTable({
    ajax: {
      url: "/api/alumnos",
      dataSrc: "alumnos",
    },
    scrollX: true,
    autoWidth: false,
    destroy: true,
    columns: [
      { data: "numero_cuenta" },
      { data: "nombre" },
      { data: "apellido_paterno" },
      { data: "apellido_materno" },
      { data: "curp" },
      { data: "telefono" },
      { data: "sexo" },
      { data: "correo_electronico" },
      { data: "fecha_nacimiento" },
      //   { data: "foto_perfil" },
      { data: "id_entidad" },
      {
        data: null,
        orderable: false,
        render: function (data) {
          return `
            <button class="btn btn-info btn-view-alumno">
              View
            </button>
            <button class="btn btn-danger btn-delete-alumno" data-id="${data.numero_cuenta}">
              Delete
            </button>
          `;
        },
      },
    ],
  });
}

//nuevo alumno creado por formulario
function openCreateAlumno() {
  //esto borrara cualquier formulario que este abierto y mostrara el de crear alumno
  const modalElemento = document.getElementById("viewModal");
  const modalInstance = bootstrap.Modal.getInstance(modalElemento);

  if (modalInstance) {
    modalInstance.hide();
  }

  //debo resetear el ID seleccionado para evitar problemas al crear un nuevo alumno despues de haber seleccionado uno para actualizar
  selectedAlumnoId = null;

  $("#createSection").show();
  $("#createForm").empty();

  alumnoFields.forEach((field) => {

    const inputType = getInputTypeAlumno(field);

    $("#createForm").append(`
      <div class="mb-2">
        <label class="form-label">${field}</label>
        <input type="${inputType}" class="form-control" name="${field}">
      </div>
    `);
  });
}

//Metopdo http para crear el alumno
function createAlumno() {
  const nuevoAlumno = {};

  $("#createForm")
    .serializeArray()
    .forEach((item) => {
      nuevoAlumno[item.name] = item.value;
    });

  $.ajax({
    url: "/api/alumnos",
    type: "POST",
    contentType: "application/json",
    data: JSON.stringify(nuevoAlumno),
    success: function () {
      alert("Alumno creado correctamente");
      $("#createForm")[0].reset();
      $("#createSection").hide();
      table.ajax.reload();
    },

    error: function (error) {
      console.log(error);

      const mensaje = error.responseJSON?.message || "Ocurrió un error";

      alert(mensaje);
    },
  });
}

//formulario apra actualizar alumno
function modalUpdateAlumno(button) {
  const data = table.row($(button).parents("tr")).data();

  selectedAlumnoId = data.numero_cuenta;

  const form = $("#viewForm");
  form.empty();

  const fieldsToShow = alumnoFields;

  //aqui pedi ayuda porque se llenaba un campo que no podia delimitar como null(foto)
  fieldsToShow.forEach((field) => {
    const readonly = field === "numero_cuenta" ? "readonly" : "";

    let value = data[field];

    if (value === null || value === undefined) {
      value = "";
    }

    if (typeof value === "object") {
      value = "";
    }

    //validar campoFecha
    if (field === "fecha_nacimiento" && typeof value === "string" && value.includes("T")) {
      value = value.split("T")[0];
    }

    const inputType = getInputTypeAlumno(field);

    form.append(`
    <div class="mb-2">
      <label class="form-label">${field}</label>
      <input
        type="${inputType}"
        class="form-control"
        name="${field}"
        value="${value}"
        ${readonly}
      >
    </div>
  `);
  });

  const modal = new bootstrap.Modal(document.getElementById("viewModal"));
  modal.show();
}

function updateAlumno() {
  if (!selectedAlumnoId) {
    alert("Primero selecciona un alumno");
    return;
  }

  const alumnoActualizado = {};

  $("#viewForm")
    .serializeArray()
    .forEach((item) => {
      if (item.name !== "numero_cuenta") {
        alumnoActualizado[item.name] = item.value;
      }
    });

  $.ajax({
    url: `/api/alumnos/${selectedAlumnoId}`,
    type: "PUT",
    contentType: "application/json",
    data: JSON.stringify(alumnoActualizado),
    success: function () {
      alert("Alumno actualizado correctamente");

      const modal = bootstrap.Modal.getInstance(
        document.getElementById("viewModal"),
      );

      modal.hide();
      table.ajax.reload();
    },

    //le pedi ayuda a la IA porque tenia problemas para mostrar los errores de validacion que vienen del back-end, ahora muestra el mensaje general, los mensajes de validacion, y los campos que tienen problemas
    error: function (error) {
      console.log(error);

      let mensaje = "Error al actualizar alumno";

      if (error.responseJSON && error.responseJSON.message) {
        mensaje = error.responseJSON.message;
      }

      if (error.responseJSON && error.responseJSON.errores) {
        mensaje += "\n" + error.responseJSON.errores.join("\n");
      }

      if (error.responseJSON && error.responseJSON.campos) {
        mensaje +=
          "\nCampos con problema: " + error.responseJSON.campos.join(", ");
      }

      alert(mensaje);
    },
  });
}

//elimancion del suuario por id
function deleteAlumno(button) {
  const id = $(button).data("id");

  if (!confirm(`seguro que quieres eliminar este alumno ${id}`)) {
    return;
  }

  $.ajax({
    url: `/api/alumnos/${id}`,
    type: "DELETE",
    success: function () {
      alert(`Alumno eliminado correctamente${id}`);
      table.ajax.reload();
    },
    error: function (error) {
      console.log(error);
      alert(`Error al eliminar alumno ${id}`);
    },
  });
}
