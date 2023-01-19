import { GraphQLID, GraphQLString } from "graphql";
import { UserType } from "../TypeDefs/User";
//import { MessageType } from "../TypeDefs/Messages";
import { Users } from "../../Entities/Users";

const AppolloError =require('apollp-server-errors');
const bcyrpt = require('bcryptjs')
export const CREATE_USER = {
  type: UserType,
  args: {
      name: { type: GraphQLString },
      email:{ type: GraphQLString },
      password:{ type: GraphQLString },
      role:{ type: GraphQLString },
  },
  async resolve(parent: any, args: any) {
    const { name,email,password,role} = args;
    // TO DO ładniej prosciej nie na if
    const Userexists = await Users.findOne({where:{email: email}});
    if(Userexists){
      throw new AppolloError('User with this email:'+ email
       +' exists','USER_EXISTS')
    }
     const Epassword = await bcyrpt.hash(password, 10)
    await Users.insert({ name,email,password: Epassword,role});
  //  return args;
  },
};