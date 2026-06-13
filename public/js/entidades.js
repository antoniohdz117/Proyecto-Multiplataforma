let selectedEntidadId = null;

// campos que seran llenados, no hacerlo dinamico
const entidadFields = ["nombre_entidad", "abreviatura"];

//carga de archvios en la tabla
function loadEntidades() {
  currentTable = "entidades";
  selectedEntidadId = null;

  resetTable(`
    <th>id_entidad</th>
    <th>nombre_entidad</th>
    <th>abreviatura</th>
    <th>Actions</th>

  `);

  table = $("#mainTable").DataTable({
    ajax: {
      url: "/api/entidades",
      dataSrc: "entidades",
    },
    scrollX: true,
    autoWidth: false,
    destroy: true,
    columns: [
      { data: "id_entidad" },
      { data: "nombre_entidad" },
      { data: "abreviatura" },

      {
        data: null,
        orderable: false,
        render: function (data) {
          return `
            <button class="btn btn-info btn-view-entidad">
              View
            </button>
            <button class="btn btn-danger btn-delete-entidad" data-id="${data.id_entidad}">
              Delete
            </button>
          `;
        },
      },
    ],
  });
}

//nueva entidadd creado por formulario
function openCreateEntidad() {
  //esto borrara cualquier formulario que este abierto y mostrara el de crear entidad
  const modalElemento = document.getElementById("viewModal");
  const modalInstance = bootstrap.Modal.getInstance(modalElemento);

  if (modalInstance) {
    modalInstance.hide();
  }

  //debo resetear el ID seleccionado para evitar problemas al crear un nuevo entidad despues de haber seleccionado uno para actualizar
  selectedEntidadId = null;
  $("#createSection").show();
  $("#createForm").empty();

  entidadFields.forEach((field) => {
    $("#createForm").append(`
      <div class="mb-2">
        <label class="form-label">${field}</label>
        <input type="text" class="form-control" name="${field}">
      </div>
    `);
  });
}

//Metopdo http para crear el entidad
function createEntidad() {
  const nuevaEntidad = {};

  $("#createForm")
    .serializeArray()
    .forEach((item) => {
      nuevaEntidad[item.name] = item.value;
    });

  $.ajax({
    url: "/api/entidades",
    type: "POST",
    contentType: "application/json",
    data: JSON.stringify(nuevaEntidad),
    success: function () {
      alert("Entiadda creado correctamente");
      $("#createForm")[0].reset();
      $("#createSection").hide();
      table.ajax.reload();
    },

    error: function (error) {
      console.log(error);

      let mensaje = "Error al crear entidad";

      if (error.responseJSON && error.responseJSON.message) {
        mensaje = error.responseJSON.message;
      }

      if (error.responseJSON && error.responseJSON.errores) {
        mensaje += "" + error.responseJSON.errores.join("\n");
      }

      if (error.responseJSON && error.responseJSON.campos) {
        mensaje +="Campos con problema: " + error.responseJSON.campos.join(", ");
      }

      alert(mensaje);
    },
  });
}

//formulario apra actualizar entidad
function modalUpdateEntidad(button) {
  const data = table.row($(button).parents("tr")).data();

  selectedEntidadId = data.id_entidad;

  const form = $("#viewForm");
  form.empty();

  const fieldsToShow = ["id_entidad", ...entidadFields];

  //aqui pedi ayuda porque se llenaba un campo que no podia delimitar como null(foto)
  fieldsToShow.forEach((field) => {
    const readonly = field === "id_entidad" ? "readonly" : "";

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

function updateEntidad() {
  if (!selectedEntidadId) {
    alert("Primero selecciona un Entidad");
    return;
  }

  const entidadActualizado = {};

  $("#viewForm")
    .serializeArray()
    .forEach((item) => {
      if (item.name !== "id_entidad") {
        entidadActualizado[item.name] = item.value;
      }
    });

  $.ajax({
    url: `/api/entidades/${selectedEntidadId}`,
    type: "PUT",
    contentType: "application/json",
    data: JSON.stringify(entidadActualizado),
    success: function () {
      alert("Entiadd actualizado correctamente");

      const modal = bootstrap.Modal.getInstance(
        document.getElementById("viewModal"),
      );

      modal.hide();
      table.ajax.reload();
    },
    error: function (error) {
  console.log(error);

  let mensaje = "Error al actualizar entidad";

  if (error.responseJSON && error.responseJSON.message) {
    mensaje = error.responseJSON.message;
  }

  if (error.responseJSON && error.responseJSON.errores) {
    mensaje += "" + error.responseJSON.errores.join("\n");
  }

  if (error.responseJSON && error.responseJSON.campos) {
    mensaje += "Campos con problema: " + error.responseJSON.campos.join(", ");
  }

  alert(mensaje);
},
  });
}

//elimancion del suuario por id
function deleteEntidad(button) {
  const id = $(button).data("id");

  if (!confirm(`seguro que quieres eliminar este Entidad ${id}`)) {
    return;
  }

  $.ajax({
    url: `/api/entidades/${id}`,
    type: "DELETE",
    success: function () {
      alert(`Entidades eliminado correctamente${id}`);
      table.ajax.reload();
    },
    error: function (error) {
      console.log(error);
      alert(`Error al eliminar entidad ${id}`);
    },
  });
}
