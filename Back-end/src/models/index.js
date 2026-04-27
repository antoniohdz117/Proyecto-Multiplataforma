const alumno = require("./alumno.model").alumno;

const profesor = require("./profesor.model").profesor;
const asignatura = require("./asignatura.model").asignatura;
const periodoAcademico = require("./periodoAcademico.model").periodoAcademico;

const nivelSemestre = require("./nivelSemestre.model").nivelSemestre;
const ofertaSemestral = require("./ofertaSemestral.model").ofertaSemestral;
const tipoCurso = require("./tipoCurso.model").tipoCurso;

const grupo = require("./grupo.model").grupo;
const curso = require("./curso.model").curso;

const plantel = require("./plantel.model").plantel;
const credito = require("./credito.model").credito;
const salon = require("./salon.model").salon;

const EntidadFederativa = require("./entidadFederativa.model").EntidadFederativa


alumno.belongsTo(EntidadFederativa, {
    foreignKey: "id_entidad",
});

EntidadFederativa.hasMany(alumno, {
    foreignKey: "id_entidad",
});

profesor.hasMany(curso, {
    foreignKey: "id_profesor",
});
curso.belongsTo(profesor, {
    foreignKey: "id_profesor",
});

asignatura.hasMany(curso, {
    foreignKey: "clave_asignatura",
});
curso.belongsTo(asignatura, {
    foreignKey: "clave_asignatura",
});

ofertaSemestral.belongsTo(periodoAcademico, {
    foreignKey: "id_periodo",
});
periodoAcademico.hasMany(ofertaSemestral, {
    foreignKey: "id_periodo",
});

ofertaSemestral.belongsTo(nivelSemestre, {
    foreignKey: "id_nivel_semestre",
});

nivelSemestre.hasMany(ofertaSemestral, {
    foreignKey: "id_nivel_semestre",
});
ofertaSemestral.hasMany(curso, {
    foreignKey: "id_oferta_semestral",
});
curso.belongsTo(ofertaSemestral, {
    foreignKey: "id_oferta_semestral",
});
tipoCurso.hasMany(curso, {
    foreignKey: "id_tipo_curso",
});
curso.belongsTo(tipoCurso, {
    foreignKey: "id_tipo_curso",
});
grupo.hasMany(curso, {
    foreignKey: "id_grupo",
});
curso.belongsTo(grupo, {
    foreignKey: "id_grupo",
});

module.exports = {
    alumno,
    EntidadFederativa,
    profesor,
    asignatura,
    tipoCurso,
    grupo,
    periodoAcademico,
    nivelSemestre,
    ofertaSemestral,
    curso,
};