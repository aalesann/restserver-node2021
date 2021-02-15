
const { Router } = require('express');
const { check } = require('express-validator');
const { usuariosGet, usuariosPut, usuariosPost, usuariosDelete, usuariosPatch } = require('../controllers/usuarios.controllers');
const { validarCampos } = require('../middlewares/validar-campos');
const { esRolValido, emailExiste, exsteUsuarioPorId } = require('../helpers/db-validators');
const router = Router();

router.get('/', usuariosGet)

router.put('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( exsteUsuarioPorId),
    check('rol').custom( esRolValido ), 
    validarCampos
] ,usuariosPut)

// Ruta para crear un nuevo usuario
router.post('/', [
    check('nombre', 'El nombre no es válido').not().isEmpty(),
    check('password', 'El password debe ser más de 6 caracteres').not().isEmpty().isLength({ min: 6}),
    check('correo', 'El correo no es válido').isEmail().custom( emailExiste ),
    // check('rol', 'No es un rol permitido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('rol').custom( esRolValido ), 
    validarCampos
] , usuariosPost)

// Ruta para eliminar un usuario por id
router.delete('/:id',[
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( exsteUsuarioPorId),
    validarCampos
] ,usuariosDelete)

router.patch('/', usuariosPatch)



module.exports = router;