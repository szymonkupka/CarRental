import { GraphQLObjectType, GraphQLSchema } from "graphql";
import { GET_ALL_CARS } from "./Queries/Car";
import { CREATE_CAR } from "./Mutations/Car";
import { GET_ALL_USERS } from "./Queries/User";
import { CREATE_USER } from "./Mutations/User";

const RootQuery = new GraphQLObjectType({
  name: "RootQuery",
  fields: {
    getAllCars: GET_ALL_CARS,
    getAllUsers: GET_ALL_USERS
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    createCar: CREATE_CAR,
    createUser: CREATE_USER
   // deleteCar: DELETE_CAR,
  },
});

export const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});