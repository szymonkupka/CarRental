const{ model, Schema} = require('mongoose');
//import { Schema, model } from "mongoose";
//import mongoose from "mongoose";


const bookingSchema = new Schema({
     //TO DO :{type: String, required: true}
    // _id:    String, 
     thumbnailUrl: String,
     userEmail:  String,
     carName:  String,
     startData:  String,
     endData:  String,
});

module.exports = model('Bookings',bookingSchema);