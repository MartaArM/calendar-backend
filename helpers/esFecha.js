const moment = require("moment");


const esFecha = (value, {req, location, path}) => {
    if (value) { // Si no es vacío
        const fecha = moment( value );
        if (fecha.isValid()) { // Se comprueba si la fecha es válido
            return true;
        }
        else {
            return false;
        }
    }
    else {
        return false;
    }
}

module.exports = {
    esFecha
}