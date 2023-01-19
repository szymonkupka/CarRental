import React from 'react';
import './App.css';
import styled from "styled-components";
import tw from "twin.macro";
import { HomePage } from './app/cointeiners/HomePage';
import { StateProvider } from './app/context/StateProvider';
import { AuthProvider, useAuthValue } from './app/context/authContext';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from "@apollo/client";
import { Login } from './app/cointeiners/Login';
import { Register } from './app/cointeiners/Register';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from "react-router-dom";
import {setContext} from "@apollo/client/link/context"
import { Car } from './app/components/car/Car';
import { UsersBookings } from './app/cointeiners/usersBookings';


const AppContainer = styled.div`
  ${tw`
    w-full
    h-full
    flex
    flex-col
  `};
`;

function App() {
  const { user} = useAuthValue();
  console.log(user);
  const httpLink = createHttpLink({uri: "http://localhost:5000/graphql"});
  const authLink = setContext((_,  { headers }) =>{
    return{
    headers: {
      ...headers,
    authorization: localStorage.getItem("token ") || "" }}});

  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });
  
  return (
    <ApolloProvider client={client}>
     <StateProvider>
        <AppContainer>
          <Router>
            <Routes>
               <Route  path ="/" element = {user?<Navigate to="/homepage" /> : <Login/> } />
               <Route  path = "/register" element = {user? <Navigate to="/homepage" /> :<Register/>} />
               <Route  path = "/homepage" element = {user? <HomePage/>: <Navigate to="/" /> } />
               <Route  path = "/car/:name" element ={user? <Car/>: <Navigate to="/" />} />
               <Route  path = "/bookings" element ={user? < UsersBookings/>: <Navigate to="/" />} />
             </Routes>
           </Router>
        </AppContainer> 
      </StateProvider>
    </ApolloProvider>
  );
}

export default App;
