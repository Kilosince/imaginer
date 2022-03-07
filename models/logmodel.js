
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const loggerSchema = new mongoose.Schema({
  imagePath:{type: String,required:true},
  title:{type: String, required:true},
  description:{type: String, required:true},
  price:{type: Number, required:true},
  available_quantity:{type: Number, required:true},
  date: { type: Date, required: true },
 });


 const Mog = mongoose.model('Mog', loggerSchema);

 module.exports = Mog;
