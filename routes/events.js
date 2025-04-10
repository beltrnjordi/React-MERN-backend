const { getEventos, crearEvento, actualizarEvento, borrarEvento } = require("../controllers/events");
const { Router } = require('express');
const { validarJWT } = require("../middlewares/validar-jwt");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const { isDate } = require("../helpers/isDate");

const router = Router();
 
// Todas tienen que pasar por la validacion del JWT
router.use(validarJWT); // cualquier peticion que se encuentre abajo, pasaran por validar token

// Obtener eventos
router.get('/', getEventos);
// getEventos tiene que retornar el contenido de controllers/events.js

// Crear un nuevo evento
router.post(
    '/',
    [
        check('title', 'El titulo es obligatorio').not().isEmpty(),
        check('start', 'Fecha de inicio obligatoria').custom(isDate),
        check('end', 'Fecha de finalización obligatoria').custom(isDate),
        validarCampos
    ],
    crearEvento);

// // Actualizar evento
router.put('/:id', actualizarEvento);

// // Borrar evento
router.delete('/:id', borrarEvento);

module.exports = router;