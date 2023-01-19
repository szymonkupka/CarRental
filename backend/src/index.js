//import { buildSchema } from 'graphql';
//import  express  from 'express';
//import graphqlHTTP from 'express-graphql';
//import bodyParser from 'body-parser';


//import Car from './Models/Car'
//import schema from './Graphql/schema'
//import Resolvers from './Graphql/resorvers/index'

//const  schema= require('./Graphql/schema');

//const express = require('express');
//const bodyParser = require('body-parser');
//const { graphqlHTTP } = require('express-graphql');
//const { buildSchema,  } = require('graphql') //TO DO lear object destructuring
//TO DO dodać ładnie ${}  i po .net/ dodac nazwe?
//const Resolvers = require('./Graphql/resorvers/index');

const mongoose = require('mongoose');
//import mongoose from 'mongoose';
const { ApolloServer }  = require('apollo-server');
//import { ApolloServer } from 'apollo-server';

const typeDefs = require('./Graphql2/TypeDefs');
const resolvers = require('./Graphql2/resolvers');
//import { typeDefs } from './Graphql2/TypeDefs.js';
//import { resolvers } from './Graphql2/resolvers.js';

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req, res }) => ({ req, res })
});

const MONGODB ="mongodb+srv://root:root@cluster0.etn5kov.mongodb.net/?retryWrites=true&w=majority"


mongoose.connect(MONGODB, {useNewUrlParser: true})
    .then(() => {
        console.log("MongoDB Connected");
        return server.listen({port: 5000});
    })
    .then((res) => {
        console.log(`Server running at ${res.url}`)
    });





/*

/*
app.listen(5000);

//const app= express();
app.use(bodyParser.json());
/*app.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    rootValue: Resolvers,
    graphiql: true
  })
);
import express from "express";
//import { graphqlHTTP } from "express-graphql";
import { schema } from "./Schema";
import cors from "cors";
import { createConnection } from "typeorm";
import { Cars } from "./Entities/Cars";
import { Users } from "./Entities/Users";

import typeDefs from "./Graphql/TypeDefs"
const ApolloServer = require('apollo-server');
const mongoose = require('mongoose');

const MONGODB ="mongodb+srv://root:root@cluster0.etn5kov.mongodb.net/?retryWrites=true&w=majority"
// TO DO pozmieniac foldery 
//const typeDefs = require('./Graphql/TypeDefs')
const resolvers = require('./Graphql/resorvers')
const server = new ApolloServer({
  typeDefs,
  resolvers
});

mongoose.connect(MONGODB,{userNewUrlParser: true})
  .then(() => {
    console.log("sucessfull");
    return server.listen({port: 5000})
  })
.then((res ) =>{//: any
    console.log(`${res.url}`)
  })
const main = async() =>{
    await createConnection({
        type: "mysql",
        database: "yourcar",
        username: "root",
        password: "root",
        logging: true,
        synchronize: true,
        entities:  [Users,Cars ]
      });
      
    const app = express()
    const cors=require("cors");
const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}

app.use(cors(corsOptions))
    app.use(express.json());
    app.use(
      "/graphql",
      graphqlHTTP({
        schema,
        graphiql: true,
      })
    );

    app.listen(3001, () => {
        console.log("SERVER RUNNING ON PORT 3001");
      });
};

main().catch((err)=>{
    console.log(err);
})
*/
