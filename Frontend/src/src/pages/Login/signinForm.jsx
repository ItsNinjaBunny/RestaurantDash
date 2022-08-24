import React from 'react'
import { useContext, useState } from 'react';
import { AccountContext } from "./AccountContext";
import { Marginer } from "../../components/marginer/index";
import axios from 'axios';
import { Link } from 'react-router-dom';
import { BoldLink,
    BoxContainer,
    FormContainer,
    MutedLink,
    SubmitButton, Input, H1, P1, Password, Email, EmailBox, PasswordBox } from './LoginElements'
    const Login =()=>{
    


    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const { switchToSignup } = useContext(AccountContext);

    let handleSubmit = async (e) => {

        e.preventDefault();
        try {
            console.log(username, password)
            console.log("helloa");
            let res = await axios("http://192.168.1.6:3000/login", {
                method: "POST",
                data: {
                    username: username,
                    password: password

                },
            });
            console.log(res);
            if (res.status === 200) {
                setUsername("");
                setPassword("");
                //if client and if buisness 
                if(res.data.auth.license.type==='client'){
                    window.location.href = 'http://localhost:5000/client?type='+res.data.auth.license.type+'?id='+res.data.auth.id;
                }else if(res.data.auth.license.type==='business'){
                    window.location.href = 'http://localhost:5000/business?type='+res.data.auth.license.type+'?id='+res.data.auth.id;
                }
              
            }
            
        } catch (err) {
            console.log(err);
        }
    };
    return (
        <BoxContainer>
            <FormContainer>
                <H1>Sign In </H1>
                <P1>Login to manage an account</P1>
                <EmailBox>
                    <Email />
                    <Input value={username} placeholder='guestemail@email.com' onChange={(e) => setUsername(e.target.value)} />
                </EmailBox>
                <br></br>
                <PasswordBox>
                    <Password></Password>
                    <Input value={password} placeholder='Password' onChange={(e) => setPassword(e.target.value)} />
                </PasswordBox>
            </FormContainer>
            <Marginer direction="vertical" margin={10} />
            <MutedLink href="#">Forget your password?</MutedLink>
            <Marginer direction="vertical" margin="1.6em" />
            {/* <SubmitButton onClick={handleSubmit}>Signin</SubmitButton> */}
           
            <BoldLink>
                <SubmitButton onClick={handleSubmit} >Signin</SubmitButton>
            </BoldLink>
               
            
            <Marginer direction="vertical" margin="1em" />
            <MutedLink  onClick={switchToSignup}>
                Don't have an account?{" "}
                <BoldLink href="#">
                    Sign Up
                </BoldLink>
            </MutedLink>
        </BoxContainer>
       
    )
}
export default Login