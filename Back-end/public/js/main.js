let table;

$(document).ready(function () {
  loadProfesores();

  //   EJEMPLO
  //$('#btnAuthors').click(loadAuthors);
  $("#btnAlumnos").click(loadAlumnos);
  $("#btnAsignaturas").click(loadAsignaturas);
  $("#btnCursos").click(loadCursos);
  $("#btnEntidades").click(loadEntidades);
  $("#btnGrupos").click(loadGrupos);
  $("#btnNiveles").click(loadNiveles);
  $("#btnOfertas").click(loadOfertas);
  $("#btnPeriodos").click(loadPeriodos);
  $("#btnProfesores").click(loadProfesores);
  $("#btnTiposCurso").click(loadTiposCurso);
});

function resetTable(headers) {
  if (table) {
    table.destroy();
  }


  $("#mainTable").empty();


  $("#mainTable").append(`
    <thead>
      <tr>${headers}</tr>
    </thead>
  `);
}

// // VIEW (abrir modal)
// $("#mainTable").on("click", ".btn-view", function () {
//   const data = table.row($(this).parents("tr")).data();

//   if (data.age !== undefined) {
//     currentType = "author";
//     $("#viewId").val(data.id);
//     $("#viewName").val(data.name);
//     $("#viewExtra").val(data.age);

//   } else if
//    (data.cantPages !== undefined) {
//     currentType = "book";
//     $("#viewId").val(data.id);
//     $("#viewName").val(data.name);
//     $("#viewExtra").val(data.cantPages);
//   } else {
//     currentType = "entidad";
//     $("#viewId").val(data.id_entidad);
//     $("#viewName").val(data.nombre_entidad);
//     $("#viewExtra").val(data.abreviatura);
//   }

//   const modal = new bootstrap.Modal(document.getElementById("viewModal"));
//   modal.show();
// });
$("#mainTable").on("click", ".btn-view", function () {
  const data = table.row($(this).parents("tr")).data();

  const form = $("#viewForm");
  form.empty(); // 

  for (let key in data) {
    if (typeof data[key] !== "object") {

      form.append(`
        <div class="mb-2">
          <label class="form-label">${key}</label>
          <input type="text" class="form-control" value="${data[key]}" readonly>
        </div>
      `);

    }
  }

  const modal = new bootstrap.Modal(document.getElementById("viewModal"));
  modal.show();
});


function loadAlumnos() {
  currentTable = "alumnos";

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
    <th>Actions</th>
  `);

  table = $("#mainTable").DataTable({
    ajax: {
      url: "/api/alumnos",
      dataSrc: "alumnos",
    },

    scrollX: true,
    autoWidth: false,
    destroy: true,

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
        orderable: false,
        render: function () {
          return `<button class="btn btn-info btn-view">View</button>`;
        },
      },
    ],
  });
}

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
            <button class="btn btn-danger btn-delete-entidad" data-id="${data.id_entidad}">Delete</button>`;
        },
      },
    ],
  });
}

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
            <button class="btn btn-danger btn-delete-entidad" data-id="${data.id_entidad}">Delete</button>`;
        },
      },
    ],
  });
}

function loadEntidades() {
  currentTable = "entidades";
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
    columns: [
      { data: "id_entidad" },
      { data: "nombre_entidad" },
      { data: "abreviatura" },
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
            <button class="btn btn-danger btn-delete-entidad" data-id="${data.id_entidad}">Delete</button>`;
        },
      },
    ],
  });
}

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
            <button class="btn btn-danger btn-delete-entidad" data-id="${data.id_entidad}">Delete</button>`;
        },
      },
    ],
  });
}

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
            <button class="btn btn-danger btn-delete-entidad" data-id="${data.id_entidad}">Delete</button>`;
        },
      },
    ],
  });
}

function loadProfesores() {
  currentTable = "profesores";
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
        <th>Actions</th>
        `);

  table = $("#mainTable").DataTable({
    ajax: {
      url: "/api/profesores",
      dataSrc: "profesores",
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
            <button class="btn btn-danger btn-delete-entidad" data-id="${data.id_entidad}">Delete</button>`;
        },
      },
    ],
  });
}

// function load() {
//   resetTable(`
//         <th>ID</th>
//         <th></th>
//         <th></th>
//         <th></th>
//         <th></th>
//         <th></th>
//         <th></th>
//         <th></th>
//         `);

//   table = $("#mainTable").DataTable({
//     ajax: {
//       url: "nombre",
//       dataSrc: "data",
//     },
//     columns: [
//       { data: "" },
//       { data: "" },
//       { data: "" },
//       { data: "" },
//       { data: "" },
//       { data: "" },
//       { data: "" },
//       {
//         data: null,
//         render: function (data) {
//           return `
//             <button class="btn btn-info btn-view">View</button>
//             <button class="btn btn-danger btn-delete-entidad" data-id="${data.id_entidad}">Delete</button>`;
//         },
//       },
//     ],
//   });
// }

// // DELETE AUTHOR
// $("#mainTable").on("click", ".btn-delete-author", function () {
//   const id = $(this).data("id");

//   if (!confirDataTables warning: table id=mainTable - Requested unknown parameter 'abrevitura' for row 0, column 2. For more information about this error, please see http://datatables.net/tn/m("Delete this author?")) return;

//   $.ajax({
//     url: `/authors/${id}`,
//     type: "DELETE",
//     success: function () {
//       table.ajax.reload();
//     },
//     error: function () {
//       alert("Error deleting author");
//     },
//   });
// });

//Delete entidades
