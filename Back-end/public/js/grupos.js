function loadGrupos() {
  currentTable = "grupos";

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
            <button class="btn btn-info btn-view">View</button>
            <button class="btn btn-danger btn-delete-entidad" data-id="${data.id_grupo}">Delete</button>`;
        },
      },
    ],
  });
}
