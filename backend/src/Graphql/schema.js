const { buildSchema } = require('graphql')

module.exports = buildSchema(`

    type Car {
        _id: ID!    
        name: String!
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

    type User {
        _id: ID!
        name: String!
        email: String!
        password: String!
        role: String
    }
    type RootQuery {
        getAllCars:[Car!]!
    }

    type RootMutation {
        createCar(Car: inputCar): Car!
       
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
`);
// createUser(User: User): User!