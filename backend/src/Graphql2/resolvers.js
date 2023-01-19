const { ApolloError } = require('apollo-server');
const Car = require('../Models/Car');
const User = require('../Models/User');
const Booking = require('../Models/Booking');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {compare} = require('bcryptjs');
const {hash} = require('bcryptjs');
const {sign} = require('jsonwebtoken');
//import {User} from "../Models/User";
//import { Car } from "../Models/Car.js";
//import   sign  from 'jsonwebtoken';
//import hash, compare  from "bcryptjs";
// TO DO zmienic nazwy 
module.exports = {
    Query: {
      async getUserBookings(_,args){
        let bookings = await Booking.find({userEmail: args.userEmail});
        console.log(bookings);
        
        return bookings;
     },
        async getCarBookings(_,args){
            let bookings = await Booking.find({carName: args.carName});
            console.log(bookings);
            let startEndData = bookings.map(booking => [booking.startData, booking.endData]);
            return startEndData;
         },
        async getAllCars(){
            return await Car.find() //TO DO{}
        },
        async getUserByEmail(_,args){
            return await User.findOne({'email': args.email})
        },
        async getCar(_,args){
            return await Car.findOne({ 'name': args.name })
        },
        /*async getCarById(_,args){ //TO DO chyba tu nie bedzie dzialalo id
          return await Car.findOne({ '_id': args._id })
      },*/
        
            },
      Mutation: {
            async deleteBooking(_,args) {
              console.log("to jest ID:" + args._id)
                 const booking = await Booking.findByIdAndDelete(args._id);
                 if (!booking) {
                 // throw new ApolloError('Booking not found',"WRONG_BOOKING_ID");
              }
              return booking;
             },
            async createBooking(_,args){ 
                    let bookings = await Booking.find({carName: args.carName});
                      newStart = new Date(args.startData);
                      newEnd = new Date(args.endData);
                      if(newEnd < newStart)
                      {
                        throw new ApolloError("Wrong dates!!!" ,'WRONG_DATE');
                      }
                    bookings.map((b) =>{
                      console.log("b.startData:" + b.startData);
                      console.log("args.startData:" + args.startData);
                      start = new Date(b.startData);
                      end = new Date(b.endData);
                      //console.log("z bazy:" + start)
                      
                      if(newStart <= end && newEnd >= start )
                      {
                        throw new ApolloError("Wrong dates car already booked!!!" ,'CANT_BOOK');
                      }
                    });
                    let newBooking = new Booking({ ...args });
                    return newBooking.save();
                  },
            async createCar(_,args){ 
                    let car = new Car(args.Car);
                    return car.save();
                  },
            
            async createUser(_,args){//{args}
                    let user = new User(args.User);
                    const oldUser = await User.findOne({email: user.email});
                    if(oldUser){ //git ale nie ma erroru
                      throw new ApolloError("Existing user with email:"+ args.User.email ,'USER_EXISTS');
                    }
                    //TO DO SUPER_SECRET_STRING difrent place
                    user.password = await hash(user.password,12);
                    const token = sign(
                      {user: user },
                      "SUPER_SECRET_STRING",
                      {
                        expiresIn: "2h"
                      }
                    
                   );
                   user.token =  token;
                   console.log("xd");
                    return user.save();
                  },
               /*  createUser: ({args}) => {
                    console.log(args + "xDDDDDDDDDDDDDDD");
                    let user = new User(args);
                    return user.save();
                  },*/
                  async createUser2(_,args){
                        console.log(args);
                         let user = new User({ ...args }); 
                         return user.save();// User.findOne({'email': args.email})
                       },

                  async login(_,args){
                        const user = await User.findOne({email: args.User.email});

                        if (!user) {
                          throw new Error("USER ISN'T THE PART OF FAMILY!");
                        }
          
                        const valid = await compare(args.User.password, user.password);
                    
                        if (!valid) {
                          throw new Error("BAD PASSWORD!");
                        }
                       const token = sign(
                          {user: user },
                          "SUPER_SECRET_STRING",
                          {
                            expiresIn: "2h"
                          }
                         
                       );
                       user.token =  token;
                        return user.save();
                  
                        },
                },
                
    };
 //message: (_, {ID}) => Message.findById(ID)*/