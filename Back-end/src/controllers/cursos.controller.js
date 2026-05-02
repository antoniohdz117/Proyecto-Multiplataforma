const {
    curso,
    profesor,
    asignatura,
    ofertaSemestral,
    tipoCurso,
    grupo,
} = require("../models");

const getCursos = async (req, res) => {
    const cursos = await curso.findAll({
        include: [
            profesor,
            asignatura,
            ofertaSemestral,
            tipoCurso,
            grupo,
        ],
    });

    return res.json({ cursos });
};

const getCursoById = async (req, res) => {
    try {
        const cursoEncontrado = await curso.findByPk(req.params.id);

        if (!cursoEncontrado) {
            return res.status(404).json({
                message: "Curso no encontrado",
            });
        }

        return res.json({ curso: cursoEncontrado });
    } catch (error) {
        return res.status(500).json({
            message: "Error al obtener curso",
            error: error.message,
        });
    }
};

const createCurso = async (req, res) => {
    try {
        const {
            cupo_maximo,
            inscritos_actual,
            id_profesor,
            clave_asignatura,
            id_oferta_semestral,
            id_tipo_curso,
            id_grupo,
        } = req.body;

        const nuevoCurso = await curso.create({
            cupo_maximo,
            inscritos_actual,
            id_profesor,
            clave_asignatura,
            id_oferta_semestral,
            id_tipo_curso,
            id_grupo,
        });

        return res.status(201).json({ curso: nuevoCurso });
    } catch (error) {
        return res.status(500).json({
            message: "Error al crear curso",
            error: error.message,
        });
    }
};

module.exports = {
    getCursos,
    getCursoById,
    createCurso,
};