import { GET_ALL_CARS } from '../../graphql/queries';
import { useQuery } from '@apollo/client';
import React from "react";
import { Car } from '../car';
import { ICar } from "../../typings/car"


function ListOfCars() {
   const { data } = useQuery(GET_ALL_CARS);
 
     const carsList  = (data &&
    data.getAllCars.map((car :any ) => {
      console.log(car.name);
      return(
        <Car 
          _id= {car._id}
          name={car.name}
          thumbnailSrc={car.thumbnailUrl}
          dailyPrice = {car.dailyPrice}
          mileage = {car.mileage}
          gearType = {car.gearType}
          gas = {car.gas}  />)
      })) as [] ;
      return carsList;
}
export default ListOfCars;