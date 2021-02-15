const { response } = require('express');
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/Usuario');

// GET
const usuariosGet = async (req = request, res = response) => {

    const { limite = 5, desde = 0 } = req.query; 
    const query = { estado: true }

    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
        .skip(Number(desde))
        .limit(Number(limite))
    ])

    res.json({ total, usuarios });
};

// PUT
const usuariosPut = async (req, res = response) => {

    const { id } = req.params;
    let { _id, password, google, correo, ...resto } = req.body;

    // TODO validar contra base de datos
    if (password) {
        const salt = await bcryptjs.genSalt(10);
        password = bcryptjs.hashSync(password, salt);
    }
    const nuevoUsuario = await Usuario.findByIdAndUpdate(id, resto)
    res.json(nuevoUsuario);

};


// POST
const usuariosPost = async (req, res = response) => {
    let usuario,
        usuarioGuardado;
    let { nombre, correo, password, rol } = req.body;

    try {

        // Verificar si el correo existe



        usuario = new Usuario({ nombre, correo, password, rol });


        // Encriptar la contraseña
        usuario.password = await usuario.encryptPassword(password);

        // Guardar usuario en BD
        usuarioGuardado = await usuario.save();

        res.json({
            usuarioGuardado
        });

    } catch (error) {
        console.log("ERROR AL GUARDAR USUARIO: ", error);
    }


};

// DELETE
const usuariosDelete = async (req, res = response) => {
    const { id } = req.params;

    // Borrar físicamente
    // const usuario = await Usuario.findByIdAndDelete( id );

    const usuario = await Usuario.findByIdAndUpdate( id, { estado: false });

    res.json({
        usuario
    });
    
};

// PATCH
const usuariosPatch = (req, res = response) => {
    res.status(200).json({
        msg: 'Patch API'
    });
};


module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete,
    usuariosPatch
}