const jwt = require('jsonwebtoken');

const validarJWT = (req, res, next) => {
    // El token lo pedimos en los headers de la petición como "x-token"
    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json( {
            ok: false,
            msg: 'No se ha recibido el token'
        })
    }
    else {

        try {
            const payload = jwt.verify( //Datos del usuario que vienen en el token
                token,
                process.env.SECRET_WORD_JWT
            );

            req.uid = payload.uid;
            req.name = payload.name;


        } catch (error) {
            return res.status(401).json( {
                ok: false,
                msg: 'Token no válido'
            })
        }

    }



    next();
}

module.exports = {
    validarJWT
}