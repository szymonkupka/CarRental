import React from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { Logo } from "../logo";
import {DropDownList} from "../DropDownList";
import { NavItems } from "./navItems";


const NavbarContainer = styled.div`
  min-height: 68px;
  ${tw`
    w-full
    max-w-screen-2xl
    flex
    flex-row
    absolute
    items-center
    lg:pl-12
    lg:pr-12
    justify-between
  `};
`;
const LogoContainer = styled.div``;

export function Navbar() {
  return (
    <NavbarContainer>
      <LogoContainer>
        <Logo/>
      </LogoContainer>
      <NavItems/>
      <DropDownList/>
      
    </NavbarContainer>
  );
}