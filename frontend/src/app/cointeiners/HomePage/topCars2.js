import React, { useEffect, useState,useContext } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { ICar } from "../../typings/car"
import { Car } from "../../components/car";
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css'
import { GET_ALL_CARS } from '../../graphql/queries';
import { useQuery } from '@apollo/client';
//import carsList from "../../components/carsList";
import { useAuthValue,AuthContext } from "../../context/authContext";
import { useMediaQuery } from "react-responsive";
import { SCREENS } from "../../components/responsive";


import { Dispatch } from "redux";


import { useDispatch, useSelector } from "react-redux";
//import { createSelector } from "reselect";
import { createSelector } from "@reduxjs/toolkit";



const TopCarsContainer = styled.div`
  ${tw`
    max-w-screen-lg
    w-full
    flex
    flex-col
    items-center
    justify-center
    pr-4
    pl-4
    md:pl-0
    md:pr-0
    mb-10
  `};
`;

const Title = styled.h2`
  ${tw`
    text-3xl
    lg:text-5xl
    text-black
    font-extrabold
  `};
`;

const CarsContainer = styled.div`
  ${tw`
    w-full
    flex
    flex-wrap
    justify-center
    mt-7
    md:mt-10
  `};
`;

const EmptyCars = styled.div`
  ${tw`
    w-full
    flex
    justify-center
    items-center
    text-sm
    text-gray-500
  `};
`;

const LoadingContainer = styled.div`
  ${tw`
    w-full
    mt-9
    flex
    justify-center
    items-center
    text-base
    text-black
  `};
`;


//const wait = (timeout: number) => new Promise((rs) => setTimeout(rs, timeout));

export function TopCars() {
  const [current, setCurrent] = useState(0);
  const [isLoading, setLoading] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: SCREENS.sm });
  // TO DO 1 do innego componentu
  const { data } = useQuery(GET_ALL_CARS);
  const { user , login} = useAuthValue();//useContext(AuthContext);
     const carsList  = (data &&
    data.getAllCars.map((car) => {
      return(
        <Car 
          _id = {car._id}
          name={car.name}
          thumbnailSrc={car.thumbnailUrl}
          dailyPrice = {car.dailyPrice}
          mileage = {car.mileage}
          gearType = {car.gearType}
          gas = {car.gas}  />)
      }))  ;
  //TO DO 1 do innego componentu
  const responsive = {
    0: { items: 1 },
    568: { items: 2 },
    1024: { items: 3 },
};

  return (
    <TopCarsContainer>
      <Title>Explore Our Top Deals</Title>
        <CarsContainer>
        <AliceCarousel
        mouseTrackingEnabled
        infinite
        autoPlayInterval={3000}
        items={carsList}
        responsive={responsive}
        autoPlay
    />
        </CarsContainer>
      
    </TopCarsContainer>
  );
}
/*
  const testCar: ICar = {
    name: "Audi S3 Car",
    mileage: "10k",
    thumbnailSrc:
      "https://cdn.jdpower.com/Models/640x480/2017-Audi-S3-PremiumPlus.jpg",
    dailyPrice: 70,
    monthlyPrice: 1600,
    gearType: "Auto",
    gas: "Petrol",
  };

  const testCar2: ICar = {
    name: "HONDA cITY 5 Seater Car",
    mileage: "20k",
    thumbnailSrc:
      "https://dolcar.auto.pl/wp-content/uploads/2019/03/14671_st0640_116-1.png",
    dailyPrice: 50,
    monthlyPrice: 1500,
    gearType: "Auto",
    gas: "Petrol",
  };
*/