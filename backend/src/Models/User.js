const {model, Schema} = require('mongoose');
//import { Schema, model } from "mongoose";
//import mongoose from "mongoose";


 const User = new Schema({
     //TO DO :{type: String, required: true, default: ...}
    //_id:    String, 
    name: String,
    email: {type: String, unique: true},
    password: String,
    token: String,
    role: {type : String, required: true, default: "user"},
});

module.exports = model('User',User);
