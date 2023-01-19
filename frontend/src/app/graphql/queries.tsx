import gql from "graphql-tag";

export const GET_ALL_CARS = gql`
query getAllCars {
  getAllCars {
      _id
      name 
      dailyPrice
      mileage
      gas
      gearType
      thumbnailUrl
     
  }
}
`
export const GET_USER_BY_EMAIL = gql`
query GetUserByEmail($email: String!) {
  getUserByEmail(email: $email) {
    _id
    name
    email
    password
    token
    role
  }
}
`
export const GET_CAR = gql`
query GetCar($name: String!) {
  getCar(name: $name) {
    _id
    dailyPrice
    gas
    gearType
    mileage
    name
    thumbnailUrl
  }
}
`
//TO DO ! przy String
export const GET_CARS_BOOKINGS = gql`
query Query($carName: String) {
  getCarBookings(carName: $carName)
}
`

export const GET_USERS_BOOKINGS = gql`
query Query($userEmail: String) {
  getUserBookings(userEmail: $userEmail) {
    _id
    carName
    endData
    startData
    thumbnailUrl
    userEmail
  }
}`
;
