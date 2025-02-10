const { Informe } = require('../models');
const { User } = require('../models')

const crearInforme = async (req, res) => {
    try {
        const { cargo, motivo, descripcion, estado, remitenteId } = req.body;

        const nuevoInforme = await Informe.create({
            cargo, motivo, descripcion, estado, remitenteId
        });
        return res.status(201).json(nuevoInforme);
    } catch (error) {
        console.error("Error al crear el informe:", error);
        return res.status(500).json({ error: "Hubo un error al crear el informe.", detalles: error.message });
    }
};

const getInformes = async (req, res) => {
    try {
        const informes = await Informe.findAll({
            include: {
                model: User,
                as: 'remitente',
                attributes: ['name', 'id', 'role'],
            },
        });

        return res.status(200).json(informes);
    } catch (error) {
        console.error("Error al obtener los informes:", error);
        return res.status(500).json({
            error: "Hubo un error al obtener los informes .",
            detalles: error.message,
        });
    }
};

const getInforme = async (req, res) => {
    try {
        const { id } = req.params;

        const informe = await Informe.findByPk(id, {
            include: {
                model: User,
                as: 'remitente',
                attributes: ['name', 'id'],
            },
        });

        if (!informe) {
            return res.status(404).json({ error: "Informe no encontrado" });
        }

        return res.status(200).json(informe);  // Devolver 'informe' directamente aquí
    } catch (error) {
        console.error("Error al obtener el informe:", error);
        return res.status(500).json({
            error: "Hubo un error al obtener el informe.",
            detalles: error.message,
        });
    }
};




const actualizarInforme = async (req, res) => {
    try {
        const { id } = req.params
        const { cargo, motivo, descripcion, estado, remitenteId } = req.body;

        const informe = await Informe.findByPk(id);

        if (!informe) return res.status(404).json({ error: "Informe no encontrado" });

        informe.cargo = cargo || informe.cargo;
        informe.motivo = motivo || informe.motivo;
        informe.descripcion = descripcion || informe.descripcion;
        informe.estado = estado || informe.estado;
        informe.remitenteId = remitenteId || informe.remitenteId;

        await informe.save();

        return res.status(200).json(informe);
    } catch (error) {
        console.error("Error al actualizar el informe:", error);
        return res.status(500).json({ error: "Hubo un error al actualizar el informe.", detalles: error.message });
    }
};

const eliminarInforme = async (req, res) => {
    try {
        const { id } = req.params;
        const informe = await Informe.findByPk(id);

        if (!informe) return res.status(404).json({ error: "Informe no encontrado" });

        await informe.destroy();

        return res.status(200).json({ message: "Informe eliminado correctamente" })
    } catch (error) {
        console.error("Error al eliminar el informe:", error);
        return res.status(500).json({ error: "Hubo un error al eliminar el informe.", detalles: error.message });
    }
}

const actualizarEstado = async (req, res) => {
    const { id } = req.params;
    const { estado } = req.body;

    try {
        // Actualizar solo el campo necesario
        const informe = await Informe.findByPk(id);
        if (!informe) {
            return res.status(404).json({ message: "Informe no encontrado" });
        }

        informe.estado = estado || informe.estado; // Actualiza solo el campo enviado
        await informe.save();

        res.json(informe);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al actualizar el informe" });
    }
};

const getInformesPorRemitente = async (req, res) => {
    try {
        const { remitenteId } = req.params;


        if (!remitenteId) {
            return res.status(400).json({ error: "El parámetro remitenteId es requerido." });
        }

        // Realiza la consulta
        const informes = await Informe.findAll({
            where: {
                remitenteId: remitenteId, // Filtra por remitenteId
            },
            include: {
                model: User,
                as: 'remitente',
                attributes: ['name', 'id', 'role'],
            },
        });

        if (!informes.length) {
            return res.status(404).json({
                error: "No se encontraron informes para este remitente.",
            });
        }

        return res.status(200).json(informes);
    } catch (error) {
        console.error("Error al obtener informes:", error);
        return res.status(500).json({
            error: "Hubo un error al obtener los informes.",
            detalles: error.message,
        });
    }
};




module.exports = {
    crearInforme,
    getInformes,
    getInforme,
    actualizarInforme,
    eliminarInforme,
    actualizarEstado,
    getInformesPorRemitente,
};