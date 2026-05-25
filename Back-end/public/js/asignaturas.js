function loadAsignaturas() {
  currentTable = "asignaturas";
  resetTable(`
        <th>clave_asignatura</th>
        <th>nombre</th>
        <th>Actions</th>
        `);

  table = $("#mainTable").DataTable({
    ajax: {
      url: "/api/asignaturas",
      dataSrc: "asignaturas",
    },
    columns: [
      { data: "clave_asignatura" },
      { data: "nombre" },
      {
        data: null,
        render: function (data) {
          return `
            <button class="btn btn-info btn-view">View</button>
            <button class="btn btn-danger btn-delete-entidad" data-id="${data.clave_asignatura}">Delete</button>`;
        },
      },
    ],
  });
}
