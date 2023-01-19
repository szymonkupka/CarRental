import { GraphQLObjectType, GraphQLID, GraphQLString } from "graphql";
export const CarType = new GraphQLObjectType({
    name: "Car",
    fields: () => ({
      id: { type: GraphQLID },
      name: { type: GraphQLString },
      dailyPrice:{ type: GraphQLID },
      monthlyPrice:{ type: GraphQLID },
      mileage:{ type: GraphQLString },
      gas:{ type: GraphQLString },  
      gearType:{ type: GraphQLString },
      thumbnailUrl:{ type: GraphQLString },
    }),
  });