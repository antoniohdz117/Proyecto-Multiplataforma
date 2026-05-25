function loadPeriodos() {
  currentTable = "periodos";
  resetTable(`
        <th>id_periodo</th>
        <th>periodo_nombre</th>
        <th>fecha_inicio</th>
        <th>fecha_fin</th>
        <th>Actions</th>

        `);

  table = $("#mainTable").DataTable({
    ajax: {
      url: "/api/periodos",
      dataSrc: "periodos",
    },
    columns: [
      { data: "id_periodo" },
      { data: "periodo_nombre" },
      { data: "fecha_inicio" },
      { data: "fecha_fin" },
      {
        data: null,
        render: function (data) {
          return `
            <button class="btn btn-info btn-view">View</button>
            <button class="btn btn-danger btn-delete-entidad" data-id="${data.id_periodo}">Delete</button>`;
        },
      },
    ],
  });

}