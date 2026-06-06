let selectedGrupoId = null;

//campos que seran llenados

const grupoFields = ["nombre_grupo"]; // y ya porque solo es un campo JAJAJJA

function loadGrupos() {
  currentTable = "grupos";
  selectedGrupoId = null;

  resetTable(`
    <th>id_grupo</th>
    <th>nombre_grupo</th>
    <th>Actions</th>
  `);

  table = $("#mainTable").DataTable({
    ajax: {
      url: "/api/grupos",
      dataSrc: "grupos",
    },

    scrollX: true,
    autoWidth: false,
    destroy: true,

    columns: [
      { data: "id_grupo" },
      { data: "nombre_grupo" },
      {
        data: null,
        orderable: false,
        render: function (data) {
          return `
            <button type="button" class="btn btn-info btn-view-grupo">View</button>
            <button type="button" class="bt n btn-danger btn-delete-grupo" data-id="${data.id_grupo}">
            Delete
            </button>`;
        },
      },
    ],
  });
}

function openCreateGrupo() {
  //esto borrara cualquier formulario que este abierto y mostrara el de crear alumno
  const modalElemento = document.getElementById("viewModal");
  const modalInstance = bootstrap.Modal.getInstance(modalElemento);

  if (modalInstance) {
    modalInstance.hide();
  }

  //debo resetear el ID seleccionado para evitar problemas al crear un nuevo alumno despues de haber seleccionado uno para actualizar
  selectedGrupoId = null;
  $("#createSection").show();
  $("#createForm").empty();

  grupoFields.forEach((field) => {
    $("#createForm").append(`
      <div class="mb-2">
        <label class="form-label">${field}</label>
        <input type="text" class="form-control" name="${field}">
      </div>
    `);
  });
}

//Metopdo http para crear el grupo
function createGrupo() {
  const nuevoGrupo = {};

  $("#createForm")
    .serializeArray()
    .forEach((item) => {
      nuevoGrupo[item.name] = item.value;
    });

  $.ajax({
    url: "/api/grupos",
    type: "POST",
    contentType: "application/json",
    data: JSON.stringify(nuevoGrupo),
    success: function () {
      alert("Grupo creado correctamente");
      $("#createForm")[0].reset();
      $("#createSection").hide();
      table.ajax.reload();
    },

    error: function (error) {
      console.log(error);
      alert("Error al crear nuevo GRUPO ");
    },
  });
}

//fucnoin para mostrar modal de update grupo
function modalUpdateGrupo(button) {
  const data = table.row($(button).parents("tr")).data();

  selectedGrupoId = data.id_grupo;

  const form = $("#viewForm");
  form.empty();

  const fieldsToShow = ["id_grupo", ...grupoFields];

  fieldsToShow.forEach((field) => {
    const readonly = field === "id_grupo" ? "readonly" : "";

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

//funcion para actualizar grupo
function updateGrupo() {
  if (!selectedGrupoId) {
    alert("Primero selecciona un Grupo para actualizar");
    return;
  }

  const grupoActualizado = {};

  $("#viewForm")
    .serializeArray()
    .forEach((item) => {
      if (item.name !== "id_grupo") {
        grupoActualizado[item.name] = item.value;
      }
    });

  $.ajax({
    url: `/api/grupos/${selectedGrupoId}`,
    type: "PUT",
    contentType: "application/json",
    data: JSON.stringify(grupoActualizado),
    success: function () {
      alert("grupo actualizado correctamente");

      const modal = bootstrap.Modal.getInstance(
        document.getElementById("viewModal"),
      );

      modal.hide();
      table.ajax.reload();
    },
    error: function (error) {
      console.log(error);
      alert("Error al actualizar grupo");
    },
  });
}

function deleteGrupo(button) {
  const id = $(button).data("id");

  if (!confirm(`seguro que quieres eliminar este grupo ${id}`)) {
    return;
  }

  $.ajax({
    url: `/api/grupos/${id}`,
    type: "DELETE",
    success: function () {
      alert(`Grupo eliminado correctamente${id}`);
      table.ajax.reload();
    },
    error: function (error) {
      console.log(error);
      alert(`Error al eliminar grupo ${id}`);
    },
  });
}
