const {gql} = require('apollo-server');
//import gql from "graphql-tag";


module.exports = gql`
type Car {
     _id: ID!    
     name: String
     dailyPrice: Float!
     mileage: Float!
     gas: String!
     gearType: String!
     thumbnailUrl: String! 
  
 }
 input inputCar{
     name: String!
     dailyPrice: Float!
     mileage: Float!
     gas: String!
     gearType: String!
     thumbnailUrl: String! 
 }
 input inputUser {
     name: String!
     email: String!
     password: String!
 }
 input inputLogin{
    email: String!
    password: String!
 }
 type User {
     _id: ID!
     name: String!
     email: String!
     password: String!
     token: String
     role: String
 }
 type Booking{
    _id: ID!
    thumbnailUrl: String,
    userEmail:  String,
     carName:  String,
     startData:  String,
     endData:  String,
 }
 type Query {
     getCarBookings(carName:String): [[String]]
     getUserBookings(userEmail: String) : [Booking]
     getAllCars:[Car!]!
     getUserByEmail(email: String!): User!
     getCar(name: String!): Car!
     
 }

 type Mutation {
     deleteBooking(_id: String) : Booking
     createCar(Car: inputCar): Car!
     createUser(User: inputUser): User
     createBooking(userEmail:String, carName:String, startData:String,
      endData:String,thumbnailUrl: String): Booking
     createUser2(name: String!, email: String!,password: String!,role:String!): User
     login(User: inputLogin): User
 }
`
