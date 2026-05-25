function loadNiveles() {
  currentTable = "niveles";
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
    columns: [
      { data: "id_nivel_semestre" },
      { data: "nombre_semestre" },

      {
        data: null,
        render: function (data) {
          return `
            <button class="btn btn-info btn-view">View</button>
            <button class="btn btn-danger btn-delete-entidad" data-id="${data.id_nivel_semestre}">Delete</button>`;
        },
      },
    ],
  });
}