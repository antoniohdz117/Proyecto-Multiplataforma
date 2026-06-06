 function loadTiposCurso() {
  currentTable = "tiposCurso";
  resetTable(`
        <th>id_tipo_curso</th>
        <th>nombre_tipo</th>
        <th>Actions</th>
        `);

  table = $("#mainTable").DataTable({
    ajax: {
      url: "/api/tipos-curso",
      dataSrc: "tipos",
    },
    columns: [
      { data: "id_tipo_curso" },
      { data: "nombre_tipo" },

      {
        data: null,
        render: function (data) {
          return `
            <button class="btn btn-info btn-view">View</button>
            <button class="btn btn-danger btn-delete-entidad" data-id="${data.id_tipo_curso}">Delete</button>`;
        },
      },
    ],
  });
}