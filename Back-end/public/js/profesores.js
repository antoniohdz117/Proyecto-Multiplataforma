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
  $("#createSection").show();
  $("#createForm").empty();

  profesorFields.forEach((field) => {
    $("#createForm").append(`
      <div class="mb-2">
        <label class="form-label">${field}</label>
        <input type="text" class="form-control" name="${field}">
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
      alert("Error al crear nuevo profesor ");
    },
  });
}

//formulario apra actualizar Profesor
function modalUpdateProfesor(button) {
  const data = table.row($(button).parents("tr")).data();

  selectedProfesorId = data.id_profesor;

  const form = $("#viewForm");
  form.empty();

  const fieldsToShow = ["id_profesor", ...profesorFields];

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

    form.append(`
    <div class="mb-2">
      <label class="form-label">${field}</label>
      <input
        type="text"
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
      alert("Error al actualizar profesor");
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
