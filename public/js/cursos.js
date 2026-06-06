
function loadCursos() {
  currentTable = "cursos";
  resetTable(`
        <th>id_curso</th>
        <th>cupo_maximo</th>
        <th>inscritos_actual</th>
        <th>id_profesor</th>
        <th>clave_asignatura</th>
        <th>id_oferta_semestral</th>
        <th>id_tipo_curso</th>
        <th>id_curso</th>
        <th>Actions</th>
        `);

  table = $("#mainTable").DataTable({
    ajax: {
      url: "/api/cursos",
      dataSrc: "cursos",
    },
    columns: [
      { data: "id_curso" },
      { data: "cupo_maximo" },
      { data: "inscritos_actual" },
      { data: "id_profesor" },
      { data: "clave_asignatura" },
      { data: "id_oferta_semestral" },
      { data: "id_tipo_curso" },
      { data: "id_curso" },
      {
        data: null,
        render: function (data) {
          return `
            <button class="btn btn-info btn-view">View</button>
            <button class="btn btn-danger btn-delete-entidad" data-id="${data.id_curso}">Delete</button>`;
        },
      },
    ],
  });
}