const swaggerSpec = {
  openapi: "3.0.0",
  info: {
    title: "API Sistema Escolar",
    version: "1.0.0",
    description:
      "Documentación Swagger/OpenAPI para la API del proyecto. Incluye alumnos, entidades federativas, profesores, asignaturas, tipos de curso, grupos, periodos, niveles, ofertas semestrales y cursos.",
  },
  servers: [
    {
      url: "http://localhost:3000",
      description: "Servidor local",
    },
  ],
  tags: [
    { name: "Alumnos", description: "Operaciones relacionadas con alumnos" },
    { name: "Entidades", description: "Catálogo de entidades federativas" },
    {
      name: "Profesores",
      description: "Operaciones relacionadas con profesores",
    },
    { name: "Asignaturas", description: "Catálogo de asignaturas" },
    { name: "Tipos de curso", description: "Catálogo de tipos de curso" },
    { name: "Grupos", description: "Catálogo de grupos" },
    { name: "Periodos", description: "Periodos académicos" },
    { name: "Niveles", description: "Niveles o semestres" },
    { name: "Ofertas", description: "Ofertas semestrales" },
    { name: "Cursos", description: "Cursos ofertados" },
  ],
  paths: {
    "/api/alumnos": {
      get: {
        tags: ["Alumnos"],
        summary: "Obtener todos los alumnos",
        responses: {
          200: {
            description: "Lista de alumnos obtenida correctamente",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    alumnos: {
                      type: "array",
                      items: { $ref: "#/components/schemas/Alumno" },
                    },
                  },
                },
              },
            },
          },
          500: { $ref: "#/components/responses/Error500" },
        },
      },
      post: {
        tags: ["Alumnos"],
        summary: "Crear un alumno",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/AlumnoCreate" },
            },
          },
        },
        responses: {
          201: {
            description: "Alumno creado correctamente",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    alumno: { $ref: "#/components/schemas/Alumno" },
                  },
                },
              },
            },
          },
          500: { $ref: "#/components/responses/Error500" },
        },
      },
    },
    "/api/alumnos/{id}": {
      get: {
        tags: ["Alumnos"],
        summary: "Obtener un alumno por número de cuenta",
        parameters: [{ $ref: "#/components/parameters/IdPath" }],
        responses: {
          200: {
            description: "Alumno encontrado",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    alumno: { $ref: "#/components/schemas/Alumno" },
                  },
                },
              },
            },
          },
          404: { $ref: "#/components/responses/NotFound" },
          500: { $ref: "#/components/responses/Error500" },
        },
      },
      put: {
        tags: ["Alumnos"],
        summary: "Actualizar un alumno por número de cuenta",
        parameters: [{ $ref: "#/components/parameters/IdPath" }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/AlumnoCreate" },
            },
          },
        },
        responses: {
          200: {
            description: "Alumno actualizado correctamente",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    alumno: { $ref: "#/components/schemas/Alumno" },
                  },
                },
              },
            },
          },
          404: { $ref: "#/components/responses/NotFound" },
          500: { $ref: "#/components/responses/Error500" },
        },
      },
      delete: {
        tags: ["Alumnos"],
        summary: "Eliminar un alumno por número de cuenta",
        parameters: [{ $ref: "#/components/parameters/IdPath" }],
        responses: {
          200: {
            description: "Alumno eliminado correctamente",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/MessageResponse" },
              },
            },
          },
          404: { $ref: "#/components/responses/NotFound" },
          500: { $ref: "#/components/responses/Error500" },
        },
      },
    },

    "/api/entidades": {
      get: {
        tags: ["Entidades"],
        summary: "Obtener todas las entidades federativas",
        responses: {
          200: {
            description: "Lista de entidades obtenida correctamente",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    entidades: {
                      type: "array",
                      items: { $ref: "#/components/schemas/Entidad" },
                    },
                  },
                },
              },
            },
          },
          500: { $ref: "#/components/responses/Error500" },
        },
      },
      post: {
        tags: ["Entidades"],
        summary: "Crear una entidad federativa",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/EntidadCreate" },
            },
          },
        },
        responses: {
          201: {
            description: "Entidad creada correctamente",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    entidad: { $ref: "#/components/schemas/Entidad" },
                  },
                },
              },
            },
          },
          400: { $ref: "#/components/responses/BadRequest" },
          500: { $ref: "#/components/responses/Error500" },
        },
      },
    },
    "/api/entidades/{id}": {
      get: {
        tags: ["Entidades"],
        summary: "Obtener una entidad por ID",
        parameters: [{ $ref: "#/components/parameters/IdPath" }],
        responses: {
          200: {
            description: "Entidad encontrada",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    entidad: { $ref: "#/components/schemas/Entidad" },
                  },
                },
              },
            },
          },
          404: { $ref: "#/components/responses/NotFound" },
          500: { $ref: "#/components/responses/Error500" },
        },
      },
      put: {
        tags: ["Entidades"],
        summary: "Actualizar una entidad por ID",
        parameters: [{ $ref: "#/components/parameters/IdPath" }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/EntidadCreate" },
            },
          },
        },
        responses: {
          200: {
            description: "Entidad actualizada correctamente",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    entidad: { $ref: "#/components/schemas/Entidad" },
                  },
                },
              },
            },
          },
          404: { $ref: "#/components/responses/NotFound" },
          500: { $ref: "#/components/responses/Error500" },
        },
      },
      patch: {
        tags: ["Entidades"],
        summary: "Actualizar parcialmente una entidad por ID",
        description:
          "Permite actualizar solo uno o algunos campos de una entidad federativa, por ejemplo solo nombre_entidad o solo abreviatura.",
        parameters: [{ $ref: "#/components/parameters/IdPath" }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/EntidadPatch" },
              examples: {
                actualizarNombre: {
                  summary: "Actualizar solo el nombre",
                  value: {
                    nombre_entidad: "Jalisco",
                  },
                },
                actualizarAbreviatura: {
                  summary: "Actualizar solo la abreviatura",
                  value: {
                    abreviatura: "JAL",
                  },
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: "Entidad actualizada parcialmente correctamente",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/MessageResponse" },
                example: {
                  message: "Entidad patched",
                },
              },
            },
          },
          404: { $ref: "#/components/responses/NotFound" },
          500: { $ref: "#/components/responses/Error500" },
        },
      },
      delete: {
        tags: ["Entidades"],
        summary: "Eliminar una entidad por ID",
        parameters: [{ $ref: "#/components/parameters/IdPath" }],
        responses: {
          200: {
            description: "Entidad eliminada correctamente",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/MessageResponse" },
              },
            },
          },
          404: { $ref: "#/components/responses/NotFound" },
          500: { $ref: "#/components/responses/Error500" },
        },
      },
    },
    "/api/entidades/{id}/alumnos": {
      get: {
        tags: ["Entidades"],
        summary: "Obtener alumnos relacionados con una entidad federativa",
        parameters: [{ $ref: "#/components/parameters/IdPath" }],
        responses: {
          200: {
            description: "Entidad encontrada con sus alumnos",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    entidad: { $ref: "#/components/schemas/EntidadConAlumnos" },
                  },
                },
              },
            },
          },
          404: { $ref: "#/components/responses/NotFound" },
          500: { $ref: "#/components/responses/Error500" },
        },
      },
    },

    "/api/profesores": {
      get: {
        tags: ["Profesores"],
        summary: "Obtener todos los profesores",
        responses: {
          200: {
            description: "Lista de profesores obtenida correctamente",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    profesores: {
                      type: "array",
                      items: { $ref: "#/components/schemas/Profesor" },
                    },
                  },
                },
              },
            },
          },
          500: { $ref: "#/components/responses/Error500" },
        },
      },
      post: {
        tags: ["Profesores"],
        summary: "Crear un profesor",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/ProfesorCreate" },
            },
          },
        },
        responses: {
          201: {
            description: "Profesor creado correctamente",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    profesor: { $ref: "#/components/schemas/Profesor" },
                  },
                },
              },
            },
          },
          500: { $ref: "#/components/responses/Error500" },
        },
      },
    },
    "/api/profesores/{id}": {
      get: {
        tags: ["Profesores"],
        summary: "Obtener un profesor por ID",
        parameters: [{ $ref: "#/components/parameters/IdPath" }],
        responses: {
          200: {
            description: "Profesor encontrado",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    profesor: { $ref: "#/components/schemas/Profesor" },
                  },
                },
              },
            },
          },
          404: { $ref: "#/components/responses/NotFound" },
          500: { $ref: "#/components/responses/Error500" },
        },
      },

      put: {
        tags: ["Profesores"],
        summary: "Actualizar un profesor por ID",
        parameters: [{ $ref: "#/components/parameters/IdPath" }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/ProfesorCreate" },
            },
          },
        },
        responses: {
          200: {
            description: "Profesor actualizado correctamente",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    profesor: { $ref: "#/components/schemas/Profesor" },
                  },
                },
              },
            },
          },
          404: { $ref: "#/components/responses/NotFound" },
          500: { $ref: "#/components/responses/Error500" },
        },
      },

      delete: {
        tags: ["Profesores"],
        summary: "Eliminar un profesor por ID",
        parameters: [{ $ref: "#/components/parameters/IdPath" }],
        responses: {
          200: {
            description: "Profesor eliminado correctamente",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/MessageResponse" },
                example: {
                  message: "Profesor eliminado correctamente",
                },
              },
            },
          },
          404: { $ref: "#/components/responses/NotFound" },
          500: { $ref: "#/components/responses/Error500" },
        },
      },
    },

    "/api/asignaturas": {
      get: {
        tags: ["Asignaturas"],
        summary: "Obtener todas las asignaturas",
        responses: {
          200: {
            description: "Lista de asignaturas obtenida correctamente",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    asignaturas: {
                      type: "array",
                      items: { $ref: "#/components/schemas/Asignatura" },
                    },
                  },
                },
              },
            },
          },
          500: { $ref: "#/components/responses/Error500" },
        },
      },
      post: {
        tags: ["Asignaturas"],
        summary: "Crear una asignatura",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/AsignaturaCreate" },
            },
          },
        },
        responses: {
          201: {
            description: "Asignatura creada correctamente",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    asignatura: { $ref: "#/components/schemas/Asignatura" },
                  },
                },
              },
            },
          },
          500: { $ref: "#/components/responses/Error500" },
        },
      },
    },
    "/api/asignaturas/{id}": {
      get: {
        tags: ["Asignaturas"],
        summary: "Obtener una asignatura por clave",
        parameters: [{ $ref: "#/components/parameters/IdPath" }],
        responses: {
          200: {
            description: "Asignatura encontrada",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    asignatura: { $ref: "#/components/schemas/Asignatura" },
                  },
                },
              },
            },
          },
          404: { $ref: "#/components/responses/NotFound" },
          500: { $ref: "#/components/responses/Error500" },
        },
      },
    },

    "/api/tipos-curso": {
      get: {
        tags: ["Tipos de curso"],
        summary: "Obtener todos los tipos de curso",
        responses: {
          200: {
            description: "Lista de tipos de curso obtenida correctamente",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    tipos: {
                      type: "array",
                      items: { $ref: "#/components/schemas/TipoCurso" },
                    },
                  },
                },
              },
            },
          },
          500: { $ref: "#/components/responses/Error500" },
        },
      },
      post: {
        tags: ["Tipos de curso"],
        summary: "Crear un tipo de curso",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/TipoCursoCreate" },
            },
          },
        },
        responses: {
          201: {
            description: "Tipo de curso creado correctamente",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    tipoCurso: { $ref: "#/components/schemas/TipoCurso" },
                  },
                },
              },
            },
          },
          500: { $ref: "#/components/responses/Error500" },
        },
      },
    },
    "/api/tipos-curso/{id}": {
      get: {
        tags: ["Tipos de curso"],
        summary: "Obtener un tipo de curso por ID",
        parameters: [{ $ref: "#/components/parameters/IdPath" }],
        responses: {
          200: {
            description: "Tipo de curso encontrado",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    tipo: { $ref: "#/components/schemas/TipoCurso" },
                  },
                },
              },
            },
          },
          404: { $ref: "#/components/responses/NotFound" },
          500: { $ref: "#/components/responses/Error500" },
        },
      },
    },

    "/api/grupos": {
      get: {
        tags: ["Grupos"],
        summary: "Obtener todos los grupos",
        responses: {
          200: {
            description: "Lista de grupos obtenida correctamente",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    grupos: {
                      type: "array",
                      items: { $ref: "#/components/schemas/Grupo" },
                    },
                  },
                },
              },
            },
          },
          500: { $ref: "#/components/responses/Error500" },
        },
      },
      post: {
        tags: ["Grupos"],
        summary: "Crear un grupo",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/GrupoCreate" },
            },
          },
        },
        responses: {
          201: {
            description: "Grupo creado correctamente",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    grupo: { $ref: "#/components/schemas/Grupo" },
                  },
                },
              },
            },
          },
          500: { $ref: "#/components/responses/Error500" },
        },
      },
    },
    "/api/grupos/{id}": {
      get: {
        tags: ["Grupos"],
        summary: "Obtener un grupo por ID",
        parameters: [{ $ref: "#/components/parameters/IdPath" }],
        responses: {
          200: {
            description: "Grupo encontrado",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    grupo: { $ref: "#/components/schemas/Grupo" },
                  },
                },
              },
            },
          },
          404: { $ref: "#/components/responses/NotFound" },
          500: { $ref: "#/components/responses/Error500" },
        },
      },

      put: {
        tags: ["Grupos"],
        summary: "Actualizar un grupo por ID",
        parameters: [{ $ref: "#/components/parameters/IdPath" }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/GrupoCreate" },
            },
          },
        },
        responses: {
          200: {
            description: "Grupo actualizado correctamente",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    grupo: { $ref: "#/components/schemas/Grupo" },
                  },
                },
              },
            },
          },
          404: { $ref: "#/components/responses/NotFound" },
          500: { $ref: "#/components/responses/Error500" },
        },
      },

      delete: {
        tags: ["Grupos"],
        summary: "Eliminar un grupo por ID",
        parameters: [{ $ref: "#/components/parameters/IdPath" }],
        responses: {
          200: {
            description: "Grupo eliminado correctamente",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/MessageResponse" },
                example: {
                  message: "Grupo eliminado correctamente",
                },
              },
            },
          },
          404: { $ref: "#/components/responses/NotFound" },
          500: { $ref: "#/components/responses/Error500" },
        },
      },
    },
    "/api/periodos": {
      get: {
        tags: ["Periodos"],
        summary: "Obtener todos los periodos académicos",
        responses: {
          200: {
            description: "Lista de periodos obtenida correctamente",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    periodos: {
                      type: "array",
                      items: { $ref: "#/components/schemas/Periodo" },
                    },
                  },
                },
              },
            },
          },
          500: { $ref: "#/components/responses/Error500" },
        },
      },
      post: {
        tags: ["Periodos"],
        summary: "Crear un periodo académico",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/PeriodoCreate" },
            },
          },
        },
        responses: {
          201: {
            description: "Periodo creado correctamente",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    periodo: { $ref: "#/components/schemas/Periodo" },
                  },
                },
              },
            },
          },
          400: { $ref: "#/components/responses/BadRequest" },
          500: { $ref: "#/components/responses/Error500" },
        },
      },
    },
    "/api/periodos/{id}": {
      get: {
        tags: ["Periodos"],
        summary: "Obtener un periodo académico por ID",
        parameters: [{ $ref: "#/components/parameters/IdPath" }],
        responses: {
          200: {
            description: "Periodo encontrado",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    periodo: { $ref: "#/components/schemas/Periodo" },
                  },
                },
              },
            },
          },
          404: { $ref: "#/components/responses/NotFound" },
          500: { $ref: "#/components/responses/Error500" },
        },
      },
    },

    "/api/niveles": {
      get: {
        tags: ["Niveles"],
        summary: "Obtener todos los niveles o semestres",
        responses: {
          200: {
            description: "Lista de niveles obtenida correctamente",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    niveles: {
                      type: "array",
                      items: { $ref: "#/components/schemas/Nivel" },
                    },
                  },
                },
              },
            },
          },
          500: { $ref: "#/components/responses/Error500" },
        },
      },
      post: {
        tags: ["Niveles"],
        summary: "Crear un nivel o semestre",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/NivelCreate" },
            },
          },
        },
        responses: {
          201: {
            description: "Nivel creado correctamente",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    nivel: { $ref: "#/components/schemas/Nivel" },
                  },
                },
              },
            },
          },
          400: { $ref: "#/components/responses/BadRequest" },
          500: { $ref: "#/components/responses/Error500" },
        },
      },
    },
    "/api/niveles/{id}": {
      get: {
        tags: ["Niveles"],
        summary: "Obtener un nivel o semestre por ID",
        parameters: [{ $ref: "#/components/parameters/IdPath" }],
        responses: {
          200: {
            description: "Nivel encontrado",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    nivel: { $ref: "#/components/schemas/Nivel" },
                  },
                },
              },
            },
          },
          404: { $ref: "#/components/responses/NotFound" },
          500: { $ref: "#/components/responses/Error500" },
        },
      },

      put: {
        tags: ["Niveles"],
        summary: "Actualizar un nivel o semestre por ID",
        parameters: [{ $ref: "#/components/parameters/IdPath" }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/NivelCreate" },
            },
          },
        },
        responses: {
          200: {
            
            description: "Nivel actualizado correctamente",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    nivel: { $ref: "#/components/schemas/Nivel" },
                  },
                },
              },
            },
          },
          404: { $ref: "#/components/responses/NotFound" },
          500: { $ref: "#/components/responses/Error500" },
        },
      },

      delete: {
        tags: ["Niveles"],
        summary: "Eliminar un nivel o semestre por ID",
        parameters: [{ $ref: "#/components/parameters/IdPath" }],
        responses: {
          200: {
            description: "Nivel eliminado correctamente",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/MessageResponse" },
                example: {
                  message: "Nivel eliminado correctamente",
                },
              },
            },
          },
          404: { $ref: "#/components/responses/NotFound" },
          500: { $ref: "#/components/responses/Error500" },
        },
      },
    },

    "/api/ofertas": {
      get: {
        tags: ["Ofertas"],
        summary: "Obtener todas las ofertas semestrales",
        responses: {
          200: {
            description: "Lista de ofertas obtenida correctamente",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    ofertas: {
                      type: "array",
                      items: { $ref: "#/components/schemas/Oferta" },
                    },
                  },
                },
              },
            },
          },
          500: { $ref: "#/components/responses/Error500" },
        },
      },
      post: {
        tags: ["Ofertas"],
        summary: "Crear una oferta semestral",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/OfertaCreate" },
            },
          },
        },
        responses: {
          201: {
            description: "Oferta creada correctamente",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    oferta: { $ref: "#/components/schemas/Oferta" },
                  },
                },
              },
            },
          },
          400: { $ref: "#/components/responses/BadRequest" },
          500: { $ref: "#/components/responses/Error500" },
        },
      },
    },
    "/api/ofertas/{id}": {
      get: {
        tags: ["Ofertas"],
        summary: "Obtener una oferta semestral por ID",
        parameters: [{ $ref: "#/components/parameters/IdPath" }],
        responses: {
          200: {
            description: "Oferta encontrada",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    oferta: { $ref: "#/components/schemas/Oferta" },
                  },
                },
              },
            },
          },
          404: { $ref: "#/components/responses/NotFound" },
          500: { $ref: "#/components/responses/Error500" },
        },
      },
    },

    "/api/cursos": {
      get: {
        tags: ["Cursos"],
        summary: "Obtener todos los cursos",
        description:
          "Devuelve cursos incluyendo profesor, asignatura, oferta semestral, tipo de curso y grupo, de acuerdo con el controlador actual.",
        responses: {
          200: {
            description: "Lista de cursos obtenida correctamente",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    cursos: {
                      type: "array",
                      items: { $ref: "#/components/schemas/Curso" },
                    },
                  },
                },
              },
            },
          },
          500: { $ref: "#/components/responses/Error500" },
        },
      },
      post: {
        tags: ["Cursos"],
        summary: "Crear un curso",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/CursoCreate" },
            },
          },
        },
        responses: {
          201: {
            description: "Curso creado correctamente",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    curso: { $ref: "#/components/schemas/Curso" },
                  },
                },
              },
            },
          },
          500: { $ref: "#/components/responses/Error500" },
        },
      },
    },
    "/api/cursos/{id}": {
      get: {
        tags: ["Cursos"],
        summary: "Obtener un curso por ID",
        parameters: [{ $ref: "#/components/parameters/IdPath" }],
        responses: {
          200: {
            description: "Curso encontrado",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    curso: { $ref: "#/components/schemas/Curso" },
                  },
                },
              },
            },
          },
          404: { $ref: "#/components/responses/NotFound" },
          500: { $ref: "#/components/responses/Error500" },
        },
      },
    },
  },
  components: {
    parameters: {
      IdPath: {
        name: "id",
        in: "path",
        required: true,
        description: "Identificador del recurso",
        schema: {
          type: "integer",
          example: 1,
        },
      },
    },
    responses: {
      BadRequest: {
        description: "Solicitud inválida o campos obligatorios faltantes",
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/MessageResponse" },
            example: { message: "Todos los campos son obligatorios" },
          },
        },
      },
      NotFound: {
        description: "Recurso no encontrado",
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/MessageResponse" },
            example: { message: "Recurso no encontrado" },
          },
        },
      },
      Error500: {
        description: "Error interno del servidor",
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/ErrorResponse" },
            example: {
              message: "Error interno del servidor",
              error: "Detalle del error",
            },
          },
        },
      },
    },
    schemas: {
      MessageResponse: {
        type: "object",
        properties: {
          message: {
            type: "string",
            example: "Operación realizada correctamente",
          },
        },
      },
      ErrorResponse: {
        type: "object",
        properties: {
          message: {
            type: "string",
            example: "Error al procesar la solicitud",
          },
          error: {
            type: "string",
            example: "Detalle técnico del error",
          },
        },
      },

      Entidad: {
        type: "object",
        properties: {
          id_entidad: { type: "integer", example: 9 },
          nombre_entidad: { type: "string", example: "Ciudad de México" },
          abreviatura: { type: "string", example: "CDMX" },
        },
      },
      EntidadCreate: {
        type: "object",
        required: ["nombre_entidad", "abreviatura"],
        properties: {
          nombre_entidad: { type: "string", example: "Ciudad de México" },
          abreviatura: { type: "string", example: "CDMX" },
        },
      },
      EntidadPatch: {
        type: "object",
        description:
          "Campos opcionales para actualizar parcialmente una entidad federativa",
        properties: {
          nombre_entidad: {
            type: "string",
            example: "Jalisco",
          },
          abreviatura: {
            type: "string",
            example: "JAL",
          },
        },
      },
      EntidadConAlumnos: {
        allOf: [
          { $ref: "#/components/schemas/Entidad" },
          {
            type: "object",
            properties: {
              alumnos: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    numero_cuenta: { type: "integer", example: 320267696 },
                    nombre: { type: "string", example: "Luis" },
                    apellido_paterno: { type: "string", example: "Martínez" },
                    apellido_materno: { type: "string", example: "López" },
                  },
                },
              },
            },
          },
        ],
      },

      Alumno: {
        type: "object",
        properties: {
          numero_cuenta: { type: "integer", example: 320267696 },
          nombre: { type: "string", example: "Luis" },
          apellido_paterno: { type: "string", example: "Martínez" },
          apellido_materno: { type: "string", example: "López" },
          curp: { type: "string", example: "MALL000102HDFRZN02" },
          telefono: { type: "string", example: "5510000002" },
          sexo: { type: "string", enum: ["M", "F"], example: "M" },
          correo_electronico: {
            type: "string",
            format: "email",
            example: "luis.martinez@gmail.com",
          },
          fecha_nacimiento: {
            type: "string",
            format: "date",
            example: "2000-09-22",
          },
          foto_perfil: {
            type: "string",
            nullable: true,
            description:
              "Imagen codificada o valor compatible con el modelo usado",
            example: null,
          },
          id_entidad: { type: "integer", example: 15 },
          entidad_federativa: {
            $ref: "#/components/schemas/Entidad",
          },
        },
      },
      AlumnoCreate: {
        type: "object",
        required: [
          "nombre",
          "apellido_paterno",
          "apellido_materno",
          "curp",
          "telefono",
          "sexo",
          "correo_electronico",
          "fecha_nacimiento",
          "id_entidad",
        ],
        properties: {
          nombre: { type: "string", example: "Luis" },
          apellido_paterno: { type: "string", example: "Martínez" },
          apellido_materno: { type: "string", example: "López" },
          curp: { type: "string", example: "MALL000102HDFRZN02" },
          telefono: { type: "string", example: "5510000002" },
          sexo: { type: "string", enum: ["M", "F"], example: "M" },
          correo_electronico: {
            type: "string",
            format: "email",
            example: "luis.martinez@gmail.com",
          },
          fecha_nacimiento: {
            type: "string",
            format: "date",
            example: "2000-09-22",
          },
          foto_perfil: {
            type: "string",
            nullable: true,
            example: null,
          },
          id_entidad: { type: "integer", example: 15 },
        },
      },

      Profesor: {
        type: "object",
        properties: {
          id_profesor: { type: "integer", example: 1 },
          nombre: { type: "string", example: "Ana" },
          apellido_paterno: { type: "string", example: "Flores" },
          apellido_materno: { type: "string", example: "Cruz" },
          curp: { type: "string", example: "FOCA850707MDFRZN07" },
          rfc: { type: "string", example: "FOCA850707G07" },
          telefono: { type: "string", example: "5510000007" },
          sexo: { type: "string", enum: ["M", "F"], example: "F" },
          correo_electronico: {
            type: "string",
            format: "email",
            example: "ana.flores@gmail.com",
          },
          fecha_nacimiento: {
            type: "string",
            format: "date",
            example: "1985-07-07",
          },
          sueldo: { type: "number", format: "float", example: 33000 },
          all_data_professor: {
            type: "object",
            example: {},
          },
        },
      },
      ProfesorCreate: {
        type: "object",
        required: [
          "nombre",
          "apellido_paterno",
          "apellido_materno",
          "curp",
          "rfc",
          "telefono",
          "sexo",
          "correo_electronico",
          "fecha_nacimiento",
          "sueldo",
        ],
        properties: {
          nombre: { type: "string", example: "Ana" },
          apellido_paterno: { type: "string", example: "Flores" },
          apellido_materno: { type: "string", example: "Cruz" },
          curp: { type: "string", example: "FOCA850707MDFRZN07" },
          rfc: { type: "string", example: "FOCA850707G07" },
          telefono: { type: "string", example: "5510000007" },
          sexo: { type: "string", enum: ["M", "F"], example: "F" },
          correo_electronico: {
            type: "string",
            format: "email",
            example: "ana.flores@gmail.com",
          },
          fecha_nacimiento: {
            type: "string",
            format: "date",
            example: "1985-07-07",
          },
          sueldo: { type: "number", format: "float", example: 33000 },
        },
      },

      Asignatura: {
        type: "object",
        properties: {
          clave_asignatura: { type: "integer", example: 1001 },
          nombre: { type: "string", example: "Bases de Datos" },
        },
      },
      AsignaturaCreate: {
        type: "object",
        required: ["nombre"],
        properties: {
          nombre: { type: "string", example: "Bases de Datos" },
        },
      },

      Grupo: {
        type: "object",
        properties: {
          id_grupo: { type: "integer", example: 1 },
          nombre_grupo: { type: "string", example: "2401" },
        },
      },
      GrupoCreate: {
        type: "object",
        required: ["nombre_grupo"],
        properties: {
          nombre_grupo: { type: "string", example: "2401" },
        },
      },

      TipoCurso: {
        type: "object",
        properties: {
          id_tipo_curso: { type: "integer", example: 1 },
          nombre_tipo: { type: "string", example: "Ordinario" },
        },
      },
      TipoCursoCreate: {
        type: "object",
        required: ["nombre_tipo"],
        properties: {
          nombre_tipo: { type: "string", example: "Ordinario" },
        },
      },

      Periodo: {
        type: "object",
        properties: {
          id_periodo: { type: "integer", example: 1 },
          periodo_nombre: { type: "string", example: "2026-1" },
          fecha_inicio: {
            type: "string",
            format: "date",
            example: "2026-01-29",
          },
          fecha_fin: {
            type: "string",
            format: "date",
            example: "2026-06-07",
          },
        },
      },
      PeriodoCreate: {
        type: "object",
        required: ["periodo_nombre", "fecha_inicio", "fecha_fin"],
        properties: {
          periodo_nombre: { type: "string", example: "2026-1" },
          fecha_inicio: {
            type: "string",
            format: "date",
            example: "2026-01-29",
          },
          fecha_fin: {
            type: "string",
            format: "date",
            example: "2026-06-07",
          },
        },
      },

      Nivel: {
        type: "object",
        properties: {
          id_nivel_semestre: { type: "integer", example: 1 },
          nombre_semestre: { type: "string", example: "Primero" },
        },
      },
      NivelCreate: {
        type: "object",
        required: ["nombre_semestre"],
        properties: {
          nombre_semestre: { type: "string", example: "Primero" },
        },
      },

      Oferta: {
        type: "object",
        properties: {
          id_oferta_semestral: { type: "integer", example: 1 },
          id_periodo: { type: "integer", example: 1 },
          id_nivel_semestre: { type: "integer", example: 1 },
        },
      },
      OfertaCreate: {
        type: "object",
        required: ["id_periodo", "id_nivel_semestre"],
        properties: {
          id_periodo: { type: "integer", example: 1 },
          id_nivel_semestre: { type: "integer", example: 1 },
        },
      },

      Curso: {
        type: "object",
        properties: {
          id_curso: { type: "integer", example: 1 },
          cupo_maximo: { type: "integer", example: 40 },
          inscritos_actual: { type: "integer", example: 0 },
          id_profesor: { type: "integer", example: 1 },
          clave_asignatura: { type: "integer", example: 1001 },
          id_oferta_semestral: { type: "integer", example: 1 },
          id_tipo_curso: { type: "integer", example: 1 },
          id_grupo: { type: "integer", example: 1 },
          profesor: { $ref: "#/components/schemas/Profesor" },
          asignatura: { $ref: "#/components/schemas/Asignatura" },
          ofertaSemestral: { $ref: "#/components/schemas/Oferta" },
          tipoCurso: { $ref: "#/components/schemas/TipoCurso" },
          grupo: { $ref: "#/components/schemas/Grupo" },
        },
      },
      CursoCreate: {
        type: "object",
        required: [
          "cupo_maximo",
          "id_profesor",
          "clave_asignatura",
          "id_oferta_semestral",
          "id_tipo_curso",
          "id_grupo",
        ],
        properties: {
          cupo_maximo: { type: "integer", example: 40 },
          inscritos_actual: { type: "integer", example: 0 },
          id_profesor: { type: "integer", example: 1 },
          clave_asignatura: { type: "integer", example: 1001 },
          id_oferta_semestral: { type: "integer", example: 1 },
          id_tipo_curso: { type: "integer", example: 1 },
          id_grupo: { type: "integer", example: 1 },
        },
      },
    },
  },
};

module.exports = swaggerSpec;
