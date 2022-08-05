import styled from 'styled-components';
import { FaEnvelope,FaKey, FaSignInAlt, FaUserPlus} from 'react-icons/fa';
export const BoxContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  
`;

export const FormContainer = styled.form`
  width: 80%;
  align-items: center;
  display: flex;
  flex-direction: column;
  box-shadow: 0px 0px 2.5px rgba(15, 15, 15, 0.19);
`;

export const MutedLink = styled.a`
  font-size: 11px;
  color: rgba(200, 200, 200, 0.8);
  font-weight: 500;
  text-decoration: none;
`;

export const BoldLink = styled.a`
  font-size: 11px;
  color:#fff;
  font-weight: 500;
  text-decoration: none;
  margin: 0 4px;

`;



export const SubmitButton = styled.button`
  width: 40rem;
  align-items:center;
  padding:.7vw;
  color: #000;
  font-size: 15px;
  font-weight: 600;
  border: none;
  border-radius: 100px 100px 100px 100px;
  cursor: pointer;
  transition: all, 240ms ease-in-out;
 
  &:hover {
    filter: brightness(1.03);
  }`;
export const Form = styled.form`
    Background:#ccc;
    border:1px solid #000;
    border-radius:2%;
    height:22vw;
    margin:.5vw auto;
    padding:4vw;
    width:21vw;
`
export const Input = styled.input`
    background:transparent;
    border:none;
    position:relative;
    height:2rem;
    left:2.3vw;
    top:-.4vw;
    width:14.5rem;
   color:#fff;
   font-weight:100;
   letter-spacing:1px;
    outline:none;
    &:placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
    color: red;
    opacity: 1; /* Firefox */
  }
  


`
export const H1 = styled.h1`
    padding:1vw;
    position:relative;
    color:#fff;
    font-weight:100;
    top:-2vw;
`

export const P1 = styled.p`
    padding:1vw;
    position:relative;
    color:#fff;
    font-weight:100;
    top:-2vw;
`
export const Button = styled.button`
color:burlywood;
background-color: #fff;
border: 1px solid #fff;  
padding:.1vw;
width: 20vw;
height:2.5vw;
z-index:1;
position:relative;
left:1vw;

text-align:center;
border-radius: .6vw;

cursor: pointer;

transition: 0.7s;
&:hover{
    border-radius: 2rem;
    background-color:#000;
}
`
export const Email = styled(FaEnvelope)`
color:#fff;
dispaly:block;
position:relative;
left:1.1rem;
top:.2rem;
font-size: 1.8rem;
cursor: pointer;
`
export const EmailBox = styled.div`
height:2.2rem;
width:20rem;
padding:.2rem;
border: 1px solid #fff; 
position:relative;
top:-1rem;
left:1rem;
border-radius: .6vw;
&:focus{
  border:1px solid red;
}
`
export const Password = styled(FaKey)`
color:#fff;
dispaly:block;
position:relative;
left:1.1rem;
top:.2rem;
font-size: 1.8rem;
cursor: pointer;
   
`
export const UserIcon = styled(FaUserPlus)`
  color:#ccc;
 
  position:absolute;
  left:14rem;
  top:23.5rem;
  font-size: 0rem;
  opacity:0;
  transition:0.7s;
  z-index:5;
  ${props => {
    if (props.toggle==="start") {
      return(`
      
        opacity:0;
      `)
     }else
    if (props.toggle==='signup') {
     return(`
   
     font-size: 18rem;
     opacity:1;
     `)
    }else{
      return(`
     opacity:0;
     `)

    };
    
  }}
`
export const UserLoginIcon = styled(FaSignInAlt)`
  color:#ccc;
  border-radius:100%;
  position:absolute;
  right:14rem;
  top:23.5rem;
  font-size: 0rem;
  opacity:0;
  transition:0.7s;
  z-index:5;
  ${props => {
    if (props.toggle==='start') {
      return(`
      font-size: 18rem;
      aniamtion:fade 1s ease-in;
        opacity:1;
      `)
     }else
    if (props.toggle==='signin') {
     return(`
   
     font-size: 18rem;
     opacity:1;
     `)
    }else{
      return(`
     opacity:0;
     `)

    };
    
  }}
`

export const PasswordBox = styled.div`
height:2.2rem;
width:20rem;

padding:.2rem;
border: 1px solid #fff; 
position:relative;
top:-1.5rem;
left:1rem;
border-radius: .6rem;
`