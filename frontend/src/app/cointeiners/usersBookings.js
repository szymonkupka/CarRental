import React from 'react'
import styled from 'styled-components'
import { useAuthValue } from '../context/authContext'
import { GET_USERS_BOOKINGS } from '../graphql/queries'
import { useMutation, useQuery } from '@apollo/client'
import { Navbar } from '../components/navbar'
import tw from "twin.macro";
import { DELETE_BOOKNIG } from '../graphql/mutations'

const DeleteButton = styled.button`
  background-color: #f03d4e;
  color: #fff;
  border-radius: 4px;
  padding: 8px 12px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  &:hover {
    background-color: #d52c3d;
  }
`;



const CarCard = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  overflow: hidden;
  margin: 10px;
  &:hover {
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
    transform: scale(1.05);
  }
`
const CarImage = styled.img`
  width: 200px;
  height: 150px;
  object-fit: cover;
  margin: 10px;
`
const CarInfo = styled.div`
  width: 200px;
  padding: 10px;
  h3 {
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 8px;
  }
  p {
    font-size: 14px;
    color: #6a737d;
  }
`;
const PageContainer = styled.div `
  ${tw`
    flex
    flex-col
    w-full
    h-full
    items-center
    overflow-x-hidden
  `}
  margin-top:50px;
`;

export  function UsersBookings() {
  
  const { user} = useAuthValue();
  const [deleteBooking,{ loading: loadingDelete}] = useMutation(DELETE_BOOKNIG,{
    refetchQueries: [{
      query: GET_USERS_BOOKINGS,
      variables: { userEmail: user.email }
    }],
  });
  const { data, loading } = useQuery(GET_USERS_BOOKINGS,{
    variables: {
      userEmail: user.email,
  }});
  if(loading || loadingDelete)
  return "Loading"
  
  return (
    <>
  <Navbar/>
    <PageContainer>  
    <h1 className="text-2xl font-medium text-center my-4">Your Bookings</h1>
    
    <div className="flex flex-wrap" style={{paddingTop: "50px"}}>
      {data.getUserBookings.map(booking => (   //TO DO CAR NA BOOKING
        <CarCard key={booking._id}>
          <img src={booking.thumbnailUrl} alt={booking.carName} />
          <CarInfo>
            <h3>{booking.carName}</h3>
            <p></p>
          </CarInfo>
          <DeleteButton onClick={() =>{ 
            //e.preventDefault();
             deleteBooking({ variables: { _id: booking._id } }); }} >Delete reservation</DeleteButton>
        </CarCard>
        
      ))}
    </div>
    </PageContainer>
    </>
  )
}