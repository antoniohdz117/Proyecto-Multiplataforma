let table;

$(document).ready(function () {
  loadAuthors();

  //   EJEMPLO
  //$('#btnAuthors').click(loadAuthors);
  $("#btnAlumnos").click(loadAlumnos);
  $("#btnAsignaturas").click(loadAsignaturas);
  $("#btnCursos").click(loadCursos);
  $("#btnEntidades").click(loadEntidades);
  $("#btnGrupos").click(loadGrupos);
  $("#btnNiveles").click(loadNiveles);
  $("#btnOfertas").click(loadOfertas);
  $("#btnPeriodos").click(loadPeridos);
  $("#btnProfesores").click(loadProfesores);
  $("#btnTiposCurso").click(loadTiposCurso);
});

function resetTable(headers) {
  if (table) {
    table.destroy();
  }

  // 🔥 limpia completamente la tabla
  $("#mainTable").empty();

  // 🔥 reconstruye el thead
  $("#mainTable").append(`
    <thead>
      <tr>${headers}</tr>
    </thead>
  `);
}
function loadAlumnos() {
  resetTable(`
        <th>numero_cuenta</th>
        <th>nombre</th>
        <th>apellido_paterno</th>
        <th>apellido_materno</th>
        <th>curp</th>
        <th>telefono</th>
        <th>sexo</th>
        <th>correo_electronico</th>
        <th>fecha_nacimiento</th>
        <th>foto_perfil</th>
        <th>id_entidad</th>
        `);

  table = $("#mainTable").DataTable({
    ajax: {
      url: "/alumno",
      dataSrc: "data",
    },
    columns: [
      { data: "numero_cuenta" },
      { data: "nombre" },
      { data: "apellido_paterno" },
      { data: "apellido_materno" },
      { data: "curp" },
      { data: "telefono" },
      { data: "sexo" },
      { data: "correo_electronico" },
      { data: "fecha_nacimiento" },
      { data: "foto_perfil" },
      { data: "id_entidad" },
      {
        data: null,
        render: function (data) {
          return `
            <button class="btn btn-info btn-view">View</button>
            <button class="btn btn-danger btn-delete-entidad" data-id="${data.id_entidad}">Delete</button>`;
        },
      },
    ],
  });
}



function loadAsignaturas() {
  resetTable(`
        <th>clave_asignatura</th>
        <th>nombre</th>
        `);

  table = $("#mainTable").DataTable({
    ajax: {
      url: "/asignaturas",
      dataSrc: "data",
    },
    columns: [
      { data: "clave_asignatura" },
      { data: "nombre" },
      {
        data: null,
        render: function (data) {
          return `
            <button class="btn btn-info btn-view">View</button>
            <button class="btn btn-danger btn-delete-entidad" data-id="${data.id_entidad}">Delete</button>`;
        },
      },
    ],
  });
}



function loadCurso() {
  resetTable(`
        <th>id_curso</th>
        <th>cupo_maximo</th>
        <th>inscritos_actual</th>
        <th>id_profesor</th>
        <th>clave_asignatura</th>
        <th>id_oferta_semestral</th>
        <th>id_tipo_curso</th>
        <th>id_curso</th>
        `);

  table = $("#mainTable").DataTable({
    ajax: {
      url: "/cursos",
      dataSrc: "data",
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
            <button class="btn btn-danger btn-delete-entidad" data-id="${data.id_entidad}">Delete</button>`;
        },
      },
    ],
  });
}



function loadEntidades() {
  resetTable(`
        <th>id_entidad</th>
        <th>nombre_entidad</th>
        <th>abrevitura</th>
        `);

  table = $("#mainTable").DataTable({
    ajax: {
      url: "/entidades",
      dataSrc: "data",
    },
    columns: [
      { data: "id_entidad" },
      { data: "nombre_entidad" },
      { data: "abrevitura" },
      {
        data: null,
        render: function (data) {
          return `
            <button class="btn btn-info btn-view">View</button>
            <button class="btn btn-danger btn-delete-entidad" data-id="${data.id_entidad}">Delete</button>`;
        },
      },
    ],
  });
}



function loadGrupos() {
  resetTable(`
        <th>id_grupo</th>
        <th>nombre_grupo</th>
        `);

  table = $("#mainTable").DataTable({
    ajax: {
      url: "/grupos",
      dataSrc: "data",
    },
    columns: [
      { data: "id_grupo" },
      { data: "nombre_grupo" },
      
      {
        data: null,
        render: function (data) {
          return `
            <button class="btn btn-info btn-view">View</button>
            <button class="btn btn-danger btn-delete-entidad" data-id="${data.id_entidad}">Delete</button>`;
        },
      },
    ],
  });
}



function loadNiveles() {
  resetTable(`
        <th>id_nivel_semestre</th>
        <th></th>
        <th></th>
        
        `);

  table = $("#mainTable").DataTable({
    ajax: {
      url: "/niveles",
      dataSrc: "data",
    },
    columns: [
      { data: "id_nivel_semestre" },
      { data: "nombre_semestre" },
      
      {
        data: null,
        render: function (data) {
          return `
            <button class="btn btn-info btn-view">View</button>
            <button class="btn btn-danger btn-delete-entidad" data-id="${data.id_entidad}">Delete</button>`;
        },
      },
    ],
  });
}



function loadOfertas() {
  resetTable(`
        <th>id_semestral_semestral</th>
        <th>id_periodo</th>
        <th>id_nivel_semestre</th>
        `);

  table = $("#mainTable").DataTable({
    ajax: {
      url: "/Ofertas",
      dataSrc: "data",
    },
    columns: [
      { data: "id_semestral_semestral" },
      { data: "id_periodo" },
      { data: "id_nivel_semestre" },
      {
        data: null,
        render: function (data) {
          return `
            <button class="btn btn-info btn-view">View</button>
            <button class="btn btn-danger btn-delete-entidad" data-id="${data.id_entidad}">Delete</button>`;
        },
      },
    ],
  });
}



function loadPeridos() {
  resetTable(`
        <th>id_periodo</th>
        <th>periodo_nombre</th>
        <th>fecha_inicio</th>
        <th>fecha_fin</th>
        
        `);

  table = $("#mainTable").DataTable({
    ajax: {
      url: "/periodos",
      dataSrc: "data",
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
            <button class="btn btn-danger btn-delete-entidad" data-id="${data.id_entidad}">Delete</button>`;
        },
      },
    ],
  });
}



function loadProfesores() {
  resetTable(`
        <th>id_profesor</th>
        <th>nombre</th>
        <th>apellido_paterno</th>
        <th>apellido_materno</th>
        <th>curp</th>
        <th>rfc</th>
        <th>telefono</th>
        <th>sexo</th>
        <th>correo_electronico</th>
        <th>fecha_nacimiento</th>
        <th>sueldo</th>
        `);

  table = $("#mainTable").DataTable({
    ajax: {
      url: "/profesores",
      dataSrc: "data",
    },
    columns: [
      { data: "id_profesor" },
      { data: "nombre" },
      { data: "apellido_paterno" },
      { data: "apellido_materno" },
      { data: "curp" },
      { data: "rfc" },
      { data: "telefono" },
      { data: "sexo" },
      { data: "correo_electronico" },
      { data: "fecha_nacimiento" },
      { data: "sueldo" },
      {
        data: null,
        render: function (data) {
          return `
            <button class="btn btn-info btn-view">View</button>
            <button class="btn btn-danger btn-delete-entidad" data-id="${data.id_entidad}">Delete</button>`;
        },
      },
    ],
  });
}



function loadTiposCurso() {
  resetTable(`
        <th>id_tipo_curso</th>
        <th>nombre_tipo</th>
        `);

  table = $("#mainTable").DataTable({
    ajax: {
      url: "/tiposCurso",
      dataSrc: "data",
    },
    columns: [
      { data: "id_tipo_curso" },
      { data: "nombre_tipo" },
      
      {
        data: null,
        render: function (data) {
          return `
            <button class="btn btn-info btn-view">View</button>
            <button class="btn btn-danger btn-delete-entidad" data-id="${data.id_entidad}">Delete</button>`;
        },
      },
    ],
  });
}



function load() {
  resetTable(`
        <th>ID</th>
        <th></th>
        <th></th>
        <th></th>
        <th></th>
        <th></th>
        <th></th>
        <th></th>
        `);

  table = $("#mainTable").DataTable({
    ajax: {
      url: "nombre",
      dataSrc: "data",
    },
    columns: [
      { data: "" },
      { data: "" },
      { data: "" },
      { data: "" },
      { data: "" },
      { data: "" },
      { data: "" },
      {
        data: null,
        render: function (data) {
          return `
            <button class="btn btn-info btn-view">View</button>
            <button class="btn btn-danger btn-delete-entidad" data-id="${data.id_entidad}">Delete</button>`;
        },
      },
    ],
  });
}



function load() {
  resetTable(`
        <th>ID</th>
        <th></th>
        <th></th>
        <th></th>
        <th></th>
        <th></th>
        <th></th>
        <th></th>
        `);

  table = $("#mainTable").DataTable({
    ajax: {
      url: "nombre",
      dataSrc: "data",
    },
    columns: [
      { data: "" },
      { data: "" },
      { data: "" },
      { data: "" },
      { data: "" },
      { data: "" },
      { data: "" },
      {
        data: null,
        render: function (data) {
          return `
            <button class="btn btn-info btn-view">View</button>
            <button class="btn btn-danger btn-delete-entidad" data-id="${data.id_entidad}">Delete</button>`;
        },
      },
    ],
  });
}



function load() {
  resetTable(`
        <th>ID</th>
        <th></th>
        <th></th>
        <th></th>
        <th></th>
        <th></th>
        <th></th>
        <th></th>
        `);

  table = $("#mainTable").DataTable({
    ajax: {
      url: "nombre",
      dataSrc: "data",
    },
    columns: [
      { data: "" },
      { data: "" },
      { data: "" },
      { data: "" },
      { data: "" },
      { data: "" },
      { data: "" },
      {
        data: null,
        render: function (data) {
          return `
            <button class="btn btn-info btn-view">View</button>
            <button class="btn btn-danger btn-delete-entidad" data-id="${data.id_entidad}">Delete</button>`;
        },
      },
    ],
  });
}




function loadAuthors() {
  resetTable(`
    <th>ID</th>
    <th>Name</th>
    <th>Age</th>
  `);

  table = $("#mainTable").DataTable({
    ajax: "/authors",
    columns: [{ data: "id" }, { data: "name" }, { data: "age" }],
  });
}

function loadBooks() {
  resetTable(`
    <th>ID</th>
    <th>ISBN</th>
    <th>Name</th>
    <th>Pages</th>
  `);

  table = $("#mainTable").DataTable({
    ajax: "/books",
    columns: [
      { data: "id" },
      { data: "isbn" },
      { data: "name" },
      { data: "cantPages" },
    ],
  });
}

function loadRevistas() {
  resetTable(`
    <th>ID</th>
    <th>ISBN</th>
    <th>Name</th>
    <th>Pages</th>
  `);

  table = $("#mainTable").DataTable({
    ajax: "/revistas",
    columns: [
      { data: "id" },
      { data: "isbn" },
      { data: "name" },
      { data: "cantPages" },
    ],
  });
}
