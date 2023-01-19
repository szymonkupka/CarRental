//import Car from './Models/Car'
const Car = require('../../Models/Car');
//const { transformEvent } = require('./merge');

module.exports = {
  getAllCars: async () => {
    return Car.find({});
  },
  createCar: async (args) => {
    let car = new Car(args.Car);
    return car.save();
  }
};