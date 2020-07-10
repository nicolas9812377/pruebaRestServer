const mongoose = require('mongoose');
let uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;

let impresoraSchema = new Schema({
    marca: {
        type: String,
        required: [true, 'La marca es requerido']
    },
    modelo: {
        type: String,
        required: [true, 'El modelo es requerido']
    },
    serie: {
        type: Number,
        required: [true, 'La serie es requerido'],
        unique: true
    },
    color: {
        type: Boolean,
        default: false,
        required: false
    },
    ip: {
        type: String,
        required: [true, 'La ip es requerido']
    },
    contador: {
        type: Number,
        default: 0,
        required: false
    },
    precio: {
        type: Number,
        required: [true, 'El precio es requerido']
    }
});

impresoraSchema.plugin(uniqueValidator, { message: '{PATH} debe ser único' });

impresoraSchema.methods.toJSON = function() {
    let imp = this;
    let impObject = imp.toObject();
    delete impObject.contador;

    return impObject;
}

module.exports = mongoose.model('impresora', impresoraSchema);