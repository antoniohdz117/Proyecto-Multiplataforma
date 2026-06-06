let selectedProfesorId = null;

// campos que seran llenados, no hacerlo dinamico
const profesorFields = [
  "id_profesor",
  "nombre",
  "apellido_paterno",
  "apellido_materno",
  "curp",
  "rfc",
  "telefono",
  "sexo",
  "correo_electronico",
  "fecha_nacimiento",
  "sueldo",
];

const profesorCreateFields = [
  "nombre",
  "apellido_paterno",
  "apellido_materno",
  "curp",
  "rfc",
  "telefono",
  "sexo",
  "correo_electronico",
  "fecha_nacimiento",
  "sueldo",
];

//calendario apra evitar errores de usuario

function getInputTypeProfesor(field) {
  if (field === "fecha_nacimiento") {
    return "date";
  }

  if (field === "sueldo") {
    return "number";
  }

  return "text";
}

//carga de archvios en la tabla
function loadProfesores() {
  currentTable = "profesores";
  selectedProfesorId = null;

  resetTable(`
    <th>id_profesor</th>
    <th>nombre</th>
    <th>apellido_paterno</th>
    <th>apellido_materno</th>
    <th>curp</th>
    <th>rfc</th>
    <th>telefono</th>
    <th>sexo</th>
    <th>correo_electronico</th>
    <th>fecha_nacimiento</th>
    <th>sueldo</th>
    <th>Actions</th>
  `);

  table = $("#mainTable").DataTable({
    ajax: {
      url: "/api/profesores",
      dataSrc: "profesores",
    },
    scrollX: true,
    autoWidth: false,
    destroy: true,
    columns: [
      { data: "id_profesor" },
      { data: "nombre" },
      { data: "apellido_paterno" },
      { data: "apellido_materno" },
      { data: "curp" },
      { data: "rfc" },
      { data: "telefono" },
      { data: "sexo" },
      { data: "correo_electronico" },
      { data: "fecha_nacimiento" },
      { data: "sueldo" },
      {
        data: null,
        orderable: false,
        render: function (data) {
          return `
            <button class="btn btn-info btn-view-profesor">
              View
            </button>
            <button class="btn btn-danger btn-delete-profesor" data-id="${data.id_profesor}">
              Delete
            </button>
          `;
        },
      },
    ],
  });
}

//nuevo profesor creado por formulario
function modalCreateProfesor() {
  //esto borrara cualquier formulario que este abierto y mostrara el de crear alumno
  const modalElemento = document.getElementById("viewModal");
  const modalInstance = bootstrap.Modal.getInstance(modalElemento);

  if (modalInstance) {
    modalInstance.hide();
  }

  $("#viewForm").empty();

  selectedProfesorId = null;

  $("#createSection").show();
  $("#createForm").empty();

  profesorCreateFields.forEach((field) => {
    const inputType = getInputTypeProfesor(field);
    $("#createForm").append(`
      <div class="mb-2">
        <label class="form-label">${field}</label>
        <input type="${inputType}" class="form-control" name="${field}">
      </div>
    `);
  });
}

//Metopdo http para crear el profeosr
function createProfesor() {
  const nuevoProfesor = {};

  $("#createForm")
    .serializeArray()
    .forEach((item) => {
      nuevoProfesor[item.name] = item.value;
    });

  $.ajax({
    url: "/api/profesores",
    type: "POST",
    contentType: "application/json",
    data: JSON.stringify(nuevoProfesor),
    success: function () {
      alert("profesor creado correctamente");
      $("#createForm")[0].reset();
      $("#createSection").hide();
      table.ajax.reload();
    },

    error: function (error) {
      console.log(error);

      let mensaje = "Error al crear profesor";

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

//formulario apra actualizar Profesor

function modalUpdateProfesor(button) {
  const data = table.row($(button).parents("tr")).data();

  selectedProfesorId = data.id_profesor;

  $("#createSection").hide();
  $("#createForm").empty();

  const form = $("#viewForm");
  form.empty();

  const fieldsToShow = profesorFields;

  //aqui pedi ayuda porque se llenaba un campo que no podia delimitar como null(foto)
  fieldsToShow.forEach((field) => {
    const readonly = field === "id_profesor" ? "readonly" : "";

    let value = data[field];

    if (value === null || value === undefined) {
      value = "";
    }

    if (typeof value === "object") {
      value = "";
    }

    if (field === "fecha_nacimiento" && typeof value === "string") {
      value = value.split("T")[0];
    }

    const inputType = getInputTypeProfesor(field);

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

function updateProfesor() {
  if (!selectedProfesorId) {
    alert("Primero selecciona un profesor");
    return;
  }

  const profesorActualizado = {};

  $("#viewForm")
    .serializeArray()
    .forEach((item) => {
      if (item.name !== "id_profesor") {
        profesorActualizado[item.name] = item.value;
      }
    });

  $.ajax({
    url: `/api/profesores/${selectedProfesorId}`,
    type: "PUT",
    contentType: "application/json",
    data: JSON.stringify(profesorActualizado),
    success: function () {
      alert("Profesor actualizado correctamente");

      const modal = bootstrap.Modal.getInstance(
        document.getElementById("viewModal"),
      );

      modal.hide();
      table.ajax.reload();
    },
    error: function (error) {
      console.log(error);

      let mensaje = "Error al actualizar profesor";

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
function deleteProfesor(button) {
  const id = $(button).data("id");

  if (!confirm(`seguro que quieres eliminar este profesor ${id}`)) {
    return;
  }

  $.ajax({
    url: `/api/profesores/${id}`,
    type: "DELETE",
    success: function () {
      alert(`profesor eliminado correctamente${id}`);
      table.ajax.reload();
    },
    error: function (error) {
      console.log(error);
      alert(`Error al eliminar profeson ${id}`);
    },
  });
}
