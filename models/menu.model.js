
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


const menuSchema = new Schema({
    imagePath:{type: String,required:true},
    title:{type: String, required:true},
    description:{type: String, required:true},
    price:{type: Number, required:true},
    available_quantity:{type: Number, required:true},
    notes:{type: String, required:false},
    date: { type: Date, required: true }
  }, {
    timestamps: true,
});

const Menu = mongoose.model('Menu', menuSchema);

module.exports = Menu;
