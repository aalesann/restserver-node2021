const mongoose = require('mongoose');
require('dotenv').config;


const dbConnection = async () => {
    try {
        mongoose.connect(process.env.MONGODB_LOCAL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false,
        })
        const connection = mongoose.connection;
        connection.once('open', () => {
            console.log('Base de datos conectada');
        });

    } catch (error) {
        console.log("ERROR: ", error);
        throw new Error('Error a la hora de conectar la base de datos');
    }
}

module.exports = {
    dbConnection
}

