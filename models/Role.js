const { model, Schema } = require('mongoose');

const roleSchema = new Schema({
   rol: {
       type: String,
       required: [true, 'El rol es obligatorio']
   }
   
}, {
    timestamps: true,   
});


module.exports = model('Role', roleSchema);