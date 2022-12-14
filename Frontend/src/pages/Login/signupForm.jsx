import React from 'react';
import styled from "styled-components";
import axios from 'axios';
import { useContext, useState } from 'react';
import {
  BoldLink,
  BoxContainer,
  FormContainer,
  Input,
  MutedLink, H1, P1, Password, Email, EmailBox, PasswordBox, User, SecretKey,Address
} from "./LoginElements";
import { Marginer } from "../../components/marginer/index";
import { AccountContext } from "./AccountContext.jsx";
const SubmitButton = styled.div`
  width: 20.5rem;
  text-align:center;
  padding:.7vw;
  color: #000;
  font-size: 15px;
  font-weight: 600;
  background:#fff;
 
  border-radius: 2vw;
  cursor: pointer;
  transition: all, 240ms ease-in-out;
  margin-left:2.3vw;
  &:hover {
    filter: brightness(1.03);
    background:#17244d;
    color:#fff;
  }`

export function SignupForm(props) {
  const { switchToSignin } = useContext(AccountContext);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [key, setKey] = useState("");
 
const email_pattern = /[^-\s].{1,}[@]{1}.{2,}[.]{1}.{2,}/i;
const password_pattern = /^(?=.*[A-Z]){1,}(?=.*\d){1,}(?=.*[!@#$%^&*()\[\]{};:'"<>\\\/\,.?-])[A-Za-z\d!@#$%^&*()\[\]{};:'"<>\\\/\,.?-]{8,}$/i;

  let handleSubmit = async (e) => {
    if(key===null||key===''){
      setKey("");
    }
    e.preventDefault();
    try {
      
      if(!email_pattern.test(email)){
        window.alert("bad email");
      
      }else
      if(password!=confirmpassword){
        window.alert("passwords do not match");
      
      }else{
      
       
        let res = await axios("http://localhost:8080/users/register", {
            method: "POST",
            data: {
                name:name,
                email:email,
                password: password,
                license : {
                  key: key,
                  restaurant:name
                },
                location : {
                  formatted_address: address
                }
            },
        });
       
        if (res.status === 200) {
            setName("");
            setPassword("");
            setConfirmPassword("");
            setAddress(""); 
            setKey("");
            setEmail("")
            window.location.href ="http://localhost:3000/Login";
        }
      }

       
    } catch (err) {
       window.alert("Try Again Please")
    }
    
};
  return (
    <BoxContainer>
      
      <FormContainer>
        <H1>Sign Up</H1>
        <P1>Create an account today ready </P1>
        <EmailBox>
          <User />
          <Input value={name} placeholder='name' onChange={(e) => setName(e.target.value)} />
        </EmailBox>
        <br></br>
        <EmailBox>
          <Email />
          <Input value={email} placeholder='email' onChange={(e) => setEmail(e.target.value)} />
        </EmailBox>
        <br></br>
        <PasswordBox>
          <Password></Password>
          <Input value={password} type='password'  placeholder='Password' onChange={(e) => setPassword(e.target.value)} />
        </PasswordBox>
        <br></br>
        <PasswordBox>
          <Password></Password>
          <Input value={confirmpassword} type='password'  placeholder='Confirm Password' onChange={(e) => setConfirmPassword(e.target.value)} />
        </PasswordBox>
        <br></br>
        <PasswordBox>
          <SecretKey></SecretKey>
          <Input value={key} type='password' placeholder='Secret Key' onChange={(e) => setKey(e.target.value)} />
        </PasswordBox>
        <br></br>
        <EmailBox>
          <Address/>
          <Input value={address} placeholder='420 Naomi Jane Parkway Highway, CA' onChange={(e) => setAddress(e.target.value)} />
        </EmailBox>
        <Marginer direction="vertical" margin={10} />
      <SubmitButton onClick={handleSubmit}>Signup</SubmitButton>
      <Marginer direction="vertical" margin="1em" />
      </FormContainer>
      <MutedLink onClick={switchToSignin}>
        Already have an account?
        <BoldLink href="#" >
          Sign In
        </BoldLink>
      </MutedLink>
    </BoxContainer>
  );
}