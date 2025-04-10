
const {Router} = require('express');
const {check} = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const {crearUsuario, loginUsuario, revalidarToken} = require('../controllers/auth');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();


router.post(
    '/new',
    [
        // MIDDLEWARES
        check('name', 'El nombre es obligatorio').not().isEmpty(), // El nombre debe ser obligatorio y no debe estar vacío
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password debe de ser de 6 caracteres').isLength(6),
        validarCampos
    ],
    crearUsuario
);

// TODO: Aplicar los middlewares necesarios en esta ruta
router.post(
    '/',
    [
        // MIDDLEWARES
        check('email', 'El email no es válido').isEmail(),
        check('password', 'El password no es válido').isLength(6),
        validarCampos
    ],
    loginUsuario);

router.get('/renew', validarJWT, revalidarToken);

module.exports = router;