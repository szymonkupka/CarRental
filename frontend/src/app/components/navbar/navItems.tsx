import React from "react";
import styled, { css } from "styled-components";
import tw from "twin.macro";
import { useMediaQuery } from "react-responsive";
import { SCREENS } from "../responsive";


const ListContainer = styled.ul`
  ${tw`
    flex
    list-none
  `};
`;

const NavItem = styled.li<{ menu?: any }>`
  ${tw`
    text-sm
    md:text-base
    text-black
    font-medium
    mr-1
    md:mr-5
    cursor-pointer
    transition
    duration-300
    ease-in-out
    hover:text-gray-700
  `};
`;
export function NavItems() {
    const isMobile = useMediaQuery({ maxWidth: SCREENS.sm });

    return (
          <ListContainer>
            <NavItem>
              Home
            </NavItem>
            <NavItem >
              <a href="#">Cars</a>
            </NavItem>
            <NavItem >
              <a href="#">Services</a>
            </NavItem>
            <NavItem >
              <a href="#">Contact Us</a>
            </NavItem>
          </ListContainer>
    );
}