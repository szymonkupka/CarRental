import { GraphQLID, GraphQLString } from "graphql";
import { CarType } from "../TypeDefs/Car";
//import { MessageType } from "../TypeDefs/Messages";
import { Cars } from "../../Entities/Cars";

export const CREATE_CAR = {
  type: CarType,
  args: {
      name: { type: GraphQLString },
      dailyPrice:{ type: GraphQLID },
      monthlyPrice:{ type: GraphQLID },
      mileage:{ type: GraphQLString },
      gas:{ type: GraphQLString },  
      gearType:{ type: GraphQLString },
      thumbnailUrl:{ type: GraphQLString },
  },
  async resolve(parent: any, args: any) {
    const { name,dailyPrice,monthlyPrice,mileage,gas,gearType,thumbnailUrl } = args;
    await Cars.insert({ name,dailyPrice,monthlyPrice,mileage,gas,gearType,thumbnailUrl});
  //  return args;
  },
};
/*
export const UPDATE_PASSWORD = {
  type: MessageType,
  args: {
    username: { type: GraphQLString },
    oldPassword: { type: GraphQLString },
    newPassword: { type: GraphQLString },
  },
  async resolve(parent: any, args: any) {
    const { username, oldPassword, newPassword } = args;
    const user = await Users.findOne({ username: username });

    if (!user) {
      throw new Error("USERNAME DOESNT EXIST");
    }
    const userPassword = user?.password;

    if (oldPassword === userPassword) {
      await Users.update({ username: username }, { password: newPassword });

      return { successful: true, message: "PASSWORD UPDATED" };
    } else {
      throw new Error("PASSWORDS DO NOT MATCH!");
    }
  },
};

export const DELETE_USER = {
  type: MessageType,
  args: {
    id: { type: GraphQLID },
  },
  async resolve(parent: any, args: any) {
    const id = args.id;
    await Users.delete(id);

    return { successful: true, message: "DELETE WORKED" };
  },
};
*/