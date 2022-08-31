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
    const email_pattern = /[^-\s].{1,}[@]{1}.{2,}[.]{1}.{2,}/i;
    const { switchToSignup } = useContext(AccountContext);

    let handleSubmit = async (e) => {

        e.preventDefault();
        try {
            if(!email_pattern.test(username)){
                window.alert("bad email");
            }else{
            let res = await axios("http://localhost:8080/users/login", {
                method: "POST",
                data: {
                    username: username,
                    password: password

                },
            });
            if (res.status === 200) {
                setUsername("");
                setPassword("");
                //if client and if buisness 
                if(res.data.auth.license.type==='client'){
                    window.location.href = 'http://localhost:3000/client?type='+res.data.auth.license.type+'?id='+res.data.auth.id;
                }else if(res.data.auth.license.type==='business'){
                    window.location.href = 'http://localhost:3000/business?type='+res.data.auth.license.type+'?id='+res.data.auth.id;
                }
              
            }else{
                window.alert("Email Or Password is incorrect");
                setPassword("");
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
                    <Input value={username} type='email' placeholder='guestemail@email.com' onChange={(e) => setUsername(e.target.value)} />
                </EmailBox>
                <br></br>
                <PasswordBox>
                    <Password></Password>
                    <Input value={password} type="password" placeholder='Password' onChange={(e) => setPassword(e.target.value)} />
                </PasswordBox>
                
            
                <SubmitButton onClick={handleSubmit} >Signin</SubmitButton>
            
          
            </FormContainer>
            <Marginer direction="vertical" margin={10} />
          
            {/* <SubmitButton onClick={handleSubmit}>Signin</SubmitButton> */}
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