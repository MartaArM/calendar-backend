const jwt = require('jsonwebtoken');

const generarJWT = (uid, name) => {
    // https://jwt.io/
    return new Promise( (resolve, reject) => {
        const payload = {uid, name};

        jwt.sign( 
            payload, /* Datos que queremos que vayan en el token */
            process.env.SECRET_WORD_JWT, /*palabra secreta que se necesita */
            {
                expiresIn: '2h' // Cuanto tarda el token en expirar
            },
            (err, token) => { 
                if (err) {
                    console.log(err)
                    reject("No se pudo generar el token");
                }
                else {
                    resolve(token);
                }
            }
        )
    })
}

module.exports = {
    generarJWT
}