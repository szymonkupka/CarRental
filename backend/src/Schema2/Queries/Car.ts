import { GraphQLList } from "graphql";
import { CarType } from "../TypeDefs/Car";
import { Cars } from "../../Entities/Cars";

export const GET_ALL_CARS = {
  type: new GraphQLList(CarType),
  resolve() {
    return Cars.find();
    
  },
};