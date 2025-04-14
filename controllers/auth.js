const {response} = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/Usuario');
const { generarJWT } = require('../helpers/jwt');

const crearUsuario = async(req, res = response) => {
    
    const {email, password} = req.body;

    try {
        // Buscamos el usuario en la base de datos por su email
        let usuario = await Usuario.findOne({email});

        // En el caso de que exista...
        if(usuario){
            return res.status(400).json({
                ok: false,
                msg: 'Usuario ya existente con ese correo'
            })
        }

        // Si no seguimos y lo almacenamos en la BD
        usuario = new Usuario(req.body);

        // Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);

        await usuario.save();

        // Generar JWT
        const token = await generarJWT(usuario.id, usuario.name);

        res.status(201).json({
            ok:true,
            uid: usuario.id,
            name: usuario.name,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: 'Error, hable con el administrador'
        });
    }
    
};

const loginUsuario = async(req, res = response) => {

    const {email, password} = req.body;

    try {
        // Buscamos el usuario en la base de datos por su email
        const usuario = await Usuario.findOne({email});

        // En el caso de que no exista...
        if(!usuario){
            return res.status(400).json({
                ok: false,
                msg: 'Usuario no existe con ese email'
            })
        }

        // Confirmar los passwords
        const validPassword = bcrypt.compareSync(password, usuario.password);

        if(!validPassword){
            return res.status(400).json({
                ok:false,
                msg: 'Password incorrecto'
            });
        }

        // Generar el JWT (JSON Web Token)
        const token = await generarJWT(usuario.id, usuario.name);

        res.json({
            ok:true,
            uid: usuario.id,
            name: usuario.name,
            token
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }
};

const revalidarToken = async(req, res = response) => {

    const {uid, name} = req;

    // Generar un nuevo JWT y retornarlo en esta peticion
    const token = await generarJWT(uid, name);

    res.json({
        ok:true,
        uid, name,
        token,
        msg: 'renew'
    });
};

module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken
}