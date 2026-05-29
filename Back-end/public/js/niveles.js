let selectedNivelId = null;

const nivelFields = ["nombre_semestre"];

function loadNiveles() {
  currentTable = "niveles";
  selectedNivelId = null;

  resetTable(`
    <th>id_nivel_semestre</th>
    <th>nombre_semestre</th>
    <th>Actions</th>
  `);

  table = $("#mainTable").DataTable({
    ajax: {
      url: "/api/niveles",
      dataSrc: "niveles",
    },

    scrollX: true,
    autoWidth: false,
    destroy: true,

    columns: [
      { data: "id_nivel_semestre" },
      { data: "nombre_semestre" },
      {
        data: null,
        orderable: false,
        render: function (data) {
          return `
            <button class="btn btn-info btn-view-nivel">View</button>
            <button class="btn btn-danger btn-delete-nivel" data-id="${data.id_nivel_semestre}">Delete</button>
          `;
        },
      },
    ],
  });
}

function openCreateNivel() {
  $("#createSection").show();
  $("#createForm").empty();

  nivelFields.forEach((field) => {
    $("#createForm").append(`
      <div class="mb-2">
        <label class="form-label">${field}</label>
        <input type="text" class="form-control" name="${field}">
      </div>
    `);
  });
}

function createNivel() {
  const nuevoNivel = {};

  $("#createForm")
    .serializeArray()
    .forEach((item) => {
      nuevoNivel[item.name] = item.value;
    });

  $.ajax({
    url: "/api/niveles",
    type: "POST",
    contentType: "application/json",
    data: JSON.stringify(nuevoNivel),
    success: function () {
      alert("Nivel creado correctamente");
      $("#createForm")[0].reset();
      $("#createSection").hide();
      table.ajax.reload();
    },
    error: function (error) {
      console.log(error);
      alert("Error al crear nuevo nivel");
    },
  });
}

function modalUpdateNivel(button) {
  const data = table.row($(button).parents("tr")).data();

  selectedNivelId = data.id_nivel_semestre;

  const form = $("#viewForm");
  form.empty();

  const fieldsToShow = ["id_nivel_semestre", ...nivelFields];

  fieldsToShow.forEach((field) => {
    const readonly = field === "id_nivel_semestre" ? "readonly" : "";

    let value = data[field];

    if (value === null || value === undefined) {
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

function updateNivel() {
  if (!selectedNivelId) {
    alert("Primero selecciona un nivel para actualizar");
    return;
  }

  const nivelActualizado = {};

  $("#viewForm")
    .serializeArray()
    .forEach((item) => {
      if (item.name !== "id_nivel_semestre") {
        nivelActualizado[item.name] = item.value;
      }
    });

  $.ajax({
    url: `/api/niveles/${selectedNivelId}`,
    type: "PUT",
    contentType: "application/json",
    data: JSON.stringify(nivelActualizado),
    success: function () {
      alert("Nivel actualizado correctamente");

      const modal = bootstrap.Modal.getInstance(
        document.getElementById("viewModal"),
      );

      modal.hide();
      table.ajax.reload();
    },
    error: function (error) {
      console.log(error);
      alert("Error al actualizar nivel");
    },
  });
}

function deleteNivel(button) {
  const id = $(button).data("id");

  if (!confirm(`¿Seguro que quieres eliminar este nivel ${id}?`)) {
    return;
  }

  $.ajax({
    url: `/api/niveles/${id}`,
    type: "DELETE",
    success: function () {
      alert(`Nivel eliminado correctamente ${id}`);
      table.ajax.reload();
    },
    error: function (error) {
      console.log(error);
      alert(`Error al eliminar nivel ${id}`);
    },
  });
}

$(document).on("click", ".btn-view-nivel", function () {
  modalUpdateNivel(this);
});

$(document).on("click", ".btn-delete-nivel", function () {
  deleteNivel(this);
});
