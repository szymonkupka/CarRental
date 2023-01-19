import React from 'react';
import { MdAdd, MdLogout, MdLogin} from "react-icons/md";
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {useStateValue } from "../context/StateProvider";
import { useState } from 'react';
import styled from "styled-components";
import tw from "twin.macro";
import { useAuthValue } from '../context/authContext';
import { useNavigate } from 'react-router-dom';

//import { Button } from './button';

const LogoContainer = styled.div`
${tw`
  flex
  items-center
`};
`;
const Container = styled.div`
${tw`
  flex
  items-center
  absolute
  top-12 
  right-14
  cursor-pointer
`};
`;
const Image = styled.div`
width: auto; 
${tw`
h-6 
md:h-9   
cursor-pointer
rounded-full
`};
img {
  width: auto;
  height: 100%;
  border-radius: 50%;
}
`;
/*const Button = styled.p`
${tw`
  cursor-pointer
  items-center
  absolute
  cursor-pointer
`};
`;*/
export function DropDownList(){
   // const { user, googleSignIn,logOut } = useStateValue();
   const { user, login,logout } = useAuthValue();
    const [isMenu, setIsMenu] = useState(false);
    let navigate = useNavigate();
 
      function HandleLogOut(){
         logout();
         navigate("/");
      }
      const handleIsMenu = () =>{
        setIsMenu(!isMenu);
      }
  return (
    <div>
      <LogoContainer>
      <Image>
    <motion.img  
          whileTap={{ scale : 0.6 }}
          src={ user ? user?.photoURL : "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
          className="w-20 min-w-[40px] h-10 min-h-[40px] drop-shadow-xl cursor-pointer rounded-full"
          alt="userprofile"
          onClick={handleIsMenu}
          />
          </Image>
          </LogoContainer>
          <Container>
           {isMenu && (
          <motion.div
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.6 }}
          >
            
            <p >
                New Item
                <MdAdd/>
            </p>
            
              {user?.name ? (
              <p
              onClick ={HandleLogOut}>
                Logout <MdLogout/></p>) : (
              <p
              onClick ={HandleLogOut}>
                Login<MdLogin/></p>)}
          </motion.div>)}
          </Container>
          
          </div>
  )
}

//export default DropDownList