const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartSchema = new Schema({
    imagePath:{type: String,required:true},
    title:{type: String, required:true},
    notes:{type: String, required:true},
    price:{type: Number, required:true}, {
      timestamps: true,
});

const Cart = mongoose.model('Cart', cartSchema);



module.exports = Cart;
