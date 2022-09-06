const Evento = require("../models/Evento")

const obtenerEventos = async(req, res) => {

    const eventos = await Evento.find().populate('user', 'name'); //Muestra el nombre del usuario con el id

    return res.status(201).json({
        ok: true,
        msg: "Obtener eventos",
        eventos: eventos
    })
}

const crearEvento = async(req, res) => {

    const evento = new Evento(req.body);

    try {

        evento.user = req.uid; // Guardamos el usuario con el uid que hay en la peticion (lo cogemos del token)
        const eventoBD = await evento.save();

        return res.status(201).json({
            ok: true,
            evento: eventoBD
        })
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: "No se pudo crear el evento."
        })
    }
}

const actualizarEvento = async(req, res) => {

    const id_evento = req.params.id;

    try {
        const eventoID = await Evento.findById(id_evento);

        if (eventoID) {

            const user_id = req.uid;
            if (eventoID.user.toString() == user_id) {
                const nuevoEvento = await Evento.findOneAndUpdate({ _id: id_evento }, 
                    {
                        $set: req.body
                    },
                    { new: true}
                )

                return res.status(201).json({
                    ok: false,
                    evento: nuevoEvento
                })
            }
            else {
                return res.status(401).json({
                    ok: false,
                    msg: "No tiene permiso para actualizar el evento."
                })
            }

        }
        else {
            return res.status(404).json({
                ok: false,
                msg: "No se pudo encontrar el evento."
            })
        }
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: "Hable con el administrador"
        })
    }

    
}

const eliminarEvento = async(req, res) => {
    const id_evento = req.params.id;

    try {
        const eventoID = await Evento.findById(id_evento);


        if (eventoID) {

            const user_id = req.uid;
            if (eventoID.user.toString() == user_id) {
                const eventoEliminar = await Evento.findOneAndRemove(eventoID);

                return res.status(201).json({
                    ok: true,
                    evento: eventoEliminar
                })
            }
            else {
                return res.status(401).json({
                    ok: false,
                    msg: "No tiene permiso para eliminar el evento."
                })
            }

        }
        else {
            return res.status(404).json({
                ok: false,
                msg: "No se pudo encontrar el evento."
            })
        }
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: "Hable con el administrador"
        })
    }
}

module.exports = {
    obtenerEventos,
    crearEvento,
    actualizarEvento,
    eliminarEvento
};