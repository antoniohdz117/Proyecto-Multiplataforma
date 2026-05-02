const { ofertaSemestral } = require("../models");

const getOfertas = async (req, res) => {
    try {
        const ofertas = await ofertaSemestral.findAll();
        return res.json({ ofertas });
    } catch (error) {
        return res.status(500).json({
            message: "Error al obtener ofertas",
            error: error.message,
        });
    }
};

const getOfertaById = async (req, res) => {
    try {
        const oferta = await ofertaSemestral.findByPk(req.params.id);

        if (!oferta) {
            return res.status(404).json({
                message: "Oferta no encontrada",
            });
        }

        return res.json({ oferta });
    } catch (error) {
        return res.status(500).json({
            message: "Error al obtener oferta",
            error: error.message,
        });
    }
};

const createOferta = async (req, res) => {
    try {
        const { id_periodo, id_nivel_semestre } = req.body;

        if (!id_periodo || !id_nivel_semestre) {
            return res.status(400).json({
                message: "Todos los campos son obligatorios",
            });
        }

        const nuevaOferta = await ofertaSemestral.create({
            id_periodo,
            id_nivel_semestre,
        });

        return res.status(201).json({ oferta: nuevaOferta });
    } catch (error) {
        return res.status(500).json({
            message: "Error al crear oferta",
            error: error.message,
        });
    }
};

module.exports = {
    getOfertas,
    getOfertaById,
    createOferta,
};