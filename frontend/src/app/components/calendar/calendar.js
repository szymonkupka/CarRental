import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRangePicker } from 'react-date-range';
import { useMutation, useQuery } from '@apollo/client';
import { useState } from 'react';
import { GET_CARS_BOOKINGS } from '../../graphql/queries';
import { eachDayOfInterval, startOfDay } from 'date-fns';
//import { Button } from "../../components/button";
import { connectStorageEmulator } from 'firebase/storage';
import styled, { keyframes, createGlobalStyle } from "styled-components";
import tw from "twin.macro";
import { CREATE_BOOKING } from '../../graphql/mutations';
import { useAuthValue } from '../../context/authContext';
import { useNavigate } from 'react-router-dom';

const jump = keyframes`
  from{
    transform: translateY(0)
  }
  to{
    transform: translateY(-3px)
  }
`;
const Button = styled.button`
  max-width: 100%;
  padding: 11px 13px;
  color: rgb(253, 249, 243);
  font-weight: 600;
  text-transform: uppercase;
  background: #f03d4e;
  border: none;
  border-radius: 3px;
  outline: 0;
  cursor: pointer;
  margin-top: 0.6rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease-out;
  :hover {
    background: rgb(200, 50, 70);
    animation: ${jump} 0.2s ease-out forwards;
  }
`;
export function CarCalendar({car}) {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [errors, setErrors] = useState("");
    const {user} = useAuthValue();
    const navigate = useNavigate();
    // TO DO exportowac do componentu wyrzej
    const selectedRange= {
        startDate,
        endDate,
        key: "selection"
    }
    const handleSelect = (ranges) =>{
      setStartDate(ranges.selection.startDate);
      setEndDate(ranges.selection.endDate);
      //TO DO IDK if i need this
      //selectedRange.startDate = ranges.selection.startDate;
      //selectedRange.endDate = ranges.selection.endDate;
    }


    const [createBooking,{loading: loadingBookong} ] = useMutation(CREATE_BOOKING,{
          onCompleted: (data)=>{
            console.log("onCompleted"+data);
          },
          refetchQueries: [{
            query: GET_CARS_BOOKINGS,
            variables: { carName: car.name }
          }],
        onError:(error) =>{ 
            console.log("zlapany:" + error.message);
            setErrors(error.message);
          },
        variables: {
                carName: car.name,
                startData: startDate.toLocaleDateString("en-US", {year: 'numeric', month: '2-digit', day: '2-digit'}).replace(/(\d+)\.(\d+)\.(\d+)/, '$2/$1/$3') ,
                endData: endDate.toLocaleDateString("en-US", {year: 'numeric', month: '2-digit', day: '2-digit'}).replace(/(\d+)\.(\d+)\.(\d+)/, '$2/$1/$3'),
                userEmail: user.email,
                thumbnailUrl: car.thumbnailUrl
           }
    });
    const { data,loading } = useQuery(GET_CARS_BOOKINGS,{
        variables: {
            carName: car.name
         },
      });
      if(loading || loadingBookong)
        return "Loading";

      const disabledRanges =  data.getCarBookings.map(([start, end]) => 
      ({ startDate: new Date(start), endDate: new Date(end) }));

      const allDatesInRanges = disabledRanges.flatMap(({ startDate, endDate }) => 
      eachDayOfInterval({ start: startOfDay(startDate), end: endDate }));


    return( 
      
    <div style={{display: "flex", flexDirection: "column"}}>
    <DateRangePicker
    ranges={[selectedRange]}
    minDate={new Date()}
    rangeColors={["#FD5861"]}
    onChange={handleSelect}
    disabledDates={allDatesInRanges}
    />
    <Button 
    onClick={async(e)=>{ 
        e.preventDefault();
          await createBooking();
          navigate("/bookings")
        }} >Rent Now</Button>
    </div>
    );

}