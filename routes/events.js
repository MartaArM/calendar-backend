const {Router} = require('express');
const { check } = require('express-validator');
const { obtenerEventos, crearEvento, actualizarEvento, eliminarEvento } = require('../controllers/events');
const { esFecha } = require('../helpers/esFecha');
const { validarCampos } = require('../middlewares/validacionCampos');
const { validarJWT } = require('../middlewares/validacionJWT');

const router = Router();

router.use(validarJWT); // Como lo tienen que usar todas, se puede poner aqui

//Obtener eventos
router.get(
    '/', 
    [
      
    ],
    obtenerEventos);

    //Crear un nuevo evento
router.post(
    '/', 
   [
    check('title', 'El título no puede ser vacío').not().isEmpty(),
    check('start', 'La fecha de inicio no es correcta').custom(esFecha), // Se puede hacer un check personalizado
    check('end', 'La fecha de fin no es correcta').custom(esFecha),
    validarCampos
   ],
    crearEvento);

router.put(
    '/:id', 
   // [
     //   validarJWT
   // ],
    actualizarEvento);

router.delete(
    '/:id', 
   // [
     //   validarJWT
   // ],
    eliminarEvento);

module.exports = router;