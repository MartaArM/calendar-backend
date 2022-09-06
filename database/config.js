// Configuración de la base de datos
const mongoose = require('mongoose');

const dbConnection = async() => {
    try {
        await mongoose.connect(process.env.DB_CNN) ;

        console.log("Conectado a DB");
    } catch (error) {
        console.log(error);
        throw new Error ("Error al inicializar la base de datos");
    }
}

module.exports = {dbConnection};
// mongoose.connect('mongodb://localhost:27017/test');