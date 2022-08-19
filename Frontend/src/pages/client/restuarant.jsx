import React ,{useState} from 'react'
import styled from 'styled-components'
import { Content } from '../owner/invElements'
import RestItems from './restItems'

const Restuarant = (props) => {
  const RestuarantBox = styled.div
  `
  color:#000;
  font-weight:100;
  font-size:2vw;
  height:10vw;
  width:80%;
  margin:0 auto;
  `
  const Landing = styled.div`
  background:url(https://s3.amazonaws.com/PandaExpressWebsite/www/pooc-web-tile-desktop-bg-v3.jpg);
    height:50vw;
    width:100%;
  `
  const Content = styled.div`
    background-color:#656565;
    min-height:50vw;
    height:auto;
    padding-right:4vw;
    width:90%;
   margin:0 auto;
  `
  //fetches forth all items and coupons from the current restuarant 
  //these will have a call back to the main screen of user for adding item to cart
  const[active,setActive]=useState("items");
 
  const items =[{name:'2 Auntre and 1 Entree',price:12.99,cuisine:'Chinese'},{name:'Egg Rolls',price:1.99,cuisine:'Chinese'},{name:'Bowl',price:6.99,cuisine:'Chinese'},{name:'Fountain Drink',price:1.99}];
  const coupons =[{}];
  const rawItems=[];
  //pass props handler function from dishes to featured from index.jsxxxx
  for (let index = 0; index < items.length; index++) {
    const element = items[index];
    rawItems.push(<RestItems type="restaurant" AddToCart={props.AddToCart} menuItem={element}></RestItems>);
  }
  console.log(props);
  return (
    <>
    <Landing><button onClick={()=>props.restTypes(props.rest.type)}>back</button></Landing>
    <RestuarantBox>{props.rest.name}</RestuarantBox>
    //build item element with object as an attribute pass in handler from main page to resturant element to pass onto elemnts created at the top 
    //build coupon element with object as an attribute
    //for coupon if coupon is not null we will then take the dollars off or ecentage off or price fiffrence of an item 
    <button onClick={()=>{setActive("items")}}>items</button>
    <button onClick={()=>{setActive("coupons")}}>coupons</button>
    <Content>
      {active==='items' && rawItems}
      {active==='coupons' && coupons}
    </Content>
    </>
    
  )
}

export default Restuarant