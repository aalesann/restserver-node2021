const Role = require('../models/Role');
const Usuario = require('../models/Usuario');


const esRolValido = async (rol = '') => {
    const existeRol = await Role.findOne({rol});

    if(!existeRol) {
        throw new Error(`El rol ${ rol } no está registrado en la base de datos`);
    }
}

const emailExiste = async (correo = '') => {
    const existeEmail = await Usuario.findOne({ correo });
    if( existeEmail){
        throw new Error(`El correo ${correo} ya existe`);
    }
}


const exsteUsuarioPorId = async (id) => {
    // Verificar si el usuario existe
    const existeUsuario = await Usuario.findById(id);
    if( !existeUsuario) {
        throw new Error(`El usuario no existe`);
    }

}

module.exports = {
    esRolValido,
    emailExiste,
    exsteUsuarioPorId
}