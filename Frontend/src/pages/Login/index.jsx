import React, { useState } from "react";
import styled from "styled-components";
import SignInForm  from "./signinForm";
import { motion } from "framer-motion";
import { AccountContext } from "./AccountContext";
import {SignupForm } from "./signupForm";
import Navbar from "../../components/Navbar/index";
import "../../App.css"
import {UserIcon,UserLoginIcon} from "./LoginElements"


const BoxContainer = styled(motion.div)`
  background:#0000004f;

  ${props => {
    if (props.toggle==='start') {
      return `
      padding-top:3vw;
      width: 30rem;
      height:30rem;
      display: flex;
      flex-direction: column;
      border-radius: 19px;
      border:1px solid  #fff;;
      box-shadow: 0 0 2px rgba(15, 15, 15, 0.28);
      position: relative;
      left:5rem;
      overflow: hidden;
      top:12rem; 
      opacity:1;
      transition:0.5s;
     
     
      `;
    }
    if (props.toggle==='signin') {
      return `
      animation: signin 1s;
      padding-top:3vw;
      width: 30rem;
      height:30rem;
      display: flex;
      flex-direction: column;
      border-radius: 19px;
      border:1px solid  #fff;;
      box-shadow: 0 0 2px rgba(15, 15, 15, 0.28);
      position: absolute;
      left:14rem;
      overflow: hidden;
      top:15.8rem;
      transition:1s;
      opacity:1;
     
     
      `;
    } else {
      return `
     
      animation: signup 1s ;
      
      width: 30rem;
      height:43rem;
      display: flex;
      border-radius: 19px;
      border:1px solid #fff;
      box-shadow: 0 0 2px rgba(15, 15, 15, 0.28);
      position: absolute;
      left:65vw;    
      overflow: hidden;
      top:11rem;
      transition:.7s;
    
      `;
    }
  }}
`;



const BackDrop = styled(motion.div)`
  width: 160%;
  height: 550px;
  position: absolute;
  display: flex;
  flex-direction: column;
  border-radius: 50%;
  transform: rotate(60deg);
  
  background: rgb(241, 196, 15);
  background: linear-gradient(
    58deg,
    rgba(241, 196, 15, 1) 20%,
    rgba(243, 172, 18, 1) 100%
  );
`;
const Landing = styled.div`
    //background-color:#0f2125;
    background:url(https://wallpaperaccess.com/full/3112895.jpg);
    opacity;.8;
    height:60rem;
    position:fixed;
    top:0;
    width:100%;
    background-size:cover;
    background-repeat:no-repeat;
`
const HeaderContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const HeaderText = styled.h2`
  font-size: 30px;
  font-weight: 600;
  line-height: 1.24;
  color: #fff;
  z-index: 10;
  margin: 0;
`;

const SmallText = styled.h5`
  color: #fff;
  font-weight: 500;
  font-size: 11px;
  z-index: 10;
  margin: 0;
  margin-top: 7px;
`;

const InnerContainer = styled.div`
  width: 100%;
  display: flex;
    opacity:1;
  
    transiiton:.7s;
  ${props => {
    if (props.toggle==='start') {
      return(`
      align-items:center;
      animation:fade .6s  ease-in;
      opacity:1;
      `)
     }
    if (props.toggle==='signup') {
     return(`
     align-items:center;
     animation:fade2 1s  ease-in;
     opacity:1;
     `)
    }else{
      return(`
      align-items:center;
      animation:fade 1s ease-in;
      opacity:1;
     `)

    }
    
  }}
    
 
`;

const backdropVariants = {
  expanded: {
    width: "233%",
    height: "1050px",
    borderRadius: "20%",
    transform: "rotate(60deg)",
  },
  collapsed: {
    width: "160%",
    height: "550px",
    borderRadius: "50%",
    transform: "rotate(60deg)",
  },
};

const expandingTransition = {
  type: "spring",
  duration: 2.3,
  stiffness: 30,
};

export function AccountBox(props) {
  const [isExpanded, setExpanded] = useState(false);
  const [active, setActive] = useState("start");

  const playExpandingAnimation = () => {
    setExpanded(true);
    setTimeout(() => {
      setExpanded(false);
    }, expandingTransition.duration * 1000 - 1500);
  };

  const switchToSignup = () => {
    playExpandingAnimation();
    setTimeout(() => {
      setActive("signup");
    }, 400);
  };

  const switchToSignin = () => {
    playExpandingAnimation();
    setTimeout(() => {
      setActive("signin");
    }, 400);
  };

  
  
  const contextValue = { switchToSignup, switchToSignin };

  return (
    <AccountContext.Provider value={contextValue}>
        <Navbar>
        </Navbar>
        <Landing></Landing>
      <UserIcon toggle={active} />
      <UserLoginIcon toggle={active} />
      <BoxContainer toggle={active}>
        <InnerContainer toggle={active}>
          {active === "start" && <SignInForm />}
          {active === "signin" && <SignInForm />}
          {active === "signup" && <SignupForm />}
        </InnerContainer>
      </BoxContainer>
    </AccountContext.Provider>
  );
}
