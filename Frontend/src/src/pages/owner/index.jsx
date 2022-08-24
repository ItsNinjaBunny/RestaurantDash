import React,{useState,useEffect} from 'react'
import styled from 'styled-components'
import Navbar from '../../components/Navbar'
import { H1 } from '../Login/LoginElements'
import Coupons from './coupons'
import Dishes from './dishes'
import Inventory from './inventory'
import Orders from './orders'
import Welcome from './welcome'
import '../../App.css'
import DishScreen from './DishScreen'
const MenuBox = styled.div`
position: fixed;
width: 15vw;
height: 65.4%;

top: 10vw;
border-radius: 4%;
border: 0.1vw solid #fff;
color: #fff;
background-color: transparent;
text-align: center;
list-style-type: none;
left: 7rem;
transition:0.6s;
${props => {
  if (props.toggle==='dishes'||props.toggle==='coupons'||props.toggle==='inventory'||props.toggle==='orders') {
    return `
        background-color:#000;
        color:#fff;
       \
    `;
  
  }
  

}
}

`
const ContentBox = styled.div`
  background-color:#fff;
  width:53vw;
  padding:5vw;
  height:auto;
  min-height:46%;
  position:absolute;
 
  overflow:hidden;
  z-index:5;
  top:10vw;
  right:7vw;
  opacity:1;
  border-radius:1.5%;
  transition:0.7s;
  transition-timing-function:ease-in;
  border:.1vw solid #000;
 `
const Landing = styled.div`
    background-color:#656565;
    //background:url(https://wallpaperaccess.com/full/3112895.jpg);
    opacity;.8;
    height:100%;
    position:fixed;
    top:0;
    width:100%;
    background-size:cover;
    background-repeat:no-repeat;
    transform: rotate(180deg);
`
const Li = styled.li`
  position:relative;
  top:25%;
  font-size:2vw;
  font-weight:100;
  letter-spacing:.1vw;
  padding:0.1vw;
  cursor:pointer;
  transition:1s;
  margin:1vw;
  border-radius:1vw;
  &:hover{
    color:#000;
    background:#fff;
   
  }
`


const Business = () => {
  const [active, setActive] = useState("welcome");
  //window alert
  function switchBusiness(x){
    setTimeout(() => {
      setActive(x);
    }, 400);
  };
 
  
 const [scrollPosition, setScrollPosition] = useState(0);
  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollPosition(position);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [ChangeBox(scrollPosition)]);
  function ChangeBox(){
    if(scrollPosition>100){
      var interval = setInterval(()=>{ 
        document.getElementById("contentScroll").classList.add("showUser");
           clearInterval(interval);
        
     }, 400);
    
      
    }else{
     
      var interval = setInterval(()=>{ 
        document.getElementById("contentScroll").classList.remove("showUser");
           clearInterval(interval);
        
     }, 400);
      
    }
      
  }
  
  return (
  
    <>
    <Landing></Landing>
    <Navbar>
    </Navbar>

      <MenuBox toggle={active}>
          <Li className={active==='dishes' ? 'link' : ''} onClick={() => {switchBusiness("dishes")}}>Dishes</Li>
          <Li  className={active==='inventory' ? 'link' : ''} onClick={() => {switchBusiness("inventory")}}>Inventory</Li>
          {/* <Li  className={active==='coupons' ? 'link' : ''} onClick={() => {switchBusiness("coupons")}}>Coupons</Li> */}
          <Li  className={active==='orders' ? 'link' : ''} onClick={() => {switchBusiness("orders")}}>Orders</Li>
      </MenuBox>
      <ContentBox  id="contentScroll" className={active==='inventory'? 'fade' : ''}>
      {active==="welcome" && <Welcome></Welcome>}
          {active==="dishes" && <DishScreen></DishScreen>}
          {/* {active==='coupons' && <Coupons></Coupons>} */}
          {active==='inventory' && <Inventory></Inventory>}
          {active==='orders' && <Orders></Orders>}
      </ContentBox>
    </>
  )
}

export default Business