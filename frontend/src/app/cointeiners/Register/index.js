import React, { useContext, useState } from "react";
import ReactDOM from "react-dom";
import styled, { keyframes, createGlobalStyle } from "styled-components";
import { Marginer } from "../../components/marginer";
import tw from "twin.macro";
import MclarenCarImg from "../../../assets/images/mclaren-orange-big.png";
import BlobImg from "../../../assets/images/blob.svg";
import { SCREENS } from "../../components/responsive";
import { useMutation } from "@apollo/client";
//import { useMutation } from "react-query";
import { CREATE_USER } from "../../graphql/mutations";
import { useAuthValue } from "../../context/authContext";
import { Navigate, useNavigate } from "react-router-dom";
import {Alert} from "@mui/material"

const jump = keyframes`
  from{
    transform: translateY(0)
  }
  to{
    transform: translateY(-3px)
  }
`;

const GlobalStyle = createGlobalStyle`
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    background: #FDF9F3;
  }

  body, html, #root {
    height: 100%;
    font-family: -apple-system, Ubuntu , BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;;
  }
`;

const Wrapper1 = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
`;
const Wrapper = styled.section`
${tw`
  flex
  items-center
  justify-center
  w-full
  h-full
`};
`;


const Form = styled.form`
  margin: 0 auto;
  width: 100%;
  max-width: 414px;
  padding: 1.3rem;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const Input = styled.input`
  max-width: 100%;
  padding: 11px 13px;
  background: #f9f9fa;
  color: #f03d4e;
 margin -bottom: 0.9rem;
  border-radius: 4px;
  outline: 0;
  border: 1px solid rgba(245, 245, 245, 0.7);
  font-size: 14px;
  transition: all 0.3s ease-out;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.1), 0 1px 1px rgba(0, 0, 0, 0.1);
  :focus,
  :hover {
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.15), 0 1px 5px rgba(0, 0, 0, 0.1);
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

const Title = styled.h2`
    font-bold
    text-2xl
    xl:text-6xl
    sm:text-3xl
    md:text-5xl
    lg:font-black
    md:font-extrabold
    text-black
    mb-4
    sm:leading-snug
    lg:leading-normal
    xl:leading-relaxed
    text-align: center;
    margin-bottom: 40px;
    text-align: center;
`;



const TopSectionContainer = styled.div`
  min-height: 400px;
  margin-top: 6em;
  ${tw`
    w-full
    max-w-screen-2xl
    flex
    justify-between
    pl-3
    pr-3
    lg:pl-12
    lg:pr-12
  `};
`;
const LeftContainer = styled.div`
  ${tw`
    w-2/3
    flex
    flex-col
  
  `};
`;
const RightContainer = styled.div`
  ${tw`
    w-1/3
    flex
    flex-col
  
  `};
`;

 function Register() {
  const [dados, setDados] = useState({
    email: "",
    password: ""
  });
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [name,setName] = useState("");
  const [errors, setErrors] = useState("");
  const { user, login} = useAuthValue();

  //const context = useContext(AuthContext);
  let navigate = useNavigate();
  const [createUser, {data}] = useMutation(CREATE_USER, {
    update: (proxy, {data:{createUser: userData}} ) => {
      console.log(userData.name);
      login(userData);
      navigate("/homepage");
    },  onError:(error) =>{ 
      console.log("zlapany:" + error.message);
      setErrors(error.message);
  
    }, variables: {
      user:{
     name: name,
     email: email,
     password: password,
     }}});

  //let UserLOGED;
 
 /* const handleSubmit = e => {
    e.preventDefault();
    console.log(dados);
  };

  margin -bottom: 0.9rem;

  const handleChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    setDados(Object.assign(dados, { [name]: value }));
  };
*/


  return (
    <div>
      <TopSectionContainer>
        <RightContainer>
            
        </RightContainer>
        <LeftContainer>
      <Wrapper>
        
        <Form >
            <Title>
                Become member of our CARter family
            </Title>
            <Input
            type = 'name'
            placeholder="Name"
            onChange={(e) => {setName(e.target.value)}}
          />
          <Input
           type = 'email'
            placeholder="Email"
            onChange={(e) => {setEmail(e.target.value)}}
          />
          <Input
            type = 'password'
            placeholder="Password"
            onChange={(e) => {setPassword(e.target.value)}}
          />
          <Button onClick={(e) => {
            //creatingUser(e);
            e.preventDefault();
            createUser();
            
           // if(err)
              }}>

          
            Register</Button>
            {
                  errors? 
                  <Alert severity="error">{errors}</Alert>:<></>
                }
        </Form>
      </Wrapper>
     
      </LeftContainer>
      </TopSectionContainer>
    </div>
  );
}
export { Register}


