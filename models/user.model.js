const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const StatLineSchema = new mongoose.Schema({


      ourId: {
            type: String,
            required: true
      },
      ready: {
            type: String,
            required: true
      },
      timeMan: {
            type: Number,
            required: false
      },

 });

 const TicketSchema = new mongoose.Schema({
   ourId: { type: String, required: true, min: 2, max: 200 },
   title: { type: String, required: true },
   notes: { type: String, required:true },
   quantity: { type: Number, required: true },
   price: { type: Number, required:true }
  });


const OrderSchema = new mongoose.Schema({

      imagePath: {
            type: String,
            required: true,
            min: 2,
            max: 200
          },

          ourId: {
            type: String,
            required: true,
            trim: true,
            max: 255,
            min: 3
          },

          email: {
            type: String,
            required: false,
            trim: true,
            max: 255,
            min: 3
          },

      title: {
            type: String,
            required: true
        },
      description:{
          type: String,
          required:true
        },
      notes: {
            type: String,
            required: true
      },
      quantity: {
            type: Number,
            required: true
      },
      price: {
            type: Number,
            required: true
      },
      date: {
          type: Number,
          required: true }

 });

 const AdminoSchema = new mongoose.Schema({

       ourId: {
             type: String,
             required: true,
             min: 2,
             max: 200
           },

           title: {
             type: String,
             required: true
         },
       notes: {
             type: String,
             required:true
       },
       quantity: {
             type: Number,
             required: true
       },
       price: {
             type: Number,
             required:true
       },
       emailOp: {
             type: String,
             required: false
       },
       date: {
         type: Date,
         required: true
        }
  });
    /*  title: {
          type: String,
          required: true
        },
      notes: {
            type: String,
            required: true,
            min: 2,
            max: 200

          },
      totalPrice: {
        type: Number,
        required:true
      },
      takeout: {
        type: Boolean,
        required:false
      }*/


const userSchema = new mongoose.Schema({
      name: {
          type: String,
          required: true,
          min: 6,
          max: 255
        },
        kind: {
          type: String,
          required: true
        },
        email: {
          type: String,
          required: true,
          unique: true,
          trim: true,
          max: 255,
          min: 6
        },
        password: {
          type: String,
          required: true,
          trim: true,
          max: 1024,
          min: 6
        },
        orders: [OrderSchema],
        adminO: [AdminoSchema],
        ticketb: [TicketSchema],
        statLine: [StatLineSchema]
    });

  const User = mongoose.model('User', userSchema);

  module.exports = User;
