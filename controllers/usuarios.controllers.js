
const { response } = require('express');


const usuariosGet = (req = request, res = response) => {
    
    const query =  req.query


    res.json({
        msg: 'Get API',
        query
    });
};
const usuariosPut = (req, res = response) => {
    const { id } = req.params;
    res.json({
        msg: 'Put API',
        id
    });
};
const usuariosPost = (req, res = response) => {
    
    const body = req.body;
    
    res.json({
        msg: 'Post API',
        body
    });
};
const usuariosDelete = (req, res = response) => {
    res.json({
        msg: 'Delete API'
    });
};
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