const {response} = require('express');
const { validationResult } = require('express-validator');

const validarCampos = (req, res = response, next) => {
    // Manejo de errores
    const errores = validationResult(req);
    if(!errores.isEmpty()){
        return res.status(400).json({
            ok: false,
            errores: errores.mapped()
        });
    }
    console.log(errores);

    next();
}

module.exports = {
    validarCampos
}