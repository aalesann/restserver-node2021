const { response } = require("express");
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/Usuario');
const { generarJWT } = require("../helpers/generar-jwt");
const { googleVerify } = require('../helpers/google-verify');
const login = async (req, res = response) => {

    const { correo, password } = req.body;

    try {

        // Verificar si el email existe
        const usuario = await Usuario.findOne({ correo });
        if (!usuario) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - correo'
            })
        }

        // Verificar si el usuario está activo
        if (!usuario.estado) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - estado: false'
            })
        }

        // Verificar la contraseña
        const validPassword = bcryptjs.compareSync(password, usuario.password)
        if (!validPassword) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - password'
            })
        }
        // Generar el jsonwebtoken
        const token = await generarJWT(usuario.id);
        res.json({
            usuario,
            token
        })
    } catch (error) {
        console.log("ERROR EN LOGIN: ", error)
        return res.status(500).json({
            msg: 'Algo salió mal'
        })
    }

}

const googleSignin = async (req, res = response) => {

    const { id_token } = req.body;

    try {

        const { nombre, img, correo } = await googleVerify( id_token);

        // Generar referencia al correo
        let usuario = await Usuario.findOne( { correo });
        
        if(!usuario) {
            // Tengo que crearlo
            const data = {
                nombre,
                correo,
                password: ':)',
                img,
                google: true
            };

            usuario = new Usuario( data );
            await usuario.save();
        };

        // Si el estado del usuario es false (eliminado)
        if( !usuario.estado ){
            return res.status(401).json({
                msg: 'Hable con el administrador, usuario bloqueado'
            })
        }

        const token = await generarJWT( usuario.id )


        res.json({
            msg: 'Todo ok! google signin',
            usuario,
            token
        });

    } catch (error) {

        res.status(400).json({
            msg: 'Token de Google no es reconocido',
            id_token
        })
    }
}


module.exports = {
    login,
    googleSignin
}