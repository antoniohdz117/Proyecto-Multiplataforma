function loadOfertas() {
  currentTable = "ofertas";
  resetTable(`
        <th>id_oferta_semestral</th>
        <th>id_periodo</th>
        <th>id_nivel_semestre</th>
        <th>Actions</th>
        `);

  table = $("#mainTable").DataTable({
    ajax: {
      url: "/api/ofertas",
      dataSrc: "ofertas",
    },
    columns: [
      { data: "id_oferta_semestral" },
      { data: "id_periodo" },
      { data: "id_nivel_semestre" },
      {
        data: null,
        render: function (data) {
          return `
            <button class="btn btn-info btn-view">View</button>
            <button class="btn btn-danger btn-delete-entidad" data-id="${data.id_oferta_semestral}">Delete</button>`;
        },
      },
    ],
  });
}