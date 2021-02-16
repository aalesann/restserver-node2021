const express = require('express')
const cors = require('cors');
const morgan = require('morgan');

const { dbConnection } = require('../database/connection');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';
        this.authPath = '/api/auth';


        // Conexión a la base de datos
        this.conectarDB();

        // Middlewares
        this.middlewares();

        // Rutas de la aplicación
        this.routes();
    }

    async conectarDB() {
        await dbConnection();
    }

    middlewares() {
        // Cors
        this.app.use(cors());

        // Morgan
        this.app.use(morgan('dev'));
        // Lectura y parseo del body
        this.app.use(express.json());

        // Directorio público
        this.app.use(express.static('public'));
    }

    routes() {
        this.app.use(this.usuariosPath, require('../routes/usuarios.routes'));
        this.app.use(this.authPath, require('../routes/auth.routes'));
    }

    listen() {

        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en puerto ${this.port}`)
        })

    }

}

module.exports = Server;