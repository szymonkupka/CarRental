const{ model, Schema} = require('mongoose');
//import { Schema, model } from "mongoose";
//import mongoose from "mongoose";


const carSchema = new Schema({
     //TO DO :{type: String, required: true}
     //_id:  String, 
     name: String,
     dailyPrice: Number,
     mileage: Number,
     gas: String,
     gearType: String,
     thumbnailUrl: String
});

module.exports = model('Car',carSchema);
