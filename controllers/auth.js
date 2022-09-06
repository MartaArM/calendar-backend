// Funciones que se definen en las rutas
const {validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');
const {generarJWT} = require('../helpers/JSONWebTokens');
const Usuario = require('../models/Usuario');

const crearUsuario = async(req, res) => {

    // Datos que mandamos en el body
    const {email, password} = req.body;

    try {
        let usuario = await Usuario.findOne({email: email}); // El correo no se puede repetir, buscamos si ya está
        if (usuario) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya existe'
            })
        } 
        else { // Si el email no existe
            usuario = new Usuario(req.body); // Creamos un usuario

            //Encriptar la contraseña
            const salt = bcrypt.genSaltSync();
            usuario.password = bcrypt.hashSync(password, salt); //Encriptar la contraseña

            await usuario.save();// Lo guardamos en la BD

            // Generar el JSON Web Token
            const token = await generarJWT(usuario._id, usuario.name);

            return res.status(201).json({
                ok: true,
                uid: usuario._id,
                name: usuario.name,
                token: token
            })
        }    
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: 'Error. Hable con el administrador.'
        })
    }

}

const iniciarSesion = async(req, res) => {

    const {email, password} = req.body;

    try {
        let usuario = await Usuario.findOne({email: email}); // Buscamos si existe usuario con ese mail
        if (usuario) {
            const validPassword = bcrypt.compareSync(
                password /*Contraseña pasada por formulario*/,
                usuario.password /*Contraseña cifrada del usuario en la bbdd*/);
            
                if (validPassword) { // El email y la clave son correctos

                    // Generar el JSON Web Token
                    const token = await generarJWT(usuario.id, usuario.name);

                    return res.status(201).json({
                        ok: true,
                        uid: usuario._id,
                        name: usuario.name,
                        token: token
                    })
                }
                else {
                    return res.status(400).json({
                        ok: false,
                        msg: 'La contraseña no es válida'
                    })
                }

        } 
        else { // Si el email no existe
            return res.status(400).json({
                ok: false,
                msg: 'El email no existe'
            })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: 'Error. Hable con el administrador.'
        })
    }

    
}

const renovarToken = async(req, res) => {

    const uid = req.uid;
    const name = req.name;

    const token = await generarJWT(uid, name);

    return res.json({
        ok: true,
        msg: 'Renovar token',
        token
    })
}

module.exports = {
    crearUsuario,
    iniciarSesion,
    renovarToken
};