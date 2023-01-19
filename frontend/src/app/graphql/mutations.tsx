import gql from "graphql-tag";
//TO DO sprawdzic jak z role czy musi byc w arg itd
export const CREATE_USER = gql`
  mutation CreateUser($user: inputUser) {
  createUser(User: $user) {
  name
  email
  token
  }
}
`;
export const LOGIN=gql`
mutation Login($user: inputLogin) {
  login(User: $user) {
   name
   email
   token
  }
}
`
export const CREATE_BOOKING=gql`
mutation Mutation($userEmail: String, $carName: String, $startData: String,
 $endData: String,$thumbnailUrl: String) {
  createBooking(userEmail: $userEmail, carName: $carName, startData: $startData,
   endData: $endData,thumbnailUrl: $thumbnailUrl) {
    thumbnailUrl
    carName
    _id
    endData
    startData
    userEmail
  }
}
`
export const DELETE_BOOKNIG=gql`
mutation Mutation($_id: String) {
  deleteBooking(_id: $_id) {
    _id
    carName
    endData
    startData
    thumbnailUrl
    userEmail
  }
}

`
/* mutation CreateUser2($name: String!, $email: String!, $password: String!, $role: String!) {
  createUser2(name: $name, email: $email, password: $password, role: $role) {
  name} }  */